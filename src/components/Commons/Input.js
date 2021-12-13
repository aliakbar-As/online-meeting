import styled from "styled-components";


export const Input = ({
    placeholder,
    value,
    onChange,
    type,
}) => {
    return (
        <TextInput
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={onChange}
        />
    );
};

const TextInput = styled.input`
    background: #545772;
    border-radius: 8px;
    width: 450px;
    height: 48px;
    text-align: right;
    color: #fff;
    padding: 10px;
    border: 0px;
    margin-left: 16px;
    
`;