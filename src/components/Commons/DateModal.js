import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import styled from 'styled-components';

import calander from '../../assets/mainScreens/calender.svg';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: '-120px',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
    },
};

const renderDayDate = (onChange) => {
    const dayList = [];
    for (var i = 1; i <= 31; i++) {
        if (i.toString().length == 1) {
            dayList.push(`0${i}`);
        } else {
            dayList.push(i);
        };
    };

    return (
        <select
            style={selectStyle}
            onChange={onChange}>
            <option value=''>روز</option>
            {dayList.map((item, index) => (
                <option
                    key={index}
                    value={item}>
                    {item}
                </option>
            ))}
        </select>
    )
};

const renderMonthDate = (onChange) => {
    const dayList = [];
    for (var i = 1; i <= 12; i++) {
        if (i.toString().length == 1) {
            dayList.push(`0${i}`);
        } else {
            dayList.push(i);
        };
    };

    return (
        <select
            style={selectStyle}
            onChange={onChange}>
            <option value=''>ماه</option>
            {dayList.map((item, index) => (
                <option
                    key={index}
                    value={item}>
                    {item}
                </option>
            ))}
        </select>
    )
};

const renderYearDate = (onChange) => {
    const dayList = [];
    for (var i = 1300; i <= 1403; i++) {
        dayList.push(i);
    };

    return (
        <select
            style={selectStyle}
            onChange={onChange}>
            <option value=''>سال</option>
            {dayList.map((item, index) => (
                <option
                    key={index}
                    value={item}>
                    {item}
                </option>
            ))}
        </select>
    )
};

export const DateModal = ({
    modalVisible,
    afterOpenModal,
    closeModal,
    contentLabel,
    content, alert,
    okOnclick,
    currentDate,
    hasError,
    dayOnChange,
    monthOnChange,
    yearOnChange,
    title
}) => {
    return (
        <Modal
            isOpen={modalVisible}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            ariaHideApp={false}
            contentLabel={contentLabel}
        >
            <View>
                <Top>
                    <img src={calander} alt='' />
                    <span>{currentDate} - {title}</span>
                </Top>


                {/* <CardSection> */}

                {/* <img src={down} alt='' /> */}

                {renderDayDate(dayOnChange)}
                {renderMonthDate(monthOnChange)}
                {renderYearDate(yearOnChange)}
                {/* </CardSection> */}
            </View>
        </Modal>
    )
};


const CardSection = styled.div`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    border: 1px solid #A7AAC6;
    box-sizing: border-box;
    border-radius: 8px;

    width: 100%;
    height: 40px;
    align-self: center;
    margin-top: 10px;
    padding: 10px;
`;


const Top = styled.div`
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    display: flex;
    border-bottom: 1px solid #545772;
    padding-bottom: 16px;
`;

const View = styled.div`
    background: #232539;
    border: 1px solid #A7AAC6;
    box-sizing: border-box;
    border-radius: 8px;

    width: 300px;
    color: #A7AAC6;
    text-align: right;
    padding: 10px;
    align-items: center;
    padding-top: 16px;
    padding-bottom: 16px;
`;


const selectStyle = {
    background: 'transparent',
    color: '#7F829F',
    fontSize: 16,
    width: '100%',
    borderRadius: 8,
    flexDirection: 'row-reverse',
    padding: 5,
    textAlign: 'right',
    direction: 'rtl',
    height: 48,
    justifyContent: 'center',
    alignSelf: 'center',
    display: 'flex',
    marginTop: '16px'
};