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
import ElectionDetails from '../components/Screens/MainScreens/admin/election/ElectionDetails';
import AddElection from '../components/Screens/MainScreens/admin/election/AddElection';

import AdminSurvey from '../components/Screens/MainScreens/admin/Survey/Survey';
import SurveyDetails from '../components/Screens/MainScreens/admin/Survey/SurveyDetails';
import AddSurvey from '../components/Screens/MainScreens/admin/Survey/AddSurvey';
import AddQuestion from '../components/Screens/MainScreens/admin/Survey/AddQuestion';
import SurveyQuestion from '../components/Screens/MainScreens/form/SurveyQuestion';
import SurveyTypes from '../components/Screens/MainScreens/form/SurveyTypes';

function RouterComponent() {
    return (
        <Routes>

            {/* FORUM SCREENS */}

            <Route path="/" element={<Login />} />

            <Route path="/code"
                element={<VerificationCode />}
            />

            <Route path="/code/register"
                element={<Register />}
            />



            <Route path="/form"
                element={<Form />}
            />

            <Route path="/form/info"
                element={<FormInfo />}
            />


            <Route path="/form/info/survey"
                element={<SurveyTypes />}
            />

            {/* <Route path="/form/info/survey/surveys"
                element={<SurveyQuestion />}
            /> */}





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

            <Route path="/admin/election/detail"
                element={<ElectionDetails />}
            />

            <Route path="/admin/election/add"
                element={<AddElection />}
            />




            <Route path="/admin/survey"
                element={<AdminSurvey />}
            />

            <Route path="/admin/survey/detail"
                element={<SurveyDetails />}
            />

            <Route path="/admin/survey/add"
                element={<AddSurvey />}
            />

            <Route path="/admin/survey/add/question"
                element={<AddQuestion />}
            />

        </Routes>
    );
};


export default RouterComponent;
