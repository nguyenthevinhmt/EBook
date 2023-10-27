namespace EBook.Dtos.Users
{
    public class CreateUserInfoDto
    {
        /// <summary>
        /// Email
        /// </summary>
        public string Email { get; set; } = null!;

        /// <summary>
        /// Tên đầy đủ
        /// </summary>
        public string FullName { get; set; } = null!;

    }
}
