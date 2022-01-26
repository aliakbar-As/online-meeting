import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment-jalaali';

import StoreContext from '../../../../Stores';
import { useNavigate } from 'react-router-dom';

const OngoingEvents = (props) => {
    const { MeetingStore, MeetingProfileStore } = useContext(StoreContext);

    const navigate = useNavigate();


    const handleMeetingDetails = (id) => {
        MeetingProfileStore.setMettingId(id);
        MeetingProfileStore.getMeetingDetails(id).then(() => {
            navigate('/admin/info');
        });
    };


    return (
        <Main>
            {MeetingStore.data.map((item, index) => {
                let date = moment(item.holdingDatetime).format('jYYYY/jMM/jDD');

                return (
                    <Table key={index}>
                        <Logo src={item.companyImageUrl} alt={item.id} />
                        <span style={{ color: '#EBEEFF', fontSize: 14 }}>{item.title}</span>
                        <span style={{ color: '#DDE0F3', fontSize: 14 }}>{item.holderCompanyTitle}</span>
                        <span style={{ color: '#A7AAC6', fontSize: 13 }}>{item.tickerSymbol} : کد</span>
                        <span style={{ color: '#E7E9FF', fontSize: 14 }}>{date}</span>


                        <Button onClick={() => handleMeetingDetails(item.id)}>
                            مشاهده و ویرایش
                        </Button>
                    </Table>
                )
            })}


            <AddMeeting onClick={() => navigate('/admin/add')}>
                افزودن مجمع
            </AddMeeting>
        </Main>
    );
};


const AddMeeting = styled.div`
    background: linear-gradient(266.53deg, #7B88FF 1%, #A17BF1 97.53%);
    border-radius: 8px;
    width: 40%;
    height: 48px;
    text-align: center;
    justify-content: center;
    align-self: flex-end;
    align-items: center;
    display: flex;
    margin: 10px;
    margin-top: 16px;
    margin-bottom: 10px;
    cursor: pointer;
`;

const Button = styled.button`
    background: transparent;
    border-radius: 8px;
    border: 1px solid #7B88FF;
    text-align: center;
    color: #A87EFF;
    width: 215px;
    height: 48px;
    font-size: 20px;
    cursor: pointer;
`;

const Logo = styled.img`
    width: 60px;
    height: 60px;
    border-radius: 100%;
`;

const Table = styled.div`
    flex-direction: row-reverse;
    align-items: center;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #545772;
    padding-bottom: 10px;
    padding-top: 10px;
    padding: 10px

`;

const Main = styled.main`
    margin-top: 3%;
    margin-bottom: 5%;
    margin-right: 3%;
    margin-left: 3%;
    background: #2F3247;
    box-shadow: 0px 0px 8px rgba(29, 29, 30, 0.8);
    border-radius: 8px;
    padding-bottom: 10px;
    display: flex;
    flex-direction: column;
`;

export default OngoingEvents;