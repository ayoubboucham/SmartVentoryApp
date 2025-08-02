using SmartVentoryApp.Domain.Entities;

namespace SmartVentoryApp.Application.Interfaces
{
    
        public interface IProductRepository
        {
            Task AddAsync(Product product);
            Task<IEnumerable<Product>> GetAllAsync();
    }
    
}