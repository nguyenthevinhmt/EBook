namespace EBook.Dto.Books
{
    public class CreateBookDto
    {
        public string Name { get; set; } = null!;

        /// <summary>
        /// Loại sách
        /// </summary>
        public int Category { get; set; }

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
        public int Quantity { get; set; }

        public string ImageUrl { get; set; } = null!;
    }
}
