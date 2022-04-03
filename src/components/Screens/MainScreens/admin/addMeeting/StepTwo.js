import React, { useContext, useEffect, useState } from 'react';


import styled from 'styled-components';


import { Button, DateModal, Header, Input } from '../../../../Commons';

import StoreContext from '../../../../../Stores';

import calander from '../../../../../assets/mainScreens/calender.png';
import clock from '../../../../../assets/mainScreens/clock.png';

import './meeting.css';
import { useNavigate } from 'react-router-dom';

import jalaali from 'jalaali-js';

const StepTwo = (props) => {
    const navigate = useNavigate();

    const { MeetingStore } = useContext(StoreContext);


    const [startDateModal, setStartDateModal] = useState(false);
    const [endDateModal, setEndDateModal] = useState(false);


    const [startDay, setStartDay] = useState(1);
    const [startMonth, setStartMonth] = useState(1);
    const [startYear, setStartYear] = useState(1400);


    const [endDay, setEndDay] = useState(1);
    const [endMonth, setEndMonth] = useState(1);
    const [endYear, setEndYear] = useState(1400);

    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');


    const confirmDateData = () => {
        // 2022-01-25T10:07:36.004Z

        const sDay = Number(startDay);
        const sMonth = Number(startMonth);
        const sYear = Number(startYear);

        const date = jalaali.toGregorian(sYear, sMonth, sDay);


        const dayConverted = date.gd.toString().length == 1 ? '0' + date.gd : date.gd;
        const monthConverted = date.gm.toString().length == 1 ? '0' + date.gm : date.gm;


        const convertedStartDate = `${date.gy}-${monthConverted}-${dayConverted}T${startTime}:36.004Z`;

        const eDay = Number(endDay);
        const eMonth = Number(endMonth);
        const eYear = Number(endYear);

        const endDate = jalaali.toGregorian(eYear, eMonth, eDay);


        const eDayConverted = endDate.gd.toString().length == 1 ? '0' + endDate.gd : endDate.gd;
        const eMonthConverted = endDate.gm.toString().length == 1 ? '0' + endDate.gm : endDate.gm;


        const convertedEndDate = `${endDate.gy}-${eMonthConverted}-${eDayConverted}T${endTime}:36.004Z`;

        MeetingStore.setMeetingDate(convertedStartDate, convertedEndDate);
        navigate('/admin/add/nextstep/finalstep');
    };


    return (
        <div className="main">

            <Header backOnclick={() => navigate(-1)} />


            <Info>
                <span>مجمع ها / افزودن مجمع</span>
            </Info>


            <SurveyView>
                <span>افزودن مجمع <span className="stepOne">| مرحله دوم</span></span>
            </SurveyView>




            <CardSection>
                <View>
                    <Clock
                        type="time" id="appt" name="appt"
                        min="09:00" max="18:00" required
                        onChange={e => setStartTime(e.target.value)}
                        />
                    <span>ساعت شروع</span>
                </View>


                <View onClick={() => setStartDateModal(true)}>
                    <img src={calander} alt="calander" />
                    <span>{`${startYear} / ${startMonth} / ${startDay}`} - تاریخ شروع</span>
                </View>
            </CardSection>


            <CardSection>
                <View>
                    <Clock
                        type="time" id="appt" name="appt"
                        min="09:00" max="18:00" required
                        onChange={e => setEndTime(e.target.value)}
                        />
                    <span>ساعت پایان</span>
                </View>


                <View onClick={() => setEndDateModal(true)}>
                    <img src={calander} alt="calander" />
                    <span>{`${endYear} / ${endMonth} / ${endDay}`} - تاریخ پایان</span>
                </View>
            </CardSection>


            <Footer>
                <Button
                    primary
                    onPress={confirmDateData}
                    title={'تایید و ادامه'} />

            </Footer>


            <DateModal
                title={'تاریخ شروع'}
                modalVisible={startDateModal}
                closeModal={() => setStartDateModal(false)}
                dayOnChange={e => setStartDay(e.target.value)}
                monthOnChange={e => setStartMonth(e.target.value)}
                yearOnChange={e => setStartYear(e.target.value)}
                currentDate={`${startYear} / ${startMonth} / ${startDay}`}
                onClick={() => setStartDateModal(false)}
            />

            <DateModal
                title={'تاریخ پایان'}
                modalVisible={endDateModal}
                closeModal={() => setEndDateModal(false)}
                dayOnChange={e => setEndDay(e.target.value)}
                monthOnChange={e => setEndMonth(e.target.value)}
                yearOnChange={e => setEndYear(e.target.value)}
                currentDate={`${endYear} / ${endMonth} / ${endDay}`}
                onClick={() => setEndDateModal(false)}
            />
        </div>
    );
};


const Clock = styled.input`
    background: transparent;
    direction: rtl;
    text-align: right;
    color: #fff;
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
    padding: 16px;


    img {
        width: 19px;
        height: 19px;
    }

    span {
        color: #A7AAC6;
        font-size: 16px;
    }

    @media(max-width: 768px) {
        width: 100%;
        margin: auto;
        margin-top: 16px;
    }
`;


const CardSection = styled.div`
    flex-direction: row;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 16px;

    @media(max-width: 768px) {
        flex-direction: column;
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