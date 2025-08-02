using MediatR;
using SmartVentoryApp.Domain.Entities;

namespace SmartVentoryApp.Application.Queries.GetProductById
{
    public class GetProductByIdQuery : IRequest<Product?>
    {
        public int Id { get; set; }

        public GetProductByIdQuery(int id)
        {
            Id = id;
        }
    }
}
