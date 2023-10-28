using EBook.Services.Abstracts;
using Microsoft.AspNetCore.Mvc;

namespace EBook.Controllers
{
    [ApiController]
    [Route("api/file")]
    public class FileController : ApiControllerBase
    {
        private readonly IFileService _fileService;

        public FileController(ILogger<FileController> logger, IFileService fileService) : base(logger)
        {
            _fileService = fileService;
        }

        [HttpGet("get")]
        public IActionResult GetFile([FromQuery] string file, [FromQuery] string folder, [FromQuery] bool download)
        {

            var result = _fileService.GetFile(folder, file);

            if (download)
            {
                return File(result, MimeTypeNames.ApplicationOctetStream, file);
            }
            return FileByFormat(result, file);

        }
    }
}
