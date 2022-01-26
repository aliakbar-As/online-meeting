import React, { useContext, useEffect, useState } from 'react';


import user from '../../../../assets/mainScreens/user.png';
import downArrow from '../../../../assets/mainScreens/downArrow.png';
import styled from 'styled-components';

import './form.css';

import { Button, ModalComponent } from '../../../../components/Commons';
import StoreContext from '../../../../Stores';
import moment from 'moment-jalaali';

import backArrow from '../../../../assets/mainScreens/backArrow.png';
import survey from '../../../../assets/mainScreens/survey.png';

import clock from '../../../../assets/mainScreens/clock.png';
import calender from '../../../../assets/mainScreens/calender.png';
import empty from '../../../../assets/mainScreens/Exclude.png';

import { useNavigate } from 'react-router-dom';


const Survey = (props) => {
    const navigate = useNavigate();
    const { MeetingProfileStore } = useContext(StoreContext);

    const [modalVisible, setModalVisible] = useState(0);


    useEffect(() => {
        console.log('data', props.data)
    }, []);

    const getQuestionSurvey = () => {
        navigate('/form/info/survey/surveys');
    };


    const onTakeSurvey = () => {
        MeetingProfileStore.setSurveyId(props.data.surveyId);

        MeetingProfileStore.checkExist().then(res => {
            if (!res) {
                setModalVisible(1);
            } else {
                setModalVisible(2)
            }
        });
    };


    return (
        <div className="main">


            <SurveyView>
                <span>نظرسنجی</span>
                <img src={survey} alt="survey" />
            </SurveyView>


            <ShortDescription>
                موضوع نظرسنجی : <span>{props.data.title}</span>
            </ShortDescription>

            <Card>

                <CardSection>
                    <span>تاریخ و ساعت پایان</span>

                    <div>
                        <img src={calender} alt="calender" />

                        <p>{moment(props.data.endDatetime).format('jYYYY/jMM/jDD')}</p>
                    </div>

                    <div>
                        <img src={clock} alt="clock" />

                        <p>{moment(props.data.endDatetime).format('HH:MM')}</p>
                    </div>
                </CardSection>


                <CardSection>
                    <span>تاریخ و ساعت فروش</span>

                    <div>
                        <img src={calender} alt="calender" />

                        <p>{moment(props.data.startDatetime).format('jYYYY/jMM/jDD')}</p>
                    </div>

                    <div>
                        <img src={clock} alt="clock" />

                        <p>{moment(props.data.startDatetime).format('HH:MM')}</p>
                    </div>
                </CardSection>

            </Card>


            <ShortDescription style={{ color: '#B592FE' }}>
                {props.data.surveyStatus === 0 ?
                    'در حال حاظر نظرسنجی ایجاد شده است'
                    :
                    props.data.surveyStatus === 1 ?
                        'نظرسنجی در حال برگزاری می‌باشد'
                        :
                        'در حال حاظر نظرسنجی به پایان رسید'}


            </ShortDescription>


            <Describtion>
                {props.data.description}
            </Describtion>

            <Footer>
                <Button
                    onPress={() => console.log('online meeting')}
                    title={'مشاهده آنلاین'} />

                <Button
                    primary
                    onPress={onTakeSurvey}
                    title={'شرکت در نظرسنجی'} />

            </Footer>

            <ModalComponent
                modalVisible={modalVisible !== 0}
                closeModal={() => setModalVisible(0)}
                hasError={modalVisible === 2}
                alert={modalVisible === 1}
                okOnclick={() => getQuestionSurvey()}
                cancelOnclick={() => setModalVisible(0)}
                content={modalVisible === 1 ? 'آیا در نظرسنجی شرکت می‌کنید؟' : 'شما قبلا در این نظرسنجی شرکت کرده اید'}
            />
        </div>
    );
};


const Exit = styled.div`
    font-size: 20px;

    text-align: right;
    text-decoration: underline;
    color: #FF4651;
    margin-top: 3%;
    cursor: pointer;
`;


const Describtion = styled.p`
    text-align: right;
    margin-top: 30px;
    color: #A7AAC6;
`;


const CardSection = styled.div`
    width: 20%;
    height: 150px;
    
    
    background: #2F3247;
    box-shadow: 0px 0px 15px rgba(35, 36, 45, 0.8);
    border-radius: 8px;
    position: relative;
    padding: 10px;

    margin-left: 10px;
    span {
        font-size: 15px;
        color: #B4BBFF;
        text-align: center;
    }

    div {
        margin-top: 10px;
        flex-direction: row;
        align-items: center;
        align-self: flex-start;
        display: flex;
        justify-content: flex-start;
        margin-left: 30%;
        height: 30%;
    }

    p {
        size: 15px;
        color: #7B88FF;
        margin-left: 10px;
        text-align: center;
    }
`;


const SurveyView = styled.div`
    flex-direction: row;
    align-items: center;
    align-self: flex-end;
    display: flex;
    justify-content: flex-end;

    margin-top: 16px;
    img {
        width: 20px;
        height: 20px;
        margin-left: 10px;
    }
    
    span {
        color: #97A1FF;
        text-align: right;

    }
`;

const Footer = styled.div`
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    display: flex;
    margin-top: 50px;
    
`;



const Card = styled.div`
    align-items: center;
    justify-content: flex-end;
    flex-direction: row;
    display: flex;
    margin-bottom: 10px;
`;


const ShortDescription = styled.p`
    color: #A7AAC6;
    text-align: right;
    font-size: 15px;

    span {
        color: #B4BBFF;
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

export default Survey;