/**
 * Created by zhoujialin on 2016/6/20.
 */
'use strict';
const request = require('supertest');
const app = require('../lib/app/app');
const should = require('should');
const agent = request.agent(app);//代理对象,使用一个代理对象发出以下所有请求（共享一个session）
const domain = require('../lib/core/index');

//模拟客户端请求，做测试
describe('User router', function(){

    let userid;

    //清空文件内容
    it('#clear', function(){
       try{
            require('fs').unlinkSync('User');
            require('fs').unlinkSync('UserRecorder');
       }catch(e){
            console.log(e.stack);
       }
    });

    //测试用户注册
    it('#/users/reg', function(done){
        agent
            .post('/users/reg')
            .send({
                loginname:'leo',
                password:'1234567',
                confirm:'1234567',
                email:'11@qq.com'
            })
            .end(function(err, res) {
                should.exist(userid = res.body.id);
                done();
            });
    });
    //测试用户登录
    it('#/users/login', function(done){
        agent
            .post('/users/login')
            .send({
                loginname:'leo',
                password:'1234567'
            })
            .end(function(err, res) {
                res.body.state.should.eql('success');
                done();
            });
    });
    //修改密码
    it('#/users/update_pwd', function(done){
        agent
            .post('/users/update_pwd')
            .send({
                password:'6666666'
            })
            .end(function(err, res) {
                res.body.state.should.eql('success');
                done();
            });
    });
    //修改昵称
    it('#/users/update_nick', function(done){
        agent
            .post('/users/update_nick')
            .send({
                nickname:'zengliang'
            })
            .end(function(err, res) {
                res.body.state.should.eql('success');
                domain.get('User',userid).then(function(json){
                    json.nickname.should.eql('zengliang');
                    done();
                });
            });
    });
    //修改邮件
    it('#/users/update_email', function(done){
        agent
            .post('/users/update_email')
            .send({
                email:'zengliang@qq.com'
            })
            .end(function(err, res) {
                res.body.state.should.eql('success');
                domain.get('User',userid).then(function(json){
                    json.email.should.eql('zengliang@qq.com');
                    done();
                });
            });
    });




});