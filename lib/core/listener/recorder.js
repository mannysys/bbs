/**
 * Created by zhoujialin on 2016/5/24.
 */
/*
   监听User 如果有创建一个新用户，记录下来
 */
const Domain = require('cqrs');

module.exports = function(domain){

    //指定监听的Actor
    var eventname=Domain.Alias().actorType('User').name('create').get();

    domain.on(eventname, function handle(event){
        domain.call('UserRecorder.recorderid.record', event.data);
    });

};















