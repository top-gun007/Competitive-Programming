var Lightbox={auto_modal:false,overlayOpacity:.8,overlayColor:"000",disableCloseClick:true,resizeSequence:0,resizeSpeed:"normal",fadeInSpeed:"normal",slideDownSpeed:"slow",minWidth:240,borderSize:10,boxColor:"fff",fontColor:"000",topPosition:"",infoHeight:20,alternative_layout:false,imageArray:[],imageNum:null,total:0,activeImage:null,inprogress:false,disableResize:false,disableZoom:false,isZoomedIn:false,rtl:false,loopItems:false,keysClose:["c","x",27],keysPrevious:["p",37],keysNext:["n",39],keysZoom:["z"],keysPlayPause:[32],slideInterval:5e3,showPlayPause:true,autoStart:true,autoExit:true,pauseOnNextClick:false,pauseOnPrevClick:true,slideIdArray:[],slideIdCount:0,isSlideshow:false,isPaused:false,loopSlides:false,isLightframe:false,iframe_width:600,iframe_height:400,iframe_border:1,enableVideo:false,flvPlayer:"/flvplayer.swf",flvFlashvars:"",isModal:false,isVideo:false,videoId:false,modalWidth:400,modalHeight:400,modalHTML:null,initialize:function(){var e=Drupal.settings.lightbox2;Lightbox.overlayOpacity=e.overlay_opacity;Lightbox.overlayColor=e.overlay_color;Lightbox.disableCloseClick=e.disable_close_click;Lightbox.resizeSequence=e.resize_sequence;Lightbox.resizeSpeed=e.resize_speed;Lightbox.fadeInSpeed=e.fade_in_speed;Lightbox.slideDownSpeed=e.slide_down_speed;Lightbox.borderSize=e.border_size;Lightbox.boxColor=e.box_color;Lightbox.fontColor=e.font_color;Lightbox.topPosition=e.top_position;Lightbox.rtl=e.rtl;Lightbox.loopItems=e.loop_items;Lightbox.keysClose=e.keys_close.split(" ");Lightbox.keysPrevious=e.keys_previous.split(" ");Lightbox.keysNext=e.keys_next.split(" ");Lightbox.keysZoom=e.keys_zoom.split(" ");Lightbox.keysPlayPause=e.keys_play_pause.split(" ");Lightbox.disableResize=e.disable_resize;Lightbox.disableZoom=e.disable_zoom;Lightbox.slideInterval=e.slideshow_interval;Lightbox.showPlayPause=e.show_play_pause;Lightbox.showCaption=e.show_caption;Lightbox.autoStart=e.slideshow_automatic_start;Lightbox.autoExit=e.slideshow_automatic_exit;Lightbox.pauseOnNextClick=e.pause_on_next_click;Lightbox.pauseOnPrevClick=e.pause_on_previous_click;Lightbox.loopSlides=e.loop_slides;Lightbox.alternative_layout=e.use_alt_layout;Lightbox.iframe_width=e.iframe_width;Lightbox.iframe_height=e.iframe_height;Lightbox.iframe_border=e.iframe_border;Lightbox.enableVideo=e.enable_video;if(e.enable_video){Lightbox.flvPlayer=e.flvPlayer;Lightbox.flvFlashvars=e.flvFlashvars}var i=e.use_alt_layout?"lightbox2-alt-layout":"lightbox2-orig-layout";var t='<div id="lightbox2-overlay" style="display: none;"></div>      <div id="lightbox" style="display: none;" class="'+i+'">        <div id="outerImageContainer"></div>        <div id="imageDataContainer" class="clearfix">          <div id="imageData"></div>        </div>      </div>';var o='<div id="loading"><a href="#" id="loadingLink"></a></div>';var a='<div id="modalContainer" style="display: none;"></div>';var l='<div id="frameContainer" style="display: none;"></div>';var r='<div id="imageContainer" style="display: none;"></div>';var s='<div id="imageDetails"></div>';var h='<div id="bottomNav"></div>';var g='<img id="lightboxImage" alt="" />';var n='<div id="hoverNav"><a id="prevLink" href="#"></a><a id="nextLink" href="#"></a></div>';var d='<div id="frameHoverNav"><a id="framePrevLink" href="#"></a><a id="frameNextLink" href="#"></a></div>';var n='<div id="hoverNav"><a id="prevLink" title="'+Drupal.t("Previous")+'" href="#"></a><a id="nextLink" title="'+Drupal.t("Next")+'" href="#"></a></div>';var d='<div id="frameHoverNav"><a id="framePrevLink" title="'+Drupal.t("Previous")+'" href="#"></a><a id="frameNextLink" title="'+Drupal.t("Next")+'" href="#"></a></div>';var b='<span id="caption"></span>';var x='<span id="numberDisplay"></span>';var f='<a id="bottomNavClose" title="'+Drupal.t("Close")+'" href="#"></a>';var c='<a id="bottomNavZoom" href="#"></a>';var m='<a id="bottomNavZoomOut" href="#"></a>';var L='<a id="lightshowPause" title="'+Drupal.t("Pause Slideshow")+'" href="#" style="display: none;"></a>';var u='<a id="lightshowPlay" title="'+Drupal.t("Play Slideshow")+'" href="#" style="display: none;"></a>';$("body").append(t);$("#outerImageContainer").append(a+l+r+o);if(!e.use_alt_layout){$("#imageContainer").append(g+n);$("#imageData").append(s+h);$("#imageDetails").append(b+x);$("#bottomNav").append(d+f+c+m+L+u)}else{$("#outerImageContainer").append(h);$("#imageContainer").append(g);$("#bottomNav").append(f+c+m);$("#imageData").append(n+s);$("#imageDetails").append(b+x+L+u)}if(Lightbox.disableCloseClick){$("#lightbox2-overlay").click(function(){Lightbox.end();return false}).hide()}$("#loadingLink, #bottomNavClose").click(function(){Lightbox.end("forceClose");return false});$("#prevLink, #framePrevLink").click(function(){Lightbox.changeData(Lightbox.activeImage-1);return false});$("#nextLink, #frameNextLink").click(function(){Lightbox.changeData(Lightbox.activeImage+1);return false});$("#bottomNavZoom").click(function(){Lightbox.changeData(Lightbox.activeImage,true);return false});$("#bottomNavZoomOut").click(function(){Lightbox.changeData(Lightbox.activeImage,false);return false});$("#lightshowPause").click(function(){Lightbox.togglePlayPause("lightshowPause","lightshowPlay");return false});$("#lightshowPlay").click(function(){Lightbox.togglePlayPause("lightshowPlay","lightshowPause");return false});$("#prevLink, #nextLink, #framePrevLink, #frameNextLink").css({paddingTop:Lightbox.borderSize+"px"});$("#imageContainer, #frameContainer, #modalContainer").css({padding:Lightbox.borderSize+"px"});$("#outerImageContainer, #imageDataContainer, #bottomNavClose").css({backgroundColor:"#"+Lightbox.boxColor,color:"#"+Lightbox.fontColor});if(Lightbox.alternative_layout){$("#bottomNavZoom, #bottomNavZoomOut").css({bottom:Lightbox.borderSize+"px",right:Lightbox.borderSize+"px"})}else if(Lightbox.rtl==1&&$.browser.msie){$("#bottomNavZoom, #bottomNavZoomOut").css({left:"0px"})}if(e.force_show_nav){$("#prevLink, #nextLink").addClass("force_show_nav")}},initList:function(e){if(e==undefined||e==null){e=document}$("a[rel^='lightbox']:not(.lightbox-processed), area[rel^='lightbox']:not(.lightbox-processed)",e).addClass("lightbox-processed").click(function(e){if(Lightbox.disableCloseClick){$("#lightbox").unbind("click");$("#lightbox").click(function(){Lightbox.end("forceClose")})}Lightbox.start(this,false,false,false,false);if(e.preventDefault){e.preventDefault()}return false});$("a[rel^='lightshow']:not(.lightbox-processed), area[rel^='lightshow']:not(.lightbox-processed)",e).addClass("lightbox-processed").click(function(e){if(Lightbox.disableCloseClick){$("#lightbox").unbind("click");$("#lightbox").click(function(){Lightbox.end("forceClose")})}Lightbox.start(this,true,false,false,false);if(e.preventDefault){e.preventDefault()}return false});$("a[rel^='lightframe']:not(.lightbox-processed), area[rel^='lightframe']:not(.lightbox-processed)",e).addClass("lightbox-processed").click(function(e){if(Lightbox.disableCloseClick){$("#lightbox").unbind("click");$("#lightbox").click(function(){Lightbox.end("forceClose")})}Lightbox.start(this,false,true,false,false);if(e.preventDefault){e.preventDefault()}return false});if(Lightbox.enableVideo){$("a[rel^='lightvideo']:not(.lightbox-processed), area[rel^='lightvideo']:not(.lightbox-processed)",e).addClass("lightbox-processed").click(function(e){if(Lightbox.disableCloseClick){$("#lightbox").unbind("click");$("#lightbox").click(function(){Lightbox.end("forceClose")})}Lightbox.start(this,false,false,true,false);if(e.preventDefault){e.preventDefault()}return false})}$("a[rel^='lightmodal']:not(.lightbox-processed), area[rel^='lightmodal']:not(.lightbox-processed)",e).addClass("lightbox-processed").click(function(e){$("#lightbox").unbind("click");$("#lightbox").addClass($(this).attr("class"));$("#lightbox").removeClass("lightbox-processed");Lightbox.start(this,false,false,false,true);if(e.preventDefault){e.preventDefault()}return false});$("#lightboxAutoModal:not(.lightbox-processed)",e).addClass("lightbox-processed").click(function(e){Lightbox.auto_modal=true;$("#lightbox").unbind("click");Lightbox.start(this,false,false,false,true);if(e.preventDefault){e.preventDefault()}return false})},start:function(e,i,t,o,a){Lightbox.isPaused=!Lightbox.autoStart;Lightbox.toggleSelectsFlash("hide");var l=Lightbox.getPageSize();$("#lightbox2-overlay").hide().css({width:"100%",zIndex:"10090",height:l[1]+"px",backgroundColor:"#"+Lightbox.overlayColor});if(o&&this.detectMacFF2()){$("#lightbox2-overlay").removeClass("overlay_default");$("#lightbox2-overlay").addClass("overlay_macff2");$("#lightbox2-overlay").css({opacity:null})}else{$("#lightbox2-overlay").removeClass("overlay_macff2");$("#lightbox2-overlay").addClass("overlay_default");$("#lightbox2-overlay").css({opacity:Lightbox.overlayOpacity})}$("#lightbox2-overlay").fadeIn(Lightbox.fadeInSpeed);Lightbox.isSlideshow=i;Lightbox.isLightframe=t;Lightbox.isVideo=o;Lightbox.isModal=a;Lightbox.imageArray=[];Lightbox.imageNum=0;var r=$(e.tagName);var s=null;var h=Lightbox.parseRel(e);var g=h["rel"];var n=h["group"];var d=h["title"]?h["title"]:e.title;var b=null;var x=0;if(h["flashvars"]){Lightbox.flvFlashvars=Lightbox.flvFlashvars+"&"+h["flashvars"]}var f=e.title;if(!f){var c=$(e).find("img");if(c&&$(c).attr("alt")){f=$(c).attr("alt")}else{f=d}}if($(e).attr("id")=="lightboxAutoModal"){b=h["style"];Lightbox.imageArray.push(["#lightboxAutoModal > *",d,f,b,1])}else{if((g=="lightbox"||g=="lightshow")&&!n){Lightbox.imageArray.push([e.href,d,f])}else if(!n){b=h["style"];Lightbox.imageArray.push([e.href,d,f,b])}else{for(x=0;x<r.length;x++){s=r[x];if(s.href&&typeof s.href=="string"&&$(s).attr("rel")){var m=Lightbox.parseRel(s);var L=m["title"]?m["title"]:s.title;img_alt=s.title;if(!img_alt){var u=$(s).find("img");if(u&&$(u).attr("alt")){img_alt=$(u).attr("alt")}else{img_alt=d}}if(m["rel"]==g){if(m["group"]==n){if(Lightbox.isLightframe||Lightbox.isModal||Lightbox.isVideo){b=m["style"]}Lightbox.imageArray.push([s.href,L,img_alt,b])}}}}for(x=0;x<Lightbox.imageArray.length;x++){for(j=Lightbox.imageArray.length-1;j>x;j--){if(Lightbox.imageArray[x][0]==Lightbox.imageArray[j][0]){Lightbox.imageArray.splice(j,1)}}}while(Lightbox.imageArray[Lightbox.imageNum][0]!=e.href){Lightbox.imageNum++}}}if(Lightbox.isSlideshow&&Lightbox.showPlayPause&&Lightbox.isPaused){$("#lightshowPlay").show();$("#lightshowPause").hide()}var v=Lightbox.getPageScroll();var p=v[1]+(Lightbox.topPosition==""?l[3]/10:Lightbox.topPosition)*1;var y=v[0];$("#frameContainer, #modalContainer, #lightboxImage").hide();$("#hoverNav, #prevLink, #nextLink, #frameHoverNav, #framePrevLink, #frameNextLink").hide();$("#imageDataContainer, #numberDisplay, #bottomNavZoom, #bottomNavZoomOut").hide();$("#outerImageContainer").css({width:"250px",height:"250px"});$("#lightbox").css({zIndex:"10500",top:p+"px",left:y+"px"}).show();Lightbox.total=Lightbox.imageArray.length;Lightbox.changeData(Lightbox.imageNum)},changeData:function(e,i){if(Lightbox.inprogress===false){if(Lightbox.total>1&&(Lightbox.isSlideshow&&Lightbox.loopSlides||!Lightbox.isSlideshow&&Lightbox.loopItems)){if(e>=Lightbox.total)e=0;if(e<0)e=Lightbox.total-1}if(Lightbox.isSlideshow){for(var t=0;t<Lightbox.slideIdCount;t++){window.clearTimeout(Lightbox.slideIdArray[t])}}Lightbox.inprogress=true;Lightbox.activeImage=e;if(Lightbox.disableResize&&!Lightbox.isSlideshow){i=true}Lightbox.isZoomedIn=i;$("#loading").css({zIndex:"10500"}).show();if(!Lightbox.alternative_layout){$("#imageContainer").hide()}$("#frameContainer, #modalContainer, #lightboxImage").hide();$("#hoverNav, #prevLink, #nextLink, #frameHoverNav, #framePrevLink, #frameNextLink").hide();$("#imageDataContainer, #numberDisplay, #bottomNavZoom, #bottomNavZoomOut").hide();if(!Lightbox.isLightframe&&!Lightbox.isVideo&&!Lightbox.isModal){$("#lightbox #imageDataContainer").removeClass("lightbox2-alt-layout-data");imgPreloader=new Image;imgPreloader.onerror=function(){Lightbox.imgNodeLoadingError(this)};imgPreloader.onload=function(){var e=document.getElementById("lightboxImage");e.src=Lightbox.imageArray[Lightbox.activeImage][0];e.alt=Lightbox.imageArray[Lightbox.activeImage][2];var t=imgPreloader.width;var o=imgPreloader.height;var a=Lightbox.getPageSize();var l={w:a[2]-Lightbox.borderSize*2,h:a[3]-Lightbox.borderSize*6-Lightbox.infoHeight*4-a[3]/10};var r={w:imgPreloader.width,h:imgPreloader.height};if(i!==true){var s=1;$("#bottomNavZoomOut, #bottomNavZoom").hide();if((r.w>=l.w||r.h>=l.h)&&r.h&&r.w){s=l.w/r.w<l.h/r.h?l.w/r.w:l.h/r.h;if(!Lightbox.disableZoom&&!Lightbox.isSlideshow){$("#bottomNavZoom").css({zIndex:"10500"}).show()}}t=Math.floor(r.w*s);o=Math.floor(r.h*s)}else{$("#bottomNavZoom").hide();if((r.w>=l.w||r.h>=l.h)&&r.h&&r.w){if(!Lightbox.disableResize&&Lightbox.isSlideshow===false&&!Lightbox.disableZoom){$("#bottomNavZoomOut").css({zIndex:"10500"}).show()}}}e.style.width=t+"px";e.style.height=o+"px";Lightbox.resizeContainer(t,o);imgPreloader.onload=function(){}};imgPreloader.src=Lightbox.imageArray[Lightbox.activeImage][0];imgPreloader.alt=Lightbox.imageArray[Lightbox.activeImage][2]}else if(Lightbox.isLightframe){$("#lightbox #imageDataContainer").addClass("lightbox2-alt-layout-data");var o=Lightbox.imageArray[Lightbox.activeImage][0];$("#frameContainer").html('<iframe id="lightboxFrame" style="display: none;" src="'+o+'"></iframe>');if($.browser.mozilla&&o.indexOf(".swf")!=-1){setTimeout(function(){document.getElementById("lightboxFrame").src=Lightbox.imageArray[Lightbox.activeImage][0]},1e3)}if(!Lightbox.iframe_border){$("#lightboxFrame").css({border:"none"});$("#lightboxFrame").attr("frameborder","0")}var a=document.getElementById("lightboxFrame");var l=Lightbox.imageArray[Lightbox.activeImage][3];a=Lightbox.setStyles(a,l);Lightbox.resizeContainer(parseInt(a.width,10),parseInt(a.height,10))}else if(Lightbox.isVideo||Lightbox.isModal){$("#lightbox #imageDataContainer").addClass("lightbox2-alt-layout-data");var r=document.getElementById("modalContainer");var s=Lightbox.imageArray[Lightbox.activeImage][3];r=Lightbox.setStyles(r,s);if(Lightbox.isVideo){Lightbox.modalHeight=parseInt(r.height,10)-10;Lightbox.modalWidth=parseInt(r.width,10)-10;Lightvideo.startVideo(Lightbox.imageArray[Lightbox.activeImage][0])}Lightbox.resizeContainer(parseInt(r.width,10),parseInt(r.height,10))}}},imgNodeLoadingError:function(e){var i=Drupal.settings.lightbox2;var t=Lightbox.imageArray[Lightbox.activeImage][0];if(i.display_image_size!==""){t=t.replace(new RegExp("."+i.display_image_size),"")}Lightbox.imageArray[Lightbox.activeImage][0]=t;e.onerror=function(){Lightbox.imgLoadingError(e)};e.src=t},imgLoadingError:function(e){var i=Drupal.settings.lightbox2;Lightbox.imageArray[Lightbox.activeImage][0]=i.default_image;e.src=i.default_image},resizeContainer:function(e,i){e=e<Lightbox.minWidth?Lightbox.minWidth:e;this.widthCurrent=$("#outerImageContainer").width();this.heightCurrent=$("#outerImageContainer").height();var t=e+Lightbox.borderSize*2;var o=i+Lightbox.borderSize*2;this.xScale=t/this.widthCurrent*100;this.yScale=o/this.heightCurrent*100;wDiff=this.widthCurrent-t;hDiff=this.heightCurrent-o;$("#modalContainer").css({width:e,height:i});if(Lightbox.resizeSequence){var a={width:t};var l={height:o};if(Lightbox.resizeSequence==2){a={height:o};l={width:t}}$("#outerImageContainer").animate(a,Lightbox.resizeSpeed).animate(l,Lightbox.resizeSpeed,"linear",function(){Lightbox.showData()})}else{$("#outerImageContainer").animate({width:t,height:o},Lightbox.resizeSpeed,"linear",function(){Lightbox.showData()})}if(hDiff===0&&wDiff===0){if($.browser.msie){Lightbox.pause(250)}else{Lightbox.pause(100)}}var r=Drupal.settings.lightbox2;if(!r.use_alt_layout){$("#prevLink, #nextLink").css({height:i+"px"})}$("#imageDataContainer").css({width:t+"px"})},showData:function(){$("#loading").hide();if(Lightbox.isLightframe||Lightbox.isVideo||Lightbox.isModal){Lightbox.updateDetails();if(Lightbox.isLightframe){$("#frameContainer").show();if($.browser.safari||Lightbox.fadeInSpeed===0){$("#lightboxFrame").css({zIndex:"10500"}).show()}else{$("#lightboxFrame").css({zIndex:"10500"}).fadeIn(Lightbox.fadeInSpeed)}}else{if(Lightbox.isVideo){$("#modalContainer").html(Lightbox.modalHTML).click(function(){return false}).css("zIndex","10500").show()}else{var e=unescape(Lightbox.imageArray[Lightbox.activeImage][0]);if(Lightbox.imageArray[Lightbox.activeImage][4]){$(e).appendTo("#modalContainer");$("#modalContainer").css({zIndex:"10500"}).show()}else{$("#modalContainer").hide().load(e,function(){$("#modalContainer").css({zIndex:"10500"}).show()})}$("#modalContainer").unbind("click")}}}else{$("#imageContainer").show();if($.browser.safari||Lightbox.fadeInSpeed===0){$("#lightboxImage").css({zIndex:"10500"}).show()}else{$("#lightboxImage").css({zIndex:"10500"}).fadeIn(Lightbox.fadeInSpeed)}Lightbox.updateDetails();this.preloadNeighborImages()}Lightbox.inprogress=false;if(Lightbox.isSlideshow){if(!Lightbox.loopSlides&&Lightbox.activeImage==Lightbox.total-1){if(Lightbox.autoExit){Lightbox.slideIdArray[Lightbox.slideIdCount++]=setTimeout(function(){Lightbox.end("slideshow")},Lightbox.slideInterval)}}else{if(!Lightbox.isPaused&&Lightbox.total>1){Lightbox.slideIdArray[Lightbox.slideIdCount++]=setTimeout(function(){Lightbox.changeData(Lightbox.activeImage+1)},Lightbox.slideInterval)}}if(Lightbox.showPlayPause&&Lightbox.total>1&&!Lightbox.isPaused){$("#lightshowPause").show();$("#lightshowPlay").hide()}else if(Lightbox.showPlayPause&&Lightbox.total>1){$("#lightshowPause").hide();$("#lightshowPlay").show()}}var i=Lightbox.getPageSize();var t=Lightbox.getPageScroll();var o=i[1];if(Lightbox.isZoomedIn&&i[1]>i[3]){var a=(Lightbox.topPosition==""?i[3]/10:Lightbox.topPosition)*1;o=o+t[1]+a}$("#lightbox2-overlay").css({height:o+"px",width:i[0]+"px"});if($.browser.mozilla){if(Lightbox.imageArray[Lightbox.activeImage][0].indexOf(".pdf")!=-1){setTimeout(function(){document.getElementById("lightboxFrame").src=Lightbox.imageArray[Lightbox.activeImage][0]},1e3)}}},updateDetails:function(){$("#imageDataContainer").hide();var e=Drupal.settings.lightbox2;if(e.show_caption){var i=Lightbox.filterXSS(Lightbox.imageArray[Lightbox.activeImage][1]);if(!i)i="";$("#caption").html(i).css({zIndex:"10500"}).show()}var t=null;if(e.image_count&&Lightbox.total>1){var o=Lightbox.activeImage+1;if(!Lightbox.isLightframe&&!Lightbox.isModal&&!Lightbox.isVideo){t=e.image_count.replace(/\!current/,o).replace(/\!total/,Lightbox.total)}else if(Lightbox.isVideo){t=e.video_count.replace(/\!current/,o).replace(/\!total/,Lightbox.total)}else{t=e.page_count.replace(/\!current/,o).replace(/\!total/,Lightbox.total)}$("#numberDisplay").html(t).css({zIndex:"10500"}).show()}else{$("#numberDisplay").hide()}$("#imageDataContainer").hide().slideDown(Lightbox.slideDownSpeed,function(){$("#bottomNav").show()});if(Lightbox.rtl==1){$("#bottomNav").css({"float":"left"})}Lightbox.updateNav()},updateNav:function(){$("#hoverNav").css({zIndex:"10500"}).show();var e="#prevLink";var i="#nextLink";if(Lightbox.isSlideshow){if(Lightbox.total>1&&Lightbox.loopSlides||Lightbox.activeImage!==0){$(e).css({zIndex:"10500"}).show().click(function(){if(Lightbox.pauseOnPrevClick){Lightbox.togglePlayPause("lightshowPause","lightshowPlay")}Lightbox.changeData(Lightbox.activeImage-1);return false})}else{$(e).hide()}if(Lightbox.total>1&&Lightbox.loopSlides||Lightbox.activeImage!=Lightbox.total-1){$(i).css({zIndex:"10500"}).show().click(function(){if(Lightbox.pauseOnNextClick){Lightbox.togglePlayPause("lightshowPause","lightshowPlay")}Lightbox.changeData(Lightbox.activeImage+1);return false})}else{$(i).hide()}}else{if((Lightbox.isLightframe||Lightbox.isModal||Lightbox.isVideo)&&!Lightbox.alternative_layout){$("#frameHoverNav").css({zIndex:"10500"}).show();$("#hoverNav").css({zIndex:"10500"}).hide();e="#framePrevLink";i="#frameNextLink"}if(Lightbox.total>1&&Lightbox.loopItems||Lightbox.activeImage!==0){$(e).css({zIndex:"10500"}).show().unbind().click(function(){Lightbox.changeData(Lightbox.activeImage-1);return false})}else{$(e).hide()}if(Lightbox.total>1&&Lightbox.loopItems||Lightbox.activeImage!=Lightbox.total-1){$(i).css({zIndex:"10500"}).show().unbind().click(function(){Lightbox.changeData(Lightbox.activeImage+1);return false})}else{$(i).hide()}}if(!Lightbox.isModal){this.enableKeyboardNav()}},enableKeyboardNav:function(){$(document).bind("keydown",this.keyboardAction)},disableKeyboardNav:function(){$(document).unbind("keydown",this.keyboardAction)},keyboardAction:function(e){if(e===null){keycode=event.keyCode;escapeKey=27}else{keycode=e.keyCode;escapeKey=e.DOM_VK_ESCAPE}key=String.fromCharCode(keycode).toLowerCase();if(Lightbox.checkKey(Lightbox.keysClose,key,keycode)){Lightbox.end("forceClose")}else if(Lightbox.checkKey(Lightbox.keysPrevious,key,keycode)){if(Lightbox.total>1&&(Lightbox.isSlideshow&&Lightbox.loopSlides||!Lightbox.isSlideshow&&Lightbox.loopItems)||Lightbox.activeImage!==0){Lightbox.changeData(Lightbox.activeImage-1)}}else if(Lightbox.checkKey(Lightbox.keysNext,key,keycode)){if(Lightbox.total>1&&(Lightbox.isSlideshow&&Lightbox.loopSlides||!Lightbox.isSlideshow&&Lightbox.loopItems)||Lightbox.activeImage!=Lightbox.total-1){Lightbox.changeData(Lightbox.activeImage+1)}}else if(Lightbox.checkKey(Lightbox.keysZoom,key,keycode)&&!Lightbox.disableResize&&!Lightbox.disableZoom&&!Lightbox.isSlideshow&&!Lightbox.isLightframe){if(Lightbox.isZoomedIn){Lightbox.changeData(Lightbox.activeImage,false)}else if(!Lightbox.isZoomedIn){Lightbox.changeData(Lightbox.activeImage,true)}return false}else if(Lightbox.checkKey(Lightbox.keysPlayPause,key,keycode)&&Lightbox.isSlideshow){if(Lightbox.isPaused){Lightbox.togglePlayPause("lightshowPlay","lightshowPause")}else{Lightbox.togglePlayPause("lightshowPause","lightshowPlay")}return false}},preloadNeighborImages:function(){if(Lightbox.total-1>Lightbox.activeImage){preloadNextImage=new Image;preloadNextImage.src=Lightbox.imageArray[Lightbox.activeImage+1][0]}if(Lightbox.activeImage>0){preloadPrevImage=new Image;preloadPrevImage.src=Lightbox.imageArray[Lightbox.activeImage-1][0]}},end:function(e){var i=e=="slideshow"?false:true;if(Lightbox.isSlideshow&&Lightbox.isPaused&&!i){return}if(Lightbox.inprogress===true&&e!="forceClose"){return}Lightbox.disableKeyboardNav();$("#lightbox").hide();$("#lightbox2-overlay").fadeOut();Lightbox.isPaused=true;Lightbox.inprogress=false;Lightbox.toggleSelectsFlash("visible");if(Lightbox.isSlideshow){for(var t=0;t<Lightbox.slideIdCount;t++){window.clearTimeout(Lightbox.slideIdArray[t])}$("#lightshowPause, #lightshowPlay").hide()}else if(Lightbox.isLightframe){$("#frameContainer").empty().hide()}else if(Lightbox.isVideo||Lightbox.isModal){if(!Lightbox.auto_modal){$("#modalContainer").hide().html("")}Lightbox.auto_modal=false}},getPageScroll:function(){var e,i;if(self.pageYOffset||self.pageXOffset){i=self.pageYOffset;e=self.pageXOffset}else if(document.documentElement&&(document.documentElement.scrollTop||document.documentElement.scrollLeft)){i=document.documentElement.scrollTop;e=document.documentElement.scrollLeft}else if(document.body){i=document.body.scrollTop;e=document.body.scrollLeft}arrayPageScroll=[e,i];return arrayPageScroll},getPageSize:function(){var e,i;if(window.innerHeight&&window.scrollMaxY){e=window.innerWidth+window.scrollMaxX;i=window.innerHeight+window.scrollMaxY}else if(document.body.scrollHeight>document.body.offsetHeight){e=document.body.scrollWidth;i=document.body.scrollHeight}else{e=document.body.offsetWidth;i=document.body.offsetHeight}var t,o;if(self.innerHeight){if(document.documentElement.clientWidth){t=document.documentElement.clientWidth}else{t=self.innerWidth}o=self.innerHeight}else if(document.documentElement&&document.documentElement.clientHeight){t=document.documentElement.clientWidth;o=document.documentElement.clientHeight}else if(document.body){t=document.body.clientWidth;o=document.body.clientHeight}if(i<o){pageHeight=o}else{pageHeight=i}if(e<t){pageWidth=e}else{pageWidth=t}arrayPageSize=new Array(pageWidth,pageHeight,t,o);return arrayPageSize},pause:function(e){var i=new Date;var t=null;do{t=new Date}while(t-i<e)},toggleSelectsFlash:function(e){if(e=="visible"){$("select.lightbox_hidden, embed.lightbox_hidden, object.lightbox_hidden").show()}else if(e=="hide"){$("select:visible, embed:visible, object:visible").not("#lightboxAutoModal select, #lightboxAutoModal embed, #lightboxAutoModal object").addClass("lightbox_hidden");$("select.lightbox_hidden, embed.lightbox_hidden, object.lightbox_hidden").hide()}},parseRel:function(e){var i=[];i["rel"]=i["title"]=i["group"]=i["style"]=i["flashvars"]=null;if(!$(e).attr("rel"))return i;i["rel"]=$(e).attr("rel").match(/\w+/)[0];if($(e).attr("rel").match(/\[(.*)\]/)){var t=$(e).attr("rel").match(/\[(.*?)\]/)[1].split("|");i["group"]=t[0];i["style"]=t[1];if(i["style"]!=undefined&&i["style"].match(/flashvars:\s?(.*?);/)){i["flashvars"]=i["style"].match(/flashvars:\s?(.*?);/)[1]}}if($(e).attr("rel").match(/\[.*\]\[(.*)\]/)){i["title"]=$(e).attr("rel").match(/\[.*\]\[(.*)\]/)[1]}return i},setStyles:function(e,i){e.width=Lightbox.iframe_width;e.height=Lightbox.iframe_height;e.scrolling="auto";if(!i)return e;var t=i.split(";");for(var o=0;o<t.length;o++){if(t[o].indexOf("width:")>=0){var a=t[o].replace("width:","");e.width=jQuery.trim(a)}else if(t[o].indexOf("height:")>=0){var l=t[o].replace("height:","");e.height=jQuery.trim(l)}else if(t[o].indexOf("scrolling:")>=0){var r=t[o].replace("scrolling:","");e.scrolling=jQuery.trim(r)}else if(t[o].indexOf("overflow:")>=0){var s=t[o].replace("overflow:","");e.overflow=jQuery.trim(s)}}return e},togglePlayPause:function(e,i){if(Lightbox.isSlideshow&&e=="lightshowPause"){for(var t=0;t<Lightbox.slideIdCount;t++){window.clearTimeout(Lightbox.slideIdArray[t])}}$("#"+e).hide();$("#"+i).show();if(e=="lightshowPlay"){Lightbox.isPaused=false;if(!Lightbox.loopSlides&&Lightbox.activeImage==Lightbox.total-1){Lightbox.end()}else if(Lightbox.total>1){Lightbox.changeData(Lightbox.activeImage+1)}}else{Lightbox.isPaused=true}},triggerLightbox:function(e,i){if(e.length){if(i&&i.length){$("a[rel^='"+e+"["+i+"]'], area[rel^='"+e+"["+i+"]']").eq(0).trigger("click")}else{$("a[rel^='"+e+"'], area[rel^='"+e+"']").eq(0).trigger("click")}}},detectMacFF2:function(){var e=navigator.userAgent.toLowerCase();if(/firefox[\/\s](\d+\.\d+)/.test(e)){var i=new Number(RegExp.$1);if(i<3&&e.indexOf("mac")!=-1){return true}}return false},checkKey:function(e,i,t){return jQuery.inArray(i,e)!=-1||jQuery.inArray(String(t),e)!=-1},filterXSS:function(e,i){var t="";$.ajax({url:Drupal.settings.basePath+"system/lightbox2/filter-xss",data:{string:e,allowed_tags:i},type:"POST",async:false,dataType:"json",success:function(e){t=e}});return t}};Drupal.behaviors.initLightbox=function(e){$("body:not(.lightbox-processed)",e).addClass("lightbox-processed").each(function(){Lightbox.initialize();return false});Lightbox.initList(e);$("#lightboxAutoModal",e).triggerHandler("click")};