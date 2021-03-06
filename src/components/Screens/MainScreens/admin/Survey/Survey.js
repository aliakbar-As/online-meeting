import React, { useContext, useState } from 'react';
import styled from "styled-components"
import { ModalComponent } from "../../../../Commons";


import left from '../../../../../assets/mainScreens/leftArrow.svg';
import './form.css';
import { useNavigate } from 'react-router-dom';

import StoreContext from '../../../../../Stores';

import moment from 'moment-jalaali';
import useWindowDimensions from '../../../../../Utils/Dimension';


const Survey = (props) => {
    const navigate = useNavigate();
    const { width } = useWindowDimensions();

    const { MeetingProfileStore, SurveyStore } = useContext(StoreContext);

    const [modalVisible, setModalVisible] = useState(false);
    const [showAlert, setShowAlert] = useState(false);


    const seeElectionInfo = (id) => {
        MeetingProfileStore.setSurveyId(id);
        navigate('/admin/survey/detail');
    };


    const editSurvey = (id) => {
        SurveyStore.setSurveyId(id);
        setShowAlert(true);
    };

    return (

        <div className="main">

            <SurveyView>
                <span>نظرسنجی ها</span>
            </SurveyView>


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
                                    <Td>

                                        {item.surveyStatus === 1 ? 'ایجاد شده'
                                            :
                                            item.surveyStatus === 2 ? 'در حال برگزاری'
                                                :
                                                "به پایان رسیده"}

                                    </Td>
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


            <div className="addButton">
                <Add onClick={() => navigate('/admin/survey/add')}>
                    افزودن نظرسنجی
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
                okOnclick={() => navigate('/admin/survey/editInfo')}
                cancelOnclick={() => navigate('/admin/survey/editQuestions')}
            />
        </div >
    )
}



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
    align-items: center;
    display: flex;
`;


const SeeMore = styled.div`
    flex-direction: row;
    align-items: center;
    display: flex;

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

export default Survey;