/**
 * Created by zhoujialin on 2016/5/18.
 */
'use strict';
const Actor = require('cqrs').Actor;

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
                    resolve();
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
        if(data.nickname){
            service.apply('updateNickname', data.nickname);
        }
        if(data.email){
            service.apply('updateEmail', data.email);
        }
    }
    //更新密码
    updatePwd(data,service){
        service.apply('updatePassword', data.password);
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