// JavaScript Document
function changeGraveStoneFront(){
document.getElementById('graveStoneFront').src="../img/greencode.png"  ;
}

function zoomimg(img){
  //img.style.zoom获取img对象的缩放比例，并转为十进制整数
  var zoom = parseInt(img.style.zoom,10);
  if (isNaN(zoom)){    //当zoom非数字时zoom默认为100％
    zoom = 100;
  }
  //event.wheelDelta滚轮移动量上移＋120，下移－120；显示比例每次增减10％
  zoom += event.wheelDelta / 12;
  //当zoom大于10％时重新设置显示比例
  if (zoom>10) img.style.zoom = zoom + "%";
	if(zoom>50) break;
}
