import React, { useState } from 'react';


import user from '../../../../assets/mainScreens/user.png';
import downArrow from '../../../../assets/mainScreens/downArrow.png';
import styled from 'styled-components';

import './form.css';

import { Button } from '../../../../components/Commons';

import backArrow from '../../../../assets/mainScreens/backArrow.png';
import infoIcon from '../../../../assets/mainScreens/info.png';
import survey from '../../../../assets/mainScreens/survey.png';

import clock from '../../../../assets/mainScreens/clock.png';
import calender from '../../../../assets/mainScreens/calender.png';



const Survey = (props) => {

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
                <span>مجمع ها / مجمع تست / نظرسنجی</span>
            </Info>


            <SurveyView>
                <span>نظرسنجی</span>
                <img src={survey} alt="survey" />
            </SurveyView>


            <ShortDescription>
                موضوع نظرسنجی : <span>عنوان نظرسنجی این مجمع</span>
            </ShortDescription>

            <Card>

                <CardSection>
                    <span>تاریخ و ساعت پایان</span>

                    <div>
                        <img src={calender} alt="calender" />

                        <p>1400/08/27</p>
                    </div>

                    <div>
                        <img src={clock} alt="clock" />

                        <p>11:00</p>
                    </div>
                </CardSection>


                <CardSection>
                    <span>تاریخ و ساعت فروش</span>

                    <div>
                        <img src={calender} alt="calender" />

                        <p>1400/08/27</p>
                    </div>

                    <div>
                        <img src={clock} alt="clock" />

                        <p>11:00</p>
                    </div>
                </CardSection>

            </Card>


            <ShortDescription style={{color: '#B592FE'}}>
                در حال حاظر نظرسنجی فعال نمی‌باشد
            </ShortDescription>


            <Describtion>
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است
            </Describtion>

            <Footer>
                <Button
                    onPress={() => console.log('online meeting')}
                    title={'مشاهده آنلاین'} />

                <Button
                    primary
                    onPress={() => console.log('کاندید می‌شوم')}
                    title={'رای میدهم'} />

            </Footer>
        </div>
    );
};

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


const Tab = styled.div`
    width: 28.3%;   
    cursor: pointer;
    text-align: center;
    padding: 10px;
`;


const TabContainer = styled.div`
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    width: 85%;
    display: flex;
    /* background-color: red; */
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


export default Survey;