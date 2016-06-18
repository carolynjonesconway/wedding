"use strict";
function flash(msg, settings) {
    if (!msg) { return }
    settings = settings || {};
    if (settings.type === "info") { settings.type = "information"; }
    notySettings = {
        text        : msg,
        type        : settings.type || "information",
        layout      : 'bottomCenter',
        theme       : "bootstrapTheme" || "relax",
        template: '<div class="noty_message"><div class="noty_close"></div><span class="noty_text"></span></div>',
        timeout: settings.timeout != undefined ? settings.timeout : 6000,
        closeWith: ["click", "button"],
        animation: {
            open: 'animated bounceInLeft', // Animate.css class names
            close: 'animated bounceOutLeft' // Animate.css class names
        }
    }
    notySettings = $.extend(true, notySettings, settings);
    return noty(notySettings);
}
"use strict";
;(function($){
    // Equalize the panel heights
    var panels = $("#hotels .panel");
    $(window).on("load resize", function(evt){
        equalizeHeights(panels);
    });
    function equalizeHeights(collection) {
        var maxHeight = collection.map(function(i, elem) {
            return $(elem).height();
        }).get();
        return collection.css("min-height", Math.max.apply(null, maxHeight));
    }
}(jQuery));
"use strict";

// Add smooth scrolling to all links inside a navbar
$(".navbar a").on('click', function(evt){

  // Make sure this.hash has a value before overriding default behavior
  if (this.hash) {

    // Prevent default anchor click behavior
    evt.preventDefault();

    // Store hash (#)
    var hash = this.hash;
    // Using jQuery's animate() method to add smooth page scroll
    // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area (the speed of the animation)
    $('html, body').animate({
      scrollTop: $(hash).offset().top
    }, 800, function(){
      // Add hash (#) to URL when done scrolling (default click behavior)
      window.location.hash = hash;
    });
  } // End if statement
});
