'use strict';

/**
 * Created by zhoujialin on 2016/5/18.
 */

const Actor = require('cqrs').Actor;

/*
  领域层聚合根对象
 */
class Topic extends Actor{

    constructor(data){
        //调用父类构造方法
        super({
            authorId:data.authorId,  //作者id
            title:data.title,   //标题
            body:data.body,    //内容
            fine:false,     //帖子是否加精
            top:false,      //帖子是否置顶
            createTime:Date.now(),
            updateTime:Date.now(),
            accessNum:0   //帖子访问人数
        });
    }

    //帖子置顶功能
    top(data,service){
        service.apply('top'); //创建事件命名top并抛出

    }
    //取消帖子置顶
    untop(data, service){
        service.apply('untop');//抛出untop事件

    }
    //帖子加精
    fine(data,service){
        service.apply('fine');
    }
    //取消加精的帖子
    unfine(data,service){
        service.apply('unfine');
    }
    //帖子访问人数
    access(data,service){
        service.apply('access');
    }
    //帖子更新
    update(data, service){
        //抛出一个事件并携带数据
        service.apply('update',{title:data.title,body:data.body});
    }

    /*
      只有在when里才能更改数据(其它里面更改不符合规定的)
     this._data 私有属性
     */
    when(event){
        switch(event.name){
            case 'access':
                ++this._data.accessNum; //帖子访问人数累加
                break;
            case 'top':
                this._data.top = true;  //帖子置顶更新
                break;
            case 'untop':
                this._data.top = false;
                break;
            case 'fine':
                this._data.fine = true;  //帖子加精更新
                break;
            case 'unfine':
                this._data.fine = false;
                break;
            case 'update':
                this._data.title = event.data.title;
                this._data.body = event.data.body;
                this._data.updateTime = Date.now();
                break;

        }

    }



}

module.exports = Topic;
















