using API.Entities; 
using System.Threading.Tasks;
using System.Collections.Generic ; 
using API.DTOs ; 
using API.Helper; 
namespace API.Interfaces
{
    public interface IUserRepository
    {
         void Update(AppUser user) ;

         Task<bool> SaveAllAsync() ;

         Task<IEnumerable<AppUser>> GetUsersAsync() ; 

         Task<AppUser> GetUserByIdAsync(int id) ; 

         Task<AppUser> GetUserByUsernameAsync(string name) ; 
         Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParams);
         Task<MemberDto> GetMemberAsync(string username);

    }
}