 var tools = {
     /**
      * 获取url中的参数
      * 输入:需要获取的参数名字
      * 返回:参数值
     */
    getQueryString : function(name){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    },

    /**
     * 对象序列化
     * 输入：数组
     * 返回：使用&拼接起来的字符串
     */
    serialize:function(obj) {
        var str = [];
        for (var p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        return str.join("&");
    },
    /**
     * 生成随机数
     * 输入：
     * 返回：随机数
     */
    random: function(){
        var r = Math.random().toString(36).substr(12);
        return r;
    },
    /**
     *  判断对象类型
     *  输入：累类型
     *  返回判断是否为该类型的函数
     */
    isType:function(type){
        return function(o){
            return Object.prototype.toString.call(o) === '[object ' + type + ']';
        }
    },
    /**
     *  获取格式化的日期
     *  输入：整数0，代表获取今天；输入正数n代表获取后n天；输入负数n代表获取前n天
     *  返回判断是否为该类型的函数
     */
    getDate:function(AddDayCount){
        var dd = new Date();
        dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
        var y = dd.getFullYear();
        var m = dd.getMonth()+1;//获取当前月份的日期
        var d = dd.getDate();
        return y+"年"+m+"月"+d+"日";
    },

    /*
     * 判断数值val落在obj的哪个区间里
    */
    inWhich:function(val,obj){
        for(var item in obj){
            for(var i=obj[item].length-1;i>=0;i--){
                if(obj[item][i][0]<=val && obj[item][i][1]>=val){
                    return item
                }
            }
        }
        return "none"
    },
    /*
    * 将分钟转换为最接近的单位 ，2842565分钟->4.7周，28425分钟->7.9小时
    */
    simplifyDate:function(num){
        function toFixed(floatVal, bits){
            var pows;
            bits = bits || 1;

            pows = Math.pow(10, bits);

            if(parseFloat(floatVal) == floatVal){
                return Math.round(floatVal * pows) / pows;
            }
        }
        var similarJudge = {
                '分钟': 60,
                '小时': 3600,
                '天': 86400,
                '周': 604800
            },
            result = num,
            resultJudge,
            tmp;

        //小于1000直接返回
        if(num < 60 ){
            return num;
        }

        for(var judge in similarJudge){
            tmp = num / similarJudge[judge];
            if(tmp > 1 || tmp==1){
                result = tmp;
                resultJudge = judge;
            }else{
                break;
            }
        }
        
        return toFixed(result) + resultJudge;
    },
    copyTextToClipboard:function(text, callback) {

        var textArea = document.createElement("textarea");

        // 设置textArea的位置(固定在屏幕左上角)
        textArea.style.position = 'fixed';
        textArea.style.top = 0;
        textArea.style.left = 0;

        // 设置他的宽和高(如果为0则不起作用)
        textArea.style.width = '0.1em';
        textArea.style.height = '0.1em';

        //设置textArea的padding
        textArea.style.padding = 0;

        // 设置textArea的边框样式
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';

        // 设置textArea的背景为透明的
        textArea.style.background = 'transparent';

        //将textArea值设置为需要复制的文本
        textArea.value = text;

        //把textArea插入到body中
        document.body.appendChild(textArea);

        //选中
        textArea.select();

        //判断浏览器是否支持复制的操作
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';

        if (typeof(callback) === "function") {
            callback(msg);
        } else {
            //默认事件
            if (msg) {
                alert("复制成功");
            } else {
                alert("复制失败");
            }
        }

        document.body.removeChild(textArea);
        return msg;
    },
    clone:function(obj) {
        if(obj == null || typeof(obj) != 'object')
            return obj;
     
        var temp = obj.constructor(); // changed
     
        for(var key in obj) {
            if(obj.hasOwnProperty(key)) {
                temp[key] = clone(obj[key]);
            }
        }
        return temp;
    },
    addEventLoad:function(func){
        var oldOnload = window.onload;
        if(typeof window.onload != 'function'){
            window.onload = func;
        }else{
            window.onload = function(){
                oldOnload();
                func();
            }
        } 
    },
    /**
     * 返回近似值 如10000 -> 10k
     *
     * @method similarNum
     * @param  {Int} num 要转化的数值
     * @return {String}     近似值
     */
    similarNum:function(num){
        function toFixed(floatVal, bits){
            var pows;
            bits = bits || 2;

            pows = Math.pow(10, bits);

            if(parseFloat(floatVal) == floatVal){
                return Math.round(floatVal * pows) / pows;
            }
        }
        var similarJudge = {
                k: 1000,
                w: 10000,
                kw: 10000000
            },
            result = num,
            resultJudge,
            tmp;

        //小于1000直接返回
        if(num < 1000 ){
            return num;
        }

        for(var judge in similarJudge){
            tmp = num / similarJudge[judge];
            if(tmp > 1 || tmp==1){
                result = tmp;
                resultJudge = judge;
            }else{
                break;
            }
        }

        return toFixed(result) + resultJudge;
    }

}
// 单例模式来说一说。

// var single = (function(){ 
//   var result; 
//   return function(obj){ 
//     return result||(result=obj); 
//   } 
// })();
// 将保存结果的变量放到闭包里面，完美的包装了数据，既不会污染全局，而且也十分方便调用。
// var test_inWhich = {
//     "cgi_id_arr" : [ [30000,32000], [35000,36999], [40000, 50000] ],
//     "bus_id_arr" : [ [20000,30000], [60000,70000] ]
// }
// console.info(tools.inWhich(10,test_inWhich));
// console.info(tools.getQueryString("name"))
// var test ={
//     "name":"flora",
//     "age":18
// }
// //name=flora&age=18
// console.info(tools.serialize(test))

// //zbqqa6g21lqsemi
// console.info(tools.random())
// var isArray = tools.isType("Array")
// var test_a = []
// console.info(isArray(test_a))
// console.info(tools.getDate(0))
// console.info(tools.getDate(-2))
// console.info(tools.getDate(25))

/**************************************************************************************/
/*************************************数字格式化*****************************************/
/**************************************************************************************/

/**
  * 给数字添加千分号：12345667-> 12,345,667
  * 输入:数字
  * 返回:字符串
 */
if (typeof Number.prototype.formatNumberRgx != 'function') { 
    Number.prototype.formatNumberRgx = function(){
        var parts = this.toString().split(".");  
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");  
        return parts.join(".");  
    }
}


//console.info((123416815).formatNumberRgx())

/**************************************************************************************/
/*************************************时间戳和日期转换*****************************************/
/**************************************************************************************/
/**
 * 检查输入的一串字符返回时间戳
 * 输入:str  字符串
 * 返回:时间戳
 */
String.prototype.datetime_to_unix = function(){
    var tmp_datetime = this.replace(/:/g,'-');
    tmp_datetime = tmp_datetime.replace(/ /g,'-');
    var arr = tmp_datetime.split("-");
    var now = new Date(Date.UTC(arr[0],arr[1]-1,arr[2],arr[3]-8,arr[4],arr[5]));
    return parseInt(now.getTime()/1000);
}

// console.info("2016-07-15 12:15:00".datetime_to_unix())

Number.prototype.unix_to_datetime = function(){
    var date = new Date(parseInt(this) * 1000);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes()) + ':';
    var s = (date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds()) ;
    return Y+M+D+h+m+s; 
}  

