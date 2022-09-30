### searchSelect 搜索选择：
- json结构如下：

| 参数      | 说明          | 类型      | 必需        | 默认值  |
|---------- |-------------- |---------- |-------------|-------- |
| type      | 组件类型,该组件为'searchSelect' | String  | 是 | - |
| key       | 字段名称，最终提交的字段 | String  | 是 | - |
| label     | 显示名称 | String  | 是 | - |
| value     | 默认值，值类型，或者对象类型(显示值与保存值不一样时，如{"value":"11,22,33","showValue":"1,2,3"}) | String/Object  | 否 | - |
| require   | 是否必填 | Boolean  | 否 | false |
| chooseMutiple   | 是否为多选 | Boolean  | 否 | false |
| options   | 数据源(数组类型)，若需要默认选中某一项，该数据项需要包含"defaultChecked":true<br>获取数据源的函数名称<br>函数会接收两个参数，第一个参数为重置列表项的函数<br>第二个参数为基础数据的对象 | Array/String  | 是 | - |
| labelKey   | 用来显示在界面上的字段，如返回数据项为[{deptId:1,deptName:'研发部'}]，则labelKey为"deptName" | String  | 否 | label |
| valueKey   | 用来提交时的字段，如返回数据项为[{deptId:1,deptName:'研发部'}]，则valueKey为"deptId" | String  | 否 | value |
| labelKey1   | 用来显示在界面上的第二个字段 | String  | 否 | - |
| labelKey2   | 用来显示在界面上的第三个字段 | String  | 否 | - |
| showSearchInput   | 是否显示搜索框 | Boolean  | 否 | true |
| searchPlaceHolder   | 搜索框placeholder | String  | 否 | '请输入关键字搜索' |
| searchFunc   | 搜索时触发的函数名称 | String  | 否 | - |
| pagenble   | 是否分页 | Boolean  | 否 | false |
| pageSize   | 分页条数 | Int32  | 否 | 20 |
| callback   | 值发生变化时的回调函数名称，**注：若js中有重置该组件值时，也会触发该函数** | String  | 否 | - |
| confirmFunc | 点击确认按钮时的回调函数,接收参数同callback | String  | 否 | - |
| attributes  | 组件额外属性，属性包含两个字段：name属性名，value属性值。如[{"name": "class","value": "my-class"}] | Array  | 否 | - |
| events     | 组件额外事件，事件包含两个字段：handler事件名，name事件函数名称。如[{"handler": "click","name": "myclickevent"} | Array  | 否 | - |


#### options:若该项配置为字符串，即函数名称，该函数包含两个参数：
- setOptions：设置选择项的方法，该方法需要一个数组参数 ，即最终得到的选择项数据；
- payload：基础数据

```js
// 如配置options:'getData'，则实现方法如下
function getData(setOptions,payload){
    //延时操作模仿异步
    setTimeout(function(){
        setOptions([
            {'title':'1','pid':'11',"txt":'label1',"label2":"label2"},
            {'title':'2','pid':'22',"txt":'label1',"label2":"label2"},
        ])
    },1000)
}
```
#### callback:该函数包含两个参数
- setParam 重置配置的函数，参数为一个数组，数组项为需要设置的组件json对象
- payload 数据对象：
```json
{
    "value":"",//选中值
    "from":"",//组件字段名称
    "fromParam":{//组件整个配置对象
        "selectItems":[] //当chooseMutiple为true则返回数组如[{'label':'1','value':'11'}]，否则为单个对象如{'label':'1','value':'11'}，默认为undefined
    },
    "params":{}//当前作用域的整个表单对象
}
```
例如：
``` js
function change(setParam,payload){
    //重置key为username的组件默认值为 张三 ，且为必填项
    setParam([{key:'username',value:'张三',require:true}]) 
    //一次重置多个组件配置
    setParam([
        {key:'username',value:'张三',require:true},
        {key:'name',attributes:[{name:'placeholder',value:'请输入姓名!!'}]},
        {key:'age',show:false}
    ]) 
}
```
#### searchFunc:搜索函数，当输入框有值时，自动触发。该函数包含两个参数：
- setOptions：设置选择项的方法，该方法需要一个数组参数 ，即最终得到的选择项数据；
- payload：基础数据，输入的关键字为payload.searchStr

例如：
``` js
function searchFunc(setOptions,payload){
    setTimeout(function(){
        if(payload.searchStr){
            setOptions([
                {'title':'1','pid':'11',"txt":'label1',"label2":"label2"},
                {'title':'2','pid':'22',"txt":'label1',"label2":"label2"},
            ])
        }
        else{
            setOptions([])
        }
    },1000)
} 
```
#### pagenble为true时，options（为函数时）和searchFunc接收参数的payload中，包含分页信息如下
```js
function pageFunc(setOptions,payload){
    let pageIndex = payload.pageIndex //页码
    let pageSize = payload.pageSize  //每页数据条数
    let searchStr = payload.searchStr //搜索文字
    setOptions([
       // ...
    ])
}
```
::: tip
注：如果需要动态修改searchSelect里的options时，需要重置该字段的resetOptions属性（而非options），如
```js
setParam([{key:'friends',"resetOptions":{id:1,name:"one"},{id:2,name:"two"}}])
```
:::