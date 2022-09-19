##  getParamValue
获取表单内某个组件值的方法，参数为组件对应的字段名
例如：
```js
flowFormAPI.getParamValue('name') //获取字段为name的组件的值
```   
 
##  globalSetParam
重置表单组件属性的全局方法，参数为一个数组，数组项为需要设置的组件json对象
该方法同各个组件callback中的参数setParam方法,且该方法支持<span style='color:green'>重置模块</span>
::: warning
表单组件必须指定key(即字段名)，且每个组件的key值唯一，否则只对第一个起作用
:::

例如：
- 重置key为username的组件默认值为 张三 ，且为必填项
```js
flowFormAPI.globalSetParam([{key:'username',value:'张三',require:true}]) 
```
- 重置key为username的组件隐藏
```js
flowFormAPI.globalSetParam([{key:'username',show:false}]) 
```
- 重置key为name的组件的placeholder属性
```js
flowFormAPI.globalSetParam([{key:'name',attributes:[{name:'placeholder',value:'请输入姓名！！'}]}]) 
```
- 重置key为detail的明细表单
```js
flowFormAPI.globalSetParam([{key:'detail',params:[{key:'count',show:false}]}]) //隐藏明细表单内的key为count组件
flowFormAPI.globalSetParam([{key:'detail',defaultValue:[{count:1,name:'one'},{count:2,name:'two'}]}]) //设置明细表单的默认值
```
::: tip
若为明细项内组件之间的联动，需要在明细内部组件的callback方法中的重置参数方法做重置，
<a href="http://mobileproxy.h3c.com:8000/dev/work-flow/#/workflow-form-preview/48">例子,如明细项中数量、价格、总额的联动</a>
:::

- 重置多个组件
```js
flowFormAPI.globalSetParam([
    {key:'username',value:'张三',require:true},
    {key:'name',attributes:[{name:'placeholder',value:'请输入姓名!!'}]},
    {key:'age',show:false}
]) 
```
- 重置模块
隐藏名称为 基础信息 的模块
```js
flowFormAPI.globalSetParam([{module:'基础信息',show:false}])
```
::: warning
若有同名（module相同）的模块，只对第一个起作用
:::

隐藏模块编号为 'baseInfo-module' 的模块 
```js
flowFormAPI.globalSetParam([{moduleId:'baseInfo-module',show:false}])
```   
::: warning
需要保证模块编号（moduleId）在整个表单配置的key(即字段名)中保证唯一
:::

##  globalFormResultFunc
获取整个表单json结构数据的方法，返回整个表单json对象
例如：
```js
var formRes = flowFormAPI.globalFormResultFunc()
console.log(formRes.userId)
```

##  setDetailItem
重置明细某一项数据的组件的配置
包含三个参数：
    key:总明细key值；
    index:明细项数据序号，从0开始；
    params:重置的组件数组，数组类型；
如：
- 重置key为twoDetail的明细组件，第一项明细的price字段组件不显示
```js
flowFormAPI.setDetailItem('twoDetail',0,[{key:'price',show:false}]) 
``` 
- 重置key为twoDetail的明细组件，第三项明细的price字段组件值为2
```js
flowFormAPI.setDetailItem('twoDetail',2,[{key:'price',value:2}])
``` 
- 重置key为twoDetail的明细组件，第三项明细的mypicker字段组件的选择项
```js
flowFormAPI.setDetailItem('twoDetail',2,[{key:'mypicker',resetOptions:[5,6,7,8]}])
``` 
- 重置整个明细数据,根据具体数据情况条件每个组件
```js
flowFormAPI.getParamValue('twoDetail').forEach(function(it,index){
    if(it.sex=="1"){
        flowFormAPI.setDetailItem('twoDetail',index,[{key:'price',show:true}])
    }
    else{
        flowFormAPI.setDetailItem('twoDetail',index,[{key:'price',show:false}])
    }
})
```   
 
##  setBottomBtn
重置底部按钮配置信息
参数：
    type:按钮值,字符串类型，如Agree,Reject,Transfer
    props:重置属性对象，如{show:false,title:'123'}
例如：
隐藏同意按钮：
```js
flowFormAPI.setBottomBtn('Agree',{show:false})
```
修改驳回按钮文案：
```js
flowFormAPI.setBottomBtn('Reject',{title:"关闭评审任务"})
```
  
 
##  setHeadConfig
重置头部待办基础信息
参数：
    options:对象类型，包含如下属性：
        hide:false,          //是否隐藏
        img:'https://xxxx/head.jpg',  //头像图片链接
        docName:'张三的待办项' //文档名称
例如：
隐藏头部：
```js
flowFormAPI.setHeadConfig({hide:true})
```
重置头像和文档名称：
```js
flowFormAPI.setHeadConfig({docName:'张三的待办项',img:'https://fviewer.h3c.com/file/down?appid=istage&fileId=16611317369633447'})
```
 
##  asyncFunc
表单提交前有异步操作，改成同步  
参数：  
    cbFunc: 该参数是函数类型，函数内部添加异步逻辑，该函数包含两个参数，successFunc failFunc；  
            即异步返回结果后，若结果成功，调用successFunc，否则调用failFunc;  
            successFunc参数传true，或者把表单对象回传（此时提交的表单字段以该对象为准）;    
            failFunc参数为回调失败信息，字符串类型;    

