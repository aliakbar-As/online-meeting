import React, { useEffect, useState, useContext } from 'react';
import styled from "styled-components"
import { Header } from "../../../../Commons";

import './election.css';

import { useNavigate, useSearchParams } from 'react-router-dom';
import { MeetingProfileStore, MeetingStore } from "../../../../../Stores/MeetingStore";

import moment from 'moment-jalaali';

import StoreContext from '../../../../../Stores';


const ElectionDetails = (props) => {

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

    useEffect(() => {
        console.log('hrere', MeetingProfileStore.charts)
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
                <span>مجمع ها / انتخابات</span>
            </Info>

            <SurveyView>
                <span style={{ color: '#fff' }}>{moment(survey.startDatetime).format('jYYYY/jMM/jDD')}   -   {moment(survey.endDatetime).format('jYYYY/jMM/jDD')}</span>


                <span>{survey.title} | {survey.meetingTitle} <span style={{ fontSize: '12px', color: '#C6C9E0' }}> | در حال برگزاری</span></span>
            </SurveyView>


            {MeetingProfileStore.charts.length !== 0 ?
                <ChartView>
                    {MeetingProfileStore.charts.map((item, i) => {
                        return (
                            <Chart>
                                <p>{item.questionRank}_{item.questionTitle}</p>
                                {item.showSrvResults.map(item => (
                                    <View key={i}>
                                        <span>{item.percentageNumberAnswer}%</span>

                                        <ChartTheme
                                            percent={item.percentageNumberAnswer}
                                            onClick={() => getSurveyDetails(item.questionOptionId)}
                                            style={{ cursor: 'pointer', marginLeft: 10, width: 100, height: `${item.percentageNumberAnswer}%`, background: `rgb(255, 0, 0,${item.percentageNumberAnswer / 100})` }}
                                            />
                                        <span>{item.answerTitle}</span>
                                    </View>
                                ))}

                            </Chart>
                        )
                    })}
                </ChartView> :
                <Empty>در حال حاضر نظرسنجی موجود نمیباشد</Empty>
            }


            {list.length === 0 ? null :
                <Footer className="table">
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
                    </Content>

                    <Box>
                        <span>نام و نام خانوادگی کاندیدها</span>

                        {list.map((item, i) => (
                            <p key={i}>{item.answerTitle}</p>
                        ))}
                    </Box>
                </Footer>
            }

        </div>
    )
};

const ChartTheme = styled.div`
    cursor: pointer;
    margin-left: 10px;
    width: 100px;
    height: ${props => props.percent * 100}px;
    /* background: rgb(255, 0, 0,${props => props.percent}); */
    background: red;
    transform: rotate(180deg);
    
    
`;

const Footer = styled.div`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    @media(max-width: 768px) {
        flex-direction: column;
        width: 100%;
    }
`;

const Chart = styled.div`
    /* background-color: green; */
    width: 100%;
    justify-content: center;
    display: flex;
    flex-direction: column;
    text-align: right;
    direction: rtl;
    
    p {
        font-weight: bold;
        font-size: 16px;
    }
`;

const Empty = styled.div`
    width: 100%;
    margin-top: 50%;
    font-size: 18px;
    text-align: center;
    font-weight: bold;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    overflow-y: scroll;
    width: 55%;
    max-height: 250px;
    height: 250px;
    background: #2F3247;

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

    @media(max-width: 768px) {
        width: 100%;
    }
`;

const View = styled.div`
    margin-right: 5px;
    height: 400px;
    margin-top: 40px;
    /* transform: rotate(180deg); */
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const ChartView = styled.div`
    background: #2F3247;
    box-shadow: 0px 0px 8px rgba(29, 29, 30, 0.8);
    border-radius: 8px;
    padding: 16px;
    margin-top: 16px;
    flex-direction: row;
    align-items: center;
    display: flex;
    justify-content: center;

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

    @media(max-width: 768px) {
        width: 100%;
        margin-top: 16px;
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

        @media(max-width: 768px) {
            margin-bottom: 16px;
        }
    }

    @media(max-width: 768px) {
        flex-direction: column-reverse;
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
export default ElectionDetails;