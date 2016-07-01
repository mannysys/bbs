/**
 * Created by zhoujialin on 2016/5/25.
 */
'use strict';
const recorder = require('../lib/core/listener/recorder');
const User = require('../lib/core/User');
const should = require('should');
const Domain = require('cqrs');
const UserRecorder = require('../lib/core/UserRecorder');

describe('recorder', function(){


    const domain = new Domain();
    recorder(domain);
    domain.register(User).register(UserRecorder); //注册

    domain.create('UserRecorder');

    it('#recorder', function(done){
        domain.create('User',{
            loginname:'leo',
            password:'1234567'});

        setTimeout(function(){
           domain.get('UserRecorder','recorderid').then(function(recorder){
               console.log(recorder);
               done();
           });
        });

    });




});
























