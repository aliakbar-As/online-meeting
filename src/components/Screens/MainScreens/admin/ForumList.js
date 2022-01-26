import React, { useEffect, useState, useContext } from 'react';

import OngoingEvents from './OngoingEvents';
import styled from 'styled-components';


import user from '../../../../assets/mainScreens/user.png';
import downArrow from '../../../../assets/mainScreens/downArrow.png';

import left from '../../../../assets/mainScreens/left.png';
import wSurvey from '../../../../assets/mainScreens/wSurvey.png';
import election from '../../../../assets/mainScreens/election.png';


import { useNavigate } from 'react-router-dom';
import { ModalComponent } from '../../../Commons';


import StoreContext from '../../../../Stores';


let tabs = [
    {
        id: 4,
        title: 'رویداد های برگزار شده'
    },
    {
        id: 3,
        title: 'رویداد های لغو شده'
    },
    {
        id: 2,
        title: 'رویداد های آینده'
    },
    {
        id: 1,
        title: 'رویداد های در حال برگزاری'
    },
];


const ForumList = (props) => {
    const navigate = useNavigate();

    const { MeetingStore } = useContext(StoreContext);

    const [tabSelectedId, setTabSelectedId] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        requestMeetingData(1);
    }, []);

    const requestMeetingData = (tabId) => {
        setLoading(true);
        MeetingStore.fetchData(true, tabId).then(res => {
            setLoading(false);
        });
    };

    const handleTabSelected = (id) => {
        setTabSelectedId(id);
        requestMeetingData(id);
    };

    return (
        <>
            <TopView>
                <IconsDiv>
                    <UserIcon src={user} alt="user" />

                    <ArrowIcon src={downArrow} alt="downArrow" />
                </IconsDiv>

                <TabContainer>
                    {tabs.map((item, index) => {
                        return (
                            <Tab
                                key={index}
                                style={{ borderBottom: tabSelectedId === item.id ? '4px solid #97A1FF' : '1px solid #fff' }}
                                onClick={() => setTabSelectedId(item.id)}>
                                <span style={{ color: tabSelectedId === item.id ? '#97A1FF' : '#fff' }}>
                                    {item.title}
                                </span>
                            </Tab>
                        )
                    })}
                </TabContainer>

            </TopView>


            {MeetingStore.data.length !== 0 ?
                <>
                    <OngoingEvents
                        id={tabSelectedId}
                    />

                    <Footer>
                        <Survey onClick={() => navigate('/admin/survey')}>
                            <Left src={left} alt="left arrow" />
                            <span>انتخابات و نظرسنجی</span>
                        </Survey>
                    </Footer>
                </>
                :
                <NullData>
                    ! موردی یافت نشد
                </NullData>}



            <ModalComponent
                modalVisible={modalVisible}
                closeModal={() => setModalVisible(false)}
                content={'مجتمع با موفقیت ثبت شد.'}
            />
        </>
    );
};

const NullData = styled.div`
    font-size: 23px;
    color: #fff;
    text-align: center;
    margin-top: 30%;
`;

const Icon = styled.img`
    width: 48px;
    height: 48px;
`;

const Left = styled.img`
    width: 21.33px;
    height: 21.33px;
`;

const Survey = styled.button`
    border-radius: 16px;
    width: 50%;
    height: 120px;
    background: linear-gradient(266.53deg, #7B88FF 1%, #A17BF1 97.53%);
    border-radius: 16px;
    align-items: center;
    display: flex;
    justify-content: center;

    border: 0px;
    cursor: pointer;

    span {
        font-size: 20px;
        color: #fff;
        text-align: center;
        margin: 0px 50px 0px 50px;
    }

`;

const Election = styled.button`
    background: #6070FF;
    border-radius: 16px;
    width: 45%;
    height: 120px;
    align-items: center;
    display: flex;
    justify-content: center;
    border: 0px;

    cursor: pointer;
    span {
        font-size: 20px;
        color: #fff;
        text-align: center;
        margin: 0px 50px 0px 50px;
    }
`;


const Footer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 5%;
    margin-right: 3%;
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
    margin: 3%;

`;

const styles = {
    tabContainer: {
        flexDirection: 'row', alignItems: 'center',
        justifyContent: 'flex-end',
        display: 'flex',
        width: '80%'
    },
};

export default ForumList;