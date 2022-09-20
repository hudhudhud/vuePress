##  flowFormAPI.getParamValue
获取表单内某个组件值的方法，参数为组件对应的字段名
例如：
```js
flowFormAPI.getParamValue('name') //获取字段为name的组件的值
```   
 
##  flowFormAPI.globalSetParam
重置表单组件属性的全局方法，参数为一个数组，数组项为需要设置的组件json对象
该方法同各个组件callback中的参数setParam方法,且该方法支持<span style='color:green'>重置模块</span>
::: warning
表单组件必须指定key(即字段名)，且每个组件的key值唯一，否则只对第一个起作用
:::

例如：
```js
// 重置key为username的组件默认值为 张三 ，且为必填项
flowFormAPI.globalSetParam([{key:'username',value:'张三',require:true}]) 

// 重置key为username的组件隐藏
flowFormAPI.globalSetParam([{key:'username',show:false}]) 

// 重置key为name的组件的placeholder属性
flowFormAPI.globalSetParam([{key:'name',attributes:[{name:'placeholder',value:'请输入姓名！！'}]}]) 

// 重置多个组件
flowFormAPI.globalSetParam([
    {key:'username',value:'张三',require:true},
    {key:'name',attributes:[{name:'placeholder',value:'请输入姓名!!'}]},
    {key:'age',show:false}
]) 

// 重置key为detail的明细表单
flowFormAPI.globalSetParam([{key:'detail',params:[{key:'count',show:false}]}]) //隐藏明细表单内的key为count组件
flowFormAPI.globalSetParam([{key:'detail',defaultValue:[{count:1,name:'one'},{count:2,name:'two'}]}]) //设置明细表单的默认值
```
::: tip
若为明细项内组件之间的联动，需要在明细内部组件的callback方法中的重置参数方法做重置，
<a href="http://mobileproxy.h3c.com:8000/dev/work-flow/#/workflow-form-preview/48" target="_blank">例如明细项中数量、价格、总额的联动</a>
:::

- 重置模块
```js
//隐藏名称为 基础信息 的模块
flowFormAPI.globalSetParam([{module:'基础信息',show:false}])

//隐藏模块编号为 'baseInfo-module' 的模块 
flowFormAPI.globalSetParam([{moduleId:'baseInfo-module',show:false}])
```   
::: warning
若有同名（module相同）的模块，只对第一个起作用；
模块编号（moduleId）在整个表单配置的key(即字段名)中保证唯一
:::

##  flowFormAPI.globalFormResultFunc
获取整个表单json结构数据的方法，返回整个表单json对象
例如：
```js
var formRes = flowFormAPI.globalFormResultFunc()
console.log(formRes.userId)
```

##  flowFormAPI.setDetailItem
重置明细某一项数据的组件的配置
包含三个参数：
<table>
<tr><th>参数名</th><th>类型</th><th>必填</th><th>说明</th></tr>
<tr><td>key</td><td>String</td><td>是</td><td>总明细key值</td></tr>
<tr><td>index</td><td>Int32</td><td>是</td><td>明细项数据序号，从0开始</td></tr>
<tr><td>params</td><td>Array</td><td>是</td><td>重置的组件数组，数组类型</td></tr>
</table>
  
如：
```js
// 重置key为twoDetail的明细组件，第一项明细的price字段组件不显示
flowFormAPI.setDetailItem('twoDetail',0,[{key:'price',show:false}]) 

// 重置key为twoDetail的明细组件，第三项明细的price字段组件值为2
flowFormAPI.setDetailItem('twoDetail',2,[{key:'price',value:2}])

// 重置key为twoDetail的明细组件，第三项明细的mypicker字段组件的选择项
flowFormAPI.setDetailItem('twoDetail',2,[{key:'mypicker',resetOptions:[5,6,7,8]}])

// 重置整个明细数据,根据具体数据情况条件每个组件
flowFormAPI.getParamValue('twoDetail').forEach(function(it,index){
    if(it.sex=="1"){
        flowFormAPI.setDetailItem('twoDetail',index,[{key:'price',show:true}])
    }
    else{
        flowFormAPI.setDetailItem('twoDetail',index,[{key:'price',show:false}])
    }
})
```   
 
