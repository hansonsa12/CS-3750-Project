import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "fontsource-roboto";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns";
import AuthProvider from './context/AuthProvider';

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");
const rootElement = document.getElementById("root");

ReactDOM.render(
    <BrowserRouter basename={baseUrl}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <AuthProvider>
                <App />
            </AuthProvider>
        </MuiPickersUtilsProvider>
    </BrowserRouter>,
    rootElement
);

registerServiceWorker();
