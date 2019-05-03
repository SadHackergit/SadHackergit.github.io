(function(){
   
    function init(options){

        this.parent = options.parent;
        this.images = options.images;
        this.direction = options.direction || 'next';
        this.width = options.width || $(this.parent).width();
        this.height = options.height || $(this.parent).height();
        this.autoTime = options.autoTime || 5000;
        this.nowIndex = options.nowIndex || 0;
        this.imglength = options.images.length;
        this.lock = false;
        this.timer = null;
        this.timer2 = null;

        this.createDom();
        this.addcss();
        this.bindEvent();
        this.autoMove();
        this.changeIndex();
    
    }

    init.prototype.createDom = function(){
        var imgContent = $('<ul class="imgContent"></ul>');
        var lblist = $('.lblist');
        var pointer = $('<div class="pointer"></div>');
        for(var i = 0;i< this.imglength;i++){
            $('<li><img src="'+this.images[i] +'"/></li>').appendTo(imgContent);
            $('<div></div>').appendTo(pointer);
        }
        lblist.append(pointer);
        imgContent.append($('<li><img src="'+this.images[0] +'"/></li>'));
        $(this.parent).append(imgContent)

    }

    init.prototype.addcss = function(){
        $('.imgContent',this.parent).css({
            position: 'absolute',
            width: this.width * (this.imglength + 1),
            left: 0
        });

        $('.imgContent li',this.parent).css({
            width: this.width,
            height: this.height,
            float: 'left',
        });

        $('.imgContent li img',this.parent).css({
            height: 'auto',
            width: '100%',
            cursor: 'pointer'
        });

       

    }
    
    init.prototype.bindEvent = function (){
        slef = this;
        $(this.parent).hover( function(){
           clearInterval(self.timer);
        },function(){
           self.autoMove();
        });
    
       
    
        $(' .pointer div').hover(function(){
            self.move($(this).index());
            clearInterval(self.timer);
        },function(){
            self.autoMove();
        })
        $(' .pointer div').on('click',function(){
            self.move($(this).index());
        })

    
    }
    
    init.prototype.move =  function (dir){
        self = this;
        if(this.lock){
            return false;
        }
    
        this.lock = true;
       if(dir == 'prev'){
           if(this.nowIndex == 0){
               this.nowIndex = this.imglength;
               $(' ul',this.parent).css({left:-self.nowIndex*self.width})
           }
    
           this.nowIndex --;
    
           $('ul',this.parent).animate({
               left:-self.nowIndex*self.width
           },600,function(){
               self.changeIndex();
               self.lock = false;
           });

       }else if(dir == 'next'){
           if(this.nowIndex == this.imglength){
               this.nowIndex = 0;
               $(' ul',this.parent).css({left:-self.nowIndex*self.width});
           }
           this.nowIndex ++;
    
           $('ul',this.parent).animate({
               left:-self.nowIndex*self.width
           },600,function(){
               self.changeIndex();
               self.lock = false;
           })


       }else if(typeof dir == 'number'){
           this.nowIndex = dir;
           $(' ul',this.parent).animate({
               left:-self.nowIndex*self.width
           },600,function(){
               self.changeIndex();
               self.lock = false;
           })
 
       }
    
    }
    
    init.prototype.changeIndex =  function (){
        self = this;
        $(' .pointer div').css({background:'#0088c0',fontSize:'16px'});
    
        if(this.nowIndex == this.imglength){
           $(' .pointer div').eq(0).css({background:'#f45a8d',fontSize:'24px'});
        }else{
           $(' .pointer div').eq(self.nowIndex).css({background:'#f45a8d',fontSize:'24px'});
        }
    }

    init.prototype.autoMove =  function (){
        self = this;
       this.timer = setInterval(function(){
           self.move('next');
       },self.autoTime)
    }
    

    

    $.fn.extend({
        swiper:function(options){
            options.parent = this;
            new init(options);
        }
    })
}())