using SmartVentoryApp.Domain.Entities;

namespace SmartVentoryApp.Application.Interfaces
{
    
        public interface IProductRepository
        {
            Task AddAsync(Product product);
            Task<IEnumerable<Product>> GetAllAsync();
            Task<Product?> GetByIdAsync(int id);
            Task UpdateAsync(Product product);
            Task DeleteAsync(Product product);
    }
    
}