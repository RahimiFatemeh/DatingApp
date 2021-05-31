using System.IO ; 
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedUsers(DataContext context) 
        {
            var userData = await File.ReadAllTextAsync("Data/UserSeedData.json") ; 
            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);

            if (users == null) { return; }
            foreach(var user in users) 
            {
                var hmac = new HMACSHA512() ;
                user.UserName = user.UserName.ToLower();
                user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$w00rd"));     
                user.PasswordSalt = hmac.Key;

                await context.Users.AddAsync(user);
            }
            
            await context.SaveChangesAsync();
         }
    }
}