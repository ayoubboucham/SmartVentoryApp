using MediatR;
using SmartVentoryApp.Application.Interfaces;
using SmartVentoryApp.Domain.Entities;

namespace SmartVentoryApp.Application.Queries.GetAllProducts
{
    public class GetAllProductsHandler : IRequestHandler<GetAllProductsQuery, IEnumerable<Product>>
    {
        private readonly IProductRepository _repository;

        public GetAllProductsHandler(IProductRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Product>> Handle(GetAllProductsQuery request, CancellationToken cancellationToken)
        {
            return await _repository.GetAllAsync();
        }

    }
}
