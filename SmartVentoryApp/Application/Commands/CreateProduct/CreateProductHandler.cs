using MediatR;
using SmartVentoryApp.Application.Commands.CreateCategory;
using SmartVentoryApp.Application.Interfaces;
using SmartVentoryApp.Domain.Entities;

namespace SmartVentoryApp.Application.Commands.CreateProduct
{
    public class CreateProductHandler : IRequestHandler<CreateProductCommand, int>
    {
        private readonly IProductRepository _repository;

        public CreateProductHandler(IProductRepository repository)
        {
            _repository = repository;
        }

        public async Task<int> Handle(CreateProductCommand request, CancellationToken cancellationToken)
        {
            var product = new Product
            {
                Name = request.Name,
                Description = request.Description,
                Price = request.Price,
                Quantity = request.Quantity,
                CategoryId = request.CategoryId
            };

            await _repository.AddAsync(product);
            return product.Id;
        }
    }
}
