using EBook.Dto.Books;
using EBook.Dtos.Books;
using EBook.Dtos.Users;
using EBook.Services.Abstracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EBook.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/book")]
    public class BookController : ApiControllerBase
    {
        private readonly IBookService _bookServices;

        public BookController(ILogger<BookController> logger, IBookService bookServices) : base(logger)
        {
            _bookServices = bookServices;
        }

        [HttpPost("add")]
        public IActionResult AddBook([FromForm] CreateBookDto input)
        {
            try
            {
                return Ok(_bookServices.AddBook(input));
            }
            catch (Exception ex)
            {
                return ReturnException(ex);
            }
        }

        [HttpPut("update")]
        public IActionResult UpdateBook([FromForm] UpdateBookDto input)
        {
            try
            {
                _bookServices.Update(input);
                return Ok();
            }
            catch (Exception ex)
            {
                return ReturnException(ex);
            }
        }

        [HttpGet("find-by-id/{bookId}")]
        public IActionResult FindById(int bookId)
        {
            try
            {
                return Ok(_bookServices.FindById(bookId));
            }
            catch (Exception ex)
            {
                return ReturnException(ex);
            }
        }

        [HttpGet("get-all")]
        public IActionResult GetAll([FromQuery] FilterBookDto input)
        {
            try
            {

                return Ok(_bookServices.GetAllBook(input));
            }
            catch (Exception ex)
            {
                return ReturnException(ex);
            }
        }

        [HttpGet("get-all-like")]
        public IActionResult GetAllBookLike([FromQuery] FilterBookDto input)
        {
            try
            {

                return Ok(_bookServices.GetAllBookLike(input));
            }
            catch (Exception ex)
            {
                return ReturnException(ex);
            }
        }

        [HttpGet("get-all-admin")]
        public IActionResult GetAllBookAdmin([FromQuery] FilterBookDto input)
        {
            try
            {

                return Ok(_bookServices.GetAllBookAdmin(input));
            }
            catch (Exception ex)
            {
                return ReturnException(ex);
            }
        }

        [HttpGet("search-book")]
        public IActionResult SearchBook([FromQuery] FilterBookDto input)
        {
            try
            {

                return Ok(_bookServices.SearchBook(input));
            }
            catch (Exception ex)
            {
                return ReturnException(ex);
            }
        }

        [HttpPut("like/{bookId}")]
        public IActionResult LikeBook(int bookId)
        {
            try
            {
                return Ok(_bookServices.LikeBook(bookId));
            }
            catch (Exception ex)
            {
                return ReturnException(ex);
            }
        }

        [HttpGet("get-rating-book/{bookId}")]
        public IActionResult RatingBook(int bookId)
        {
            try
            {

                return Ok(_bookServices.RatingBook(bookId));
            }
            catch (Exception ex)
            {
                return ReturnException(ex);
            }
        }

        [HttpPost("add-rating-book")]
        public IActionResult AddRatingBook(AddRatingBookDto input)
        {
            try
            {
                _bookServices.AddRatingBook(input);
                return Ok();
            }
            catch (Exception ex)
            {
                return ReturnException(ex);
            }
        }
    }
}
