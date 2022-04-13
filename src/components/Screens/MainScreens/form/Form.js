import React, { useContext, useEffect, useState } from 'react';


import OngoingEvents from './OngoingEvents';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';

import user from '../../../../assets/mainScreens/user.png';
import downArrow from '../../../../assets/mainScreens/downArrow.png';
import menu from '../../../../assets/mainScreens/menu.svg';

import StoreContext from '../../../../Stores';
import { Loading } from '../../../Commons';
import { Notify } from '../../../../Utils/Notify';
import Modal from 'react-modal';

let tabs = [
    {
        id: 2,
        title: 'در حال برگزاری'
    },
    {
        id: 1,
        title: 'برگزار خواهد شد',
    },
    {
        id: 4,
        title: 'لغو شده'
    },
    {
        id: 3,
        title: 'برگزار شده'
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

const Form = (props) => {
    const { MeetingStore } = useContext(StoreContext);
    const navigate = useNavigate();

    const [tabSelectedId, setTabSelectedId] = useState(2);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        requestMeetingData(tabSelectedId);
    }, []);


    const requestMeetingData = (tabId) => {
        setLoading(true);
        MeetingStore.fetchData(true, tabId).then(res => {
            setLoading(false);
        });
    };


    const removeUser = () => {
        localStorage.removeItem('@token');
        navigate('/');
    };

    const handleTabSelected = (id) => {
        setTabSelectedId(id);
        requestMeetingData(id);
        setModalVisible(false);
    };

    const drawerOpen = () => {
        setModalVisible(true);
    };

    return (

        <Notify>
            <TopView>
                <IconsDiv onClick={removeUser}>
                    <UserIcon src={user} alt="user" />

                    <ArrowIcon src={downArrow} alt="downArrow" />
                </IconsDiv>
                

                <TabContainer>
                    {tabs.map((item, index) => {
                        return (
                            <Tab
                                key={item.id}
                                clicked={tabSelectedId === item.id}
                                onClick={() => handleTabSelected(item.id)}>
                                <span style={{ color: tabSelectedId === item.id ? '#97A1FF' : '#fff' }}>
                                    {item.title}
                                </span>
                            </Tab>
                        )
                    })}

                    <img src={menu} alt='' onClick={drawerOpen} />
                </TabContainer>

            </TopView>

            {MeetingStore.data.length !== 0 ?
                <OngoingEvents
                    id={tabSelectedId}
                />
                :
                <NullData>! موردی یافت نشد</NullData>
            }

            {loading ? <Loading /> : null}

            <Modal
                isOpen={modalVisible}
                onRequestClose={() => setModalVisible(false)}
                style={drawerStyle}
                ariaHideApp={false}
            >
                <Content>
                    {tabs.map((item, index) => (
                        <Tabs onClick={() => handleTabSelected(item.id)}>
                            <p style={{ color: item.id === tabSelectedId ? '#97A1FF' : 'white', }}>
                                {index + 1}) {item.title}
                            </p>
                        </Tabs>
                    ))}

                    <Confirm onClick={() => setModalVisible(false)}>
                        بستن
                    </Confirm>
                </Content>
            </Modal>
        </Notify>
    );
};


const Confirm = styled.a`
    width: 100%;
    background: linear-gradient(266.53deg, #7B88FF 1%, #A17BF1 97.53%);
    /* border-radius: 8px; */
    border: 1px solid #7B88FF;
    text-align: center;
    height: 45px;
    margin: auto;
    justify-content: center;
    align-items: center;
    display: flex;
    font-size: 18px;
    font-weight: bold;
    color: #fff;
`;

const Tabs = styled.div`
    color: #fff;
    /* justify-content: flex-end; */
    /* align-items: flex-end; */
    /* display: flex; */
    margin: 16px;
    direction: rtl;
    
`;

const Content = styled.div`
    background-color: #232539;
    height: 100%;
    width: 100%;
    /* position: absolute;
    right: 0;
    bottom: 0;
    left: 0; */
    display: flex;
    flex-direction: column;
    display: flex;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
`;

const NullData = styled.div`
    font-size: 23px;
    color: #fff;
    text-align: center;
    margin-top: 30%;
`;


const Tab = styled.div`
    width: 28.3%;   
    cursor: pointer;
    text-align: center;
    padding: 10px;
    font-size: 14px;
    border-bottom: ${props => props.clicked ? '4px solid #97A1FF' : '1px solid #fff'};
    display: flex;

    @media(max-width: 768px) {
        display: none;
    }
`;


const TabContainer = styled.div`
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    width: 85%;
    display: flex;
    direction: rtl;
    /* background-color: red; */

    img {
        width: 25px;
        height: 25px;

        @media(min-width: 768px) {
            display: none;
        }
    }
    
    @media(max-width: 768px) {
            justify-content: space-between;
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
    display: flex;
`;


const TopView = styled.div`
    flex-direction: row;
    align-items: center;
    display: flex;
    justify-content: space-between;
    
    @media(max-width: 768px) {
        padding: 10px;
    }
`;

const drawerStyle = {
    content: {
        top: '50%',
        left: '70%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#232539',
        padding: '-120px',
        borderRadius: '16px',
        width: '80%',
        height: '100%',

    },
};
export default Form;