using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EBook.Migrations
{
    /// <inheritdoc />
    public partial class UpdateSeedData2810 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CategoryDescription", "CategoryName" },
                values: new object[] { 1, "Văn học nghệ thuật", "Văn học" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 1);
        }
    }
}
