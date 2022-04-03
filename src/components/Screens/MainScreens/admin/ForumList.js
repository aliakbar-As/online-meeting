import React, { useEffect, useState, useContext } from 'react';

import OngoingEvents from './OngoingEvents';
import styled from 'styled-components';


import user from '../../../../assets/mainScreens/user.png';
import downArrow from '../../../../assets/mainScreens/downArrow.png';
import menu from '../../../../assets/mainScreens/menu.svg';
import left from '../../../../assets/mainScreens/left.png';
import surveyIcon from '../../../../assets/mainScreens/survey.png';
import electionIcon from '../../../../assets/mainScreens/election.png';


import { useNavigate } from 'react-router-dom';
import { ModalComponent, Loading } from '../../../Commons';


import StoreContext from '../../../../Stores';
import useWindowDimensions from '../../../../Utils/Dimension';


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
    const { width, height } = useWindowDimensions();

    const { MeetingStore } = useContext(StoreContext);

    const [tabSelectedId, setTabSelectedId] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        requestMeetingData(1);
    }, []);

    const requestMeetingData = (tabId) => {
        MeetingStore.resetMettingData();
        setLoading(true);
        MeetingStore.fetchData(true, tabId).then(res => {
            setLoading(false);
        });
    };

    const getSurveyList = () => {
        navigate('/admin/surveyType');
    };

    const removeUser = () => {
        localStorage.removeItem('@token');
        navigate('/');
    };

    return (
        <>
            <TopView>
                <IconsDiv onClick={removeUser}>
                    <UserIcon src={user} alt="user" />

                    <ArrowIcon src={downArrow} alt="downArrow" />
                </IconsDiv>


                <TabContainer>
                    {tabs.map((item, index) => {
                        return (
                            <Tab
                                key={index}
                                style={{ borderBottom: tabSelectedId === item.id ? '4px solid #97A1FF' : '1px solid #fff' }}
                                onClick={() => {
                                    setTabSelectedId(item.id)
                                    requestMeetingData(item.id)
                                }}>
                                <span style={{ color: tabSelectedId === item.id ? '#97A1FF' : '#fff' }}>
                                    {item.title}
                                </span>
                            </Tab>
                        )
                    })}

                    <img src={menu} alt='' />
                </TabContainer>

            </TopView>


            {MeetingStore.data.length !== 0 ?
                <>
                    <OngoingEvents
                        id={tabSelectedId}
                    />

                    <Footer>
                        {width > 768 ?
                            <Survey onClick={getSurveyList}>
                                <Left src={left} alt="left arrow" />
                                <span>انتخابات و نظرسنجی</span>
                            </Survey>
                            :

                            <>
                                <SurveyButton onClick={() => navigate('/admin/surveyMobile')}>
                                    <img src={left} alt="left arrow" />

                                    <p>نظرسنجی</p>

                                    <img src={electionIcon} alt="" />
                                </SurveyButton>

                                <ElectionButton onClick={() => navigate('/admin/electionMobile')}>
                                    <img src={left} alt="left arrow" />

                                    <p>انتخابات</p>

                                    <img src={surveyIcon} alt="" />
                                </ElectionButton>
                            </>
                        }

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

            {loading ? <Loading /> : null}
        </>
    );
};


const ElectionButton = styled.a`
    justify-content: space-evenly;
    align-items: center;
    width: 45%;
    background-color: #5A69EB;
    display: flex;
    border-radius: 10px;
    height: 45px;
    
    flex-direction: row;

    img {
        margin-right: 10px;
        height: 15px;
        width: 15px;
    }
`;

const SurveyButton = styled.a`
    justify-content: space-evenly;
    align-items: center;
    width: 45%;
    height: 45px;
    border-radius: 10px;
    background-color: #9B75EB;
    display: flex;
    margin-right: 5%;
    flex-direction: row;


    img {
        margin-right: 10px;
        height: 15px;
        width: 15px;
    }
`;


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

const Survey = styled.a`
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
        /* margin: 0px 50px 0px 50px; */
        margin-left: 50px;
    }

    @media(max-width: 768px) {
        width: 70%;
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
    font-size: 14px;

    
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
    /* background-color: red; */

 img {
     width: 25px;
     height: 25px;

     @media(min-width: 768px) {
         display: none;
     }
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