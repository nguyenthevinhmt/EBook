using System.ComponentModel.DataAnnotations;

namespace EBook.Dtos.Users
{
    public class LoginDto
    {
        private string _email;
        [Required(AllowEmptyStrings = false, ErrorMessage = "Tên đăng nhập không được bỏ trống")]
        public string Email
        {
            get => _email;
            set => _email = value?.Trim();
        }

        private string _password;
        [Required(AllowEmptyStrings = false, ErrorMessage = "Mật khẩu không được bỏ trống")]
        public string Password
        {
            get => _password;
            set => _password = value?.Trim();
        }
    }
}
