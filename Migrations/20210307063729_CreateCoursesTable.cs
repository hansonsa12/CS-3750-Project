using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace final_project.Migrations
{
    public partial class CreateCoursesTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Courses",
                columns: table => new
                {
                    CourseId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CourseName = table.Column<string>(type: "varchar(60)", nullable: false),
                    CourseNumber = table.Column<string>(type: "varchar(10)", nullable: false),
                    InstructorId = table.Column<int>(type: "int", nullable: false),
                    Department = table.Column<string>(type: "varchar(60)", nullable: false),
                    CreditHours = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    BuildingName = table.Column<string>(type: "varchar(60)", nullable: true),
                    RoomNumber = table.Column<string>(type: "varchar(10)", nullable: true),
                    MeetingDays = table.Column<string>(type: "varchar(5)", nullable: true),
                    StartTime = table.Column<TimeSpan>(type: "time", nullable: true),
                    EndTime = table.Column<TimeSpan>(type: "time", nullable: true),
                    MaxCapacity = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Courses", x => x.CourseId);
                    table.ForeignKey(
                        name: "FK_Courses_Users_InstructorId",
                        column: x => x.InstructorId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Courses_InstructorId",
                table: "Courses",
                column: "InstructorId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Courses");
        }
    }
}
