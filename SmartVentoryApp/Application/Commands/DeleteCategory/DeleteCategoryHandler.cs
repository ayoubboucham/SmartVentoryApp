using MediatR;
using SmartVentoryApp.Application.Interfaces;

namespace SmartVentoryApp.Application.Commands.DeleteCategory
{
    public class DeleteCategoryHandler : IRequestHandler<DeleteCategoryCommand, bool>
    {
        private readonly ICategoryRepository _repository;

        public DeleteCategoryHandler(ICategoryRepository repository)
        {
            _repository = repository;
        }

        public async Task<bool> Handle(DeleteCategoryCommand request, CancellationToken cancellationToken)
        {
            var existing = await _repository.GetByIdAsync(request.Id);
            if (existing is null)
                return false;

            await _repository.DeleteAsync(existing);
            return true;
        }
    }
}
