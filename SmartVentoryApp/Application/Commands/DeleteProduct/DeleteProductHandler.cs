using MediatR;
using SmartVentoryApp.Application.Interfaces;

namespace SmartVentoryApp.Application.Commands.DeleteProduct
{
    // Command handler responsible for deleting a product by its ID
    // Returns true if the product was found and deleted, false otherwise
    public class DeleteProductHandler : IRequestHandler<DeleteProductCommand, bool>
    {
        // Inject the product repository to access the data layer
        private readonly IProductRepository _repository;

        public DeleteProductHandler(IProductRepository repository)
        {
            _repository = repository;
        }

        public async Task<bool> Handle(DeleteProductCommand request, CancellationToken cancellationToken)
        {
            // Try to retrieve the product from the database using the provided ID
            var product = await _repository.GetByIdAsync(request.Id);

            // If no product was found, return false to indicate failure
            if (product == null)
                return false;

            // If found, delete the product from the database
            await _repository.DeleteAsync(product);

            // Return true to confirm successful deletion
            return true;
        }
    }

}
