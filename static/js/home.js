var $root = $('html, body');
$('a').click(function() {
    var href = $.attr(this, 'href');
    $root.animate({
        scrollTop: $(href).offset().top
    }, 500, function () {
        window.location.hash = href;
    });
    return false;
});

// ;(function($){

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

// }(jQuery));