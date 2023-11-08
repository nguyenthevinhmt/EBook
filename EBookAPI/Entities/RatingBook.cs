namespace EBook.Entities
{
    public class RatingBook
    {
        public int Id { get; set; }
        public int BookId { get; set; }
        public Book Book { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int Rate { get; set; }
        public string Content { get; set; }
        public bool Deleted { get; set; }
    }
}
