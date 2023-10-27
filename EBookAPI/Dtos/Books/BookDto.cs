namespace EBook.Dto.Books
{
    public class BookDto
    {
        public string? Name { get; set; }
        public string? Code { get; set; }

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
        public int QuantityRemain { get; set; }
        public int Id { get; set; }
        public string? ImageUrl { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
