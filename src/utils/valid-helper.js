import Validator from 'validatorjs';

// Validator.register(
//   'phone',
//   (value) => {
//     // requirement parameter defaults to null
//     return value.match(/(^(13\d|14\d|15[^4,\D]|17[135678]|18\d)\d{8}|170[^346,\D]\d{7})$/)
//   },
//   '手机号码不正确',
// );

// Validator.register('agreement', value => Boolean(value), '请勾选')

// /**
//  * 身份证号验证
//  * @param {string} idNumber
//  */
// export function idNumberValidate(idNumber) {
//   if (typeof idNumber !== 'string') return false
//   const city = {
//     11: '北京',
//     12: '天津',
//     13: '河北',
//     14: '山西',
//     15: '内蒙古',
//     21: '辽宁',
//     22: '吉林',
//     23: '黑龙江',
//     31: '上海',
//     32: '江苏',
//     33: '浙江',
//     34: '安徽',
//     35: '福建',
//     36: '江西',
//     37: '山东',
//     41: '河南',
//     42: '湖北',
//     43: '湖南',
//     44: '广东',
//     45: '广西',
//     46: '海南',
//     50: '重庆',
//     51: '四川',
//     52: '贵州',
//     53: '云南',
//     54: '西藏',
//     61: '陕西',
//     62: '甘肃',
//     63: '青海',
//     64: '宁夏',
//     65: '新疆',
//     71: '台湾',
//     81: '香港',
//     82: '澳门',
//     91: '国外',
//   };
//   const birthday = `${idNumber.substr(6, 4)}/${Number(idNumber.substr(10, 2))}/${Number(idNumber.substr(12, 2))}`
//   const d = new Date(birthday)
//   const newBirthday = `${d.getFullYear()}/${Number(d.getMonth() + 1)}/${Number(d.getDate())}`
//   const currentTime = new Date().getTime();
//   const time = d.getTime();
//   const arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
//   const arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
//   let sum = 0;
//   let i;

//   if (!/^\d{17}(\d|x)$/i.test(idNumber)) return false
//   if (city[idNumber.substr(0, 2)] === undefined) return false
//   if (time >= currentTime || birthday !== newBirthday) return false
//   for (i = 0; i < 17; i++) {
//     sum += idNumber.substr(i, 1) * arrInt[i]
//   }
//   const residue = arrCh[sum % 11]
//   if (residue !== idNumber.substr(17, 1)) return false

//   return true
// }

// Validator.register(
//   'coi',
//   (value) => {
//     // requirement parameter defaults to null
//     return idNumberValidate(value)
//   },
//   '身份证号不正确',
// )

Validator.useLang('zh');

export default Validator;
