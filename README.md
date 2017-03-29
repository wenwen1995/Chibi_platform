# Chibi_platform

# 赤壁平台用户登录注册的优化方案修改  #
最后的效果是这样的（只截取其中的一部分）：

![](http://i1.piimg.com/567571/37179be34168e028.png)

![](http://i2.muimg.com/567571/afd3a9a9ec323081.png)

![](http://i1.piimg.com/567571/0f1e74ba6b9674ba.png)

![](http://i1.piimg.com/567571/f8a3fb86da617430.png)

做的过程还是遇到挺多问题的，因为要兼容到ie6+,代码改了好几遍，包括功能上的还有兼容性的，最终完成了。这里来总结一下中间遇到的坑及解决方法吧。（实现功能的代码在j文件夹下的index.js里）

前提说明，模块一共分为9部分，分别是：

**0：绑定手机**

1：开始绑定手机步骤

**2：已经绑定手机（修改+解绑）**

3：修改手机号步骤

4：解绑手机号步骤

**5：绑定令牌**

6：开始绑定令牌步骤

**7：已经绑定令牌**

8：解绑令牌步骤

（其中0，2，5，7模块就是没有相关步骤的界面，属于父页面，而1，3，4，6，8都属于点击前者出现的子界面）

## 1. 首先就是这些所有的模块中，要每1s动态的查看到它们是显示还是隐藏，因为当点击返回按钮时，要隐藏当前显示的子界面，将原来的父界面重新显示，同时将原来子界面填写的表单内容清空，header高亮重新回到第一个位置 ##

            var arr = [];
			var newArr = []; //存放最终的数组
            var result = {};
            var timer1 = setInterval(function(){ //每1s去查看安全设置当前显示的元素是，把它放入数组中
                $('.securit').children().children().each(function() {
                    if ($(this).css('display') == 'block') {
                        arr.push($(this).data('index'));
                        for (var j = 0; j < arr.length; j++) { //去除这个过程中重复的元素
                             if(!result[arr[j]]){
                                 newArr.push(arr[j]);
                                 result[arr[j]] = 1;
                             }
                            //if (newArr.indexOf(arr[j]) == -1) {
                            //   newArr.push(arr[j]);
                            //}
                        }
                    }
                });
           },1000); 


这里要注意的是，上述代码注释的部分原来也是在遍历原数组时，删除重复的元素，只保留其一的方法，但是因为IE浏览器不支持indexOf的方法，所以采用了其他的方法来删除重复元素。这里有一篇博客数组去重写的挺好的，可以看看：[http://www.cnblogs.com/lhyhappy65/p/5912460.html](http://www.cnblogs.com/lhyhappy65/p/5912460.html)

## 2、在此页面中，也涉及到了闭包循环的问题，希望每次循环打印出依次的i值，有3种方法实现。遇到坑的就是写了es6的语法:let，但是IE低版本浏览器不支持，所以就换了其他的写法。这里再复习一下##

    for(var i = 0;i<5;i++){
	 setTimeOut(function(){
	  console.log(i)
	 },1000);
	}
	期待的结果是每隔1s打印出0,1,2,3,4,5
	但是！结果却是这样的：打印了5次的5 ！！
 	解释出现5的原因：因为当i=5时会跳出循环，所以输出的结果反映的是i在循环结束后的最终值
	这与我们的初衷不符合。。我们想要获取的是每个i值。出现这样的原因是因为它们都闭包在同一个共享的全局作用域中，而事实上只有一个i值


有解决办法么？有3种写法：

**方法1：这样写**

    for(var i = 0;i<5;i++){
        (function(){
            var j = i;
              setTimeout(function(){
                   console.log(j)
               },1000)
        })()
    }
	即在闭包里拥有自己的变量，每次迭代时对i值进行一个拷贝

变形的写法：

	 for(var i = 0;i<5;i++){
        (function(i){
              setTimeout(function(){
                   console.log(i)
               },1000)
        })(i);
    }
	即在每次在迭代时创建一个新的作用域（也可以说需要一个块级作用域）

**方法2：这样写：**

	let声明，它劫持一个块儿，并且在这个块儿中声明一个变量，这实质上将块儿变成了一个我们可以闭包的作用域

	for(var i = 0;i<5;i++){
	 let j = i;
	 setTimeOut(function(){
	  console.log(j)
	 },1000);
	}
	依次打印出0,1,2,3,4


**方法3：这样写：**

	for(let i = 0;i<5;i++){
	 setTimeOut(function(){
	   console.log(i)
	 },1000);
	}
	//用于for循环的let声明被定义了一种特殊行为，这种行为即不是只为循环声明一次，而是为每次迭代声明一次，并且，它将在每次后续的迭代中被上一次迭代末尾的值初始化


## 3、如何获取select下选中的option值 ##

   	<select id="select1" name="myselect">
     <option value="0">手机号</option>
     <option value="1">身份证号</option>
 	</select>
 	
	用jQuery很好实现：$('#select1 option:selected').val();

**但是IE低版本的浏览器不支持css3伪类的写法，所以得用原生的js实现**
index.js这里，结构主要是这样的：

	$(function(){
		var oPage = {
		   init:function(){
			  this.view(); 
			  ......//很多方法
		 	}
		  ，view:function(){
		      ....
		   }
		  oPage.init();
		};
	})();

这里定义了一个方法为getDefaultOption方法，因为后端渲染页面是不确定当前select下的option有2个还是1个，所以要先进行判断
	
	var select1 = document.getElementById('select1');
	oPage.getDefaultOption(select1);

   	这里定义一个getDefaultOption的方法：

   	getDefaultOption: function (id) {
            optionLen = id.options.length; //获得当前select下的option数量
            defaultID = $(id).attr('id'); //获得当前select的id名
            if (optionLen == 1) { //如果select下的option数量为1
                optionVal = id.options[0].value; //获取仅有的option值
                // console.log(optionVal)
                if (optionVal == 0) { //显示对应的手机号内容
                    $('#' + defaultID).parents().find('.tokenPho').show();
                    $('#' + defaultID).parents().find('.tokenIdentify').hide();
                } else { //显示身份证号内容
                    $('#' + defaultID).parents().find('.tokenPho').hide();
                    $('#' + defaultID).parents().find('.tokenIdentify').show();
                }
            } else { //如果select下的option数量为2
                //如果未点击select选框，则默认为第一个option的value值
                if (!flag4 || !flag5) {  //flag4,flag5表示是否点击select选框，默认为false,这里2个变量是因为页面有2个select选框，默认为false
                    optionVal = id.options[0].value;
                }
            }
        }

当然这里还需要一个函数，就是当用户选择select下的option时，要获取对应的value值，并显示对应的内容

	//如果点击了，则获取选中的value值
    $('#select1').on('change', function () {
       flag4 = true;
       getselectID = $(this).attr('id');
       oPage.selectType(getselectID); //令牌绑定时得到选取的option值
    });

这里定义一个方法为selectType

	  selectType: function (getselectID) {
            var sel = document.getElementById(getselectID); 
            selectIndex = sel.selectedIndex;//获得选中的index序号
            optionVal = sel.options[selectIndex].value; //获得选中的option的value值
            if (optionVal == 0) {
                $('#' + getselectID).parent().parent().find('.tokenPho').show();
                $('#' + getselectID).parent().parent().find('.tokenIdentify').hide();
            } else {
                $('#' + getselectID).parent().parent().find('.tokenPho').hide();
                $('#' + getselectID).parent().parent().find('.tokenIdentify').show();
            }
        }


问题中间出现挺多的，好在都一一解决了。。

但是看了一下自己写的代码，虽然功能都实现了，篇幅很长，还是有很多优化的地方，

比如表单验证的一部分，手机号身份证号验证那里基本内容相同，写了2遍。。下次写的时候应该将表单验证，失去焦点验证，单独提取到一个js文件里，写一个function,针对所有的表单元素进行验证。

比如，一般推荐不要定义过多的全局变量，但是自己还定义了蛮多的。。所以这个方面还得注意...


**嗯，之后写代码，应该多想想如何优化代码，将代码写的更好更优雅，而不是写出只实现了功能的一堆冗余代码...**


*2017.3.29小记*
 				                                                                            
                                                                                                               
																								


	


  


