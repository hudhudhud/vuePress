### checkbox 单个复选框
- json结构如下：

| 参数      | 说明          | 类型      | 必需        | 默认值  |
|---------- |-------------- |---------- |-------------|-------- |
| type      | 组件类型,该组件为'checkbox' | String  | 是 | - |
| key       | 字段名称，最终提交的字段 | String  | 是 | - |
| value       | 默认值 | Boolean  | 否 | false |
| label     | 显示名称 | String  | 是 | - |
| require   | 是否必填 | Boolean  | 否 | false |
| show   | 是否显示 | Boolean  | 否 | true |
| readonly   | 是否只读 | Boolean  | 否 | false |
| callback   | 值发生变化时的回调函数名称。<br>接收两个参数，第一个为重置配置的函数，第二个为组件变化的信息对象**注：若js中有重置该组件值时，也会触发该函数** | String  | 否 | - |
| changeFunc | 用户操作时的回调函数,接收参数同callback | String  | 否 | - |
| attributes  | 组件额外属性，属性作用于输入框，属性包含两个字段：name属性名，value属性值（String/Array/Object）,如<br>{"name": "placeholder","value": "请输入姓名!"}<br>{"name": "style","value": {"font-size":"12px"}<br>{"name":"class","value":["my-class1","my-class2"]} | Array  | 否 | - |
| events     | 组件额外事件，事件作用于输入框，事件包含两个字段：handler事件名，name事件函数名称。如[{"handler": "click","name": "myclickevent"} | Array  | 否 | - |


```js
//callback:"change"
function change(setParam,payload){
    //setParam为重置配置的函数，参数为一个数组，数组项为需要设置的组件json对象，<span style='color:red'>表单组件必须指定key!!</span>
    //例如： 重置key为username的组件默认值为 张三 ，且为必填项
    setParam([{key:'username',value:'张三',require:true}]) 
    //例如：一次重置多个组件配置
    setParam([
        {key:'username',value:'张三',require:true},
        {key:'name',attributes:[{name:'placeholder',value:'请输入姓名!!'}]},
        {key:'age',show:false}
    ]) 
    
    //payload对象中包括值value，组件字段名称from，组件整个配置对象fromParam，当前作用域的整个表单对象params
    console.log(payload.value,payload.from,payload.fromParam,payload.params)
}
```