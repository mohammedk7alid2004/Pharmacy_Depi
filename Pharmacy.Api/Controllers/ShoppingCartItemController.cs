using Dto;
using Humanizer;
using Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata;
using Models;
using Pharmacy.Api.Dto;
using System.Linq;
using System.Security.Claims;

namespace Pharmacy.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShoppingCartItemController : ApiBaseController
    {
        public ShoppingCartItemController (IUnitOfWork unitOfWork):base(unitOfWork) { }

        [HttpGet("GetAllAsync")]
        public async Task<IActionResult> GetAllAsync()
        {
            return Ok(await _unitOfWork.ShoppingCartItems.GetAllAsync());
        }

        [HttpGet("GetItemsByUserId/{userId}")]
        public async Task<IActionResult> GetItemsByUserId(int userId)
        {
            try
            {
                // Get all shopping cart items for the specified user
                var shoppingCartItems =  _unitOfWork.ShoppingCartItems
                    .GetAll()
                    .Where(x => x.UserId == userId)
                    .Join( _unitOfWork.Products.GetAll().ToList(),
                        cartItem => cartItem.ProductId,
                        product => product.ProductId,
                        (cartItem, product) => new ShoppingCartItemDto
                        {
                            UserId = (int)cartItem.UserId,
                            ProductId = (int)cartItem.ProductId,
                            Quantity = (int)cartItem.Quantity,
                            UnitPrice = (int)cartItem.UnitPrice,
                            LineTotal = (int)cartItem.LineTotal,
                            ProductName = product.ProductName,
                            ProductImage = product.ProductImage,
                            ProductDescription = product.ProductDescription,
                            CartItemId = cartItem.CartItemId // Get the CartItemId directly
                        })
                    .ToList();

                // Check if any items were found
               
                return Ok(shoppingCartItems);
            }
            catch (Exception ex)
            {
                // Log the exception (consider using a logging framework)
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }



        [HttpPost("Add")]
        
        public IActionResult Add(ShoppingCartItemDto cartitemdto)
        {
           
           
           
          

            ShoppingCartItem shoppingCart = new ShoppingCartItem()
            {
                UserId = cartitemdto.UserId, 
                ProductId = cartitemdto.ProductId,
                Quantity = cartitemdto.Quantity,
                UnitPrice = cartitemdto.UnitPrice,
                LineTotal = cartitemdto.LineTotal,
                
            };

            _unitOfWork.ShoppingCartItems.Add(shoppingCart);
            _unitOfWork.Save();
            return Ok(shoppingCart);
        }


        [HttpDelete("DeleteById")]
        public IActionResult Delete(int id) { 
            var cart = _unitOfWork.ShoppingCartItems.GetById(id);
            _unitOfWork.ShoppingCartItems.Delete(cart);
            _unitOfWork.Save();
            return Ok(cart);
        }

        [HttpPut("Update")]
        public IActionResult Update(int id, [FromBody]ShoppingCartItemDto cartitemdto)
        {
            var model = _unitOfWork.ShoppingCartItems.GetById(id);
            model.Quantity = cartitemdto.Quantity;

            _unitOfWork.ShoppingCartItems.Update(model);
            _unitOfWork.Save();
            return Ok(model);
        }

        

    }
}
