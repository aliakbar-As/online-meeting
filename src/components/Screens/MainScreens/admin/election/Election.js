import React, { useContext, useState } from 'react';
import styled from "styled-components"
import {ModalComponent } from "../../../../Commons";

import './election.css';

import left from '../../../../../assets/mainScreens/leftArrow.svg';

import { useNavigate } from 'react-router-dom';

import StoreContext from '../../../../../Stores';

import moment from 'moment-jalaali';
import useWindowDimensions from '../../../../../Utils/Dimension';

const Election = (props) => {
    const navigate = useNavigate();
    const { width } = useWindowDimensions();

    const { MeetingProfileStore, SurveyStore } = useContext(StoreContext);

    const [modalVisible, setModalVisible] = useState(false);
    const [showAlert, setShowAlert] = useState(false);


    const seeElectionInfo = (id) => {
        MeetingProfileStore.setSurveyId(id);

        MeetingProfileStore.getElectionInfo(true).then(res => {
            SurveyStore.resetSurveyInfo();
            navigate('/admin/election/detail');
        });
    };


    const editSurvey = (id) => {
        SurveyStore.setSurveyId(id);
        setShowAlert(true);
    };

    const addElectionOnclick = () => {

        navigate('/admin/election/add')
    };


    return (
        <div className="main">

            <SurveyView>
                <span>انتخابات</span>
            </SurveyView>


            {width > 768 ?
                <>
                    <div className="table">
                        <Table>
                            <Body>
                                <Tr>
                                    <Th>اقدامات</Th>
                                    <Th>وضعیت</Th>
                                    <Th>تاریخ</Th>
                                    <Th>تعداد آرا</Th>
                                    <Th>نام مجمع</Th>
                                    <Th><p>عنوان</p></Th>
                                </Tr>
                                {props.data.map(item => {
                                    return (
                                        <Tr key={item.surveyId}>
                                            <Td>
                                                <SeeMore onClick={() => seeElectionInfo(item.surveyId)}>
                                                    <img src={left} alt="arrow" />
                                                    <span style={{ color: '#04DA9A' }}>مشاهده</span>
                                                </SeeMore>
                                                <SeeMore onClick={() => editSurvey(item.surveyId)}>
                                                    <img src={left} alt="arrow" />
                                                    <span>ویرایش</span>
                                                </SeeMore>
                                            </Td>
                                            <Td>{item.surveyStatus === 1 ? 'ایجاد شده' : item.surveyStatus === 2 ? 'در حال برگزاری' : "به پایان رسیده"}</Td>
                                            <Td>{moment(item.startDatetime).format('jYYYY/jMM/jDD')}</Td>
                                            <Td>{item.countOfVotes}</Td>
                                            <Td>{item.meetingTitle}</Td>
                                            <Td><p>{item.title}</p></Td>
                                        </Tr>
                                    )
                                })}
                            </Body>
                        </Table>
                    </div>


                </>
                :
                <>
                    {props.data.map(item => (
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

                            <Section>
                                <SeeMore onClick={() => seeElectionInfo(item.surveyId)}>
                                    {/* <img src={left} alt="arrow" /> */}
                                    <span style={{ color: '#04DA9A' }}>مشاهده</span>
                                </SeeMore>
                                <SeeMore style={{ marginRight: '16px' }} onClick={() => editSurvey(item.surveyId)}>
                                    {/* <img src={left} alt="arrow" /> */}
                                    <span>ویرایش</span>
                                </SeeMore>
                            </Section>
                        </LittleCard>
                    ))}

                </>
            }

            <div className="addButton">
                <Add onClick={addElectionOnclick}>
                    افزودن انتخابات
                </Add>
            </div>
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
                okOnclick={() => navigate('/admin/election/editInfo')}
                cancelOnclick={() => navigate('/admin/election/editCondidate')}
            />
        </div>
    )
}


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
    width: width - 16px;
    align-items: flex-end;
    justify-content: center;
    display: flex;
    background-color: #2F3247;
    flex-direction: column;
    margin-top: 16px;
    padding-right: 10px;
    border-radius: 10px;
    padding-bottom: 10px;
`;

const Add = styled.a`
    background: linear-gradient(266.53deg, #7B88FF 1%, #A17BF1 97.53%);
    border-radius: 8px;
    width: 450px;
    height: 48px;

    text-align: center;
    color: #fff;
    font-size: 18px;
    margin-top: 16px;
    cursor: pointer;
    justify-content: center;
    display: flex;
    align-items: center;
`;


const SeeMore = styled.div`
    flex-direction: row;
    align-items: center;
    display: flex;
    direction: ltr;
    justify-content: center;
    cursor: pointer;

    span {
        color: #97A1FF;
        margin-left: 10px;
    }

    img {
        width: 12px;
        height: 12px;
    }
`;

const Body = styled.tbody``;

const Tr = styled.tr`
/* background-color: red; */
`;

const Th = styled.th`
    border-bottom: 1px solid #545772;

    color: #DDE0F3;
    font-size: 13px;
p {
        text-align: right;
    }
`;


const Td = styled.td`
    color: #EBEEFF;
    text-align: center;
    padding-top: 16px;
    border-bottom: 1px solid #545772;
    font-size: 16px;
    p {
        text-align: right;
    }
`;


const Table = styled.table`
    background: #2F3247;

    box-shadow: 0px 0px 8px rgba(29, 29, 30, 0.8);
    border-radius: 8px;
    /* width: 80%; */
    width: 100%;
    height: 243px;
    margin-top: 20px;
    padding: 10px;

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

const Info = styled.div`
    border-bottom: 1px solid #545772;
    text-align: right;
    margin-top: 16px;
    padding: 10px;
    /* margin-right: 20%; */
    /* margin-left: 20%; */

    span {
        color: #545772;
        font-size: 14px;
    }
`;
export default Election;