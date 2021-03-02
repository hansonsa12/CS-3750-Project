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
import React from 'react';
import Create from '@material-ui/icons/Create';
import GitHubIcon from '@material-ui/icons/GitHub';


export default function Profile_Static() {

    var fName = localStorage.getItem("user").split(",")[1].split(":")[1].replace('\"','');
    var lName = localStorage.getItem("user").split(",")[2].split(":")[1].replace('\"','');
    var email = localStorage.getItem("user").split(",")[3].split(":")[1].replace('\"','');
    var bDay =  localStorage.getItem("user").split(",")[4].split(":")[1].replace('\"','');
    fName = fName.slice(1,fName.length-1);
    lName = lName.slice(1,lName.length-1);
    email = email.slice(1,email.length-1);
    bDay = bDay.slice(1,11).split("-");
    var year = bDay[0];
    var month = bDay[1];
    var day = bDay[2];
    //?? THis is not converting the date properly
    var birthDay = new Date(year,month,day).toString();

    const EditButton = () =>(
        <IconButton>
            <Create />
        </IconButton>
    )

    return (
        <div>
            <Grid>
                <Avatar alt="Profile picture. This person looks Sharp!" src="C:\Users\Kronos\Documents\Programming\Web\React\CS-3750-Project\ClientApp\src\images\Profile_Pic.png"/>
            <Grid item>
            
            <Typography variant="h6">{fName} {lName}</Typography>
            <TextField
                    id="standard-name"
                    label="Email: "
                    value={email}
                    InputProps={{endAdornment: <EditButton />}}
                />
                <TextField
                    id="standard-name"
                    label="Bio: "
                    value="Something very interesting about the person you curretly are looking at."
                    InputProps={{endAdornment: <EditButton />}}
                />
            <div>
                <br/>
                <br/>
                <br/>
            </div>
                
                <Grid>
                    <TextField
                        id="standard-name"
                        label="Birthday: "
                        value={birthDay}
                        InputProps={{endAdornment: <EditButton />}}
                    />
                    <TextField
                        id="standard-name"
                        label="Address: "
                        value="ADDRESS"
                        InputProps={{endAdornment: <EditButton />}}
                    />
                    <TextField
                        id="standard-name"
                        label="Phone: "
                        value="PHONENUM"
                        InputProps={{endAdornment: <EditButton />}}
                    />
                </Grid>

                <div>
                    <br/>
                    <br/>
                    <br/>
                </div>

                <Grid item style={{ marginTop: 10 }}>
            

                    <a target="_blank" href="https://www.github.com" InputProps={{endAdornment: <EditButton />}}>Github</a>
                </Grid>
                <Typography variant="h6">LINKEDIN LINK</Typography>
                <Typography variant="h6">ETC LINK</Typography>
                
                </Grid>
                <FormLabel>Hello</FormLabel>
            </Grid>
            
        </div>
        
    )
}
