let url = "file:///D:/RELATED2UNI/CV/GithubWebsite/myWebsite/"

function gotopage(elem) {
  var link = document.getElementById(elem);
  link.setAttribute('href', url+elem+'.html');
}

function burgerTopNav() {
  var x = document.getElementById("main-topnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

function burgermenu() {
  var x = document.getElementById("main-topnav");
  var mainContent = document.getElementById("main-content");
  // var mainContent = document.getElementsByClassName('homepage-content');
  if (x.className === "topnav") {
   x.className += " responsive";
   mainContent.style.marginTop = '280px';
  } else {
   x.className = "topnav";
   mainContent.style.marginTop = '100px';
  }
}

function windowSizeChanged() {
  // alert(window.innerWidth);
  var mainContent = document.getElementById("main-content");
  var mainnav = document.getElementById("main-topnav");
  if (window.innerWidth >= 650){
    mainnav.className = "topnav";
  }
  if (!mainnav.className.includes("responsive")){
    mainContent.style.marginTop = '80px';
  }
}

function toTop() {

  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

$(document).ready(function(){
	$('#burger').click(function(){
		$(this).toggleClass('open');
	});
});
