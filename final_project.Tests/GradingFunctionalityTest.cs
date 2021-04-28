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

                // Create an assignment
                var cID = 1;// get id courseResult.
                await aController.PostAssignment(testHelper.CreateAnAssignment(cID));

                // Create student
                var student = testHelper.GetDefaultStudent();
                testHelper.Login(student);
                //await 

                // Submit assignment

                // Get current score to compare? maybe
                //?? Change this id
                var assignmentID = 0;
                var score = aController.GetAssignmentScores(assignmentID);

                #endregion

                #region Exercise
                // Grade Assignment

                #endregion

                #region Verfiy
                //Assert.True( != score);
                var newScore = aController.GetAssignmentScores(assignmentID);
                Assert.True(newScore != score);
                #endregion
            }
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
    }
}
