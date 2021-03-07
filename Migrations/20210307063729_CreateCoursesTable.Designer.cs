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
    [Migration("20210307063729_CreateCoursesTable")]
    partial class CreateCoursesTable
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.3")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

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

                    b.Property<TimeSpan?>("EndTime")
                        .HasColumnType("time");

                    b.Property<int>("InstructorId")
                        .HasColumnType("int");

                    b.Property<int?>("MaxCapacity")
                        .HasColumnType("int");

                    b.Property<string>("MeetingDays")
                        .HasColumnType("varchar(5)");

                    b.Property<string>("RoomNumber")
                        .HasColumnType("varchar(10)");

                    b.Property<TimeSpan?>("StartTime")
                        .HasColumnType("time");

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

            modelBuilder.Entity("final_project.Models.User.FileUpload", b =>
                {
                    b.Property<int>("FileUploadId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("FileName")
                        .IsRequired()
                        .HasColumnType("varchar(60)");

                    b.Property<string>("FileType")
                        .IsRequired()
                        .HasColumnType("varchar(10)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("FileUploadId");

                    b.HasIndex("UserId");

                    b.ToTable("FileUploads");
                });

            modelBuilder.Entity("final_project.Models.User.ProfileLink", b =>
                {
                    b.Property<int>("ProfileLinkId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Link")
                        .HasColumnType("varchar(255)");

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

                    b.Property<string>("Bio")
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

                    b.Property<string>("Salt")
                        .HasColumnType("nvarchar(128)");

                    b.HasKey("UserId");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.ToTable("Users");
                });

            modelBuilder.Entity("final_project.Models.Course.Course", b =>
                {
                    b.HasOne("final_project.Models.User.User", "Instructor")
                        .WithMany()
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

            modelBuilder.Entity("final_project.Models.User.FileUpload", b =>
                {
                    b.HasOne("final_project.Models.User.User", "Owner")
                        .WithMany("FileUploads")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Owner");
                });

            modelBuilder.Entity("final_project.Models.User.ProfileLink", b =>
                {
                    b.HasOne("final_project.Models.User.User", null)
                        .WithMany("ProfileLinks")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("final_project.Models.User.User", b =>
                {
                    b.Navigation("Address");

                    b.Navigation("FileUploads");

                    b.Navigation("ProfileLinks");
                });
#pragma warning restore 612, 618
        }
    }
}
