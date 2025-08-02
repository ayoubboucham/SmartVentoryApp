using FluentValidation;

namespace SmartVentoryApp.Application.Commands.CreateCategory
{
    public class CreateCategoryCommandValidator : AbstractValidator<CreateCategoryCommand>
    {
        public CreateCategoryCommandValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Category name is required")
                .MaximumLength(10).WithMessage("Category name must not exceed 10 characters");
        }
    }
}
