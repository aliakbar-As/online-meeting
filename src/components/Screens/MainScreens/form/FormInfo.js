import React, { useState } from 'react';


import user from '../../../../assets/mainScreens/user.png';
import downArrow from '../../../../assets/mainScreens/downArrow.png';
import styled from 'styled-components';

import './form.css';

import infoIcon from '../../../../assets/mainScreens/info.png';
import pdf from '../../../../assets/mainScreens/pdf.png';
import excel from '../../../../assets/mainScreens/excel.png';
import info from '../../../../assets/mainScreens/info2.png';

let tabs = [
    {
        id: 2,
        title: 'رویداد های لغو شده'
    },
    {
        id: 1,
        title: 'رویداد های آینده'
    },
    {
        id: 0,
        title: 'رویداد های در حال برگذاری'
    },
];


const FormInfo = (props) => {
    const [tabSelectedId, setTabSelectedId] = useState(0);


    return (
        <div className="main">
            <TopView>
                <IconsDiv>
                    <UserIcon src={user} alt="user" />

                    <ArrowIcon src={downArrow} alt="downArrow" />
                </IconsDiv>


                <TabContainer>
                    {tabs.map((item, index) => {
                        return (
                            <Tab
                                key={item.id}
                                style={{ borderBottom: tabSelectedId === item.id ? '4px solid #97A1FF' : '1px solid #fff' }}
                                onClick={() => setTabSelectedId(item.id)}>
                                <span style={{ color: tabSelectedId === item.id ? '#97A1FF' : '#fff' }}>
                                    {item.title}
                                </span>
                            </Tab>
                        )
                    })}
                </TabContainer>

            </TopView>

            {tabSelectedId === 0 ?

                <>
                    <Info>
                        <span>مجمع ها / مجمع تست</span>
                    </Info>

                    <ShortDescription>
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است
                    </ShortDescription>

                    <Card>
                        <CardSectionTwo>

                            <InfoView>
                                <LogoView>
                                    <span>تامین سرمایه امین</span>

                                    <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAHXPluq6GtTRPDIHRv5kJPy86uFjp5sO7hg&usqp=CAU'} alt="alt" />
                                </LogoView>

                                <span style={{ color: '#A7AAC6' }}> کد : 66-ن </span>

                                <span> 1400/08/29 </span>

                            </InfoView>


                            <View>
                                <span>مجمع سالیانه شرکت سرمایه امین</span>

                                <InnerView>
                                    <img src={pdf} alt="alt" />
                                    <span style={{ color: '#B4BBFF' }}> دریافت فایل پی دی اف </span>
                                </InnerView>

                                <InnerView>
                                    <img src={excel} alt="alt" />
                                    <span style={{ color: '#B4BBFF' }}> دریافت فایل اکسل </span>
                                </InnerView>

                                <InnerView>
                                    <img src={info} alt="alt" />
                                    <span style={{ color: '#B4BBFF' }}> پیوست های اطلاعیه </span>
                                </InnerView>



                            </View>

                        </CardSectionTwo>


                        <CardSectionOne>

                            <CardSectionInfo>
                                <span>اطلاعات مجمع</span>

                                <img src={infoIcon} alt="alt" />
                            </CardSectionInfo>


                            <View>
                                <span>رئیس : <span style={{ color: '#B4BBFF' }}> محمد لواسانی </span></span>

                                <span>منشی : <span style={{ color: '#B4BBFF' }}> امیرحسین سجادی </span></span>

                                <span>موضوع : <span style={{ color: '#B4BBFF' }}> موضوع مجمع اول </span></span>

                                <span>شرکت برگزار کننده : <span style={{ color: '#B4BBFF' }}> های وب </span></span>

                                <span>نوع مجمع : <span style={{ color: '#B4BBFF' }}> هفتگی </span></span>
                            </View>
                        </CardSectionOne>

                    </Card>
                </>

                : null}
        </div>
    );
};


const InnerView = styled.div`
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    display: flex;

    span {
        text-decoration: underline;
        font-size: 15px;
        margin-left: 16px;
        cursor: pointer;
    }

    img {
        margin-top: 16px;
        margin-right: auto;
        padding: 5px;
        border-radius: 100%;
        background-color: white;
        width: 30px;
        height: 30px;
    }
`;


const LogoView = styled.div`
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    display: flex;
    
    span {
        font-size: 16px;
        color: #EBEEFF;
        text-align: right;
    }

    img {
        width: 40px;
        height: 40px;
        border-radius: 100%;
        margin-left: 10px;
    }

    
`;


const InfoView = styled.div`
    flex-direction: row-reverse;
    align-items: center;
    justify-content: space-between;
    display: flex;
`;



const View = styled.div`
    font-size: 15px;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    text-align: right;
    padding: 10px;
    display: flex;
    
    span {
        margin-top: 20px;
    }
`;


const CardSectionTwo = styled.div`
    width: 68.43%;
    height: 337px;
    background: #2F3247;
    box-shadow: 0px 0px 15px rgba(35, 36, 45, 0.8);
    border-radius: 8px;
    padding: 10px
`;

const CardSectionOne = styled.div`
    width: 30%;
    height: 337px;
    background: #2F3247;
    box-shadow: 0px 0px 15px rgba(35, 36, 45, 0.8);
    border-radius: 8px;
`;

const Card = styled.div`
    align-items: center;
    justify-content: space-around;
    flex-direction: row;
    display: flex;
`;

const CardSectionInfo = styled.div`
    text-align: center;
    align-items: flex-end;
    border-bottom: 1px solid #7B88FF;
    flex-direction: row;
    justify-content: flex-end;
    display: flex;
    padding: 10px;

    span {
        font-size: 16px;
        color: #97A1FF;
        margin-right: 10px;
    }

    img {
        width: 25px;
        height: 25px;
    }
`;


const ShortDescription = styled.p`
    color: #A7AAC6;
    text-align: right;
    font-size: 16px;
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


const Tab = styled.div`
    width: 28.3%;   
    cursor: pointer;
    text-align: center;
    padding: 10px;
`;


const TabContainer = styled.div`
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    width: 85%;
    display: flex;
    /* background-color: red; */
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
`;

const styles = {
    tabContainer: {
        flexDirection: 'row', alignItems: 'center',
        justifyContent: 'flex-end',
        display: 'flex',
        width: '80%'
    },
};

export default FormInfo;