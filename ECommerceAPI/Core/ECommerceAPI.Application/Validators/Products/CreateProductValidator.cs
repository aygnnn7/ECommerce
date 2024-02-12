using ECommerceAPI.Application.ViewModels.Products;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerceAPI.Application.Validators.Products
{
    public class CreateProductValidator: AbstractValidator<VM_Create_Product>
    {
        public CreateProductValidator()
        {
            RuleFor(p => p.Name)
                .NotEmpty()
                .NotNull()
                    .WithMessage("Please enter the name of the product.")
                .MaximumLength(150)
                .MinimumLength(3)
                    .WithMessage("The name should be between 3 to 150 characters.");
            RuleFor(p => p.Stock)
                .NotEmpty()
                .NotNull()
                    .WithMessage("Please enter the stock value")
                .Must(s => s >= 0)
                    .WithMessage("Stock value can't be negative or zero.");
            RuleFor(p => p.Price)
               .NotEmpty()
               .NotNull()
                   .WithMessage("Please enter the price value")
               .Must(s => s >= 0)
                   .WithMessage("Price value can't be negative or zero.");
        }
    }
}
