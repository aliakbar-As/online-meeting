import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import styled from 'styled-components';


import check from '../../assets/mainScreens/check.png';
import error from '../../assets/mainScreens/error.png';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#545772',
        padding: '-120px',
        borderRadius: '16px',
    },
};

export const ModalComponent = ({
    modalVisible,
    afterOpenModal,
    closeModal,
    contentLabel,
    content, alert,
    okOnclick,
    cancelOnclick,
    hasError, okTitle, cancelTitle
}) => {
    if (alert) {
        return (
            <Modal
                isOpen={modalVisible}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel={contentLabel}
            >
                <Alert>
                    <span>{content}</span>


                    <Footer>
                        <No onClick={cancelOnclick}>
                            {cancelTitle === undefined ? 'خیر' : cancelTitle}
                        </No>

                        <Yes onClick={okOnclick}>
                            {okTitle === undefined ? 'بله' : okTitle}
                        </Yes>
                    </Footer>
                </Alert>
            </Modal>
        )
    } else {
        return (
            <Modal
                isOpen={modalVisible}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel={contentLabel}
            >
                <View>
                    <img src={hasError ? error : check} alt="check" />

                    <span>{content}</span>
                </View>
            </Modal>
        );
    }
};

const No = styled.a`
    border-radius: 8px;
    height: 48px;
    width: 215px;
    color: #fff;
    font-size: 18px;
    margin-right: 10px;
    cursor: pointer;
    background: linear-gradient(266.53deg, #7B88FF 1%, #A17BF1 97.53%);
    text-align: center;
    justify-content: center;
    align-items: center;
    display: flex;
`;

const Yes = styled.a`
    border-radius: 8px;
    height: 48px;
    width: 215px;
    color: #fff;
    font-size: 18px;
    margin-left: 10px;
    cursor: pointer;
    background: #6070FF;
    text-align: center;
    justify-content: center;
    align-items: center;
    display: flex;
`;

const Footer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 10%;
`;


const Alert = styled.div`
    width: 686px;
    height: 220px;

    background: #545772;

    box-shadow: 0px 0px 15px rgba(35, 36, 45, 0.8);
    border-radius: 16px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    display: flex;

    span {
        margin-top: 20px;
        font-size: 20px;
    }
`;

const View = styled.div`
    width: 686px;
    height: 250px;

    background: #545772;

    box-shadow: 0px 0px 15px rgba(35, 36, 45, 0.8);
    border-radius: 16px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    display: flex;

    span {
        margin-top: 20px;
    }
`;