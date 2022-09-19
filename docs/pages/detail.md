 ## 单个字段明细
```json {5}
{
    "type":"detail",   //必填，组件类型
    "key":"oneDetail", //必填，字段名称,获取值方法flowFormAPI.getParamValue('oneDetail')
    "title":"1个字段", //明细大标题
    "mode":"simple",//必填，明细模式： simple:1个字段，mutiple:多个字段，pop:弹出页面，slider:轮播模式，table:表格模式
    "addDisable": false,//是否禁止新增
    "editDisable": false,//是否禁止修改
    "delDisable": false,//是否禁止删除
    "show":true,//是否显示，默认为true,
    "params":[{  //明细内具体字段,组件对象数组
        "key":"school",
        "type":"input" ,
        "label":"学校",
        "require":true,
        "value":""
    }],
    "defaultValue":[  //给定初始明细项
        {
            "school":1
        },
        {
            "school":2
        }
    ],
    "afterAdd":"afterAdd", //新增明细项之后的回调函数，函数接收两个参数：setParam重置明细项函数,以及新增的明细对象
    "afterDelete":"afterDelete", //删除明细项之后的回调函数，函数接收两个参数：删除项序数,以及删除的明细对象 
}
```

## 多个字段明细
```json {5}
{
    "type":"detail",   //必填，组件类型
    "key":"twoDetail", //必填，组件类型,获取值方法flowFormAPI.getParamValue('twoDetail')
    "title":"多个字段",//明细大标题
    "mode":"mutiple",//必填，明细模式： simple:1个字段，mutiple:多个字段，pop:弹出页面，slider:轮播模式，table:表格模式
    "detailTitleKey": "school",//明细项标题字段，为明细项数据里的school字段
    "addDisable": false,//是否禁止新增
    "editDisable": false,//是否禁止修改
    "delDisable": false,//是否禁止删除
    "params":[{
        "key":"school",
        "type":"input" ,
        "label":"学校",
        "require":true,
        "value":"123"
    },
    {
        "key":"class",
        "type":"input",
        "label":"专业"
    }],
    "defaultValue":[  //给定初始明细项
        {"school":"1","class":"2"},
        {"school":"3","class":"4"}
    ],
    "afterAdd":"afterAdd", //新增明细项之后的回调函数，函数接收两个参数：setParam重置明细项函数,以及新增的明细对象
    "afterDelete":"afterDelete", //删除明细项之后的回调函数，函数接收两个参数：删除项序数,以及删除的明细对象
}
```

## 弹出框明细
```json
{
    "type":"detail", //必填，组件类型
    "key":"threeDetail", //必填，字段名称,获取值方法flowFormAPI.getParamValue('threeDetail')
    "title":"复杂pop",//明细大标题
    "mode":"pop",//必填，明细模式： simple:1个字段，mutiple:多个字段，pop:弹出页面，slider:轮播模式，table:表格模式
    "addDisable": false,//是否禁止新增
    "editDisable": false,//是否禁止修改
    "delDisable": false,//是否禁止删除
    "params":[
        {
            "key":"school",
            "type":"input" ,
            "label":"学校",
            "require":true,
        },
        {
            "type": "checkbox",
            "label":"是否参加",
            "value":false,
            "key":"attend",
            "optionLabel":"是"
        }              
    ],
    "defaultValue":[  //给定初始明细项
        {"school":"1","attend":true},
        {"school":"2","attend":false}
    ],
    "beforeSave":"beforeSave",//保存前执行该函数，返回true或false，返回true才会继续往下执行。
                            //若内部有异步操作，则使用<a href="#api/asyncFunc">flowFormAPI.asyncFunc</a> 
                            //该函数接收两个参数，具体如下例子。
                            
    "afterAdd":"afterAdd", //新增或修改明细项之后的回调函数，函数接收两个参数：setParam重置明细项函数,以及新增的明细对象                      
    "afterDelete":"afterDelete", //删除明细项之后的回调函数，函数接收两个参数：删除项序数,以及删除的明细对象
}
```

例如：
```js
function beforeSave(setParam,payload){
    //setParam为重置当前明细项数据的函数
    //payload为数据对象，携带code、state、userId、params等数据信息，payload.params为当前明细项数据对象
    if (payload.params.school == "1") {
        setParam([{
            key: 'school',
            value: '2'
        }])
    }
    return true //返回true则明细弹框关闭
}
//内部有异步操作
function beforeSave(setParam,payload){
    return flowFormAPI.asyncFunc(function(successFunc,failFunc){
        //用setTimeout模仿异步效果
        setTimeout(function(){
            //异步返回结果
            var res = {
                success:true,
                data:{},
                errorInfo:''
            }
            if(res.success){
                successFunc(true) //此时将提交表单
            }
            else{
                failFunc(res.errorInfo) //此时将取消提交表单，并弹出错误信息
            }
        },2000)
    })
}
```

##  轮播明细
```json {5}
{
    "type":"detail", //必填，组件类型
    "key":"sliderDetail",//获取值方法flowFormAPI.getParamValue('sliderDetail')
    "title": "轮播明细",//明细大标题
    "mode": "slider",//必填，明细模式： simple:1个字段，mutiple:多个字段，pop:弹出页面，slider:轮播模式，table:表格模式
    "show": true,
    "defaultValue": [{
        "file": "",
        "department": "2"
    }, {
        "file": "",
        "department": "4"
    }],
    "params": [ {
        "show": true,
        "label": "所在部门",
        "type": "label",
        "key": "department"
    }, {
        "readonly": true,
        "show": true,
        "label": "附件",
        "type": "fileUpload",
        "key": "file"
    }],
}
```
##  表格明细
```json {5}
{
    "type":"detail", //必填，组件类型
    "key": "tableDetail", //获取值方法flowFormAPI.getParamValue('tableDetail')
    "title": "表格明细",
    "mode": "table",//必填，明细模式： simple:1个字段，mutiple:多个字段，pop:弹出页面，slider:轮播模式，table:表格模式
    "headerPosition": "left",//表头位置，left：左边、top：上边，默认left
    "show": true,
    "defaultValue": [{
        "file": "",
        "department": "2"
    }, {
        "file": "",
        "department": "4"
    }],
    "params": [{
        "show": true,
        "label": "所在部门",
        "type": "label",
        "key": "department"
    }, {
        "readonly": true,
        "show": true,
        "label": "附件",
        "type": "fileUpload",
        "key": "file"
    }],
}
```