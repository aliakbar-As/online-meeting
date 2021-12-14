import React, { useState, useRef } from 'react';
import styled from 'styled-components';


import { Button, Input } from '../../../../Commons';


import backArrow from '../../../../../assets/mainScreens/backArrow.png';
import user from '../../../../../assets/mainScreens/user.png';
import downArrow from '../../../../../assets/mainScreens/downArrow.png';

import '../election/election.css';

import { useNavigate } from 'react-router-dom';

const AddQuestion = (props) => {

    const navigate = useNavigate();

    const bool = useRef(null);

    const [companyCode, setCompanyCode] = useState('');

    return (
        <div className="main">

            <TopView onClick={() => console.log('user')}>
                <IconsDiv>
                    <UserIcon src={user} alt="user" />

                    <ArrowIcon src={downArrow} alt="downArrow" />
                </IconsDiv>

                <Back src={backArrow} alt="backArrow" />
            </TopView>


            <Info>
                <span>مجمع ها / نظرسنجی / افزودن نظرسنجی</span>
            </Info>


            <SurveyView>
                <span>افزودن پرسش ها</span>
            </SurveyView>


            <Wrap>
                <label>1- متن پرسش اول؟</label>

                <QContainer>
                    <Answer>
                        <label for="contactChoice1">گزینه دوم</label>
                        <Radio type="checkbox" />
                    </Answer>

                    <Answer>
                        <label for="contactChoice1">گزینه اول</label>
                        <Radio type="checkbox" />
                    </Answer>
                </QContainer>

                <QContainer>
                    <Answer>
                        <label for="contactChoice1">گزینه چهارم</label>
                        <Radio type="checkbox" />
                    </Answer>

                    <Answer>
                        <label for="contactChoice1">گزینه سوم</label>
                        <Radio type="checkbox" />
                    </Answer>
                </QContainer>
            </Wrap>


            <CardSection>

                <Question
                    value={companyCode}
                    onChange={e => setCompanyCode(e.target.value)}
                    placeholder={'پرسش اول'}
                    type={"text"}
                />
            </CardSection>


            <CardSection>

                <Input
                    value={companyCode}
                    onChange={e => setCompanyCode(e.target.value)}
                    placeholder={'گزینه دوم'}
                    type={"text"}
                />

                <Input
                    value={companyCode}
                    onChange={e => setCompanyCode(e.target.value)}
                    placeholder={'گزینه اول'}
                    type={"text"}
                />
            </CardSection>

            <CardSection>

                <Input
                    value={companyCode}
                    onChange={e => setCompanyCode(e.target.value)}
                    placeholder={'گزینه چهارم'}
                    type={"text"}
                />

                <Input
                    value={companyCode}
                    onChange={e => setCompanyCode(e.target.value)}
                    placeholder={'گزینه سوم'}
                    type={"text"}
                />
            </CardSection>


            <Footer>
                <Button
                    title={'افزودن و ادامه'}
                    onPress={() => navigate('/admin/survey/add/question/more')}
                />

                <Add onClick={() => navigate('/admin/survey/add')}>
                    افزودن انتخابات
                </Add>
            </Footer>
        </div>
    );
};


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
    background: #545772;
    border-radius: 8px;
    width: 69%;
    height: 48px;
    text-align: right;
    color: #fff;
    padding: 10px;
    border: 0px;
    margin-left: 16px;
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


const SelectView = styled.div`
    flex-direction: row;
    display: flex;
    height: 48px;
    width: 450px;
    background: #545772;
    border-radius: 8px;
    margin-left: 16px;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    cursor: pointer;

    img {
        width: 48px;
        height: 48px;
        cursor: pointer;
    }

    span {
        color: #A7AAC6;
        font-size: 16px;
    }
`;

const View = styled.div`
    flex-direction: row;
    display: flex;
    height: 48px;
    width: 450px;
    background: #545772;
    border-radius: 8px;
    margin-left: 16px;
    justify-content: space-between;
    align-items: center;
    padding-right: 16px;
cursor: pointer;

    img {
        width: 48px;
        height: 48px;
        cursor: pointer;
    }

    span {
        color: #A7AAC6;
        font-size: 16px;
    }
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
    margin-top: 10px;
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


export default AddQuestion;