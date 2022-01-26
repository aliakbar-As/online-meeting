import React, { useContext, useState } from 'react';
import './Login.css';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


import lock from '../../../assets/auth/lock.png';
import { Button } from '../../Commons/Button';

import StoreContext from '../../../Stores';

import spinner from '../../../assets/auth/spinner.svg';

function VerificationCode() {
    const { AuthStore } = useContext(StoreContext);

    const navigate = useNavigate();

    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);


    const onLogin = () => {
        if (code.length !== 0) {
            setLoading(true);
            AuthStore.onLoginRole(code).then(res => {
                if (res === 'registered') {
                    navigate('/form');
                    setLoading(false);
                } else {
                    navigate('/register');
                    setLoading(false);
                };
            });

        } else {
            alert('کد وارد شده نامعتبر میباشد!')
        };
    };

    return (

        <>
            <Icon src={lock} alt="" />

            <Content>
                <p>ورود | ثبت نام</p>

                <span>.لطفا کد ارسال شده به شماره {AuthStore.phoneNumber} را وارد کنید</span>


                <Input
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    placeholder={'کد تایید'}
                    type={'text'}
                />

                <SignIn disabled={loading} onClick={onLogin}>
                    {loading ? <img src={spinner} alt='' /> : 'دریافت کد تایید'}
                </SignIn>
            </Content>
        </>
    );
};


const SignIn = styled.button`
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
        color: #ccc;
        font-size: 16px;
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

export default VerificationCode;
