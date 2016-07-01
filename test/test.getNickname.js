/**
 * Created by zhoujialin on 2016/7/1.
 */
'use strict';
const getNickname = require('../lib/app/routes/getNickname');
const should = require('should');

describe('getNickname', function(){

    it('#test', function(){
        let str = 'hello world and @曾亮 @leo and @ook ';
        let result = getNickname(str);
        result.length.should.eql(3);
    });
});