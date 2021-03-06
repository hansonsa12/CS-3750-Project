using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace final_project.Migrations
{
    public partial class CreateUserRelatedTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Addresses",
                columns: table => new
                {
                    AddressId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AddressOne = table.Column<string>(type: "varchar(60)", nullable: true),
                    AddressTwo = table.Column<string>(type: "varchar(60)", nullable: true),
                    City = table.Column<string>(type: "varchar(40)", nullable: true),
                    State = table.Column<string>(type: "varchar(20)", nullable: true),
                    ZipCode = table.Column<string>(type: "varchar(10)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Addresses", x => x.AddressId);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "varchar(60)", nullable: false),
                    LastName = table.Column<string>(type: "varchar(60)", nullable: false),
                    Email = table.Column<string>(type: "varchar(255)", nullable: false),
                    BirthDay = table.Column<DateTime>(type: "datetime2", nullable: false),
                    AccountType = table.Column<string>(type: "varchar(10)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(128)", nullable: false),
                    Salt = table.Column<string>(type: "nvarchar(128)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "varchar(15)", nullable: true),
                    AddressId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                    table.ForeignKey(
                        name: "FK_Users_Addresses_AddressId",
                        column: x => x.AddressId,
                        principalTable: "Addresses",
                        principalColumn: "AddressId",
                        onDelete: ReferentialAction.Restrict);
                });

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

            migrationBuilder.CreateTable(
                name: "ProfileLinks",
                columns: table => new
                {
                    ProfileLinkId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Link = table.Column<string>(type: "varchar(255)", nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProfileLinks", x => x.ProfileLinkId);
                    table.ForeignKey(
                        name: "FK_ProfileLinks_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FileUploads_UserId",
                table: "FileUploads",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ProfileLinks_UserId",
                table: "ProfileLinks",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_AddressId",
                table: "Users",
                column: "AddressId",
                unique: true,
                filter: "[AddressId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FileUploads");

            migrationBuilder.DropTable(
                name: "ProfileLinks");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Addresses");
        }
    }
}
