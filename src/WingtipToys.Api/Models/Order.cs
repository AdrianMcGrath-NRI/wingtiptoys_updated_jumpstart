using System.ComponentModel.DataAnnotations;

namespace WingtipToys.Api.Models;

public class Order
{
    public int OrderId { get; set; }
    
    public DateTime OrderDate { get; set; }
    
    [Required]
    public string Username { get; set; } = string.Empty;
    
    [Required]
    public string FirstName { get; set; } = string.Empty;
    
    [Required]
    public string LastName { get; set; } = string.Empty;
    
    [Required]
    public string Address { get; set; } = string.Empty;
    
    [Required]
    public string City { get; set; } = string.Empty;
    
    [Required]
    public string State { get; set; } = string.Empty;
    
    [Required]
    public string PostalCode { get; set; } = string.Empty;
    
    [Required]
    public string Country { get; set; } = string.Empty;
    
    public string? Phone { get; set; }
    
    [Required]
    public string Email { get; set; } = string.Empty;
    
    [Required]
    public decimal Total { get; set; }
    
    public string? PaymentTransactionId { get; set; }
    
    public bool HasBeenShipped { get; set; }
    
    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();
}
