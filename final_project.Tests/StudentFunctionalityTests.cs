namespace final_project.Tests
{
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using final_project.Controllers;
    using final_project.Models.Course;
    using final_project.Models.User;
    using final_project.Tests.Shared;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Xunit;

    public class StudentFunctionalityTests : IClassFixture<SharedDatabaseFixture>
    {
        /* https://github.com/dotnet/EntityFramework.Docs/blob/main/samples/core/Miscellaneous/Testing/ItemsWebApi/SharedDatabaseTests/SharedDatabaseTest.cs */
        public SharedDatabaseFixture Fixture { get; }

        public StudentFunctionalityTests(SharedDatabaseFixture fixture)
        {
            Fixture = fixture;
        }

        [Fact]
        public async void StudentCanRegisterForACourse()
        {
            using (var context = Fixture.CreateContext())
            {
                TestHelper testHelper = new TestHelper(context);
                var controller = new RegistrationsController(context);

                var currentUser = testHelper.GetDefaultStudent(); // student doesn't matter so I am just using a default
                controller.ControllerContext = testHelper.GetControllerContext(currentUser.UserId); // mocks the user being logged in

                Assert.True(currentUser.Registrations.Count == 0, "Student registrations should be 0"); // should have no registrations initially

                var result = await controller.RegisterForCourse((testHelper.CreateACourse()).CourseId); // create and register for a new course

                Assert.True(currentUser.Registrations.Count == 1, "Student registrations should be 1"); // should now have one registered course
            }
        }
    }
}
