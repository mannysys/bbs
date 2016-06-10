/**
 * Created by zhoujialin on 2016/5/25.
 */
'use strict';
const plus = require('../lib/core/listener/plus');
const User = require('../lib/core/User');
const UserRecorder = require('../lib/core/UserRecorder');
const Topic = require('../lib/core/Topic');
const Reply = require('../lib/core/Reply');
const should = require('should');
const Domain = require('cqrs');

// plus可以自定义名字
describe('plus', function(){

    let authorId;

    // init
    const domain = new Domain();
    plus(domain);
    domain.register(User).register(Topic).register(Reply).register(UserRecorder);

    domain.create('UserRecorder')
        .then(function(){
            //添加一个用户并得到id
            return domain.create('User',{
                loginname:'leo',
                password:'123'
            });

        })
        .then(function(json){
        authorId = json.id;
    });


    it('#plus', function(done){
       domain.create('Topic', {authorId, title:'mytitle',body:'mybody'}, function(err,topic){
            setTimeout(function(){
                domain.get('User', authorId).then(function(json){
                    json.num.should.eql(3);  //判断是否等于3
                    done();
                });
            });
       });
    });




});
























