import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import styled from 'styled-components';


import check from '../../assets/mainScreens/check.png';


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
    content
}) => {

    return (
        <Modal
            isOpen={modalVisible}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel={contentLabel}
        >
            <View>
                <img src={check} alt="check" />
                
                <span>{content}</span>
            </View>
        </Modal>
    );
};


const View = styled.div`
    width: 686px;
    height: 346px;

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