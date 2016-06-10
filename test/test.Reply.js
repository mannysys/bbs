/**
 * Created by zhoujialin on 2016/5/24.
 */
'use strict';
const should = require('should');
const Domain = require('cqrs');
const Reply = require('../lib/core/Reply');


describe('Reply', function(){

    var domain = new Domain();
    domain.register(Reply);

    it('create', done=>{
       domain.create('Reply', {authorId:'u001', topicId:'t001'}).catch(err=>{
           should.exist(err);
           done();
       });
    });

});

















