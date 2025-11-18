using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WingtipToys.Api.DTOs;
using WingtipToys.Api.Models;
using WingtipToys.Api.Services;

namespace WingtipToys.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly ITokenService _tokenService;

    public AuthController(
        UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager,
        ITokenService tokenService)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _tokenService = tokenService;
    }

    [HttpPost("register")]
    public async Task<ActionResult<AuthResponseDto>> Register(RegisterDto registerDto)
    {
        var user = new ApplicationUser
        {
            UserName = registerDto.Username,
            Email = registerDto.Email,
            FirstName = registerDto.FirstName,
            LastName = registerDto.LastName
        };

        var result = await _userManager.CreateAsync(user, registerDto.Password);

        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }

        return Ok(new AuthResponseDto
        {
            Token = _tokenService.CreateToken(user),
            Username = user.UserName!,
            Email = user.Email!,
            FirstName = user.FirstName,
            LastName = user.LastName
        });
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponseDto>> Login(LoginDto loginDto)
    {
        var user = await _userManager.FindByNameAsync(loginDto.Username);

        if (user == null)
        {
            return Unauthorized("Invalid username or password");
        }

        var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

        if (!result.Succeeded)
        {
            return Unauthorized("Invalid username or password");
        }

        return Ok(new AuthResponseDto
        {
            Token = _tokenService.CreateToken(user),
            Username = user.UserName!,
            Email = user.Email!,
            FirstName = user.FirstName,
            LastName = user.LastName
        });
    }
}
