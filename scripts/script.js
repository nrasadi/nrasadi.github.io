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
  var burger = document.getElementById("burger");
  if (window.innerWidth >= 650){
    mainnav.className = "topnav";
    burger.className = '';
  }
  else if (!mainnav.className.includes("responsive")){
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


// document.getElementsByClassName("tablink")[0].click();

function openContactTab(evt, tabName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("contactTab");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  // tablinks = document.getElementsByClassName("tablink");
  // console.log(tablinks);
  // for (i = 0; i < x.length; i++) {
  //   tablinks[i].classList.remove("w3-green");
  // }
  document.getElementById(tabName).style.display = "block";
  // evt.currentTarget.classList.add("w3-green");
}

// var modal = document.getElementById('contact-modal');
// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   var kevent = event.target
//   console.log(event.target);
//   // console.log("SALAM");
//   if (event.target == modal) {
//     alert("HEY")
//     modal.style.display = "none";
//   }
// }

window.addEventListener("DOMContentLoaded", function() {

  // get the form elements defined in your form HTML above

  var form = document.getElementById("my-form");
  var button = document.getElementById("my-form-button");
  var status = document.getElementById("my-form-status");

  // Success and Error functions for after the form is submitted

  function success() {
    form.reset();
    button.style = "display: none ";
    status.innerHTML = "Your message has been sent. Thank you!";
  }

  function error() {
    status.innerHTML = "Sorry! There was a problem with sending your message. Please try again later.";
  }

  // handle the form submission event

  form.addEventListener("submit", function(ev) {
    ev.preventDefault();
    var data = new FormData(form);
    ajax(form.method, form.action, data, success, error);
  });
});

// helper function for sending an AJAX request

function ajax(method, url, data, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    if (xhr.status === 200) {
      success(xhr.response, xhr.responseType);
    } else {
      error(xhr.status, xhr.response, xhr.responseType);
    }
  };
  xhr.send(data);
}
