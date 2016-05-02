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
