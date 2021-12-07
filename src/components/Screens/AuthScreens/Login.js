import React, { useEffect, useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


import lock from '../../../assets/auth/lock.png';
import clock from '../../../assets/auth/clock.png';


function Login() {
    const navigate = useNavigate();


    const [phoneNumber, setPhoneNumber] = useState('');
    const [time, setTime] = useState(60);

    useEffect(() => {

        timerCount();

    }, []);


    const timerCount = () => {

        setInterval(() => {
            setTime(time - 1);

            if (time === 0) {
                clearInterval();
                return;
            };

        }, 1000);

    };


    const loginUser = () => {
        if (phoneNumber.length !== 0) {
            navigate({
                pathname: "form",
                search: null,
                state: phoneNumber,
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
                />

                <div className="footerContainer">
                    <h4 style={{ cursor: 'pointer' }} className="send-again-title" onClick={() => console.log('send again')}>ارسال مجدد</h4>

                    <div className="footerContainer innerFooterContainer">
                        <h4 className="send-again-title time-title">00:{time}</h4>
                        <img src={clock} className="clockIcon" alt="" />
                    </div>
                </div>

                <SignIn onClick={loginUser}>ورود</SignIn>

            </Content>
        </>
    );
};


const SignIn = styled.a`
    position: absolute;
    right: 34.51%;
    top: 65%;
    bottom: 41.5%;

    width: 215px;
    height: 48px;
    
    border: 1px solid transparent;

    background: linear-gradient(266.53deg, #7B88FF 1%, #A17BF1 97.53%);
    border-radius: 8px;

    font-size: 20px;

    text-align: center;
    justify-center: center;
    align-items: center;
    align-self: center;
    
    padding: 10px 0;


    &:hover {
        background: #0483ee;
    }

`;


const Input = styled.input`
    padding: 0.5em;
    color: #ABAEC8;
    border: none;

    background: #545772;
    border-radius: 8px;
    text-align: right;

    width: 450px;
    height: 48px;

    
    position: absolute;
    right: 34.51%;
    top: 35%;
    bottom: 41.5%;
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
`;

const Icon = styled.img`
 width: 446px;
 height: 388px;
 
`;

export default Login;

