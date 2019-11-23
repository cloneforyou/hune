

var ias = $.ias({
  container: ".links",
  item: ".link-list__link",
  pagination: ".load-more",
  next: ".more" 
});
function menuToggle() {
$('#menu-toggle').toggleClass('open');
$('#nav-mobile').toggleClass('d-none');
// $('body').toggleClass('no-scroll'); 
$('.header__nav--main').toggle( );
// $('.jsless-switchery').toggle( );
// $(".header__logo").parent().css({position: 'absolute'});
 $('.header__nav--main').toggleClass('huhu' );
}
// function ss() {
// if (navigator.share) { 
//      navigator.share({
//         title: 'WebShare API Demo',
//         url: '{{ .Params.link }}'
//       }).then(() => {
//         console.log('Thanks for sharing!');
//       })
//       .catch(console.error);
//       } else {
//           shareDialog.classList.add('is-open');
//       }
// }
$('#menu-toggle, #nav-mobile').click(function () {
menuToggle();
});
// $('.bt').click(function () {
// $(".bookmark").toggle();

// });
$(window).scroll(function() {     
var scroll = $(window).scrollTop();
if (scroll > 0) {
    $(".header").addClass("shadow");
}
else {
    $(".header").removeClass("shadow");
}
}); 
function darkColor() {
return "#282828" ; 
}
function lightColor() {
return "#D2E1FF" ;
}
function changeThemeColordark() {
var metaThemeColor = document.querySelector("meta[name=theme-color]");
metaThemeColor.setAttribute("content", darkColor());
}
function changeThemeColorlight() {
var metaThemeColor = document.querySelector("meta[name=theme-color]");
metaThemeColor.setAttribute("content", lightColor());
}
function darkmode(){
$('body').addClass('dark-mode');
localStorage.setItem("mode", "dark");
$( "#switch" ).prop( "checked", true );
$('.link-list__link').css("background-color","rgba(46, 45, 45, 0.8)"),
changeThemeColordark();
}
function nodark(){
    $('body').removeClass('dark-mode');
    $('.link-list__link').css("background-color","rgb(243, 242, 242)"),
    localStorage.setItem("mode", "light");
    changeThemeColorlight();
    }
if(localStorage.getItem("mode")=="dark")

 
    darkmode();
else

nodark();
$('#switch').change(function(){   
if ($(this).prop('checked'))
{
    darkmode();

}
else
{
    nodark();

}
});



ias.extension(new IASNoneLeftExtension({text: '&#8226;'}));
ias.extension(new IASSpinnerExtension({ src: '/img/darkspinner.svg', }));


window.onload = function() {randomColor();}
window.onclick = function() {randomColor();}
setInterval(function(){randomColor();},3000) 

function randomColor(){
var randNumber = Math.random() * 11111111;
var randHex = parseInt(randNumber).toString(16);
var randColor = "#" + randHex;
$('.header__logo, .cs').css('background-color', randColor);
$('.active').css('color', randColor);
$(".link-list__link").mouseover(function() {
$(this).css("background-color", randColor);
}).mouseout(function() {
if(localStorage.getItem("mode")=="dark")

$(this).css("background-color","rgba(46, 45, 45, 0.8)");
else
$(this).css("background-color","rgb(243, 242, 242)");
});  
}
$('.link-list__link').mouseover(function() {
$(this).find('.share-icon, .bookmark-icon').show()
}).mouseout(function() { 
    $('.share-icon, .bookmark-icon').hide();
});
$('.share-icon').click(function() {

    $(this).closest('.share-box').find('.link-title,.btm').hide();
    $(this).closest('.share-box').find('.share-icons').fadeIn();
    
});

$( ".share-box" ).mouseleave(function() {
$('.share-icons').hide();

$('.link-title,.btm').show();
});

$(function() {
  
  // Dropdown toggle
  $('.dropdown-toggle').click(function(){
    $(this).next('.dropdown').toggle();
  });
  
  $(document).click(function(e) {
    var target = e.target;
    if (!$(target).is('.dropdown-toggle') && !$(target).parents().is('.dropdown-toggle')) {
      $('.dropdown').hide();
    }
  });
  
  });