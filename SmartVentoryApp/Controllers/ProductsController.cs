using MediatR;
using Microsoft.AspNetCore.Mvc;
using SmartVentoryApp.Application.Commands.CreateCategory;
using SmartVentoryApp.Application.Queries.GetAllProducts;

namespace SmartVentoryApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ProductsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateProductCommand command)
        {
            var productId = await _mediator.Send(command);
            return Ok(new { id = productId });
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var products = await _mediator.Send(new GetAllProductsQuery());
            return Ok(products);

        }
}
}
