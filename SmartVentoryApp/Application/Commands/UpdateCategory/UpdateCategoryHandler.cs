using MediatR;
using SmartVentoryApp.Application.Interfaces;

namespace SmartVentoryApp.Application.Commands.UpdateCategory
{
    public class UpdateCategoryHandler : IRequestHandler<UpdateCategoryCommand, bool>
    {
        private readonly ICategoryRepository _repository;

        public UpdateCategoryHandler(ICategoryRepository repository)
        {
            _repository = repository;
        }

        public async Task<bool> Handle(UpdateCategoryCommand request, CancellationToken cancellationToken)
        {
            var category = await _repository.GetByIdAsync(request.Id);
            if (category == null)
                return false;

            category.Name = request.Name;
            await _repository.UpdateAsync(category);
            return true;
        }
    }
}
