namespace EBook.Dtos.Users
{
    public class UserDto
    {
        public string Username { get; set; }

        public string Email { get; set; }

        public int UserType { get; set; }

        /// <summary>
        /// Tên đầy đủ
        /// </summary>
        public string FullName { get; set; }
    }
}
