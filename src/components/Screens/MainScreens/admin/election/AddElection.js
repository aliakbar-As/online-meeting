import React, { useState, useRef, useEffect, useContext } from 'react';
import styled from 'styled-components';


import { Button, Header, Input } from '../../../../Commons';


import backArrow from '../../../../../assets/mainScreens/backArrow.png';
import user from '../../../../../assets/mainScreens/user.png';
import downArrow from '../../../../../assets/mainScreens/downArrow.png';
import upload from '../../../../../assets/mainScreens/upload.png';
import calander from '../../../../../assets/mainScreens/calender.png';
import clock from '../../../../../assets/mainScreens/clock.png';

import './election.css';

import { useNavigate } from 'react-router-dom';
import StoreContext from '../../../../../Stores';

const AddElection = (props) => {
    const infoFileRef = useRef(null);

    const navigate = useNavigate();

    const { MeetingStore } = useContext(StoreContext);


    const [companyCode, setCompanyCode] = useState('');
    const [infoFile, setInfoFile] = useState('');
    const [description, setDescription] = useState('');
    const [meetingId, setMeetingId] = useState('');

    const [meetingList, setMeetingList] = useState([]);

    useEffect(() => {
        getMeetingList();
    }, []);


    const getMeetingList = () => {
        MeetingStore.getMeetingList().then(res => {
            setMeetingList(res);
        });
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
                <select
                    style={selectStyle}
                    onChange={e => setMeetingId(e.target.value)}
                    value={meetingId}>
                    <option value=''>نام مجمع</option>
                    {meetingList.map((item, index) => (
                        <option key={index} value={item.meetingId}>{item.meetingTitle}</option>
                    ))}
                </select>


                <Input
                    value={companyCode}
                    onChange={e => setCompanyCode(e.target.value)}
                    placeholder={'موضوع اننتخابات'}
                    type={"text"}
                />
            </CardSection>



            <DateContainer>
                <Date>
                    <img src={clock} alt="calander" />
                    <span>تاریخ شروع</span>
                </Date>

                <Date>
                    <img src={calander} alt="calander" />
                    <span>تاریخ شروع</span>
                </Date>

                <Date>
                    <img src={clock} alt="calander" />
                    <span>تاریخ شروع</span>
                </Date>

                <Date>
                    <img src={calander} alt="calander" />
                    <span>تاریخ شروع</span>
                </Date>
            </DateContainer>


            <CardSection>
                <View>
                    <input
                        type={'file'}
                        onChange={e => setInfoFile(e.target.files[0])}
                        hidden
                        ref={infoFileRef}
                    />
                    <img onClick={() => infoFileRef.current.click()} src={upload} alt="upload" />
                    <span>{infoFile === '' ? 'بارگزاری پیوست های اطلاعیه' : infoFile.name}</span>
                </View>
            </CardSection>


            <CardSection>

                <TextInput
                    placeholder={'توضیحات.....'}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
            </CardSection>

            <Footer>
                <Add onClick={() => navigate('/admin/election')}>
                    تایید و ادامه
                </Add>

            </Footer>
        </div>
    );
};

const selectStyle = {
    background: 'transparent',
    color: '#7F829F',
    fontSize: 16,
    width: 450,
    borderRadius: 8,
    flexDirection: 'row-reverse',
    padding: 5,
    textAlign: 'right',
    direction: 'rtl',
    marginLeft: 16,
    height: 48,
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    display: 'flex',
};

const DateContainer = styled.div`
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    display: flex;
    margin-top: 16px;
`;


const Date = styled.div`
    width: 23%;
    height: 48px;
    background: #545772;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;

    color: #A7AAC6;

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
    background: #545772;
    border-radius: 8px;
    width: 100%;
    height: 120px;
    text-align: right;
    color: #fff;
    padding: 10px;
    border: 0px;
    margin-left: 16px;
    
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
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
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


export default AddElection;