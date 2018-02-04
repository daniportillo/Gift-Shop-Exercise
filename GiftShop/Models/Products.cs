using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace GiftShop.Models
{
    public class Products
    {
        public int ProductId
        {
            get; set;
        }


        public string name
        {
            get; set;
        }

        public string description
        {
            get; set;
        }

        public string category
        {
            get; set;
        }

        public int quantity
        {
            get; set;
        }

        public string image
        {
            get; set;
        }

        public int price
        {
            get; set;
        }

        public class ProductsDbContext : DbContext
        {
            public ProductsDbContext() : base()
            {
                Database.SetInitializer<ProductsDbContext>(new ProductsDbContextInitializer());
            }
            public DbSet<Products> Employees
            {
                get;
                set;
            }
        }

        public class ProductsDbContextInitializer : DropCreateDatabaseIfModelChanges<ProductsDbContext>
        {
            protected override void Seed(ProductsDbContext context)
            {
                var list = new List<Products>
        {
            new Products
            {
                name  = "Rohit", description = "Mane", category = "Rohit Mane", quantity = 1, price = 40
            },
            new Products
            {
                name  = "Da", description = "Mane", category = "Rohit Mane", quantity = 1, price = 40
            }
        };
                list.ForEach(m =>
                {
                    context.Employees.Add(m);
                });
                context.SaveChanges();
                base.Seed(context);

            }
        }


    }
}