using EBook.Entities;
using Microsoft.EntityFrameworkCore;

namespace EBook.DbContexts
{
    public class EbookDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<FavoriteBook> FavoriteBooks { get; set; }

        public EbookDbContext(DbContextOptions<EbookDbContext> options) : base(options)
        {
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("User");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd()
                    .IsRequired();

                entity.Property(e => e.Username)
                    .HasMaxLength(50)
                    .IsRequired();

                entity.Property(e => e.Password)
                    .HasMaxLength(500)
                    .IsRequired();

                entity.Property(e => e.FullName)
                .HasMaxLength(50);

            });

            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, CategoryName = "Văn học", CategoryDescription = "Văn học nghệ thuật" }
                );
        }
    }
}
