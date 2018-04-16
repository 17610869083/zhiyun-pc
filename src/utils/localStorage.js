import {DARK} from './colors'

export function getItem(item) {
    const local = localStorage.getItem(item);
    return JSON.parse(local);
}

export function setItem(name,item) {
    const local = JSON.stringify(item);
    localStorage.setItem(name, local);
}

export function sessionGetItem(item) {
    const local = sessionStorage.getItem(item);
    return JSON.parse(local);
}

export function sessionSetItem(name,item) {
    const local = JSON.stringify(item);
     sessionStorage.setItem(name, local);
}

export function getTheme() {
    const theme = getItem('theme');
    if (null === theme) {
        const themeOBJ = {topColor: {backgroundColor: '#ffffff'},bottomColor: {backgroundColor: DARK},
          textColor:{color:'#cccccc'}
        };
        setItem('theme', themeOBJ);
    }

    const newTheme = getItem('theme');
    return newTheme;
}
//文章内容查看状态
export function sessionSetArticleItem(name,item){
     const local = item;
     sessionStorage.setItem(name, local);
}
export function sessionGetArticleItem(item){
    const local = sessionStorage.getItem(item);
    return local;
}

//记住密码
export function getPasswordItem(item) {
    const local = localStorage.getItem(item);
    return JSON.parse(local);
}

export function setPasswordItem(name,item) {
    const local = JSON.stringify(item);
    localStorage.setItem(name, local);
}