using EBook.Dtos.Files;
using EBook.Services.Abstracts;
using Microsoft.Extensions.Options;
using System.Runtime.InteropServices;
using System.Web;

namespace EBook.Services.Implements
{
    public class FileService : IFileService
    {
        private readonly Microsoft.AspNetCore.Hosting.IHostingEnvironment _hostEnvironment;
        private readonly FileConfig _fileConfig;
        private readonly ILogger<FileService> _logger;

        public FileService(ILogger<FileService> logger,
            IHttpContextAccessor httpContext,
            Microsoft.AspNetCore.Hosting.IHostingEnvironment hostEnvironment,
            IOptions<FileConfig> fileConfig)
        {
            _hostEnvironment = hostEnvironment;
            _fileConfig = fileConfig.Value;
            _logger = logger;
        }

        public byte[] GetFile(string folder, string fileName)
        {
            var fileByte = GetFile(folder, fileName, _fileConfig);
            return fileByte ?? throw new Exception("Không tìm thấy File");
        }

        /// <summary>
        /// Đọc file ra dạng byte
        /// </summary>
        /// <param name="folder"></param>
        /// <param name="fileName"></param>
        /// <param name="config"></param>
        /// <returns></returns>
        /// <exception cref="UserFriendlyException"></exception>
        private byte[] GetFile(string folder, string fileName, FileConfig config)
        {
            string filePath = GetFilePath(folder, fileName, config);
            var fileByte = File.ReadAllBytes(filePath);
            return fileByte;
        }

        /// <summary>
        /// Lấy full đường dẫn vật lý
        /// </summary>
        /// <param name="folder"></param>
        /// <param name="fileName"></param>
        /// <param name="config"></param>
        /// <returns></returns>
        private string GetFilePath(string folder, string fileName, FileConfig config)
        {
            var baseDir = "";

            if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
            {
                baseDir = Directory.GetParent(Directory.GetParent(_hostEnvironment.ContentRootPath).FullName).FullName;
            }
            else if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
            {
                baseDir = _hostEnvironment.ContentRootPath;
            }

            string filePath = Path.Combine(baseDir, config.Path ?? "", folder ?? "", fileName);

            return filePath;
        }

        private void UploadFile(IFormFile file, FileConfig config, string folderPath)
        {
            string filePath = "";
            string prefixFilePath = "";

            if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
            {
                var baseDir = Directory.GetParent(Directory.GetParent(_hostEnvironment.ContentRootPath).FullName).FullName;
                prefixFilePath = Path.Combine(baseDir, config.Path, folderPath ?? "");
            }
            else if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
            {
                prefixFilePath = Path.Combine(_hostEnvironment.ContentRootPath, config.Path, folderPath ?? "");
            }

            Directory.CreateDirectory(prefixFilePath);
            filePath = Path.Combine(prefixFilePath, file.FileName);


            using (var filestream = new FileStream(filePath, FileMode.Create, FileAccess.Write, FileShare.None))
            {
                file.CopyTo(filestream);
            }
        }

        public string UploadFile(UploadFileModel input)
        {
            _logger.LogInformation("Upload file");
            UploadFile(input.File, _fileConfig, input.Folder);
            string endpoint = GetEndPoint("file/get", input.Folder, input.File.FileName);

            return endpoint ?? throw new Exception("Không tìm thấy File");
        }

        private string GetEndPoint(string endpoint, string folder, string fileName)
        {
            fileName = HttpUtility.UrlEncode(fileName);
            folder = HttpUtility.UrlEncode(folder);
            return $"api/{endpoint}?folder={folder}&file={fileName}";
        }
    }
}
