using SmartVentoryApp.Domain.Entities;

namespace SmartVentoryApp.Application.Interfaces
{

        public interface ICategoryRepository
        {
            Task AddAsync(Category category);
            Task<IEnumerable<Category>> GetAllAsync();

        }
}
