import React, { useState, useRef } from 'react';
import styled from 'styled-components';


import { Button, Input } from '../../../../Commons';


import backArrow from '../../../../../assets/mainScreens/backArrow.png';
import user from '../../../../../assets/mainScreens/user.png';
import downArrow from '../../../../../assets/mainScreens/downArrow.png';
import upload from '../../../../../assets/mainScreens/upload.png';
import clock from '../../../../../assets/mainScreens/clock.png';

import './meeting.css';

import { useNavigate } from 'react-router-dom';

const FinalStep = (props) => {
    const navigate = useNavigate();
    
    const pdfFile = useRef(null);
    const excelFile = useRef(null);
    const infoFileRef = useRef(null);

    const [companyName, setCompanyName] = useState('');
    const [companyCode, setCompanyCode] = useState('');

    const [pdf, setPdf] = useState(null);
    const [excel, setExcel] = useState('');
    const [infoFile, setInfoFile] = useState('');

    return (
        <div className="main">

            <TopView onClick={() => console.log('user')}>
                <IconsDiv>
                    <UserIcon src={user} alt="user" />

                    <ArrowIcon src={downArrow} alt="downArrow" />
                </IconsDiv>

                <Back src={backArrow} alt="backArrow" />
            </TopView>


            <Info>
                <span>مجمع ها / افزودن مجمع</span>
            </Info>


            <SurveyView>
                <span>افزودن مجمع <span className="stepOne">| مرحله سوم</span></span>
            </SurveyView>




            <CardSection>
                <Input
                    value={companyCode}
                    onChange={e => setCompanyCode(e.target.value)}
                    placeholder={'کد شرکت'}
                    type={"text"}
                />

                <Input
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    placeholder={'نام شرکت'}
                    type={"text"}
                />
            </CardSection>


            <CardSection>
                <View>
                    <input
                        type={'file'}
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        onChange={e => setExcel(e.target.files[0])}
                        hidden
                        ref={excelFile}
                    />
                    <img onClick={() => excelFile.current.click()} src={upload} alt="upload" />
                    <span>{excel === '' ? 'بارگزاری فایل اکسل' : excel.name}</span>
                </View>


                <View>
                    <input
                        type={'file'}
                        accept=".pdf"
                        onChange={e => setPdf(e.target.files[0])}
                        hidden
                        ref={pdfFile}
                    />
                    <img onClick={() => pdfFile.current.click()} src={upload} alt="upload" />
                    <span>{pdf === null ? 'بارگزاری فایل پی ‌دی‌ اف' : pdf.name}</span>
                </View>
            </CardSection>


            <CardSection>
                <View>
                    <input
                        type={'file'}
                        onChange={e => setInfoFile(e.target.files[0])}
                        hidden
                        ref={infoFileRef}
                    />
                    <img onClick={() => infoFileRef.current.click()} src={upload} alt="upload" />
                    <span>{infoFile === '' ? 'بارگزاری پیوست های اطلاعیه' : infoFile.name}</span>
                </View>
            </CardSection>


            <Footer>
                <Button
                    primary
                    onPress={() => navigate('/admin')}
                    title={'افزودن مجمع'} />

            </Footer>
        </div>
    );
};


const View = styled.div`
    flex-direction: row;
    display: flex;
    height: 48px;
    width: 450px;
    background: #545772;
    border-radius: 8px;
    margin-left: 16px;
    justify-content: space-between;
    align-items: center;
    padding-right: 16px;


    img {
        width: 48px;
        height: 48px;
        cursor: pointer;
    }

    span {
        color: #A7AAC6;
        font-size: 16px;
    }
`;


const CardSection = styled.div`
    flex-direction: row;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 16px;
`;


const SurveyView = styled.div`
    flex-direction: row;
    align-items: center;
    align-self: flex-end;
    display: flex;
    justify-content: flex-end;

    margin-top: 16px;
    img {
        width: 20px;
        height: 20px;
        margin-left: 10px;
    }
    
    span {
        color: #97A1FF;
        text-align: right;

    }
`;

const Footer = styled.div`
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    display: flex;
    margin-top: 50px;
`;


const Back = styled.img`
    width: 48px;
    height: 48px;
    align-self: flex-end;
`;



const Info = styled.div`
    border-bottom: 1px solid #545772;
    text-align: right;
    margin-top: 16px;
    padding: 10px;
    
    span {
        color: #545772;
        font-size: 14px;
    }
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
    cursor: pointer;
`;


export default FinalStep;