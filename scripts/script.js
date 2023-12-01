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
  if (x.className === "topnav") {
   x.className += " responsive";
   mainContent.style.marginTop = '280px';
  } else {
   x.className = "topnav";
   mainContent.style.marginTop = '100px';
  }
}

function windowSizeChanged() {
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

  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
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

function openContactTab(evt, tabName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("contactTab");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  document.getElementById(tabName).style.display = "block";
}

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

function toggleAbstract(id, btn_id) {
  var x = document.getElementById(id);
  var btn = document.getElementById(btn_id);
  if (btn.className.indexOf("fa-caret-square-up") == -1) {
    btn.className = btn.className.replace("fa-caret-square-down", "fa-caret-square-up");
  } else {
    btn.className = btn.className.replace("fa-caret-square-up", "fa-caret-square-down");
  }
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else {
    x.className = x.className.replace(" w3-show", "");
  }
}

function copyData(data) {navigator.clipboard.writeText(data);}

function notification(msg) {
  // Create notification element
  var notificationElement = document.createElement("div");
  notificationElement.classList.add("notification");
  notificationElement.textContent = msg;

  // Add notification element to the body
  document.body.appendChild(notificationElement);

  // Remove notification after 3 seconds
  setTimeout(function() {
    notificationElement.remove();
  }, 3000);
}