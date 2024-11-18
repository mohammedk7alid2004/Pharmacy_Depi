using Dto;
using Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;
using Pharmacy.Api.Dto;

namespace Pharmacy.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UsersController : ApiBaseController
{
    public UsersController(IUnitOfWork unitOfWork) : base(unitOfWork)
    {
        
    }
    [HttpGet("Getall")]
    //[Authorize(Roles = "1")]
    public IActionResult GetAll()
    {
      
        var users = _unitOfWork.Users.GetAll().Select(p => new userdto
        {
            FirstName = p.FirstName,
            LastName = p.LastName,
            Email = p.Email,
            Address = p.Address,
            RoleId = p.RoleId,
            Phone = p.Phone
        }).ToList(); 

       
        return Ok(users);
    }

    [HttpGet("{email}")]
    //Authorize(Roles = "1")]
    public IActionResult GetByEmail(string email)
    {
        var users= _unitOfWork.Users.GetAll()
            .Where(s=>s.Email== email).Select
            (p => new userdto  {  
              FirstName= p.FirstName,
              LastName= p.LastName,
              Email= p.Email,
              Address= p.Address,
              RoleId= p.RoleId,
                Phone= p.Phone, 
              }
            ).FirstOrDefault();
        if (users == null)
        {
            return NotFound();
        }
        return Ok(users);
    }
} 
