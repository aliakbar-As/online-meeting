import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';



const users = [
    {
        id: 0,
        title: 'پنل ادمین',
    },
    {
        id: 1,
        title: 'کاربر',
    },
];

const LoginType = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');


    const handleUserChoice = () => {
        switch (Number(userId)) {
            case 0:
                //admin
                navigate('/admin');
                break;
            case 1:
                //user
                navigate('/form');
                break;
                
            default:
                break;
        }
    };

    return (
        <Container>

            <Modal>
                <p>نوع کاربری خود را مشخص کنید</p>


                <Select
                    onChange={e => setUserId(e.target.value)}
                    value={userId}>
                    <option value=''>کاربری خود را انتخاب کنید</option>
                    {users.map((item, index) => (
                        <option key={index} value={item.id}>{item.title}</option>
                    ))}
                </Select>

                <Confirm onClick={handleUserChoice}>تایید و ادامه</Confirm>

            </Modal>
        </Container>
    );
};

const Confirm = styled.a`
    width: 40%;
    height: 40px;
    background: linear-gradient(266.53deg, #7B88FF 1%, #A17BF1 97.53%);
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5%;
    cursor: pointer;
`;

const Select = styled.select`
    color: #fff;
    background: transparent;
    font-size: 16px;
    width: 450px;
    border-radius: 8px;
    flex-direction: row-reverse;
    padding: 5px;
    text-align: right;
    direction:rtl;
    margin-left: 16px;
    height: 48px;
    justify-content: flex-end;
    align-self: flex-end;
    display: flex;
    outline: none;
    background-color: #545772;
    font-size: 18px;


    @media(max-width: 768px) {
        width: 100%;
        margin-left: 0;
    }
`;

const Modal = styled.div`
    width: 60%;
    padding: 32px;
    background-color: #545772;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    margin: auto;
    display: flex;
    border-radius: 8px;
    margin-top: 25%;
`;

const Container = styled.div``;


export default LoginType;