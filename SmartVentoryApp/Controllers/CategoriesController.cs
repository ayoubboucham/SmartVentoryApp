using MediatR;
using Microsoft.AspNetCore.Mvc;
using SmartVentoryApp.Application.Commands.CreateCategory;
using SmartVentoryApp.Application.Commands.DeleteCategory;
using SmartVentoryApp.Application.Commands.UpdateCategory;
using SmartVentoryApp.Application.Queries.GetAllCategories;
using SmartVentoryApp.Application.Queries.GetCategoryById;

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
            [HttpGet]
            public async Task<IActionResult> GetAll()
            {
                var categories = await _mediator.Send(new GetAllCategoriesQuery());
                return Ok(categories);
            }
            [HttpGet("{id}")]
            public async Task<IActionResult> GetById(int id)
            {
                var category = await _mediator.Send(new GetCategoryByIdQuery(id));
                if (category == null)
                {
                    return NotFound();
                }
                return Ok(category);
            }
            [HttpPut("{id}")]
            public async Task<IActionResult> Update(int id, [FromBody] UpdateCategoryCommand command)
            {
                if (id != command.Id)
                {
                    return BadRequest("Category ID mismatch.");
                }
                var result = await _mediator.Send(command);
                if (!result)
                {
                    return NotFound();
                }
                return NoContent();
        }
            [HttpDelete("{id}")]
            public async Task<IActionResult> Delete(int id)
            {
                var command = new DeleteCategoryCommand(id);
                var result = await _mediator.Send(command);
                if (!result)
                {
                    return NotFound();
                }
                return NoContent();
        }
    }
}