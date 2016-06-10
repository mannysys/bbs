/**
 * Created by zhoujialin on 2016/5/27.
 */
'use strict';
/*
    记录创建注册的用户
*/
const Actor = require('cqrs').Actor;

class UserRecorder extends Actor{
    constructor(data){
        super({
            id:'recorderid',
            loginname_map:{},
            email_map:{}
        });
    }

    //抛出事件
    record(data, service){
        service.apply('record', data);
    }
    //接收事件处理
    when(event){
        switch(event.name){
            case 'record':
                this._data.loginname_map[event.data.loginname] = event.data; //更新数据
                this._data.email_map[event.data.email] = event.data;
                break;
        }

    }



}


module.exports = UserRecorder;