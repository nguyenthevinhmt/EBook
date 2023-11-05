using EBook.Utils;

namespace EBook.Dtos.Users
{
    public class CreateUserDto
    {
        /// <summary>
        /// Email
        /// </summary>
        public string Email { get; set; }
        /// <summary>
        /// Mật khẩu
        /// </summary>
        public string Password { get; set; }
        /// <summary>
        /// Loại người dùng
        /// </summary>
        [IntegerRange(AllowableValues = new int[] { 1, 2 })]
        public int Usertype { get; set; }

    }
}
