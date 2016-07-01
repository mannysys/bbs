/**
 * Created by shadow on 2016.6.10.
 */
/*
 领域层封装
*/
const Domain = require('cqrs');
const Message = require('./Message');
const Reply = require('./Reply');
const Topic = require('./Topic');
const User = require('./User');
const UserRecorder = require('./UserRecorder');

const domain = new Domain();

//注册
domain
    .register(Message)
    .register(Reply)
    .register(Topic)
    .register(User)
    .register(UserRecorder);

domain.get('UserRecorder','recorderid').then(function(result){
    if(!result){
        domain.create('UserRecorder');
    }
});

require('./listener/plus')(domain);
require('./listener/recorder')(domain);
const db = require('./listener/read-db')(domain);

domain.readDB = db;

module.exports = domain;

//外层，比如应用层就可以通过index得到一个初始化对象






















