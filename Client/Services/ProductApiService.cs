
    using Newtonsoft.Json;
    using System.Net.Http;
    using System.Threading.Tasks;
    using System.Collections.Generic;
using Dto;

namespace Client.Services
      
    {
        public class ProductApiService
        {
            private readonly HttpClient _httpClient;

            public ProductApiService(HttpClient httpClient)
            {
                _httpClient = httpClient;
            }

            // Get all products from the API
            public async Task<List<ProductDto>> GetAllProductsAsync()
            {
                var response = await _httpClient.GetAsync("Product/GetAll");
                response.EnsureSuccessStatusCode();  

                var content = await response.Content.ReadAsStringAsync();  
                return JsonConvert.DeserializeObject<List<ProductDto>>(content);  
            }

            // Get a single product by its ID from the API
            public async Task<ProductDto> GetProductByIdAsync(int id)
            {
                var response = await _httpClient.GetAsync($"Product/{id}");
                response.EnsureSuccessStatusCode();  

                var content = await response.Content.ReadAsStringAsync();  
                return JsonConvert.DeserializeObject<ProductDto>(content);  
            }

          
        }
    }

