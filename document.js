 window.onload = function(){
      //获取画布对象
              var canvas = document.getElementById("mom");
      //获取画布的上下文
              var context =canvas.getContext("2d");
      //获取浏览器屏幕的宽度和高度
             var W = document.body.clientWidth;
              var H = document.body.clientHeight;
      //设置canvas的宽度和高度
              canvas.width = W;
              canvas.height = H;
      //每个文字的字体大小
              var fontSize = 25;
      //计算列
              var colunms = Math.floor(W /fontSize);
      //记录每列文字的y轴坐标
              var drops = [];
      //给每一个文字初始化一个起始点的位置
      for(var i=0;i<colunms;i++){
                  drops.push(0);
              }
      //运动的文字
              var str =" 落落磊磊 ";
      //4:fillText(str,x,y);原理就是去更改y的坐标位置
      //绘画的函数
              function draw(){
                  context.fillStyle = "rgba(0,0,0,0.05)";
                  context.fillRect(0,0,W,H);
      //给字体设置样式“粗细”+
                  context.font = "300 "+fontSize+"px  微软雅黑";
      //给字体添加颜色#00cc33
                  context.fillStyle ="grey";//可以rgb,hsl, 标准色，十六进制颜色
      //写入画布中
      for(var i=0;i<colunms;i++){
                      var index = Math.floor(Math.random() * str.length);
                      var x = i*fontSize;
                      var y = drops[i] *fontSize;
                      context.fillText(str[index],x,y);
      //如果要改变时间，肯定就是改变每次他的起点
      if(y >= canvas.height && Math.random() > 0.99){
                          drops[i] = 0;
                      }
                      drops[i]++;
                  }
              };
              function randColor(){
                  var r = Math.floor(Math.random() * 256);
                  var g = Math.floor(Math.random() * 256);
                  var b = Math.floor(Math.random() * 256);
      return "rgb("+r+","+g+","+b+")";
              }
              draw();
              setInterval(draw,30);
	 
	 //点播图
	 {
    /*获取HTML中的对象*/
    var parent = document.getElementById("parent");
    var img_ul = document.getElementById("img_ul");
    var litCir_ul = document.getElementById("litCir_ul");
    var buttons = document.getElementById("buttons");
    var cLis =litCir_ul.children;

    var len = img_ul.children.length;     //图片张数
    var width = parent.offsetWidth;       //每张图片的宽度
    var rate = 15;                        //一张图片的切换速度，单位为px
    var times = 1;                        //切换速度的倍率
    var gap = 2000;                       //自动切换间隙，单位为毫秒
    var timer = null;                     //初始化一个定时器
    var picN = 0;                         //当前显示的图片下标
    var cirN = 0;                         //当前显示图片的小圆点下标
    var now;
    var then = Date.now();
    var temp;

    /*克隆第一个li到列表末*/
    img_ul.appendChild(img_ul.children[0].cloneNode(true));
    
    for (var i=0; i<len; i++){
        var a_li = document.createElement("li");
        a_li.className = 'quiet';
        litCir_ul.appendChild(a_li);
    }
    litCir_ul.children[0].className = "active";

    function autoRoll(){
        now = Date.now();
        var t = now - then;
        if(t >= gap){
            if(Roll(-(picN+1)*width)){
                picN++;
                cirN++;
                then = Date.now();
            }
            for(var i=0; i<len; i++){
                cLis[i].className = "quiet";
            }
            if(cirN == len){
                cirN = 0;
            }
            cLis[cirN].className = "active";
            if(picN>=len){
                img_ul.style.left = 0;
                picN = 0;
            }
        }
        timer = requestAnimationFrame(autoRoll); 
    }
    autoRoll();

    parent.onmouseover = function(){
        cancelAnimationFrame(timer);
        buttons.style.display = 'block';

    }
    parent.onmouseout = function(){
        timer = requestAnimationFrame(autoRoll);
        buttons.style.display = 'none';
    }

    for(var i=0; i<len; i++){
        cLis[i].index = i;
        cLis[i].onmouseover = function(){
            var flag = 0;
            var rollN = this.index;
            for(var j=0; j<len; j++){
                cLis[j].className = "quiet";
            }
            this.className = "active";
            temp = cirN;                           //当前active点
            picN = cirN = this.index;
            console.log('this.index:'+this.index);
            times = Math.abs(this.index - temp);  //距离上个小圆点的距离
            if(times == 0){
                return;
            }
            console.log('times:'+times);
            rate = rate*times;                    //根据距离改变切换速率
            
            function rollTo(){
                cancelAnimationFrame(img_ul.timer);
                if(Roll(-rollN * width)){
                    flag++;
                    if(flag == times){
                        cancelAnimationFrame(img_ul.timer);
                        rate = 15;
                        return;
                    }
                }
                img_ul.timer = requestAnimationFrame(rollTo);
            }
            rollTo();
        }
    }

    /*上一张*/
    buttons.children[0].onclick = previous;
    /*下一张*/
    buttons.children[1].onclick = next;

    function next(){
        cancelAnimationFrame(img_ul.timer);
        if(Roll(-(picN+1)*width)){
            cancelAnimationFrame(img_ul.timer);
            picN++;
            cirN++;
            for(var i=0; i<len; i++){
                cLis[i].className = "quiet";
            }
            if(cirN == len){
                cirN = 0;
            }
            cLis[cirN].className = "active";
            if(picN>=len){
                img_ul.style.left = 0;
                picN = 0;
            }
            return;
        }
        img_ul.timer = requestAnimationFrame(next);
    }

    function previous(){
        if(picN<=0){
            img_ul.style.left = -len*width + "px";
            picN = len;
        }
        cancelAnimationFrame(img_ul.timer);
        if(Roll(-(picN-1)*width)){
            cancelAnimationFrame(img_ul.timer);
            picN--;
            cirN--;
            for(var i=0; i<len; i++){
                cLis[i].className = "quiet";
            }
            if(cirN < 0){
                cirN = len-1;
            }
            cLis[cirN].className = "active";
            return;
        }
        img_ul.timer = requestAnimationFrame(previous);
    }

    function Roll(distance){
        var speed = img_ul.offsetLeft < distance ? rate:(0-rate);
            img_ul.style.left = img_ul.offsetLeft + speed + "px";
            var leave = distance - img_ul.offsetLeft;
            if(Math.abs(leave)<=Math.abs(speed)){
                img_ul.style.left = distance+"px";
                return 1;                             //切换完一张图片
            }
        return 0;
    }
}
          };