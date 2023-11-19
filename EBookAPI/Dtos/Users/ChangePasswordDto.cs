namespace EBook.Dtos.Users
{
    public class ChangePasswordDto
    {
        private string _oldPassword;
        public string oldPassWord
        {
            get => _oldPassword;
            set => _oldPassword = value?.Trim();
        }
        private string _newPassword;
        public string newPassWord
        {
            get => _newPassword;
            set => _newPassword = value?.Trim();
        }
    }
}
