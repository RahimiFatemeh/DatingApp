using API.Entities;
using Microsoft.EntityFrameworkCore;


namespace API.Data
{
    public class DataContext : DbContext
    {
        //constractor
        public DataContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<AppUser> Users {get ; set;}
    }
}