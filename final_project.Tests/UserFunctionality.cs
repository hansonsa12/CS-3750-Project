using System;


namespace final_project.Tests
{
    using final_project.Controllers;
    using final_project.Tests.Shared;
    using Xunit;

    public class UserFunctionality : IClassFixture<SharedDatabaseFixture>
    {
        public SharedDatabaseFixture Fixture { get; }

        public UserFunctionality(SharedDatabaseFixture fixture)
        {
            Fixture = fixture;
        }


        [Fact]
        public async void StudentCanEditTheirPersonalInfo()
        {
            var expectedPhone = "555-555-5555";

            using (var context = Fixture.CreateContext())
            {
                #region Setup
                var controller = new CoursesController(context);
                TestHelper testHelper = new TestHelper(context, controller);

                // Create student
                var student = testHelper.GetDefaultStudent();
                testHelper.Login(student);
                #endregion

                #region Exercise
                // Change Information
                student.UpdateInfo(testHelper.updateUserInfo(expectedPhone));
                #endregion

                #region Verify
                var studentPhone = student.PhoneNumber;
                Assert.True(studentPhone == expectedPhone);
                #endregion
            }
        }
    }
}
