// Nav
$(document).ready(function(){
  $('div.navbar-collapse ul').addClass('nav navbar-nav');
  $('ul.navbar-nav li:has(ul)').addClass('dropdown');
  $('ul.navbar-nav li:has(ul)').children('a').addClass('dropdown-toggle').attr('data-toggle', 'dropdown').attr('role', 'button');
  $('ul.navbar-nav li:has(ul)').children('a').append(' <span class="glyphicon glyphicon-triangle-bottom"></span>');
  $('li.dropdown ul').addClass('dropdown-menu');
  $('.dropdown-toggle').dropdown();

  // Add bootstap styles to markdown tables
  $('#md_container table').addClass('table table-bordered table-hover');

  // plant uml support
  $('code.lang-plantuml').each(function(index, element) {
    var uml = $(element).text();
    var deflated = deflate(uml);
    $(element).html('<img class="plantuml" src="http://www.plantuml.com/plantuml/img/' + encode64(deflated) + '" />');
  });

  // flowchart.js support
  $('code.lang-flow').each(function(index, element) {
    var uml = $(element).text();
    $(element).text('');
    var dg = flowchart.parse(uml);
    dg.drawSVG(element);
  });

  // tabs
  $('ul.nav-tabs a').click(function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

  // editor
  $('#editor textarea').keyup(function(){
    $('#md_container').html(marked(this.value));
    $('#md_container table').addClass('table table-bordered table-hover');
  });
  $('#editor textarea').trigger('keyup');
  $('#editor textarea').css({ height: $('#navigation').innerHeight() });
});
