using EBook.Dtos.Categories;

namespace EBook.Services.Abstracts
{
    public interface ICategoryService
    {
        /// <summary>
        /// Thêm mới danh mục
        /// </summary>
        void Add(CreateCategoryDto input);
        /// <summary>
        /// Danh sách danh mục
        /// </summary>
        /// <returns></returns>
        List<CategoryDto> FindAll();
        /// <summary>
        /// Cập nhật danh mục
        /// </summary>
        void Update(UpdateCategoryDto input);
        /// <summary>
        /// Xóa danh mục sách
        /// </summary>
        /// <param name="id"></param>
        void Delete(int id);
    }
}
