import React, { useContext, useEffect, useState } from 'react';

import styled from 'styled-components';


import StoreContext from '../../../../Stores';

import { useNavigate } from 'react-router-dom';
import Election from './election/Election';
import Survey from './Survey/Survey';

import empty from '../../../../assets/mainScreens/Exclude.png';
import { Header, Loading } from '../../../Commons';
import useWindowDimensions from '../../../../Utils/Dimension';

const AdminSurveyTypes = (props) => {
    const navigate = useNavigate();
    const { MeetingProfileStore } = useContext(StoreContext);
    const { width } = useWindowDimensions();

    const [surveyData, setSurveyData] = useState([]);
    const [electionData, setElectionData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        MeetingProfileStore.getSurvey(true, 2, 'admin').then(res => {
            setElectionData(res);
            setLoading(false);
        });


        MeetingProfileStore.getSurvey(false, 1, 'admin').then(res => {
            setSurveyData(res);
        });
    }, []);


    return (
        <div style={{ padding: 16 }}>
            <Header backOnclick={() => navigate(-1)} />

            <Info>
                <span>مجمع ها / نظرسنجی ها و انتخابات</span>
            </Info>

            {electionData.length !== 0 ? <Election data={electionData} /> : null}


            {surveyData.length !== 0 ? <Survey data={surveyData} /> : null}






            {MeetingProfileStore.surveyList.length === 0 && surveyData.length === 0 ?
                <Empty>
                    <p>در حال حاضر برای این مجمع نظرسنجی یا انتخاباتی ثبت نشده است</p>
                    <img src={empty} alt="empty" />
                </Empty> : null}


            {loading ? <Loading /> : null}
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

export default AdminSurveyTypes;