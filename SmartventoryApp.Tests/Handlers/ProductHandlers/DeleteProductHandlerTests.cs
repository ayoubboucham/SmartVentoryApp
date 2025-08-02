using Moq;
using SmartVentoryApp.Application.Commands.DeleteProduct;
using SmartVentoryApp.Application.Interfaces;
using SmartVentoryApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartventoryApp.Tests.Handlers.ProductHandlers
{
    public class DeleteProductHandlerTests
    {
        [Fact]
        public async Task Handle_Should_ReturnTrue_WhenProductExists()
        {
            var mockRepo = new Mock<IProductRepository>();
            var existingProduct = new Product
            {
                Id = 1,
                Name = "Test Product",
                Description = "Sample",
                Price = 100,
                Quantity = 5,
                CategoryId = 1
            };

            mockRepo.Setup(r => r.GetByIdAsync(1))
                    .ReturnsAsync(existingProduct);

            mockRepo.Setup(r => r.DeleteAsync(existingProduct))
                    .Returns(Task.CompletedTask);

            var handler = new DeleteProductHandler(mockRepo.Object);
            var command = new DeleteProductCommand(1);

            var result = await handler.Handle(command, CancellationToken.None);

            Assert.True(result);
            mockRepo.Verify(r => r.DeleteAsync(existingProduct), Times.Once);
        }

        [Fact]
        public async Task Handle_Should_ReturnFalse_WhenProductNotFound()
        {
            var mockRepo = new Mock<IProductRepository>();
            mockRepo.Setup(r => r.GetByIdAsync(42))
                    .ReturnsAsync((Product?)null);

            var handler = new DeleteProductHandler(mockRepo.Object);
            var command = new DeleteProductCommand(42);

            var result = await handler.Handle(command, CancellationToken.None);

            Assert.False(result);
            mockRepo.Verify(r => r.DeleteAsync(It.IsAny<Product>()), Times.Never);
        }
    }
}