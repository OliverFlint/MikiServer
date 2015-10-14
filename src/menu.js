var fs = require('fs');
var path = require('path');

var Menu = function() {
  var folderCount = 0
  var walk = function(dir, url, level) {
    var tempHtml = "";
    var files = fs.readdirSync(dir);
    files.forEach(function(file) {
      var f = path.resolve(dir, file);
      var stat = fs.statSync(f);
      if (stat && stat.isDirectory()) {
        folderCount++;
        if(level==0){
          tempHtml = tempHtml + "<li class='dropdown'><a href='#' data-toggle='dropdown' data-submenu>" + file + "<span class='caret'></span></a><ul class='dropdown-menu' id='menu" + folderCount + "'>";
        } else {
          tempHtml = tempHtml + "<li class='dropdown-submenu'><a href='#'>" + file + "</a><ul class='dropdown-menu' id='menu" + folderCount + "'>";
        }
        tempHtml = tempHtml + walk(f, url + file + "/", folderCount);
        tempHtml = tempHtml + "</ul></li>"
      } else {
        tempHtml = tempHtml + "<li><a href='" + url + file.replace(".md", "") + "'>" + file.replace(".md", "") + "</a></li>";
      }
    });
    return tempHtml;
  }
  var menuHtml = "<nav class='navbar navbar-inverse'><div class='navbar-header'></div><div><ul class='nav navbar-nav'><li class='active'><a href='/'>Home</a></li>";
  menuHtml = menuHtml + walk(mdRoot, "/page/", 0);
  menuHtml = menuHtml + "</ul></div></nav>";
  return menuHtml;
}

module.exports = Menu;
