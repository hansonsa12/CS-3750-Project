import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import { ChevronLeft, ChevronRight, AccountCircle, HomeRounded, EventRounded, ExitToAppRounded } from "@material-ui/icons";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { authActions } from "../helpers/authActions";

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
            marginTop: "80px"
        }
    };
});

export default function SideNavigation() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

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
                    { text: "Profile", icon: <AccountCircle /> },
                    {
                        text: "Dashboard", icon: <HomeRounded />
                    },
                    { text: "Calendar", icon: <EventRounded /> },
                    {
                        addSpacer: true,
                        text: "Logout", icon: <ExitToAppRounded />, props: {
                            onClick: authActions.logout
                        }
                    }
                ].map((item, index) => (
                    <ListItem button key={item.text} {...item.props} >
                        { item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>

            <div className={classes.collapseToggle}>
                <IconButton onClick={handleDrawerToggle}>
                    {open ? <ChevronLeft /> : <ChevronRight />}
                </IconButton>
            </div>
        </Drawer>
    );
}
