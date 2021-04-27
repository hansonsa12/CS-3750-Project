using System;

namespace final_project.Tests
{
    using final_project.Controllers;
    using final_project.Tests.Shared;
    using Xunit;

    public class InstructorFunctionalityTests : IClassFixture<SharedDatabaseFixture>
    {
        public SharedDatabaseFixture Fixture { get; }

        public InstructorFunctionalityTests(SharedDatabaseFixture fixture)
        {
            Fixture = fixture;
        }

        [Fact]
        public async void InstructorCreateCourse()
        {
            using (var context = Fixture.CreateContext())
            {
                #region Setup
                var controller = new CoursesController(context);
                TestHelper testHelper = new TestHelper(context, controller);

                var instructor = testHelper.GetDefaultInstructor();
                testHelper.Login(instructor);

                var initialCourseCount = instructor.Courses.Count;
                #endregion

                #region Exercise
                var result = await controller.PostCourse(testHelper.CreateACourse());
                #endregion

                #region Verify
                Assert.True(instructor.Courses.Count == initialCourseCount + 1);
                #endregion



            }

        }


        [Fact]
        public async void InstructorDeleteCourse()
        {
            using (var context = Fixture.CreateContext())
            {
                #region Setup
                var controller = new CoursesController(context);
                TestHelper testHelper = new TestHelper(context, controller);

                var instructor = testHelper.GetDefaultInstructor();
                testHelper.Login(instructor);
                var course = testHelper.CreateACourse();

                var initialCourseCount = instructor.Courses.Count;
                #endregion

                #region Exercise
                var result = await controller.DeleteCourseById(course.CourseId);
                #endregion

                #region Verify
                Assert.True(instructor.Courses.Count == initialCourseCount - 1);
                #endregion
            }
        }

    }
}
