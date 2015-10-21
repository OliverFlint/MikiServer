$('div.navbar-collapse ul').addClass('nav navbar-nav');
$('ul.navbar-nav li:has(ul)').addClass('dropdown');
$('ul.navbar-nav li:has(ul)').children('a').addClass('dropdown-toggle').attr('data-toggle', 'dropdown').attr('role', 'button');
$('ul.navbar-nav li:has(ul)').children('a').append(' <span class="glyphicon glyphicon-triangle-bottom"></span>');
$('li.dropdown ul').addClass('dropdown-menu');
$('.dropdown-toggle').dropdown();
