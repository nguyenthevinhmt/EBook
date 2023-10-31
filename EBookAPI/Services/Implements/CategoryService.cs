using AutoMapper;
using EBook.DbContexts;
using EBook.Dtos.Categories;
using EBook.Entities;
using EBook.Migrations;
using EBook.Services.Abstracts;
using Microsoft.EntityFrameworkCore;

namespace EBook.Services.Implements
{
    public class CategoryService : ICategoryService
    {
        private readonly EbookDbContext _dbContext;
        private readonly IMapper _mapper;

        public CategoryService(EbookDbContext dbContext, IMapper mapper) {
            _dbContext = dbContext;
            _mapper = mapper;
        }
        public void Add(CreateCategoryDto input)
        {
            var check = _dbContext.Categories.FirstOrDefault(c => c.CategoryName == input.CategoryName) ?? throw new Exception("Tên danh mục sách đã tồn tại");
            var book = _dbContext.Categories.Add(new Category
            {
                CategoryName = input.CategoryName,
                CategoryDescription = input.CategoryDescription,
            });
            _dbContext.SaveChanges();
        }

        public void Delete(int id)
        {
            var check = _dbContext.Categories.FirstOrDefault(c => c.Id == id);
            _dbContext.Categories.Remove(check);
            _dbContext.SaveChanges();
        }

        public List<CategoryDto> FindAll()
        {
            var result = _dbContext.Categories.ToList();
            return _mapper.Map<List<CategoryDto>>(result);
        }

        public void Update()
        {
            throw new NotImplementedException();
        }
    }
}
