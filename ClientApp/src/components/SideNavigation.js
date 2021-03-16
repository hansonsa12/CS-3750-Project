import React, { useContext } from "react";
import clsx from "clsx";
import {
    makeStyles, Avatar, Drawer, List, IconButton, ListItem, ListItemIcon, ListItemText
} from "@material-ui/core";
import {
    ChevronLeft, ChevronRight, HomeRounded, EventRounded, ExitToAppRounded, LibraryBooks
} from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { AuthContext } from '../context/AuthProvider';

const useStyles = makeStyles((theme) => {
    const openDrawerWidth = 180;
    const closedDrawerWidth = theme.spacing(7) + 1;

    return {
        drawer: {
            width: closedDrawerWidth,
            flexShrink: 0,
            whiteSpace: "nowrap"
        },
        drawerOpen: {
            width: openDrawerWidth,
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            }),
            overflowX: "hidden",
        },
        drawerClose: {
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            overflowX: "hidden",
            width: closedDrawerWidth
        },
        collapseToggle: {
            margin: "auto 0 0 auto"
        },
        list: {
            marginTop: "65px"
        }
    };
});

export default function SideNavigation() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(JSON.parse(localStorage["navBarOpen"]) ?? true);

    const handleDrawerToggle = () => {
        localStorage["navBarOpen"] = !open;
        setOpen(!open);
    };

    const history = useHistory();

    const { user, logout } = useContext(AuthContext);

    return (
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open
            })}
            classes={{
                paper: clsx(classes.paper, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open
                })
            }}
        >
            <List className={classes.list}>
                {[
                    {
                        text: "Profile", 
                        icon: <Avatar src={`/uploads/u${user.userId}/${user.profilePicName}`} 
                         style={{ marginLeft: -5 }}/>,
                        onClick: () => history.push("/profile")
                    },
                    {
                        text: "Dashboard", icon: <HomeRounded />,
                        onClick: () => history.push("/dashboard")
                    },
                    {
                        text: "Calendar", icon: <EventRounded />,
                        onClick: () => history.push("/calendar")
                    },
                    {
                        for: "instructor",
                        text: "Courses", icon: <LibraryBooks />,
                        onClick: () => history.push("/courses")
                    },
                    {
                        for: "student",
                        text: "Registrations", icon: <LibraryBooks />,
                        onClick: () => history.push("/registrations")
                    },
                    {
                        text: "Logout", icon: <ExitToAppRounded />,
                        onClick: logout
                    }
                ].map((item, index) => {
                    if (item.for && item.for !== user.accountType) return null;
                    return (
                        <ListItem button key={item.text} onClick={item.onClick}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    )
                })}
            </List>

            <div className={classes.collapseToggle}>
                <IconButton onClick={handleDrawerToggle}>
                    {open ? <ChevronLeft /> : <ChevronRight />}
                </IconButton>
            </div>
        </Drawer>
    );
}
