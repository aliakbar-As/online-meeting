import React from 'react';

export const Button = ({
    onPress,
    title,
    onChange,
    type,
}) => {
    return (
        <button
            style={styles.btn}
            onClick={onPress}
            type={type}
        >
            <span  style={styles.title}>{title}</span>
        </button>

    );
};

const styles = {
    title: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
    },
    btn: {
        width: 215,
        height: 40,
        borderRadius: 8,
        backgroundColor: '#7B88FF',
        borderWidth: 0,
    },
}
