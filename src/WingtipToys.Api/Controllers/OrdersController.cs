using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WingtipToys.Api.Data;
using WingtipToys.Api.Models;

namespace WingtipToys.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class OrdersController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public OrdersController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
    {
        var username = User.Identity?.Name;
        
        var orders = await _context.Orders
            .Include(o => o.OrderDetails)
            .ThenInclude(od => od.Product)
            .Where(o => o.Username == username)
            .OrderByDescending(o => o.OrderDate)
            .ToListAsync();

        return Ok(orders);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Order>> GetOrder(int id)
    {
        var username = User.Identity?.Name;
        
        var order = await _context.Orders
            .Include(o => o.OrderDetails)
            .ThenInclude(od => od.Product)
            .FirstOrDefaultAsync(o => o.OrderId == id && o.Username == username);

        if (order == null)
        {
            return NotFound();
        }

        return Ok(order);
    }

    [HttpPost]
    public async Task<ActionResult<Order>> CreateOrder(Order order)
    {
        order.Username = User.Identity?.Name ?? string.Empty;
        order.OrderDate = DateTime.UtcNow;

        _context.Orders.Add(order);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetOrder), new { id = order.OrderId }, order);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateOrder(int id, Order order)
    {
        if (id != order.OrderId)
        {
            return BadRequest();
        }

        var username = User.Identity?.Name;
        var existingOrder = await _context.Orders.FindAsync(id);

        if (existingOrder == null || existingOrder.Username != username)
        {
            return NotFound();
        }

        _context.Entry(existingOrder).CurrentValues.SetValues(order);

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!await OrderExists(id))
            {
                return NotFound();
            }
            throw;
        }

        return NoContent();
    }

    private async Task<bool> OrderExists(int id)
    {
        return await _context.Orders.AnyAsync(e => e.OrderId == id);
    }
}
