import { Grid, Paper } from "@material-ui/core";
import React from "react";
import { useDropzone } from "react-dropzone";

export default function FileUploader({ onDrop, selectedFile }) {
    /* https://react-dropzone.js.org/#section-basic-example */

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false
    });

    return (
        <Grid item xs={12}>
            <Paper
                style={{
                    width: "100%",
                    textAlign: "center",
                    cursor: "pointer",
                    padding: 20
                }}
                variant="outlined"
                {...getRootProps()}
            >
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop file here ...</p>
                ) : selectedFile ? (
                    <p>{selectedFile.name}</p>
                ) : (
                    <p>Drag 'n' drop a file here, or click to select one</p>
                )}
            </Paper>
        </Grid>
    );
}

// const useStyles = makeStyles(theme => {
//     return {
//         root: {

//         }
//     };
// });
