import React, { useState, useRef, useEffect, useContext } from 'react';
import styled from 'styled-components';


import { DateModal, Header } from '../../../../Commons';


import upload from '../../../../../assets/mainScreens/upload.png';
import calander from '../../../../../assets/mainScreens/calender.png';
import close from '../../../../../assets/mainScreens/close.svg';

import './election.css';

import { useNavigate } from 'react-router-dom';
import StoreContext from '../../../../../Stores';
import jalaali from 'jalaali-js';

const AddElection = (props) => {
    const infoFileRef = useRef(null);

    const navigate = useNavigate();

    const { MeetingStore, SurveyStore } = useContext(StoreContext);


    const [companyCode, setCompanyCode] = useState('');
    const [description, setDescription] = useState('');
    const [meetingId, setMeetingId] = useState('');

    const [meetingList, setMeetingList] = useState([]);


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

    const [files, setFiles] = useState([]);

    useEffect(() => {
        getMeetingList();
    }, []);


    const getMeetingList = () => {
        MeetingStore.getMeetingList().then(res => {
            setMeetingList(res);
        });
    };



    const confirmInfo = () => {
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


        SurveyStore.setData(meetingId, 2, companyCode, 1, convertedStartDate, convertedEndDate, description);

        
        navigate('/admin/election/add/addCondidate');
    };



    const deleteIcon = (name, id) => {
        setFiles(files.filter(item => item.name !== name));

    };

    const uploadFiles = () => {
        var formData = new FormData();
        files.map(item => formData.append('files', item));

        MeetingStore.uploadFiles(1, formData).then(files => {
            SurveyStore.surveyFiles(files);
        });

        confirmInfo();
    };

    return (
        <div className="main">

            <Header backOnclick={() => navigate(-1)} />

            <Info>
                <span>مجمع ها / انتخابات / افزودن انتخاب</span>
            </Info>


            <SurveyView>
                <span>افزودن انتخابات</span>
            </SurveyView>





            <CardSection>
                <Select
                    onChange={e => setMeetingId(e.target.value)}
                    value={meetingId}>
                    <option value=''>نام مجمع</option>
                    {meetingList.map((item, index) => (
                        <option key={index} value={item.meetingId}>{item.meetingTitle}</option>
                    ))}
                </Select>


                <Input
                    value={companyCode}
                    onChange={e => setCompanyCode(e.target.value)}
                    placeholder={'موضوع اننتخابات'}
                    type={"text"}
                />
            </CardSection>



            <DateContainer>

                <ClockView>
                    <Clock
                        type="time" id="appt" name="appt"
                        min="09:00" max="18:00" required
                        onChange={e => setEndTime(e.target.value)}
                    />
                    <span>ساعت پایان</span>
                </ClockView>

                <Date onClick={() => setEndDateModal(true)}>
                    <img src={calander} alt="calander" />
                    <span>{`${endYear} / ${endMonth} / ${endDay}`} - تاریخ پایان</span>
                </Date>

                <ClockView>
                    <Clock
                        type="time" id="appt" name="appt"
                        min="09:00" max="18:00" required
                        onChange={e => setStartTime(e.target.value)}
                    />
                    <span>ساعت شروع</span>
                </ClockView>

                <Date onClick={() => setStartDateModal(true)}>
                    <img src={calander} alt="calander" />
                    <span>{`${startYear} / ${startMonth} / ${startDay}`} - تاریخ شروع</span>
                </Date>
            </DateContainer>


            <CardSection>
                <View>


                    {files.length === 0 ?
                        <input
                            type={'file'}
                            onChange={e => setFiles(files => [...files, e.target.files[0]])}
                            hidden
                            ref={infoFileRef}
                        />
                        :
                        <>
                            {files.map((item, i) => (
                                <input
                                    key={i}
                                    type={'file'}
                                    onChange={e => setFiles(files => [...files, e.target.files[0]])}
                                    hidden
                                    ref={infoFileRef}
                                />
                            ))}
                        </>
                    }

                    <img onClick={() => infoFileRef.current.click()} src={upload} alt="upload" />

                    {files.length === 0 ? <h5 style={{ color: '#7F829F' }}>بارگزاری فایل</h5> : null}

                    {files.map((item, i) => {
                        return (
                            <Files key={i}>
                                <img onClick={() => deleteIcon(item.name, 0)} src={close} alt='close' />

                                <span>{files.length === 0 ? 'بارگزاری فایل اکسل' : item.name}</span>
                            </Files>
                        )
                    })}
                </View>
            </CardSection>


            <CardSection>

                <TextInput
                    placeholder={'...توضیحات'}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
            </CardSection>

            <Footer>
                <Add onClick={uploadFiles}>
                    تایید و ادامه
                </Add>

            </Footer>


            <DateModal
                title={'تاریخ شروع'}
                modalVisible={startDateModal}
                closeModal={() => setStartDateModal(false)}
                onClick={() => setStartDateModal(false)}
                dayOnChange={e => setStartDay(e.target.value)}
                monthOnChange={e => setStartMonth(e.target.value)}
                yearOnChange={e => setStartYear(e.target.value)}
                currentDate={`${startYear} / ${startMonth} / ${startDay}`}
            />

            <DateModal
                title={'تاریخ پایان'}
                modalVisible={endDateModal}
                closeModal={() => setEndDateModal(false)}
                onClick={() => setEndDateModal(false)}
                dayOnChange={e => setEndDay(e.target.value)}
                monthOnChange={e => setEndMonth(e.target.value)}
                yearOnChange={e => setEndYear(e.target.value)}
                currentDate={`${endYear} / ${endMonth} / ${endDay}`}
            />
        </div>
    );
};


