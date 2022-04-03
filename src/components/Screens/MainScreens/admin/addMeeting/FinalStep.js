import React, { useState, useRef, useEffect, useContext } from 'react';
import styled from 'styled-components';


import backArrow from '../../../../../assets/mainScreens/backArrow.png';
import user from '../../../../../assets/mainScreens/user.png';
import downArrow from '../../../../../assets/mainScreens/downArrow.png';
import upload from '../../../../../assets/mainScreens/upload.png';
import clock from '../../../../../assets/mainScreens/clock.png';

import './meeting.css';

import { Link, useNavigate } from 'react-router-dom';

import StoreContext from '../../../../../Stores';

import close from '../../../../../assets/mainScreens/close.svg';
import check from '../../../../../assets/mainScreens/check.svg';
import { Header, Loading, ModalComponent } from '../../../../Commons';

const FinalStep = (props) => {
    const navigate = useNavigate();

    const { MeetingStore } = useContext(StoreContext);

    const pdfFile = useRef(null);
    const excelFile = useRef(null);
    const infoFileRef = useRef(null);


    const [excelFiles, setExcelFiles] = useState([]);
    const [pdfFiles, setPdfFiles] = useState([]);
    const [infoFiles, setInfoFiles] = useState([]);

    const [files, setFiles] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const [successVisible, setSuccessVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);


    const changeHandler = (event, id) => {
        setFiles(files => [...files, event.target.files[0]]);

        switch (id) {
            case 0:
                setExcelFiles(excelFiles => [...excelFiles, event.target.files[0]]);
                break;

            case 1:
                setPdfFiles(pdfFiles => [...pdfFiles, event.target.files[0]]);
                break;

            case 2:
                setInfoFiles(infoFiles => [...infoFiles, event.target.files[0]]);
                break;

            default:
                console.log('break');
                break;
        };
    };



    const deleteIcon = (name, id) => {

        if (successVisible) {
            alert('امکان حذف فایل وجود ندارد!');
            return;
        };

        setFiles(files.filter(item => item.name !== name));

        switch (id) {
            case 0:
                setExcelFiles(excelFiles.filter(item => item.name !== name));
                break;

            case 1:
                setPdfFiles(pdfFiles.filter(item => item.name !== name));
                break;

            case 2:
                setInfoFiles(infoFiles.filter(item => item.name !== name));
                break;

            default:
                console.log('break');
                break;
        };
    };


    const handleConditions = (id) => {
        setModalVisible(false);
        setLoading(true);

        if (id === 0) {
            MeetingStore.addMeeting(uploadedFiles).then(res => {
                setModalVisible(true);
                navigate('/admin');
                setLoading(false);
            });
        } else {

            var formData = new FormData();
            files.map(item => formData.append('files', item));


            MeetingStore.uploadFiles(1, formData).then(files => {
                setSuccessVisible(true);
                setUploadedFiles(files);
                setLoading(false);
            });
        };
    };

    return (
        <div className="main">

            <Header backOnclick={() => navigate(-1)} />


            <Info>
                <span>مجمع ها / افزودن مجمع</span>
            </Info>


            <SurveyView>
                <span>افزودن مجمع <span className="stepOne">| مرحله سوم</span></span>
            </SurveyView>


            {successVisible ?
                <Success>
                    <Line />

                    <Title>
                        <span>فایل ها با موفقیت بارگزاری شد. در ادامه، دکمه‌ی افزودن مجمع را بزنید</span>
                        <img src={check} alt='' />
                    </Title>
                </Success>
                : null}

            <CardSection>
                <View>
                    {excelFiles.length === 0 ?
                        <input
                            type={'file'}
                            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                            onChange={(e) => changeHandler(e, 0)}
                            hidden
                            ref={excelFile}
                        />
                        :
                        <>
                            {excelFiles.map((item, i) => (
                                <input
                                    key={i}
                                    type={'file'}
                                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                    onChange={(e) => changeHandler(e, 0)}
                                    hidden
                                    ref={excelFile}
                                />
                            ))}
                        </>
                    }

                    <img onClick={() => excelFile.current.click()} src={upload} alt="upload" />

                    {excelFiles.length === 0 ? <h5 style={{ color: '#7F829F' }}>بارگزاری فایل اکسل</h5> : null}

                    {excelFiles.map((item, i) => {
                        return (
                            <Files key={i}>
                                <img onClick={() => deleteIcon(item.name, 0)} src={close} alt='close' />

                                <span>{pdfFiles.length === 0 ? 'بارگزاری فایل اکسل' : item.name}</span>
                            </Files>
                        )
                    })}
                </View>


                <View>

                    {pdfFiles.length === 0 ?
                        <input
                            type={'file'}
                            accept=".pdf"
                            onChange={(e) => changeHandler(e, 1)}
                            hidden
                            ref={pdfFile}
                        />
                        :
                        <>
                            {pdfFiles.map((item, i) => (
                                <input
                                    key={i}
                                    type={'file'}
                                    accept=".pdf"
                                    onChange={(e) => changeHandler(e, 1)}
                                    hidden
                                    ref={pdfFile}
                                />
                            ))}
                        </>
                    }

                    <img onClick={() => pdfFile.current.click()} src={upload} alt="upload" className='upload' />

                    {pdfFiles.length === 0 ? <h5 style={{ color: '#7F829F' }}>بارگزاری فایل پی ‌دی‌ اف</h5> : null}

                    {pdfFiles.map((item, i) => {
                        return (
                            <Files key={i}>
                                <img onClick={() => deleteIcon(item.name, 1)} src={close} alt='close' />

                                <span>{pdfFiles.length === 0 ? 'بارگزاری فایل پی ‌دی‌ اف' : item.name}</span>
                            </Files>
                        )
                    })}
                </View>
            </CardSection>


            <CardSection>
                <View>
                    {infoFiles.length === 0 ?
                        <input
                            type={'file'}
                            onChange={(e) => changeHandler(e, 2)}
                            hidden
                            ref={infoFileRef}
                        />
                        :
                        <>
                            {infoFiles.map((item, i) => (
                                <input
                                    key={i}
                                    type={'file'}
                                    onChange={(e) => changeHandler(e, 2)}
                                    hidden
                                    ref={infoFileRef}
                                />
                            ))}
                        </>
                    }

                    <img onClick={() => infoFileRef.current.click()} src={upload} alt="upload" />

                    {infoFiles.length === 0 ? <h5 style={{ color: '#7F829F' }}>بارگزاری پیوست های اطلاعیه</h5> : null}
                    {infoFiles.map((item, i) => {
                        return (
                            <Files key={i}>
                                <img onClick={() => deleteIcon(item.name, 2)} src={close} alt='close' />

                                <span>{infoFiles.length === 0 ? 'بارگزاری پیوست های اطلاعیه' : item.name}</span>
                            </Files>
                        )
                    })}
                </View>
            </CardSection>


            <Footer>
                <Button onClick={() => handleConditions(files.length === 0 || successVisible ? 0 : 1)}>
                    <span>
                        {files.length === 0 || successVisible ? 'افزودن مجمع' : 'بارگزاری فایل ها'}
                    </span>
                </Button>
            </Footer>


            <ModalComponent
                modalVisible={modalVisible}
                content={'.مجمع با موفقیت ثبت شد'}
                closeModal={() => setModalVisible(false)}
                hasError={false}
            />

            {loading ? <Loading /> : null}
        </div>
    );
};


