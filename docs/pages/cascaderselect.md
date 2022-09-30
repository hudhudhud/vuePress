### cascaderselect 级联选择
- json结构如下：

| 参数      | 说明          | 类型      | 必需        | 默认值  |
|---------- |-------------- |---------- |-------------|-------- |
| type      | 组件类型,该组件为'cascaderselect' | String  | 是 | - |
| key       | 字段名称，最终提交的字段 | String  | 是 | - |
| label     | 显示名称 | String  | 是 | - |
| require   | 是否必填 | Boolean  | 否 | false |
| show   | 是否显示 | Boolean  | 否 | true |
| options   | 该options与其他组件不同，options里的每一项都是需要联动的项 | Array  | 是 | - |
| value   | 默认值，包含两个属性，一个值，一个显示在界面上的值，如{"value":"1,11,110","showValue":"浙江-杭州-滨江"} | Array  | 是 | - |
| labelKey   | 用来显示在界面上的字段，如返回数据项为[{deptId:1,deptName:'研发部'}]，则labelKey为"deptName" | String  | 否 | label |
| valueKey   | 用来提交时的字段，如返回数据项为[{deptId:1,deptName:'研发部'}]，则valueKey为"deptId" | String  | 否 | value |
| showValueSplit   | 级联项连接符，显示到输入框格式，如"浙江-杭州-滨江" | String  | 否 | - |
| callback   | 值发生变化时的回调函数名称，**注：若js中有重置该组件值时，也会触发该函数** | String  | 否 | - |
| confirmFunc | 点击确认按钮时的回调函数,接收参数同callback | String  | 否 | - |
| attributes  | 组件额外属性，属性包含两个字段：name属性名，value属性值。如[{"name": "class","value": "my-class"}] | Array  | 否 | - |
| events     | 组件额外事件，事件包含两个字段：handler事件名，name事件函数名称。如[{"handler": "click","name": "myclickevent"} | Array  | 否 | - |

#### options中配置如下
- label显示项名称
- key 显示项字段
- func 初始化数据函数，若非第一项，则为上一项联动该项时的数据初始化函数；该函数接收一个参数，为设置option的函数
- changeFunc 选择发生变化后要触发的函数；函数接收三个参数，分别为设置option的函数、当前选中的id，以及前几项选中项ids（逗号分隔）
- changeKey 需要触发的项的字段名称
如：
```json
[    
    {"label":"省","key":"province","func":"getProvince","changeFunc":"getCity","changeKey":"city"},
    {"label":"市","key":"city","changeFunc":"getArea","changeKey":"area"},
    {"label":"区","key":"area"}
]
``` 
#### options 中fun
- func：接收一个参数，为设置option的函数
```js
function getProvince(setOptions){
    setTimeout(function(){
        let values=[{
            pname:'浙江省',
            pid:1
        },{
            pname:'山西省',
            pid:2
        }]
        setOptions(values)
    },1000)
}  
```
#### options 中 changeFunc
- changeFunc：函数接收到三个参数，设置option的函数和当前选中的id，以及前几项选中项ids（逗号分隔），如下
```js
function getCity(setOptions,id,ids){
    if(id==1){
        setTimeout(function(){
            setOptions([{
                pname:'杭州市',
                pid:11
            },{
                name:'温州市',
                pid:12
            }])
        },1000)
    }
    else{
        setTimeout(function(){
            setOptions([{
                pname:'太原',
                pid:21
            },{
                pname:'大同',
                pid:22
            }])
        },1000)
    }
}
function getArea(setOptions,id,ids){
    if(id==11){
        setTimeout(function(){
            setOptions([{
                pname:'滨江',
                pid:110
            },{
                pname:'萧山',
                pid:111
            }])
        },1000)
    }
    else{
        setTimeout(function(){
            setOptions([{
                pname:'青田',
                id:120
            },{
                pname:'瑞安',
                id:121
            }])
        },1000)
    }
}
```
```js
//"callback":"change"
function change(setParam,payload){
    //setParam为重置配置的函数，参数为一个数组，数组项为需要设置的组件json对象
    //例如： 重置key为username的组件默认值为 张三 ，且为必填项
    setParam([{key:'username',value:'张三',require:true}]) 
    //例如：一次重置多个组件配置
    setParam([
        {key:'username',value:'张三',require:true},
        {key:'name',attributes:[{name:'placeholder',value:'请输入姓名!!'}]},
        {key:'age',show:false}
    ]) 
    
    //payload对象中包括值value，组件字段名称from，组件整个配置对象fromParam，当前作用域的整个表单对象params
    //此时payload.fromParam包含选中的项，即payload.fromParam.selectItems，
    //如[{name:'浙江省',id:1},{name:'杭州市', id:11},{name:'滨江', id:110}]
}

```