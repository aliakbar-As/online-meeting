import React, { useState, useRef, useEffect, useContext } from 'react';
import styled from 'styled-components';


import { DateModal, Header, Input, Loading, ModalComponent } from '../../../../Commons';


import './election.css';

import { useNavigate } from 'react-router-dom';
import StoreContext from '../../../../../Stores';

import addQuestion from '../../../../../assets/mainScreens/addQuestion.svg';
import deleteIcon from '../../../../../assets/mainScreens/deleteIcon.svg';
import useWindowDimensions from '../../../../../Utils/Dimension';

const ElectionCondidateEdit = (props) => {
    const navigate = useNavigate();
    const { width } = useWindowDimensions();

    const { MeetingStore, SurveyStore } = useContext(StoreContext);

    const [questionResult, setQuestionResult] = useState({
        surveyId: '',
        questionId: '',
        questionTitle: '',
        hasMultipleAnswers: false,
        minAnswersCount: 0,
        maxAnswersCount: 0,
        options: []
    });

    const [question, setQuestion] = useState('');
    const [option, setOption] = useState('');
    const [answer, setAnswer] = useState([]);

    const [min, setMin] = useState('');
    const [max, setMax] = useState('');
    const [isActive, setIsActive] = useState(false);


    const [showInput, setShowInput] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const [finalOption, setFinalOption] = useState([]);


    useEffect(() => {

        getQuestions();
    }, []);



    const getQuestions = () => {
        SurveyStore.getSurveyQuestions().then(res => {
            let item = {
                surveyId: res.surveyId,
                questionId: res.surveyQuestions[0].id,
                questionTitle: res.surveyQuestions[0].title,
                hasMultipleAnswers: res.surveyQuestions[0].hasMultipleAnswers,
                minAnswersCount: res.surveyQuestions[0].minAnswersCount,
                maxAnswersCount: res.surveyQuestions[0].maxAnswersCount,
                options: res.surveyQuestions[0].surveyQuestionOptions
            };
            setQuestionResult(item);
            setQuestion(res.surveyQuestions[0].title);
            setIsActive(res.surveyQuestions[0].hasMultipleAnswers);
            setMin(res.surveyQuestions[0].minAnswersCount);
            setMax(res.surveyQuestions[0].maxAnswersCount);

            setAnswer(res.surveyQuestions[0].surveyQuestionOptions);

        });
    };


    const addSurveyOnclick = () => {
        setLoading(true);

        let newItem = {
            id: questionResult.questionId,
            surveyId: questionResult.surveyId,
            rank: 1,
            title: question,
            hasMultipleAnswers: isActive,
            minAnswersCount: Number(min),
            maxAnswersCount: Number(max),
            isDeleted: false,
            surveyQuestionOptions: finalOption,
        };


        SurveyStore.putSurveyQuestion([newItem]).then(isSuccess => {
            if (isSuccess) {

                setTimeout(() => {
                    setModalVisible(true);
                }, 2000);

                if (width < 768) {
                    navigate('/admin');
                } else {
                    navigate('/admin/surveyType');
                };
                
                setLoading(false);
            };

        });
    };

    const confirmEditOption = (id, rank) => {

        let newElement = {
            id: id,
            title: option,
            rank: Number(rank),
            isDeleted: false,
        };


        setFinalOption(finalOption => [...finalOption, newElement]);



        setShowInput(false)
    };


    const deleteItem = (data) => {
        let finalArray = answer.filter(item => item.title !== data.title);
        setAnswer(finalArray);


        let newElement = {
            id: data.id,
            title: data.title,
            rank: Number(data.rank),
            isDeleted: true,
        };

        setFinalOption(finalOption => [...finalOption, newElement]);

    };

    const addOptionOnclick = () => {

        const newElements = {
            id: undefined,
            title: option,
            rank: answer.length + 1,
            isDeleted: false,
        };

        setAnswer(answer => [...answer, newElements]);

    };

    return (
        <div className="main">
            <Header backOnclick={() => navigate(-1)} />
            <Info>
                <span>مجمع ها / انتخابات / ویرایش انتخابات</span>
            </Info>


            <SurveyView>
                <span>ویرایش نامزدها</span>
            </SurveyView>


            <ElectionQuestion
                value={question}
                onChange={e => setQuestion(e.target.value)}
                placeholder={'پرسش انتخابات'}
            />

            {answer.map((item, i) => {
                return (
                    <Main key={i}>
                        <img src={deleteIcon} alt='' onClick={() => deleteItem(item)} />

                        <View key={item.id}>
                            <TextInput
                                onBlur={() => confirmEditOption(item.id, i + 1)}
                                onChange={e => setOption(e.target.value)}
                                placeholder={item.title}
                                name={item.title}
                                id={item.id}
                                type="text"
                            />

                        </View>
                    </Main>
                )
            })}

            <AddImage>
                <img onClick={addOptionOnclick} src={addQuestion} alt="" />
            </AddImage>

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
                <Add onClick={addSurveyOnclick}>
                    ثبت تغییرات
                </Add>
            </Footer>

            <ModalComponent
                hasError={false}
                modalVisible={modalVisible}
                closeModal={() => setModalVisible(false)}
                content={'.انتخابات با موفقیت ثبت شد'}
            />

            {loading ? <Loading /> : null}
        </div>
    )
}

