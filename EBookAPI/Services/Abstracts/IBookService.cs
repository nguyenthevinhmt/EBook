using EBook.Dto.Books;
using EBook.Dtos.Books;

namespace EBook.Services.Abstracts
{
    public interface IBookService
    {
        BookDto AddBook(CreateBookDto input);
        BookDto FindById(int bookId);
        List<BookDto> GetAllBook(FilterBookDto input);
        void Update(UpdateBookDto input);
        bool LikeBook(int bookId);
        List<BookDto> GetAllBookAdmin(FilterBookDto input);
        List<BookDto> GetAllBookLike(FilterBookDto input);
        List<BookDto> SearchBook(FilterBookDto input);

        /// <summary>
        /// Danh sách Đánh giá sách
        /// </summary>
        /// <param name="bookId"></param>
        /// <returns></returns>
        List<RatingBookDto> RatingBook(int bookId);

        /// <summary>
        /// Đánh giá sachs
        /// </summary>
        /// <param name="input"></param>
        void AddRatingBook(AddRatingBookDto input);
        void Delete(int bookId);
    }
}
