export const HexToRgba = (hex, opacity) => {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `rgba('${r}+','${g}','${b}','${opacity / 100})`;
};

export const SecondToMinutes = (time) => {
    return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2);
};

export const Logger = (value, type) => {
    console.log(` \n \n \n \n ~~~~~~~~~~~~~~+++++||||   ${type}   ||||+++++~~~~~~~~~~~~~~~~~~~~  \n \n \n \n`);
    console.log(value);
    console.log(' \n \n \n \n ~~~~~~~~~~~~~~+++++|||||||||||||||||||||+++++~~~~~~~~~~~~~~~~~~~~  \n \n \n \n');
};

export const Alert = (value, title) => {
    alert(value, title);
};

export const Base64 = {
    characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

    encode: (string) => {
        const characters = Base64.characters;
        let result = '';

        let i = 0;
        do {
            let a = string.charCodeAt(i++);
            let b = string.charCodeAt(i++);
            let c = string.charCodeAt(i++);

            a = a ? a : 0;
            b = b ? b : 0;
            c = c ? c : 0;

            const b1 = (a >> 2) & 0x3F;
            const b2 = ((a & 0x3) << 4) | ((b >> 4) & 0xF);
            let b3 = ((b & 0xF) << 2) | ((c >> 6) & 0x3);
            let b4 = c & 0x3F;

            if (!b) {
                b3 = b4 = 64;
            } else if (!c) {
                b4 = 64;
            }

            result += Base64.characters.charAt(b1)
                + Base64.characters.charAt(b2)
                + Base64.characters.charAt(b3)
                + Base64.characters.charAt(b4);
        } while (i < string.length);

        return result;
    },

    decode: (string) => {
        const characters = Base64.characters;
        let result = '';

        let i = 0;
        do {
            const b1 = Base64.characters.indexOf(string.charAt(i++));
            const b2 = Base64.characters.indexOf(string.charAt(i++));
            let b3 = Base64.characters.indexOf(string.charAt(i++));
            let b4 = Base64.characters.indexOf(string.charAt(i++));

            const a = ((b1 & 0x3F) << 2) | ((b2 >> 4) & 0x3);
            const b = ((b2 & 0xF) << 4) | ((b3 >> 2) & 0xF);
            const c = ((b3 & 0x3) << 6) | (b4 & 0x3F);

            result += String.fromCharCode(a) + (b ? String.fromCharCode(b) : '') + (c ? String.fromCharCode(c) : '');
        } while (i < string.length);
        return result;
    },
};

export const isBase64 = (v, opts) => {
    if (v instanceof Boolean || typeof v === 'boolean') {
        return false;
    }
    if (!(opts instanceof Object)) {
        opts = {};
    }
    if (opts.hasOwnProperty('allowBlank') && !opts.allowBlank && v === '') {
        return false;
    }

    let regex =
        '(?:[A-Za-z0-9+\\/]{4})*(?:[A-Za-z0-9+\\/]{2}==|[A-Za-z0-9+/]{3}=)?';
    if (opts.mime) {
        regex = '(data:\\w+\\/[a-zA-Z\\+\\-\\.]+;base64,)?' + regex;
    }
    if (opts.paddingRequired === false) {
        regex =
            '(?:[A-Za-z0-9+\\/]{4})*(?:[A-Za-z0-9+\\/]{2}(==)?|[A-Za-z0-9+\\/]{3}=?)?';
    }
    return new RegExp('^' + regex + '$', 'gi').test(v);
};

export const getString = str => {
    return str && isBase64(str) ? decodeURIComponent(escape(Base64.decode(str))) : str;
};

const toPersian = value => {
    const charCodeZero = '۰'.charCodeAt(0);
    return String(value).replace(/[0-9]/g, w =>
        String.fromCharCode(w.charCodeAt(0) + charCodeZero - 48)
    );
};

export const Numbers = {
    putCommas: number => {
        if (typeof number === 'undefined') return number;
        if (typeof number === 'number') number = number.toString();
        return number.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    toEnglishDigits: value => {
        const charCodeZero = '۰'.charCodeAt(0);
        return value.replace(/[۰-۹]/g, w => w.charCodeAt(0) - charCodeZero);
    },
    toPersianDigits: value => {
        return toPersian(value);
    },
    toTime: seconds => {
        let temp = seconds;
        let string = '';
        let c;
        while (temp) {
            c = ('0' + (temp % 60)).slice(-2);
            temp = Math.floor(temp / 60);
            string = `${c}:${string}`;
        }
        if (string) return toPersian(string.slice(0, -1));
        return 0;
    },
    hasNumber: term => {
        return /\d/.test(term);
    },
};


export const CleanHtml = (text) => {
    return text.replace(/\r?\n|\r/g, '').replace(/\r?<p|\r/g, '<a');
};