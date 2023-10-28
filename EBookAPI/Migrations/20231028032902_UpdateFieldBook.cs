using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EBook.Migrations
{
    /// <inheritdoc />
    public partial class UpdateFieldBook : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FavoriteBook_Books_BookId",
                table: "FavoriteBook");

            migrationBuilder.DropForeignKey(
                name: "FK_FavoriteBook_User_UserId",
                table: "FavoriteBook");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FavoriteBook",
                table: "FavoriteBook");

            migrationBuilder.RenameTable(
                name: "FavoriteBook",
                newName: "FavoriteBooks");

            migrationBuilder.RenameIndex(
                name: "IX_FavoriteBook_UserId",
                table: "FavoriteBooks",
                newName: "IX_FavoriteBooks_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_FavoriteBook_BookId",
                table: "FavoriteBooks",
                newName: "IX_FavoriteBooks_BookId");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Books",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_FavoriteBooks",
                table: "FavoriteBooks",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_FavoriteBooks_Books_BookId",
                table: "FavoriteBooks",
                column: "BookId",
                principalTable: "Books",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_FavoriteBooks_User_UserId",
                table: "FavoriteBooks",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FavoriteBooks_Books_BookId",
                table: "FavoriteBooks");

            migrationBuilder.DropForeignKey(
                name: "FK_FavoriteBooks_User_UserId",
                table: "FavoriteBooks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FavoriteBooks",
                table: "FavoriteBooks");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Books");

            migrationBuilder.RenameTable(
                name: "FavoriteBooks",
                newName: "FavoriteBook");

            migrationBuilder.RenameIndex(
                name: "IX_FavoriteBooks_UserId",
                table: "FavoriteBook",
                newName: "IX_FavoriteBook_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_FavoriteBooks_BookId",
                table: "FavoriteBook",
                newName: "IX_FavoriteBook_BookId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FavoriteBook",
                table: "FavoriteBook",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_FavoriteBook_Books_BookId",
                table: "FavoriteBook",
                column: "BookId",
                principalTable: "Books",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_FavoriteBook_User_UserId",
                table: "FavoriteBook",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
