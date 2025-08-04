using MediatR;
using SmartVentoryApp.Application.Interfaces;

namespace SmartVentoryApp.Application.Commands.UpdateProduct
{
    // Command handler responsible for updating an existing product
    // Returns true if the update succeeded, or false if the product doesn't exist
    public class UpdateProductHandler : IRequestHandler<UpdateProductCommand, bool>
    {
        // Inject the product repository to interact with the database
        private readonly IProductRepository _repository;

        public UpdateProductHandler(IProductRepository repository)
        {
            _repository = repository;
        }

        public async Task<bool> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
        {
            // Try to find the product to update by its ID
            var product = await _repository.GetByIdAsync(request.Id);

            // If the product doesn't exist, return false
            if (product is null)
                return false;

            // Update product properties based on incoming command data
            product.Name = request.Name;
            product.Description = request.Description;
            product.Price = request.Price;
            product.Quantity = request.Quantity;
            product.CategoryId = request.CategoryId;

            // Persist the updated product to the database
            await _repository.UpdateAsync(product);

            // Return true to indicate successful update
            return true;
        }
    }

}
