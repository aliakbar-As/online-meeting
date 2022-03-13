import React from 'react';
import { Routes, Route } from "react-router-dom";


import Login from '../components/Screens/AuthScreens/Login';
import VerificationCode from '../components/Screens/AuthScreens/VerificationCode';
import Register from '../components/Screens/AuthScreens/Register';

import Form from '../components/Screens/MainScreens/form/Form';
import FormInfo from '../components/Screens/MainScreens/form/FormInfo';



import ForumList from '../components/Screens/MainScreens/admin/ForumList';
import ForumInfo from '../components/Screens/MainScreens/admin/ForumInfo';
import StepOne from '../components/Screens/MainScreens/admin/addMeeting/StepOne';
import StepTwo from '../components/Screens/MainScreens/admin/addMeeting/StepTwo';
import FinalStep from '../components/Screens/MainScreens/admin/addMeeting/FinalStep';
import Election from '../components/Screens/MainScreens/admin/election/Election';
import ElectionDetails from '../components/Screens/MainScreens/admin/election/ElectionDetails';
import AddElection from '../components/Screens/MainScreens/admin/election/AddElection';

import AdminSurveyType from '../components/Screens/MainScreens/admin/AdminSurveyTypes';
import AdminSurvey from '../components/Screens/MainScreens/admin/Survey/Survey';
import SurveyDetails from '../components/Screens/MainScreens/admin/Survey/SurveyDetails';
import AddSurvey from '../components/Screens/MainScreens/admin/Survey/AddSurvey';
import AddQuestion from '../components/Screens/MainScreens/admin/Survey/AddQuestion';
import SurveyTypes from '../components/Screens/MainScreens/form/SurveyTypes';
import EditDuties from '../components/Screens/MainScreens/admin/addMeeting/EditDuties';
import AddCondidate from '../components/Screens/MainScreens/admin/election/AddCondidate';
import SurveyInfoEdit from '../components/Screens/MainScreens/admin/Survey/SurveyInfoEdit';
import SurveyQuestionsEdit from '../components/Screens/MainScreens/admin/Survey/SurveyQuestionsEdit';
import ElectionInfoEdit from '../components/Screens/MainScreens/admin/election/ElectionInfoEdit';
import ElectionCondidateEdit from '../components/Screens/MainScreens/admin/election/ElectionCondidateEdit';
import EditMeetingInfo from '../components/Screens/MainScreens/admin/EditMeetingInfo';
import EditMeetingDate from '../components/Screens/MainScreens/admin/EditMeetingDate';
import EditMeetingFiles from '../components/Screens/MainScreens/admin/EditMeetingFiles';

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
            <Route path="/admin/editDuties"
                element={<EditDuties />}
            />

            <Route path="/admin/add/nextstep"
                element={<StepTwo />}
            />

            <Route path="/admin/add/nextstep/finalstep"
                element={<FinalStep />}
            />


            <Route path="/admin/info/editInfo"
                element={<EditMeetingInfo />}
            />
            <Route path="/admin/info/editDate"
                element={<EditMeetingDate />}
            />
            <Route path="/admin/info/editFiles"
                element={<EditMeetingFiles />}
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
            <Route path="/admin/election/add/addCondidate"
                element={<AddCondidate />}
            />
            <Route path="/admin/election/editInfo"
                element={<ElectionInfoEdit />}
            />
            <Route path="/admin/election/editCondidate"
                element={<ElectionCondidateEdit />}
            />




            <Route path="/admin/surveyType"
                element={<AdminSurveyType />}
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
            <Route path="/admin/survey/editInfo"
                element={<SurveyInfoEdit />}
            />
            <Route path="/admin/survey/editQuestions"
                element={<SurveyQuestionsEdit />}
            />
        </Routes>
    );
};


export default RouterComponent;