// console.info((1448899200).unix_to_datetime())
// console.info((1466352000).unix_to_datetime())
//去掉字符串头尾空格
if(typeof String.prototype.trim != 'function'){
    String.prototype.trim = function(){
        return this.replace(/(^\s*)|(\s*$)/g, "");

    }
}

/**************************************************************************************/
/*************************************数组操作*****************************************/
/**************************************************************************************/
Array.prototype.max = function() {
    if(this.length>0)
        return this.reduce(function(preValue, curValue,index,array) {
            return preValue > curValue ? preValue : curValue;
        })  

    else
        return 0
}
Array.prototype.min = function() {
    if(this.length>0)
        return this.reduce(function(preValue, curValue,index,array) {
            return preValue < curValue ? preValue : curValue;
        })
    else
        return 0
}
//交换未知
Array.prototype.swap= function(pos_1,pos_2){
    if(pos_2<pos_1){
        pos_1 = pos_1 - pos_2;
        pos_2 = pos_1 + pos_2;
        pos_1 = pos_2 - pos_1;
    }
    var temp_2 = this[pos_2]
    var temp_1 = this[pos_1]

    this.splice(pos_1,1,temp_2)
    this.splice(pos_2,1,temp_1)
    return this
}
/*
    鸭子类型判断

    Object.prototype.toString()，以某个特别的对象为上下文来调用该函数，它会返回正确的类型。
    我们需要做的就是手动处理其返回的字符串，最终便能获得typeof应该返回的正确字符串。

    可以用来区分：Boolean, Number, String, Function, Array, Date, RegExp, Object, Error等等。

    jQuery.type()的源码：


*/

