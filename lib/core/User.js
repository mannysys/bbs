/**
 * Created by zhoujialin on 2016/5/18.
 */
'use strict';
const Actor = require('cqrs').Actor;
const validator = require('validator');

//检验数据
function validateEmail(email){
    return email && validator.isEmail(email) && email.length < 100;
}
function validateName(name){
    return name && name.length < 25;
}
function validatePassword(pwd){
    return pwd.length < 100 && pwd.length > 6;
}


class User extends Actor{

    constructor(data){
        super({
            loginname: data.loginname,
            password: data.password,
            num: 0, //积分
            nickname: data.loginname,
            email: data.email || ''
        });
    }

    //检测创建的用户名和邮箱，是否有重复的
    static createBefor(data,service){
        return new Promise(function(resolve,reject){
            service.get('UserRecorder','recorderid').then(function(recorder){
                if(recorder.email_map[data.email] || recorder.loginname_map[data.loginname]){
                    reject('hava error !');
                }else{
                    if(validatePassword(data.password) && validateName(data.loginname)){
                        resolve();
                    }else{
                        reject('hava error !');
                    }

                }
            });
        });

    }

    //用户加分
    plus(data,service){
        service.apply('plus', data.num); //抛出事件
    }
    //更新数据
    update(data,service){
        var error;
        if(data.nickname){
            if(validateName(data.nickname)){
                service.apply('updateNickname', data.nickname);
            }else{
                error = {
                    nickname:'nickname 长度应该小于25字符'
                }
            }
        }
        if(data.email){
            if(validateEmail(data.email)){
                service.apply('updateEmail', data.email);
            }else{
                error = error || {};
                error.email = 'email 格式不正确或长度大于100';
            }
        }
        if(error) throw error;
    }
    //更新密码
    updatePwd(data,service){
        if(validatePassword(data.password)){
            service.apply('updatePassword', data.password);
        }else{
            throw {password:'密码长度大于6小于100个字符'};
        }

    }

    //接收抛出的事件
    when(event){
        switch(event.name){
            case 'updatePassword':
                this._data.password = event.data;
                break;
            case 'updateEmail':
                this._data.email = event.data;
                break;
            case 'updateNickname':
                this._data.nickname = event.data;
                break;
            case 'plus':
                this._data.num += event.data;
                break;
        }


    }

}

module.exports = User;