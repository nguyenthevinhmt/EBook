namespace EBook.Dto.Books
{
    public class FilterBookDto
    {
        private string? _name {  get; set; }
        public string? Name 
        { 
            get => _name; 
            set => _name = value?.Trim(); }
        public string? Code { get; set; }

        /// <summary>
        /// Loại sách
        /// </summary>
        public int? CategoryId { get; set; }

        /// <summary>
        /// Lấy bao nhiêu bản ghi
        /// </summary>
        public int? Index {  get; set; }
    }
}
