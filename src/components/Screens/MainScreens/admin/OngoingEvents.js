import React from 'react';
import styled from 'styled-components';

import './admin.css';

import { useNavigate } from 'react-router-dom';



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

const OngoingEvents = (props) => {
    const navigate = useNavigate();


    return (
        <Main>
            {items.map((item, index) => {
                return (
                    <Table key={item.id}>
                        <Logo src={item.image} alt={item.id} />
                        <span style={{ color: '#EBEEFF', fontSize: 14 }}>{item.title}</span>
                        <span style={{ color: '#DDE0F3', fontSize: 14 }}>{item.des}</span>
                        <span style={{ color: '#A7AAC6', fontSize: 13 }}>کد : {item.code}</span>
                        <span style={{ color: '#E7E9FF', fontSize: 14 }}>{item.date}</span>


                        <Info onClick={() => navigate({
                            pathname: "/admin/info",
                            search: null,
                            state: null,
                        })}>
                            مشاهده اطلاعیه
                        </Info>
                    </Table>
                )
            })}

            <div className="addContainer">
                <Add onClick={() => navigate({ pathname: "/admin/add", search: null, state: null, })}>
                    افزودن مجمع
                </Add>
            </div>



        </Main>
    );
};




const Add = styled.button`
    background: linear-gradient(266.53deg, #7B88FF 1%, #A17BF1 97.53%);
    border-radius: 8px;
    width: 450px;
    height: 48px;

    text-align: center;
    color: #fff;
    
    justify-content: flex-end;

    font-size: 18px;
cursor: pointer;
border: 0px;


`;


const Info = styled.button`
    background: linear-gradient(266.53deg, #7B88FF 1%, #A17BF1 97.53%);
    box-shadow: 0px 4px 6px rgba(25, 26, 29, 0.4);
    border-radius: 8px;
    text-align: center;
    color: #fff;
    width: 215px;
    height: 48px;
    font-size: 20px;
    border: 0px;
`;

const Logo = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 100%;
`;

const Table = styled.div`
    flex-direction: row-reverse;
    align-items: center;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #545772;
    padding-bottom: 10px;
    padding-top: 10px;
    padding: 10px

`;

const Main = styled.main`
    margin-top: 3%;
    background: #2F3247;

    box-shadow: 0px 0px 8px rgba(29, 29, 30, 0.8);
    border-radius: 8px;
    margin: 3%;
`;

export default OngoingEvents;