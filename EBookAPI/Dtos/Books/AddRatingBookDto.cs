namespace EBook.Dtos.Books
{
    public class AddRatingBookDto
    {
        public int BookId {  get; set; }

        private string _content;
        public string Content {  get => _content; set => _content = value?.Trim(); }
        public int Rate {  get; set; }
    }
}
