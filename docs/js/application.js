$(document).on('click', '.js-preview-switcher .js-view-mode', function(event){
  event.preventDefault();
  var $container = $(event.currentTarget).closest('.js-preview-switcher');
  $container.find('.js-view-mode').removeClass('is-selected');
  $(event.currentTarget).addClass('is-selected');
  $container.removeClass('grid light');
  $container.addClass($(event.currentTarget).attr('data-class'));
});

$(document).on('click', '.js-showoff-icon', function(event){
  var $icon = $(event.currentTarget).find('.mega-octicon').fadeOut(200, function(){
    var $iconList = $('.js-icon-list [data-name]:not([data-name*=logo])');
    var newIcon = $iconList.eq(Math.floor(Math.random() * $iconList.length)).attr('data-name');
    $(event.currentTarget).find('.mega-octicon').attr('class', "mega-octicon " + newIcon);
    $icon.fadeIn(200);
  });
});

$(document).on('keyup', '.js-search-field', function(event){
  var filter = $(this).val().toLowerCase();
  var $container = $(this).closest('.js-search');
  var $resultsList = $container.find('.js-results');

  if (filter.length === 0) return (function() {
    $resultsList.removeClass('no-results is-showing');
    $('body').removeClass('menu-active');
  })();

  $resultsList.find('.js-search-result').addClass('is-hidden');
  var $show = $resultsList.find('.js-search-result').filter(function(index){
    if($(this).attr('data-keywords').indexOf(filter) >= 0){ return true; }
    if($(this).attr('data-name').indexOf(filter) >= 0){ return true; }
    return false;
  }).removeClass('is-hidden');

  if ($show.length > 0) {
    $resultsList.addClass('is-showing');
    $('body').addClass('menu-active');
  }
  $resultsList.toggleClass('no-results', $show.length === 0);
});

$(document).on('click', '.js-modal-backdrop', function(event){
  $('body').removeClass('menu-active');
  $('.js-results').removeClass('no-results is-showing');
});

$(document).ready(function(){
  var data = JSON.parse(localStorage.getItem('octicons.github.com'));
  if ($('body').hasClass('index')){
    if(data && data.copyMode){
      enableZC(".js-zc-conditional");
    }
    var status = (data && data.copyMode) ? "enabled" : "disabled" ;
    var action = (data && data.copyMode) ? "off, run copyMode(false)" : "on, run copyMode()" ;
    console.log("Copy Mode is currently " + status + ". When enabled, the icons on this page become click-to-copy links.");
    console.log("Note, while Copy Mode is enabled, you must use the search to navigate to icon profiles.");
    console.log("To turn Copy Mode " + action + " in this console;");
    $('.js-autofocus').focus()
    return;
  }
  enableZC(".js-zc");
});

function enableZC(css){
  ZeroClipboard.config({ moviePath: "/swf/ZeroClipboard.swf"});
  var $el = $(css);
  var zc = new ZeroClipboard($el);
  zc.on("load", function(zc){

    zc.on("mouseover", function(zc, args){
      $("#global-zeroclipboard-html-bridge").addClass("tooltipped tooltipped-n");
      ariaLabel = $el.attr('aria-label');
      $bridge = $("#global-zeroclipboard-html-bridge").attr('aria-label', ariaLabel || 'Copy to clipboard.');
    });

    zc.on("mouseout", function(zc, args){
      $("#global-zeroclipboard-html-bridge").removeClass("tooltipped tooltipped-n");
    });

    zc.on("complete", function(zc, args){
      $bridge = $("#global-zeroclipboard-html-bridge").attr('aria-label', 'Copied!');
    });

  });

  $(document).on('click', css, function(event){ event.preventDefault(); });
}

function copyMode(toggle) {
  if (toggle === undefined) toggle = true;
  enableZC(".js-zc-conditional");
  var data = { copyMode: toggle };
  localStorage.setItem('octicons.github.com', JSON.stringify(data));
  var status = (data.copyMode) ? "enabled" : "disabled" ;
  var notStatus = (data.copyMode) ? "disable" : "enable" ;
  console.log("Copy mode has been " + status + ". To " + notStatus + ", run `copyMode(" + !data.copyMode + ")` in the console.");
}
