var kpiob12_sid = '', UserIP = null, ipInfo = null, intelligent_solutions = 0, intro = 0, modules = 0, gallery = 0, about_us = 0, req_demo = 0;
var date = new Date();
var date1 = (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getFullYear();
var hours = date.getHours();
var minutes = date.getMinutes();
var ampm = hours >= 12 ? 'pm' : 'am';
hours = hours % 12;
hours = hours ? hours : 12; // the hour '0' should be '12'
minutes = minutes < 10 ? '0' + minutes : minutes;
var strTime = date1 + ' - ' + hours + ':' + minutes + ' ' + ampm;
var cTimeZone = date.toString().split('(');
cTimeZone = cTimeZone[1].toString().split(')');
cTimeZone = cTimeZone[0];
$(document).ready(function () {

  $(".close").click(function () {
    if ($(".modal").hasClass("fade")) {
      document.getElementById('video_tag').pause();
    } else {
      // document.getElementById('video_tag').play();
    }
  });

  $("body").click(function () {
    if ($(".modal").hasClass("fade")) {
      document.getElementById('video_tag').pause();
    } else {
      // document.getElementById('video_tag').play();
    }
  });


  document.onkeydown = function (evt) {
    if (evt.key == 'Escape') {
      document.getElementById('video_tag').pause();
    } else {
      // document.getElementById('video_tag').play();
    }
  };


  $(".quick-links span, button.demo-btn").click(function () {
    var scrollTo = $(this).attr('data-scroll')
    $('html,body').animate({
      scrollTop: $('#' + scrollTo).offset().top - 100
    },
      'slow');
    cookieSetter(scrollTo);
  });
  $("ul.navbar-nav li").click(function () {
    if ($("#mySidenav")) {
      closeNav();
    }
    var scrollTo = $(this).find('a').attr('data-link');
    $('html,body').animate({
      scrollTop: $('#' + scrollTo).offset().top - 100
    },
      'slow');
    cookieSetter(scrollTo);

  });

  $num = $('.my-card').length;
  $even = $num / 2;
  $odd = ($num + 1) / 2;

  if ($num % 2 == 0) {
    $('.my-card:nth-child(' + $even + ')').addClass('active');
    $('.my-card:nth-child(' + $even + ')').prev().addClass('prev');
    $('.my-card:nth-child(' + $even + ')').next().addClass('next');
  } else {
    $('.my-card:nth-child(' + $odd + ')').addClass('active');
    $('.my-card:nth-child(' + $odd + ')').prev().addClass('prev');
    $('.my-card:nth-child(' + $odd + ')').next().addClass('next');
  }





  var v = document.cookie.match('(^|;) ?kpiob12.sid=([^;]*)(;|$)');
  (v && v[2]) ? kpiob12_sid = v[2] : '';
  // $.getJSON('http://ip-api.com/json', function (data) {
  //   UserIP = data.query;
  //   data.time = strTime;
  //   data.cTimeZone = cTimeZone;
  //   ipInfo = data;
  //   data.piob12og9 = kpiob12_sid;
  //   console.log(data)
  //   // $.post("/visit",data, function(data){
  //   //     document.cookie = "kpiob12.sid=" + data;
  //   //   });
  // });
});
$('body').on('focus', '.contact-us-form .form-control', function () {
  $(this).removeClass('error');
})
$('body').on('click', '.close-msg', function () {
  $('#req-demo p.section-head').removeClass('res');
  $('#req-demo p.section-head').html('or leave us a message');
})
$('body').on('click', '#sidenavClose', function () {
  closeNav();
})
$('body').on('click', '.sidenavOpen', function () {
  openNav();

})
function initMap() {
  var myLatLng = { lat: 37.09024, lng: -95.712891 };
  map = new google.maps.Map(document.getElementById('site-map'), {
    center: myLatLng,
    zoom: 5,
    minZoom: 2,
    mapTypeControl: false,
    disableDefaultUI: true
  });
}
var viewportTop = $(window).scrollTop();
var viewportBottom = $(window).height();

$.fn.isInViewport = function () {
  var elementTop = $(this).offset().top + 300;
  var elementBottom = elementTop + $(this).outerHeight();

  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();
  return elementBottom > viewportTop && elementTop < viewportBottom;
};
function offSetManager() {

  var yOffset = 600;
  var currYOffSet = window.pageYOffset;
  if (yOffset < currYOffSet) {
    // myNavBar.add();
    $('#navbar').removeClass('absolute-top')
    $('#navbar').addClass('fixed-top')
    $('#nav2').removeClass('ml-auto')
    $('#nav1').addClass('ml-auto')
    $('#nav2 a').removeClass('d-none')
    $('#navigation #navbarNav').removeClass('show')
    $('#navbar .navbar-brand img.main-logo').attr('src', 'assets/images/monogram.png')
    $('#navbar .navbar-brand img.toggle-menu-mobile').attr('src', 'assets/images/toggle-menu-dark.png')

  }
  else {
    // myNavBar.remove();
    $('#navbar').removeClass('fixed-top')
    $('#navbar').addClass('absolute-top')
    $('#nav2').addClass('ml-auto')
    $('#nav1').removeClass('ml-auto')
    $('#nav2 a').addClass('d-none')
    $('#nav2 ul:first a').addClass('d-none')
    $('#navbar .navbar-brand img.main-logo').attr('src', 'assets/images/OSINT-logo-round(L)---dark.png')
    $('#navbar .navbar-brand img.toggle-menu-mobile').attr('src', 'assets/images/toggle-menu.png')
  }
}

/**
* bind to the document scroll detection
*/
window.onscroll = function (e) {
  offSetManager();
}
setTimeout(() => {
  AOS.init({
    duration: 1000,
  });
}, 2000);

/**
* We have to do a first detectation of offset because the page
* could be load with scroll down set.
*/
offSetManager();
viewPortManager();
$(window).resize(function () {
  viewPortManager();
});
function viewPortManager() {
  // This will execute whenever the window is resized
  var height = $(window).height(); // New height
  var width = $(window).width(); // New width
  if (width < 1025) {
    $('#gallery-js').attr('data-flickity-options', '{ "wrapAround": true,"contain": true, "prevNextButtons": false, "pageDots": true, "draggable": true,"autoPlay": true}')
  } else {
    $('#gallery-js').attr('data-flickity-options', '{ "wrapAround": true,"contain": true, "prevNextButtons": false, "pageDots": false, "draggable": false,"autoPlay": false}')
  }
}
function cookieSetter(data) {
  if (data == 'intelligent-solutions')
    intelligent_solutions += 1;
  else if (data == 'intro')
    intro += 1;
  else if (data == 'modules')
    modules += 1;
  else if (data == 'gallery')
    gallery += 1;
  else if (data == 'about-us')
    about_us += 1;
  else
    req_demo += 1;
  var v = document.cookie.match('(^|;) ?' + UserIP + '=([^;]*)(;|$)');
  // return v ? v[2] : null;
  if (v && v[2]) {
    var cookieData = JSON.parse(v[2]);
    cookieData.intelligent_solutions = cookieData.intelligent_solutions + intelligent_solutions;
    cookieData.intro = cookieData.intro + intro;
    cookieData.modules = cookieData.modules + modules;
    cookieData.gallery = cookieData.gallery + gallery;
    cookieData.about_us = cookieData.about_us + about_us;
    cookieData.req_demo = cookieData.req_demo + req_demo;
    document.cookie = UserIP + "=" + JSON.stringify(cookieData);
  } else {
    var cookieData = {};
    cookieData.intelligent_solutions = intelligent_solutions;
    cookieData.intro = intro;
    cookieData.modules = modules;
    cookieData.gallery = gallery;
    cookieData.about_us = about_us;
    cookieData.req_demo = req_demo;
    document.cookie = UserIP + "=" + JSON.stringify(cookieData);
  }

}

$(window).on("beforeunload", function () {
  var v = document.cookie.match('(^|;) ?kpiob12.sid=([^;]*)(;|$)');
  (v && v[2]) ? kpiob12_sid = v[2] : '';
  ipInfo.piob12og9 = kpiob12_sid;
  var cookieData = {
    "intelligent_solutions": intelligent_solutions,
    "intro": intro,
    "modules": modules,
    "gallery": gallery,
    "about_us": about_us,
    "req_demo": req_demo,
    "date": new Date()
  };
  var data = {
    "piob12og9": kpiob12_sid,
    "userIP": UserIP,
    "ipInfo": ipInfo,
    "activity": cookieData
  }
  // $.post("/navigation", data, function (data) { });
})

