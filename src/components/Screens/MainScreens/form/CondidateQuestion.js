import React, { useContext, useEffect, useState, useCallback } from 'react';


import user from '../../../../assets/mainScreens/user.png';
import downArrow from '../../../../assets/mainScreens/downArrow.png';
import styled from 'styled-components';

import './form.css';

import StoreContext from '../../../../Stores';
// import moment from 'moment-jalaali';

import backArrow from '../../../../assets/mainScreens/backArrow.png';
import info from '../../../../assets/mainScreens/Information.png';

import { useNavigate } from 'react-router-dom';
import { Button, Header, Loading, ModalComponent } from '../../../Commons';


const CondidateQuestion = (props) => {
    const navigate = useNavigate();
    const { MeetingProfileStore } = useContext(StoreContext);

    const [surveyTitle, setSurveyTitle] = useState('');
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getQuestions();
    }, []);


    const getQuestions = () => {
        setLoading(true);
        MeetingProfileStore.getQuestionSurvey().then(questions => {
            setSurveyTitle(questions.surveyTitle);
            setQuestions(questions.surveyQuestions);
            setLoading(false);
        });
    };



    const handleOnChange = useCallback((e) => {
        const newElement = {
            surveyQuestionId: e.target.name,
            surveyQuestionOptionId: e.target.id,
        };

        if (answers.length === 0) {
            setAnswers(answers => [...answers, newElement]);
            return;
        } else {
            answers.filter(item => {
                if (item.surveyQuestionOptionId === e.target.id) {
                    setAnswers(answers.filter(item => item.surveyQuestionOptionId !== e.target.id));
                } else {
                    setAnswers(answers => [...answers, newElement]);
                };
            });
        };

    },
        []);

    const onConfirmSurvey = () => {
        setLoading(true);
        MeetingProfileStore.addAnswers(answers).then(() => {
            setLoading(false);
            navigate(-1);
        });
    };


    return (
        <div className="main">
            <Header backOnclick={() => navigate(-1)} />

            <Info>
                <span>{surveyTitle}</span>
            </Info>




            <Card>
                {questions.map((item, i) => {
                    return (
                        <CardSection key={i}>
                            <LimitAnswer>
                                <p>می توانید از {item.minAnswersCount} تا {item.maxAnswersCount} جواب را انتخاب کنید</p>

                                <img src={info} alt="information" />
                            </LimitAnswer>

                            <p>{item.title} _ {item.questionRank}</p>

                            {item.surveyQuestionOptions.map((option, i) => (
                                <Answer key={i}>

                                    <label>{option.title} _ {option.rank}</label>

                                    <input
                                        type={item.hasMultipleAnswers ? "checkbox" : "radio"}
                                        id={option.id}
                                        name={item.id}
                                        onChange={handleOnChange}
                                        value={option.title} />

                                </Answer>
                            ))}
                        </CardSection>
                    )
                }
                )}
            </Card>


            <Footer>
                <Exit onClick={() => navigate(-1)}>بازگشت</Exit>

                <Button
                    primary
                    title={'تایید و ارسال'}
                    onPress={onConfirmSurvey}
                />

            </Footer>



            <ModalComponent
                modalVisible={modalVisible}
                closeModal={() => setModalVisible(false)}
                content={'درخواست شما با موفقیت ارسال شد.'}
            />

            {loading ? <Loading /> : null}
        </div>
    );
};


const LimitAnswer = styled.div`
    flex-direction: row;
    align-items: center;
    display: flex;
    justify-content:flex-end;
    p {
        color: #3DFEC4;
        margin-right: 16px;
    }

    img {
        width: 26.67px;
        height: 26.67px;
    }
`;


const Footer = styled.div`
    flex-direction: row;
    align-items: center;
    display: flex;
    justify-content:flex-end;
    margin-top: 20px;
`;


const Exit = styled.div`
    font-size: 16px;
    margin-right: 10px;
    text-align: right;
    text-decoration: underline;
    color: #FF4651;
    cursor: pointer;
`;

const Answer = styled.div`
    flex-direction: row;
    align-items: center;
    display: flex;
    justify-content:flex-end;

    label {
        margin-right: 10px;
    }
`;


const CardSection = styled.div`
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    border-bottom: 1px solid #2F3247;
    width: 100%;
    align-items:flex-end;
    padding-bottom: 16px;
    color: #EBEEFF;
`;

const Card = styled.div`
    background: #545772;
    border-radius: 32px;
    padding: 16px;
    margin-top: 16px;
    align-items: flex-end;
    justify-content: flex-end;
    display: flex;
    flex-direction: column;
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
                color: #97A1FF;
            font-size: 16px;
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

export default CondidateQuestion;