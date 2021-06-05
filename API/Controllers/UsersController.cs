using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Entities;
using API.DTOs ; 
using AutoMapper ; 
using API.Interfaces ; 
// async
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims ; 


namespace API.Controllers
{
    // [Authorize]
    public class UsersController : BaseApiController
    {
        // inside this class we have access to our database 
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public UsersController(IUserRepository userRepository , IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;

        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var users = await _userRepository.GetMembersAsync() ; 
            return Ok(users) ; 
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            return await _userRepository.GetMemberAsync(username);
        }

        // [HttpPut]
        // public async Task<ActionResult> Update(MemeberUpdateDtos memeberUpdateDtos)
        // {
        //     var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value ; 
        //     var user = await _userRepository.GetUserByUsernameAsync(username);

        //     _mapper.Map<memeberUpdateDtos , user> ; 
            
        //     _userRepository.Update(user); 

        //     if( await _userRepository.SaveAllAsync()) return NoContent();
        //     return BadRequest("Failed to updat user"); 
        // }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDtos memberUpdateDtos)
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _userRepository.GetUserByUsernameAsync(username);

            _mapper.Map(memberUpdateDtos, user);

            _userRepository.Update(user);

            if (await _userRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update user");
        }
    }
}