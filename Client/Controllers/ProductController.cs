using Microsoft.AspNetCore.Mvc;

using Client.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Client.Services;  // Import the ProductApiService namespace
namespace Client.Controllers;


public class ProductController : Controller
{
    private readonly ProductApiService _productApiService;

    public ProductController(ProductApiService productApiService)
    {
        _productApiService = productApiService;
    }

    // Action to display all products
    public async Task<IActionResult> Index()
    {
        var products = await _productApiService.GetAllProductsAsync();  // Call the service method to get all products
        return View(products);  // Pass the data to the view
    }

   
    public async Task<IActionResult> Details(int id)
    {
        var product = await _productApiService.GetProductByIdAsync(id);  // Call the service method to get product by ID
        if (product == null)
        {
            return NotFound();
        }
        return View(product);  // Pass the product data to the view
    }
}



