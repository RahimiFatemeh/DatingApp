using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Entities;
// async 
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;


namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        // inside this class we have access to our database 
        private readonly UserRepository _userRepository;
        public UsersController(UserRepository userRepository)
        {
            _userRepository = userRepository;

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            return Ok (await _userRepository.GetUsersAsync()) ; 
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<AppUser>> GetUser(string username)
        {
            return await _userRepository.GetUserByUsernameAsync(username) ;

        }
    }
}