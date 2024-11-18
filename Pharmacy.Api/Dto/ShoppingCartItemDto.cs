namespace Pharmacy.Api.Dto
{
    public class ShoppingCartItemDto
    {
     
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal LineTotal { get; set; }
        public int UserId { get; set; }
        public int ? CartItemId { get; set; }
       // [Required(ErrorMessage = "The ProductName field is required.")]
        public string ?ProductName { get;set; }
        public string ?ProductImage { get; set; }
     public string ?ProductDescription { get; set; }
       // public string email { get; set; }
    }
}
