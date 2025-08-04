
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

            // Read the database connection string from configuration
            var connectionString = builder.Configuration.GetConnectionString("SmartVentoryConnectionString");

            // Register custom extension to configure Swagger & OpenAPI
            builder.Services.AddOpenApi();

            // Register the DbContext with SQL Server provider
            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(connectionString));

            builder.Services.AddControllers()
                .AddJsonOptions(options =>
                {
                    // Preserve reference handling to avoid circular JSON issues
                    options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;

                    // Make JSON responses easier to read (pretty print)
                    options.JsonSerializerOptions.WriteIndented = true;
                })
                .AddFluentValidation(fv =>
                {
                    // Automatically register FluentValidation validators from the specified assembly
                    fv.RegisterValidatorsFromAssemblyContaining<CreateCategoryCommandValidator>();
                });

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Register MediatR and scan for handlers in Product commands
            builder.Services.AddMediatR(typeof(CreateProductCommand).Assembly);

            // Register custom repositories
            builder.Services.AddScoped<IProductRepository, ProductRepository>();
            builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();

            // Register MediatR handlers from Category assembly (optional redundancy if same as above)
            builder.Services.AddMediatR(typeof(CreateCategoryCommand).Assembly);

            // Enable CORS to allow frontend access (especially during development)
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowFrontend", policy =>
                {
                    policy.AllowAnyOrigin()
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });

            // Explicitly configure Kestrel to listen on port 5000
            builder.WebHost.ConfigureKestrel(serverOptions =>
            {
                serverOptions.ListenAnyIP(5000);
            });

            var app = builder.Build();

            app.UseCors("AllowFrontend");

           
            app.UseSwagger();
            app.UseSwaggerUI();

            app.UseAuthorization();

            app.MapControllers();

            // Apply any pending EF Core migrations automatically at startup
            using (var scope = app.Services.CreateScope())
            {
                var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                db.Database.Migrate();
            }

            app.Run();
        }

    }
}