##  flowFormAPI.setBottomBtn
重置底部按钮配置信息
参数：
<table>
<tr><th>参数名</th><th>类型</th><th>必填</th><th>说明</th></tr>
<tr><td>type</td><td>String</td><td>是</td><td>如Agree,Reject,Transfer</td></tr>
<tr><td>props</td><td>Object</td><td>是</td><td>重置属性对象，如{show:false,title:'123'}</td></tr>
</table>
例如：
```js
//隐藏同意按钮
flowFormAPI.setBottomBtn('Agree',{show:false})

//修改驳回按钮文案
flowFormAPI.setBottomBtn('Reject',{title:"关闭评审任务"})
```
 
##  flowFormAPI.setHeadConfig
重置头部待办基础信息   
参数：   
<table>
<tr><th>参数名</th><th>类型</th><th>必填</th><th>说明</th></tr>
<tr><td>options</td><td>Object</td><td>是</td><td>
options包含如下属性：
    <table>
        <tr><th>属性名</th><th>类型</th><th>说明</th></tr>
        <tr><td>hide</td><td>Boolean</td><td>是否隐藏</td></tr>
        <tr><td>img</td><td>String</td><td>头像图片链接</td></tr>
        <tr><td>docName</td><td>String</td><td>张三的待办项</td></tr>
    </table>
</td></tr>
</table>
例如：
```js
//隐藏头部：
flowFormAPI.setHeadConfig({hide:true})

//重置头像和文档名称：
flowFormAPI.setHeadConfig({docName:'张三的待办项',img:'https://fviewer.h3c.com/file/down?appid=istage&fileId=16611317369633447'})
```
 
##  flowFormAPI.asyncFunc
表单提交前有异步操作，改成同步   
<table>
<tr><th>参数名</th><th>类型</th><th>必填</th><th>说明</th></tr>
<tr><td>cbFunc</td><td>Function</td><td>是</td><td>
cbFunc包含两个参数：
    <table>
        <tr><th>参数名</th><th>类型</th><th>说明</th></tr>
        <tr><td>successFunc</td><td>Function</td><td>
        异步返回结果后，若结果成功，请调用successFunc，以通知表单继续提交；
        <table>
            <tr><th>参数名</th><th>类型</th><th>必填</th><th>说明</th></tr>
            <tr><td>result</td><td>Boolean/Object</td><td>是</td>
            <td>true，或把表单对象回传（此时提交的表单字段以该对象为准）</td>
            </tr>
        </table>
        </td></tr>
        <tr><td>failFunc</td><td>Function</td>
            <td>
            异步返回结果后，若结果失败，请调用failFunc，此时表单将不再继续提交；
            <table>
                <tr><th>参数名</th><th>类型</th><th>必填</th><th>说明</th></tr>
                <tr><td>msg</td><td>String</td><td>否</td><td>若msg不为空，将会弹出错误信息</td></tr>
            </table>
            </td>
        </tr>
    </table>
</td></tr>
</table>

例如： 
- 提交前有异步操作，该方法需要配置在对应按钮上（若为新建流程则直接配在表单属性的‘提交前校验函数’）  
```js {3,15,18}
function beforSubmit(formRes){
    return flowFormAPI.asyncFunc(function(successFunc,failFunc){//固定写法
        //此处该为业务异步代码，暂用setTimeout模仿异步效果
        setTimeout(function(){
            //异步返回结果
            var res = {
                success:true,
                data:{},
                errorInfo:''
            }
            formRes.user="zhangsan" //修改数据值
            formRes.customerProperty = '追加自定义属性' //可追加属性，提交时将一并提交
            if(res.success){//返回结果成功
                successFunc(formRes) //通知表单可以继续提交（此时提交的表单字段以该对象为准），或者successFunc(true)
            }
            else{ //返回结果失败
                failFunc(res.errorInfo) //弹出错误信息，不再继续提交
            }
        },2000)
    })
}
```
- 提交前为同步操作，该方法需要对应按钮上（若为新建流程则直接配在表单属性的‘提交前校验函数’）
``` js
function beforSubmit(formRes){
    //业务处理代码，此处省略
    
    //一旦点击提交按钮后，提交的数据就已确定;
    //如果想在提交前调整提交数据，用flowFormAPI.globalSetParam等方法修改最终要提交的数据将无效;
    //可以直接修改参数数据，此时需要返回该参数对象，如下
    formRes.user="zhangsan"
    formRes.customerProperty = '追加自定义属性' //可追加属性，提交时将一并提交
    return formRes

    //或者直接返回true，返回值为true才会继续提交,为false则不再提交
    return true
}
```   
 
