using WingtipToys.Api.Models;

namespace WingtipToys.Api.Data;

public static class DbInitializer
{
    public static void Initialize(ApplicationDbContext context)
    {
        context.Database.EnsureCreated();

        // Check if database is already seeded
        if (context.Products.Any())
        {
            return;
        }

        // Seed Categories
        var categories = new Category[]
        {
            new Category { CategoryName = "Cars", Description = "Toy Cars" },
            new Category { CategoryName = "Planes", Description = "Toy Planes" },
            new Category { CategoryName = "Trucks", Description = "Toy Trucks" },
            new Category { CategoryName = "Boats", Description = "Toy Boats" },
            new Category { CategoryName = "Rockets", Description = "Toy Rockets" }
        };

        foreach (var category in categories)
        {
            context.Categories.Add(category);
        }
        context.SaveChanges();

        // Seed Products
        var products = new Product[]
        {
            new Product
            {
                ProductName = "Convertible Car",
                Description = "A sleek red convertible toy car",
                ImagePath = "/images/products/carconvert.png",
                UnitPrice = 22.50,
                CategoryId = categories.First(c => c.CategoryName == "Cars").CategoryId
            },
            new Product
            {
                ProductName = "Old-time Car",
                Description = "A classic vintage toy car",
                ImagePath = "/images/products/carearly.png",
                UnitPrice = 21.95,
                CategoryId = categories.First(c => c.CategoryName == "Cars").CategoryId
            },
            new Product
            {
                ProductName = "Fast Car",
                Description = "A speedy racing toy car",
                ImagePath = "/images/products/carfast.png",
                UnitPrice = 34.95,
                CategoryId = categories.First(c => c.CategoryName == "Cars").CategoryId
            },
            new Product
            {
                ProductName = "Super Fast Car",
                Description = "The fastest toy car in the collection",
                ImagePath = "/images/products/carfaster.png",
                UnitPrice = 39.95,
                CategoryId = categories.First(c => c.CategoryName == "Cars").CategoryId
            },
            new Product
            {
                ProductName = "Old Style Racer",
                Description = "A retro style racing toy car",
                ImagePath = "/images/products/carracer.png",
                UnitPrice = 32.50,
                CategoryId = categories.First(c => c.CategoryName == "Cars").CategoryId
            },
            new Product
            {
                ProductName = "Ace Plane",
                Description = "A classic toy airplane",
                ImagePath = "/images/products/planeace.png",
                UnitPrice = 29.95,
                CategoryId = categories.First(c => c.CategoryName == "Planes").CategoryId
            },
            new Product
            {
                ProductName = "Glider",
                Description = "A smooth gliding toy airplane",
                ImagePath = "/images/products/planeglider.png",
                UnitPrice = 24.95,
                CategoryId = categories.First(c => c.CategoryName == "Planes").CategoryId
            },
            new Product
            {
                ProductName = "Paper Plane",
                Description = "A simple paper-style toy airplane",
                ImagePath = "/images/products/planepaper.png",
                UnitPrice = 19.95,
                CategoryId = categories.First(c => c.CategoryName == "Planes").CategoryId
            },
            new Product
            {
                ProductName = "Propeller Plane",
                Description = "A propeller-driven toy airplane",
                ImagePath = "/images/products/planeprop.png",
                UnitPrice = 26.95,
                CategoryId = categories.First(c => c.CategoryName == "Planes").CategoryId
            },
            new Product
            {
                ProductName = "Early Truck",
                Description = "A vintage toy truck",
                ImagePath = "/images/products/truckearly.png",
                UnitPrice = 33.95,
                CategoryId = categories.First(c => c.CategoryName == "Trucks").CategoryId
            },
            new Product
            {
                ProductName = "Fire Truck",
                Description = "A red fire truck toy",
                ImagePath = "/images/products/truckfire.png",
                UnitPrice = 36.95,
                CategoryId = categories.First(c => c.CategoryName == "Trucks").CategoryId
            },
            new Product
            {
                ProductName = "Big Truck",
                Description = "A large toy truck",
                ImagePath = "/images/products/truckbig.png",
                UnitPrice = 38.95,
                CategoryId = categories.First(c => c.CategoryName == "Trucks").CategoryId
            },
            new Product
            {
                ProductName = "Big Boat",
                Description = "A large toy boat",
                ImagePath = "/images/products/boatbig.png",
                UnitPrice = 31.95,
                CategoryId = categories.First(c => c.CategoryName == "Boats").CategoryId
            },
            new Product
            {
                ProductName = "Paper Boat",
                Description = "A simple paper-style toy boat",
                ImagePath = "/images/products/boatpaper.png",
                UnitPrice = 18.95,
                CategoryId = categories.First(c => c.CategoryName == "Boats").CategoryId
            },
            new Product
            {
                ProductName = "Rocket X",
                Description = "A sleek toy rocket",
                ImagePath = "/images/products/rocketx.png",
                UnitPrice = 45.95,
                CategoryId = categories.First(c => c.CategoryName == "Rockets").CategoryId
            },
            new Product
            {
                ProductName = "Rocket Y",
                Description = "An advanced toy rocket",
                ImagePath = "/images/products/rockety.png",
                UnitPrice = 48.95,
                CategoryId = categories.First(c => c.CategoryName == "Rockets").CategoryId
            }
        };

        foreach (var product in products)
        {
            context.Products.Add(product);
        }
        context.SaveChanges();
    }
}
