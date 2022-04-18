import React, { useEffect, useState, useContext } from 'react';
import styled from "styled-components";
import { Header } from "../../../../Commons";

import { useNavigate } from 'react-router-dom';

import '../election/election.css';

import StoreContext from '../../../../../Stores';
import moment from 'moment-jalaali';
import useWindowDimensions from '../../../../../Utils/Dimension';
const SurveyDetails = (props) => {

    const navigate = useNavigate();
    const { width } = useWindowDimensions();
    const { MeetingProfileStore } = useContext(StoreContext);

    const [list, setList] = useState([]);

    const [selectedId, setSelectedId] = useState(0);

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

    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        getSurveyInfo();
    }, []);

    const getSurveyInfo = () => {
        MeetingProfileStore.getElectionInfo(true).then(res => {
            setSurvey(res);
        });
    };

    const getSurveyDetails = (questionOptionId, id) => {
        setSelectedId(id);
        MeetingProfileStore.showSurveyDetails(questionOptionId).then(res => {
            setList(res);
        });
    };


    return (
        <div>
            <div style={{ padding: '10px' }}>
                <Header
                    backOnclick={() => navigate(-1)}
                />
            </div>

            <Info>
                <span>مجمع ها / نظرسنجی / نظرسنجی اول</span>
            </Info>

            <SurveyView>
                <span style={{ color: '#fff' }}>{moment(survey.startDatetime).format('jYYYY/jMM/jDD')}   -   {moment(survey.endDatetime).format('jYYYY/jMM/jDD')}</span>


                <span>{survey.title} | {survey.meetingTitle} <span style={{ fontSize: '12px', color: '#C6C9E0' }}> | در حال برگزاری</span></span>
            </SurveyView>

            <Switch >
                <p>بر اساس تعداد نفرات</p>
                <label className="switch">
                    <input type="checkbox" value={toggle} onChange={e => setToggle(!toggle)} />
                    <span className="slider round"></span>
                </label>
                <p>بر اساس درصد سهام</p>
            </Switch>

            {MeetingProfileStore.charts.length !== 0 ?
                <ChartView>
                    {MeetingProfileStore.charts.map((item, index) => {
                        return (
                            <>
                                <Chart key={index}>
                                    <p>{item.questionRank}_ {item.questionTitle}</p>

                                    <InnderChart>
                                        {item.showSrvResults.map((data, i) => (
                                            <Item >
                                                <span>{toggle ? data.percentageSharesAnswer.toFixed(2) : data.percentageNumberAnswer}%</span>

                                                <View key={i}>

                                                    <ChartTheme
                                                        percent={data.percentageNumberAnswer}
                                                        onClick={() => getSurveyDetails(data.questionOptionId, item.questionRank)}
                                                        style={{ cursor: 'pointer', marginLeft: 10, width: '100px', height: `${toggle ? data.percentageSharesAnswer : data.percentageNumberAnswer}%`, background: `rgb(255, 0, 0,${toggle ? data.percentageSharesAnswer : data.percentageNumberAnswer / 100})` }}
                                                    />
                                                </View>
                                                <span>{data.answerTitle}</span>
                                            </Item>

                                        ))}
                                    </InnderChart>
                                </Chart>
                                {selectedId === item.questionRank ?
                                    <Content>
                                        <Table>
                                            <Tr>
                                                {!toggle ? null : <Th>تاثیرگذاری رای</Th>}
                                                <Th>گزینه انتخابی</Th>
                                                <Th><p>نام و نام خانوادگی </p></Th>
                                            </Tr>
                                            {list.map((item, i) => {
                                                return (
                                                    <Tr key={i}>
                                                        {/* <Td>{item.percentageShares} %</Td> */}
                                                        {!toggle ? null : <Td>{item.percentageShares} %</Td>}

                                                        <Td>{item.optionRank}</Td>
                                                        <Td><p>{item.voterFullName}</p></Td>
                                                    </Tr>
                                                )
                                            })}
                                        </Table>
                                    </Content> : null}

                            </>
                        )
                    })}
                </ChartView> :
                <Empty>در حال حاضر نظرسنجی موجود نمیباشد</Empty>
            }




        </div>
    )
}

const Switch = styled.div`
    flex-direction: row;
    display: flex;
    align-items: center;
    justify-content: center;

    p {
        margin-right: 10px;
        margin-left: 10px;
    }
`;

const Item = styled.div`
    flex-direction: column;
    display: flex;
    align-items: center;
    padding-top: 5px;
    height: inherit;

    span {
        margin-top: 16px;
    }
`;


const InnderChart = styled.div`
flex-direction: row;
align-items: center;
display: flex;
justify-content: flex-end;
`;

const Chart = styled.div`
    background: #2F3247;

    box-shadow: 0px 0px 8px rgba(29, 29, 30, 0.8);
    border-radius: 8px;
    width: 100%;
    justify-content: flex-end;
    display: flex;
    flex-direction: column;
    text-align: right;
    margin-top: 16px;
    box-shadow: 0px 0px 8px rgba(29, 29, 30, 0.8);
    padding: 10px;
    direction: rtl;
    overflow-x: scroll;
    position: relative;

    p {
        font-weight: bold;
        font-size: 16px;
    }


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

const Empty = styled.div`
    width: 100%;
    margin-top: 50%;
    font-size: 18px;
    text-align: center;
    font-weight: bold;
`;

const ChartTheme = styled.div`
    cursor: pointer;
    margin-left: 10px;
    width: 100px;
    height: ${props => props.percent * 100};
    /* background: rgb(255, 0, 0,${props => props.percent}); */
    background: red;
    transform: rotate(180deg);
    display: flex;
    
    
`;
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


const View = styled.div`
    margin-right: 5px;
    height: 400px;
    margin-top: 40px;
    transform: rotate(180deg);


    span {
        flex: 1px,
    }
`;

const ChartView = styled.div`
    /* background: #2F3247; */
    /* elevation 2 */

    /* box-shadow: 0px 0px 8px rgba(29, 29, 30, 0.8); */
    border-radius: 8px;
    padding: 16px;
    margin-top: 16px;
    flex-direction: column;
    align-items: flex-start;
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

export default SurveyDetails;