const AddImage = styled.div`
    justify-content: flex-end;
    align-items: flex-end;
    display: flex;
    margin-top: 20px;

    img {
        width: 48px;
        height: 48px;
    }
`;


const Main = styled.div`
    align-items: center;
    display: flex;
    justify-content: flex-end;
    width: 100%;
    flex-direction: row;

    span {
        color: red;
        margin-top: 10px;
        margin-bottom: 5px;
        cursor: pointer;
    }

    img {
        margin-top: 16px;
        margin-right: 10px;
    }
`;

const OptionView = styled.div`
    border: 1px solid #7F829F;
    box-sizing: border-box;
    border-radius: 8px;
    background: #232539;
    width: 100%;
    height: 45px;
    text-align: right;
    font-size: 16px;
    padding: 10px;
    color: #fff;
    align-items: flex-end;
    display: flex;
    margin-top: 16px;
    justify-content: space-between;
    align-self: flex-end;

    span {
        font-size: 14px;
        color: #23A9F2;
        cursor: pointer;
    }
`;


const Add = styled.button`
    background: linear-gradient(266.53deg, #7B88FF 1%, #A17BF1 97.53%);
    border-radius: 8px;
    width: 450px;
    height: 48px;

    text-align: center;
    color: #fff;
    font-size: 18px;
    margin-top: 16px;
    cursor: pointer;
`;

const Footer = styled.div`
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    display: flex;
    margin-top: 10px;
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

const TextInput = styled.input`
    border: 0;
    background: #232539;
    width: 100%;
    height: 40px;
    text-align: right;
    font-size: 16px;
    color: #fff;
    
    #inputID::placeholder {
    color: #fff;
    opacity: 1;
}

`;

const View = styled.div`
    border: 1px solid #7F829F;
    box-sizing: border-box;
    border-radius: 8px;
    background: #232539;
    width: 95%;
    height: 45px;
    align-items: center;
    justify-content: space-between;
    display: flex;
    margin-top: 16px;
    padding: 10px;

    span {
        color: #5CAB00;
        font-size: 18px;
        cursor: pointer;
    }
`;


const ElectionQuestion = styled.input`
    width: 100%;
    height: 45px;
    border: 1px solid #7F829F;
    box-sizing: border-box;
    border-radius: 8px;
    background: #232539;
    text-align: right;
    padding: 10px;
    margin-top: 16px;
    font-size: 16px;
    color: #fff;
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
export default ElectionCondidateEdit;