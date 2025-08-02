using MediatR;
using SmartVentoryApp.Domain.Entities;

namespace SmartVentoryApp.Application.Queries.GetAllProducts
{
    public class GetAllProductsQuery : IRequest<IEnumerable<Product>>
    {
    }
}
