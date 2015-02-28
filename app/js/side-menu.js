
var degreeRotate = 0;
var menuRotate = 0;
var clicking=false;
$(document).ready(function() {
    var scroll1 = $(".section1 .main-content").offset().top-400;
    var scroll2 = $(".section2 .main-content").offset().top-400;
    var scroll3 = $(".section3 .main-content").offset().top-400;
    // var scroll4 = $(".section4").scrollTop();
    console.log(scroll1+" "+scroll2+" "+scroll3);
    var lastSectionCount=0;
    var sectionCount=0;

    var scrollPos = $(window).scrollTop();
    var footerTop = $("#container").height()-$('footer').height();

    var globeIn=false;
    // if (scrollPos<scroll1){
    //     globeIn=true;
    // } else {
    //     globeIn=false;
    // }
    console.log("globeIn: "+globeIn);
    // var allowBtnHide=false;
    $(document).scroll(function() {
        var newScroll = $(window).scrollTop();
        // console.log('allowBtnHide: '+allowBtnHide+' downloadBtn: '+downloadBtn);
        //download menu button

                // console.log($('header .developers').css('marginRight'));
        
        //fade in side-menu
        if (newScroll<scroll1){
            // if (globeIn==false){
                $("#side-menu").fadeOut('slow');
            // }
            globeIn=true;
        } else if (newScroll>=scroll1){
            // if (globeIn){
                $("#side-menu").fadeIn('slow');
            // }
            globeIn=false;
        }
        //detect side-menu rotation and section count
        if (newScroll<scroll1){
            degreeRotate =0;
            sectionCount=0;
        } else if (newScroll>=scroll1 && newScroll<scroll2){
            degreeRotate = -105;
            sectionCount=1;
         } else if (newScroll>=scroll2 && newScroll<scroll3){
            degreeRotate = -120;
            sectionCount=2;
        } else if (newScroll>=scroll3 ){
            degreeRotate = -135;
            sectionCount=3;
        // } else if (newScroll>=scroll4){
        //     degreeRotate= -150;
        //     sectionCount=4;
        }

        // stop side menu from scrolling past footer

        // if (sectionCount==4){
            var menuTop=$(window).scrollTop()-60;
            var menuBottom=menuTop+$('#side-menu').height();
            // console.log('menuTop: '+menuTop+'menuBottom: '+menuBottom+' footerTop: '+footerTop);
            if (menuBottom>=footerTop){
                $("#side-menu").css({"position": "absolute", "top": footerTop-$('#side-menu').height()});
            } else if (menuBottom<footerTop) {
                $("#side-menu").css({"position": "fixed", "top": "70px"});
            }
        // }
        
        // if in new section and not scrolling because of a sub-menu click, then update rotation
        if (menuRotate!=degreeRotate&&clicking==false){
            scrollPos = newScroll;
            menu_transform(menuRotate, degreeRotate);
            menuRotate = degreeRotate;
        }
        // if in a new section, update the active icon
        if (lastSectionCount!=sectionCount){
            // if (lastSectionCount!=0){
                $("#menu"+lastSectionCount+" .active").fadeOut('slow', function(){
                if (clicking==false){
                    if (sectionCount!=4){
                        $("#menu"+sectionCount+" .active").fadeIn('slow');
                    }
                }
                });
                console.log("last section: "+lastSectionCount+" section: "+sectionCount+" clicking: "+clicking);
            // } else {
            //     if (clicking==false){
            //         if (sectionCount!=4){
            //             $("#menu"+sectionCount+" .active").fadeIn('slow');
            //         }
            //     }
            // }
         
        lastSectionCount=sectionCount;
        }
    });
});

function clickChange(clickRotate, scrollTo, menuShow){
    clicking=true;
    degreeRotate=clickRotate;
    console.log(clickRotate+" "+scrollTo+" "+menuShow);
    menu_transform(menuRotate, degreeRotate);
    $('html, body').animate({
        scrollTop: $(scrollTo).offset().top-80
    }, 1000, function(){
        clicking=false;
    });
    menuRotate = degreeRotate;
    if (clickRotate!=0){
        $(menuShow+" .active").css('display', 'block');
    }
}


$.fn.animateRotate = function(oAngle, nAngle, duration, easing, complete) {
    var args = $.speed(duration, easing, complete);
    var step = args.step;
    return this.each(function(i, e) {
        args.complete = $.proxy(args.complete, e);
        args.step = function(now) {
            $.style(e, 'transform', 'rotate(' + now + 'deg)');
            if (step) return step.apply(e, arguments);
        };

        $({deg: oAngle}).animate({deg: nAngle}, args);
    });
};

// Handle automatic output of multiple vendor tags for css3 transforms
function menu_transform(oTransValue, nTransValue)
{
    $('#side-menu').animateRotate(oTransValue, nTransValue, 1000, "linear", function(){
       
    });
    $('.menu-item').animateRotate(-(oTransValue), -(nTransValue), 1000, "linear", function(){
           // console.log(this); 
    });
}
