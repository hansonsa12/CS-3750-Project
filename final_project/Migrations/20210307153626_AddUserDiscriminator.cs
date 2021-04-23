using Microsoft.EntityFrameworkCore.Migrations;

namespace final_project.Migrations
{
    public partial class AddUserDiscriminator : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CourseStudent",
                columns: table => new
                {
                    RegistrationsCourseId = table.Column<int>(type: "int", nullable: false),
                    RegistrationsUserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseStudent", x => new { x.RegistrationsCourseId, x.RegistrationsUserId });
                    table.ForeignKey(
                        name: "FK_CourseStudent_Courses_RegistrationsCourseId",
                        column: x => x.RegistrationsCourseId,
                        principalTable: "Courses",
                        principalColumn: "CourseId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CourseStudent_Users_RegistrationsUserId",
                        column: x => x.RegistrationsUserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CourseStudent_RegistrationsUserId",
                table: "CourseStudent",
                column: "RegistrationsUserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CourseStudent");
        }
    }
}
