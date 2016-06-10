/**
 * Created by zhoujialin on 2016/5/31.
 */
'use strict';

const should = require('should');
const Message = require('../lib/core/Message');
const Domain = require('cqrs');

let domain = new Domain();
domain.register(Message);

describe('Message', function(){

    it('#create', function(done){
        domain.create('Message', {body:'ok'}, function(err,json){
            should.exist(json);
            should.exist(json.createTime);

            domain.create('Message', {body:''}, function(err,json){
                should.not.exist(json);
                should.exist(err);
                done();
            });

        });
    });

});