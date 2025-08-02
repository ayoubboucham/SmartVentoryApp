using Moq;
using SmartVentoryApp.Application.Commands.UpdateProduct;
using SmartVentoryApp.Application.Interfaces;
using SmartVentoryApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartventoryApp.Tests.Handlers.ProductHandlers
{
    public class UpdateProductHandlerTest
    {
        [Fact]
        public async Task Handle_WithValidProduct_ShouldReturnTrue()
        {
            var mockRepo = new Mock<IProductRepository>();

            var existingProduct = new Product
            {
                Id = 1,
                Name = "Old Name test product",
                Description = "Old Desc test",
                Price = 10,
                Quantity = 5,
                CategoryId = 1
            };

            mockRepo
                .Setup(r => r.GetByIdAsync(1))
                .ReturnsAsync(existingProduct);

            mockRepo
                .Setup(r => r.UpdateAsync(It.IsAny<Product>()))
                .Returns(Task.CompletedTask);

            var handler = new UpdateProductHandler(mockRepo.Object);

            var command = new UpdateProductCommand
            {
                Id = 1,
                Name = "New test name product",
                Description = "Updated Desc test",
                Price = 100,
                Quantity = 10,
                CategoryId = 2
            };

            var result = await handler.Handle(command, CancellationToken.None);

            Assert.True(result);
            mockRepo.Verify(r => r.UpdateAsync(It.IsAny<Product>()), Times.Once);
        }

        [Fact]
        public async Task Handle_WithNonExistentProduct_ShouldReturnFalse()
        {
            var mockRepo = new Mock<IProductRepository>();

            mockRepo
                .Setup(r => r.GetByIdAsync(99))
                .ReturnsAsync((Product?)null);

            var handler = new UpdateProductHandler(mockRepo.Object);

            var command = new UpdateProductCommand
            {
                Id = 99,
                Name = "Test name product",
                Description = "Desc test",
                Price = 0,
                Quantity = 0,
                CategoryId = 1
            };

            var result = await handler.Handle(command, CancellationToken.None);



            Assert.False(result);

            mockRepo.Verify(r => r.UpdateAsync(It.IsAny<Product>()), Times.Never);
        }
    }
}
