import React, { useContext, useEffect, useState } from 'react';


import styled from 'styled-components';


import { Button, DateModal, Header, Input, Loading } from '../../../Commons';

import StoreContext from '../../../../Stores';

import calander from '../../../../assets/mainScreens/calender.png';
import clock from '../../../../assets/mainScreens/clock.png';

import './addMeeting/meeting.css';
import { useNavigate } from 'react-router-dom';

import jalaali from 'jalaali-js';
import moment from 'moment-jalaali';

const EditMeetingDate = (props) => {
    const navigate = useNavigate();

    const { MeetingStore, MeetingProfileStore } = useContext(StoreContext);


    const [startDateModal, setStartDateModal] = useState(false);
    const [endDateModal, setEndDateModal] = useState(false);
    const [loading, setLoading] = useState(false);


    const [startDay, setStartDay] = useState(1);
    const [startMonth, setStartMonth] = useState(1);
    const [startYear, setStartYear] = useState(1400);


    const [endDay, setEndDay] = useState(1);
    const [endMonth, setEndMonth] = useState(1);
    const [endYear, setEndYear] = useState(1400);

    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [id, setId] = useState('');


    useEffect(() => {
        getMeetingDates();
    }, []);

    const getMeetingDates = () => {
        MeetingProfileStore.getMeetingDate().then(res => {
            setId(res.id);
            setTimeDufault(res);
        });
    };

    const setTimeDufault = (res) => {
        let startDate = moment(res.holdingDatetime).format('jYYYY/jMM/jDD');
        let startTime = moment(res.holdingDatetime).format('HH:mm');
        let startDateConverted = startDate.split('/');
        setStartDay(startDateConverted[2]);
        setStartMonth(startDateConverted[1]);
        setStartYear(startDateConverted[0]);

        let endDate = moment(res.endDatetime).format('jYYYY/jMM/jDD');
        let endTime = moment(res.endDatetime).format('HH:mm');
        let endDateConverted = endDate.split('/');
        setEndDay(endDateConverted[2]);
        setEndMonth(endDateConverted[1]);
        setEndYear(endDateConverted[0]);

        setStartTime(startTime);
        setEndTime(endTime);
    };


    const confirmDateData = () => {
        setLoading(true);

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

        MeetingStore.UpdateMeetingId(id, convertedStartDate, convertedEndDate).then(() => {
            MeetingProfileStore.getMeetingDetails().then(() => {
                navigate(-2);
                setLoading(false);
            });
        });
    };


    return (
        <div className="main">

            <Header backOnclick={() => navigate(-1)} />


            <Info>
                <span>مجمع ها / ویرایش مجمع</span>
            </Info>


            <SurveyView>
                <span>ویرایش مجمع <span className="stepOne">| مرحله دوم</span></span>
            </SurveyView>




            <CardSection>
                <View>
                    <Clock
                        type="time" id="appt" name="appt"
                        min="09:00" max="18:00" required
                        value={startTime}
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
                        value={endTime}
                        onChange={e => {
                            console.log('e', e.target.value)
                            setEndTime(e.target.value)
                        }}
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
                    title={'تایید و ثبت'} />

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

            {loading ? <Loading /> : null}
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
        margin-left: 0;
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
        margin-top: 0;
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



export default EditMeetingDate;