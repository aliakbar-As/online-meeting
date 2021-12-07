import React from 'react';
import { Routes, Route } from "react-router-dom";


import Login from '../components/Screens/AuthScreens/Login';
import VerificationCode from '../components/Screens/AuthScreens/VerificationCode';
import Register from '../components/Screens/AuthScreens/Register';



import Form from '../components/Screens/MainScreens/form/Form';
import FormInfo from '../components/Screens/MainScreens/form/FormInfo';


function RouterComponent() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />

            <Route path="/code"
                element={<VerificationCode />}
            />

            <Route path="/register"
                element={<Register />}
            />



            <Route path="/form"
                element={<Form />}
            />

            <Route path="/form/info"
                element={<FormInfo />}
            />

        </Routes>
    );
};


export default RouterComponent;