namespace PhotoGallery.Infrastructure.Services.Abstract
{
    public interface IJwtFormater
    {
        string GetSubject(string token);
    }
}