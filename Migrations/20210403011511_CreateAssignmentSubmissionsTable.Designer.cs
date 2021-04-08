﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using final_project.Data;

namespace final_project.Migrations
{
    [DbContext(typeof(LMSContext))]
    [Migration("20210403011511_CreateAssignmentSubmissionsTable")]
    partial class CreateAssignmentSubmissionsTable
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.3")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("CourseStudent", b =>
                {
                    b.Property<int>("RegistrationsCourseId")
                        .HasColumnType("int");

                    b.Property<int>("RegistrationsUserId")
                        .HasColumnType("int");

                    b.HasKey("RegistrationsCourseId", "RegistrationsUserId");

                    b.HasIndex("RegistrationsUserId");

                    b.ToTable("CourseStudent");
                });

            modelBuilder.Entity("final_project.Models.Course.Assignment", b =>
                {
                    b.Property<int>("AssignmentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("AssignmentType")
                        .IsRequired()
                        .HasColumnType("varchar(11)");

                    b.Property<int>("CourseId")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<DateTime?>("DueDate")
                        .HasColumnType("datetime2");

                    b.Property<int?>("MaxPoints")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("varchar(60)");

                    b.HasKey("AssignmentId");

                    b.HasIndex("CourseId");

                    b.ToTable("Assignments");
                });

            modelBuilder.Entity("final_project.Models.Course.AssignmentSubmission", b =>
                {
                    b.Property<int>("AssignmentSubmissionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AssignmentId")
                        .HasColumnType("int");

                    b.Property<int?>("ReceivedScore")
                        .HasColumnType("int");

                    b.Property<int>("StudentId")
                        .HasColumnType("int");

                    b.Property<string>("Submission")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("SubmittedAt")
                        .HasColumnType("datetime2");

                    b.HasKey("AssignmentSubmissionId");

                    b.HasIndex("AssignmentId");

                    b.HasIndex("StudentId");

                    b.ToTable("AssignmentSubmissions");
                });

            modelBuilder.Entity("final_project.Models.Course.Course", b =>
                {
                    b.Property<int>("CourseId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("BuildingName")
                        .HasColumnType("varchar(60)");

                    b.Property<string>("CourseName")
                        .IsRequired()
                        .HasColumnType("varchar(60)");

                    b.Property<string>("CourseNumber")
                        .IsRequired()
                        .HasColumnType("varchar(10)");

                    b.Property<int>("CreditHours")
                        .HasColumnType("int");

                    b.Property<string>("Department")
                        .IsRequired()
                        .HasColumnType("varchar(60)");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("EndTime")
                        .HasColumnType("varchar(8)");

                    b.Property<int>("InstructorId")
                        .HasColumnType("int");

                    b.Property<int?>("MaxCapacity")
                        .HasColumnType("int");

                    b.Property<string>("MeetingDays")
                        .HasColumnType("varchar(5)");

                    b.Property<string>("RoomNumber")
                        .HasColumnType("varchar(10)");

                    b.Property<string>("StartTime")
                        .HasColumnType("varchar(8)");

                    b.HasKey("CourseId");

                    b.HasIndex("InstructorId");

                    b.ToTable("Courses");
                });

            modelBuilder.Entity("final_project.Models.User.Address", b =>
                {
                    b.Property<int>("AddressId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("AddressOne")
                        .HasColumnType("varchar(60)");

                    b.Property<string>("AddressTwo")
                        .HasColumnType("varchar(60)");

                    b.Property<string>("City")
                        .HasColumnType("varchar(40)");

                    b.Property<string>("State")
                        .HasColumnType("varchar(20)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<string>("ZipCode")
                        .HasColumnType("varchar(10)");

                    b.HasKey("AddressId");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("Addresses");
                });

            modelBuilder.Entity("final_project.Models.User.ProfileLink", b =>
                {
                    b.Property<int>("ProfileLinkId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Link")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Title")
                        .HasColumnType("varchar(60)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("ProfileLinkId");

                    b.HasIndex("UserId");

                    b.ToTable("ProfileLinks");
                });

            modelBuilder.Entity("final_project.Models.User.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("AccountType")
                        .IsRequired()
                        .HasColumnType("varchar(10)");

                    b.Property<string>("Biography")
                        .HasColumnType("text");

                    b.Property<DateTime>("BirthDay")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("varchar(60)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("varchar(60)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(128)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("varchar(15)");

                    b.Property<string>("ProfilePicName")
                        .HasColumnType("varchar(60)");

                    b.Property<string>("Salt")
                        .HasColumnType("nvarchar(128)");

                    b.HasKey("UserId");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.ToTable("Users");

                    b.HasDiscriminator<string>("AccountType").HasValue("User");
                });

            modelBuilder.Entity("final_project.Models.User.Instructor", b =>
                {
                    b.HasBaseType("final_project.Models.User.User");

                    b.HasDiscriminator().HasValue("instructor");
                });

            modelBuilder.Entity("final_project.Models.User.Student", b =>
                {
                    b.HasBaseType("final_project.Models.User.User");

                    b.HasDiscriminator().HasValue("student");
                });

            modelBuilder.Entity("CourseStudent", b =>
                {
                    b.HasOne("final_project.Models.Course.Course", null)
                        .WithMany()
                        .HasForeignKey("RegistrationsCourseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("final_project.Models.User.Student", null)
                        .WithMany()
                        .HasForeignKey("RegistrationsUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("final_project.Models.Course.Assignment", b =>
                {
                    b.HasOne("final_project.Models.Course.Course", null)
                        .WithMany("Assignment")
                        .HasForeignKey("CourseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("final_project.Models.Course.AssignmentSubmission", b =>
                {
                    b.HasOne("final_project.Models.Course.Assignment", "Assignment")
                        .WithMany("AssignmentSubmissions")
                        .HasForeignKey("AssignmentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("final_project.Models.User.Student", "Student")
                        .WithMany("AssignmentSubmissions")
                        .HasForeignKey("StudentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Assignment");

                    b.Navigation("Student");
                });

            modelBuilder.Entity("final_project.Models.Course.Course", b =>
                {
                    b.HasOne("final_project.Models.User.Instructor", "Instructor")
                        .WithMany("Courses")
                        .HasForeignKey("InstructorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Instructor");
                });

            modelBuilder.Entity("final_project.Models.User.Address", b =>
                {
                    b.HasOne("final_project.Models.User.User", null)
                        .WithOne("Address")
                        .HasForeignKey("final_project.Models.User.Address", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("final_project.Models.User.ProfileLink", b =>
                {
                    b.HasOne("final_project.Models.User.User", null)
                        .WithMany("ProfileLinks")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("final_project.Models.Course.Assignment", b =>
                {
                    b.Navigation("AssignmentSubmissions");
                });

            modelBuilder.Entity("final_project.Models.Course.Course", b =>
                {
                    b.Navigation("Assignment");
                });

            modelBuilder.Entity("final_project.Models.User.User", b =>
                {
                    b.Navigation("Address");

                    b.Navigation("ProfileLinks");
                });

            modelBuilder.Entity("final_project.Models.User.Instructor", b =>
                {
                    b.Navigation("Courses");
                });

            modelBuilder.Entity("final_project.Models.User.Student", b =>
                {
                    b.Navigation("AssignmentSubmissions");
                });
#pragma warning restore 612, 618
        }
    }
}
