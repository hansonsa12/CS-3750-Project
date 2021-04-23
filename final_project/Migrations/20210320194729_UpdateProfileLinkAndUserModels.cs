using Microsoft.EntityFrameworkCore.Migrations;

namespace final_project.Migrations
{
    public partial class UpdateProfileLinkAndUserModels : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Bio",
                table: "Users",
                newName: "Biography");

            migrationBuilder.AlterColumn<string>(
                name: "Link",
                table: "ProfileLinks",
                type: "varchar(255)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "varchar(255)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "ProfileLinks",
                type: "varchar(60)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Title",
                table: "ProfileLinks");

            migrationBuilder.RenameColumn(
                name: "Biography",
                table: "Users",
                newName: "Bio");

            migrationBuilder.AlterColumn<string>(
                name: "Link",
                table: "ProfileLinks",
                type: "varchar(255)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(255)");
        }
    }
}
