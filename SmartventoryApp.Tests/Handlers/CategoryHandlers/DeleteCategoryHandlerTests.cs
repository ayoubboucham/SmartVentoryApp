using Moq;
using SmartVentoryApp.Application.Commands.DeleteCategory;
using SmartVentoryApp.Application.Interfaces;
using SmartVentoryApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartventoryApp.Tests.Handlers.CategoryHandlers
{
    public class DeleteCategoryHandlerTests
    {
        [Fact]
        public async Task Handle_Should_ReturnTrue_WhenCategoryExists()
        {
            var mockRepo = new Mock<ICategoryRepository>();
            var existingCategory = new Category { Id = 1, Name = "Test" };

            mockRepo.Setup(r => r.GetByIdAsync(1))
                    .ReturnsAsync(existingCategory);

            mockRepo.Setup(r => r.DeleteAsync(existingCategory))
                    .Returns(Task.CompletedTask);

            var handler = new DeleteCategoryHandler(mockRepo.Object);
            var command = new DeleteCategoryCommand(1);

            var result = await handler.Handle(command, CancellationToken.None);

            Assert.True(result);
            mockRepo.Verify(r => r.DeleteAsync(existingCategory), Times.Once);
        }

        [Fact]
        public async Task Handle_Should_ReturnFalse_WhenCategoryNotFound()
        {
            var mockRepo = new Mock<ICategoryRepository>();
            mockRepo.Setup(r => r.GetByIdAsync(99))
                    .ReturnsAsync((Category?)null);

            var handler = new DeleteCategoryHandler(mockRepo.Object);
            var command = new DeleteCategoryCommand(99);

            var result = await handler.Handle(command, CancellationToken.None);

            Assert.False(result);
            mockRepo.Verify(r => r.DeleteAsync(It.IsAny<Category>()), Times.Never);
        }
    }
}
