using EBook.Dto.Books;

namespace EBook.Services.Abstracts
{
    public interface IBookService
    {
        BookDto AddBook(CreateBookDto input);
        BookDto FindById(int bookId);
        List<BookDto> GetAllBook(FilterBookDto input);
        void Update(UpdateBookDto input);
        bool LikeBook(int bookId);
    }
}
