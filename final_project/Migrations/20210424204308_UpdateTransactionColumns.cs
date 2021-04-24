using Microsoft.EntityFrameworkCore.Migrations;

namespace final_project.Migrations
{
    public partial class UpdateTransactionColumns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Amount",
                table: "Transactions",
                newName: "AmountInCents");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Transactions",
                type: "varchar(100)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Transactions");

            migrationBuilder.RenameColumn(
                name: "AmountInCents",
                table: "Transactions",
                newName: "Amount");
        }
    }
}
