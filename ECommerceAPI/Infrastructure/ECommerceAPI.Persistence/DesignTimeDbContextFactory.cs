using ECommerceAPI.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerceAPI.Persistence
{
    internal class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<ECommerceAPIDbContext>
    {
        public ECommerceAPIDbContext CreateDbContext(string[] args)
        {

            DbContextOptionsBuilder<ECommerceAPIDbContext> dbContextOptionsBuiler = new();
            dbContextOptionsBuiler.UseNpgsql(Configuration.ConnectionString);
            return new ECommerceAPIDbContext(dbContextOptionsBuiler.Options);
        }
    }
}
