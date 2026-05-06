(function ($) {
    "use strict";

    // Handle install and activate plugins button click
    $("#install-activate-button").on("click", function (e) {
        e.preventDefault();
        var button = $(this);
        button.attr("disabled", "disabled");
        button.text("Installing & Activating recommended plugins").addClass("processing-spinner");

        var activationData = {
            action: "farm_cultivation_install_and_activate_plugins",
            nonce: farm_cultivation_localize.nonce,
        };

        $.post(farm_cultivation_localize.ajax_url, activationData, function (response) {
            console.log("asdasd", response);
            if (response.success) {
                // Hide the install button
                button.text("Installation Complete!").removeClass("processing-spinner");
                button.fadeOut(400, function() {
                    // Show the View Site and Customize/Site Editor buttons with !important override
                    $("#view-site-button").attr("style", "display: inline-flex !important;").hide().fadeIn();
                    $(".button-customize").attr("style", "display: inline-flex !important;").hide().fadeIn();
                });
            } else {
                button.text(response.data.message);
            }
        });
    });

    // Handle notice dismiss button click
    $(document).on('click', '.notice-info .notice-dismiss', function () {
        var type = $(this).closest('.notice-info').data('notice');

        $.ajax({
            type: 'POST',
            url: farm_cultivation_localize.ajax_url,
            data: {
                action: 'farm_cultivation_dismissed_notice_handler',
                type: type,
                wpnonce: farm_cultivation_localize.dismiss_nonce
            },
            success: function (response) {
                if (response.success) {
                    console.log("Notice dismissed successfully");
                } else {
                    console.log("Failed to dismiss notice");
                }
            }
        });
    });

})(jQuery);
