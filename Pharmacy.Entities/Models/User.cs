using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;


namespace Models;

public partial class User
{
    [Key]
    public int UserId { get; set; }

    [StringLength(100)]
   
    public string? FirstName { get; set; }

    [StringLength(100)]
    
    public string? LastName { get; set; }

    [StringLength(15)]
    
    public string? Phone { get; set; }

    [StringLength(100)]
   
    public string Email { get; set; }

    [StringLength(255)]
    
    public string? Address { get; set; }

    [StringLength(255)]
    
    public string? PasswordHash { get; set; }

    public int? RoleId { get; set; }

    [InverseProperty("User")]
    [JsonIgnore]
    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    [InverseProperty("User")]
    [JsonIgnore]
    public virtual ICollection<ProductReview> ProductReviews { get; set; } = new List<ProductReview>();

    [ForeignKey("RoleId")]
    [InverseProperty("Users")]
    [JsonIgnore]
    public virtual Role? Role { get; set; }

}
