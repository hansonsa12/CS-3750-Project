using System;


namespace final_project.Tests
{
    using final_project.Controllers;
    using final_project.Tests.Shared;
    using Xunit;

    public class GradingFunctionalityTest : IClassFixture<SharedDatabaseFixture>
    {
        public SharedDatabaseFixture Fixture { get; }

        public GradingFunctionalityTest(SharedDatabaseFixture fixture)
        {
            Fixture = fixture;
        }

        [Fact]
        public async void InstructorCanGradeAssignment()
        {
            using (var context = Fixture.CreateContext())
            {
                #region Setup
                var controller = new CoursesController(context);
                var aController = new AssignmentsController(context);
                var asController = new AssignmentSubmissionsController(context);
                TestHelper testHelper = new TestHelper(context, controller);

                // Create instructor & log in
                var instructor = testHelper.GetDefaultInstructor();
                testHelper.Login(instructor);

                // Create a course
                var courseResult = await controller.PostCourse(testHelper.CreateACourse());

                // Create an assignment & submit one
                var cID = 1;// get id courseResult.
                await aController.PostAssignment(testHelper.CreateAnAssignment(cID));

                // Create student
                var student = testHelper.GetDefaultStudent();
                testHelper.Login(student);
                #endregion

                #region Exercise
                // Grade Assignment
                instructor.Courses[0].Assignment[0].AssignmentSubmissions[0].GradeSubmission(testHelper.getGradedAssignment());

                #endregion

                #region Verify
                var expectedScore = 8;
                var newScore = instructor.Courses[0].Assignment[0].AssignmentSubmissions[0].ReceivedScore;
                Assert.True(newScore == expectedScore);
                #endregion
            }
        }
    }
}
