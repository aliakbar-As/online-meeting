import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment-jalaali';

import StoreContext from '../../../../Stores';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../../../Commons';

const OngoingEvents = (props) => {
    const { MeetingStore, MeetingProfileStore } = useContext(StoreContext);

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();



    const handleMeetingDetails = (id) => {

        setLoading(true);
        MeetingProfileStore.setMettingId(id);
        MeetingProfileStore.getMeetingDetails(id).then(() => {
            navigate('/form/info');
            setLoading(false);
        });

    };

    return (
        <Main>
            {MeetingStore.data.map((item, index) => {
                let date = moment(item.holdingDatetime).format('jYYYY/jMM/jDD');

                return (
                    <Table key={item.id}>
                        <Wrap>
                            <Logo src={item.companyImageUrl} alt={item.id} />
                            <span style={{ color: '#EBEEFF', fontSize: 14 }}>{item.title}</span>
                            <span style={{ color: '#DDE0F3', fontSize: 14 }}>{item.holderCompanyTitle}</span>
                            <span style={{ color: '#A7AAC6', fontSize: 13 }}>{item.tickerSymbol} : کد</span>
                            <span style={{ color: '#E7E9FF', fontSize: 14 }}>{date}</span>
                        </Wrap>

                        <Button onClick={() => handleMeetingDetails(item.id)}>مشاهده مجمع</Button>
                    </Table>
                )
            })}

        </Main>
    );
};


const Wrap = styled.div`
    flex-direction: row-reverse;
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;

    @media(min-width: 768px) {
        padding-left: 20px;
    }
`;
const Button = styled.button`
    background: linear-gradient(266.53deg, #7B88FF 1%, #A17BF1 97.53%);
    border-radius: 8px;
    border: 1px solid #7B88FF;
    text-align: center;
    color: #fff;
    width: 215px;
    height: 48px;
    font-size: 20px;
    cursor: pointer;

    @media(max-width: 768px) {
        margin-top: 32px;
        width: 148px;
    }
`;

const Logo = styled.img`
    width: 60px;
    height: 60px;
    border-radius: 100%;

    @media(max-width: 768px) {
        width: 30px;
        height: 30px;
    }
`;

const Table = styled.div`
    flex-direction: row-reverse;
    align-items: center;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #545772;
    padding-bottom: 10px;
    padding-top: 10px;
    padding: 10px;


    @media(max-width: 768px) {
        flex-direction: column;
        align-items: flex-end;
    }
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