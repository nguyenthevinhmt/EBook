using EBook.Dtos.Categories;
using EBook.Services.Abstracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EBook.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet("find-all")]
        public IActionResult GetAll()
        {
            try
            {
                return Ok(_categoryService.FindAll());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("add")]
        public IActionResult Add([FromBody] CreateCategoryDto input)
        {
            try
            {
                _categoryService.Add(input);
                return Ok("Created");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("update")]
        public IActionResult Update([FromBody] UpdateCategoryDto input)
        {
            try
            {
                _categoryService.Update(input);
                return Ok("Updated");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("delete/{id}")]
        public IActionResult Remove(int id)
        {
            try
            {
                _categoryService.Delete(id);
                return Ok("Deleted");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
