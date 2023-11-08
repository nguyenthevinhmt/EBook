using AutoMapper;
using EBook.DbContexts;
using EBook.Dto.Books;
using EBook.Dtos.Books;
using EBook.Dtos.Files;
using EBook.Entities;
using EBook.Services.Abstracts;
using EBook.Utils;
using Microsoft.EntityFrameworkCore;

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
            book.ViewBook += 1;
            _dbContext.SaveChanges();
            var result = _mapper.Map<BookDto>(book);
            result.CountLike = _dbContext.FavoriteBooks.Count(b => b.BookId == book.Id);
            try
            {
                result.IsLike = _dbContext.FavoriteBooks.Any(b => b.BookId == book.Id && b.UserId == CommonUtils.GetCurrentUserId(_httpContext));
            }
            catch (Exception ex)
            {

            }
            result.RatingBooks = RatingBook(bookId);
            if (result.RatingBooks.Count() > 0)
            {
                result.Rate = result.RatingBooks.Select(x => x.Rate).Sum() / result.RatingBooks.Count();
            }
            return result;
        }

        public List<BookDto> SearchBook(FilterBookDto input)
        {
            var bookQuery = _dbContext.Books.Include(c => c.FavoriteBooks)
                            .Where(c => !c.Deleted && (input.CategoryId == null || input.CategoryId == c.CategoryId)
                                && (input.Name == null || c.Name.Contains(input.Name)))
                            .Select(c => new BookDto
                            {
                                Id = c.Id,
                                Code = c.Code,
                                Name = c.Name,
                                LikeCount = c.FavoriteBooks.Count(),
                                CategoryId = c.CategoryId,
                                CategoryName = c.Category.CategoryName,
                                Author = c.Author,
                                ImageUrl = c.ImageUrl,
                                FileUrl = c.FileUrl,
                                PublishingCompany = c.PublishingCompany,
                                PublishingYear = c.PublishingYear,
                                Description = c.Description,
                            });
            if (input.Index != null)
            {
                bookQuery = bookQuery.Take(input.Index ?? 0);
            }
            return bookQuery.ToList();
        }

        public List<BookDto> GetAllBook(FilterBookDto input)
        {
            var bookQuery = _dbContext.Books.Include(c => c.FavoriteBooks).Where(c => !c.Deleted && (input.CategoryId == null || input.CategoryId == c.CategoryId)
                                            && (input.Name == null || c.Name.ToLower().Contains(input.Name.ToLower())))
                                            .Select(c => new BookDto
                                            {
                                                Id = c.Id,
                                                Code = c.Code,
                                                Name = c.Name,
                                                LikeCount = c.FavoriteBooks.Count(),
                                                CategoryId = c.CategoryId,
                                                CategoryName = c.Category.CategoryName,
                                                Author = c.Author,
                                                ImageUrl = c.ImageUrl,
                                                FileUrl = c.FileUrl,
                                                PublishingCompany = c.PublishingCompany,
                                                PublishingYear = c.PublishingYear,
                                                Description = c.Description,
                                            });
            if (input.Index != null)
            {
                bookQuery = bookQuery.Take(input.Index ?? 0);
            }
            return bookQuery.ToList();
        }

        public List<BookDto> GetAllBookAdmin(FilterBookDto input)
        {
            var userId = CommonUtils.GetCurrentUserId(_httpContext);
            var bookQuery = _dbContext.Books.Include(c => c.FavoriteBooks).Where(c => c.UserId == userId && !c.Deleted && (input.CategoryId == null || input.CategoryId == c.CategoryId))
                                            .Select(c => new BookDto
                                            {
                                                Id = c.Id,
                                                Code = c.Code,
                                                Name = c.Name,
                                                LikeCount = c.FavoriteBooks.Count(),
                                                CategoryId = c.CategoryId,
                                                CategoryName = c.Category.CategoryName,
                                                Author = c.Author,
                                                ImageUrl = c.ImageUrl,
                                                FileUrl = c.FileUrl,
                                                PublishingCompany = c.PublishingCompany,
                                                PublishingYear = c.PublishingYear,
                                                Description = c.Description,
                                            });
            if (input.Index != null)
            {
                bookQuery = bookQuery.Take(input.Index ?? 0);
            }
            return bookQuery.ToList();
        }

        public List<BookDto> GetAllBookLike(FilterBookDto input)
        {
            var userId = CommonUtils.GetCurrentUserId(_httpContext);
            var bookQuery = _dbContext.Books.Include(c => c.FavoriteBooks).Where(c => c.FavoriteBooks.Any(b => b.UserId == userId) && !c.Deleted && (input.CategoryId == null || input.CategoryId == c.CategoryId))
                                            .Select(c => new BookDto
                                            {
                                                Id = c.Id,
                                                Code = c.Code,
                                                Name = c.Name,
                                                LikeCount = c.FavoriteBooks.Count(),
                                                CategoryId = c.CategoryId,
                                                CategoryName = c.Category.CategoryName,
                                                Author = c.Author,
                                                ImageUrl = c.ImageUrl,
                                                FileUrl = c.FileUrl,
                                                PublishingCompany = c.PublishingCompany,
                                                PublishingYear = c.PublishingYear,
                                                Description = c.Description,
                                            });
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

        public List<RatingBookDto> RatingBook(int bookId)
        {
            var result = from rating in _dbContext.RatingBooks
                         join user in _dbContext.Users on rating.UserId equals user.Id
                         where rating.BookId == bookId && !rating.Deleted
                         select new RatingBookDto
                         {
                             BookId = rating.BookId,
                             Content = rating.Content,
                             Rate = rating.Rate,
                             Email = user.Email,
                             FullName = user.FullName
                         };
            return result.ToList();
        }

        public void AddRatingBook(AddRatingBookDto input)
        {
            var userId = CommonUtils.GetCurrentUserId(_httpContext);
            var book = _dbContext.Books.FirstOrDefault(b => b.Id == input.BookId && !b.Deleted)
                ?? throw new Exception($"Không tìm thấy sách");
            var rating = _dbContext.RatingBooks.FirstOrDefault(b => b.BookId == input.BookId && b.UserId == userId);
            if (rating != null)
            {
                rating.Rate = input.Rate;
                rating.Content = input.Content;   
                _dbContext.SaveChanges();
            }
            else
            {
                _dbContext.RatingBooks.Add(new RatingBook
                {
                    UserId = userId,
                    BookId = input.BookId,
                    Content = input.Content,
                    Rate = input.Rate,
                });
                _dbContext.SaveChanges();
            }
        }
    }
}
