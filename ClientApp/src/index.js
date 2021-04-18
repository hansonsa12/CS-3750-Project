import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import "fontsource-roboto";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AuthProvider from "./context/AuthProvider";
import DataProvider from "./context/DataProvider";
import registerServiceWorker from "./registerServiceWorker";
import "react-circular-progressbar/dist/styles.css";

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");
const rootElement = document.getElementById("root");

ReactDOM.render(
    <BrowserRouter basename={baseUrl}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <AuthProvider>
                <DataProvider>
                    <App />
                </DataProvider>
            </AuthProvider>
        </MuiPickersUtilsProvider>
    </BrowserRouter>,
    rootElement
);

registerServiceWorker();