Array.prototype.unique = function () { 
    var newArr = [];
    this.forEach(function (item) { //filter
        (newArr.indexOf(item) == -1) && newArr.push(item);
    });
  
    return newArr;
};
var f_class2type = {} ;
"Boolean Number String Function Array Date RegExp Object Error".split(" ").forEach(function(e,i){
    f_class2type[ "[object " + e + "]" ] = e.toLowerCase();
}) ;
//当然为了兼容IE低版本，forEach需要一个polyfill，不作细谈了。
function _typeof(obj){
    if ( obj == null ){
        return String( obj );
    }
    return typeof obj === "object" || typeof obj === "function" ?
        f_class2type[ f_class2type.toString.call(obj) ] || "object" :
        typeof obj;
}

function uniqArray(arr){
    var searchKey,
        findKey,
        findFlag,
        isObj,
        result = [];

    for(var i = 0; i < arr.length; i++){
        searchKey = arr[i];
        isObj = false;
        findFlag = false;

        if(typeof arr[i] == 'object'){
            searchKey = JSON.stringify(searchKey);
            isObj = true;
        }

        for(var j = 0; j < result.length; j++){
            findKey = result[j];

            if(isObj){
                findKey = JSON.stringify(findKey)
            }

            if(findKey == searchKey){
                findFlag = true;
                break;
            }
        }

        findFlag || ~function(){
            result.push(arr[i]);
        }();

        
    }
    return result;
}
// Value               function   typeof
// -------------------------------------
// "foo"               String     string
// new String("foo")   String     object
// 1.2                 Number     number
// new Number(1.2)     Number     object
// true                Boolean    boolean
// new Boolean(true)   Boolean    object
// new Date()          Date       object
// new Error()         Error      object
// [1,2,3]             Array      object
// new Array(1, 2, 3)  Array      object
// new Function("")    Function   function
// /abc/g              RegExp     object
// new RegExp("meow")  RegExp     object
// {}                  Object     object
// new Object()        Object     object 

 //一下代码参考自scotthuang的wutill
/**
     * 对数组去重
     *
     * @method uniqArray
     * @param  {Array} arr 传入数组
     * @return {Array}     去重后数组
     */
   /* function uniqArray(arr){
        var searchKey,
            findKey,
            findFlag,
            isObj,
            result = [];

        for(var i = 0; i < arr.length; i++){
            searchKey = arr[i];
            isObj = false;
            findFlag = false;

            if(typeof arr[i] == 'object'){
                searchKey = JSON.stringify(searchKey);
                isObj = true;
            }

            for(var j = 0; j < result.length; j++){
                findKey = result[j];

                if(isObj){
                    findKey = JSON.stringify(findKey)
                }

                if(findKey == searchKey){
                    findFlag = true;
                    break;
                }
            }

            findFlag || ~function(){
                result.push(arr[i]);
            }();

            
        }
        return result;
    }*/

/*Array.prototype.unique = function () { 
    var len = this.length
    var newArr = [],tempArr = [];
    var _self = this;
    if( _typeof(this[0])=="object"){
        var obj2string  = []
        for(var i=0;i<len;i++){
            console.info(JSON.stringify(this[i]))
            obj2string.push(JSON.stringify(this[i]))
        }
       
    }else{
        obj2string = this
    }
    obj2string.forEach(function (item) {
        (tempArr.indexOf(item) == -1) && tempArr.push(item);
    });
    for(var i=0;i<tempArr.length;i++){
        newArr.push(JSON.parse(tempArr[i]))
    }
    return newArr;
};*/
Array.prototype.have = function(s){
    for(var i in this){
        if(s == this[i])
            return true
    }
    return false
}

