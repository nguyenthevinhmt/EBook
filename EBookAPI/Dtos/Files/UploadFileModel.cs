namespace EBook.Dtos.Files
{
    public class UploadFileModel
    {
        public IFormFile File { get; set; }
        public string Folder { get; set; }
    }
}
