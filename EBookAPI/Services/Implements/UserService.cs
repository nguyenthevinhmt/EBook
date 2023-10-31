using AutoMapper;
using EBook.DbContexts;
using EBook.Dtos.Users;
using EBook.Entities;
using EBook.Services.Abstracts;
using EBook.Utils;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace EBook.Services.Implements
{
    public class UserService : IUserService
    {
        private readonly ILogger<UserService> _logger;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;

        private readonly IHttpContextAccessor _httpContext;
        private readonly EbookDbContext _dbContext;

        public UserService(ILogger<UserService> logger, IConfiguration configuration,
            IHttpContextAccessor httpContext,
            IMapper mapper,
            EbookDbContext dbContext)
        {
            _logger = logger;
            _configuration = configuration;
            _httpContext = httpContext;
            _mapper = mapper;
            _dbContext = dbContext;
        }

        public UserDto FindMyInfo()
        {
            var userId = CommonUtils.GetCurrentUserId(_httpContext);
            var user = _dbContext.Users.FirstOrDefault(u => u.Id == userId);
            var result = _mapper.Map<UserDto>(user);
            return result;
        }

        public void Create(CreateUserDto input)
        {
            var checkEmail = _dbContext.Users.Any(u => u.Email == input.Email);
            if (checkEmail)
            {
                throw new Exception($"Tài khoản người dùng đã tồi tại");
            }
            _dbContext.Users.Add(new User
            {
                Email = input.Email,
                Password = CommonUtils.CreateMD5(input.Password),
                Usertype = input.Usertype
            });
            _dbContext.SaveChanges();
        }

        public void CreateInfoUser(CreateUserInfoDto input)
        {
            var userId = CommonUtils.GetCurrentUserId(_httpContext);

            var user = _dbContext.Users.FirstOrDefault(u => u.Id == userId);
            if (user != null)
            {
                user.FullName = input.FullName;
            }
            _dbContext.SaveChanges();
        }

        public LoginResultDto Login(LoginDto input)
        {
            var user = _dbContext.Users.FirstOrDefault(u => u.Email == input.Email);
            if (user == null)
            {
                throw new Exception($"Tài khoản hoặc mật khẩu không chính xác");
            }

            if (CommonUtils.CreateMD5(input.Password) == user.Password)
            {
                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

                var claims = new List<Claim>
                {
                    new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                };

                var token = new JwtSecurityToken(
                    issuer: _configuration["JWT:ValidIssuer"],
                    audience: _configuration["JWT:ValidAudience"],
                    expires: DateTime.Now.AddSeconds(86400),
                    claims: claims,
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );
                return new LoginResultDto()
                {
                    Token = new JwtSecurityTokenHandler().WriteToken(token),
                };
            }
            else
            {
                throw new Exception("Tài khoản hoặc mật khẩu không chính xác");
            }
        }
    }
}
