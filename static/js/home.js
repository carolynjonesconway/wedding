// // ANCHOR TRANSITIONS
// ;(function(){
//     var $root = $('html, body'),
//         $anchor = $('a.anchor');
//     $anchor.click(function() {
//         var href = $.attr(this, 'href');
//         $root.animate({
//             scrollTop: $(href).offset().top
//         }, 500, function () {
//             window.location.hash = href;
//         });
//         return false;
//     });
// }());

// Countdown
flash(daysTo("October 9, 2016 00:00:00") + " days to go!", {timeout: false});
function daysTo(dateString) {
    var targ = new Date(dateString),
        now = new Date(),
        delta_ms = targ - now,
        delta_days = delta_ms/1000/60/60/24;
    return Math.ceil(delta_days);
}

var rsvp = (function(){
    var page = $('.page#rsvp'),
        carousel = page.find('.carousel'),
        inviteCodeSlide = page.find('#invite-code'),
        inviteCodeForm = inviteCodeSlide.find('form'),
        headCountSlide = page.find('#head-count'),
        rsvpInput = page.find('#attendance label'),
        INVITE_CODE;

    inviteCodeForm.on("submit", function(evt) {
        evt.preventDefault();
        validateInviteCode()
            .fail(renderErrors)
            .done(nextSlide);
    });

    rsvpInput.on("click", function(evt) {
        evt.preventDefault();
        var resp = $(this).find("input").val() == "1" ? true : false;
        $.ajax({
            url: "/rsvp/",
            method: "POST",
            data: {
                "inviteCode": INVITE_CODE,
                "attending": resp
            },
            success: function(r){
                console.log("Response:");
                console.log(r);
            }
        });
    });

    function validateInviteCode(){
        var d = $.Deferred(),
            code = inviteCodeForm.find("input[type='text']").val();

        if (code) {
            $.ajax({
                url: "/invite-code/",
                method: "POST",
                data: {
                    "code": code
                },
                success: function(data){
                    data = JSON.parse(data);
                    data.error ? d.reject(data) : d.resolve(data);
                    setCookie("conWedInvCode", code),
                    INVITE_CODE = code;
                }
            });
        } else {
            d.reject(data);
        }

        return d.promise();
    }

    function handleRSVP() {
        
    }

    // HELPER FUNCTIONS
    function nextSlide() {
        var current = page.find(".item.active").index();
        carousel.carousel(current + 1);
    }

    function renderErrors(data) {
        var errorMsg = "Oops! Something went wrong.";
        if (data.error == "Invalid Code") {
            errorMsg = "Oops! That's not a valid invite code.";
        }
        alert(errorMsg);
    }

    function setCookie(key, val, expDays) {
        var cookie = key + '=' + val;
        if (expDays) {
            var expDate = new Date();
            expDate.setTime(expDate.getTime() + (expDays * 24 * 60 * 60 * 1000));
            cookie = cookie + '; expires=' + expDate.toGMTString();
        };
        window.document.cookie = cookie;
    }
}());



// RSVP PAGE
;(function($){

    // VARIABLES
    var inviteCodePage = $('#rsvp #invite-code'),
        headCountPage = $('#rsvp #head-count'),
        submitInviteCode = $('#rsvp #invite-code [type="submit"]');

    // INITIALIZE
    headCountPage.hide();

    var inviteCodeForm = (function(){

        // VARIABLES
        var _form = inviteCodePage.find("form");

        // EVENT HANDLERS
        submitInviteCode.on("click", function(evt){
            evt.preventDefault();
            
            inviteCodePage.hide();
            headCountPage.show();
        });

    }());

    var headCountForm = (function(){

        // VARIABLES
        var _form = headCountPage.find("form"),
            inputsDiv = _form.find('input[type="text"]').first().parent(),
            addBtn = headCountPage.find('.add'),
            saveBtn = headCountPage.find('[type="submit"]'),
            field;

        // EVENT HANDLERS
        addBtn.on("click", addField);
        saveBtn.on("click", submitAttendees);

        function addField (evt) {
            evt.preventDefault();
            field = $('<input>', {type: "text"}).css("display", "block");
            inputsDiv.append(field);
        };

        function submitAttendees (evt) {
            evt.preventDefault();
            var names = inputsDiv.find('input').map(
                function(){
                    return $(this).val()
                }
            ).get();
            // FIXME
            console.log(names);
        };

        return {
            addField: addField
        }
    }());

}(jQuery));

// WEDDING PARTY
;(function($){

    var covers = $(".cover-left, .cover-right"),
        coverLeft = $(".cover-left"),
        coverRight = $(".cover-right");

    function open() {
        coverLeft.hide("slide", 400, {
            direction: "left"
        });
        coverRight.hide(400);
    }

    covers.on("click", function(evt){
        evt.preventDefault();
        open();
    });

}(jQuery));
