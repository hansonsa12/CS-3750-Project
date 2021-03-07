import { 
    Button, 
    FormLabel,
    Grid,
    Typography,
    Avatar,
    IconButton,
    TextField,
    Divider,
 } from '@material-ui/core';
import React, { useContext } from 'react';
import _ from "lodash";
import Create from '@material-ui/icons/Create';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import PublicIcon from '@material-ui/icons/Public';
import { AuthContext } from '../context/AuthProvider';


export default function Profile_Static() {
    const { user } = useContext(AuthContext);

    var fName = localStorage.getItem("user").split(",")[1].split(":")[1].replace('\"','');
    var lName = localStorage.getItem("user").split(",")[2].split(":")[1].replace('\"','');
    var email = localStorage.getItem("user").split(",")[3].split(":")[1].replace('\"','');
    var bDay =  localStorage.getItem("user").split(",")[4].split(":")[1].replace('\"','');
    var bio = "BIO IN DATABASE";
    fName = fName.slice(1,fName.length-1);
    lName = lName.slice(1,lName.length-1);
    email = email.slice(1,email.length-1);
    bDay = bDay.slice(1,11).split("-");
    var year = bDay[0];
    var month = bDay[1]-1;
    var day = bDay[2];
    //?? THis is not converting the date properly
    var birthDay = new Date(year,month,day).toDateString();

    const EditButton = () =>(
        <IconButton>
            <Create />
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
                </Grid>
            </Grid>   
            
        </div>
    )
}
