import React from 'react';
import { Routes, Route } from "react-router-dom";


import Login from '../components/Screens/AuthScreens/Login';
import VerificationCode from '../components/Screens/AuthScreens/VerificationCode';
import Register from '../components/Screens/AuthScreens/Register';

import Form from '../components/Screens/MainScreens/form/Form';
import FormInfo from '../components/Screens/MainScreens/form/FormInfo';
import Survey from '../components/Screens/MainScreens/form/Survey';
import Candidate from '../components/Screens/MainScreens/form/Candidate';



import ForumList from '../components/Screens/MainScreens/admin/ForumList';
import ForumInfo from '../components/Screens/MainScreens/admin/ForumInfo';
import StepOne from '../components/Screens/MainScreens/admin/addMeeting/StepOne';
import StepTwo from '../components/Screens/MainScreens/admin/addMeeting/StepTwo';
import FinalStep from '../components/Screens/MainScreens/admin/addMeeting/FinalStep';
import Election from '../components/Screens/MainScreens/admin/election/Election';

function RouterComponent() {
    return (
        <Routes>

            {/* FORUM SCREENS */}

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

            <Route path="/form/info/survey"
                element={<Survey />}
            />

            <Route path="/form/info/candidate"
                element={<Candidate />}
            />



            {/* ADMIN PANEL SCREENS */}

            <Route path="/admin"
                element={<ForumList />}
            />

            <Route path="/admin/info"
                element={<ForumInfo />}
            />

            <Route path="/admin/add"
                element={<StepOne />}
            />

            <Route path="/admin/add/nextstep"
                element={<StepTwo />}
            />

            <Route path="/admin/add/nextstep/finalstep"
                element={<FinalStep />}
            />




            <Route path="/admin/election"
                element={<Election />}
            />
        </Routes>
    );
};


export default RouterComponent;
