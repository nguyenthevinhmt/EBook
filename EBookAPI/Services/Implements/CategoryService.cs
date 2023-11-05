using AutoMapper;
using EBook.DbContexts;
using EBook.Dtos.Categories;
using EBook.Entities;
using EBook.Services.Abstracts;

namespace EBook.Services.Implements
{
    public class CategoryService : ICategoryService
    {
        private readonly EbookDbContext _dbContext;
        private readonly IMapper _mapper;

        public CategoryService(EbookDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }
        public void Add(CreateCategoryDto input)
        {
            var check = _dbContext.Categories.Any(c => c.CategoryName == input.CategoryName);
            if (check)
            {
                throw new Exception("Tên danh mục sách đã tồn tại");
            }
            var book = _dbContext.Categories.Add(new Category
            {
                CategoryName = input.CategoryName,
                CategoryDescription = input.CategoryDescription,
            });
            _dbContext.SaveChanges();
        }

        public void Delete(int id)
        {
            var check = _dbContext.Categories.FirstOrDefault(c => c.Id == id) ?? throw new Exception("Danh mục không tồn tại");
            _dbContext.Categories.Remove(check);
            _dbContext.SaveChanges();
        }

        public List<CategoryDto> FindAll()
        {
            var result = _dbContext.Categories.ToList();
            return _mapper.Map<List<CategoryDto>>(result);
        }

        public void Update(UpdateCategoryDto input)
        {
            var check = _dbContext.Categories.FirstOrDefault(c => c.Id == input.Id) ?? throw new Exception("Danh mục không tồn tại");
            check.CategoryName = input.CategoryName;
            check.CategoryDescription = input.CategoryDescription;
            _dbContext.SaveChanges();
        }
    }
}
