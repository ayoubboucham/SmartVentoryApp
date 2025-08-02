using FluentValidation;
using SmartVentoryApp.Application.Commands.CreateCategory;

namespace SmartVentoryApp.Application.Commands.CreateProduct
{
    public class CreateProductCommandValidator : AbstractValidator<CreateProductCommand>
    {
        public CreateProductCommandValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Product name is required")
                .MaximumLength(10);

            RuleFor(x => x.Description)
                .MaximumLength(500);

            RuleFor(x => x.Price)
                .GreaterThan(0).WithMessage("Price must be greater than 0");

            RuleFor(x => x.Quantity)
                .GreaterThanOrEqualTo(0).WithMessage("Quantity must be >= 0");

            RuleFor(x => x.CategoryId)
                .GreaterThan(0).WithMessage("Invalid category ID");
        }
    }
}
