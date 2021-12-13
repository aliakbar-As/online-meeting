import React, { useState } from 'react';


import user from '../../../../assets/mainScreens/user.png';
import downArrow from '../../../../assets/mainScreens/downArrow.png';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../../../components/Commons';

import './admin.css';

import backArrow from '../../../../assets/mainScreens/backArrow.png';
import infoIcon from '../../../../assets/mainScreens/info.png';
import pdf from '../../../../assets/mainScreens/pdf.png';
import excel from '../../../../assets/mainScreens/excel.png';
import info from '../../../../assets/mainScreens/info2.png';
import users from '../../../../assets/mainScreens/users.png';
import pin from '../../../../assets/mainScreens/pin.png';
import clock from '../../../../assets/mainScreens/clock.png';
import calender from '../../../../assets/mainScreens/calender.png';


const ForumInfo = (props) => {
    const [tabSelectedId, setTabSelectedId] = useState(0);
    const navigate = useNavigate();


    return (
        <div className="main">
            <TopView>
                <IconsDiv>
                    <UserIcon src={user} alt="user" />

                    <ArrowIcon src={downArrow} alt="downArrow" />
                </IconsDiv>

                <Back onClick={() => navigate(-1)} src={backArrow} alt="backArrow" />

            </TopView>


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
                            <span style={{ color: '#B4BBFF' }}> دریافت فایل پی دی اف </span>
                            <img src={pdf} alt="alt" />
                        </InnerView>

                        <InnerView>
                            <span style={{ color: '#B4BBFF' }}> دریافت فایل اکسل </span>
                            <img src={excel} alt="alt" />
                        </InnerView>

                        <InnerView>
                            <span style={{ color: '#B4BBFF' }}> پیوست های اطلاعیه </span>
                            <img src={info} alt="alt" />
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

            <div className="buttonContainer">
                <Button
                    onPress={() => console.log('online meeting')}
                    title={'ویرایش'} />
            </div>



            <CardTwo>

                <CardSection>
                    <span>تاریخ و ساعت پایان</span>

                    <div>
                        <img src={calender} alt="calender" />

                        <p>1400/08/27</p>
                    </div>

                    <div>
                        <img src={clock} alt="clock" />

                        <p>11:00</p>
                    </div>
                </CardSection>


                <CardSection>
                    <span>تاریخ و ساعت فروش</span>

                    <div>
                        <img src={calender} alt="calender" />

                        <p>1400/08/27</p>
                    </div>

                    <div>
                        <img src={clock} alt="clock" />

                        <p>11:00</p>
                    </div>
                </CardSection>

            </CardTwo>

            <div className="buttonContainer">
                <Button
                    onPress={() => console.log('online meeting')}
                    title={'ویرایش'} />
            </div>

            <Card>
                <Percent>
                    <span>درصد حضور</span>

                    <p>%    45 درصد</p>
                </Percent>


                <Count>

                    <span>تعداد نفرات حاظر</span>

                    <div>
                        <p>نفر 82 </p>
                        <img src={users} alt="users" />
                    </div>
                </Count>

                <Links>
                    <img src={downArrow} alt="downArrow" />

                    <div>
                        <p>لینک های مستندات مرتبط با مجمع</p>
                        <img src={pin} alt="users" />
                    </div>

                </Links>

            </Card>

            <Footer>

                <Election>
                    انتخابات
                </Election>

                <Button
                    primary
                    onPress={() => console.log('survey')}
                    title={'نظرسنجی'} />

            </Footer>


            <div className="buttonContainer">
                <Online>
                    مشاهده آنلاین
                </Online>
            </div>
        </div>
    );
};


const Online = styled.button`
    border-radius: 8px;
    border: 1px solid #7B88FF;
    background-color: transparent;

    color: #A87EFF;
    font-size: 20px;
    height: 48px;
    width: 33.5%;
    margin-top: 16px;
    cursor: pointer;
`;

const Election = styled.button`
    background: #6070FF;
    border-radius: 8px;
    width: 215px;
    height: 48px;
    color: #fff;
    font-size: 20px;
    cursor: pointer;

`;

const CardTwo = styled.div`
    align-items: center;
    justify-content: flex-end;
    flex-direction: row;
    display: flex;
    margin-bottom: 10px;
`;


const CardSection = styled.div`
    width: 20%;
    height: 150px;
    
    
    background: #2F3247;
    box-shadow: 0px 0px 15px rgba(35, 36, 45, 0.8);
    border-radius: 8px;
    position: relative;
    padding: 10px;

    margin-left: 10px;
    span {
        font-size: 15px;
        color: #B4BBFF;
        text-align: center;
    }

    div {
        margin-top: 10px;
        flex-direction: row;
        align-items: center;
        align-self: flex-start;
        display: flex;
        justify-content: flex-start;
        margin-left: 30%;
        height: 30%;
    }

    p {
        size: 15px;
        color: #7B88FF;
        margin-left: 10px;
        text-align: center;
    }
`;

const Footer = styled.div`
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    display: flex;
    margin-top: 20px;
    margin-bottom: 10px;
`;


const Back = styled.img`
    width: 48px;
    height: 48px;
    align-self: flex-end;
    cursor: pointer;
`;

const Percent = styled.div`
    height: 104px;
    width: 20%;
    /* background: #A87EFF; */
    opacity: 0.9;
    border-radius: 8px;
    text-align: center;

    align-items: center;
    flex-direction: column;
    justify-content: center;
    display: flex;
    cursor: pointer;

    border: 1px solid #A87EFF;

    color: #D2BDFF;

    span {
        font-weight: 300;
        font-size: 14px;
    }


    p {
        font-weight: bold;
        font-size: 20px;
    }

    &:hover {
        opacity: 1;
        transition: opacity 0.2s ease 0s;
    }
`;

const Count = styled.div`
    height: 104px;
    width: 20%;
    /* background: #7B88FF; */
    opacity: 0.9;
    border-radius: 8px;
    border: 1px solid #7B88FF;
    flex-direction: column;
    align-items: center;
    display: flex;
    padding-top: 10px;
    cursor: pointer;
    span {
        font-weight: 300;
        font-size: 14px;
        color: #B4BBFF;
    }

    div {
        flex-direction: row;
        align-items: center;
        display: flex;
        justify-self: center;
        text-align: center;
    }

    p {
        font-weight: bold;
        font-size: 20px;
        text-align: center;
        color: #B4BBFF;
    }

    img {
        width: 25px;
        height: 25px;
        margin-left: 10px;
    }

    &:hover {
        opacity: 1;
        transition: opacity 0.2s ease 0s;
    }
`;

const Links = styled.div`
    height: 104px;
    width: 58.8%;
    flex-direction: row;
    align-items: center;
    display: flex;
    background: #2F3247;
    box-shadow: 0px 0px 8px rgba(29, 29, 30, 0.8);
    border-radius: 8px;
    justify-content: space-between;

    align-self: flex-end;
    padding: 10px;
    cursor: pointer;
    
    div {
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        display: flex;
    }

    img {
        margin-left: 10px;
    }

    &:hover {
        opacity: 1;
        transition: opacity 0.2s ease 0s;
    }

`;

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
        margin-left: 16px;
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
    margin-bottom: 10px;
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


const ArrowIcon = styled.img`
    width: 13.33px;
    height: 8.23px;
    margin-left: 5px;
    cursor: pointer;
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
    /* cursor: pointer; */
`;


const TopView = styled.div`
    flex-direction: row;
    align-items: center;
    display: flex;
    justify-content: space-between;
`;

export default ForumInfo;