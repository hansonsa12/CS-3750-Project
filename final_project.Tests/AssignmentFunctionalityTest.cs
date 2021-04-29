namespace final_project.Tests
{
    using final_project.Controllers;
    using final_project.Models.Course;
    using final_project.Tests.Shared;
    using Xunit;

    public class AssignmentFunctionalityTest : IClassFixture<SharedDatabaseFixture>
    {
        /* https://github.com/dotnet/EntityFramework.Docs/blob/main/samples/core/Miscellaneous/Testing/ItemsWebApi/SharedDatabaseTests/SharedDatabaseTest.cs */
        public SharedDatabaseFixture Fixture { get; }

        public AssignmentFunctionalityTest(SharedDatabaseFixture fixture)
        { 
            Fixture = fixture;
        }

        [Fact]
        public async void InstructorCanCreateAssignment()
        {
            using (var context = Fixture.CreateContext())
            {
               
                #region Setup
                var controller = new CoursesController(context);
                var aController = new AssignmentsController(context);
               
                TestHelper testHelper = new TestHelper(context, controller);

                // Create instructor & log in
                var instructor = testHelper.GetDefaultInstructor();
                testHelper.Login(instructor);

                // Create a course
                var courseResult = await controller.PostCourse(testHelper.CreateACourse());
                //no assingments after course creation
                var initialCount=0;
             
                #endregion

                #region Exercise
                
                // Create an assignment & submit one
                var cID = 1;// get id courseResult.
                await aController.PostAssignment(testHelper.CreateAnAssignment(cID));

                #endregion

                #region Verify
                
                Assert.True(instructor.Courses[0].Assignment.Count == initialCount + 1);
                #endregion
            }
        }

        [Fact]
        public async void InstructorCanDropAssignment()
        {
            using (var context = Fixture.CreateContext())
            {
                // Steps for test: (1) Setup, (2) Exercise, (3) Verify
                // region tags just used for organization. not needed
                #region Setup
                var ccontroller = new CoursesController(context);
                var controller = new AssignmentsController(context);
                
                TestHelper testHelper = new TestHelper(context, ccontroller);
                 
                var instructor = testHelper.GetDefaultInstructor();

                // Mocks the user being logged in. Must be a user added in the database.
                testHelper.Login(instructor);

                Course newCourse = testHelper.CreateACourse();
                await ccontroller.PostCourse(newCourse);
                Assignment assignment=testHelper.CreateAnAssignment(newCourse.CourseId);
                await controller.PostAssignment(assignment);
                  
                // Get initial assignment count
                var initialAssigmentCount = instructor.Courses[0].Assignment.Count;

                #endregion

                #region Exercise
                // delete an assigment
                var result = await controller.DeleteAssignmentById(assignment.AssignmentId);

                #endregion

                #region Verify
                // should have no  assignment
                Assert.True(0 == initialAssigmentCount - 1);

                #endregion
            }
        }
    }
}
