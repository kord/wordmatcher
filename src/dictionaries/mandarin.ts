import {pinyin} from 'pinyin-pro';


export {}


let trans = '';
trans = pinyin('汉语拼音'); // 'hàn yǔ pīn yīn'
console.log(trans)

trans = pinyin('english'); // 'hàn yǔ pīn yīn'
console.log(trans)