##  flowFormAPI.baseInfo
当前单据的基础数据，包含如下信息
```json
{
    "code": "", //企业微信域账号密文
    "userId": "hys3032",//企业微信域账号
    "state": 1000020,
    //以下信息具体按照当前流程返回，若是新建流程，则无如下信息
    "currentNodeId": "T10003", //当前流程节点id
    "docId": "0f886b1c05cf9040090a622072f56b077f9b",//单据ID
    "systemId": "IBPM",//系统ID
    "workFlowId": "d0527c0907f8104c620815a07d3fca875f4f",//审批流ID
    "lang": "zh" //当前语言，zh:中文，en:英文
}
```
如
```js
flowFormAPI.baseInfo.userId
>> hys3032
```
  
 
##  flowFormAPI.editDataJson
<a href="http://10.90.15.15:4999/web/#/33?page_id=397" target="_blank">业务接口返回的数据，数据结构同接口文档中的返回实例</a>

```js
// 如获取业务数据返回的整个配置表单数据：
flowFormAPI.editDataJson.data 

// 如获取业务数据返回的当前单据处理人：
flowFormAPI.editDataJson.currentEmpNumber
```  
   
 
##  flowFormAPI.toast
简短的消息提示框，支持自定义位置、持续时间
<table>
<tr><th>参数名</th><th>类型</th><th>必填</th><th>说明</th></tr>
<tr><td>message</td><td>String</td><td>是</td><td>提示信息</td></tr>
<tr><td>position</td><td>String</td><td>否</td><td>提示信息位置，支持'top'，'bottom'，'middle'，默认'middle'</td></tr>
<tr><td>duration</td><td>Int32</td><td>否</td><td>提示持续时间（毫秒），默认2000</td></tr>
</table>
例如：
```js
flowFormAPI.toast('请输入姓名！','middle',1500)
```
    
 
##  flowFormAPI.confirm
确认提示框  
参数：options对象，包含以下属性：
<table>
    <tr><th>参数名</th><th>类型</th><th>必填</th><th>说明</th></tr>
    <tr><td>title</td><td>String</td><td>是</td><td>提示框标题</td></tr>
    <tr><td>content</td><td>String</td><td>是</td><td>提示框内容</td></tr>
    <tr><td>okText</td><td>String</td><td>否</td><td>确认按钮文字，默认‘确认’</td></tr>
    <tr><td>cancelText</td><td>String</td><td>否</td><td>取消按钮文字，默认‘取消’</td></tr>
    <tr><td>onOk</td><td>Function</td><td>否</td><td>点击确认后，回调函数</td></tr>
    <tr><td>onCancel</td><td>Function</td><td>否</td><td>点击取消后，回调函数</td></tr>
</table>
例如： 
```js
flowFormAPI.confirm({
    title: 'test',
    content: '123',
    okText: 'ok',
    cancelText: 'cancel',
    onOk: function () {
        console.log('ok')
    },
    onCancel: function () {
        console.log('onCancel')
    }
})

//若为提交表单前需要确认，因为该弹框为异步组件，要实现同步效果代码如下：
function testSubmit(formRes) {
    return flowFormAPI.asyncFunc(function (successFunc, failFunc) {
        flowFormAPI.confirm({
        title: 'test',
        content: '123',
        okText: 'ok',
        cancelText: 'cancel',
        onOk: function () {
            console.log('ok')
            successFunc(formRes) //此时将提交表单
        },
        onCancel: function () {
            console.log('onCancel')
            failFunc() //此时取消提交表单
        }
        })
    })
}
```
   
