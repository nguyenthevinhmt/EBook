namespace EBook.Dtos.Books
{
    public class RatingBookDto
    {
        public string Email { get; set; }

        /// <summary>
        /// Tên đầy đủ
        /// </summary>
        public string FullName { get; set; }
        public int BookId { get; set; }
        public string Content { get; set; }
        public int Rate { get; set; }
    }
}
