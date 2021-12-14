import styled from "styled-components"
import { Header } from "../../../../Commons";

import { useNavigate } from 'react-router-dom';

import '../election/election.css';

let chartItems = [
    {
        id: 0,
        title: 'نفر اول',
        percent: 20,
    },
    {
        id: 2,
        title: 'نفر دوم',
        percent: 10,
    },
    {
        id: 3,
        title: 'نفر سوم',
        percent: 5,
    },
    {
        id: 3,
        title: 'نفر چهارم',
        percent: 75,
    },
];

let tableItems = [
    {
        id: 1,
        title: 'عنوان انتخاب اول',
        meeting: 'عنوان نام مجمع',
        count: 1,
        date: '1400/08/01',
        status: 'در حال بارگزاری 1',
    },
    {
        id: 2,
        title: 'عنوان انتخاب دوم',
        meeting: 'عنوان نام مجمع2',
        count: 2,
        date: '1400/08/02',
        status: 'در حال بارگزاری 2',
    },
    {
        id: 3,
        title: 'عنوان انتخاب سوم',
        meeting: 'عنوان نام مجمع3',
        count: 3,
        date: '1400/08/03',
        status: 'در حال بارگزاری 3',
    },
    
];


const SurveyDetails = (props) => {

    const navigate = useNavigate();

    return (
        <div className="main">
            <Header
                backOnclick={() => navigate(-1)}
            />


            <Info>
                <span>مجمع ها / نظرسنجی / نظرسنجی اول</span>
            </Info>

            <SurveyView>
                <span style={{ color: '#fff' }}>02/08/1400   .   02/08/1400</span>


                <span>نظرسنجی اول | مجمع اول <span style={{ fontSize: '12px', color: '#C6C9E0' }}> | تمام شده</span></span>
            </SurveyView>



            <ChartView>
                {chartItems.map(item => {
                    return (
                        <View>
                            <span>{item.percent}%</span>

                            <div style={{ width: 100, height: `${item.percent}%`, backgroundColor: 'red' }}>

                            </div>


                            <span>{item.title}</span>
                        </View>
                    )
                })}
            </ChartView>



            <div className="table">
                <Table>
                    <Tr>
                        <Th>تاثیرگذاری رای</Th>
                        <Th>گزینه انتخابی</Th>
                        <Th><p>نام و نام خانوادگی </p></Th>
                    </Tr>
                    {tableItems.map(item => {
                        return (
                            <Tr>
                                <Td>{item.id} %</Td>
                                <Td>{item.id}</Td>
                                <Td><p>{item.title}</p></Td>
                            </Tr>
                        )
                    })}
                </Table>
            </div>
        </div>
    )
}

const View = styled.div`
    margin-right: 5px;
    height: 414px;
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

    box-shadow: 0px 0px 8px rgba(29, 29, 30, 0.8);
    border-radius: 8px;
    /* width: 80%; */
    width: 922px;
    height: 243px;
    margin-top: 20px;
    padding: 10px;

    overflow-y: 'scroll'
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