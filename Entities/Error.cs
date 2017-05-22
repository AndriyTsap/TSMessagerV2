using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoGallery.Entities
{
    public enum LoggingEventType { Debug, Information, Warning, Error, Fatal };

    public class Error : IEntityBase
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public string StackTrace { get; set; }
        public string Severity { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
