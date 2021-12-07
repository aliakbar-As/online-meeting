import React, { useState } from 'react';
import './Login.css';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


import lock from '../../../assets/auth/lock.png';


function Register() {
    const navigate = useNavigate();

    const [fullName, setFullName] = useState('');
    const [nationalCode, setNationalCode] = useState('');
    const [exchangeCode, setExchangeCode] = useState('');



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

                <SignIn onClick={() => console.log('onclick')}>ثبت نام</SignIn>


                <LoginText>
                    قبلا ثبت نام کرده‌ام <span onClick={() => navigate('/')}>ورود</span>
                </LoginText>

            </Content>
        </>

        // <div className="mainContainer">

        //     <img src={lock} className="lockIcon" />


        //     <h3 style={{ color: '#fff' }} className="hdrTitle">
        //         ثبت نام
        //     </h3>


        //     <TextInput
        //         value={fullName}
        //         className="primaryInput"
        //         onChange={e => setFullName(e.target.value)}
        //         placeholder={'نام و نام خانوادگی'}
        //         type={'text'}
        //     />

        //     <TextInput
        //         className="primaryInput"
        //         value={nationalCode}
        //         onChange={e => setNationalCode(e.target.value)}
        //         placeholder={'کد ملی'}
        //         type={'text'}
        //     />

        //     <TextInput
        //         className="primaryInput"
        //         value={exchangeCode}
        //         onChange={e => setExchangeCode(e.target.value)}
        //         placeholder={'کد بورسی'}
        //         type={'text'}
        //     />

        //     <h4 style={{ color: 'gray' }}>
        //         {/* لطفا کد ارسال شده به شماره {'09193786953'} را وارد کنید */}
        //     </h4>


        //     <Button
        //         onPress={() => console.log('onclick')}
        //         title={'ثبت نام'}
        //     />



        // </div>
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
`;

const SignIn = styled.a`
    position: absolute;
    right: 34.51%;
    top: 75%;
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


const InputThree = styled.input`
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
    top: 55%;
    bottom: 41.5%;
`;


const InputTwo = styled.input`
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
    top: 40%;
    bottom: 41.5%;
`;


const InputOne = styled.input`
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
    top: 25%;
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

`;

const Icon = styled.img`
 width: 446px;
 height: 388px;
 
`;


export default Register;
