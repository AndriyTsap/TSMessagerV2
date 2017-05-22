using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PhotoGallery.Entities;
using PhotoGallery.ViewModels;
using AutoMapper;
using PhotoGallery.Infrastructure.Repositories;
using PhotoGallery.Infrastructure.Core;
using PhotoGallery.Infrastructure.Repositories.Abstract;
using Microsoft.AspNetCore.Http;
using System.IO;


// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace PhotoGallery.Controllers
{
    [Route("api/[controller]")]
    public class AttachmentsController : Controller
    {
        //api/attachments
        [HttpPost]
        public async Task Upload(IFormFile file)
        {
            var path="wwwroot/attachments";
            if (file.Length > 0)
            {
                using (var fileStream = new FileStream((path+"/"+file.Length+"!!!"+file.FileName), FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }
            }
            
        }
    }
}
