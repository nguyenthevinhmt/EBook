using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EBook.Migrations
{
    /// <inheritdoc />
    public partial class FieldViewBook : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ViewBook",
                table: "Books",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ViewBook",
                table: "Books");
        }
    }
}
