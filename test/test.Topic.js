/**
 * Created by shadow on 16/5/21.
 */
'use strict';
const Topic = require('../lib/core/Topic');
const Domain = require('cqrs');
const should = require('should');
const validator = require('validator');


describe('Topic', function(){

    //创建一个domain对象
    var domain = new Domain();
    domain.register(Topic); //注册

    var topicId;
    //测试的是创建执行过程是否成功
    it('#create', function(done){
       domain.create('Topic',{title:'mytitle',body:'mybody'}, function(err,topic){
           should.exist(topic.id); //检查id是存在的
           topicId = topic.id;
           topic.top.should.eql(false); //做个判断
           done(); // 如果加这个done(); 就是异步的,不加就是同步
       });
    });

    it('#top', function(done){
        domain.call(`Topic.${topicId}.top`);
        domain.get('Topic', topicId).then(function(json){
            json.top.should.eql(true);
            done();
        });
    });

    it('#untop', function(done){
        domain.call(`Topic.${topicId}.untop`);
        domain.get('Topic', topicId).then(function(json){
            json.top.should.eql(false);
            done();
        });
    });

    it('#fine', function(done){
        domain.call(`Topic.${topicId}.fine`);
        domain.get('Topic', topicId).then(function(json){
            json.fine.should.eql(true);
            done();
        });
    });
    it('#unfine', function(done){
        domain.call(`Topic.${topicId}.unfine`);
        domain.get('Topic', topicId).then(function(json){
            json.fine.should.eql(false);
            done();
        });
    });

    it('#update', function(done){
        domain.call(`Topic.${topicId}.update`,{title:'my name is leo',body:'is me'});
        domain.get('Topic', topicId).then(function(json){
            json.title.should.eql('my name is leo');
            json.body.should.eql('is me');
            done();
        });
    });

    it('#update', function(done){
        //测试验证错误
        domain.call(`Topic.${topicId}.update`,{title:'1',body:'is me'}).catch(err=>{

            should.exist(err); //检查有错误
            //再调用正确的测试
            domain.call(`Topic.${topicId}.update`,{title:'okok',body:'is me'});
            domain.get('Topic', topicId).then(function(json){
                json.title.should.eql('okok');
                json.body.should.eql('is me');
                done();
            });
        });

    });

    //it('test', function(){
    //    let result = validator.isLength('ooooo', {min: 5});
    //    console.log(result);
    //});

});






















