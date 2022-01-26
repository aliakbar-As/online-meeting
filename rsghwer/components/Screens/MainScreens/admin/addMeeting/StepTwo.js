import React, { useState } from 'react';


import styled from 'styled-components';


import { Button, Header, Input } from '../../../../Commons';



import calander from '../../../../../assets/mainScreens/calender.png';
import clock from '../../../../../assets/mainScreens/clock.png';

import './meeting.css';
import { useNavigate } from 'react-router-dom';

const StepTwo = (props) => {
    const navigate = useNavigate();


    return (
        <div className="main">

            <Header />


            <Info>
                <span>مجمع ها / افزودن مجمع</span>
            </Info>


            <SurveyView>
                <span>افزودن مجمع <span className="stepOne">| مرحله دوم</span></span>
            </SurveyView>




            <CardSection>
                <View>
                    <img src={calander} alt="calander" />
                    <span>تاریخ پایان</span>
                </View>


                <View>
                    <img src={calander} alt="calander" />
                    <span>تاریخ شروع</span>
                </View>
            </CardSection>


            <CardSection>
                <View>
                    <img src={clock} alt="calander" />
                    <span>ساعت پایان</span>
                </View>


                <View>
                    <img src={clock} alt="calander" />
                    <span>ساعت شروع</span>
                </View>
            </CardSection>


            <Footer>
                <Button
                    primary
                    onPress={() => navigate('/admin/add/nextstep/finalstep')}
                    title={'تایید و ادامه'} />

            </Footer>
        </div>
    );
};


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
    padding: 16px;


    img {
        width: 19px;
        height: 19px;
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
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    display: flex;
    margin-top: 50px;
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



export default StepTwo;