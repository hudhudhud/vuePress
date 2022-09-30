### deptSelect 部门选择（自定义数据源）
- json结构如下：

| 参数      | 说明          | 类型      | 必需        | 默认值  |
|---------- |-------------- |---------- |-------------|-------- |
| type      | 组件类型,该组件为'deptSelect' | String  | 是 | - |
| key       | 字段名称，最终提交的字段 | String  | 是 | - |
| label     | 显示名称 | String  | 是 | - |
| require   | 是否必填 | Boolean  | 否 | false |
| chooseMutiple   | 是否为多选 | Boolean  | 否 | false |
| options   | 获取数据源的函数名称<br>函数会接收两个参数，第一个参数为重置列表项的函数<br>第二个参数为当前的点击数据项，返回整个对象，并且包含parents属性即其上级对象<br>注：第一次加载时，payload为undefined | String  | 是 | - |
| labelKey   | 用来显示在界面上的字段，如返回数据项为[{deptId:1,deptName:'研发部'}]，则labelKey为"deptName" | String  | 否 | label |
| valueKey   | 用来提交时的字段，如返回数据项为[{deptId:1,deptName:'研发部'}]，则valueKey为"deptId" | String  | 否 | value |
| callback   | 值发生变化时的回调函数名称，**注：若js中有重置该组件值时，也会触发该函数** | String  | 否 | - |
| confirmFunc | 点击确认按钮时的回调函数,接收参数同callback | String  | 否 | - |
| attributes  | 组件额外属性，属性包含两个字段：name属性名，value属性值。如[{"name": "class","value": "my-class"}] | Array  | 否 | - |
| events     | 组件额外事件，事件包含两个字段：handler事件名，name事件函数名称。如[{"handler": "click","name": "myclickevent"} | Array  | 否 | - |

```js
/**例如：
    {   "type":"deptSelect",
        "key":"department_customer",
        "label":"部门",
        "require":true,
        "chooseMutiple":true,
        "options":"getDeptData",
        "labelKey":"deptName",
        "valueKey":"deptId",
        "callback":"deptChange"
    }
**/
//  "options":"getDeptData",
function getDeptData(setOptions,payload){
    /*假设当前payload结构为：
    {
        deptId: 21
        deptName: "研发及平台方案部"
        other: "two2",
        hasChild:true,//表示该数据下有子数据
        parents:[{
            deptId: 2
            deptName: "信息技术部"
            other: "two"
        }, {
            deptId: 21
            deptName: "研发及平台方案部"
            other: "two2"
        }]
    }*/
    //第一次加载设置一级部门项
    if(!payload){
        setOptions([
            {deptId:1,deptName:'人力资源部',other:'one',hasChild: true},
            {deptId:2,deptName:'信息技术部',other:'two',hasChild: true},
        ]) 
    }
    //点击某部门后重置列表项
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

//"callback":"deptChange" 
function deptChange(setParam,payload){
    /** payload对象中包括值value(由对象中valueKey的逗号分隔的字符串），如单选时为"1",多选时为"1,2"
        组件字段名称from，组件整个配置对象fromParam，当前作用域的整个表单对象params
        此时payload.fromParam包含选中的项，即payload.fromParam.selectItems，为对象数组,
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
        }]
    **/
    
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