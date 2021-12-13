import styled from "styled-components"
import { Header } from "../../../../Commons";


const Election = (props) => {
    return (
        <div className="main">
            <Header />


            <Info>
                <span>مجمع ها / انتخابات</span>
            </Info>


            <SurveyView>
                <span>انتخابات</span>
            </SurveyView>
        </div>
    )
}


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
    
    span {
        color: #545772;
        font-size: 14px;
    }
`;
export default Election;