using BLL;
using BLL_EF;
using DAL;
using WebApi.Controllers;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddScoped<IMovieService, MovieService>();
builder.Services.AddScoped<IHallService, HallService>();
builder.Services.AddScoped<IScreeningService, ScreeningService>();
builder.Services.AddScoped<IOpinionService, OpinionService>();
builder.Services.AddScoped<ISeatService, SeatService>();
builder.Services.AddScoped<ITicketService, TicketService>();
builder.Services.AddScoped<IUserService , UserService>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<CinemaContext>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(optBuilder => optBuilder
                                .AllowAnyHeader()
                                .AllowAnyMethod()
                                .AllowAnyOrigin()
                                .Build());

app.UseAuthorization();

app.MapControllers();

app.Run();
