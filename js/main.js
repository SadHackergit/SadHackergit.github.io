
function init(url){
    $.ajax({
        type:'GET',
        url:url,
        success:function(data){

            //获取轮播图图片
            var arg = [];
            data.forEach(function(ele,index){
                arg.push(ele.image);
            })
            lunbotu(arg);
            //获取相应的标题
            lblist(data);
            

        },
        error:function(){
            console.log(error);
        }
    })
}
init('./mock/mockdata.json');

function lunbotu(data){
    $('.swrap .lunbotu').swiper({
        images:data,
        width:1114,
        height:578,
        direction:'next',
        aotoTime:5000
    })

}
   
function lblist(data){
    var lbtext = $('.lblist .pointer div');
    data.forEach(function(ele,index){
        if(lbtext.length < index){
            return;
        }
        $(lbtext[index]).text(ele.song);
    })
}

function recontent(url){
    $.ajax({
        type:'GET',
        url:url,
        success:function(data){
            redomc(data);

        },
        error:function(){
            console.log(error);
        }
    })
}
recontent('./mock/contentdata.json');

function redomc(data){
    var uimg = $('.content .contentText .contentdiv1 img');
    var username = $('.content .contentText .contentdiv1 .cname');
    var ctext = $('.content .contentText .contentdiv2 p');
    var cimg = $('.content .contentText .contentdiv2 img');
    var love = $('.content .contentText .contentdiv3 .love');


    data.forEach(function(ele,index){
        $(username[index]).text(ele.username);
        $(ctext[index]).text(ele.song);
        $(love[index]).text(ele.lovenum);
    });
    data.forEach(function(ele,index){
        (function(){
            var img = new Image();
            img.src = ele.userimg;
            img.onload = function(){
                $(uimg[index]).attr('src',ele.userimg)
            }
        })();
        (function(){
            var img = new Image();
            img.src = ele.image;
            img.onload = function(){
                $(cimg[index]).attr('src',ele.image)
            }
        })();

    })

}

