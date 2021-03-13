INSERT INTO 
    [lms_dev].[dbo].[Addresses] (
        [AddressOne],
        [AddressTwo],
        [City],
        [State],
        [ZipCode], 
        [UserId]
    )
    VALUES ('123 N 456 W', 'APT. 23', 'Cityton', 'UT', '12345-1234', '1')
GO

INSERT INTO 
    [lms_dev].[dbo].[ProfileLinks] (
        [Link],
        [UserId]
    )
    VALUES ('https://github.com/hansonsa12/CS-3750-Project/projects/2', '1'),
    ('https://github.com/hansonsa12/CS-3750-Project/issues/29', '1')
GO

INSERT INTO [lms_dev].[dbo].[Courses] (
      [CourseName], 
      [CourseNumber],
      [InstructorId],
      [Department],
      [CreditHours],
      [Description],
      [BuildingName],
      [RoomNumber],
      [MeetingDays],
      [StartTime],
      [EndTime],
      [MaxCapacity]
) 
VALUES 
(
    'Advanced Database Programming',
    'CS 3550',
    '1',
    'Computer Science',
    '4',
    'Learn how to do some advanced things with databases',
    'Computer Science Building',
    'CA 141',
    'MWF',
    '08:00 AM',
    '10:30 AM',
    '30'
),
(
    'Software Engineering II',
    'CS 3750',
    '1',
    'Computer Science',
    '4',
    'Create a full stack application as a team.',
    'Computer Science Building',
    'CA 155',
    'TR',
    '11:30 AM',
    '01:00 PM',
    '20'
),
(
    'Database Administration',
    'CS 3540',
    '1',
    'Computer Science',
    '4',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '30'
),
(
    'Object Oriented User Interface Development with Java',
    'CS 3230',
    '1',
    'Computer Science',
    '4',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '30'
)
GO