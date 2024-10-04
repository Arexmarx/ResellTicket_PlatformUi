/*
* Author: Nguyen Tien Thuan
*/
function stringToColor(string) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
}

/*
* Author: Nguyen Tien Thuan
*/
export function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

/*
* Author: Nguyen Tien Thuan
*/
export function formatToVND(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

/*
* Author: Nguyen Tien Thuan
*/
export function getFirstFiveChars(str) {
    if (str.length < 5) {
        return str; 
    }
    return str.substring(0, 5); 
}