/* 
*   快速排序，按某个属性，或按“获取排序依据的函数”，来排序. 
*   
*   
*   输入：  {array} arr 待处理数组 
*           {string|function} prop 排序依据属性，获取 
*           {boolean} desc 降序 
*   返回：  {array} 返回排序后的新数组 
*/ 
Array.prototype.sortBy =function ( prop, desc){ 
    var props   = [], 
        ret     = [], 
        i       = 0, 
        len     = this.length; 
    if(typeof prop=='string') { 
        for(; i<len; i++){ 
            var oI = this[i]; 
            (props[i] = new String(oI && oI[prop] || ''))._obj = oI; 
        } 
    }else if(typeof prop=='function') { 
        for(; i<len; i++){ 
            var oI = this[i]; 
            (props[i] = new String(oI && prop(oI) || ''))._obj = oI; 
        } 
    } else { 
        throw '参数类型错误'; 
    } 
    props.sort(); 
    for(i=0; i<len; i++) { 
        ret[i] = props[i]._obj; 
    } 
    if(desc) ret.reverse(); 
    return ret; 
}; 

// var sdts = [
//     {name:"b小明",age:12},
//     {name:"a小红",age:13},
//     {name:"c小花",age:11}
// ]
// sdts.sortBy("age",true)
//console.info([1,2,3,12,3,2,1,2,30].unique());


// 聚集arr

Array.prototype.aggregateByAttribute = function(a,name){
    var temp=[],res={}
    for(var i=this.length-1;i>0;i--){
        for(var item in a){
            if(this[i][item]==a[item]){
                temp.push(this[i][name])
                break;
            }
        }
    }
    for(var i=temp.length-1;i>0;i--){
        if(!res[temp[i]])
            res[temp[i]] = 1
        else
            res[temp[i]]++
    }
    return res
}
// var test_data =[{
//         "color" : "red",
//         "smell" :"acidic ",
//         "name"  : "apple"
//     },{
//         "color" : "red",
//         "smell" :"gingery ",
//         "name"  : "spicy"
//     },{
//         "color" : "red",
//         "smell" :" gingery ",
//         "name"  : "ginger"
//     },{
//         "color" : "red",
//         "smell" :" sour",
//         "name"  : "maybush"
//     },{
//         "color" : "yellow",
//         "smell" :" sweet",
//         "name"  : "banana"
// }]

Array.prototype.aggregateByKeyList = function(generality){
    var _temp_res = {}
    for(var i=0;i<this.length;i++){
        var _key = ""
        for(var j=0;j<generality.length;j++){
            _key += this[i][generality[j]]+":"
            
        }
        if(_temp_res[_key]==undefined)
            _temp_res[_key]= []
        _temp_res[_key].push(this[i])
        
    }
    var res=[]
    for(var item in _temp_res){
        res.push({
            "key":item,
            "children":_temp_res[item]
        })
    }
    return res

}

