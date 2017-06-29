
let date = null
const offsetTime = (new Date(0).getTimezoneOffset()) * 1000 *60
const week = {
    '0': '日',
    '1': '一',
    '2': '二',
    '3': '三',
    '4': '四',
    '5': '五',
    '6': '六',
}
const RegExpObj = {
    chsName: /^[\u4e00-\u9fff]([\u4e00-\u9fff]{0,4})[\u4e00-\u9fff]$/,
    chsNick: /^[a-zA-Z0-9\u4e00-\u9fff]([a-zA-Z0-9\u4e00-\u9fff]{0,4})[a-zA-Z0-9\u4e00-\u9fff]$/,
    mobile: /^1(3|5|7|8)[0-9]{9}$/,
    email: /^(\w)+[(\.\w+)|(\-\w+)]*@(\w)+(([\.|\-]\w+)+)$/,
    picType: /^image\.(jpg|png|jpeg|bmp)$/i,
    passWord: /^(?=.*[a-zA-Z]+)(?=.*\d+)(?=.*[\~\!\@\#\$%\^&\*\(\)_\+\{\}\:\;\"\"\'\/\`\?\<\>\.\,\[\]\-\=\\\|]+)[a-zA-Z0-9\x21-x7e]{8,16}$/
}

export default {
    mamagetor (time) {
        if (!time) {
            return '---'
        } else {
            let dts = new Date(time)
            let year = dts.getFullYear()
            let month = dts.getMonth() + 1
            let day = dts.getDate()
            return year + '-' + month + '-' + day
        }
    },
    dateFormatter (dts, fmt, oft) {
        let offset = oft ? offsetTime : 0
        date = new Date(dts + offset)
        const fmtObj = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds()
        }
        if (/(E+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? '周' : '星期' + week[date.getDay() + ''])
        }
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        for(let key in fmtObj) {
            if (new RegExp('('+ key +')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, RegExp.$1.lengt === 1 ? fmtObj[key] : ('00' + fmtObj[key + '']).substr((fmtObj[key] + '').length))
            }
        }
        return fmt
    },
    toReg (data, key) {
        return RegExpObj[key].test(data)
    }
}
