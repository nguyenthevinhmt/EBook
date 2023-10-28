using EBook.Dtos.Files;

namespace EBook.Services.Abstracts
{
    public interface IFileService
    {
        byte[] GetFile(string folder, string fileName);
        string UploadFile(UploadFileModel input);
    }
}
