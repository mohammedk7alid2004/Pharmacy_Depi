using System.ComponentModel.DataAnnotations;

namespace  Dto;

public class userdto
{
    public string? FirstName { get; set; }

    [StringLength(100)]

    public string? LastName { get; set; }

    [StringLength(15)]

    public string? Phone { get; set; }

    [StringLength(100)]

    public string Email { get; set; }

    [StringLength(255)]

    public string? Address { get; set; }
    public int? RoleId { get; set; }
}
