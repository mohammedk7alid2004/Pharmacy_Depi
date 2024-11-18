using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Pharmacy.Dal.Migrations
{
    /// <inheritdoc />
    public partial class ffd : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ShoppingCartItems_ShoppingCart_CartId",
                table: "ShoppingCartItems");

            migrationBuilder.RenameColumn(
                name: "CartId",
                table: "ShoppingCartItems",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_ShoppingCartItems_CartId",
                table: "ShoppingCartItems",
                newName: "IX_ShoppingCartItems_UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_ShoppingCartItems_Users_UserId",
                table: "ShoppingCartItems",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ShoppingCartItems_Users_UserId",
                table: "ShoppingCartItems");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "ShoppingCartItems",
                newName: "CartId");

            migrationBuilder.RenameIndex(
                name: "IX_ShoppingCartItems_UserId",
                table: "ShoppingCartItems",
                newName: "IX_ShoppingCartItems_CartId");

            migrationBuilder.AddForeignKey(
                name: "FK_ShoppingCartItems_ShoppingCart_CartId",
                table: "ShoppingCartItems",
                column: "CartId",
                principalTable: "ShoppingCart",
                principalColumn: "CartId");
        }
    }
}
