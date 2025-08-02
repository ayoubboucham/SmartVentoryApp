using MediatR;
using SmartVentoryApp.Application.Interfaces;
using SmartVentoryApp.Domain.Entities;

namespace SmartVentoryApp.Application.Queries.GetAllCategories
{
    public class GetAllCategoriesHandler : IRequestHandler<GetAllCategoriesQuery, IEnumerable<Category>>
    {
        private readonly ICategoryRepository _repository;

        public GetAllCategoriesHandler(ICategoryRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Category>> Handle(GetAllCategoriesQuery request, CancellationToken cancellationToken)
        {
            return await _repository.GetAllAsync();
        }
    }
}
