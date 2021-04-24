namespace final_project.Tests
{
    using final_project.Controllers;
    using final_project.Models.Course;
    using final_project.Tests.Shared;
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
                // Steps for test: (1) Setup, (2) Exercise, (3) Verify
                // region tags just used for organization. not needed
                #region Setup
                var controller = new RegistrationsController(context);
                TestHelper testHelper = new TestHelper(context, controller);
                // Student doesn't matter here so I am just using a default
                var student = testHelper.GetDefaultStudent();

                // Mocks the user being logged in. Must be a user added in the database.
                testHelper.Login(student);

                // Get initial registrations count
                var initialRegistrationsCount = student.Registrations.Count;

                #endregion

                #region Exercise
                // create and register for a new course
                var result = await controller.RegisterForCourse((testHelper.CreateACourse()).CourseId);

                #endregion

                #region Verify
                // should now have one registered course
                Assert.True(student.Registrations.Count == initialRegistrationsCount + 1,
                    "Student registrations increased by 1");

                #endregion
            }
        }

        [Fact]
        public async void StudentCanDropACourse()
        {
            using (var context = Fixture.CreateContext())
            {
                // Steps for test: (1) Setup, (2) Exercise, (3) Verify
                // region tags just used for organization. not needed
                #region Setup
                var controller = new RegistrationsController(context);
                TestHelper testHelper = new TestHelper(context, controller);
                // Student doesn't matter here so I am just using a default
                var student = testHelper.GetDefaultStudent();

                // Mocks the user being logged in. Must be a user added in the database.
                testHelper.Login(student);

                Course newCourse = testHelper.CreateACourse();

                student.Registrations.Add(newCourse);
                context.SaveChanges();

                // Get initial registrations count
                var initialRegistrationsCount = student.Registrations.Count;

                #endregion

                #region Exercise
                // create and register for a new course
                var result = await controller.DropCourse(newCourse.CourseId);

                #endregion

                #region Verify
                // should now have one registered course
                Assert.True(student.Registrations.Count == initialRegistrationsCount - 1,
                    "Student registrations decreased by 1");

                #endregion
            }
        }
    }
}
