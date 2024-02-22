using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ECommerceAPI.Persistence.Migrations
{
    public partial class mig_4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FileName",
                table: "Files",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Path",
                table: "Files",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "Files",
                type: "numeric",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FileName",
                table: "Files");

            migrationBuilder.DropColumn(
                name: "Path",
                table: "Files");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "Files");
        }
    }
}
