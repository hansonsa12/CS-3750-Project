using Microsoft.EntityFrameworkCore.Migrations;

namespace final_project.Migrations
{
    public partial class UserProfileUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "addressOne",
                table: "User",
                type: "varchar(255)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "addressTwo",
                table: "User",
                type: "varchar(255)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "city",
                table: "User",
                type: "varchar(40)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "state",
                table: "User",
                type: "varchar(20)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "zipCode",
                table: "User",
                type: "number",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "addressOne",
                table: "User");

            migrationBuilder.DropColumn(
                name: "addressTwo",
                table: "User");

            migrationBuilder.DropColumn(
                name: "city",
                table: "User");

            migrationBuilder.DropColumn(
                name: "state",
                table: "User");

            migrationBuilder.DropColumn(
                name: "zipCode",
                table: "User");
        }
    }
}
