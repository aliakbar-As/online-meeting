import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';


import { Header } from '../../../../Commons';


import '../election/election.css';

import { useNavigate } from 'react-router-dom';
import StoreContext from '../../../../../Stores';

const SurveyQuestionsEdit = (props) => {

    const navigate = useNavigate();

    const { MeetingStore, SurveyStore } = useContext(StoreContext);

    const [question, setQuestion] = useState([]);

    const [firstQuestion, setFirstQuestion] = useState('');

    const [options, setOptions] = useState('');

    const [min, setMin] = useState('');
    const [max, setMax] = useState('');

    const [isActive, setIsActive] = useState(false);

    const [data, setData] = useState({
        surveyId: "",
        surveyQuestions: [],
        surveyStatus: 0,
        surveyTitle: "",
        surveyType: 1,
    });

    useEffect(() => {
        getQuestions();
    }, []);


    const getQuestions = () => {
        SurveyStore.getSurveyQuestions().then(res => {
            setData(res);
        });
    };


    const addQuery = () => {
        let newElement = {
            title: firstQuestion,
            hasMultipleAnswers: isActive,
            minAnswersCount: Number(min),
            maxAnswersCount: Number(max),
            surveyQuestionOptions: options,
        };


        setQuestion(question => [...question, newElement]);

        resetInfo();
    };


    const resetInfo = () => {
        setFirstQuestion('');
        setMin('');
        setMax('');
        setIsActive(false);
    };



    const addSurveyOnclick = () => {
        console.log('options', options)

        return;
        SurveyStore.putSurveyQuestion(question).then(() => {
            navigate('/admin/surveyType');
        });
    };


    const inputOnchange = (e) => {
        let value = e.target.value;
        setOptions(value);
        let id = e.target.id;
        let rank = e.target.name;


        let newElement = {
            id: id,
            isDeleted: false,
            rank: Number(rank),
            title: value,
        }


        console.log('new elemnt', newElement)

    };

    return (
        <div className="main">

            <Header backOnclick={() => navigate(-1)} />


            <Info>
                <span>مجمع ها / نظرسنجی / ویرایش نظرسنجی</span>
            </Info>


            <SurveyView>
                <span>ویرایش پرسش نامه</span>
            </SurveyView>


            {data.surveyQuestions.map(item => (
                <CardSection key={item.id}>

                    <Question
                        onChange={e => setFirstQuestion(e.target.value)}
                        placeholder={item.title}
                        type={"text"}
                    />

                    {item.surveyQuestionOptions.map(data => (
                        <TextInput
                            key={data.id}
                            onChange={e => inputOnchange(e)}
                            id={data.id}
                            name={data.rank}
                            placeholder={data.title}
                            type={"text"}
                        />
                    ))}

                    <MainRadio>
                        <span>.این پرسش دارای چند پاسخ می‌باشد</span>

                        <RadioButton
                            onClick={() => setIsActive(!isActive)}
                            isActive={item.hasMultipleAnswers}
                        />

                    </MainRadio>

                    {item.hasMultipleAnswers ?
                        <div className='input'>
                            <Limit
                                onChange={e => setMin(e.target.value)}
                                placeholder={item.minAnswersCount}
                            />

                            <Limit
                                onChange={e => setMax(e.target.value)}
                                placeholder={item.maxAnswersCount}
                            />
                        </div> : null}
                </CardSection>
            ))}









            <Footer>
                <AddQuestion onClick={addQuery}>
                    افزودن و پرسش
                </AddQuestion>

                <Add onClick={addSurveyOnclick}>
                    افزودن نظرسنجی
                </Add>
            </Footer>
        </div>
    );
};


const TextInput = styled.input`
    width: 90%;
    background: #232539;
/* Gray 2 */

    border: 1px solid #7F829F;
    box-sizing: border-box;
    border-radius: 8px;
    height: 48px;
    justify-content: flex-end;
    align-items: flex-end;
    display: flex;
    text-align: right;
    padding: 10px;
    margin-top: 16px;
    color: #fff;
`;

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
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    margin-top: 16px;
    flex-direction: column;
    border-bottom: 1px solid #545772;
    margin-bottom: 32px;
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


export default SurveyQuestionsEdit;