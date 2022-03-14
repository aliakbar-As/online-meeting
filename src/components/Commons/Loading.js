import styled from 'styled-components';

import spinner from '../../assets/auth/spinner.svg';

export const Loading = () => {
    return (
        <View>
            <img src={spinner} alt='' />
        </View>
    );
};

const View = styled.div`
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
    background: rgba(0,0,0,0.7);

    img {
        width : 50px;
        height: 50px;

        animation:spin 1s linear infinite;
    }

    @-moz-keyframes spin { 
    100% { -moz-transform: rotate(360deg); } 
    }
    @-webkit-keyframes spin { 
        100% { -webkit-transform: rotate(360deg); } 
    }
    @keyframes spin { 
        100% { 
            -webkit-transform: rotate(360deg); 
            transform:rotate(360deg); 
        } 
    }

`;