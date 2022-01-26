import React, { useEffect, useState } from 'react';
import styled from "styled-components"
import { Header, ModalComponent } from "../../../../Commons";

import './election.css';

import left from '../../../../../assets/mainScreens/leftArrow.svg';

import { useNavigate } from 'react-router-dom';

let tableItems = [
    {
        id: 0,
        title: 'عنوان انتخاب اول',
        meeting: 'عنوان نام مجمع',
        count: 1,
        date: '1400/08/01',
        status: 'در حال بارگزاری 1',
    },
    {
        id: 0,
        title: 'عنوان انتخاب دوم',
        meeting: 'عنوان نام مجمع2',
        count: 2,
        date: '1400/08/02',
        status: 'در حال بارگزاری 2',
    },
    {
        id: 0,
        title: 'عنوان انتخاب سوم',
        meeting: 'عنوان نام مجمع3',
        count: 3,
        date: '1400/08/03',
        status: 'در حال بارگزاری 3',
    },
];


const Election = (props) => {

    const navigate = useNavigate();
    const [modalVisible, setModalVisible] = useState(true);


    useEffect(() => {

        setTimeout(() => {
            setModalVisible(false);
        }, 3000);

    }, []);
    return (
        <div className="main">
            <Header
                backOnclick={() => navigate(-1)}
            />


            <Info>
                <span>مجمع ها / انتخابات</span>
            </Info>


            <SurveyView>
                <span>انتخابات</span>
            </SurveyView>



            <div className="table">
                <Table>
                    <Tr>
                        <Th>اقدامات</Th>
                        <Th>وضعیت</Th>
                        <Th>تاریخ</Th>
                        <Th>تعداد آرا</Th>
                        <Th>نام مجمع</Th>
                        <Th><p>عنوان</p></Th>
                    </Tr>
                    {tableItems.map(item => {
                        return (
                            <Tr>
                                <Td>
                                    <SeeMore onClick={()=> navigate('/admin/election/detail')}>
                                        <img src={left} alt="arrow" />
                                        <span>مشاهده</span>
                                    </SeeMore>
                                </Td>
                                <Td>{item.status}</Td>
                                <Td>{item.date}</Td>
                                <Td>{item.count}</Td>
                                <Td>{item.meeting}</Td>
                                <Td><p>{item.title}</p></Td>
                            </Tr>
                        )
                    })}
                </Table>
            </div>

            <div className="addButton">
                <Add onClick={() => navigate('/admin/election/add')}>
                    افزودن انتخابات
                </Add>
            </div>


            <ModalComponent
                modalVisible={modalVisible}
                closeModal={() => setModalVisible(false)}
                content={'انتخابات با موفقیت ثبت شد.'}
            />
        </div>
    )
}

const Add = styled.button`
    background: linear-gradient(266.53deg, #7B88FF 1%, #A17BF1 97.53%);
    border-radius: 8px;
    width: 450px;
    height: 48px;

    text-align: center;
    color: #fff;
    font-size: 18px;
    margin-top: 16px;
    cursor: pointer;
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