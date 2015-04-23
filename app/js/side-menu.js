/*global $:false */
var window = {};
var document = {};

var degreeRotate = 0;
var menuRotate = 0;
var clicking=false;
var topClicking=false;
var globeStopped=false;
var lastSectionCount=0;
var sectionCount=0;
var footerTop = $('#container').height()-$('footer').height();
var scroll1 = $('.section1 .main-content').offset().top-400;
var scroll2 = $('.section2 .main-content').offset().top-400;
var scroll3 = $('.section3 .main-content').offset().top-400;

//detect side-menu rotation and section count
function checkPosition(scrollp, stopped){
    if (scrollp<scroll1){
        degreeRotate =0;
        sectionCount=0;
    } else if (scrollp>=scroll1 && scrollp<scroll2){
        degreeRotate = -105;
        sectionCount=1;
     } else if (scrollp>=scroll2 && scrollp<scroll3){
        degreeRotate = -120;
        sectionCount=2;
    } else if (scrollp>=scroll3 ){
        degreeRotate = -135;
        sectionCount=3;
    } else if (stopped){
        degreeRotate= -150;
        sectionCount=4;
    }
}

//rotate the menu and menu-items in opposite directions
function menuTransform(oTransValue, nTransValue)
{
    $('#side-menu').animateRotate(oTransValue, nTransValue, 1000, 'linear', function(){
       return;
    });
    $('.menu-item').animateRotate(-(oTransValue), -(nTransValue), 1000, 'linear', function(){
        return;   // console.log(this); 
    });
}

//to be called by top or side menus (scrolling nav)
/*jshint unused:false */
function clickChange(clickRotate, scrollTo, menuShow, topMenu){
    if (topMenu){
        topClicking=true;
    }
    clicking=true;
    degreeRotate=clickRotate;
    console.log(clickRotate+' '+scrollTo+' '+menuShow);
    menuTransform(menuRotate, degreeRotate);
    $('html, body').animate({
        scrollTop: $(scrollTo).offset().top-80
    }, 1000, function(){
        clicking=false;
        topClicking=false;
    });
    menuRotate = degreeRotate;
    if (clickRotate!==0){
        $(menuShow+' .active').css('display', 'block');
    }
}

//rotates any object
$.fn.animateRotate = function(oAngle, nAngle, duration, easing, complete) {
    var args = $.speed(duration, easing, complete);
    var step = args.step;
    return this.each(function(i, e) {
        args.complete = $.proxy(args.complete, e);
        args.step = function(now) {
            $.style(e, 'transform', 'rotate(' + now + 'deg)');
            if (step) {return step.apply(e, arguments);}
        };

        $({deg: oAngle}).animate({deg: nAngle}, args);
    });
};


$(document).ready(function() {

    var scrollPos = $(window).scrollTop();

    var globeIn=false;
    $(document).scroll(function() {
        var newScroll = $(window).scrollTop();
        
        //fade in side-menu
        if (newScroll<scroll1){
            // if (globeIn===false){
            if (!topClicking){
                $('#side-menu').fadeOut('slow');
            }
            // }
            globeIn=true;
        } else if (newScroll>=scroll1){
            // if (globeIn){
                $('#side-menu').fadeIn('slow');
            // }
            globeIn=false;
        }
        checkPosition(newScroll, globeStopped);

        // stop side menu from scrolling past footer
        var menuTop=$(window).scrollTop()-60;
        var menuBottom=menuTop+$('#side-menu').height();
        // console.log('menuTop: '+menuTop+'menuBottom: '+menuBottom+' footerTop: '+footerTop);
        if (menuBottom>=footerTop){
            $('#side-menu').css({'position': 'absolute', 'top': footerTop-$('#side-menu').height()+130});
            globeStopped=true;
        } else if (menuBottom<footerTop) {
            $('#side-menu').css({'position': 'fixed', 'top': '70px'});
            globeStopped=false;
        }
        
        // if in new section and not scrolling because of a sub-menu click, then update rotation
        if (menuRotate!==degreeRotate&&clicking===false){
            scrollPos = newScroll;
            menuTransform(menuRotate, degreeRotate);
            menuRotate = degreeRotate;
        }
        // if in a new section, update the active icon and idle icon hover effects
        if (lastSectionCount!==sectionCount){
            if (topClicking===false){
                $('#menu'+lastSectionCount+' .active').fadeOut('slow', function(){
                if (clicking===false){
                    if (sectionCount!==4){
                        $('#menu'+sectionCount+' .active').fadeIn('slow');
                    }
                }
                });
            }
            // if (sectionCount!==0){
            //     $('#side-menu .menu-item').each(function(){
            //         var active=$(this).children('.active').eq(0);
            //         if (!active.is('#menu'+sectionCount+' .active')){
            //             $(this).hover(function(){
            //                 active.fadeIn('fast');
            //             },function(){
            //                 active.fadeOut('fast');
            //                 // checkPosition($(window).scrollTop(),globeStopped);
            //             });
            //         }
            //     });
            // }
                
        lastSectionCount=sectionCount;
         
        }
    });
    
});
