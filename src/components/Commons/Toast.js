import styled from 'styled-components';

import check from '../../assets/mainScreens/check.svg';

export const Toast = ({
    success,
    title,
    content,
    danger,
    info,
    warning,
}) => {
    return (
        <Container>

            <Content>
                <p>{title}</p>
                <span>{content}</span>
            </Content>


            <img src={check} alt='' />
        </Container>
    );
};

const Content = styled.div`
    flex-direction: column;
    align-items: flex-end;
    display: flex;
    margin-right: 16px;
    margin-top: -20px;
    p {
        font-size: 18px;
        font-weight: bold;
    }
    span {
        font-size: 16px;
    }
`;

const Container = styled.div`
    width: 50%;
    height: 100px;
    background-color: #4AA157;
    border-radius: 10px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: row;
    padding: 16px;


    position: absolute;
    right: 16px;
    transition:left 1s;

`;
