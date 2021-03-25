import { Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles } from "@material-ui/core";
import {
    ChevronLeft, ChevronRight, DashboardRounded, EventRounded, ExitToAppRounded, LibraryBooks, MonetizationOn
} from "@material-ui/icons";
import clsx from "clsx";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from '../context/AuthProvider';
import { AccountType } from '../helpers/constants';
import { ProfilePic } from './Profile/ProfilePic';

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
    const [open, setOpen] = React.useState(JSON.parse(localStorage["navBarOpen"] ?? null) ?? true);

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
                        icon: <ProfilePic style={{ marginLeft: -8 }} />,
                        onClick: () => history.push("/profile")
                    },
                    {
                        text: "Dashboard", icon: <DashboardRounded />,
                        onClick: () => history.push("/dashboard")
                    },
                    {
                        text: "Calendar", icon: <EventRounded />,
                        onClick: () => history.push("/calendar")
                    },
                    {
                        for: AccountType.INSTRUCTOR,
                        text: "Courses", icon: <LibraryBooks />,
                        onClick: () => history.push("/courses")
                    },
                    {
                        for: AccountType.STUDENT,
                        text: "Registrations", icon: <LibraryBooks />,
                        onClick: () => history.push("/registrations")
                    },
                    {
                        for: AccountType.STUDENT,
                        text: "Tuition", icon: <MonetizationOn />,
                        onClick: () => history.push("/tuition")
                    },
                    {
                        text: "Logout", icon: <ExitToAppRounded style={{ transform: "scaleX(-1)" }} />,
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
