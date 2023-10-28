using AutoMapper;
using EBook.DbContexts;
using EBook.Dto.Books;
using EBook.Dtos.Files;
using EBook.Entities;
using EBook.Services.Abstracts;
using EBook.Utils;

namespace EBook.Services.Implements
{
    public class BookService : IBookService
    {
        private readonly ILogger<BookService> _logger;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        private readonly IFileService _fileService;
        private readonly IHttpContextAccessor _httpContext;
        private readonly EbookDbContext _dbContext;

        public BookService(ILogger<BookService> logger, IConfiguration configuration,
            IHttpContextAccessor httpContext,
            IMapper mapper,
            IFileService fileService,
            EbookDbContext dbContext)
        {
            _logger = logger;
            _configuration = configuration;
            _httpContext = httpContext;
            _mapper = mapper;
            _fileService = fileService;
            _dbContext = dbContext;
        }

        public BookDto AddBook(CreateBookDto input)
        {
            var userId = CommonUtils.GetCurrentUserId(_httpContext);
            var bookUrl = _fileService.UploadFile(new UploadFileModel
            {
                File = input.FileUrl,
                Folder = "BookFile"
            });
            var imageUrl = _fileService.UploadFile(new UploadFileModel
            {
                File = input.ImageUrl,
                Folder = "BookImage"
            });
            var insert = _dbContext.Books.Add(new Book
            {
                UserId = userId,
                Name = input.Name,
                Code = input.Code,
                FileUrl = bookUrl,
                ImageUrl = imageUrl,
                CategoryId = input.CategoryId,
                Author = input.Author,
                PublishingCompany = input.PublishingCompany,
                PublishingYear = input.PublishingYear,
                Quantity = input.Quantity,
                Description = input.Description,
                CreatedDate = DateTime.Now,
            });
            _dbContext.SaveChanges();
            return _mapper.Map<BookDto>(insert.Entity);
        }

        public void Update(UpdateBookDto input)
        {
            var userId = CommonUtils.GetCurrentUserId(_httpContext);

            var book = _dbContext.Books.FirstOrDefault(b => b.Id == input.Id && b.UserId == userId && !b.Deleted)
                ?? throw new Exception($"Không tìm thấy sách");

            if (input.FileUrl != null)
            {

                var bookUrl = _fileService.UploadFile(new UploadFileModel
                {
                    File = input.FileUrl,
                    Folder = "BookFile"
                });
                book.FileUrl = bookUrl;
            }
            if (input.ImageUrl != null)
            {
                var imageUrl = _fileService.UploadFile(new UploadFileModel
                {
                    File = input.ImageUrl,
                    Folder = "BookImage"
                });
            }
            book.Name = input.Name;
            book.CategoryId = input.CategoryId;
            book.Author = input.Author;
            book.Description = input.Description;
            book.PublishingCompany = input.PublishingCompany;
            book.PublishingYear = input.PublishingYear;
            _dbContext.SaveChanges();
        }

        /// <summary>
        /// Xem thông tin sách
        /// </summary>
        /// <param name="bookId"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public BookDto FindById(int bookId)
        {
            var book = _dbContext.Books.FirstOrDefault(b => b.Id == bookId && !b.Deleted)
                ?? throw new Exception($"Không tìm thấy sách");
            var result = _mapper.Map<BookDto>(book);
            result.IsLike = _dbContext.FavoriteBooks.Any(b => b.UserId == CommonUtils.GetCurrentUserId(_httpContext));
            return result;
        }

        public List<BookDto> GetAllBook(FilterBookDto input)
        {
            var bookQuery = from book in _dbContext.Books
                            where !book.Deleted && (input.CategoryId == null || input.CategoryId == book.CategoryId)
                            && (input.Name == null || book.Name.Contains(input.Name))
                            && (input.Code == null || book.Code.Contains(input.Code))
                            select new BookDto
                            {
                                Id = book.Id,
                                Code = book.Code,
                                Name = book.Name,
                                CategoryId = book.CategoryId,
                                CategoryName = book.Category.CategoryName,
                                Author = book.Author,
                                ImageUrl = book.ImageUrl,
                                FileUrl = book.FileUrl,
                                PublishingCompany = book.PublishingCompany,
                                PublishingYear = book.PublishingYear,
                                Description = book.Description
                            };
            return bookQuery.ToList();
        }

        public bool LikeBook(int bookId)
        {
            var userId = CommonUtils.GetCurrentUserId(_httpContext);
            var book = _dbContext.Books.FirstOrDefault(b => b.Id == bookId && !b.Deleted)
                ?? throw new Exception($"Không tìm thấy sách");
            var favoriteBook = _dbContext.FavoriteBooks.FirstOrDefault(b => b.BookId == bookId && b.UserId == userId);
            if (favoriteBook != null)
            {
                _dbContext.FavoriteBooks.Remove(favoriteBook);
                _dbContext.SaveChanges();
                return false;
            }
            else
            {
                _dbContext.FavoriteBooks.Add(new FavoriteBook
                {
                    UserId = userId,
                    BookId = bookId
                });
                _dbContext.SaveChanges();
                return true;
            }
        }
    }
}
