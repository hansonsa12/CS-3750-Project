using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace final_project.Migrations
{
    public partial class UpdateAssignmentSubmissionTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FileName",
                table: "AssignmentSubmissions",
                type: "varchar(60)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "GradedAt",
                table: "AssignmentSubmissions",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InstructorFeedback",
                table: "AssignmentSubmissions",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FileName",
                table: "AssignmentSubmissions");

            migrationBuilder.DropColumn(
                name: "GradedAt",
                table: "AssignmentSubmissions");

            migrationBuilder.DropColumn(
                name: "InstructorFeedback",
                table: "AssignmentSubmissions");
        }
    }
}
