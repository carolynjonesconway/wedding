"use strict";

$('#gallery-carousel').carousel({
  interval: 5000
  , pause: 'hover'
  , wrap: true
});

$('.carousel .item').each(function(){
    var next = $(this);
    var last;
    for (var i=0;i<5;i++) {
        next=next.next();
        if (!next.length) {
            next = $(this).siblings(':first');
        }
        
        last=next.children(':first-child').clone().appendTo($(this));
    }
    last.addClass('rightest');
});