let url = "file:///D:/RELATED2UNI/CV/GithubWebsite/myWebsite/"

function gotopage(elem) {
  var link = document.getElementById(elem);
  link.setAttribute('href', url+elem+'.html');
}
