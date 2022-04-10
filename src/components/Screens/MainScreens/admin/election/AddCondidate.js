import React, { useState, useRef, useEffect, useContext } from 'react';
import styled from 'styled-components';


import { Loading, Header, ModalComponent } from '../../../../Commons';


import './election.css';

import { useNavigate } from 'react-router-dom';
import StoreContext from '../../../../../Stores';
import useWindowDimensions from '../../../../../Utils/Dimension';

import addQuestion from '../../../../../assets/mainScreens/addQuestion.svg';

const AddCondidate = (props) => {
    const navigate = useNavigate();
    const { width } = useWindowDimensions();

    const { SurveyStore } = useContext(StoreContext);

    const [question, setQuestion] = useState('');
    const [min, setMin] = useState('');
    const [max, setMax] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [loading, setLoading] = useState(false);

    const [answer, setAnswer] = useState([]);
    const [condidate, setCondidate] = useState('');
    const [finalOption, setFinalOption] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);

    const addSurveyOnclick = () => {

        if(question === '' || answer.length === 0) {
            alert('لطفا موارد ضروری را پر کنید');
            return;
        };

        setLoading(true);

        SurveyStore.setActive(isActive);

        let item = {
            title: question,
            hasMultipleAnswers: isActive === 'true' ? true : false,
            minAnswersCount: Number(min),
            maxAnswersCount: Number(max),
            surveyQuestionOptions: finalOption,
        };


        SurveyStore.addElection([item]).then(isSuccess => {
            if (isSuccess) {

                setTimeout(() => {
                    setModalVisible(true);
                }, 2000);

                if (width < 768) {
                    navigate('/admin');
                } else {
                    navigate('/admin/surveyType');
                }
                setLoading(false);
            };

        });
    };

    const addOptionOnclick = () => {

        const newElements = {
            title: condidate,
            rank: answer.length + 1,
        };

        setAnswer(answer => [...answer, newElements]);

    };

    const confirmEditOption = (rank) => {
        let rankNumber = Number(rank);

        let newElement = {
            title: condidate,
            rank: rankNumber,
        };

        if (finalOption.length === 0) {
            setFinalOption(finalOption => [...finalOption, newElement]);
            return
        };

        finalOption.filter(item => {
            if (item.rank === rankNumber) {
                let newArr = [...finalOption];
                newArr[rankNumber - 1] = newElement;

                setFinalOption(newArr);
            } else {
                setFinalOption(finalOption => [...finalOption, newElement]);
            }
        })
    };

    return (
        <div className="main">
            <Header backOnclick={() => navigate(-1)} />
            <Info>
                <span>مجمع ها / انتخابات / افزودن انتخاب</span>
            </Info>


            <SurveyView>
                <span>افزودن نامزدها</span>
            </SurveyView>


            <ElectionQuestion
                value={question}
                onChange={e => setQuestion(e.target.value)}
                placeholder={'پرسش انتخابات'}
            />
            {answer.map((item, index) => {
                return (
                    <View key={index}>
                        <TextInput
                            onChange={e => setCondidate(e.target.value)}
                            placeholder={`نامزد ${index + 1}`}
                            onBlur={() => confirmEditOption(index + 1)}
                        />
                    </View>
                )
            })}


            <AddImage>
                <img onClick={addOptionOnclick} src={addQuestion} alt="" />
            </AddImage>


            <Radio>
                <span>.این پرسش دارای چند پاسخ می‌باشد</span>

                <RadioButton
                    type="radio"
                    id="html"
                    name="fav_language"
                    value={true}
                    onChange={e => setIsActive(e.target.value)}
                />
            </Radio>

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
                <Add onClick={addSurveyOnclick}>افزودن انتخابات</Add>
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

const RadioButton = styled.input`
    width: 20px;
    height: 20px;
    background: transparent;
`;

const Radio = styled.div`
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    display: flex;
    margin-top: 16px;
`;


const TextInput = styled.input`
    border: 1px solid #7F829F;
    box-sizing: border-box;
    border-radius: 8px;
    background: #232539;
    width: 48%;
    height: 45px;
    text-align: right;
    font-size: 16px;
    padding: 10px;
    color: #fff;

    @media(max-width: 768px) {
        width: 100%;
        margin-top: 16px;
    }
`;

const View = styled.div`
    align-items: center;
    justify-content: space-between;
    display: flex;
    margin-top: 16px;
    
    @media(max-width: 768px) {
        width: 100%;
        flex-direction: column;
        margin-top: 0;
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
export default AddCondidate;