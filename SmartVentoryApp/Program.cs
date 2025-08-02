
using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.EntityFrameworkCore;
using SmartVentoryApp.Application.Commands.CreateCategory;
using SmartVentoryApp.Application.Interfaces;
using SmartVentoryApp.Infrastructure.Data;
using SmartVentoryApp.Infrastructure.Repositories;

namespace SmartVentoryApp
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            var connectionString = builder.Configuration.GetConnectionString("SmartVentoryConnectionString");




            builder.Services.AddOpenApi();

            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(connectionString));

            builder.Services.AddControllers()
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
                options.JsonSerializerOptions.WriteIndented = true;
            }).AddFluentValidation(fv =>
            {
                fv.RegisterValidatorsFromAssemblyContaining<CreateCategoryCommandValidator>();
            });
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddMediatR(typeof(CreateProductCommand).Assembly);


            builder.Services.AddScoped<IProductRepository, ProductRepository>();
            builder.Services.AddMediatR(typeof(CreateCategoryCommand).Assembly);
            builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
