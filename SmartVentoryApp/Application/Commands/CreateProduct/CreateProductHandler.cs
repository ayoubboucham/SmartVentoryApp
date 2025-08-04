using MediatR;
using SmartVentoryApp.Application.Commands.CreateCategory;
using SmartVentoryApp.Application.Interfaces;
using SmartVentoryApp.Domain.Entities;

namespace SmartVentoryApp.Application.Commands.CreateProduct
{
    // Command handler responsible for creating a new product
    // Implements MediatR's IRequestHandler — returns the ID of the newly created product
    public class CreateProductHandler : IRequestHandler<CreateProductCommand, int>
    {
        // Inject the product repository to handle data access
        private readonly IProductRepository _repository;

        public CreateProductHandler(IProductRepository repository)
        {
            _repository = repository;
        }

        // Handle the incoming command: map the request to a Product entity, save it, and return its ID
        public async Task<int> Handle(CreateProductCommand request, CancellationToken cancellationToken)
        {
            // Map command data into a new Product domain entity
            var product = new Product
            {
                Name = request.Name,
                Description = request.Description,
                Price = request.Price,
                Quantity = request.Quantity,
                CategoryId = request.CategoryId
            };

            // Persist the product using the repository abstraction
            await _repository.AddAsync(product);

            // Return the generated ID from the database
            return product.Id;
        }
    }

}
