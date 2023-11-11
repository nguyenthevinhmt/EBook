using EBook.Dtos.Users;

namespace EBook.Services.Abstracts
{
    public interface IUserService
    {
        void Create(CreateUserDto input);
        LoginResultDto Login(LoginDto input);
        void CreateInfoUser(CreateUserInfoDto input);
        UserDto FindMyInfo();
        void UpdateInfo();
    }
}
