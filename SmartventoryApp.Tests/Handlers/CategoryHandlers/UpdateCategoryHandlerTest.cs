using Moq;
using SmartVentoryApp.Application.Commands.UpdateCategory;
using SmartVentoryApp.Application.Interfaces;
using SmartVentoryApp.Domain.Entities;

namespace SmartventoryApp.Tests.Handlers.CategoryHandlers
{
    public class UpdateCategoryHandlerTest
    {
        [Fact]
        public async Task UpdateCategory_WithValidId_ShouldReturnTrue()
        {
            var mockRepo = new Mock<ICategoryRepository>();

            var existing = new Category
            {
                Id = 1,
                Name = "Old name test category"
            };

            mockRepo
                .Setup(r => r.GetByIdAsync(1))
                .ReturnsAsync(existing);

            mockRepo
                .Setup(r => r.UpdateAsync(It.IsAny<Category>()))
                .Returns(Task.CompletedTask);

            var handler = new UpdateCategoryHandler(mockRepo.Object);

            var command = new UpdateCategoryCommand
            {
                Id = 1,
                Name = "Updated Name test category"
            };

            var result = await handler.Handle(command, CancellationToken.None);

            Assert.True(result);
            mockRepo.Verify(r => r.UpdateAsync(It.IsAny<Category>()), Times.Once);
        }

        [Fact]
        public async Task UpdateCategory_WithInvalidId_ShouldReturnFalse()
        {
            var mockRepo = new Mock<ICategoryRepository>();


            mockRepo.Setup(r => r.GetByIdAsync(99)).ReturnsAsync((Category?)null);

            var handler = new UpdateCategoryHandler(mockRepo.Object);

            var command = new UpdateCategoryCommand
            {
                Id = 99,
                Name = "Test name category"
            };

            var result = await handler.Handle(command, CancellationToken.None);

            Assert.False(result);
            mockRepo.Verify(r => r.UpdateAsync(It.IsAny<Category>()), Times.Never);
        }
    }
}
