using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Data;
using Models;
using Interfaces;
using Dto;
using Microsoft.AspNetCore.Authorization;

namespace Pharmacy.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ApiBaseController
    {
        public OrdersController(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
        }




        [HttpGet("GetAllAsync")]
        public async Task<IActionResult> GetAllAsync()
        {
            
            var details = await _unitOfWork.Orders.GetAllAsync();

            
            var result = details
                .Join(_unitOfWork.OrderDetails.GetAll(),
                    order => order.OrderId,
                    orderDetail => orderDetail.OrderId,
                    (order, orderDetail) => new { order, orderDetail }
                )
                .Join(_unitOfWork.Users.GetAll(),
                    combined => combined.order.UserId,
                    user => user.UserId,
                    (combined, user) => new OrderDetailsDto
                    {
                        OrderId = combined.order.OrderId, // Adding the OrderId
                        UserName = user.FirstName + " " + user.LastName,
                        Quantity = combined.orderDetail.Quantity ?? 0,
                        UnitPrice = combined.orderDetail.UnitPrice ?? 0,
                        TotalAmount = (combined.orderDetail.UnitPrice ?? 0) * (combined.orderDetail.Quantity ?? 0),
                        OrderStatus = combined.order.OrderStatus,
                        OrderDate = combined.order.OrderDate ?? DateTime.MinValue
                    }
                )
                .ToList();

            return Ok(result);
        }



        [HttpGet("GetByIdAsync")]
        public async Task<IActionResult> GetByIdAsync(int id)
        {
            var order = (await _unitOfWork.Orders.GetAllAsync())
                .Where(x => x.OrderId == id)
                .Join(await _unitOfWork.OrderDetails.GetAllAsync(),
                      o => o.OrderId,
                      od => od.OrderId,
                      (o, od) => new { o, od })
                .Join(await _unitOfWork.Users.GetAllAsync(),
                      co => co.o.UserId,
                      user => user.UserId,
                      (co, user) => new OrderDetailsDto
                      {
                          OrderId = co.o.OrderId,
                          UserName = user.FirstName + " " + user.LastName,
                          Quantity = co.od.Quantity ?? 0,
                          UnitPrice = co.od.UnitPrice ?? 0,
                          TotalAmount = (co.od.UnitPrice ?? 0) * (co.od.Quantity ?? 0),
                          OrderStatus = co.o.OrderStatus,
                          OrderDate = co.o.OrderDate ?? DateTime.MinValue
                      })
                .FirstOrDefault(); 

            if (order == null)
            {
                return NotFound("Order not found.");
            }

            return Ok(order);
        }


        [Authorize(Roles ="1,2")]
        
        [HttpPost("Add")]
        public async Task<IActionResult> Add(OrderDto orderdto)
        {
            //var user = _unitOfWork.Users
            //.Find(z => z.Email == orderdto.email);
          var shopping =  _unitOfWork.ShoppingCartItems.Find(x => x.UserId == orderdto.UserId);
            Order order = new Order()
            {
                UserId = orderdto.UserId,
                OrderDate = DateTime.UtcNow,
                OrderStatus = orderdto.OrderStatus,
            };
            _unitOfWork.Orders.Add(order);
            OrderDetail orderDetail = new OrderDetail()
            {
                OrderId = order.OrderId, 
                ProductId = shopping.ProductId,
                Quantity = shopping.Quantity,
                UnitPrice = shopping.UnitPrice
            };
             _unitOfWork.OrderDetails.Add(orderDetail);
            
            _unitOfWork.Save();
            return Ok(order);
        }

        [HttpDelete("DeleteById")]
        public IActionResult DeleteById(int Id)
        {
            var order = _unitOfWork.Orders.GetById(Id);
            _unitOfWork.Orders.Delete(order);
            _unitOfWork.Save();
            return Ok(order);
        }

        [HttpPut("Update")]
        public IActionResult Update(int id, [FromBody]OrderDto order)
        {
            var o = _unitOfWork.Orders.GetById(id);
            o.UserId = order.UserId;
            o.OrderDate = order.OrderDate;
            o.OrderStatus = order.OrderStatus;
            
            

            _unitOfWork.Orders.Update(o);
            _unitOfWork.Save();
            return Ok(order);
        }
    }
}
