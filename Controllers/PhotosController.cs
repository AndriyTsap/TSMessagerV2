﻿using System;
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
    public class PhotosController : Controller
    {

        IPhotoRepository _photoRepository;
        ILoggingRepository _loggingRepository;
        public PhotosController(IPhotoRepository photoRepository, ILoggingRepository loggingRepository)
        {
            _photoRepository = photoRepository;
            _loggingRepository = loggingRepository;
        }

        [HttpGet("{page:int=0}/{pageSize=12}")]
        public PaginationSet<PhotoViewModel> Get(int? page, int? pageSize)
        {
            PaginationSet<PhotoViewModel> pagedSet = null;

            try
            {
                int currentPage = page.Value;
                int currentPageSize = pageSize.Value;

                List<Photo> _photos = null;
                int _totalPhotos = new int();


                _photos = _photoRepository
                    .AllIncluding(p => p.Album)
                    .OrderBy(p => p.Id)
                    .Skip(currentPage * currentPageSize)
                    .Take(currentPageSize)
                    .ToList();

                _totalPhotos = _photoRepository.GetAll().Count();

                IEnumerable<PhotoViewModel> _photosVM = Mapper.Map<IEnumerable<Photo>, IEnumerable<PhotoViewModel>>(_photos);

                pagedSet = new PaginationSet<PhotoViewModel>()
                {
                    Page = currentPage,
                    TotalCount = _totalPhotos,
                    TotalPages = (int)Math.Ceiling((decimal)_totalPhotos / currentPageSize),
                    Items = _photosVM
                };
            }
            catch (Exception ex)
            {
                _loggingRepository.Add(new Error() { Message = ex.Message, StackTrace = ex.StackTrace, DateCreated = DateTime.Now });
                _loggingRepository.Commit();
            }

            return pagedSet;
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            IActionResult result = new ObjectResult(false);
            GenericResult removeResult = null;

            try
            {
                Photo photoToRemove = this._photoRepository.GetSingle(id);
                this._photoRepository.Delete(photoToRemove);
                this._photoRepository.Commit();

                removeResult = new GenericResult()
                {
                    Succeeded = true,
                    Message = "Photo removed."
                };
            }
            catch (Exception ex)
            {
                removeResult = new GenericResult()
                {
                    Succeeded = false,
                    Message = ex.Message
                };

                _loggingRepository.Add(new Error() { Message = ex.Message, StackTrace = ex.StackTrace, DateCreated = DateTime.Now });
                _loggingRepository.Commit();
            }

            result = new ObjectResult(removeResult);
            return result;
        }

        [HttpPost("upload")]
        public async Task Upload(IFormFile file)
        {
            var path="wwwroot/images";
            if (file.Length > 0)
            {
                using (var fileStream = new FileStream((path+"/"+file.FileName), FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }
            }
            
        }
    }
}