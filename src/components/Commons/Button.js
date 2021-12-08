import React from 'react';
import styled from 'styled-components';

export const Button = ({
    onPress,
    title,
    onChange,
    type,
    primary
}) => {
    if(primary) {
        return (
            <Primary onClick={onPress}>
                {title}
            </Primary>
    
        );
    } else {
        return(
            <Normal onClick={onPress}>
                {title}
            </Normal>
        )
    }
    
};

const Normal = styled.button`
    width: 215px;
    height: 48px;
    
    border: 1px solid #7B88FF;

    background-color: transparent;
    border-radius: 8px;


    text-align: center;
    justify-content: center;
    align-items: center;
    align-self: center;
    color: #A87EFF;
    font-size: 20px;
    cursor: pointer;

    margin-left: 10px;
    &:hover {
        opacity: 1;
        transition: opacity 0.2s ease 0s;
    }

`;

const Primary = styled.button`
    width: 215px;
    height: 48px;
    
    border: 1px solid transparent;

    background: linear-gradient(266.53deg, #7B88FF 1%, #A17BF1 97.53%);
    border-radius: 8px;


    text-align: center;
    justify-content: center;
    align-items: center;
    align-self: center;
    color: #fff;
    font-size: 20px;
    cursor: pointer;

    margin-left: 10px;

    &:hover {
        opacity: 1;
        transition: opacity 0.2s ease 0s;
    }

`;