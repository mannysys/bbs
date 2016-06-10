/**
 * Created by zhoujialin on 2016/6/1.
 */
/*
    读数据
 */
'use strict';

const Db = require('tingodb')().Db;

module.exports = function(domain){
    const db = new Db('.', {});  // .表示当前目录

    // *表示监听领域层的全部事件
    domain.on('*', function(event){
        //通过类别名字创建一个连接
        let collection = db.collection(event.actorType);
        if(event.name === 'create'){
            collection.save(event.data);

        }else if(event.name === 'remove'){
            collection.remove({id: event.actorId});

        }else{ // update
            collection.update({id: event.actorId}, {$set:event.data});

        }

    });


    return db;


};