import React from 'react';

export const TextInput = ({
    placeholder,
    value,
    onChange,
    type,
    style
}) => {
    return (
        <input
            style={styles.input}
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={onChange} />

    );
};

const styles = {
    input: {
        textAlign: 'right',
        height: 48,
        backgroundColor: '#545772',
        borderWidth: 0,
        borderColor: '#545772',
        borderRadius: 10,
        color: '#fff',
        paddingRight: 10,
        width: 450,
        marginTop: 10,
    },
}
