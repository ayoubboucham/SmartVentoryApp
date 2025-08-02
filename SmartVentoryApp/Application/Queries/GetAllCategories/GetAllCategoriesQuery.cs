using MediatR;
using SmartVentoryApp.Domain.Entities;

namespace SmartVentoryApp.Application.Queries.GetAllCategories
{
    public class GetAllCategoriesQuery : IRequest<IEnumerable<Category>>
    {

    }
}
