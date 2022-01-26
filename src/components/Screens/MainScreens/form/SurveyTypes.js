import React, { useContext, useEffect, useState } from 'react';

import styled from 'styled-components';

import './form.css';

import StoreContext from '../../../../Stores';

import { useNavigate } from 'react-router-dom';
import Candidate from './Candidate';
import Survey from './Survey';

import backArrow from '../../../../assets/mainScreens/backArrow.png';
import survey from '../../../../assets/mainScreens/survey.png';
import clock from '../../../../assets/mainScreens/clock.png';
import calender from '../../../../assets/mainScreens/calender.png';
import empty from '../../../../assets/mainScreens/Exclude.png';
import user from '../../../../assets/mainScreens/user.png';
import downArrow from '../../../../assets/mainScreens/downArrow.png';

const SurveyTypes = (props) => {
    const navigate = useNavigate();
    const { MeetingProfileStore } = useContext(StoreContext);

    const [surveyData, setSurveyData] = useState([]);

    useEffect(() => {
        console.log('list', MeetingProfileStore.surveyList.length)
        console.log('list', surveyData.length)


        MeetingProfileStore.getSurvey(false, 1).then(res => {
            setSurveyData(res);
        });
    }, []);



    const leaveMeeting = () => {
        MeetingProfileStore.leaveMeeting().then(() => {
            navigate(-2);
        });
    };

    return (
        <div className="main">

            <TopView onClick={() => console.log('user')}>
                <IconsDiv>
                    <UserIcon src={user} alt="user" />

                    <ArrowIcon src={downArrow} alt="downArrow" />
                </IconsDiv>

                <Back onClick={() => navigate(-1)} src={backArrow} alt="backArrow" />

            </TopView>

            <Info>
                <span>مجمع ها / نظرسنجی ها و انتخابات</span>
            </Info>

            {MeetingProfileStore.surveyList.map(item => (
                <Candidate data={item} />
            ))}

            {surveyData.map(item => (
                <Survey data={item} />
            ))}





            {MeetingProfileStore.surveyList.length === 0 && surveyData.length === 0 ?
                <Empty>
                    <p>در حال حاضر برای این مجمع نظرسنجی یا انتخاباتی ثبت نشده است</p>
                    <img src={empty} alt="empty" />
                </Empty>
                :
                <Exit onClick={leaveMeeting}>
                    خروج
                </Exit>
            }

        </div>
    );
};



const Empty = styled.div`
    margin-top: 10%;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    p {
        margin-bottom: 30px;
        color: #A7AAC6;
        text-align: center;
    }
`;

const Exit = styled.div`
    font-size: 20px;

    text-align: right;
    text-decoration: underline;
    color: #FF4651;
    margin-top: 3%;
    cursor: pointer;
`;

const Back = styled.img`
    width: 48px;
    height: 48px;
    align-self: flex-end;
`;

const Info = styled.div`
    border-bottom: 1px solid #545772;
    text-align: right;
    margin-top: 16px;
    padding: 10px;
    
    span {
        color: #545772;
        font-size: 14px;
    }
`;

const ArrowIcon = styled.img`
    width: 13.33px;
    height: 8.23px;
    margin-left: 5px;
`;

const UserIcon = styled.img`
    width: 21.33px;
    height: 21.33px;
    margin-left: 10px;
`;


const IconsDiv = styled.div`
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
`;


const TopView = styled.div`
    flex-direction: row;
    align-items: center;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
`;

export default SurveyTypes;