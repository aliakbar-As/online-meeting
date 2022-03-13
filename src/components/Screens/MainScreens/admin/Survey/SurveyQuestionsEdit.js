import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';


import { Header } from '../../../../Commons';


import '../election/election.css';

import { useNavigate } from 'react-router-dom';
import StoreContext from '../../../../../Stores';


import deleteIcon from '../../../../../assets/mainScreens/deleteIcon.svg';


const SurveyQuestionsEdit = (props) => {

    const navigate = useNavigate();

    const { MeetingStore, SurveyStore } = useContext(StoreContext);

    const [questionEdited, setQuestionEdited] = useState([]);
    const [questions, setQuestions] = useState([]);

    const [firstQuestion, setFirstQuestion] = useState('');

    const [options, setOptions] = useState('');

    const [min, setMin] = useState('');
    const [max, setMax] = useState('');

    const [isActive, setIsActive] = useState(false);

    const [finalOption, setFinalOption] = useState([]);
    const [finalQuestion, setFinalQuestion] = useState([]);

    const [optionIdSelected, setOptionIdSelected] = useState(100);

    useEffect(() => {
        getQuestions();
    }, []);


    const getQuestions = () => {
        SurveyStore.getSurveyQuestions().then(res => {
            setQuestions(res.surveyQuestions);
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


        setQuestionEdited(questionEdited => [...questionEdited, newElement]);

        resetInfo();
    };


    const resetInfo = () => {
        setFirstQuestion('');
        setMin('');
        setMax('');
        setIsActive(false);
    };




    const deleteOnclick = (id) => {
        setQuestions(questions.filter(item => item.id !== id));
    };

    const deleteOptionOnclick = (id, index) => {
        let options = questions.map(item => item.surveyQuestionOptions)[index];
        let optionFiltered = options.filter(item => item.id != id);

        console.log('filtered', optionFiltered)

        let newElement = {

        };
        setQuestions(questions => [...questions, newElement]);
    };


    const confirmEditQuestion = (e,item) => {

        let newElement = {
            id: item.id,
            surveyId: item.surveyId,
            rank: item.questionRank,
            title: e.target.value,
            hasMultipleAnswers: item.hasMultipleAnswers,
            minAnswersCount: item.minAnswersCount,
            maxAnswersCount: item.maxAnswersCount,
            isDeleted: false,
            surveyQuestionOptions: item.surveyQuestionOptions,
        };


        setFinalQuestion(finalQuestion => [...finalQuestion, newElement]);
        setFirstQuestion('');
        setOptionIdSelected(100);
    };


    const confirmEditOption = (e, item, rank) => {


        let newElement = {
            id: item.id,
            title: e.target.value,
            rank: Number(rank),
            isDeleted: false,
            surveyQuestionId: item.surveyQuestionId
        };


        setFinalOption(finalOption => [...finalOption, newElement]);

        setOptionIdSelected(100);
    };



    const updateSurveyOnclick = () => {
        console.log('questions', finalQuestion)
        console.log('options', finalOption)
        let optionFiltered = [];
        let questionFiltered = [];

        questions.map(item => {
            finalOption.map(data => {
                if (item.id === data.surveyQuestionId) {
                    optionFiltered.push(data);

                    let newElement = {
                        id: item.id,
                        surveyId: item.surveyId,
                        rank: item.questionRank,
                        title: item.title,
                        hasMultipleAnswers: item.hasMultipleAnswers,
                        minAnswersCount: item.minAnswersCount,
                        maxAnswersCount: item.maxAnswersCount,
                        isDeleted: false,
                        surveyQuestionOptions: optionFiltered,
                    };

                    questionFiltered.push(newElement);
                };
            });
        });

        let mergedQuestions = [...questionFiltered, ...finalQuestion];

        SurveyStore.putSurveyQuestion(mergedQuestions).then(() => {
            // navigate('/admin/surveyType');
        });
    };

    const handleBlur = (e) => {
        console.log('blur event', e.target.value)
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


            {questions.map((item, i) => (
                <CardSection key={item.id}>

                    <Item>
                        <QuestionOpration>
                            <img src={deleteIcon} alt='' onClick={() => deleteOnclick(item.id)} />
                        </QuestionOpration>

                        <Question
                            // onChange={e => setFirstQuestion(e.target.value)}
                            placeholder={item.title}
                            type={"text"}
                            // value={item.title}
                            onBlur={e => confirmEditQuestion(e,item)}
                        />
                    </Item>

                    {item.surveyQuestionOptions.map(data => (
                        <Item key={data.id}>

                            <QuestionOpration>
                                <img src={deleteIcon} alt='' onClick={() => deleteOptionOnclick(data.id, i)} />
                            </QuestionOpration>

                            <TextInput
                                // onChange={e => setOptions(e.target.value)}
                                id={data.id}
                                name={data.rank}
                                placeholder={data.title}
                                type={"text"}
                                // value={data.title}
                                onBlur={e => confirmEditOption(e, item, i + 1)}
                                valueLink={item.title}
                            />
                        </Item>
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

                <Add onClick={updateSurveyOnclick}>
                    افزودن نظرسنجی
                </Add>
            </Footer>
        </div>
    );
};

const QuestionOpration = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    color: #59A800;

    img {
        margin-right: 10px;
    }

    span {
        cursor: pointer;
    }
`;

const Item = styled.div`
    
    width: 100%;
    display: flex;
    justify-content: space-between;

    img {
        cursor: pointer;
    }
`;

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


const Question = styled.input`
    border: 1px solid #7F829F;
    box-sizing: border-box;
    border-radius: 8px;
    background: transparent;
    width: 95%;
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