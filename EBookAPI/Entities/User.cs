using System.ComponentModel.DataAnnotations;

namespace EBook.Entities
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        /// <summary>
        /// Tên đăng nhập
        /// </summary>
        public string Username { get; set; } = null!;

        /// <summary>
        /// 1: Admin, 2 Username
        /// </summary>
        public int Usertype { get; set; }

        /// <summary>
        /// Mật khẩu
        /// </summary>
        public string Password { get; set; } = null!;

        /// <summary>
        /// Email
        /// </summary>
        public string? Email { get; set; }

        /// <summary>
        /// Tên đầy đủ
        /// </summary>
        public string? FullName { get; set; }
        public List<FavoriteBook> FavoriteBooks { get; set; } = new();

    }
}
