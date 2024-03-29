using System;
using System.Threading.Tasks;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
using System.Security.Claims ; 

namespace API.Helper
{
    public class LogUserActivity : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context , ActionExecutionDelegate next)
        {
            var resultContext = await next() ; 

            if(!resultContext.HttpContext.User.Identity.IsAuthenticated) return;
            var username = resultContext.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var repo = resultContext.HttpContext.RequestServices.GetService<IUserRepository>();
            var user = await repo.GetUserByUsernameAsync(username);
            user.LastActive = DateTime.Now; 
            await repo.SaveAllAsync();
        }        
    }
}