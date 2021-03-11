import { 
    Button, 
    FormLabel,
    Grid,
    Typography,
    Avatar,
    IconButton,
    TextField,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
 } from '@material-ui/core';

import React, { Component } from 'react';
import _ from "lodash";
import Create from '@material-ui/icons/Create';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import PublicIcon from '@material-ui/icons/Public';
import { SettingsPowerRounded } from '@material-ui/icons';
import {Form as FForm} from "react-final-form"
import { KeyboardTimePicker, Checkboxes, showErrorOnBlur } from "mui-rff";
import { makeStyles } from '@material-ui/core/styles';
import { AuthContext } from '../context/AuthProvider';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
  }));

export default function Profile_Static(props) {

    const { user } = useContext(AuthContext);

    const classes = useStyles();


    // var fName = localStorage.getItem("user").split(",")[1].split(":")[1].replace('\"','');
    // var lName = localStorage.getItem("user").split(",")[2].split(":")[1].replace('\"','');
    // var email = localStorage.getItem("user").split(",")[3].split(":")[1].replace('\"','');
    // var bDay =  localStorage.getItem("user").split(",")[4].split(":")[1].replace('\"','');
    // var bio = "BIO IN DATABASE";


    fName = fName.slice(1,fName.length-1);
    lName = lName.slice(1,lName.length-1);
    email = email.slice(1,email.length-1);
    bDay = bDay.slice(1,11).split("-");
    var year = bDay[0];
    var month = bDay[1]-1;
    var day = bDay[2];
    //?? THis is not converting the date properly
    var birthDay = new Date(year,month,day).toDateString();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = () => {
        alert("Success!");
    }

    const TextEntry = (fieldProps) => (
        <Grid item xs={12} {..._.pick(fieldProps, ['sm'])}>
            <TextField size="small" label={_.startCase(fieldProps.name)}
                variant="outlined" showError={showErrorOnBlur}
                {..._.omit(fieldProps, ['sm'])}
            />
        </Grid>
    )

    const SectionHeader = (fieldProps) => (
        <Grid item xs={12}>
            <Typography style={fieldProps.style}>{fieldProps.title}</Typography>
            <Divider />
        </Grid>
    );

    const EditButton = () =>(
        <IconButton>
            <Create/>
        </IconButton>
    )

    const GitHubButton = () =>(
        <IconButton>
            <GitHubIcon />
        </IconButton>
    )

    function btnGithubClick(e) {
        window.open("https://www.github.com");
    }

    function btnLinkedInClick(e) {
        window.open("https://www.linkedin.com");
    }
    function btnOtherClick(e) {
        window.open("https://www.google.com");
    }

    

    return (
        <div>
            <Grid>
                <Avatar alt="Profile picture. This person looks Sharp!" src="C:\Users\Kronos\Documents\Programming\Web\React\CS-3750-Project\ClientApp\src\images\Profile_Pic.png"/>
            
                <Grid item>
                
                    <Typography variant="h6">{fName} {lName}</Typography>
                    
                    <label>Bio:</label>
                    <br/>
                    <textarea
                        style={{
                            height:"200px",
                            width:"500px",
                            backgroundColor:"transparent",
                            
                        }}>
                        {bio}
                    </textarea>
                    <br/>
                    <Button variant="outlined" color="primary">
                        Update Bio
                    </Button>
                    <div>
                        <br/><br/><br/>
                    </div>
                        
                    <Grid>
                        <Grid>
                            <TextField
                                id="standard-name"
                                label="Email: "
                                value={email}
                            />
                            <TextField
                                id="standard-name"
                                label="Phone: "
                                value="PHONENUM"
                            />
                            <TextField
                                id="standard-name"
                                label="Birthday: "
                                value={birthDay}
                            />
                        </Grid>
                        <div>
                            <br/><br/><br/>
                        </div>
                        <Grid>
                            <TextField
                                id="standard-name"
                                label="Address 1: "
                                value="ADDRESS"
                            />
                            <TextField
                                id="standard-name"
                                label="Address 2: "
                                value="ADDRESS"
                            />
                        </Grid>
                        <div>
                            <br/><br/><br/>
                        </div>
                        <Grid>
                            <TextField
                                id="standard-name"
                                label="City: "
                                value="CITY"
                            />
                            <TextField
                                id="standard-name"
                                label="State: "
                                value="STATE"
                            />
                            <TextField
                                id="standard-name"
                                label="Zip: "
                                value="ZIPCODE"
                            />
                        </Grid>
                    </Grid>

                    <div>
                        <br/><br/><br/>
                    </div>

                    <Button 
                        variant = "contained"
                        startIcon={<GitHubIcon />}
                        onClick={btnGithubClick}>
                        GitHub
                    </Button>
                    <Button 
                        variant = "contained"
                        startIcon={<LinkedInIcon />}
                            onClick={btnLinkedInClick}>
                        LinkedIn
                    </Button>
                    <Button 
                        variant = "contained"
                        startIcon={<PublicIcon />}
                        onClick={btnOtherClick}>
                        Other
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleClickOpen}>
                        Edit
                    </Button>
                    <FForm onSubmit={onSubmit}>
                        {({ handleSubmit }) => (
                            <form onSubmit={handleSubmit}>
                                <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="form-dialog-title"
                                >
                                    <DialogTitle id="form-dialog-title">Edit Form</DialogTitle>
                                    <DialogContent>
                                        <Grid container spacing={2} justify="space-between">
                                        <SectionHeader title="Profile Information" />
                                        <TextEntry name="Phone Number" sm={6} />
                                        <TextEntry name="Address 1" sm={6} />
                                        <TextEntry name="Address 2" sm={6} />
                                        <TextEntry name="City" sm={6}/>
                                        <TextEntry name="State" sm={6}/>
                                        <TextEntry name="Zipcode" sm={6}/>
                                        <TextEntry name="Link 1" sm={8}/>
                                        <TextEntry name="Link 2" sm={8}/>
                                        <TextEntry name="Link 3" sm={8}/>
                                        <div className={classes.root}>
                                            <input
                                                accept="image/*"
                                                className={classes.input}
                                                id="contained-button-file"
                                                multiple
                                                type="file"
                                            />
                                            <label htmlFor="contained-button-file">
                                                <Button variant="contained" color="primary" component="span">
                                                    Upload
                                                </Button>
                                            </label>
                                        </div>
                                        
                                        </Grid>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose} color = "primary">
                                            Cancel
                                        </Button>
                                        <Button onClick={handleSubmit} color = "primary">
                                            Submit
                                        </Button>
                                    </DialogActions>

                                </Dialog>

                            </form>

                        )
                        }

                    </FForm>
                </Grid>
            </Grid>   
            
        </div>
    )
}
