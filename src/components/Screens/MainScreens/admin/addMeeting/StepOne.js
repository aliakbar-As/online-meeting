import React, { useContext, useEffect, useState } from 'react';


import user from '../../../../../assets/mainScreens/user.png';
import downArrow from '../../../../../assets/mainScreens/downArrow.png';
import styled from 'styled-components';


import { Button, Header, Input, Loading } from '../../../../Commons';


import backArrow from '../../../../../assets/mainScreens/backArrow.png';

import './meeting.css';
import { useNavigate } from 'react-router';

import StoreContext from '../../../../../Stores';



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

const StepOne = (props) => {
    const navigate = useNavigate();

    const { MeetingStore } = useContext(StoreContext);

    const [companyList, setCompanyList] = useState([]);
    const [stockholder, setStockholder] = useState([]);

    const [description, setDescription] = useState('');
    const [meetingName, setMeetingName] = useState('');


    const [companyId, setCompanyId] = useState('');


    const [bossName, setBossName] = useState('');
    const [secretary, setSecretary] = useState('');
    const [supervisor, setSupervisor] = useState('');
    const [meetingType, setMeetingType] = useState('');


    useEffect(() => {
        addCompany();
    }, []);


    const addCompany = () => {
        MeetingStore.getCompanyCode().then(data => setCompanyList(data));

        MeetingStore.getStockholder().then(data => setStockholder(data));
    };


    const confirmInfo = () => {
        const duties = [
            {
                userId: bossName,
                dutyId: bossName !== '' ? 110 : 0,
            },
            {
                userId: secretary,
                dutyId: secretary !== '' ? 111 : 0,
            },
            {
                userId: supervisor,
                dutyId: 112,
            },
        ];

        let ids = duties.filter(item => item.dutyId === 0);

        if (ids.length > 0 || companyId === '' || meetingName === '' || meetingType === '') {
            alert('لطفا موارد را به صورت کامل پر کنید!');
            return;
        };
        MeetingStore.fillDuties(duties, companyId, meetingName, description, Number(meetingType));
        navigate('/admin/add/nextstep');
    };


    return (
        <div className="main">

            <Header backOnclick={() => navigate(-1)} />


            <Info>
                <span>مجمع ها / افزودن مجمع</span>
            </Info>


            <SurveyView>
                <span>افزودن مجمع <span className="stepOne">| مرحله اول</span></span>
            </SurveyView>


            <View>
                <Select
                    // style={selectStyle}
                    onChange={e => setBossName(e.target.value)}
                    value={bossName}>
                    <option value=''>نام و نام خانوادگی رییس</option>
                    {stockholder.map((item, index) => (
                        <option
                            key={index}
                            value={item.userId}>
                            {item.stockholderName}
                        </option>
                    ))}
                </Select>

                <Select
                    onChange={e => setCompanyId(e.target.value)}
                    value={companyId}>
                    <option value=''>نام و کد شرکت</option>
                    {companyList.map((item, index) => (
                        <option key={index} value={item.companyId}>{item.companyTitle}</option>
                    ))}
                </Select>
            </View>


            <View>
                <Select
                    onChange={e => setSupervisor(e.target.value)}
                    value={supervisor}>
                    <option value=''>نام و نام خانوادگی ناظر</option>
                    {stockholder.map((item, index) => (
                        <option key={index} value={item.userId}>{item.stockholderName}</option>
                    ))}
                </Select>

                <Select
                    onChange={e => setSecretary(e.target.value)}
                    value={secretary}>
                    <option value=''>نام و نام خانوادگی منشی</option>
                    {stockholder.map((item, index) => (
                        <option key={index} value={item.userId}>{item.stockholderName}</option>
                    ))}
                </Select>
            </View>


            <View>
                <Select
                    onChange={e => setMeetingType(e.target.value)}
                    value={meetingType}>
                    <option value=''>نوع مجمع</option>
                    {meetingtype.map((item, index) => (
                        <option key={index} value={item.id}>{item.title}</option>
                    ))}
                </Select>

                <MeetingTitle
                    placeholder={'نام مجمع'}
                    type={'text'}
                    value={meetingName}
                    onChange={e => setMeetingName(e.target.value)}
                />
            </View>


            <Description
                placeholder={'...توضیحات'}
                type={'text'}
                value={description}
                onChange={e => setDescription(e.target.value)}

            />

            <Footer>
                <Button
                    primary
                    onPress={confirmInfo}
                    title={'تایید و ادامه'} />

            </Footer>

        </div>
    );
};

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
    align-self: 'flex-end';
    display: 'flex';

    @media(max-width: 768px) {
        width: 100%;
        margin: auto;
        margin-top: 16px;
    }
`;

const MeetingTitle = styled.input`
    background: transparent;
    font-size: 16;
    width: 50%;
    border: 1px solid #7F829F;
    box-sizing: border-box;
    border-radius: 8px;
    flex-direction: 'row-reverse';
    padding: 5px;
    text-align:right;
    direction: rtl;
    margin-left: 16px;
    height: 48px;
    justify-content: flex-end;
    align-self: flex-end;
    display: flex;
    color: white;

    @media(max-width: 768px) {
        margin-top: 16px;
        width: 100%;
    }
`;

const Description = styled.textarea`
    background: transparent;
    border-radius: 8px;
    width: 100%;
    height: 80px;
    text-align: right;
    color: #fff;
    padding: 10px;
    border: 0px;
    border: 1px solid #7F829F;
    box-sizing: border-box;
    font-size: 18px;
    margin-top: 20px;
    justify-content: flex-end;
    

    @media(max-width: 768px) {
        margin-left: 0px;
        width: 100%;
    }
`;

const View = styled.div`
    display: flex;
    margin-top: 16px;
    justify-content: flex-end;

    @media(max-width: 768px) {
        flex-direction: column;
        margin: 0px
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

export default StepOne;