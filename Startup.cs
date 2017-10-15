using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PhotoGallery.Infrastructure;
using Microsoft.EntityFrameworkCore;
using PhotoGallery.Infrastructure.Repositories;
using PhotoGallery.Infrastructure.Services;
using PhotoGallery.Infrastructure.Mappings;
using PhotoGallery.Infrastructure.Core;
using PhotoGallery.Hubs;
using System.Security.Claims;
using Microsoft.AspNetCore.StaticFiles;
using System.IO;
using System.Text;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Serialization;
using PhotoGallery.Infrastructure.Repositories.Abstract;
using PhotoGallery.Infrastructure.Services.Abstract;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.Extensions.Logging;
using signalr_test.Data;

namespace PhotoGallery
{
    public class Startup
    {
        private static string _applicationPath = string.Empty;
        private static string _contentRootPath = string.Empty;

        public Startup(IHostingEnvironment env)
        {
            _applicationPath = env.WebRootPath;
            _contentRootPath = env.ContentRootPath;

            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<PhotoGalleryContext>(options =>
                options.UseSqlServer(Configuration["Data:PhotoGalleryConnection:ConnectionString"]));

            services.AddScoped<MockData>();
            // Repositories
            services.AddScoped<signalr_test.Data.IChatRepository, MockChatRepository>();
            services.AddScoped<signalr_test.Data.IUserRepository, MockUserRepository>();
            services.AddScoped<signalr_test.Data.IChatUserRepository, signalr_test.Data.ChatUserRepository>();

            // Automapper Configuration
            AutoMapperConfiguration.Configure();

            // Repositories
            services.AddScoped<IPhotoRepository, PhotoRepository>();
            services.AddScoped<IAlbumRepository, AlbumRepository>();
            services.AddScoped<PhotoGallery.Infrastructure.Repositories.Abstract.IUserRepository, UserRepository>();
            services.AddScoped<IUserRoleRepository, UserRoleRepository>();
            services.AddScoped<IRoleRepository, RoleRepository>();
            services.AddScoped<PhotoGallery.Infrastructure.Repositories.Abstract.IChatRepository, ChatRepository>();
            services.AddScoped<IMessageRepository, MessageRepository>();
            services.AddScoped<PhotoGallery.Infrastructure.Repositories.Abstract.IChatUserRepository, Infrastructure.Repositories.ChatUserRepository>();
            services.AddScoped<ILoggingRepository, LoggingRepository>();

            // Services
            services.AddScoped<IFriendsSearcher, FriendsSearcher>();
            services.AddScoped<IMembershipService, MembershipService>();
            services.AddScoped<IEncryptionService, EncryptionService>();
            services.AddScoped<IJwtFormater, JwtFormater>();

            services.AddAuthentication();

            // Polices
            //services.AddCors();

            services.AddAuthorization(options =>
            {
                // inline policies
                options.AddPolicy("AdminOnly", policy =>
                {
                    policy.RequireClaim(ClaimTypes.Role, "Admin");
                });

            });

            services.AddAuthentication(options =>
            {
                    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                    options.Authority = "http://localhost:5000/";
                    options.Audience = "resource-server";
                    options.RequireHttpsMetadata = false;
            })
            .AddCookie();

            // Add framework services.
            services.AddSignalR();

            services.AddMvc();
        }

        private static string secretKey = "mysupersecret_secretkey!123";

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole();
            loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();
            AutoMapperConfiguration.Configure();

            app.UseCors(builder =>
                builder.AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod());

            var signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secretKey));

            var tokenValidationParameters = new TokenValidationParameters
            {
                // The signing key must match!
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = signingKey,

                // Validate the JWT Issuer (iss) claim
                ValidateIssuer = true,
                ValidIssuer = "ExampleIssuer",

                // Validate the JWT Audience (aud) claim
                ValidateAudience = true,
                ValidAudience = "ExampleAudience",

                // Validate the token expiry
                ValidateLifetime = true,

                // If you want to allow a certain amount of clock drift, set that here:
                ClockSkew = TimeSpan.Zero
            };

            //this will serve up node_modules
            var provider = new PhysicalFileProvider(
                Path.Combine(_contentRootPath, "node_modules")
            );
            var _fileServerOptions = new FileServerOptions();
            _fileServerOptions.RequestPath = "/node_modules";
            _fileServerOptions.StaticFileOptions.FileProvider = provider;
            _fileServerOptions.EnableDirectoryBrowsing = true;
            app.UseFileServer(_fileServerOptions);

            provider = new PhysicalFileProvider(
                Path.Combine(_contentRootPath, "bower_components")
            );
            _fileServerOptions = new FileServerOptions();
            _fileServerOptions.RequestPath = "/bower_components";
            _fileServerOptions.StaticFileOptions.FileProvider = provider;
            _fileServerOptions.EnableDirectoryBrowsing = true;
            app.UseFileServer(_fileServerOptions);
            app.UseFileServer(_fileServerOptions);

            provider = new PhysicalFileProvider(
                Path.Combine(_contentRootPath, "ClientApp")
            );
            _fileServerOptions = new FileServerOptions();
            _fileServerOptions.RequestPath = "/ClientApp";
            _fileServerOptions.StaticFileOptions.FileProvider = provider;
            _fileServerOptions.EnableDirectoryBrowsing = true;
            app.UseFileServer(_fileServerOptions);
            app.UseFileServer(_fileServerOptions);

            var options = new TokenProviderOptions
            {
                Audience = "ExampleAudience",
                Issuer = "ExampleIssuer",
                SigningCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256),
            };

            app.UseMiddleware<TokenProviderMiddleware>(Options.Create(options));

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                // routes.MapSpaFallbackRoute(
                //     name: "spa-fallback",
                //     defaults: new { controller = "Home", action = "Index" });                
            });

            app.UseSignalR(routes => {
                routes.MapHub<Broadcaster>("broadcaster");
            });
            app.UseWebSockets();
        }
    }
}
