using MediatR;
using Microsoft.AspNetCore.Mvc;
using SmartVentoryApp.Application.Commands.CreateCategory;

namespace SmartVentoryApp.Controllers
{
        [ApiController]
        [Route("api/[controller]")]
    public class CategoriesController:ControllerBase
    {
       
            private readonly IMediator _mediator;

            public CategoriesController(IMediator mediator)
            {
                _mediator = mediator;
            }

            [HttpPost]
            public async Task<IActionResult> Create([FromBody] CreateCategoryCommand command)
            {
                var id = await _mediator.Send(command);
                return Ok(new { id });
            }
    }
}