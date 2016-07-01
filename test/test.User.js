/**
 * Created by zhoujialin on 2016/5/24.
 */
'use strict';
const Domain = require('cqrs');
const User = require('../lib/core/User');
const UserRecorder = require('../lib/core/UserRecorder');
const recorderListener = require('../lib/core/listener/recorder');
const should = require('should');

describe('User', function(){

    var domain = new Domain();
    recorderListener(domain);
    domain.register(User).register(UserRecorder); //注册
    domain.create('UserRecorder');

    var userId;

    it('#create', done=>{
        domain.create('User',{
            loginname:'leo',
            password:'1234567'
        }).then(function(json){
            userId = json.id;

            json.loginname.should.eql('leo'); //判断
            json.nickname.should.eql('leo');
            json.password.should.eql('1234567');

            done();
        });
    });

    it('#create2', done=>{
        domain.create('User',{
            loginname:'leo',
            password:'1234567'
        }).then(function(json){
        }).catch(function(err){
            done();
        });
    });




    it('#update', function(done){
        domain.call(`User.${userId}.update`, {nickname:'zengliang',email:'123456@qq.com'});
        domain.get('User', userId).then(json=>{
            json.nickname.should.eql('zengliang');
            json.email.should.eql('123456@qq.com');
            done();
        });
    });






});















