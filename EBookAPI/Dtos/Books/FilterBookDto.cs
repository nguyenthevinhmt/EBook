namespace EBook.Dto.Books
{
    public class FilterBookDto
    {
        public string? Name { get; set; }
        public string? Code { get; set; }

        /// <summary>
        /// Loại sách
        /// </summary>
        public int? CategoryId { get; set; }

    }
}
