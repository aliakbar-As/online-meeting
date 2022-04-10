import React, { useContext, useState, useEffect } from 'react';
import styled from "styled-components"
import { Header, Loading, ModalComponent } from "../../../../Commons";


import './form.css';
import { useNavigate } from 'react-router-dom';

import StoreContext from '../../../../../Stores';

import moment from 'moment-jalaali';

import left from '../../../../../assets/mainScreens/leftArrow.svg';


const SurveyMobile = (props) => {

    const navigate = useNavigate();

    const { MeetingProfileStore, SurveyStore } = useContext(StoreContext);

    const [modalVisible, setModalVisible] = useState(false);
    const [surveyData, setSurveyData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        setLoading(true);

        MeetingProfileStore.getSurvey(false, 1, 'admin').then(res => {
            setLoading(false);
            setSurveyData(res);
        });
    }, []);


    const seeElectionInfo = (id) => {
        MeetingProfileStore.setSurveyId(id);
        navigate('/admin/survey/detail');
    };


    const editSurvey = (id) => {
        SurveyStore.setSurveyId(id);
        setShowAlert(true);
    };

    return (
        <div>

            <div style={{ padding: 10 }}>
                <Header backOnclick={() => navigate(-1)} />
            </div>

            <Info>
                <span>مجمع ها / نظرسنجی ها</span>
            </Info>

            {surveyData.map(item => (
                <LittleCard key={item.surveyId}>
                    <Section>
                        <span>عنوان : </span>
                        <p> {item.title}</p>
                    </Section>

                    <Section>
                        <span>نام مجمع : </span>
                        <p>{item.meetingTitle}</p>
                    </Section>

                    <Section>
                        <span>تعداد آرا : </span>
                        <p>{item.countOfVotes} نفر</p>
                    </Section>

                    <Section>
                        <span>تاریخ : </span>
                        <p>{moment(item.startDatetime).format('jYYYY/jMM/jDD')}</p>
                    </Section>

                    <Section>
                        <span>وضعیت : </span>
                        <p>{item.surveyStatus === 1 ? 'ایجاد شده' : item.surveyStatus === 2 ? 'در حال برگزاری' : "به پایان رسیده"}</p>
                    </Section>

                    <SeeMore onClick={() => editSurvey(item.surveyId)}>
                        <p >ویرایش</p>

                        <p onClick={() => seeElectionInfo(item.surveyId)}>مشاهده</p>
                    </SeeMore>
                </LittleCard>
            ))}

            <Add onClick={() => navigate('/admin/survey/add')}>افزودن نظرسنجی</Add>


            <ModalComponent
                modalVisible={modalVisible}
                closeModal={() => setModalVisible(false)}
                content={'انتخابات با موفقیت ثبت شد.'}
            />

            <ModalComponent
                modalVisible={showAlert}
                alert
                cancelTitle={'ویرایش پرسشنامه'}
                okTitle={'ویرایش اطلاعات'}
                closeModal={() => setShowAlert(false)}
                content={': لطفا یکی از گزینه های زیر را انتخاب کنید'}
                okOnclick={() => navigate('/admin/survey/editInfo')}
                cancelOnclick={() => navigate('/admin/survey/editQuestions')}
            />

            {loading ? <Loading /> : null}
        </div>
    );
}


const Add = styled.a`
    background: linear-gradient(266.53deg, #7B88FF 1%, #A17BF1 97.53%);
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    height: 48px;
    width: 100%;
    text-align: center;
    color: #fff;
    font-size: 18px;
    margin-top: 16px;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    display: flex;
    position: sticky;
    bottom: 0;
`;

const SeeMore = styled.div`
    flex-direction: row;
    align-items: center;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    color: #97A1FF;
    font-size: 20px;
    margin-top: -16px;
    width: 100%;
    z-index: 0;

    p {
        margin-left: 10px;
    }

    img {
        width: 12px;
        height: 12px;
    }
`;
const Section = styled.div`
    flex-direction: row;
    align-items: center;
    width: 100%;
    justify-content: flex-start;
    display: flex;
    direction: rtl;
    font-size: 16px;

    span {
        color: #DDE0F3;
        margin-left: 10px;
    }
    p {
        color: #EBEEFF;
    }
`;

const LittleCard = styled.div`
    width: 95%;
    align-items: flex-end;
    justify-content: center;
    display: flex;
    background-color: #2F3247;
    flex-direction: column;
    margin: auto;
    margin-top: 10px;
    padding-right: 10px;
    border-radius: 10px;
    padding-bottom: 10px;
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
export default SurveyMobile;