using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WingtipToys.Api.Data;
using WingtipToys.Api.Models;

namespace WingtipToys.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CartController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public CartController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("{cartId}")]
    public async Task<ActionResult<IEnumerable<CartItem>>> GetCartItems(string cartId)
    {
        var cartItems = await _context.CartItems
            .Include(ci => ci.Product)
            .Where(ci => ci.CartId == cartId)
            .ToListAsync();

        return Ok(cartItems);
    }

    [HttpPost]
    public async Task<ActionResult<CartItem>> AddToCart(CartItem cartItem)
    {
        cartItem.DateCreated = DateTime.UtcNow;
        cartItem.ItemId = Guid.NewGuid().ToString();

        var existingItem = await _context.CartItems
            .FirstOrDefaultAsync(ci => ci.CartId == cartItem.CartId && ci.ProductId == cartItem.ProductId);

        if (existingItem != null)
        {
            existingItem.Quantity += cartItem.Quantity;
            await _context.SaveChangesAsync();
            return Ok(existingItem);
        }

        _context.CartItems.Add(cartItem);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetCartItems), new { cartId = cartItem.CartId }, cartItem);
    }

    [HttpPut("{itemId}")]
    public async Task<IActionResult> UpdateCartItem(string itemId, CartItem cartItem)
    {
        if (itemId != cartItem.ItemId)
        {
            return BadRequest();
        }

        _context.Entry(cartItem).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!await CartItemExists(itemId))
            {
                return NotFound();
            }
            throw;
        }

        return NoContent();
    }

    [HttpDelete("{itemId}")]
    public async Task<IActionResult> DeleteCartItem(string itemId)
    {
        var cartItem = await _context.CartItems.FindAsync(itemId);
        if (cartItem == null)
        {
            return NotFound();
        }

        _context.CartItems.Remove(cartItem);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("clear/{cartId}")]
    public async Task<IActionResult> ClearCart(string cartId)
    {
        var cartItems = await _context.CartItems
            .Where(ci => ci.CartId == cartId)
            .ToListAsync();

        _context.CartItems.RemoveRange(cartItems);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private async Task<bool> CartItemExists(string id)
    {
        return await _context.CartItems.AnyAsync(e => e.ItemId == id);
    }
}