// console.info(test_data.aggregateByAttribute(["color"]))
// console.info(test_data.aggregateByAttribute(["color","smell"]))
Array.prototype.unflatten= function(){


    var tree = [],
          mappedArr = {},
          arrElem,
          mappedElem; 

      // First map the nodes of the array to an object -> create a hash table.
    for(var i = 0, len = this.length; i < len; i++) {
        arrElem = this[i];
        mappedArr[arrElem.id] = arrElem;
        mappedArr[arrElem.id]['children'] = [];
    }


    for (var id in mappedArr) {
        if (mappedArr.hasOwnProperty(id)) {
            mappedElem = mappedArr[id];
            // If the element is not at the root level, add it to its parent array of children.
            if (mappedElem.parentid) {
                mappedArr[mappedElem['parentid']]['children'].push(mappedElem);
            }
            // If the element is at the root level, add it to first level elements array.
            else {
                tree.push(mappedElem);
            }
        }
    }
    return tree;

}
// var obj= [
//     {
//         "name":"a",
//         "status":0  
//     },{
//         "name":"a",
//         "status":1  
//     },{
//         "name":"a",
//         "status":1  
//     },{
//         "name":"a",
//         "status":1  
//     },{
//         "name":"a",
//         "status":1  
//     },{
//         "name":"a",
//         "status":1  
//     },{
//         "name":"a",
//         "status":1  
//     },{
//         "name":"a",
//         "status":1  
//     },{
//         "name":"a",
//         "status":1  
//     },{
//         "name":"b",
//         "status":0  
//     },{
//         "name":"b",
//         "status":0  
//     },{
//         "name":"b",
//         "status":0  
//     },{
//         "name":"b",
//         "status":1  
//     },{
//         "name":"b",
//         "status":1  
//     },{
//         "name":"b",
//         "status":1  
//     },{
//         "name":"b",
//         "status":1  
//     },{
//         "name":"b",
//         "status":1  
//     },{
//         "name":"b",
//         "status":1  
//     },{
//         "name":"b",
//         "status":1  
//     },{
//         "name":"b",
//         "status":1  
//     }
// ]
// var a = {
//     "status":1
// }
// obj.aggregateByAttribute(a,"name")
/**************************************************************************************/
/*************************************数字的验证*****************************************/
/**************************************************************************************/

/**
 * 检查输入的一串字符是否全部是数字
 * 输入:str  字符串
 * 返回:true 或 flase; true表示为数字
 */
if (typeof String.prototype.checkNum != 'function') {  
    String.prototype.checkNum = function (){
        return this.match(/\D/) == null;
    }
}

// //true
// console.info("123".checkNum())
// //false
// console.info("123.1".checkNum())
// //false
// console.info("1w233".checkNum())

/**
 * 检查输入的一串字符是否为小数
 * 输入:str  字符串
 * 返回:true 或 flase; true表示为小数
 */
 // Js 判断前缀  
if (typeof String.prototype.checkDecimal != 'function') {  
    // see below for better implementation!  
    String.prototype.checkDecimal = function (){  
        if (this.match(/^-?\d+(\.\d+)?$/g) == null) {return false;}else {return true;}
    }
}
// //true
// console.info("123".checkDecimal())
// //true
// console.info("123.1".checkDecimal())
// //false
// console.info("1w233".checkDecimal())

/**
 * 检查输入的一串字符是否为整型数据
 * 输入:str  字符串
 * 返回:true 或 flase; true表示为整数
 */
if (typeof String.prototype.checkInteger != 'function') {  
    // see below for better implementation!  
    String.prototype.checkInteger = function (){  
        if (this.match(/^[-+]?\d*$/) == null) {return false; }else {return true;}
    }
}



// console.info("12".checkInteger())
// console.info("-12".checkInteger())
// console.info("12.1".checkInteger())
/**************************************************************************************/
/*************************************字符的验证*****************************************/
/**************************************************************************************/


/**
 * 检查输入的一串字符是否是字符
 * 输入:str  字符串
 * 返回:true 或 flase; true表示为全部为字符 不包含汉字
 */
 if(typeof String.prototype.checkStr != 'function'){
    String.prototype.checkStr = function(){
       if (/[^\x00-\xff]/g.test(this)) {return false;}else {return true;} 
    }
 }
// //true
// console.info("test".checkStr())
// //true
// console.info("1ff123".checkStr())
// //false
// console.info("1中ff123".checkStr())

/**
 * 检查输入的一串字符是否包含汉字
 * 输入:str  字符串
 * 返回:true 或 flase; true表示包含汉字
 */
if(typeof String.prototype.checkChinese != 'function'){
    String.prototype.checkChinese = function(){
        if (escape(this).indexOf("%u") != -1) {return true;}else {return false;}
    }
}
// //false
// console.info("1hello ".checkChinese())
// //true
// console.info("hello 中".checkChinese())


/**
 * 检查输入的邮箱格式是否正确
 * 输入:str  字符串
 * 返回:true 或 flase; true表示格式正确
 */
