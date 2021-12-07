import React, { useState } from 'react';


import OngoingEvents from './OngoingEvents';
import styled from 'styled-components';


import user from '../../../../assets/mainScreens/user.png';
import downArrow from '../../../../assets/mainScreens/downArrow.png';

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

let items = [
    {
        id: 0,
        title: 'تامین سرمایه امین',
        des: 'مجمع سالیانه شرکت سرمایه امین',
        code: 'ن-66',
        date: '29/08/1400',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAHXPluq6GtTRPDIHRv5kJPy86uFjp5sO7hg&usqp=CAU',
    },
    {
        id: 0,
        title: 'تامین سرمایه امین',
        des: 'مجمع سالیانه شرکت سرمایه امین',
        code: 'ن-66',
        date: '29/08/1400',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAHXPluq6GtTRPDIHRv5kJPy86uFjp5sO7hg&usqp=CAU',
    },
    {
        id: 0,
        title: 'تامین سرمایه امین',
        des: 'مجمع سالیانه شرکت سرمایه امین',
        code: 'ن-66',
        date: '29/08/1400',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAHXPluq6GtTRPDIHRv5kJPy86uFjp5sO7hg&usqp=CAU',
    },
    {
        id: 0,
        title: 'تامین سرمایه امین',
        des: 'مجمع سالیانه شرکت سرمایه امین',
        code: 'ن-66',
        date: '29/08/1400',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAHXPluq6GtTRPDIHRv5kJPy86uFjp5sO7hg&usqp=CAU',
    },
    {
        id: 0,
        title: 'تامین سرمایه امین',
        des: 'مجمع سالیانه شرکت سرمایه امین',
        code: 'ن-66',
        date: '29/08/1400',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAHXPluq6GtTRPDIHRv5kJPy86uFjp5sO7hg&usqp=CAU',
    },
    {
        id: 0,
        title: 'تامین سرمایه امین',
        des: 'مجمع سالیانه شرکت سرمایه امین',
        code: 'ن-66',
        date: '29/08/1400',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAHXPluq6GtTRPDIHRv5kJPy86uFjp5sO7hg&usqp=CAU',
    },
    {
        id: 0,
        title: 'تامین سرمایه امین',
        des: 'مجمع سالیانه شرکت سرمایه امین',
        code: 'ن-66',
        date: '29/08/1400',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAHXPluq6GtTRPDIHRv5kJPy86uFjp5sO7hg&usqp=CAU',
    },
];

const Form = (props) => {
    const [tabSelectedId, setTabSelectedId] = useState(0);


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

            {tabSelectedId === 0 ? <OngoingEvents /> : null}
        </>
    );
};

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