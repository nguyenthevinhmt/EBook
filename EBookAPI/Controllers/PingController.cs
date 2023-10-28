using Microsoft.AspNetCore.Mvc;

namespace EBook.Controllers
{
    [Route("api/ping")]
    [ApiController]
    public class PingController : ControllerBase
    {
        [HttpGet]
        public IActionResult Ping()
        {
            return Ok("Ping");
        }
    }
}
