INSERT INTO 
    [lms_dev].[dbo].[Addresses] (
        [AddressOne],
        [AddressTwo],
        [City],
        [State],
        [ZipCode], 
        [UserId]
    )
    VALUES ('123 N 456 W', 'APT. 23', 'Cityton', 'UT', '12345-1234', '1');

INSERT INTO 
    [lms_dev].[dbo].[ProfileLinks] (
        [Link],
        [UserId]
    )
    VALUES ('https://github.com/hansonsa12/CS-3750-Project/projects/2', '1'),
    ('https://github.com/hansonsa12/CS-3750-Project/issues/29', '1');
