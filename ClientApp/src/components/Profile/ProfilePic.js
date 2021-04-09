import { Avatar } from "@material-ui/core";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { getFileUrl } from "../../helpers/helpers";

export const ProfilePic = props => {
    const {
        user: { userId, firstName, lastName, profilePicName }
    } = useContext(AuthContext);
    return (
        <Avatar
            alt={`${firstName} ${lastName} profile pic. This person looks Sharp!`}
            src={getFileUrl(userId, "profilepic", profilePicName)}
            {...props}
        />
    );
};
