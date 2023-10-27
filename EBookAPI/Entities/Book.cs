namespace EBook.Entities
{
    public class Book
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; } = null!;
        public string Code { get; set; } = null!;
        public string FileUrl { get; set; } = null!;
        /// <summary>
        /// Id loại sách
        /// </summary>
        public int CategoryId { get; set; }
        public Category Category { get; set; } = new();

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
        public string ImageUrl { get; set; } = null!;
        public DateTime CreatedDate { get; set; }
        public bool Deleted { get; set; }
        public List<FavoriteBook> FavoriteBooks { get; set; } = new();


    }
}