const Title = styled.section`
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    display: flex;
    padding-right: 10px;
    margin-top: 10px;
    color: #fff;

    span {
        color: #fff;
        font-size: 16px;
    }

    img {
        width: 34px;
        height: 34px;
        margin-left: 16px;
    }
`;

const Line = styled.div`
    width: 100%;
    height: 12px;
    background: #04DA9A;
    border-radius: 8px 8px 0px 0px;
`;


const Success = styled.div`
    background: #3DFEC4;
    opacity: 0.4;
    border-radius: 8px;
    height: 80px;
    width: 100%;
    margin-top: 16px;
`;

const Button = styled.a`
    width: 50%;
    background: linear-gradient(266.53deg, #7B88FF 1%, #A17BF1 97.53%);
    border-radius: 8px; 
    height: 48px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    display: flex;

    span {
        color: #fff;
        font-size: 20px;

    }


    @media(max-width: 768px) {
        width: 100%;
        position: sticky;
        bottom: 0;
        left: 0;
    }
`;

const Files = styled.div`
    background: #B4BBFF;
    border-radius: 8px;
    padding-right: 3px;
    padding-left: 3px;
    align-items: center;
    flex-direction: row;
    display: flex;
    padding: 5px;
    width: 20%;


    span {
        font-size: 10px;
        color: #545772;

        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1; /* number of lines to show */
        line-clamp: 1;
        -webkit-box-orient: vertical;
    }

    img {
        width: 14px;
        height: 14px;
        cursor: pointer;
        margin-right: 5px;
    }
`;


const View = styled.div`
    flex-direction: row;
    display: flex;
    height: 48px;
    width: 50%;
    background: #545772;
    border-radius: 8px;
    margin-left: 10px;
    justify-content: space-between;
    align-items: center;
    padding-right: 16px;

    @media(max-width: 768px) {
        width: 100%;
        margin-top: 16px;
        margin-left: 0px;
    }
`;


const CardSection = styled.div`
    flex-direction: row;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 16px;

    @media(max-width: 768px) {
        flex-direction: column;
        margin: 0;
    }
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