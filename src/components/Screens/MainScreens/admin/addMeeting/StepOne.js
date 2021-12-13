import React, { useState } from 'react';


import user from '../../../../../assets/mainScreens/user.png';
import downArrow from '../../../../../assets/mainScreens/downArrow.png';
import styled from 'styled-components';


import { Button, Input } from '../../../../Commons';


import backArrow from '../../../../../assets/mainScreens/backArrow.png';

import './meeting.css';
import { useNavigate } from 'react-router';

const StepOne = (props) => {
    const navigate = useNavigate();


    const [meetingInfo, setMeetingInfo] = useState({
        boss: '',
        secretary: '',
        observer: '',
        name: '',
        type: '',
        subject: '',
    });

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
                <span>افزودن مجمع <span className="stepOne">| مرحله اول</span></span>
            </SurveyView>


            <View>
                <Input
                    placeholder={'نام و نام خانوادگی منشی'}
                    type={'text'}
                    value={meetingInfo.secretary}
                />

                <Input
                    placeholder={'نام و نام خانوادگی رییس'}
                    type={'text'}
                    value={meetingInfo.boss}
                />
            </View>


            <View>
                <Input
                    placeholder={'نام مجمع'}
                    type={'text'}
                    value={meetingInfo.name}
                />

                <Input
                    placeholder={'نام و نام خانوادگی ناظر'}
                    type={'text'}
                    value={meetingInfo.observer}
                />
            </View>


            <View>
                <Input
                    placeholder={'موضوع مجمع'}
                    type={'text'}
                    value={meetingInfo.subject}
                />

                <Input
                    placeholder={'نوع مجمع'}
                    type={'text'}
                    value={meetingInfo.type}
                />
            </View>



            <Footer>
                <Button
                    primary
                    onPress={() => navigate('/admin/add/nextstep')}
                    title={'تایید و ادامه'} />

            </Footer>
        </div>
    );
};


const View = styled.div`
    display: flex;
    margin-top: 16px;
    justify-content: flex-end;
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


export default StepOne;