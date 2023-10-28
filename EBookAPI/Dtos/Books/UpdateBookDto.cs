namespace EBook.Dto.Books
{
    public class UpdateBookDto 
    {
        public int Id { get; set; }
        private string _name = null!;
        /// <summary>
        /// Tên sách
        /// </summary>
        public string Name
        {
            get => _name;
            set => _name = value.Trim();
        }

        /// <summary>
        /// Mã sách
        /// </summary>
        public string Code { get; set; } = null!;

        /// <summary>
        /// Đường dẫn file
        /// </summary>
        public IFormFile? FileUrl { get; set; }
        /// <summary>
        /// Id loại sách
        /// </summary>
        public int CategoryId { get; set; }

        /// <summary>
        /// Tác giả
        /// </summary>
        public string Author { get; set; } = null!;

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
        public int Quantity { get; set; }

        /// <summary>
        /// Mô tả
        /// </summary>
        public string? Description { get; set; }

        /// <summary>
        /// Ảnh của sách
        /// </summary>
        public IFormFile? ImageUrl { get; set; }
    }
}
