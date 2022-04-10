import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import './form.css';

import { Button, ModalComponent } from '../../../../components/Commons';
import StoreContext from '../../../../Stores';

import survey from '../../../../assets/mainScreens/condidate.png';

import clock from '../../../../assets/mainScreens/clock.png';
import calender from '../../../../assets/mainScreens/calender.png';
import moment from 'moment-jalaali';

import { useNavigate } from 'react-router-dom';

const Candidate = (props) => {
    const navigate = useNavigate();
    const { MeetingProfileStore } = useContext(StoreContext);

    const [modalVisible, setModalVisible] = useState(0);

    const getQuestionSurvey = () => {
        MeetingProfileStore.setSurveyId(props.data.surveyId);
        navigate('/form/info/election/SurveyQuestion');
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
        <div>


            <SurveyView>
                <span>انتخابات</span>
                <img src={survey} alt="survey" />
            </SurveyView>


            <ShortDescription> موضوع کاندید : <span>{props.data.title}</span></ShortDescription>

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
                {props.data.surveyStatus === 1 ?
                    'در حال حاظر انتخابات ایجاد شده است'
                    :
                    props.data.surveyStatus === 2 ?
                        'انتخابات در حال برگزاری می‌باشد'
                        :
                        'در حال حاظر انتخابات به پایان رسید'}


            </ShortDescription>


            <Describtion>
                {props.data.description}
            </Describtion>

            <Footer>
                <Online>مشاهده آنلاین</Online>

                <SurveyOnclick onClick={onTakeSurvey}>شرکت در انتخابات</SurveyOnclick>

            </Footer>

            <ModalComponent
                modalVisible={modalVisible !== 0}
                closeModal={() => setModalVisible(0)}
                hasError={modalVisible === 2}
                alert={modalVisible === 1}
                okOnclick={() => getQuestionSurvey()}
                cancelOnclick={() => setModalVisible(0)}
                content={modalVisible === 1 ? 'آیا در انتخابات شرکت می‌کنید؟' : 'شما قبلا در این انتخابات شرکت کرده اید'}
            />
        </div>
    );
};


const SurveyOnclick = styled.a`
width: 215px;
    height: 48px;
    
    border: 1px solid transparent;

    background: linear-gradient(266.53deg, #7B88FF 1%, #A17BF1 97.53%);
    border-radius: 8px;


    text-align: center;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
    font-weight: bold;
    margin-left: 10px;
    display: flex;
    &:hover {
        opacity: 1;
        transition: opacity 0.2s ease 0s;
    }

    @media(max-width: 768px) {
        margin-left: 0;
        width: 100%;
        margin-top: 5%;
    }
`;

const Online = styled.button`
    border-radius: 8px;
    border: 1px solid #7B88FF;
    background-color: transparent;

    color: #A87EFF;
    font-size: 20px;
    height: 48px;
    width: 40%;
    cursor: pointer;

    @media(max-width: 768px) {
        width: 100%;
    }
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

    @media(max-width: 768px) {
        width:  100%;
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
    border-bottom: 1px solid #545772;
    padding-bottom: 30px;

    @media(max-width: 768px) {
        flex-direction: column;
    }
`;


const Back = styled.img`
    width: 48px;
    height: 48px;
    align-self: flex-end;
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



export default Candidate;