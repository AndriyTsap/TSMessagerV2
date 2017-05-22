using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using PhotoGallery.Infrastructure.Services.Abstract;

namespace PhotoGallery.Infrastructure.Services
{
    public class JwtFormater: IJwtFormater
    {
        public string GetSubject(string token)
        {
            var jwtToken = new JwtSecurityToken(token);
            var subject = jwtToken.Subject;
            return subject;
        }
    }
}
