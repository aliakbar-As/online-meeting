import React, { useContext, useEffect, useState } from 'react';


import OngoingEvents from './OngoingEvents';
import styled from 'styled-components';


import user from '../../../../assets/mainScreens/user.png';
import downArrow from '../../../../assets/mainScreens/downArrow.png';


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


const Form = (props) => {
    const { MeetingStore } = useContext(StoreContext);

    const [tabSelectedId, setTabSelectedId] = useState(1);
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
                                key={item.id}
                                style={{ borderBottom: tabSelectedId === item.id ? '4px solid #97A1FF' : '1px solid #fff' }}
                                onClick={() => handleTabSelected(item.id)}>
                                <span style={{ color: tabSelectedId === item.id ? '#97A1FF' : '#fff' }}>
                                    {item.title}
                                </span>
                            </Tab>
                        )
                    })}
                </TabContainer>

            </TopView>

            {MeetingStore.data.length !== 0 ?
                <OngoingEvents
                    id={tabSelectedId}
                />
                :
                <NullData>
                    ! موردی یافت نشد
                </NullData>
            }

        </>
    );
};

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
`;

const styles = {
    tabContainer: {
        flexDirection: 'row', alignItems: 'center',
        justifyContent: 'flex-end',
        display: 'flex',
        width: '80%'
    },
};

export default Form;