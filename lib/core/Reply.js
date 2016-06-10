/**
 * Created by zhoujialin on 2016/5/18.
 */
'use strict';
const Actor = require('cqrs').Actor;
const validator = require('validator');


class Reply extends Actor{
    constructor(data){
        if(data.body && validator.isLength(data.body,{min:1, max:1000})){
            super({
                authorId:data.authorId,
                topicId:data.topicId,
                body:data.body,
                createTime:Date.now()
            });
        }else{
            throw new Error('create replay error!');
        }
    }







}

module.exports = Reply;