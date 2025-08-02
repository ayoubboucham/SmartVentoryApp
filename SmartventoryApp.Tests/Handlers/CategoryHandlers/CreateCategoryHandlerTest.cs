using Moq;
using SmartVentoryApp.Application.Commands.CreateCategory;
using SmartVentoryApp.Application.Interfaces;
using SmartVentoryApp.Domain.Entities;

namespace SmartventoryApp.Tests.Handlers.CategoryHandlers
{
    public class CreateCategoryHandlerTest
    {
        [Fact]
        public async Task CreateCategory_ShouldReturnNewId()
        {
            var mockRepo = new Mock<ICategoryRepository>();

            mockRepo
                .Setup(r => r.AddAsync(It.IsAny<Category>()))
                .Callback<Category>(c => c.Id = new Random().Next(1, 9999))
                .Returns(Task.CompletedTask);

            var handler = new CreateCategoryHandler(mockRepo.Object);

            var command = new CreateCategoryCommand
            {
                Name = "Category name test"
            };

            var result = await handler.Handle(command, CancellationToken.None);

            Assert.True(result > 0);
        }
    }
}