//提交前有异步操作，该方法需要配置在对应按钮上（若为新建流程则直接配在表单属性的‘提交前校验函数’）  
例如： 
```js
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
                successFunc(formRes) //通知表单提交（此时提交的表单字段以该对象为准），或者successFunc(true)
            }
            else{ //返回结果失败
                failFunc(res.errorInfo) //弹出错误信息
            }
        },2000)
    })
}
```
//提交前为同步操作，该方法需要对应按钮上（若为新建流程则直接配在表单属性的‘提交前校验函数’）
``` js
function beforSubmit(formRes){
    //业务处理代码
    
    //一旦点击提交按钮后，提交的数据就已确定;
    //如果想在提交前调整提交数据，用flowFormAPI.globalSetParam等方法修改最终要提交的数据将无效;
    //可以直接修改参数数据，此时需要返回该参数对象，如下
    formRes.user="zhangsan"
    formRes.customerProperty = '追加自定义属性' //可追加属性，提交时将一并提交
    return formRes

    //或者直接返回true，返回值为true才会继续提交,为false则不再提交
    reurn true
}
```   
 
##  baseInfo
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
> hys3032
```
  
 
##  editDataJson
<a href="http://10.90.15.15:4999/web/#/33?page_id=397" target="_blank">业务接口返回的数据，数据结构同接口文档中的返回实例</a>
如获取业务数据返回的整个配置表单数据：
```js
flowFormAPI.editDataJson.data 
```
如获取业务数据返回的当前单据处理人：
```js
 flowFormAPI.editDataJson.currentEmpNumber
```  
   
 
##  toast
简短的消息提示框，支持自定义位置、持续时间：
参数：
    message:提示信息，
    position:提示信息位置，支持'top'，'bottom'，'middle'，默认'middle'
    duration:提示持续时间（毫秒），默认2000
例如：
```js
flowFormAPI.toast('请输入姓名！','middle',1500)
```
    
 
##  confirm
确认提示框
参数：options对象，包含以下属性：
    title：提示框标题
    content：提示框内容
    okText：确认按钮文字，默认‘确认’
    cancelText：取消按钮文字，默认‘取消’
    onOk：点击确认后，回调函数；
    onCancel：点击取消后，回调函数
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
```
::: tip
若为提交表单前需要确认，因为该弹框为异步组件，要实现同步效果代码如下：
:::
```js
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
   
 
##  alert
alert提示框
参数：options对象，包含以下属性：
    title：提示框标题
    content：提示框内容
    okText：确认按钮文字，默认‘确认’
    onOk：点击确认后，回调函数；
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
 
##  showLoading
加载提示框，支持自定义文本
对应关闭提示框：flowFormAPI.hideLoading
例如： 
```js
flowFormAPI.showLoading()
flowFormAPI.showLoading('加载中...')
flowFormAPI.hideLoading()  
``` 
  
 
##  descPop
描述弹框，
参数：options对象，包含以下属性：
title：描述弹框标题
content：描述弹框内容
height：描述弹框高度，默认400
onClose:点击关闭后，回调函数；
例如： 
```js
flowFormAPI.descPop({title:'标题',content:'内容'}) 
flowFormAPI.descPop({title:'标题',content:'内容',height:200,onClose:function(){alert('弹窗被关闭啦！')}})  
```
  
 
##  location
获取当前页面路径参数对象
包含两个属性：
    flowFormAPI.location.query
    flowFormAPI.location.params
例如：若当前页面路径为：/workflow-form/26?currentNodeId=1&docId=2&systemId=3&workFlowId=4
    flowFormAPI.location为
```json
    {
        query:{currentNodeId:"1",docId:"2",systemId:"2",workFlowId:"2"},
        params:{orunid:"26"} //orunid为内部定义，无需理会
    }
``` 
 
##  goBack
回退到上一页（如果从企微消息推送进，则直接关闭页面）
例如：
```js
flowFormAPI.goBack()
```
 
##  isIOS
是否为IOS端，返回true/false
例如：
```js
flowFormAPI.isIOS()
```
   
 
##  isPC
是否为PC端，返回true/false
例如：
```js
flowFormAPI.isPC()
```  
 
##  goIframePage
在应用内部预览外部链接方法
参数：
    url: 链接地址
    title：页面标题
例如：
```js
flowFormAPI.goIframePage('https://www.baidu.com','百度')
```
 
##  moment
时间格式化方法
例如：
获取当前时间
```js
flowFormAPI.moment()._d //同new Date()
```
当前时间格式化：
```js
flowFormAPI.moment().format('YYYY-MM-DD HH:mm:ss')
```
当前时间加一天：
```js
flowFormAPI.moment().add(1, 'days').format('YYYY-MM-DD HH:mm:ss')
```
当前时间减一天：
```js
flowFormAPI.moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')
```
:::tip
<a href="http://momentjs.cn/" target="_blank">具体参考 moment 官方文档</a>
:::
 
##  openScanQRCode
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