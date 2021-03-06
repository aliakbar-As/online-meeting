import React, { useContext, useEffect, useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


import lock from '../../../assets/auth/lock.png';
import clock from '../../../assets/auth/clock.png';
import { Button } from '../../Commons/Button';

import StoreContext from '../../../Stores';

import spinner from '../../../assets/auth/spinner.svg';
import { Logger } from '../../../Utils';
import { ModalComponent } from '../../Commons';

function Login() {
    const { AuthStore } = useContext(StoreContext);

    const navigate = useNavigate();


    const [phoneNumber, setPhoneNumber] = useState('');
    const [time, setTime] = useState(60);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        let token = localStorage.getItem('@token');

        if (token !== null) {
            Logger(token, 'token');
            navigate('/admin');
        };

    }, []);


    const loginUser = () => {

        if (phoneNumber.length !== 0) {
            setLoading(true);
            AuthStore.loginUser(phoneNumber).then(res => {

                if (res) {
                    navigate('/code');
                    setLoading(false);

                } else {
                    alert(AuthStore.errMessage);
                    setLoading(false);
                };
            });

        } else {
            alert('لطفا اطلاعات را کامل پر کنید!');
        };
    };


    return (
        <>
            <Icon src={lock} alt="" />

            <Content>
                <p>ورود | ثبت نام</p>

                <span>.برای ورود شماره همراه خود را وارد کنید</span>


                <Input
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                    placeholder={'شماره همراه'}
                    type={'text'}
                    maxLength={11}
                />

                <SignIn disabled={loading} onClick={loginUser}>
                    {loading ? <img src={spinner} alt='' /> : 'دریافت کد تایید'}
                </SignIn>


            </Content>
        </>
    );
};


const SignIn = styled.button`
    position: absolute;
    right: 34.51%;
    top: 55%;
    bottom: 41.5%;

    width: 215px;
    height: 48px;
    
    border: 1px solid transparent;

    background: linear-gradient(266.53deg, #7B88FF 1%, #A17BF1 97.53%);
    border-radius: 8px;

    font-size: 20px;

    text-align: center;
    justify-content: center;
    align-items: center;
    align-self: center;
    
    padding: 10px 0;
    cursor: pointer;

    color: #fff;
    font-size: 20px;
    
    &:hover {
        transition: opacity 0.2s ease 0s;
    }

    img {
        width : 21.33px;
        height: 29.33px;

        animation:spin 4s linear infinite;
    }

    @-moz-keyframes spin { 
    100% { -moz-transform: rotate(360deg); } 
    }

    @-webkit-keyframes spin { 
        100% { -webkit-transform: rotate(360deg); } 
    }

    @keyframes spin { 
        100% { 
            -webkit-transform: rotate(360deg); 
            transform:rotate(360deg); 
        } 
    }

    @media(max-width: 768px) {
        right: 10px;
        top: 55%
    }
`;


const Input = styled.input`
    padding: 0.5em;
    color: #ABAEC8;
    border: 1px solid #7F829F;
    box-sizing: border-box;
    border-radius: 8px;

    background: transparent;
    border-radius: 8px;
    text-align: right;

    width: 450px;
    height: 48px;

    
    position: absolute;
    right: 34.51%;
    top: 35%;
    bottom: 41.5%;

    @media(max-width: 768px) {
        right: 10px;
        width: 95%;
    }
`;


const Content = styled.main`
    align-self: center;
    position: relative;
    min-height: calc(100vh - 250px);
    overflow-x: hidden;
    display: block;
    top: 10px;
    padding: 0 calc(3.5vw + 5px);
    text-align: right;
    align-items: center;
    justify-content: center;
    
    p {
        text-align: right;
        color: #fff;
        font-size: 32px;
        line-height: 40px;
        
        font-family: Vazir;
        font-style: normal;
        font-weight: normal;

        position: absolute;
        right: 34.51%;
        top: 0px;
        bottom: 41.5%;
    }

    span {
        text-align: right;
        color: #fff;
        font-size: 20px;
        line-height: 40px;

        font-family: Vazir;
        font-style: normal;
        font-weight: 100;

        position: absolute;
        right: 34.51%;
        top: 20%;
        bottom: 41.5%;
    }


    @media (max-width: 768px) {
       position: absolute;
       right: 0;
       top: 40%;
        width: 100%;

        p {
            right: 10px;
            font-size: 25px;
        }

        span {
            font-size: 16px;
            right: 10px;
            color: #eee
        }
    }
`;

const Icon = styled.img`
 width: 446px;
 height: 388px;
    
    @media(max-width: 768px) {
        width: 250px;
        height: 250px;
        margin-top: 30px;
    }
`;

export default Login;

