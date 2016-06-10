/**
 * Created by zhoujialin on 2016/6/1.
 */
'use strict';

const should = require('should');
const readerdb = require('../lib/core/listener/read-db');
const EventEmitter = require('events').EventEmitter; //node.js核心API
const emitter = new EventEmitter;
const db = readerdb(emitter);

describe('readerStore', function(){
    //清空数据
    it('#clear', function(){
        require('fs').unlinkSync('./User');
    });

    it('#create', function(done){
        //插入数据
        emitter.emit('*',{actorType:'User',name:'create',actorId:'001',data:{name:'leo',id:'001'}});
        let collection = db.collection('User');
        setTimeout(function(){
            //查询数据
            collection.find({id:'001'}).toArray(function(err, result){
                result[0].name.should.eql('leo');
                done();
            });
        });
    });

    it('#update', function(done){
        //插入数据
        emitter.emit('*',{actorType:'User',name:'update',actorId:'001',data:{name:'liang'}});
        let collection = db.collection('User');
        //因为是异步的所以使用setTimeout延时查询
        setTimeout(function(){
            //查询数据
            collection.find({id:'001'}).toArray(function(err, result){
                result[0].name.should.eql('liang');
                done();
            });
        });
    });

    it('#remove', function(){
        //插入数据
        emitter.emit('*',{actorType:'User',name:'remove',actorId:'001',data:{name:'liang'}});
        let collection = db.collection('User');
        //因为是异步的所以使用setTimeout延时查询
        setTimeout(function(done){
            //查询数据
            collection.find({id:'001'}).toArray(function(err, result){
                result.lenght.should.eql(0);
                done();
            });
        });
    });



});