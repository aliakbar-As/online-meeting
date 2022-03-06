import React, { useEffect, useState, useContext } from 'react';
import styled from "styled-components";
import { Header } from "../../../../Commons";

import { useNavigate } from 'react-router-dom';

import '../election/election.css';

import StoreContext from '../../../../../Stores';
import moment from 'moment-jalaali';
const SurveyDetails = (props) => {

    const navigate = useNavigate();

    const { MeetingProfileStore } = useContext(StoreContext);

    const [list, setList] = useState([]);

    const [survey, setSurvey] = useState({
        description: "",
        endDatetime: "",
        meetingTitle: "",
        startDatetime: "",
        surveyId: "",
        surveyStatus: 0,
        surveyType: 0,
        title: "",
    });

    const [toggle , setToggle] = useState(false);

    useEffect(() => {
        getSurveyInfo();
    }, []);

    const getSurveyInfo = () => {
        MeetingProfileStore.getElectionInfo(true).then(res => {
            setSurvey(res);
        });
    };

    const getSurveyDetails = (questionOptionId) => {
        MeetingProfileStore.showSurveyDetails(questionOptionId).then(res => {
            setList(res);
        });
    };


    return (
        <div className="main">
            <Header
                backOnclick={() => navigate(-1)}
            />


            <Info>
                <span>مجمع ها / نظرسنجی / نظرسنجی اول</span>
            </Info>

            <SurveyView>
                <span style={{ color: '#fff' }}>{moment(survey.startDatetime).format('jYYYY/jMM/jDD')}   -   {moment(survey.endDatetime).format('jYYYY/jMM/jDD')}</span>


                <span>{survey.title} | {survey.meetingTitle} <span style={{ fontSize: '12px', color: '#C6C9E0' }}> | در حال برگزاری</span></span>
            </SurveyView>

            <label className="switch">
                <input type="checkbox" value={toggle} onChange={e => setToggle(e.target.value)}/>
                <span className="slider round"></span>
            </label>

            <ChartView>
                {MeetingProfileStore.charts.map((item, i) => {
                    return (
                        <View key={i}>
                            <span>{item.percentageNumberAnswer}%</span>

                            <div
                                onClick={() => getSurveyDetails(item.questionOptionId)}
                                style={{ cursor: 'pointer', marginLeft: 10, width: 100, height: `${item.percentageNumberAnswer}%`, background: `rgb(255, 0, 0,${item.percentageNumberAnswer / 100})` }} />
                            <span>{item.answerTitle}</span>
                        </View>
                    )
                })}
            </ChartView>


            {list.length === 0 ? null :
                <Content>
                    <Table>
                        <Tr>
                            <Th>تاثیرگذاری رای</Th>
                            <Th>گزینه انتخابی</Th>
                            <Th><p>نام و نام خانوادگی </p></Th>
                        </Tr>
                        {list.map((item, i) => {
                            return (
                                <Tr key={i}>
                                    <Td>{item.percentageShares} %</Td>
                                    <Td>{item.optionRank}</Td>
                                    <Td><p>{item.voterFullName}</p></Td>
                                </Tr>
                            )
                        })}
                    </Table>
                </Content>}

        </div>
    )
}


const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    overflow-y: scroll;
    max-height: 250px;
    height: 250px;
    background: #2F3247;
    align-self: center;
    margin-top: 32px;
/* elevation 2 */

box-shadow: 0px 0px 8px rgba(29, 29, 30, 0.8);
border-radius: 8px;

    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-thumb {
        background: #7B88FF; 
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #7B88FF; 
    }
`;

const Box = styled.div`
    background: #2F3247;

    box-shadow: 0px 0px 8px rgba(29, 29, 30, 0.8);
    border-radius: 8px;
    width: 42%;
    height: 243px;
    padding: 10px;

    display: flex;
    align-items: flex-end;
    flex-direction: column;
    overflow-y: scroll;
    position: relative;

    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-thumb {
        background: #7B88FF; 
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #7B88FF; 
    }
`;

const View = styled.div`
    margin-right: 5px;
    height: 400px;
    margin-top: 40px;
    transform: rotate(180deg);
`;

const ChartView = styled.div`
    background: #2F3247;
    /* elevation 2 */

    box-shadow: 0px 0px 8px rgba(29, 29, 30, 0.8);
    border-radius: 8px;
    padding: 16px;
    margin-top: 16px;
    flex-direction: row;
    align-items: flex-start;
    display: flex;
    justify-content: center;
`;


const Add = styled.button`
    background: linear-gradient(266.53deg, #7B88FF 1%, #A17BF1 97.53%);
    border-radius: 8px;
    width: 450px;
    height: 48px;

    text-align: center;
    color: #fff;
    font-size: 18px;
    margin-top: 16px;

`;


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

    border-radius: 8px;

    padding: 10px;
`;


const SurveyView = styled.div`
    flex-direction: row;
    align-items: center;
    display: flex;
    justify-content: space-between;

    margin-top: 16px;
    

    
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

export default SurveyDetails;