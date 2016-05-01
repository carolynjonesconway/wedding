function flash(msg, type, duration) {
    if (!msg) { return }
    if (type === "info") { type = "information"; }
    var n = noty({
        text        : msg,
        type        : type || "information",
        layout      : 'topLeft',
        theme       : "bootstrapTheme" || "relax",
        timeout: duration || 5000,
        animation: {
            open: 'animated bounceInLeft', // Animate.css class names
            close: 'animated bounceOutLeft', // Animate.css class names
        }
    });
    return n;
}