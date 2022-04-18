import React, { useContext, useState, useEffect } from 'react';
import './Login.css';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


import lock from '../../../assets/auth/lock.png';
import { Button } from '../../Commons/Button';

import StoreContext from '../../../Stores';

import spinner from '../../../assets/auth/spinner.svg';
import clock from '../../../assets/auth/clock.png';

function VerificationCode() {
    const { AuthStore } = useContext(StoreContext);

    const navigate = useNavigate();

    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(60);



    useEffect(() => {

        let myInterval = setInterval(() => {
            if (count > 0) {
                setCount(count - 1);
            }
            if (count === 0) {
                clearInterval(myInterval);
            }

        }, 1000);

        return () => {
            clearInterval(myInterval);
        };

    }, []);


    const onLogin = () => {
        if (code.length !== 0) {
            setLoading(true);
            AuthStore.onLoginRole(code).then(res => {
                if (res === 'registered') {
                    if (AuthStore.roleId === 1) {
                        navigate('/admin');
                        setLoading(false);
                    } else if (AuthStore.roleId === 2) {
                        navigate('/form');
                        setLoading(false);
                    };

                } else {
                    navigate('register');
                    setLoading(false);
                };
            });

        } else {
            alert('کد وارد شده نامعتبر میباشد!')
        };
    };

    const sendCodeAgain = () => {
        if (count === 0) {
            setLoading(true);
            AuthStore.loginUser(AuthStore.phoneNumber).then(res => {
                if (res) {
                    setCount(60);
                    setLoading(false);

                } else {
                    alert(AuthStore.errMessage);
                    setLoading(false);
                };
            });
        } else {
            alert('لطفا منتظر بمانید تا تایمر به صفر برسد');
        };

    };


    return (

        <>
            <Icon src={lock} alt="" />

            <Content>
                <div style={{ width: '50%' }}>
                    <p>ورود | ثبت نام</p>

                    <span>.لطفا کد ارسال شده به شماره {AuthStore.phoneNumber} را وارد کنید</span>
                </div>

                <Input
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    placeholder={'کد تایید'}
                    type={'text'}
                />

                <Count>
                    <p onClick={() => sendCodeAgain()} style={{ fontSize: 16 }}>ارسال مجدد</p>

                    <div>
                        <span>00:{count}</span>
                        <img src={clock} alt='' />
                    </div>
                </Count>

                <div style={{ width: '50%' }}>
                    <SignIn disabled={loading} onClick={onLogin}>
                        {loading ? <img src={spinner} alt='' /> : 'ورود'}
                    </SignIn>
                </div>

            </Content>
        </>
    );
};

const Count = styled.div`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    display: flex;
    width: 50%;

    p {
        text-decoration: underline;
        cursor: pointer;
    }

    div {
        flex-direction: row;
        align-items: center;
        display: flex;
    }

    img {
        width: 20px;
        height: 20px;
        margin-left: 10px;
    }
`;

const SignIn = styled.button`
    width: 50%;
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
    margin-top: 16px;
    margin-bottom: 16px;
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

    width: 50%;
    height: 48px;


    @media(max-width: 768px) {
        right: 10px;
        width: 95%;
    }
`;


const Content = styled.main`
    align-self: center;
    overflow-x: hidden;
    flex-direction: column;
    display: flex;
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

    }

    span {
        text-align: right;
        color: #ccc;
        font-size: 16px;
        line-height: 40px;

        font-family: Vazir;
        font-style: normal;
        font-weight: 100;

    }

    @media (max-width: 768px) {
        width: 100%;

        p {
            right: 10px;
            font-size: 25px;
        }

        span {
            font-size: 14px;
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

export default VerificationCode;
