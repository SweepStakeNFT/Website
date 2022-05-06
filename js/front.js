var lastIdx=1;

$(function () {
    $(".main").onepage_scroll({
        sectionContainer: "section", // sectionContainer accepts any kind of selector in case you don't want to use section
        easing: "ease-out", // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in",
        // "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
        animationTime: 1000, // AnimationTime let you define how long each section takes to animate
        pagination: true, // You can either show or hide the pagination. Toggle true for show, false for hide.
        updateURL: false, // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
        beforeMove: function (index) {
        }, // This option accepts a callback function. The function will be called before the page moves.
        afterMove: function (index) {
          var nodeList=document.querySelectorAll('.section-'+lastIdx);
          for(let i=0;i<nodeList.length;i++){
            nodeList[i].style.visibility="hidden";
          }
          if(index==1){
            const headerTitle=document.querySelector('.section-1');
            headerTitle.style.visibility="visible";
            headerTitle.classList.add('animate__animated');
            headerTitle.classList.add('animate__lightSpeedInLeft');
          }
          if(index==2){
            const nodeList = document.querySelectorAll(".section-2");
            for (let i = 0; i < nodeList.length; i++) {
              nodeList[i].style.visibility = "visible";
              nodeList[i].classList.add('animate__animated', 'animate__zoomIn');
              nodeList[i].classList.add('delay-'+parseInt(i+1));
              nodeList[i].addEventListener('animationend', () => {
                nodeList[i].classList.remove('animate__animated');
                nodeList[i].classList.remove('animate__zoomIn');
              });
            }
            
          }else if(index==3){
            const nodeList = document.querySelectorAll(".card-animate");
            for (let i = 0; i < nodeList.length; i++) {
              nodeList[i].style.visibility = "visible";
              nodeList[i].classList.add('animate__animated','animate__faster', 'animate__zoomIn');
              nodeList[i].addEventListener('animationend', () => {
                nodeList[i].classList.remove('animate__animated');
                nodeList[i].classList.remove('animate__zoomIn');
              });
            }
          }
          lastIdx=index;
        }, // This option accepts a callback function. The function will be called after the page moves.
        loop: false, // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
        keyboard: false, // You can activate the keyboard controls
        responsiveFallback:1200, // You can fallback to normal page scroll by defining the width of the browser in which
        // you want the responsive fallback to be triggered. For example, set this to 600 and whenever
        // the browser's width is less than 600, the fallback will kick in.
        direction: "vertical"            // You can now define the direction of the One Page Scroll animation. Options available are "vertical" and "horizontal". The default value is "vertical".
    });
});

const headerTitle=document.querySelector('.section-1');
headerTitle.classList.add('animate__animated','animate__lightSpeedInLeft');
headerTitle.addEventListener('animationend',()=>{
  headerTitle.classList.remove('animate__animated');
  headerTitle.classList.remove('animate__lightSpeedInLeft');
});

function screen1000px() {
  var mq = window.matchMedia("(min-width: 1000px)");
  return mq.matches;
}

function screen1200px() {
  var mq = window.matchMedia("(max-width: 1200px)");
  return mq.matches;
}

var mediaQueryTitle=window.matchMedia("(min-width: 768px)");
if(mediaQueryTitle.matches){
  let width=screen.width;
  var titleWidth=Math.round($('#connect-wallet-button').width());
  $('#more-details').addClass('text-right');
  var halfScreen=Math.round(width/2)-titleWidth/2;
  $('#connect-wallet-button').css('left',halfScreen+'px');
}else{
  $('#connect-wallet-button').css('left','10px');
}

var roadmap = (function() {
    var wrapper = document.querySelector('.js-roadmap-timeline');
    var timeframes = document.querySelectorAll('.js-roadmap-timeframe');
    var mediaQuery = window.matchMedia("(min-width: 1200px)");
    var topMaxHeight;
    var bottomMaxHeight;
    
    handleStyling();
    window.addEventListener("optimizedResize", handleStyling);
    
    function handleStyling() {
      if (mediaQuery.matches) {
        const nodeList2 = document.querySelectorAll(".section-2");
        for(let i=0;i<nodeList2.length;i++){
          nodeList2[i].style.visibility="hidden";
        }

        const nodeList3 = document.querySelectorAll(".section-3");
        for(let i=0;i<nodeList3.length;i++){
          nodeList3[i].style.visibility="hidden";
        }
        applyHeights();
        styleWrapper();
      } else {
        if(screen1000px()==false){
          $(".section-odd").each(function() {
            $(this).attr('data-aos','fade-left');
            
          });
  
          $(".section-even").each(function() {
            $(this).attr('data-aos','fade-right');
          });
  
          $(".section-3").each(function() {
            $(this).attr('data-aos','zoom-in');
            $(this).attr('data-aos-anchor-placement','top-center');
          });
        }
        AOS.refreshHard();
        clearWrapperStyling();
      }
    }
    
    function applyHeights() {
        topMaxHeight = getMaxHeight(timeframes, 0);
        bottomMaxHeight = getMaxHeight(timeframes, 1);
        let height = screen.height;
        if(height>1000){
          topMaxHeight+=60;
        }
    }
    
    function getMaxHeight(els, start) {
      var maxHeight = 0;
      var i = start;
      
      for (; i < els.length - 1; i = i + 2) {
        var elHeight = els[i].offsetHeight;
        
        maxHeight = maxHeight > elHeight ? maxHeight : elHeight;
      }
      return maxHeight;
    }
    
    function styleWrapper() {
      wrapper.style.paddingBottom = bottomMaxHeight + 'px';
      wrapper.style.paddingTop = topMaxHeight + 'px';
    }
    
    function clearWrapperStyling() {
      wrapper.style.paddingBottom = '';
      wrapper.style.paddingTop = '';
    }
  })();

    function CheckValue() {
		var value=$('#input-minting-number').val();
		if(value >= 5)
		{
			$('#input-minting-number').val(5);
		}
		else if(value <= 0)
		{
			$('#input-minting-number').val(1);
		}
    }

  $('#btn-plus').on('click',function(){
    var value=$('#input-minting-number').val();
    if(value==""){
      $('#input-minting-number').val(1);
    }else{
      var finalValue=parseInt(value)+1>5?5:parseInt(value)+1;
      $('#input-minting-number').val(finalValue);
    }
  });

  $('#btn-minus').on('click',function(){
    var value=$('#input-minting-number').val();
    if(value==""){
      $('#input-minting-number').val(1);
    }else{
      var finalValue=parseInt(value)-1<1?1:parseInt(value)-1;
      $('#input-minting-number').val(finalValue);
    }
  });

  AOS.init({
    once: true,
    easing: 'ease-in-out'
  });

  
  $(window).on('load', function () {
    AOS.refresh();
});

  jQuery.event.special.mousewheel = { setup: function( _, ns, handle ){ if ( ns.includes("noPreventDefault") ) { this.addEventListener("mousewheel", handle, { passive: true }); } else { this.addEventListener("mousewheel", handle, { passive: false }); } } };