using Microsoft.EntityFrameworkCore.Migrations;

namespace final_project.Migrations
{
    public partial class UpdateFileUploadRelations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FileUploads");

            migrationBuilder.AddColumn<string>(
                name: "ProfilePicName",
                table: "Users",
                type: "varchar(60)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProfilePicName",
                table: "Users");

            migrationBuilder.CreateTable(
                name: "FileUploads",
                columns: table => new
                {
                    FileUploadId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FileName = table.Column<string>(type: "varchar(60)", nullable: false),
                    FileType = table.Column<string>(type: "varchar(10)", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FileUploads", x => x.FileUploadId);
                    table.ForeignKey(
                        name: "FK_FileUploads_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FileUploads_UserId",
                table: "FileUploads",
                column: "UserId");
        }
    }
}
