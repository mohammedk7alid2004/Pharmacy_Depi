using System.ComponentModel.DataAnnotations.Schema;

namespace Pharmacy.Api.Dto
{
    public class ProductReviewDto
    {
        public int? ProductId { get; set; }
        public int? UserId { get; set; }
      // public int? Rating { get; set; }
        public string? UserName { get; set; }
        public string? ContentReview { get; set; }
        public string email { get; set; }
    }
}