if(typeof String.prototype.checkEmail != 'function'){
    String.prototype.checkEmail = function(){
        if (this.match(/[A-Za-z0-9_-]+[@](\S*)(net|com|cn|org|cc|tv|[0-9]{1,3})(\S*)/g) == null) {return false;}else {return true;}
    }
}
// //false
// console.info("12hell.".checkEmail())
// //true
// console.info("0603ljx@163.com".checkEmail())

/**
 * 检查输入的手机号码格式是否正确
 * 输入:str  字符串
 * 返回:true 或 flase; true表示格式正确
 */
if(typeof String.prototype.checkMobilePhone != 'function'){
    String.prototype.checkMobilePhone = function(){
        if (this.match(/^(?:13\d|15\d|18\d|17\d)-?\d{5}(\d{3}|\*{3})$/) == null) {return false;}else {return true;}
    }
}
// //false
// console.info("123123".checkMobilePhone())
// //true
// console.info("13570234070".checkMobilePhone())


/**
 * 检查输入的固定电话号码是否正确
 * 输入:str  字符串
 * 返回:true 或 flase; true表示格式正确
 */
if(typeof String.prototype.checkTelephone != 'function'){
    String.prototype.checkTelephone = function(){
        if (this.match(/^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/) == null) {return false;}else {return true;}
    }
}
// //false
// console.info("075712648888".checkTelephone())
// //true
// console.info("0757-12648888".checkTelephone())
/**
 * 检查QQ的格式是否正确
 * 输入:str  字符串
 *  返回:true 或 flase; true表示格式正确
 */
if(typeof String.prototype.checkQQ != 'function'){
    String.prototype.checkQQ = function(){
        if (this.match(/^\d{5,10}$/) == null) {return false;}else {return true;}
    }
}
// //true
// console.info("457018726".checkQQ())
// //false
// console.info("123edd".checkQQ())

/**
 * 检查输入的身份证号是否正确
 * 输入:str  字符串
 *  返回:true 或 flase; true表示格式正确
 */

if(typeof String.prototype.checkCard != 'function'){
    String.prototype.checkCard = function(){
        //15位数身份证正则表达式
        var arg1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
        //18位数身份证正则表达式
        var arg2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[A-Z])$/;
        if (str.match(arg1) == null && str.match(arg2) == null) {return false;}  else {return true;}
    }
}


/**
 * 检查输入的IP地址是否正确
 * 输入:str  字符串
 *  返回:true 或 flase; true表示格式正确
 */
if(typeof String.prototype.checkIP != 'function'){
    String.prototype.checkIP = function(){
        var arg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
        if (this.match(arg) == null) {return false;}else {return true;}
    }
}
// //true
// console.info("127.0.0.1".checkIP())
// //true
// console.info("12.12.11.0".checkIP())
// //false
// console.info("12.1.1".checkIP())

/**
 * 检查输入的URL地址是否正确
 * 输入:str  字符串
 *  返回:true 或 flase; true表示格式正确
 */
if(typeof String.prototype.checkURL != 'function'){
    String.prototype.checkURL = function(){
        if (this.match(/(http[s]?|ftp):\/\/[^\/\.]+?\..+\w$/i) == null) {return false}else {return true;}
    }
}
// //true
// console.info("http://www.qq.com".checkURL())
// //false
// console.info("http://".checkURL())
/**
 * 检查输入的字符是否具有特殊字符
 * 输入:str  字符串
 * 返回:true 或 flase; true表示包含特殊字符
 * 主要用于注册信息的时候验证
 */
if(typeof String.prototype.checkQuote != 'function'){
    String.prototype.checkQuote = function(){
        var items = new Array("~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "{", "}", "[", "]", "(", ")");
        items.push(":", ";", "'", "|", "\\", "<", ">", "?", "/", "<<", ">>", "||", "//");
        items.push("admin", "administrators", "administrator", "管理员", "系统管理员");
        items.push("select", "delete", "update", "insert", "create", "drop", "alter", "trancate");
       
        for (var i = 0; i < items.length; i++) {
            if (this.toLowerCase().indexOf(items[i]) >= 0) {
                return true;
            }
        }
        return false;
    }
}
// //true
// console.info("delete 1212".checkQuote())
// //true
// console.info("@123".checkQuote())
// //false
// console.info("1332hello".checkQuote())



