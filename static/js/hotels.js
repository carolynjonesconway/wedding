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
