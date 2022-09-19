### deptSelect 部门选择（自定义数据源）
```json
{
    "type": "deptSelect", //必填，组件类型
    "key":"department", //必填，字段名称；且为input元素上data-key属性值，获取值方法flowFormAPI.getParamValue('department')
    "label":"自定义部门",                           
    "require": false,
    "chooseMutiple": true, //是否为多选
    "options":"getDeptData",//必填，字符串（函数名称）,
    //非必填，对应返回数据项中对象的字段，如返回数据项为[{deptId:1,deptName:'研发部'}]，则显示字段为"deptName";不填时默认"label"
    "labelKey":"deptName",
    //非必填，对应返回数据项中对象字段，如返回数据项为[{deptId:1,deptName:'研发部'}]，则保存字段为"deptId";不填时默认"value"
    "valueKey":"deptId",
    "callback": "deptChange",//值发生变化时的回调函数,,注：js中重置值时，也会触发该函数
    "confirmFunc":"confirm",//点击确认按钮时的回调函数,接收参数同callback
    //以下配置项同input，作用于input
    "attributes": [],//如果是class或style，作用到组件最外层
    "events": [],
}
```
```js
/**options:获取数据源的函数，接收两个参数，第一个参数为重置列表项的函数，
第二个参数为当前的点击数据项，返回整个对象，并且包含parents属性即其上级对象,注：第一次加载时，payload为undefined
payload结构：**/
{
    deptId: 21
    deptName: "研发及平台方案部"
    other: "two2"
    parents:[{
        deptId: 2
        deptName: "信息技术部"
        other: "two"
    }, {
        deptId: 21
        deptName: "研发及平台方案部"
        other: "two2"
    }]
}
/**例如：**/
function getDeptData(setOptions,payload){
    // 数据源格式：hasChild=true表示该数据下有子数据
    //第一次加载设置一级部门项
    if(!payload){
        setOptions([
            {deptId:1,deptName:'人力资源部',other:'one',hasChild: true},
            {deptId:2,deptName:'信息技术部',other:'two',hasChild: true},
        ]) 
    }
    //点击项后重置列表项
    else{
        if(payload.deptId==1){
            setTimeout(function(){
                setOptions([
                    {deptId:10,deptName:'人才管理部',other:'one1',hasChild: false},
                    {deptId:11,deptName:'合作管理部',other:'two1',hasChild: false},
                ])
            }, 500);
        }
        else if(payload.deptId==2){
            setOptions([
                {deptId:20,deptName:'IT基础架构部',other:'one2',hasChild: false},
                {deptId:21,deptName:'研发及平台方案部',other:'two2',hasChild: false},
            ])
        }
        else{
            setOptions([])
        }
    }
}

/** callback：所有组件都有该配置项，组件内部值发生变化时触发,注：js中重置值时，也会触发该函数
接收两个参数，第一个为重置配置的函数，第二个为组件变化的信息对象，如下：**/
function deptChange(setParam,payload){
    //payload对象中包括值value(由对象中valueKey的逗号分隔的字符串），如单选时为"1",多选时为"1,2"
    //组件字段名称from，组件整个配置对象fromParam，当前作用域的整个表单对象params
    /**此时payload.fromParam包含选中的项，即payload.fromParam.selectItems，为对象数组,
    如[{
        deptId: 21
        deptName: "研发及平台方案部"
        other: "two2"
        parents:[{
            deptId: 2
            deptName: "信息技术部"
            other: "two"
        }, {
            deptId: 21
            deptName: "研发及平台方案部"
            other: "two2"
        }]
    }]**/

    
    if(!payload.fromParam.selectItems)return
    let showValues=[]
    payload.fromParam.selectItems.forEach(function(item){
        showValues.push(item.deptName)
    })
    setParam([{
        key:'department_customer',
        value:{
            value:payload.value,//最终保存到数据库的值
            showValue:showValues.join(',')//显示在输入框里的值
        }
    }])  
}
```