// Achilles Acme Transitions class v1.1 Beta
// Copyright(c) 2012 Todd Thomson, Achilles Software
// License: MIT (http://www.opensource.org/licenses/mit-license.php)
//
// Tested with dependent libraries:
//
//  jQuery.js 1.7.1
//  jQuery Mobile version 1.1.0

(function (window, $, undefined) {
    var acme = window.acme || {};

    transitions = {

        version: "1.1 Beta",

        slide: function (name, reverse, $to, $from) {
            var deferred = new $.Deferred()

		    animateToClasses = reverse ? ' slide in reverse' : ' slide in',
		    animateFromClasses = reverse ? ' slide out reverse' : ' slide out',

            maxTransitionOverride = $.mobile.maxTransitionWidth !== false && $(window).width() > $.mobile.maxTransitionWidth,
			none = !$.support.cssTransitions || maxTransitionOverride || !name || name === "none",

			startAnimation = function () {

			    if ($from) {
			        $from.addClass(animateFromClasses);
			    }
                
			    $to.css({ display: 'block', top: '', bottom: '' });

			    $to.addClass(animateToClasses);
			    $to.animationComplete(endAnimation);
			},

			endAnimation = function () {

			    if ($from) {
			        $from
					    .removeClass($.mobile.activePageClass + " out in reverse " + name)
			            .css({ top: '-10000px', bottom: '10000px' });
			    }

			    $to
					.removeClass("out in reverse " + name)
					.css({ display: '', top: '', bottom: '' });

			    // transition complete. Set active page class and focus
			    $to.addClass($.mobile.activePageClass);
			    $.mobile.focusPage($to);

			    deferred.resolve(name, reverse, $to, $from, true);
			};

            self = this;

            if (!none) {
                setTimeout(function () {
                    self.startAnimation();
                }, 0);
            }
            else {
                endAnimation();
            }

            return deferred.promise();
        }
    }

    acme.transitions = transitions;

    if (!window.acme) {
        window.acme = acme;
    }
})(window, jQuery);
