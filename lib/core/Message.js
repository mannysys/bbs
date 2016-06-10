/**
 * Created by zhoujialin on 2016/5/18.
 */
'use strict';

const Actor = require('cqrs').Actor;
const validator = require('validator');
/*
  用户发消息
 */
class Message extends Actor{

    // body, authorId, targetId, createTime
    constructor(data){

        let body = data.body;
        if(body && body.length > 1 && body.length < 1000){
            data.createTime = Date.now();
            super(data);
        }else{
            throw new Error('message error!');
        }
    }



}

module.exports = Message;