const Input = styled.input`
    background: transparent;
    border-radius: 8px;
    width: 450px;
    height: 48px;
    text-align: right;
    color: #fff;
    padding: 10px;
    border: 0px;
    margin-left: 16px;
    border: 1px solid #7F829F;
    box-sizing: border-box;
    font-size: 18px;
    margin-top: 10px;

    @media(max-width: 768px) {
        width: 100%;
        margin-left: 0;
    }
`;

const Select = styled.select`
    background: transparent;
    color: #7F829F;
    font-size: 16px;
    width: 450px;
    border-radius: 8px;
    flex-direction: row-reverse;
    padding: 5px;
    text-align: right;
    direction: rtl;
    margin-left: 16px;
    height: 48px;
    justify-content: flex-end;
    align-self: flex-end;
    display: flex;

    @media(max-width: 768px) {
        width: 100%;
    }
`;

const Files = styled.div`
    background: #B4BBFF;
    border-radius: 8px;
    padding-right: 3px;
    padding-left: 3px;
    align-items: center;
    flex-direction: row;
    display: flex;
    padding: 5px;


    span {
        font-size: 10px;
        color: #545772;
    }

    img {
        width: 14px;
        height: 14px;
        cursor: pointer;
        margin-right: 5px;
    }
`;

const Clock = styled.input`
    width: 60%;
    background: transparent;
    direction: rtl;
    text-align: right;
    color: #fff;
`;

const ClockView = styled.div`
    flex-direction: row;
    display: flex;
    height: 48px;
    width: 23%;
    border: 1px solid #7F829F;
    box-sizing: border-box;
    border-radius: 8px;
    justify-content: space-between;
    align-items: center;
    padding: 16px;


    @media(max-width: 768px) {
        width: 100%;
        margin-bottom: 16px;
    }

    img {
        width: 19px;
        height: 19px;
    }

    span {
        color: #A7AAC6;
        font-size: 12px;
    }

   
`;


const DateContainer = styled.div`
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    display: flex;
    margin-top: 16px;

    @media(max-width: 768px) {
        flex-direction: column-reverse;
    }
`;


const Date = styled.div`
    width: 24%;
    height: 48px;
    border: 1px solid #7F829F;
    box-sizing: border-box;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;

    color: #A7AAC6;
    cursor: pointer;
    font-size: 13px;

    @media(max-width: 768px) {
        width: 100%;
        margin-bottom: 16px;
    }
    img {
        width: 16px;
        height: 18.67px;
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

const TextInput = styled.textarea`
    width: 100%;
    height: 120px;
    text-align: right;
    padding: 10px;
    border: 0px;
    border: 1px solid #7F829F;
    box-sizing: border-box;
    border-radius: 8px;
    background: transparent;
    font-size: 16px;
    font-weight: bold;
    color: #ffffff;
    font-size: 20px;
    margin-top: 16px;
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
    margin-left: 16px;
    justify-content: space-between;
    align-items: center;
    padding-right: 16px;

    border: 1px solid #7F829F;
    box-sizing: border-box;
    border-radius: 8px;
    cursor: pointer;

    @media(max-width: 768px) {
        width: 100%;
        margin-left: 0;
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
    margin-bottom: 16px;
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
    margin-top: 10px;
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



export default AddElection;