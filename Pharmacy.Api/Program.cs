using Interfaces;
using Microsoft.EntityFrameworkCore;
using Data;
using Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.OpenApi.Models;

namespace Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            var con = builder.Configuration.GetConnectionString("con");

            // Add DbContext with SQL Server connection
            builder.Services.AddDbContext<OnlinePharmacyDbContext>(options => options.UseSqlServer(con));

            // Register UnitOfWork for dependency injection
            builder.Services.AddTransient<IUnitOfWork, UnitOfWork>();

            // Add controllers support
            builder.Services.AddControllers();

            // Enable API documentation using Swagger
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Your API", Version = "v1" });

                // Add JWT authentication to Swagger
                var securityScheme = new OpenApiSecurityScheme
                {
                    Name = "JWT Authentication",
                    Description = "Enter JWT token",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                    Scheme = "bearer",
                    BearerFormat = "JWT",
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    }
                };

                c.AddSecurityDefinition("Bearer", securityScheme);

                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        new string[] { }
                    }
                });
            });

            // Add JWT Authentication
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = builder.Configuration["Jwt:IssuerIP"],
                    ValidAudience = builder.Configuration["Jwt:AudienceIP"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:SecritKey"]))
                };
            });

            // Remove the second CORS definition from here
            // Now only one CORS policy exists
            //var builder = WebApplication.CreateBuilder(args);

            // Configure CORS
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigin",
                    builder => builder.WithOrigins("https://dalida-pharmacy.vercel.app")
                                      .AllowAnyHeader()
                                      .AllowAnyMethod());
            });

            var app = builder.Build();

            app.UseCors("AllowSpecificOrigin");

            app.UseAuthentication();
            app.UseAuthorization();

            // Other middleware (e.g., routing)
            app.MapControllers();

            app.Run();


        }
    }
}
