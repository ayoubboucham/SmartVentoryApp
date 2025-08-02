using Moq;
using SmartVentoryApp.Application.Commands.CreateCategory;
using SmartVentoryApp.Application.Commands.CreateProduct;
using SmartVentoryApp.Application.Interfaces;
using SmartVentoryApp.Domain.Entities;

namespace SmartventoryApp.Tests.Handlers.ProductHandlers
{
    public class CreateProductHandlerTest
    {
        [Fact]
        public async Task Handle_WithValidCommand_ShouldReturnNewProductId()
        {
            var mockRepo = new Mock<IProductRepository>();

            mockRepo
           .Setup(r => r.AddAsync(It.IsAny<Product>()))
           .Callback<Product>(p => p.Id = new Random().Next(1, 9999))
           .Returns(Task.CompletedTask);

            var handler = new CreateProductHandler(mockRepo.Object);

            var command = new CreateProductCommand
            {

                Name = "Test Product",
                Description = "Description Test",
                Price = 150,
                Quantity = 10,
                CategoryId = 1
            };

            var result = await handler.Handle(command, CancellationToken.None);


            Assert.True(result > 0);
        }
    }
}
