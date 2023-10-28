using EBook.Entities;

namespace EBook.Dto.Books
{
    public class BookDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }

        /// <summary>
        /// Tên sách
        /// </summary>
        public string? Name { get; set; }

        /// <summary>
        /// Mã sách
        /// </summary>
        public string? Code { get; set; }

        /// <summary>
        /// Đường dẫn file
        /// </summary>
        public string? FileUrl { get; set; }
        /// <summary>
        /// Id loại sách
        /// </summary>
        public int CategoryId { get; set; }
        public string? CategoryName { get; set; }
        public Category Category { get; set; }

        /// <summary>
        /// Tác giả
        /// </summary>
        public string? Author { get; set; }

        /// <summary>
        /// Nhà xuất bản
        /// </summary>
        public string? PublishingCompany { get; set; }

        /// <summary>
        /// Năm xuất bản
        /// </summary>
        public string? PublishingYear { get; set; }

        /// <summary>
        /// Số lượng
        /// </summary>
        public int? Quantity { get; set; }

        /// <summary>
        /// Mô tả
        /// </summary>
        public string? Description { get; set; }

        /// <summary>
        /// Ảnh của sách
        /// </summary>
        public string? ImageUrl { get; set; }
        public DateTime CreatedDate { get; set; }

        public bool IsLike { get; set; }
    }
}
