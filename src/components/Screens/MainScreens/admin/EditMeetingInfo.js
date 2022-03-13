import React, { useContext, useEffect, useState } from 'react';


import user from '../../../../assets/mainScreens/user.png';
import downArrow from '../../../../assets/mainScreens/downArrow.png';
import styled from 'styled-components';


import { Button, Header, Input } from '../../../Commons';


import backArrow from '../../../../assets/mainScreens/backArrow.png';

import './addMeeting/meeting.css';
import { useNavigate } from 'react-router';

import StoreContext from '../../../../Stores';



let meetingtype = [
    {
        title: 'مجمع عمومی',
        id: 1,
    },
    {
        title: 'مجمع عمومی سالانه',
        id: 2,
    },
    {
        title: 'مجمع عمومی',
        id: 3,
    },
];


const meetingStatus = [
    {
        id: 1,
        title: 'برگزار خواهد شد',
    },
    {
        id: 2,
        title: 'در حال برگزاری'
    },
    {
        id: 3,
        title: 'برگزار شده'
    },
    {
        id: 4,
        title: 'لغو شده'
    },
    {
        id: 5,
        title: 'به تعویق افتاده'
    },
    {
        id: 6,
        title: 'به دور دوم رفته'
    },
];

const EditMeetingInfo = (props) => {
    const navigate = useNavigate();

    const { MeetingStore, MeetingProfileStore } = useContext(StoreContext);

    const [companyList, setCompanyList] = useState([]);
    const [stockholder, setStockholder] = useState([]);

    const [description, setDescription] = useState('');
    const [meetingName, setMeetingName] = useState('');


    const [meetingStatusSelected, setMeetingStatus] = useState(0);
    const [meetingType, setMeetingType] = useState('');

    const [companyId, setCompanyId] = useState('');

    const [bossName, setBossName] = useState('');
    const [bossNameId, setBossNameId] = useState('');
    const [secretary, setSecretary] = useState('');
    const [secretaryId, setSecretaryId] = useState('');
    const [supervisor, setSupervisor] = useState('');
    const [supervisorId, setSupervisorId] = useState('');

    const [secretaryAdded, setSecretaryAdded] = useState(null);
    const [supervisorAdded, setSupervisorAdded] = useState(null);
    const [bossAdded, setBossAdded] = useState(null);

    useEffect(() => {
        getMeetingInfo();
        addCompany();
    }, []);



    const getMeetingInfo = () => {
        MeetingProfileStore.getMeetingInfo().then(res => {
            setDutiesInfo(res);
        });
    };

    const setDutiesInfo = (res) => {
        setDutiesRoles(res);
        setCompanyId(res.holderCompanyId);
        setDescription(res.description);
        setMeetingName(res.meetingTitle);
        setMeetingType(res.meetingType);
        setMeetingStatus(res.meetingStatus);
        let bossId = res.meetingUserDuties.filter(item => item.dutyId === 110);
        let secretaryId = res.meetingUserDuties.filter(item => item.dutyId === 111);
        let supervisorId = res.meetingUserDuties.filter(item => item.dutyId === 112);

        setSecretaryId(secretaryId[0] === undefined ? null : secretaryId[0].id)
        setBossNameId(bossId[0] === undefined ? null : bossId[0].id)
        setSupervisorId(supervisorId[0] === undefined ? null : supervisorId[0].id)
    };

    const setDutiesRoles = (res) => {
        let boss = res.meetingUserDuties.filter(item => item.dutyId === 110);
        let secretary = res.meetingUserDuties.filter(item => item.dutyId === 111);
        let supervisor = res.meetingUserDuties.filter(item => item.dutyId === 112);

        setBossAdded(boss[0] === undefined ? null : boss[0]);
        setSecretaryAdded(secretary[0] === undefined ? null : secretary[0]);
        setSupervisorAdded(supervisor[0] === undefined ? null : supervisor[0]);
    };

    const addCompany = () => {
        MeetingStore.getCompanyCode().then(data => setCompanyList(data));

        MeetingStore.getStockholder().then(data => setStockholder(data));
    };


    const confirmInfo = () => {
        const meetingId = MeetingProfileStore.meetingId;

        if (companyId === '' || meetingName === '' || meetingType === '') {
            alert('لطفا موارد را به صورت کامل پر کنید!');
            return;
        };
        let duties = [
            {
                "id": bossNameId,
                "meetingId": meetingId,
                "userId": bossName,
                "dutyId": 110
            },
            {
                "id": secretaryId,
                "meetingId": meetingId,
                "userId": secretary,
                "dutyId": 111
            },
            {
                "id": supervisorId,
                "meetingId": meetingId,
                "userId": supervisor,
                "dutyId": 112
            }
        ]

        let newElement = {
            meetingId: MeetingProfileStore.meetingId,
            meetingType: meetingType,
            holderCompanyId: companyId,
            meetingTitle: meetingName,
            meetingStatus: Number(meetingStatusSelected),
            description: description,
            meetingUserDuties: duties,
        };

        MeetingProfileStore.updateDuties(newElement).then(res => {

            // navigate('/admin/');
        });
    };


    return (
        <div className="main">

            <Header backOnclick={() => navigate(-1)} />


            <Info>
                <span>مجمع ها / ویرایش مجمع</span>
            </Info>


            <SurveyView>
                <span>ویرایش مجمع</span>
            </SurveyView>


            <View>
                <select
                    style={selectStyle}
                    onChange={e => setBossName(e.target.value)}
                    value={bossName}>

                    <option value=''>{bossAdded === null ? 'نام و نام خانوادگی رییس' : bossAdded.stockholderName}</option>
                    {stockholder.map((item, index) => (
                        <option
                            key={index}
                            value={item.userId}>
                            {item.stockholderName}
                        </option>
                    ))}
                </select>

                <select
                    style={selectStyle}
                    onChange={e => setCompanyId(e.target.value)}
                    value={companyId}>
                    <option value=''>نام و کد شرکت</option>
                    {companyList.map((item, index) => (
                        <option key={index} value={item.companyId}>{item.companyTitle}</option>
                    ))}
                </select>
            </View>


            <View>
                <select
                    onChange={e => setSupervisor(e.target.value)}
                    style={selectStyle}
                    value={supervisor}>
                    <option value=''>{supervisorAdded === null ? 'نام و نام خانوادگی ناظر' : supervisorAdded.stockholderName}</option>
                    {stockholder.map((item, index) => (
                        <option key={index} value={item.userId}>{item.stockholderName}</option>
                    ))}
                </select>

                <select
                    style={selectStyle}
                    onChange={e => setSecretary(e.target.value)}
                    value={secretary}>
                    <option value=''>{secretaryAdded === null ? 'نام و نام خانوادگی منشی' : secretaryAdded.stockholderName}</option>

                    {stockholder.map((item, index) => (
                        <option key={index} value={item.userId}>{item.stockholderName}</option>
                    ))}
                </select>
            </View>


            <View>
                <select
                    style={selectStyle}
                    onChange={e => setMeetingType(e.target.value)}
                    value={meetingType}>
                    <option value=''>نوع مجمع</option>
                    {meetingtype.map((item, index) => (
                        <option key={index} value={item.id}>{item.title}</option>
                    ))}
                </select>

                <Input
                    placeholder={'نام مجمع'}
                    type={'text'}
                    value={meetingName}
                    onChange={e => setMeetingName(e.target.value)}
                />
            </View>

            <Wrap>
                <select
                    style={selectStyle}
                    onChange={e => setMeetingStatus(e.target.value)}
                    value={meetingStatusSelected}>
                    <option value=''>وضعیت مجمع</option>
                    {meetingStatus.map((item, index) => (
                        <option key={index} value={item.id}>{item.title}</option>
                    ))}
                </select>

                <Description
                    placeholder={'...توضیحات'}
                    type={'text'}
                    value={description}
                    onChange={e => setDescription(e.target.value)}

                />
            </Wrap>

            <Footer>
                <Button
                    primary
                    onPress={confirmInfo}
                    title={'تایید و ثبت'} />

            </Footer>
        </div>
    );
};

const Wrap = styled.div`
    flex-direction: column;
    align-items: flex-end;
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
`;

const Description = styled.textarea`
    background: transparent;
    border-radius: 8px;
    width: 95%;
    height: 80px;
    text-align: right;
    color: #fff;
    padding: 10px;
    border: 0px;
    margin-left: 16px;
    border: 1px solid #7F829F;
    box-sizing: border-box;
    font-size: 18px;
    margin-top: 20px;
    justify-content: flex-end;
`;

const View = styled.div`
    display: flex;
    margin-top: 16px;
    justify-content: flex-end;

    select {
        color: white;
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

export default EditMeetingInfo;