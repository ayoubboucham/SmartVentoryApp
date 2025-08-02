using MediatR;
using SmartVentoryApp.Domain.Entities;

namespace SmartVentoryApp.Application.Queries.GetCategoryById
{
    public class GetCategoryByIdQuery : IRequest<Category?>
    {
        public int Id { get; set; }

        public GetCategoryByIdQuery(int id)
        {
            Id = id;
        }
    }
}
