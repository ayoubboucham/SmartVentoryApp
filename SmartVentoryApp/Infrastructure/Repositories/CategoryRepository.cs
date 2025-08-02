using Microsoft.EntityFrameworkCore;
using SmartVentoryApp.Application.Interfaces;
using SmartVentoryApp.Domain.Entities;
using SmartVentoryApp.Infrastructure.Data;

namespace SmartVentoryApp.Infrastructure.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly AppDbContext _context;

        public CategoryRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Category category)
        {
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();
        }
        public async Task<IEnumerable<Category>> GetAllAsync()
        {
            return await _context.Categories.ToListAsync();
        }
    }
}
