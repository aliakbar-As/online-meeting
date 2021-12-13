import React, { useEffect, useState } from 'react';

import OngoingEvents from './OngoingEvents';
import styled from 'styled-components';


import user from '../../../../assets/mainScreens/user.png';
import downArrow from '../../../../assets/mainScreens/downArrow.png';

import left from '../../../../assets/mainScreens/left.png';
import wSurvey from '../../../../assets/mainScreens/wSurvey.png';
import election from '../../../../assets/mainScreens/election.png';


import { useNavigate } from 'react-router-dom';
import { ModalComponent } from '../../../Commons';

let tabs = [
    {
        id: 2,
        title: 'رویداد های لغو شده'
    },
    {
        id: 1,
        title: 'رویداد های آینده'
    },
    {
        id: 0,
        title: 'رویداد های در حال برگذاری'
    },
];


const ForumList = (props) => {
    const navigate = useNavigate();

    const [tabSelectedId, setTabSelectedId] = useState(0);
    const [modalVisible, setModalVisible] = useState(true);


    useEffect(() => {

        setTimeout(() => {
            setModalVisible(false);
        }, 3000);

    }, []);

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
                                key={item.id}
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

            {tabSelectedId === 0 ?
                <>
                    <OngoingEvents />

                    <Footer>

                        <Survey>
                            <Left src={left} alt="left arrow" />
                            <span>نظرسنجی ها</span>
                            <Icon src={wSurvey} alt="survey" />
                        </Survey>

                        <Election onClick={() => navigate('/admin/election')}>
                            <Left src={left} alt="left arrow" />
                            <span>انتخابات</span>
                            <Icon src={election} alt="election" />
                        </Election>

                    </Footer>
                </>
                : null}



            <ModalComponent
                modalVisible={modalVisible}
                closeModal={() => setModalVisible(false)}
                content={'مجتمع با موفقیت ثبت شد.'}
            />
        </>
    );
};


const Icon = styled.img`
    width: 48px;
    height: 48px;
`;

const Left = styled.img`
    width: 21.33px;
    height: 21.33px;
`;

const Survey = styled.button`
    background: #6070FF;
    border-radius: 16px;
    width: 45%;
    height: 120px;
    background: #A87EFF;
    border-radius: 16px;
    align-items: center;
    display: flex;
    justify-content: center;

    border: 0px;

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
    justify-content: space-around;

    margin-bottom: 5%;

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