/**
 * Created by zhoujialin on 2016/5/24.
 */
/*
    监听器（功能扩展）
    通过监听领域层各个事件，监听需要处理的事件进行相应的业务处理
 */
const Domain = require('cqrs');

module.exports = function(domain){

    //生成事件的路由（path）
    //  Domain.Alias() 静态方法，返回来一个别名就是事件的名字
    // actorType('Topic') 监听的actor是Topic中的create事件
    var eventname = Domain.Alias().actorType('Topic').name('create').get();
    //监听这个eventname事件，发帖加分
    domain.on(eventname, function handle(event){
        domain.get('Topic', event.actorId).then(topicJSON=>{
            domain.get('User', topicJSON.authorId);
            //domain.call调用指定业务方法
            domain.call(`User.${topicJSON.authorId}.plus`,{num:3});
        });
    });

    //处理评论加分
    var eventname2 = Domain.Alias().actorType('Reply').name('create').get();
    //监听这个eventname事件
    domain.on(eventname2, function handle(event){
        domain.get('Reply', event.actorId).then(replyJSON=>{
            //domain.call调用指定业务方法
            domain.call(`User.${replyJSON.authorId}.plus`,{num:2});
        });
    });


};















