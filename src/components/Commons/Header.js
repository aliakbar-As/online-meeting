import React from 'react';
import styled from 'styled-components';

import backArrow from '../../assets/mainScreens/backArrow.png';
import user from '../../assets/mainScreens/user.png';
import downArrow from '../../assets/mainScreens/downArrow.png';


export const Header = ({
    
}) => {
    return (
        <TopView onClick={() => console.log('user')}>
            <IconsDiv>
                <UserIcon src={user} alt="user" />

                <ArrowIcon src={downArrow} alt="downArrow" />
            </IconsDiv>

            <Back src={backArrow} alt="backArrow" />
        </TopView>
    );
};


const Back = styled.img`
    width: 48px;
    height: 48px;
    align-self: flex-end;
`;

const ArrowIcon = styled.img`
    width: 13.33px;
    height: 8.23px;
    margin-left: 5px;
`;

const UserIcon = styled.img`
    width: 21.33px;
    height: 21.33px;
    margin-left: 10px;
`;


const IconsDiv = styled.div`
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
`;


const TopView = styled.div`
    flex-direction: row;
    align-items: center;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
`;