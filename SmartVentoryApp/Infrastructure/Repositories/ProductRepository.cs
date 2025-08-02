using Microsoft.EntityFrameworkCore;
using SmartVentoryApp.Application.Interfaces;
using SmartVentoryApp.Domain.Entities;
using SmartVentoryApp.Infrastructure.Data;

namespace SmartVentoryApp.Infrastructure.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly AppDbContext _context;

        public ProductRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
        }
        public async Task<IEnumerable<Product>> GetAllAsync()
        {
            return await _context.Products.ToListAsync();
        }
    }
}
