namespace EBook.Dtos.Users
{
    public class CreateUserDto
    {
        /// <summary>
        /// Tên người dùng
        /// </summary>
        public string Username { get; set; } = null!;
        /// <summary>
        /// Mật khẩu
        /// </summary>
        public string Password { get; set; } = null!;

    }
}
