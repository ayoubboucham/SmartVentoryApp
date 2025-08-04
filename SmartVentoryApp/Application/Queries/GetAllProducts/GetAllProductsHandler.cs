using MediatR;
using SmartVentoryApp.Application.Interfaces;
using SmartVentoryApp.Domain.Entities;

namespace SmartVentoryApp.Application.Queries.GetAllProducts
{
    // Query handler responsible for retrieving all products from the data source
    // Implements IRequestHandler and returns a collection of Product entities
    public class GetAllProductsHandler : IRequestHandler<GetAllProductsQuery, IEnumerable<Product>>
    {
        // Inject the product repository to access product data
        private readonly IProductRepository _repository;

        public GetAllProductsHandler(IProductRepository repository)
        {
            _repository = repository;
        }

        // Handle the query by calling the repository method to fetch all products
        public async Task<IEnumerable<Product>> Handle(GetAllProductsQuery request, CancellationToken cancellationToken)
        {
            // Retrieve and return all products from the database
            return await _repository.GetAllAsync();
        }
    }

}