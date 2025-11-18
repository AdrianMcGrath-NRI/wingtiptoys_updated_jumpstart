using System.ComponentModel.DataAnnotations;

namespace WingtipToys.Api.Models;

public class Product
{
    [Key]
    public int ProductId { get; set; }
    
    [Required]
    public string ProductName { get; set; } = string.Empty;
    
    public string? Description { get; set; }
    
    public string? ImagePath { get; set; }
    
    public double? UnitPrice { get; set; }
    
    public int? CategoryId { get; set; }
    
    public virtual Category? Category { get; set; }
}
