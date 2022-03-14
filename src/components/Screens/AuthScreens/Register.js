import React, { useContext, useState } from 'react';
import './Login.css';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import StoreContext from '../../../Stores';

import lock from '../../../assets/auth/lock.png';
import spinner from '../../../assets/auth/spinner.svg';


function Register() {
    const { AuthStore } = useContext(StoreContext);

    const navigate = useNavigate();

    const [fullName, setFullName] = useState('');
    const [nationalCode, setNationalCode] = useState('');
    const [exchangeCode, setExchangeCode] = useState('');

    const [loading, setLoading] = useState(false);



    const registerUser = () => {
        setLoading(true);
        AuthStore.registerUser(fullName, nationalCode, exchangeCode).then(res => {

        if(res) {
            navigate('/form');
            return;
        };
            
        alert(AuthStore.errMessage);
        });
    };

    return (
        <>
            <Icon src={lock} alt="" />

            <Content>
                <p>ثبت نام</p>

                <InputOne
                    value={fullName}
                    className="primaryInput"
                    onChange={e => setFullName(e.target.value)}
                    placeholder={'نام و نام خانوادگی'}
                    type={'text'}
                />

                <InputTwo
                    className="primaryInput"
                    value={nationalCode}
                    onChange={e => setNationalCode(e.target.value)}
                    placeholder={'کد ملی'}
                    type={'text'}
                />

                <InputThree
                    className="primaryInput"
                    value={exchangeCode}
                    onChange={e => setExchangeCode(e.target.value)}
                    placeholder={'کد بورسی'}
                    type={'text'}
                />

                <SignIn disabled={loading} onClick={registerUser}>
                    {loading ? <img src={spinner} alt='' /> : 'ثبت نام'}
                </SignIn>


                <LoginText>
                    قبلا ثبت نام کرده‌ام <span onClick={() => navigate('/login')}>ورود</span>
                </LoginText>

            </Content>
        </>
    );
};

const LoginText = styled.span`
    font-size: 15px;
    color: white;

    position: absolute;
    right: 34.51%;
    top: 90.51%;
    bottom: 41.5%;

    span {
        color: #B592FE;
        font-size: 16px;
        margin-right: 10px;
        text-decoration: underline;
        cursor: pointer
    }

    @media(max-width: 768px) {
        right: 10px;
        bottom: 30%;
    }
`;


const SignIn = styled.button`
    position: absolute;
    right: 34.51%;
    top: 70%;
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
        top: 65%
    }
`;


const InputThree = styled.input`
    padding: 0.5em;
    color: #ABAEC8;
    border: none;

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
    top: 55%;
    bottom: 41.5%;

    @media(max-width: 768px) {
        right: 10px;
    top: 50%;
        width: 95%;
    }
`;


const InputTwo = styled.input`
    padding: 0.5em;
    color: #ABAEC8;
    border: none;

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
    top: 40%;
    bottom: 41.5%;

    @media(max-width: 768px) {
        right: 10px;
        width: 95%;
    top: 35%;

    }
`;


const InputOne = styled.input`
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
    top: 25%;
    bottom: 41.5%;

    @media(max-width: 768px) {
    top: 20%;
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

    @media (max-width: 768px) {
       position: absolute;
       right: 0;
       top: 40%;
        width: 100%;

        p {
            right: 10px;
            font-size: 25px;
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


export default Register;
