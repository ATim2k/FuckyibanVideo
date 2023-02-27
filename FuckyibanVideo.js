// ==UserScript==
// @name         易班优课刷课
// @version      1.0
// @description  最简单的脚本往往只需要最朴素的垃圾代码
// @author       阿添ATim
// @match        https://xueyuan.yooc.me/courses/YOOC/*
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gdip.edu.cn
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $(document).ready(function(){
        console.log("加载中...");
        //$('html').append('<div style="display:flex;position:fixed;left: 0;top: 0;width: 200px;height: 100px;background: #1296db;border-radius:20px;z-index: 99999999999999;cursor:click;"><div></div></div>')
        $('html').append('<div class="floatView" style="display: flex;flex-direction: column;align-items: center;position: fixed;left: 50px;top: 50px;background-color: #1296db;color: #eee; width: 150px;border-radius: 20px;border: 0.5px #eee solid;"><div id="studyMode" style="font-weight: 600;margin-top: 10px;pointer-events:none;">[抓取中...]</div><div id="studyClass" style="margin-top: 10px;margin-bottom: 10px;pointer-events:none;">当前进度: 0/0</div></div>')
        var draggingObj=null;
        var diffX=0;
        var diffY=0;
        function down(e){
            if(e.target.className.indexOf('floatView')!=-1){
                draggingObj=e.target;
                console.log(e)
                diffX=event.clientX-draggingObj.offsetLeft;
                diffY=event.clientY-draggingObj.offsetTop;
            }
        }

        function move(e){
            if(draggingObj){
                $('.floatView').css("left",(e.clientX-diffX)+'px');
                $('.floatView').css("top",(e.clientY-diffY)+'px');
            }
        }

        function up(e){
            draggingObj=null;
            diffX=0;
            diffY=0;
        }

        document.addEventListener('mousedown',down);
        document.addEventListener('mousemove',move);
        document.addEventListener('mouseup',up);
        if($('#video').length == 0){
            //let temp1 = $(".video-player").children()[0].id
            //$("#"+temp1).children()[0].id = "sb"
            //$("#sb").on("ended",()=>{
                //$('#ui-accordion-accordion-panel-0 li:nth-child('+ (temp3+1) +')').click()
            //})
            console.log("易班学院")
            $('#studyMode').text("易班学院")


            let temp2 = $("#ui-accordion-accordion-panel-0").children().length
            let temp3 = 0
            for(let num=1; num<=temp2; num++){
                if($('#ui-accordion-accordion-panel-0 li:nth-child('+ num+')').attr("class")=="active "){
                    temp3 = num
                }
            }
            $('#studyClass').text("当前进度: "+temp3+"/"+temp2)
            console.log(temp3+"/"+temp2)
        }else{
            console.log("易班优课")
            let temp2 = $(".catalog").children().length
            let temp3 = 0
            $('#studyMode').text("易班优课")
            for(let num=1; num<=temp2; num++){
                if($('.catalog li:nth-child('+ num+')').attr("class")=="readed"){
                    temp3 = num
                }
            }
            $('#studyClass').text("当前进度: "+temp3+"/"+temp2)
            $('#video').trigger("play");
            $('#video').on("ended",()=>{
                $(".readed").next().children()[0].click()
            })
        }
    });
})();