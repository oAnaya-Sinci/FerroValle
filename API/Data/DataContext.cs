using Microsoft.EntityFrameworkCore;
using API.Models;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options){}

        public DbSet<datosReporte> datosReporte { get; set; }   
        public DbSet<datFileInformation> datFileInformation { get; set; } 
        public DbSet<alarmsLogs> alarmsLogs { get; set; }
    }
}