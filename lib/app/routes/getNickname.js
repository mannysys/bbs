/**
 * Created by zhoujialin on 2016/7/1.
 */


module.exports = function(str){
    //g是全局字符串，匹配以@开头w表示大小写字母a-z和数字0-9字符，*表示可以匹配很多个
    return str.match(/@[0-9a-zA-Z\u4e00-\u9faf]*(?=\s)/g).map(nickname => nickname.split('@')[1] );
};
