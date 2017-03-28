/*
 测试数据
 */
$(function () {
    var ui = {
        $boundPhone: $('.boundPhone') //绑定手机按钮
        , $devide: $('.devide') //分割线
        , $Tok: $('.Tok ') //绑定令牌大的div
        , $Pho: $('.Pho')
        , $boundPhoneSteps: $('#boundPhoneSteps') //绑定手机步骤大的box
        , $releasePhoneSteps: $('#releasePhoneSteps') //解绑手机步骤大的box
        , $Tel: $('.Tel') //手机号输入框
        , $code: $('.code') //验证码输入框
        , $currentTel: $('.currentTel') //原手机号输入框
        , $currentCode: $('.currentCode') //原验证码输入框
        , $nowTel: $('.nowTel') //新手机号输入框
        , $nowCode: $('.nowCode') //新验证码输入框
        , $vali: $('.vali') //验证信息
        , $sendVerifi: $('.sendVerifi') //发送验证码
        , $blueHeader1: $('.blueHeader1') //绑定手机步骤中蓝色的头部
        , $boundPhoneBtn: $('.boundPhoneBtn') //绑定手机按钮
        , $finishBoundPhone: $('.finishBoundPhone')  //完成绑定手机的大div
        , $finishBoundNewPhone: $('.finishBoundNewPhone')  //完成绑定新手机的大div
        , $unboundPhone: $('.unboundPhone') //未绑定手机
        , $alreadyBoundPhone: $('.alreadyBoundPhone') //已绑定手机
        , $unboundToken: $('.unboundToken')  //未绑定令牌
        , $alreadyBoundToken: $('.alreadyBoundToken') //已绑定令牌
        , $alreadyBound: $('.alreadyBound')
        , $unbound: $('.unbound')
        , $confirm1: $('.confirm1') //完成手机验证的确定按钮
        , $confirm2: $('.confirm2') //完成新手机验证的确定按钮
        , $confirm3: $('.confirm3') //完成绑定令牌验证的确定按钮
        , $confirm4: $('.confirm4')  //完成解绑令牌验证的确定按钮
        , $secretNum: $('.secretNum') //隐藏5位的手机号码
        , $revisePhone: $('#revisePhone') //修改手机号码按钮
        , $releasePhone: $('#releasePhone') //解绑手机号码按钮
        , $modifyPho: $('.modifyPho') //修改手机大的box
        , $next: $('.next') //修改手机号的下一步按钮
        , $nowBtn: $('.nowBtn') //新手机号的确定按钮
        , $now: $('.now') //绑定新手机的大盒子
        , $current: $('.current')  //旧手机的大盒子
        , $phoneQuestion: $('.phoneQuestion')
        , $TokenQuestion: $('.TokenQuestion')
        , $start: $('.start')
        , $boundToken: $('.boundToken')  //绑定令牌按钮
        , $reviseToken: $('.reviseToken') //解绑令牌按钮
        , $select1: $('#select1') //多选框1
        , $select2: $('#select2') //多选框2
        , $verifyCardBtn: $('.verifyCardBtn') //立即验证身份证号按钮
        , $verifyPhoneBtn: $('.verifyPhoneBtn') //立即验证手机号按钮
        , $startBoundToken: $('.startBoundToken')
        , $download: $('.download') //下载令牌div
        , $boundTokenSteps: $('.boundTokenSteps') //绑定令牌步骤
        , $tokenstep: $('.tokenstep') //绑定令牌的步骤栏
        , $outtoken: $('.outtoken') //解绑令牌的步骤栏
        , $scanNext: $('.scanNext') //绑定令牌步骤的扫描下载app的下一步按钮
        , $getDynamic: $('.getDynamic') //获取动态口令大的div
        , $dynamicPassInput: $('.dynamicPassInput') //动态口令输入框
        , $finishDynamic: $('.finishDynamic') //完成动态口令绑定按钮
        , $finishToken: $('.finishToken') //第四步完成绑定令牌大的div
        , $outVerifySucce: $('.outVerifySucce') //解绑第二步div
        , $Unbundling: $('.Unbundling') //解绑步骤中的解绑令牌按钮
        , $outSucsess: $('.outSucsess') //解绑步骤最后一步div
        , $ToksendVerifi: $('.ToksendVerifi1 ') //开始绑定令牌的立即验证
        , $ToksendVerifi2: $('.ToksendVerifi2 ') //解绑令牌的手机号立即验证
        , $ToksendVerifi3: $('#ToksendVerifi2 ') //解绑手机的立即验证
        , $task1: $('.task1')
        , $task2: $('.task2')
        , $task3: $('.task3')
        , $task4: $('.task4')
        , $inputCode: $('.inputCode')
        , $back: $('.back') //返回按钮
    };


    var oConfig = window.oPageConfig;
    var phone_bind = oConfig.oData.phone_bind;
    var token_bind = oConfig.oData.token_bind;
    // console.log(phone_bind,token_bind)

    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; //手机正则
    var cardNumber = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/; //身份证号正则
    var flag = true, selectIndex;
    var flag1 = false; //flag1:手机号正确标志
    var flag2 = false, flag3 = false; //flag2:是否点击发送验证码标志 flag3:身份证号是否输入一致标志
    var time = 12;
    var flag4 = false, flag5 = false;  //select选框是否被点击
    var timer;
    var againValue, value, code, secretPho;
    var getselectID, verifyPhoneBtnName, verifyCardBtnName;
    var optionLen; //获得当前select下的option数量
    var defaultID, optionVal;
    var newArr = [];

    var oPage = {
        //init初始化程序
        init: function () {
            this.view(); //根据状态显示手机+令牌内容
            this.sendCode(); //点击发送验证码时进行检验
            this.showTips();  //展示客服服务信息
            this.listen();
            this.fblurAndFocusVerify();
            this.aboutPhoClick();
            this.back();
            this.backBtnClick(); //返回按钮点击

            ui.$select1.trigger('change');
            ui.$select2.trigger('change');

        }
        ,backBtnClick: function(){
            ui.$back.on('click', function() {
                oPage.back();
                // alert(1);
            });
        }
        ,back: function(){
            // console.log($('.securit').children().children())
            var arr = [];
            var result = {};
            var timer1 = setInterval(function(){ //每1s去查看安全设置当前显示的元素是，把它放入数组中
                // alert(222)
                $('.securit').children().children().each(function() {
                    if ($(this).css('display') == 'block') {
                        arr.push($(this).data('index'));
                        // alert(arr)
                        for (var j = 0; j < arr.length; j++) { //去除这个过程中重复的数组
                            if(!result[arr[j]]){
                                newArr.push(arr[j]);
                                result[arr[j]] = 1;
                            }
                        }
                    }
                });
           },1000); 

            // console.log(newArr)
            var temp = [];
                for(var i = 0;i<newArr.length;i++){
                (function(i){
                    if(newArr[i] == 0){ //绑定手机初始界面显示
                        ui.$back.hide(); //返回按钮隐藏
                        ui.$Tok.show();
                        ui.$boundPhone.show();
                        ui.$task1.siblings().hide();
                        oPage.view();
                    }
                    else if(newArr[i] == 1){  //绑定手机号步骤显示
                        // ui.$back.show();//返回按钮显示
                        ui.$task2.siblings().hide();
                        ui.$task2.children().hide();
                        oPage.view();
                    }
                    else if(newArr[i] == 2){ //已绑定手机初始界面显示
                        ui.$back.hide();//返回按钮隐藏
                        ui.$Tok.show();
                        ui.$task3.siblings().hide();
                        oPage.view();
                    }else if(newArr[i] == 3){ //修改绑定手机号步骤显示
                        // ui.$back.show();//返回按钮显示
                        ui.$task4.hide();
                        ui.$task4.siblings().hide();
                        oPage.view();
                    }else if(newArr[i] == 4){ //解绑手机步骤显示
                        // ui.$back.show();//返回按钮显示
                        $('.item4').hide();
                        $('.item4').siblings().hide();
                        oPage.view();
                    }
                    else if(newArr[i] == 5){ //绑定令牌初始界面显示
                        ui.$back.hide();//返回按钮隐藏
                        ui.$Pho.show();
                        ui.$Tok.show();
                        ui.$boundToken.show();
                        ui.$unboundToken.siblings().hide();
                        oPage.view();
                    }else if(newArr[i] == 6){  //绑定手机号步骤显示
                        $('.item1').hide();
                        $('.item1').siblings().hide();
                        oPage.view();
                    }
                    else if(newArr[i] == 7){ //已绑定令牌初始界面显示
                        ui.$back.hide();//返回按钮隐藏
                        ui.$reviseToken.show();
                        ui.$Pho.show();
                        ui.$alreadyBound.show().siblings().hide();
                        oPage.view();
                    }else if(newArr[i] == 8){ //解绑令牌步骤显示
                        // ui.$back.show();//返回按钮显示
                        $('.item2').hide();
                        $('.item2').siblings().hide();
                        oPage.view();
                    }
                })(i);
            }
        }
        ,backCurrent: function(item){ //回到 初始状态
            var num = item.data('index');

            if(num == 1 || num == 3 || num == 4){ //关于手机绑定解绑的状态，恢复成原始
                var firstChild = item.children().eq(0);
                var secondChild = item.children().eq(1);
                var thirdChild = item.children().eq(2);
                // console.log(item.children());
                $(firstChild).find('div').each(function(index,item){
                    // console.log(index)
                    var index = $(this).index();
                    if(index == 0){
                        $(this).eq(index).addClass('highlight').siblings().removeClass('highlight');
                    }
                });
                $(item.children()).each(function(){
                    var index = $(this).index();
                    // console.log(index);
                    if(index == 0){
                        $(this).eq(index).show().siblings().hide();
                    }
                });
                
            }else{
                // console.log(item.children())
                var firstChild = item.children().eq(0);
                var secondChild = item.children().eq(1);
                clearInterval(timer);
                //高亮页眉
                $(firstChild).find('div').each(function(){
                    var index = $(this).index();
                    if(index == 0){
                        $(this).eq(index).addClass('highlight').siblings().removeClass('highlight');
                    }
                })
                //第一个内容显示
                // console.log($(secondChild).children())
                $(secondChild).children('div').each(function(){
                    var index = $(this).index();
                    // console.log(index)
                    if(index == 0){
                        $(this).eq(index).show().siblings().hide();
                    }
                });
            }

            $(secondChild).show();
            $(item).find('input').each(function(){
                 $(this).val('');
            });
            $(item).find('.sendVerifi').each(function() {
                clearInterval(timer);
                flag2 = false;
                $('.sendVerifi').text('发送验证码');
            });
            $(item).find('.ToksendVerifi').each(function() {
                    clearInterval(timer);
                    flag2 = false;
                    $('.ToksendVerifi').text('发送验证码');
            });
        }
        ,aboutPhoClick:function(){
            //绑定手机进行验证的按钮点击
            ui.$boundPhoneBtn.on('click', function () {
                var clickItem = this;
                value = ui.$Tel.val().replace(/\ +/g, "");
                code = ui.$code.val().replace(/\ +/g, "");
                // secretPho = value.substr(0, 3) + '******' + value.substr(value.length - 2, 2);
                if (value == '' && code == '') {
                    // console.log(222)
                    ui.$Tel.siblings('.vali').text('手机号不能为空').show();
                    ui.$code.siblings('.vali').text('验证码不能为空').show();
                    // oPage.focusEmpty(clickItem);
                    // oPage.validate(clickItem);
                } else if (!myreg.test(value) && code == '') {
                    // console.log(888)
                    ui.$Tel.siblings('.vali').text('手机号不正确').show();
                    ui.$code.siblings('.vali').text('验证码不能为空').show();
                    // oPage.focusEmpty();
                } else if (myreg.test(value) && (code == '' || code.length != 4)) {
                    ui.$code.siblings('.vali').text('验证码错误').show();
                    // oPage.focusEmpty();
                }else{
                    var params = {
                        act: 'bindphone',
                        phone: value,
                        code: code,
                        type: 'bindphone'
                    }
                    oPage.fajax(params);
                }
            });

            //修改绑定的手机号的下一步按钮点击
            ui.$next.on('click', function () {
                code = ui.$currentCode.val().replace(/\ +/g, "");
                if(code == ''){
                    ui.$currentCode.siblings('.vali').text('验证码不能为空').show(); 
                     // oPage.focusEmpty();
                }else if(code.length != 4){
                    ui.$currentCode.siblings('.vali').text('验证码错误').show();
                    // oPage.focusEmpty();
                }else{
                    var params = {
                        act: 'oldphone',
                        code: code,
                        type: 'oldphone'
                    }
                   oPage.modify(params); //修改绑定的手机提交时的验证
                }
            });

            //修改为新手机的确定按钮点击
            ui.$nowBtn.on('click', function () {
                code = ui.$nowCode.val().replace(/\ +/g, "");
                var value = $(this).siblings('.phoneNumber').find('.telephone').val().replace(/\ +/g, "");
                if (value == '' && code == '') {
                    ui.$nowTel.siblings('.vali').text('手机号不能为空').show();
                    ui.$nowCode.siblings('.vali').text('验证码不能为空').show();
                    // oPage.focusEmpty();
                } else if (!myreg.test(value) && code == '') {
                    ui.$nowTel.siblings('.vali').text('手机号不正确').show();
                    ui.$nowCode.siblings('.vali').text('验证码不能为空').show();
                    // oPage.focusEmpty();
                } else if (myreg.test(value) && (code.length != 4)) {
                    ui.$nowCode.siblings('.vali').text('验证码错误').show();
                    // oPage.focusEmpty();
                }else{
                    var params = {
                        act: 'bindnewphone',
                        phone: value,
                        code: code,
                        type: 'bindnewphone'
                    }
                     oPage.newPhone(params);//修改为新手机号提交时的验证
                }
            });
        }
        , sendCode: function () { 
            ui.$sendVerifi.on('click', function () {
                var self = $(this);
                flag2 = true;
                var url = oConfig.oUrl.getCode;
                var dataVal = $(this).parent().siblings().find('.telephone').val();
                // console.log($(this).parent().siblings().find('.telephone').val())
                if(dataVal){
                   var realVal = dataVal.replace(/\ +/g, "");
                   // console.log(224452)
                }else{
                    // if(!dataVal){
                    $(this).parent().siblings().find('.telephone').siblings('.vali').text('手机号不能为空').show();
                   // }
                }
                $('.telephone').focus(function () {
                    $(this).siblings('.vali').hide();
                });

                if(ui.$task2.css('display') == 'block'){ //绑定手机的界面显示
                    var type = 'bindphone';
                    var param = {
                          type: type,
                          phone: dataVal
                    };
                }
                else if(ui.$task4.find('.current').css('display') == 'block'){ //修改手机号的界面显示
                    flag1 = true;
                    var type = 'oldphone';
                    var param = {
                        type: type
                    };
                }
                else if(ui.$task4.find('.now').css('display') == 'block'){
                    // flag1 = true;
                    var type = 'bindnewphone';
                    var param = {
                          type: type,
                          phone: dataVal
                    };
                }
                // console.log(flag1)
                if (flag1) {
                    $.ajax({
                        url: url,
                        type: 'post',
                        data: param,
                        dataType: 'JSON'
                    }).done(function (msg) {
                        if (msg.code == 0) {
                            flag1 = false;
                            oPage.clock(self);
                        } else {
                            alert(msg.message)
                        }
                    })
                }
            });

            //绑定令牌的对手机号进行发送验证
            ui.$ToksendVerifi.on('click', function () {
                var self = $(this);
                flag1 = true;
                flag2 = true;
                var params = {
                    type:'bindtoken'
                };
                //绑定令牌的验证请求
                if(flag1)
                    $.ajax({
                        url: window.oPageConfig.oUrl.getCode,
                        type: 'post',
                        data: params,
                        dataType: 'JSON'
                    }).done(function (msg) {
                        if (msg.code == 0) {
                            flag1 = false;
                            oPage.clock(self);
                        } else {
                            alert(msg.message)
                        }
                    })
            })

            //解绑令牌手机号进行发送验证
            ui.$ToksendVerifi2.on('click', function () {
                var self = $(this);
                flag1 = true;
                flag2 = true;
                var params = {
                    type:'unbindtoken'
                };
                //绑定令牌的验证请求
                if(flag1)
                    $.ajax({
                        url: window.oPageConfig.oUrl.getCode,
                        type: 'post',
                        data: params,
                        dataType: 'JSON'
                    }).done(function (msg) {
                        if (msg.code == 0) {
                            flag1 = false;
                            oPage.clock(self);
                        } else {
                            alert(msg.message)
                        }
                    })
            })


            //解绑手机时的发送验证
            ui.$ToksendVerifi3.on('click', function () {
                var self = $(this);
                flag1 = true;
                flag2 = true;
                var params = {
                    type:'unbindphone'
                };
                if(flag1)
                    $.ajax({
                        url: window.oPageConfig.oUrl.getCode,
                        type: 'post',
                        data: params,
                        dataType: 'JSON'
                    }).done(function (msg) {
                        if (msg.code == 0) {
                            flag1 = false;
                            oPage.clock(self);
                        } else {
                            alert(msg.message)
                        }
                    });
            })
        }
        , getDefaultOption: function (id) {
            optionLen = id.options.length; //获得当前select下的option数量
            defaultID = $(id).attr('id'); //获得当前select的id名
            if (optionLen == 1) { //如果select下的option数量为1
                optionVal = id.options[0].value;
                // console.log(optionVal)
                if (optionVal == 0) {
                    $('#' + defaultID).parents().find('.tokenPho').show();
                    $('#' + defaultID).parents().find('.tokenIdentify').hide();
                } else {
                    $('#' + defaultID).parents().find('.tokenPho').hide();
                    $('#' + defaultID).parents().find('.tokenIdentify').show();
                }
                // console.log(22,defaultID)
            } else { //如果select下的option数量为2
                //如果未点击select选框，则默认为第一个option的value值
                if (!flag4 || !flag5) {
                    optionVal = id.options[0].value;
                    // console.log(optionVal,11111);
                }
            }
        }
        , view: function () {
            // console.log(993)
            var self = this;
            if (phone_bind == 0 && token_bind == 0) { //未绑定手机号和令牌
                ui.$unboundPhone.show();
                ui.$alreadyBound.hide();
                ui.$unboundToken.show();
            } else if (phone_bind == 0 && token_bind == 1) { //未绑定手机号,绑定了令牌
                ui.$unboundPhone.show();
                ui.$alreadyBoundPhone.hide();
                ui.$alreadyBoundToken.show();
                ui.$unboundToken.hide();
            } else if ((phone_bind == 1 || phone_bind == 2) && token_bind == 0) {  //绑定手机号,未绑定令牌
                ui.$alreadyBoundPhone.show();
                ui.$unboundPhone.hide();
                ui.$alreadyBoundToken.hide();
                ui.$unboundToken.show();
            } else { //绑定手机号和令牌
                ui.$alreadyBound.show();
                ui.$unbound.hide();
            }
        }
        , showTips: function () {
            //鼠标移出移进显示客服提示信息
            ui.$phoneQuestion.hover(function () {
                $(this).find('.tips').show();
            }, function () {
                $(this).find('.tips').hide();
            });

            ui.$TokenQuestion.hover(function () {
                $(this).find('.tips').show();
            }, function () {
                $(this).find('.tips').hide();
            });
        }
        , clock: function (director) {
            // console.log(222)
            if (timer) {
                clearInterval(timer);
            }
            timer = setInterval(function () {
                time--;
                if (time == 0) {
                    clearInterval(timer);
                    director.text('发送验证码');
                    time = 12;
                    flag1 = true;
                    // flag2 = false;
                } else {
                    director.text(time + 's');
                    flag = false;  //阻止在执行中点击
                }
            }, 1000);
        }
        , newPhone: function (params) {
                if (flag2) {
                    $.ajax({
                        url: oConfig.oUrl.verify,
                        type: 'post',
                        data: params,
                        dataType: 'JSON'
                    }).done(function (msg) {
                        if (msg.code == 0) {
                            $('.modifyStep').eq(2).addClass('highlight').siblings().removeClass('highlight')
                            ui.$now.hide();
                            ui.$finishBoundNewPhone.show();
                        } else {
                            alert(msg.message);
                        }
                    });
                }
        }
        , modify: function (params) {
            // console.log(params.code.length,time,flag2)
            if (flag2) {
                $.ajax({
                    url: oConfig.oUrl.verify,
                    type: 'post',
                    data: params,
                    dataType: 'JSON'
                }).done(function (msg) {
                    if (msg.code == 0) {
                        $('.modifyStep').eq(1).addClass('highlight').siblings().removeClass('highlight');
                        ui.$current.hide();
                        ui.$now.show();
                        ui.$sendVerifi.text('发送验证码');
                        clearInterval(timer);
                        time = 12;
                        flag1 = false;
                    } else {
                        alert(msg.message);
                    }
                });
            } 
        }
        , selectType: function (getselectID) {
            var sel = document.getElementById(getselectID);
            selectIndex = sel.selectedIndex;
            optionVal = sel.options[selectIndex].value;
            // console.log(optionVal)
            if (optionVal == 0) {
                $('#' + getselectID).parent().parent().find('.tokenPho').show();
                $('#' + getselectID).parent().parent().find('.tokenIdentify').hide();
            } else {
                $('#' + getselectID).parent().parent().find('.tokenPho').hide();
                $('#' + getselectID).parent().parent().find('.tokenIdentify').show();
            }
        }
        , listen: function () {
            //如果点击了，则获取选中的value值
            ui.$select1.on('change', function () {
                flag4 = true;
                getselectID = $(this).attr('id');
                oPage.selectType(getselectID); //令牌绑定时得到选取的option值
            });
            ui.$select2.on('change', function () {
                flag5 = true;
                getselectID = $(this).attr('id');
                oPage.selectType(getselectID);  //令牌绑定时得到选取的option值
            });


            //开始界面的绑定手机按钮点击
            ui.$boundPhone.on('click', function () {
                $(this).hide();
                ui.$devide.hide();
                ui.$Tok.hide();
                ui.$task2.show();//绑定手机号步骤显示
                ui.$back.show(); //返回按钮显示
                var task2 = $('.task2');
                oPage.backCurrent(task2);
            });


            //修改手机按钮点击
            ui.$revisePhone.on('click', function () {
                $('.item4 .boundPhoneSteps ').hide();
                ui.$devide.hide();
                ui.$Tok.hide();
                $('.task4').show();
                ui.$back.show(); //返回按钮显示
                var task4 = $('.task4');
                oPage.backCurrent(task4);
            });

            //解绑手机号
            $('#releasePhone').on('click', function () {
                ui.$devide.hide();
                ui.$Tok.hide();
                ui.$modifyPho.hide(); //修改手机号步骤隐藏
                $('.item4').show();
                ui.$back.show(); //返回按钮显示
                var item4 = $('.item4');
                oPage.backCurrent(item4);
            })


            //开始界面中的绑定令牌按钮点击
            ui.$boundToken.on('click', function () {
                $(this).hide();
                ui.$devide.hide();
                ui.$Pho.hide();
                $('.item1').show();
                ui.$back.show(); //返回按钮显示
                var select1 = document.getElementById('select1');
                oPage.getDefaultOption(select1);
                var item1 = $('.item1');
                oPage.backCurrent(item1);
            });

            //开始界面中的解绑令牌按钮点击
            ui.$reviseToken.on('click', function () {
                $(this).hide();
                ui.$devide.hide();
                ui.$Pho.hide();
                $('.item2').show();
                ui.$back.show(); //返回按钮显示
                var select2 = document.getElementById('select2');
                oPage.getDefaultOption(select2);
                var item2 = $('.item2');
                oPage.backCurrent(item2);
            })


            //绑定手机完成验证的确定按钮点击
            ui.$confirm1.on('click', function () {
                window.location.reload();
            });

            //新手机号完成验证的确定按钮点击
            ui.$confirm2.on('click', function () {
                 window.location.reload();
            });

            //绑定令牌之手机号码立即验证按钮点击
            $('.verifyPhoneBtn1').on('click', function () {
                verifyPhoneBtnName = $(this).attr('class');
                oPage.fPhoneVerify(verifyPhoneBtnName);
            });

            //解绑之手机号码立即验证按钮点击
            $('.verifyPhoneBtn2').on('click', function () {
                verifyPhoneBtnName = $(this).attr('class');
                // console.log(verifyPhoneBtnName)
                oPage.fPhoneVerify(verifyPhoneBtnName);
            })

            //解绑令牌之手机号码立即验证按钮点击
            $('.verifyPhoneBtn3').on('click', function () {
                verifyPhoneBtnName = $(this).attr('class');
                // console.log(verifyPhoneBtnName)
                oPage.fPhoneVerify(verifyPhoneBtnName);
            });

            //绑定令牌之身份证号立即验证按钮点击
            $('.verifyCardBtn1').on('click', function () {
                verifyCardBtnNameBtn = $(this).attr('class');
                oPage.fCardVerify(verifyCardBtnNameBtn);
            })

            //解绑令牌之身份证号立即验证按钮点击
            $('.verifyCardBtn2').on('click', function () {
                verifyCardBtnNameBtn = $(this).attr('class');
                oPage.fCardVerify(verifyCardBtnNameBtn);
            })

            //手机号完成验证的确定按钮点击
            ui.$confirm3.on('click', function () {
                token_bind = 1;
                $('.item1').hide();
                ui.$reviseToken.show();
                oPage.view();
            });

            //解绑令牌成功确定按钮点击
            ui.$confirm4.on('click', function () {
                // token_bind = 0;
                // $('.item2').hide();
                // $('.unboundToken').show();
                // ui.$boundToken.show();
                // oPage.view();
                window.location.reload();
            });
        }
        ,fblurAndFocusVerify:function(){ 
            //绑定手机手机号输入框失去焦点验证
            ui.$Tel.on('blur',function(){
              var self = this;
               oPage.globalphoneblurvalidate(self);
            });
            //绑定手机手机号输入框焦点验证
            ui.$Tel.on('focus', function() {
                var self = this;
                oPage.focusPhoneValidate(self);
            });

            //绑定手机验证码输入框焦点验证
            ui.$code.focus(function(){
                var self = this;
                oPage.focusCodeValidate(self);
            });

            //修改绑定手机 手机号输入框失去焦点验证
            ui.$nowTel.on('blur',function(){
               var self = this;
               oPage.globalphoneblurvalidate(self);
            });

            //修改绑定手机 手机号输入框焦点验证
            ui.$nowTel.on('focus', function() {
                var self = this;
                oPage.focusPhoneValidate(self);
            });

            //修改绑定手机 验证码输入框焦点验证
            ui.$inputCode.focus(function(){
                var self = this;
                oPage.focusCodeValidate(self);
            });

            //绑定令牌之 身份证号失去焦点验证
            $('.identi2').blur(function(){
                var value =  $(this).val().replace(/\ +/g, "");
                if (value == '') {
                    $(this).siblings('.vali').text('身份证号不能为空').show();
                    $(this).focus(function() {
                        $(this).val('');
                        $(this).siblings('.vali').hide();
                    })
                }else if (!cardNumber.test(value)) {
                    $(this).siblings('.vali').text('身份证号不正确').show();
                    $(this).focus(function () {
                        $(this).val('');
                        $(this).siblings('.vali').hide();
                    });
                }else{
                    $(this).focus(function () {
                        $(this).val($(this).val());
                    });
                }
            });
        }
        ,focusPhoneValidate: function(self){
            var self = self;
            if (!flag1) {
                $(self).val('');
                $(self).siblings('.vali').hide();
            } else {
                $(self).focus(function() {
                    $(self).val($(self).val());
                });
            }
        }
        ,focusCodeValidate: function(self){
            var self = self;
            if ($(self).val() == '') {
                    $(self).siblings('.vali').text('验证码不能为空').show();
                    $(self).val('');
                    $(self).siblings('.vali').hide();
                } else if ($.trim($(self).val()).length != 4) { //验证码位数
                    $(self).siblings('.vali').text('验证码错误').show();
                    $(self).val('');
                    $(self).siblings('.vali').hide();
                }else{
                    $(self).focus(function() {
                        $(self).val($(self).val());
                    });
            }
        }
        , globalphoneblurvalidate: function (self) {
            // console.log(90)
            var that = self;
            // console.log($(that))
            if ($(that).val() == '') {
                $(that).siblings('.vali').text('手机号不能为空').show();
            }
            else if (!myreg.test($(that).val())) {
                $(that).siblings('.vali').text('手机号不正确').show();
                $(that).focus(function () {
                    $(that).val('');
                    $(that).siblings('.vali').hide();
                });
                // console.log(22)
            } else {
                flag1 = true;
                if($(that).val()){
                   $(that).focus(function () {
                      $(that).val($(that).val());
                   });
                   // console.log(33)
                }
            }
        }
        , fCardVerify: function (verifyCardBtnNameBtn) {
            againValue = $('.' + verifyCardBtnNameBtn).parent().find('.identi2').val().replace(/\ +/g, "");
            var type = '',act = '';
            if (verifyCardBtnNameBtn == 'verifyCardBtn1') { //绑定令牌之身份证号立即验证
                type = 'bindtoken';
                act = '';
                // console.log(verifyPhoneBtnName)
            } else if (verifyCardBtnNameBtn == 'verifyCardBtn2') { //解绑令牌之身份证号立即验证
                type = 'unbindtoken';
                act = type;
                // console.log(verifyCardBtnNameBtn)
            }
            var params = {
                act:act,
                idcard:againValue,
                type:type
            };
            if (againValue == '') {
                $('.identi2').siblings('.vali').text('身份证号不能为空').show();
                $('.identi2').focus(function () {
                    $('.identi2').siblings('.vali').hide();
                })
            } else if (!cardNumber.test(againValue)) {
                $('.identi2').siblings('.vali').text('身份证号不正确').show();
                $('.identi2').focus(function () {
                    $('.identi2').siblings('.vali').hide();
                });
            } else {
                $.ajax({
                    url: oConfig.oUrl.verify,
                    type: 'post',
                    data: params,
                    dataType: 'JSON'
                }).done(function (msg) {
                    if (msg.code == 0) {
                        if (verifyCardBtnNameBtn == 'verifyCardBtn1') {  //绑定令牌之身份证号验证
                            ui.$download.show().siblings().hide();
                            $('.boundTokenSteps >div').each(function () {
                                if ($(this).css('display') == 'block') {
                                    ui.$tokenstep.eq($(this).index()).addClass('highlight')
                                        .siblings().removeClass('highlight');
                                }
                            });
                            oPage.boundTokNextSteps();
                        } else {  //解绑令牌之身份证号验证
                             $('.item2 .outSucsess').show().siblings().hide();
                             $('.outTokenSteps >div').each(function (index, item) {
                                if ($(this).css('display') == 'block') {
                                    $('.item2 .outtoken').removeClass('highlight').eq(index).addClass('highlight');
                                }
                             });
                            // oPage.boundTokNextSteps();
                        }
                    } else {
                        alert(msg.message);
                    }
                });
            }
        }
        , fajax: function (params) {
            // console.log(params)
            if (flag2 ) {
                $.ajax({
                    url: oConfig.oUrl.verify,
                    type: 'post',
                    data: params,
                    dataType: 'JSON'
                }).done(function (msg) {
                    // console.log(time)
                    if (msg.code == 0) {
                        ui.$boundPhoneSteps.hide();
                        $('.step').eq(1).addClass('highlight').siblings().removeClass('highlight')
                        ui.$finishBoundPhone.show();
                        ui.$sendVerifi.text('发送验证码');
                        clearInterval(timer);
                        time = 12;
                        flag = true;
                    } else {
                        alert(msg.message);
                    }
                });
            }
        }
        , fPhoneVerify: function (verifyPhoneBtnName) {
            code = $('.' + verifyPhoneBtnName).parent().find('.tokenCode').val().replace(/\ +/g, "");
            // console.log(verifyPhoneBtnName, '22222222', $('.' + verifyPhoneBtnName).parent().find('.tokenCode'), code);
            var type = '',act = '';
            if (verifyPhoneBtnName == 'verifyPhoneBtn2') {
                type = 'unbindphone'; //解绑手机号的立即验证 
                act = type;
                // console.log(verifyPhoneBtnName)
            } else if (verifyPhoneBtnName == 'verifyPhoneBtn1') {
                type = 'bindtoken'; //绑定令牌之手机号码立即验证
                act = '';
            }else if(verifyPhoneBtnName == 'verifyPhoneBtn3'){
                type = 'unbindtoken'; //解绑令牌之手机号的立即验证
                act = type;
            }

            var params = {
                act: act,
                type: type,
                code: code
            };

            if (code == '') {
                $('.tokenCode').siblings('.vali').text('验证码不能为空').show();
                $('.tokenCode').focus(function(){
                    var self = this;
                    oPage.focusCodeValidate(self);
                })
            } else if (code.length != 4) {
                $('.tokenCode').siblings('.vali').text('验证码错误').show();
                $('.tokenCode').focus(function(){
                    var self = this;
                    oPage.focusCodeValidate(self);
                })
            }else if(flag2) {
                $.ajax({
                    url: oConfig.oUrl.verify,
                    type: 'post',
                    data: params,
                    dataType: 'JSON'
                }).done(function (msg) {
                    if (msg.code == 0) {
                        ui.$boundPhoneSteps.hide();
                        $('.step').eq(1).addClass('highlight').siblings().removeClass('highlight')
                        ui.$finishBoundPhone.show();
                        ui.$sendVerifi.text('发送验证码');
                        clearInterval(timer);
                        time = 12;
                        flag = true;
                        if (verifyPhoneBtnName == 'verifyPhoneBtn1') { //绑定令牌之手机号的步骤依次显示
                            ui.$download.show().siblings().hide();
                            $('.boundTokenSteps >div').each(function () {
                                if ($(this).css('display') == 'block') {
                                    ui.$tokenstep.eq($(this).index()).addClass('highlight')
                                        .siblings().removeClass('highlight');
                                }
                            });
                            oPage.boundTokNextSteps();
                            // console.log(22225455)
                        } else if (verifyPhoneBtnName == 'verifyPhoneBtn2') { //解绑手机成功的界面显示
                            $('.finishUnBoundPhone').show().siblings().hide();
                            $('.blueHeader4').show();
                            // $('.outPhoneSteps').hide();
                            $('.blueHeader4 > .step').eq(1).addClass('highlight').siblings().removeClass('highlight');
                            // console.log(878)
                        } else if (verifyPhoneBtnName == 'verifyPhoneBtn3') { //解绑令牌成功的界面显示
                            $('.item2 .outSucsess').show().siblings().hide();
                            $('.outTokenSteps >div').each(function (index, item) {
                                // console.log(index)
                                if ($(this).css('display') == 'block') {
                                    $('.item2 .outtoken').removeClass('highlight').eq(index).addClass('highlight');
                                }
                            });
                            // oPage.boundTokNextSteps();
                        }
                    } else {
                        alert(msg.message);
                    }
                });
            }
        }
        , boundTokNextSteps: function () {
            // console.log(7777333)
            //绑定令牌第二步点击
            ui.$scanNext.on('click', function () {
                ui.$getDynamic.show().siblings().hide();
                $('.boundTokenSteps >div').each(function () {
                    if ($(this).css('display') == 'block') {
                        ui.$tokenstep.eq($(this).index()).addClass('highlight')
                            .siblings().removeClass('highlight');
                    }
                });
            });

            //绑定令牌之第三步输入动态口令点击完成绑定按钮
            ui.$finishDynamic.on('click', function () {
                var dynamicValue = ui.$dynamicPassInput.val().replace(/\ +/g, "");
                var params = {
                    act: 'bindtoken',
                    type:'bindtoken',
                    code: dynamicValue
                }
                if (dynamicValue == '') {
                    ui.$getDynamic.find('.vali').text('不可为空').show();
                    //动态口令输入框点击
                    ui.$dynamicPassInput.focus(function () {
                        $(this).val('');
                        $(this).siblings('.vali').hide();
                    });
                } else {
                    $.ajax({
                        url: oConfig.oUrl.verify,
                        type: 'post',
                        data: params,
                        dataType: 'JSON'
                    }).done(function (msg) {
                        if (msg.code == 0) {
                            ui.$finishToken.show().siblings().hide();
                            $('.boundTokenSteps >div').each(function () {
                                if ($(this).css('display') == 'block') {
                                    ui.$tokenstep.eq($(this).index()).addClass('highlight')
                                        .siblings().removeClass('highlight');
                                }
                            });
                        } else {
                            alert(msg.message);
                        }
                    });
                }
            });
        }
    }
    oPage.init();
});