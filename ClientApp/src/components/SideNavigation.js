import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import { ChevronLeft, ChevronRight, AccountCircle, HomeRounded, EventRounded, ExitToAppRounded, LibraryBooks} from "@material-ui/icons";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { authActions } from "../helpers/authActions";
import { useHistory } from "react-router-dom";

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
    const [open, setOpen] = React.useState(localStorage["navBarOpen"] || true);

    const handleDrawerToggle = () => {
        localStorage["navBarOpen"] = !open;
        setOpen(!open);
    };

    const history = useHistory();

    const user = JSON.parse(localStorage["user"]);

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
                        text: "Profile", icon: <AccountCircle />,
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
                        onClick: authActions.logout
                    }
                ].map((item, index) => {
                    if (item.for && item.for !== user.accountType) return;
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
