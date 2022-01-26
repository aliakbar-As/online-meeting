import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import user from '../../../../assets/mainScreens/user.png';
import downArrow from '../../../../assets/mainScreens/downArrow.png';
import styled from 'styled-components';

import './form.css';

import StoreContext from '../../../../Stores';

import moment from 'moment-jalaali';

import backArrow from '../../../../assets/mainScreens/backArrow.png';
import infoIcon from '../../../../assets/mainScreens/info.png';
import pdf from '../../../../assets/mainScreens/pdf.png';
import excel from '../../../../assets/mainScreens/excel.png';
import info from '../../../../assets/mainScreens/info2.png';
import users from '../../../../assets/mainScreens/users.png';
import pin from '../../../../assets/mainScreens/pin.png';
import { Button } from '../../../../components/Commons';

import clock from '../../../../assets/mainScreens/clock.png';
import calender from '../../../../assets/mainScreens/calender.png';

const FormInfo = (props) => {
    const navigate = useNavigate();

    const { MeetingProfileStore } = useContext(StoreContext);

    const [percent, setPercent] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        MeetingProfileStore.getAttendanceMeeting().then(res => {
            setPercent(res.percentagAttendance);
            setCount(res.countOfPresent);
        });

    }, []);


    const serveyOnclick = () => {
        console.clear();
        MeetingProfileStore.getSurvey(true, 2).then(res => {
            navigate('/form/info/survey');
        });
    };


    const leaveMeeting = () => {
        MeetingProfileStore.leaveMeeting().then(() => {
            navigate(-1);
        });
    };


    return (
        <div className="main">
            
            <ShortDescription>
                {MeetingProfileStore.meetingDetails.description}
            </ShortDescription>

            <Card>
                <CardSectionTwo>

                    <InfoView>
                        <LogoView>
                            <span>{MeetingProfileStore.meetingDetails.holderCompanyTitle}</span>

                            <img src={MeetingProfileStore.meetingDetails.companyImageUrl} alt="alt" />
                        </LogoView>

                        <span style={{ color: '#A7AAC6' }}>{MeetingProfileStore.meetingDetails.tickerSymbol}  : کد </span>

                        <span>
                            {/* {moment(MeetingProfileStore.meetingDetails.holdingDatetime).format('jYYYY/jMM/jDD')} */}
                        </span>

                    </InfoView>


                    <View>
                        <p>مجمع سالیانه {MeetingProfileStore.meetingDetails.holderCompanyTitle}</p>


                        <span>بازار بورس : <span style={{ color: '#B4BBFF' }}> {MeetingProfileStore.meetingDetails.stockMarketTitle} </span></span>

                        <span>گروه صنعت : <span style={{ color: '#B4BBFF' }}> {MeetingProfileStore.meetingDetails.industryGroupTitle} </span></span>
                        <span>نام مدیر عامل : <span style={{ color: '#B4BBFF' }}> {MeetingProfileStore.meetingDetails.ceoTitle} </span></span>
                        <span>حجم مبنا : <span style={{ color: '#B4BBFF' }}> {MeetingProfileStore.meetingDetails.baseVolume} </span></span>

                        <span style={{ color: '#B4BBFF' }}> {MeetingProfileStore.meetingDetails.companyDescription} </span>

                    </View>

                </CardSectionTwo>


                <CardSectionOne>

                    <CardSectionInfo>
                        <span>اطلاعات مجمع</span>

                        <img src={infoIcon} alt="alt" />
                    </CardSectionInfo>


                    <View>
                        {MeetingProfileStore.meetingDetails.meetingUserDuties.map(item => (
                            <span key={item.id}>{item.dutyTitle} : <span style={{ color: '#B4BBFF' }}> {item.stockholderName} </span></span>
                        ))}
                    </View>
                </CardSectionOne>

            </Card>


            <Card>

                <DateView>
                    <CardSection>
                        <span>تاریخ و ساعت پایان</span>

                        <div>
                            <img src={calender} alt="calender" />

                            <p>{moment(MeetingProfileStore.meetingDetails.endDatetime).format('jYYYY/jMM/jDD')}</p>
                        </div>

                        <div>
                            <img src={clock} alt="clock" />

                            <p>{moment(MeetingProfileStore.meetingDetails.endDatetime).format('HH:MM')}</p>
                        </div>
                    </CardSection>


                    <CardSection>
                        <span>تاریخ و ساعت فروش</span>

                        <div>
                            <img src={calender} alt="calender" />

                            <p>{moment(MeetingProfileStore.meetingDetails.holdingDatetime).format('jYYYY/jMM/jDD')}</p>
                        </div>

                        <div>
                            <img src={clock} alt="clock" />

                            <p>{moment(MeetingProfileStore.meetingDetails.holdingDatetime).format('HH:MM')}</p>
                        </div>
                    </CardSection>

                </DateView>


                <Links>

                    <div>
                        <p>لینک های مستندات مرتبط با مجمع</p>
                        <img src={pin} alt="users" />
                    </div>


                    {MeetingProfileStore.meetingDetails.meetingDocuments.map((item, i) => (
                        <InnerView key={i} href={item.fileUri} download>
                            <span style={{ color: '#B4BBFF' }}> دریافت فایل {item.documentType === 2 ? 'پی دی اف' : item.documentType === 3 ? 'اکسل' : 'اطلاعیه'} </span>
                            <img src={item.documentType === 2 ? pdf : item.documentType === 3 ? excel : info} alt="alt" />
                        </InnerView>
                    ))}

                </Links>

            </Card>


            <FooterCard>
                <Percent>
                    <span>درصد حضور</span>

                    <InnerPercent>
                        <p> درصد </p> <p> {percent}      %        </p>
                    </InnerPercent>
                </Percent>


                <Count>
                    <span>تعداد نفرات حاظر</span>

                    <div>
                        <p>نفر {count} </p>
                        <img src={users} alt="users" />
                    </div>
                </Count>
            </FooterCard>


            <Footer>
                <Button
                    onPress={() => console.log('online meeting')}
                    title={'مشاهده آنلاین'} />

                <Button
                    primary
                    onPress={serveyOnclick}
                    title={'انتخابات و نظرسنجی'} />

            </Footer>


            <Exit onClick={leaveMeeting}>
                خروج
            </Exit>
        </div>
    );
};