##  flowFormAPI.alert
alert提示框  
参数：options对象，包含以下属性：
<table>
    <tr><th>参数名</th><th>类型</th><th>必填</th><th>说明</th></tr>
    <tr><td>title</td><td>String</td><td>是</td><td>提示框标题</td></tr>
    <tr><td>content</td><td>String</td><td>是</td><td>提示框内容</td></tr>
    <tr><td>okText</td><td>String</td><td>否</td><td>确认按钮文字，默认‘确认’</td></tr>
    <tr><td>onOk</td><td>Function</td><td>否</td><td>点击确认后，回调函数</td></tr>
</table>
例如： 
```js
flowFormAPI.alert({
    title: 'test',
    content: '123',
    okText: 'ok',
    onOk: function () {
        console.log('ok')
    }
})
``` 
 
##  flowFormAPI.showLoading
加载提示框，支持自定义文本  
对应关闭提示框：**flowFormAPI.hideLoading**  
例如： 
```js
flowFormAPI.showLoading()
flowFormAPI.showLoading('加载中...')
flowFormAPI.hideLoading()  
``` 
  
 
##  flowFormAPI.descPop
描述弹框  
参数：options对象，包含以下属性：
<table>
    <tr><th>参数名</th><th>类型</th><th>必填</th><th>说明</th></tr>
    <tr><td>title</td><td>String</td><td>是</td><td>描述弹框标题</td></tr>
    <tr><td>content</td><td>String</td><td>是</td><td>描述弹框内容</td></tr>
    <tr><td>height</td><td>Int32</td><td>否</td><td>描述弹框高度，默认400</td></tr>
    <tr><td>onClose</td><td>Function</td><td>否</td><td>点击关闭后，回调函数</td></tr>
</table>
例如： 
```js
flowFormAPI.descPop({title:'标题',content:'内容'}) 
flowFormAPI.descPop({title:'标题',content:'内容',height:200,onClose:function(){alert('弹窗被关闭啦！')}})  
```
  
 
##  flowFormAPI.location
获取当前页面路径参数对象  
包含两个属性：  
- flowFormAPI.location.query
- flowFormAPI.location.params  
例如：
```json
   //当前页面路径为：/workflow-form/26?currentNodeId=1&docId=2&systemId=3&workFlowId=4
   // flowFormAPI.location为
    {
        query:{currentNodeId:"1",docId:"2",systemId:"2",workFlowId:"2"},
        params:{orunid:"26"} //orunid为内部定义，无需理会
    }
``` 
 
##  flowFormAPI.goBack
回退到上一页（如果从企微消息推送进，则直接关闭页面）
例如：
```js
flowFormAPI.goBack()
```
 
##  flowFormAPI.isIOS
是否为IOS端，返回true/false
例如：
```js
flowFormAPI.isIOS()
```
   
 
##  flowFormAPI.isPC
是否为PC端，返回true/false
例如：
```js
flowFormAPI.isPC()
```  
 
##  flowFormAPI.goIframePage
在应用内部预览外部链接方法
参数：
<table>
    <tr><th>参数名</th><th>类型</th><th>必填</th><th>说明</th></tr>
    <tr><td>url</td><td>String</td><td>是</td><td>链接地址</td></tr>
    <tr><td>title</td><td>String</td><td>是</td><td>页面标题</td></tr>
</table>
例如：
```js
flowFormAPI.goIframePage('https://www.baidu.com','百度')
```
 
##  flowFormAPI.moment
时间格式化方法
例如：
获取当前时间
```js
//获取当前时间
flowFormAPI.moment()._d //同new Date()

//当前时间格式化：
flowFormAPI.moment().format('YYYY-MM-DD HH:mm:ss')

//当前时间加一天：
flowFormAPI.moment().add(1, 'days').format('YYYY-MM-DD HH:mm:ss')

//当前时间减一天：
flowFormAPI.moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')
```
:::tip 提示
<a href="http://momentjs.cn/" target="_blank">具体参考 moment 官方文档</a>
:::
 
##  flowFormAPI.openScanQRCode
打开扫一扫，该方法只能在企业微信中使用  
参数：
    cb: 一个函数，作为扫码后回调方法，该方法接收一个参数，为扫码结果  
例如：
```js
flowFormAPI.openScanQRCode(function(data) {
    // data的数据结构为{resultStr: '扫码结果', errMsg: '错误提示'}
    console.log(data)
})
```  