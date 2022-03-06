import React, { useState, useContext } from 'react';
import styled from 'styled-components';


import { Header, Input } from '../../../../Commons';


import '../election/election.css';

import { useNavigate } from 'react-router-dom';
import StoreContext from '../../../../../Stores';

const AddQuestions = (props) => {

    const navigate = useNavigate();

    const { MeetingStore, SurveyStore } = useContext(StoreContext);

    const [question, setQuestion] = useState([]);

    const [firstQuestion, setFirstQuestion] = useState('');

    const [answer1, setAnswer1] = useState('');
    const [answer2, setAnswer2] = useState('');
    const [answer3, setAnswer3] = useState('');
    const [answer4, setAnswer4] = useState('');

    const [min, setMin] = useState('');
    const [max, setMax] = useState('');

    const [isActive, setIsActive] = useState(false);


    const addQuery = () => {
        let newElement = {
            title: firstQuestion,
            hasMultipleAnswers: isActive,
            minAnswersCount: Number(min),
            maxAnswersCount: Number(max),
            surveyQuestionOptions: [
                {
                    title: answer1,
                    rank: 1
                },
                {
                    title: answer2,
                    rank: 2
                },
                {
                    title: answer3,
                    rank: 3
                },
                {
                    title: answer4,
                    rank: 4
                },
            ],
        };


        setQuestion(question => [...question, newElement]);

        resetInfo();
    };


    const resetInfo = () => {
        setFirstQuestion('');
        setAnswer1('');
        setAnswer2('');
        setAnswer3('');
        setAnswer4('');
        setMin('');
        setMax('');
        setIsActive(false);
    };



    const addSurveyOnclick = () => {

        SurveyStore.addElection(question).then(() => {
            navigate('/admin/surveyType');
        });
    };

    return (
        <div className="main">

            <Header backOnclick={() => navigate(-1)} />


            <Info>
                <span>مجمع ها / نظرسنجی / افزودن نظرسنجی</span>
            </Info>


            <SurveyView>
                <span>افزودن پرسش ها</span>
            </SurveyView>

            {question.map((item, i) => {
                return (
                    <Wrap key={i}>
                        <label>{i + 1}- {item.title}</label>

                        <QContainer>
                            <Answer>
                                <label >{item.surveyQuestionOptions[1].title}</label>
                                <Radio type="checkbox" />
                            </Answer>

                            <Answer>
                                <label>{item.surveyQuestionOptions[0].title}</label>
                                <Radio type="checkbox" />
                            </Answer>
                        </QContainer>

                        <QContainer>
                            <Answer>
                                <label>{item.surveyQuestionOptions[3].title}</label>
                                <Radio type="checkbox" />
                            </Answer>

                            <Answer>
                                <label>{item.surveyQuestionOptions[2].title}</label>
                                <Radio type="checkbox" />
                            </Answer>
                        </QContainer>
                    </Wrap>
                )
            })}



            <CardSection>

                <Question
                    value={firstQuestion}
                    onChange={e => setFirstQuestion(e.target.value)}
                    placeholder={'پرسش اول'}
                    type={"text"}
                />
            </CardSection>


            <CardSection>

                <Input
                    value={answer2}
                    onChange={e => setAnswer2(e.target.value)}
                    placeholder={'گزینه دوم'}
                    type={"text"}
                />

                <Input
                    value={answer1}
                    onChange={e => setAnswer1(e.target.value)}
                    placeholder={'گزینه اول'}
                    type={"text"}
                />
            </CardSection>

            <CardSection>

                <Input
                    value={answer4}
                    onChange={e => setAnswer4(e.target.value)}
                    placeholder={'گزینه چهارم'}
                    type={"text"}
                />

                <Input
                    value={answer3}
                    onChange={e => setAnswer3(e.target.value)}
                    placeholder={'گزینه سوم'}
                    type={"text"}
                />
            </CardSection>

            <MainRadio>
                <span>.این پرسش دارای چند پاسخ می‌باشد</span>

                <RadioButton
                    onClick={() => setIsActive(!isActive)}
                    isActive={isActive}
                />

            </MainRadio>

            {isActive ?
                <div className='input'>
                    <Limit
                        value={min}
                        onChange={e => setMin(e.target.value)}
                        placeholder={'حداقل تعداد انتخاب'}
                    />

                    <Limit
                        value={max}
                        onChange={e => setMax(e.target.value)}
                        placeholder={'حداکثر تعداد انتخاب'}
                    />
                </div> : null}

            <Footer>
                <AddQuestion onClick={addQuery}>
                    افزودن و ادامه
                </AddQuestion>

                <Add onClick={addSurveyOnclick}>
                    افزودن نظرسنجی
                </Add>
            </Footer>
        </div>
    );
};


const Limit = styled.input`
    border: 1px solid #7F829F;
    box-sizing: border-box;
    border-radius: 8px;
    background: #232539;
    width: 25%;
    height: 45px;
    text-align: right;
    font-size: 16px;
    padding: 10px;
    margin-left: 16px;
    color: #fff;
`;
const AddQuestion = styled.a`
    border-radius: 8px;
    background: transparent;
    width: 215px;
    height: 48px;
    border: 1px solid #A17BF1;
    justify-content: center;
    align-items: center;
    display: flex;
    color: #A17BF1;
    cursor: pointer;
    margin-top: -16px;
`;

const RadioButton = styled.div`
    width: 20px;
    height: 20px;
    background: ${props => props.isActive ? '#04DA9A' : 'transparent'};
    border: 2px solid #04DA9A;
    border-radius: 100%;
    margin-left: 16px;
`;

const MainRadio = styled.div`
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    display: flex;
    margin-top: 16px;
    margin-bottom: 16px;
`;

const Radio = styled.input`
background-color: red;
margin-left: 10px;
`;


const Answer = styled.div`
    margin-left: 16px;
    margin-top: 10px;
`;


const Wrap = styled.div`
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    align-items: flex-end;
    margin-top: 16px;

    border-bottom: 1px solid #545772;
    /* transform: rotate(180deg); */

    padding-bottom: 20px;
    label {
        color: #DDE0F3;
        font-size: 16px;
    }
`;


const QContainer = styled.div`
    flex-direction: row;
    align-items: center;
    display: flex;
`;


const Question = styled.input`
    border: 1px solid #7F829F;
    box-sizing: border-box;
    border-radius: 8px;
    background: transparent;
    width: 100%;
    height: 48px;
    text-align: right;
    color: #fff;
    padding: 10px;
    margin-left: 16px;
    font-size: 16px;
    font-weight: bold;
`;


const Add = styled.button`
    background: linear-gradient(266.53deg, #7B88FF 1%, #A17BF1 97.53%);
    border-radius: 8px;
    width: 450px;
    height: 48px;

    text-align: center;
    color: #fff;
    font-size: 18px;
    margin-top: 40px;
    cursor: pointer;
`;





const CardSection = styled.div`
    flex-direction: row;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 16px;
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
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    align-self: flex-end;
    display: flex;
    margin-top: 40px;
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


export default AddQuestions;