const FooterCard = styled.div`
    align-items: center;
    justify-content: flex-end;
    flex-direction: row;
    display: flex;
    margin-bottom: 20px;
`;


const CardSection = styled.div`
    width: 45%;
    height: 150px;
    
    border-radius: 8px;
    position: relative;
    padding: 10px;

    /* margin-left: 10px; */
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

const DateView = styled.div`
    flex-direction: row;
    align-items: center;
    display: flex;

    width: 45%;
    height: 150px;
    background: #2F3247;
    box-shadow: 0px 0px 15px rgba(35, 36, 45, 0.8);
    border-radius: 8px;

`;


const InnerPercent = styled.div`
    flex-direction: row;
    align-items: center;
    display: flex;
    
    p {
        margin-left: 10px;
    }
`;

const Exit = styled.div`
    font-size: 20px;

    text-align: right;
text-decoration: underline;
    color: #FF4651;
    margin-top: 3%;
    cursor: pointer;
`;

const Footer = styled.div`
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    display: flex;
`;


const Back = styled.img`
    width: 48px;
    height: 48px;
    align-self: flex-end;
`;

const Percent = styled.div`
    height: 130px;
    width: 25%;
    border-radius: 8px;
    text-align: center;
    padding-top: 20px;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    display: flex;

    opacity: 0.9;
    border: 1px solid #A87EFF;
    box-sizing: border-box;
    /* padding-top: 10px; */

    span {
        font-weight: 300;
        font-size: 20px;
        color: #D2BDFF;
    }


    p {
        font-weight: bold;
        font-size: 25px;
        color: #D2BDFF;
    }

    &:hover {
        opacity: 1;
        transition: opacity 0.2s ease 0s;
    }
`;

const Count = styled.div`
    height: 130px;
    width: 25%;
    margin-left: 16px;
    flex-direction: column;
    align-items: center;
    display: flex;
    padding-top: 20px;

    opacity: 0.9;
    border: 1px solid #7B88FF;
    box-sizing: border-box;
    border-radius: 8px;

    span {
        font-weight: 300;
        font-size: 20px;
        color: #D2BDFF;

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
        font-size: 25px;
        text-align: center;
        color: #D2BDFF;

    }

    img {
        width: 30px;
        height: 30px;
        margin-left: 10px;
    }

    &:hover {
        opacity: 1;
        transition: opacity 0.2s ease 0s;
    }
`;

const Links = styled.div`
    width: 53%;
    align-items: flex-end;
    background: #2F3247;
    box-shadow: 0px 0px 8px rgba(29, 29, 30, 0.8);
    border-radius: 8px;
    justify-content: flex-end;

    align-self: flex-start;
    padding: 10px;
    display: flex;
    flex-direction: column;
    
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

const InnerView = styled.a`
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    display: flex;

    span {
        text-decoration: underline;
        font-size: 15px;
        margin-left: 16px;
    }

    img {
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
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    text-align: right;
    padding: 10px;
    display: flex;
    
    span {
        font-size: 18px;
        margin-bottom: 10px;
    }

    p {
        font-size: 20px;
        color: #DDE0F3;

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


const Tab = styled.div`
    width: 28.3%;   
    cursor: pointer;
    text-align: center;
    padding: 10px;
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

export default FormInfo;