### picker 下拉选择
 - json结构如下：

| 参数      | 说明          | 类型      | 必需        | 默认值  |
|---------- |-------------- |---------- |-------------|-------- |
| type      | 组件类型,该组件为'picker' | String  | 是 | - |
| key       | 字段名称，最终提交的字段 | String  | 是 | - |
| value       | 支持对象类型，如：{"value":1,//实际值 "showValue":"one"//显示值} | String/Object  | 否 | - |
| label     | 显示名称 | String  | 是 | - |
| require   | 是否必填 | Boolean  | 否 | false |
| show   | 是否显示 | Boolean  | 否 | true |
| readonly   | 是否只读 | Boolean  | 否 | false |
| options   | 数据源，数组或<br>获取数据源的函数名称<br>函数会接收两个参数，第一个参数为重置列表项的函数<br>第二个参数为基础数据的对象 | Array/String  | 是 | - |
| labelKey   | 用来显示在界面上的字段，如返回数据项为[{deptId:1,deptName:'研发部'}]，则labelKey为"deptName" | String  | 否 | label |
| valueKey   | 用来提交时的字段，如返回数据项为[{deptId:1,deptName:'研发部'}]，则valueKey为"deptId" | String  | 否 | value |
| callback   | 值发生变化时的回调函数名称。<br>接收两个参数，第一个为重置配置的函数，第二个为组件变化的信息对象**注：若js中有重置该组件值时，也会触发该函数** | String  | 否 | - |
| confirmFunc | 点击确认按钮时的回调函数,接收参数同callback | String  | 否 | - |
| attributes  | 组件额外属性，属性作用于输入框，属性包含两个字段：name属性名，value属性值（String/Array/Object）,如<br>{"name": "placeholder","value": "请输入姓名!"}<br>{"name": "style","value": {"font-size":"12px"}<br>{"name":"class","value":["my-class1","my-class2"]} | Array  | 否 | - |
| events     | 组件额外事件，事件作用于输入框，事件包含两个字段：handler事件名，name事件函数名称。如[{"handler": "click","name": "myclickevent"} | Array  | 否 | - |

#### options:若该项配置为字符串，即函数名称，该函数包含两个参数：
- setOptions：设置选择项的方法，该方法需要一个数组参数 ，即最终得到的选择项数据；
- payload：基础数据

如"options":"getNumber"
```js
function getNumber(setOptions){
    setTimeout(function(){
        setOptions([1,2,3,4,5])
    },2000)
}
```

#### callback:该函数包含两个参数
- setParam 重置配置的函数，参数为一个数组，数组项为需要设置的组件json对象
- payload 数据对象：
```json
{
    "value":"",//选中值,
    "from":"",//组件字段名称
    "fromParam":{//组件整个配置对象
        "selectItems":[] //当chooseMutiple为true则返回数组如[{'label':'1','value':'11'}]，否则为单个对象如{'label':'1','value':'11'}，默认为undefined
    },
    "params":{}//当前作用域的整个表单对象
}
```
例如："callback":"change"
``` js {13}
// options为对象数组
// "options": [{
//         "label": "未落实",
//         "value": "1"
//       }, {
//         "label": "落实中",
//         "value": "2"
//       }, {
//         "label": "已完成",
//         "value": "3"
//       }]
function change(setParam,payload){
    let val = payload.value.value
    if (val == 1) {
        setParams([ {
            key: 'measure',
            show: true
        }])
    }
    else if (val == 2) {
        setParams([ {
            key: 'measure',
            show: false
        }])
    }
    //payload对象中包括值value，组件字段名称from，组件整个配置对象fromParam，当前作用域的整个表单对象params
    //此时payload.fromParam包含选中的项，即payload.fromParam.selectItems
}
```
``` js {4}
// options为值数组
// "options": [1,2,3]
function change(setParam,payload){
    let val = payload.value
    if (val == 1) {
        setParams([ {
            key: 'measure',
            show: true
        }])
    }
    else if (val == 2) {
        setParams([ {
            key: 'measure',
            show: false
        }])
    }
}
```

::: tip
注：如果需要动态修改picker里的options时，需要重置该字段的resetOptions属性（而非options），如
```js
setParam([{key:'number',"resetOptions":[1,2,3]}])
```
:::