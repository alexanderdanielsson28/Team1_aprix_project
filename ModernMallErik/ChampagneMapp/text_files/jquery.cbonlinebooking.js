if (!Object.keys) {
    Object.keys = (function() {
        'use strict';
        var hasOwnProperty = Object.prototype.hasOwnProperty,
            hasDontEnumBug = !({
                toString: null
            }).propertyIsEnumerable('toString'),
            dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'],
            dontEnumsLength = dontEnums.length;
        return function(obj) {
            if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
                throw new TypeError('Object.keys called on non-object');
            }
            var result = [],
                prop, i;
            for (prop in obj) {
                if (hasOwnProperty.call(obj, prop)) {
                    result.push(prop);
                }
            }
            if (hasDontEnumBug) {
                for (i = 0; i < dontEnumsLength; i++) {
                    if (hasOwnProperty.call(obj, dontEnums[i])) {
                        result.push(dontEnums[i]);
                    }
                }
            }
            return result;
        };
    }());
}
(function($) {
    $.cbOnlineBookingLanguage = {
        L1: "Laddar... en sekund...",
        L2: "Plats",
        L3: "Välj plats",
        L4: "Tjänst",
        L5: "Välj tjänst",
        L6: "Utövare",
        L7: "Välj",
        L8: "Vald",
        L9: "ALLA",
        L10: "Vecka",
        L11: "mer info...",
        L12: "mindre info...",
        L13: "Inga bokningsbara tider",
        L14: "min",
        L15: "När du valt tjänst, kommer bokningsbara tider visas här.",
        L16: "Vem är du?",
        L17: "Bekräfta",
        L18: "Din bokning",
        L19: "Behandling",
        L20: "När",
        L21: "Var",
        L22: "Vi kunde inte slutföra din begäran... Kontrollera din internetuppkoppling och försök igen.",
        L23: "Är det inte du?",
        L24: "Klicka här",
        L25: "för att byta person.",
        L26: "Fortsätt",
        L27: "Gå vidare",
        L28: "Bekräfta",
        L29: "Avbryt",
        L30: "Den här rutan stängs automatiskt om",
        L31: "sekunder...",
        L32: "Ok",
        L33: "Mina bokningar",
        L34: "Avboka",
        L35: "Ring mottagningen om du vill ändra tid/bokning.",
        L36: "Är du säker?",
        L37: "Ja",
        L38: "Nej",
        L39: "Du har inte bokat några tider ännu.",
        L40: "Oooops...",
        L41: "Kan inte visa onlinebokning. Kontrollera din internetanslutning och försök igen.",
        L42: "Det har uppstått ett fel; antingen har din session blivit avslutad (du har varit borta från datorn mer än 20 minuter), eller så tillåter inte din webbläsare cookies. Slå på stöd för cookies, se till att du har avaktiverat programvara som kan störa cookies. Försök sedan ladda om sidan och boka ett besök på nytt. Om problemet kvarstår, kontakta mottagningen via mail eller telefon för att boka ett besök.",
        L43: "Din webbläsare stöds inte. Du behöver uppdatera till en nyare webbläsare.",
        L44: "Du är inloggad som",
        L45: "med",
        L46: "Boka behandling",
        L47: "Här kan du boka tid för en behandling på %, det går snabbt och är väldigt enkelt!",
        L48: "Kontakta mottagningen",
        L49: "Vill du skicka ett meddelande till mottagningen? Kanske du har en fråga eller vill bli behandlad här?",
        L50: "Ditt namn",
        L51: "Din epost",
        L52: "Ditt telefonnummer",
        L53: "Meddelande",
        L54: "Skicka förfrågan",
        L55: "Hitta till mottagningen",
        L56: "platser kvar"
    };
    var _serverURL = 'https://ww1.clinicbuddy.com/onlinebooking/',
        _dataURL = '';
    if (!window['GoogleAnalyticsObject']) {
        (function(i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r;
            i[r] = i[r] || function() {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date();
            a = s.createElement(o), m = s.getElementsByTagName(o)[0];
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m)
        })(window, document, 'script', '//www.google-analytics.com/analytics.js', '__gaTracker');
    }
    else {
        __gaTracker = window[window['GoogleAnalyticsObject']];
    }
    __gaTracker('create', 'UA-7241350-7', 'auto', {
        'name': 'cbTracker'
    });
    __gaTracker('cbTracker.send', 'pageview');

    function gaTrackEvent(tracker, category, action, label, value) {
        __gaTracker(tracker + '.send', 'event', category, action, label, value);
    };
    var Utils = {
        ajax: function(type, data, successCallback, errorCallback) {
            var settings = {
                type: type,
                url: _dataURL,
                xhrFields: {
                    withCredentials: true
                },
                data: data,
                dataType: 'json',
                cache: false,
                success: function(data, textStatus, jqXHR) {
                    if (successCallback !== undefined) {
                        successCallback(data);
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    if (errorCallback !== undefined) {
                        errorCallback();
                    }
                    var error = 'Error: ' + textStatus;
                    if (errorThrown && errorThrown != '') {
                        error += ' (' + errorThrown + ')';
                    }
                    var description = 'URL: ' + _dataURL + ', Data: ' + JSON.stringify(data) + ', User Agent: ' + navigator.userAgent + ', CORS: ' + $.support.cors;
                    gaTrackEvent('cbTracker', 'Ajax errors', error, description);
                },
                timeout: 10000
            };
            if (!$.support.cors) {
                settings['dataType'] = 'jsonp';
                settings['type'] = 'GET';
                delete settings['xhrFields'];
            }
            $.ajax(settings);
        },
        toAbsoluteURL: function(path) {
            return _serverURL + path;
        },
        isTrue: function(v) {
            if (v === true || v === "true") {
                return true;
            }
            return false;
        }
    };
    var CbOnlineBooking = function(options, element) {
        this.elements = {
            $element: $(element),
            $container: null,
            $content: null,
            $contentContainer: null,
            $loader: null,
            $loaderProgress: null,
            $filters: null,
            $filterLocationValue: null,
            $filterActivity: null,
            $filterActivityValue: null,
            $filterProvider: null,
            $filterProviderValue: null,
            $filtersData: null,
            $filterDataActivity: null,
            $filterDataProvider: null,
            $weekTimesContainer: null,
            $weekSelector: null,
            $timetable: null,
            $modal: null,
            $bookedTimesCount: null,
            $bookedTimes: null,
            $contactForm: null,
            $streetView: null,
            $footerMap: null
        };
        this.closeModalIntervalID = null;
        this.closeNotificationTopTimeoutID = null;
        this.model = {
            state: 0,
            initialized: false,
            loadingTimes: false,
            timesDisabled: false,
            bookedTimesRendered: false,
            defaults: {},
            weekOffset: 0,
            reception: {},
            user: {},
            userToken: '',
            settings: {},
            data: {},
            locations: {
                ids: [],
                add: function(id) {
                    this.ids.push(id);
                },
                remove: function(id) {
                    this.ids.splice($.inArray(id, this.ids), 1);
                }
            },
            activityGroup: 0,
            activity: 0,
            providers: {
                ids: [],
                add: function(id) {
                    this.ids.push(id);
                },
                remove: function(id) {
                    this.ids.splice($.inArray(id, this.ids), 1);
                }
            },
            selectedTime: {},
            expired: false
        };
        var settings = $.extend(true, CbOnlineBooking.defaults, options);
        _dataURL = _serverURL + settings.uid + '/_data/';
        this.model.defaults = settings.defaults;
        if (this.model.defaults.weekOffset != 0) {
            this.model.weekOffset = this.model.defaults.weekOffset;
        }
        this.model.params = settings.params;
        this.model.customization = settings.customization;
        this.model.appearance = settings.appearance;
        this.model.affiliate = settings.affiliate;
        this.model.embedded = settings.embedded;
        this.model.language = settings.language;
        this.model.redirect_uri = settings.redirect_uri;
        if (settings.gaTrackingId) {
            __gaTracker('create', settings.gaTrackingId, 'auto', {
                'name': 'clTracker',
                'allowLinker': true
            });
            __gaTracker('clTracker.send', 'pageview');
        }
        this.init();
        if ($('<div>').html('<!--[if lte IE 7]><i><![endif]-->').find('i').length == 1) {
            this.trackEvent('Unsupported browsers', navigator.userAgent);
            this.die($.cbOnlineBookingLanguage.L40, $.cbOnlineBookingLanguage.L43);
        }
        else {
            this.load();
        }
        return this;
    };
    CbOnlineBooking.defaults = {
        uid: '',
        params: {},
        customization: {},
        appearance: {
            sections: true,
            filters: {
                activity: {
                    duration: true,
                    groups: true
                }
            },
            timetable: {
                endTime: true,
                provider: true
            }
        },
        defaults: {
            locations: [],
            activityGroup: 'A',
            activity: 0,
            providers: ['A'],
            weekOffset: 0
        },
        affiliate: '',
        embedded: false,
        gaTrackingId: '',
        language: '',
        redirect_uri: ''
    };
    CbOnlineBooking.prototype.constructor = CbOnlineBooking;
    CbOnlineBooking.prototype.init = function() {
        var position = this.elements.$element.css('position');
        if (position !== 'absolute' && position !== 'relative') {
            this.elements.$element.css('position', 'relative');
        }
        this.elements.$container = $('<div class="cb-onlinebooking"' + (this.model.embedded ? '' : ' style="position:relative!important;"') + '></div>').appendTo(this.elements.$element);
        this.elements.$content = $('<div class="cb-content"></div>').appendTo(this.elements.$container);
        this.elements.$contentContainer = $('<div class="cb-book-treatment cb-container"></div>').appendTo(this.elements.$content);
    };
    CbOnlineBooking.prototype.renderLoader = function() {
        this.elements.$loader = $('<div class="cb-loader"><div class="cb-progress"><div class="cb-progress-bar"></div></div><div>' + $.cbOnlineBookingLanguage.L1 + '</div></div>').appendTo(this.elements.$container);
        this.elements.$loaderProgress = this.elements.$loader.find('.cb-progress-bar');
    };
    CbOnlineBooking.prototype.setLoaderState = function(state) {
        var width = 10;
        if (state == 1) {
            width = 30;
        }
        else if (state == 2) {
            width = 35;
        }
        else if (state == 3) {
            width = 60;
        }
        else if (state == 4) {
            width = 65;
        }
        else if (state == 5) {
            width = 70;
        }
        else if (state == 6) {
            width = 100;
        }
        this.elements.$loaderProgress.css('width', width + '%');
    };
    CbOnlineBooking.prototype.destroyLoader = function() {
        this.elements.$loader.remove();
        this.elements.$loader = null;
        this.elements.$loaderProgress = null;
    };
    CbOnlineBooking.prototype.load = function() {
        this.renderLoader();
        Utils.ajax('GET', {
            act: 'load',
            week: this.model.weekOffset,
            params: this.model.params,
            language: this.model.language
        }, $.proxy(this.onLoad, this), $.proxy(this.onLoadFailed, this));
    };
    CbOnlineBooking.prototype.onLoad = function(data) {
        if (data.hasOwnProperty('error')) {
            this.die(data.message, data.description);
            return;
        }
        data = $.extend(true, data, this.model.customization);
        this.model.customization = null;
        this.model.reception = data.reception;
        this.model.data = data.filters.data;
        this.model.user = data.user;
        this.model.settings = data.settings;
        this.setLoaderState(2);
        if (data.streetview.show == 1 && data.reception.lat != 0 && data.reception.lng != 0) {
            this.renderStreetView(data.reception);
        }
        if (data.header.show == 1) {
            this.renderHeader(data.header);
        }
        if (data.contact.show == 1 && data.settings.allow_contact) {
            this.renderContactUs();
        }
        if (data.footer.show == 1) {
            this.renderFooter(data.reception);
        }
        this.setLoaderState(3);
        if (data.timetable.show == 1) {
            this.elements.$weekTimesContainer = $('<div class="cb-week-times"><div class="cb-overlay"><div class="cb-progress-bar"></div></div><div class="cb-suggestion-bar"></div></div>').appendTo(this.elements.$contentContainer);
            this.elements.$weekTimesContainer.find('.cb-suggestion-bar').on('click', 'a', $.proxy(this.onSuggestionClick, this));
            this.renderWeekSelector();
            this.setLoaderState(4);
            this.renderTimetable(data.week.days.length);
            this.setLoaderState(5);
            this.renderFilters(data.filters);
            this.renderModal(data.signin, data.signup);
            if (this.model.user['signed_in'] == 2) {
                var src = Utils.toAbsoluteURL('img/user.png');
                if (this.model.user['photo'] != '') {
                    src = Utils.toAbsoluteURL(this.model.user['photo']);
                }
                this.elements.$modal.find('.cb-modal-body-signed-in-as').find('img').prop('src', src);
                this.elements.$modal.find('.cb-modal-body-signed-in-as').find('.cb-singed-in-name').text(this.model.user['name']);
            }
            if (!this.model.loadingTimes) {
                this.renderWeekData(data.week);
                this.disableWeekTimes();
                this.contentLoaded();
            }
        }
        else {
            this.contentLoaded();
        }
    };
    CbOnlineBooking.prototype.contentLoaded = function() {
        this.setLoaderState(6);
        this.elements.$container.append('<div class="cb-notification-bar"><div class="cb-notification"></div></div>');
        $(document).keydown($.proxy(this.onKeyDown, this));
        this.model.initialized = true;
        var that = this;
        window.setTimeout(function() {
            that.destroyLoader();
            that.elements.$content.show();
            if (that.elements.$timetable != null) {
                that.setNoAvailableTimesHeight();
            }
            if (typeof google === 'object' && typeof google.maps === 'object' && that.model.reception.lat != 0 && that.model.reception.lng != 0 && (that.elements.$streetView != null || that.elements.$footerMap != null)) {
                var position = new google.maps.LatLng(that.model.reception.lat, that.model.reception.lng);
                if (that.elements.$streetView != null) {
                    var streetViewService = new google.maps.StreetViewService();
                    streetViewService.getPanoramaByLocation(position, 50, function(data, status) {
                        if (status == google.maps.StreetViewStatus.OK) {
                            var panoramaOptions = {
                                position: position,
                                pov: {
                                    heading: that.model.reception.pov.heading,
                                    pitch: that.model.reception.pov.pitch,
                                    zoom: that.model.reception.pov.zoom
                                },
                                scrollwheel: false
                            };
                            var panorama = new google.maps.StreetViewPanorama(that.elements.$streetView[0], panoramaOptions);
                        }
                        else {
                            that.elements.$streetView.parent().remove();
                        }
                        that.elements.$streetView = null;
                    });
                }
                if (that.elements.$footerMap != null) {
                    var mapOptions = {
                        center: position,
                        scrollwheel: false,
                        zoom: 14
                    };
                    var map = new google.maps.Map(that.elements.$footerMap[0], mapOptions);
                    var marker = new google.maps.Marker({
                        animation: google.maps.Animation.DROP,
                        icon: '//mts.googleapis.com/vt/icon/name=icons/spotlight/spotlight-waypoint-blue.png',
                        map: map,
                        position: position,
                        title: that.model.reception.address
                    });
                    that.elements.$footerMap = null;
                }
            }
            else {
                that.elements.$content.find('.cb-street-view').remove();
                that.elements.$content.find('.cb-footer .cb-footer-map').remove();
            }
            that.elements.$content = null;
            that.elements.$contentContainer = null;
        }, 1000);
    };
    CbOnlineBooking.prototype.renderHeader = function(header) {
        var html = '<div class="cb-header" style="' + header.css + '"><div class="cb-container">';
        if (header.logo != '') {
            html += '<img class="cb-header-logo" src="' + header.logo + '" alt="" title="">';
        }
        if (header.name.text != '') {
            html += '<div class="cb-header-name" style="' + header.name.css + '">' + header.name.text + '</div>';
        }
        html += '</div></div>'
        $(html).prependTo(this.elements.$content);
    };
    CbOnlineBooking.prototype.renderStreetView = function() {
        var div = $('<div class="cb-street-view cb-container"><div class="cb-street-view-panorama"></div></div>').prependTo(this.elements.$content);
        this.elements.$streetView = div.find('.cb-street-view-panorama');
    };
    CbOnlineBooking.prototype.renderWeekSelector = function() {
        this.elements.$weekSelector = $('<div class="cb-week-selector">' + '<a href="#"><img src="' + Utils.toAbsoluteURL('img/arrow-left.png') + '" alt="" title=""></a>' + '<div class="cb-week-details">' + '<div class="cb-week-number">' + $.cbOnlineBookingLanguage.L10 + ' <span></span></div>' + '<div class="cb-week-name"></div>' + '</div>' + '<a href="#" class="cb-week-next"><img src="' + Utils.toAbsoluteURL('img/arrow-right.png') + '" alt="" title=""></a>' + '</div>').appendTo(this.elements.$weekTimesContainer);
        this.elements.$weekSelector.on('click', 'a', $.proxy(this.onChangeWeek, this));
    };
    CbOnlineBooking.prototype.renderTimetable = function(days) {
        var html = '<div class="cb-times"><div class="cb-table">';
        for (var i = 0; i < days; i++) {
            html += '<div class="cb-col">' + '<div class="cb-col-head">' + '<div class="cb-day"></div>' + '<div class="cb-day-name">' + '<span></span>' + '<div class="cb-day-month"></div>' + '</div>' + '</div>' + '<div class="cb-col-body"></div>' + '</div>';
        }
        html += '</div></div>';
        var $element = $(html).appendTo(this.elements.$weekTimesContainer);
        this.elements.$timetable = $element.find('.cb-table');
        this.elements.$timetable.on('click', 'a.cb-available-time', $.proxy(this.onSelectTime, this));
    };
    CbOnlineBooking.prototype.renderContactUs = function() {
        var randomId = Math.floor(Math.random() * 1000 + 1);
        var html = '<div class="cb-contact-us">' + '<div class="cb-container">' +
            (Utils.isTrue(this.model.appearance.sections) ? '<div class="cb-section-header"><h2>' + $.cbOnlineBookingLanguage.L48 + '</h2><div>' + $.cbOnlineBookingLanguage.L49 + '</div></div>' : '') + '<div class="cb-contact-us-form">' + '<div class="cb-input-group">' + '<label class="cb-input-label" for="cb-contact-us-i' + randomId + '-name">' + $.cbOnlineBookingLanguage.L50 + '</label>' + '<input type="text" placeholder="' + $.cbOnlineBookingLanguage.L50 + '" class="cb-input-required" name="contact_name" id="cb-contact-us-i' + randomId + '-name">' + '</div>' + '<div class="cb-input-group">' + '<label class="cb-input-label" for="cb-contact-us-i' + randomId + '-email">' + $.cbOnlineBookingLanguage.L51 + '</label>' + '<input type="text" placeholder="' + $.cbOnlineBookingLanguage.L51 + '" class="cb-input-required" name="contact_email" id="cb-contact-us-i' + randomId + '-email">' + '</div>' + '<div class="cb-input-group">' + '<label class="cb-input-label" for="cb-contact-us-i' + randomId + '-phone">' + $.cbOnlineBookingLanguage.L52 + '</label>' + '<input type="text" placeholder="' + $.cbOnlineBookingLanguage.L52 + '" class="cb-input-required" name="contact_phone" id="cb-contact-us-i' + randomId + '-phone">' + '</div>' + '<div class="cb-input-group">' + '<label class="cb-input-label" for="cb-contact-us-i' + randomId + '-message">' + $.cbOnlineBookingLanguage.L53 + '</label>' + '<textarea placeholder="' + $.cbOnlineBookingLanguage.L53 + '" class="cb-input-required" name="contact_message" id="cb-contact-us-i' + randomId + '-message"></textarea>' + '</div>' + '<a href="#" class="cb-btn cb-btn-blue cb-contact-us-submit">' + $.cbOnlineBookingLanguage.L54 + '</a>' + '</div>' + '</div>' + '</div>';
        var div = $(html).appendTo(this.elements.$content);
        this.elements.$contactForm = div.find('.cb-contact-us-form');
        this.elements.$contactForm.find('.cb-contact-us-submit').click($.proxy(this.contactUs, this));
    };
    CbOnlineBooking.prototype.contactUs = function(e) {
        e.preventDefault();
        var filled = true;
        $(e.currentTarget).parent().find(':input.cb-input-required').each(function() {
            if ($(this).hasClass('cb-input-required-error')) {
                $(this).removeClass('cb-input-required-error');
            }
            if (this.value == '') {
                $(this).addClass('cb-input-required-error').focus();
                filled = false;
                return false;
            }
        });
        if (filled) {
            this.elements.$contactForm.append('<div class="cb-modal-loader" style="display:block;"></div>');
            var params = 'act=email&' + this.elements.$contactForm.find(':input').serialize();
            Utils.ajax('POST', params, $.proxy(this.onContactUs, this), $.proxy(this.onError, this));
        }
    };
    CbOnlineBooking.prototype.onContactUs = function(data) {
        this.elements.$contactForm.find('.cb-modal-loader').remove();
        if (data.status == 0) {
            this.elements.$contactForm.find('input[name="contact_email"]').addClass('cb-input-required-error').focus();
        }
        else if (data.status == 1) {
            this.elements.$contactForm.find(':input').prop('disabled', true);
            this.elements.$contactForm.find('.cb-contact-us-submit').after('<div class="cb-callout cb-callout-success">' + data.description + '</div>').remove();
        }
    };
    CbOnlineBooking.prototype.renderFooter = function(reception) {
        var html = '<div class="cb-footer"><div class="cb-container">' + (Utils.isTrue(this.model.appearance.sections) ? '<div class="cb-section-header"><h2>' + $.cbOnlineBookingLanguage.L55 + '</h2></div>' : '') + '<table><tr><td>';
        html += '<div class="cb-reception-name">' + reception.name + '</div>';
        html += '<div class="cb-reception-details"><div>' + reception.address + '</div>';
        if (reception.town != '') {
            html += '<div>' + reception.town + '</div>';
        }
        if (reception.phone != '') {
            html += '<div><a href="callto:' + reception.phone + '">' + reception.phone + '</a></div>';
        }
        if (reception.website != '') {
            html += '<div><a href="' + reception.website + '" target="_blank">' + reception.website + '</a></div>';
        }
        html += '</div></td><td>';
        if (reception.lat != 0 && reception.lng != 0) {
            html += '<div class="cb-footer-map"></div>';
        }
        html += '</td></tr></table></div></div>';
        var div = $(html).appendTo(this.elements.$content);
        this.elements.$footerMap = div.find('.cb-footer-map');
    };
    CbOnlineBooking.prototype.setModelState = function(showLocation, showActivity, showProvider) {
        if (showLocation) {
            if (showActivity) {
                if (showProvider) {
                    this.model.state = 1;
                }
                else {
                    this.model.state = 2;
                }
            }
            else {
                if (showProvider) {
                    this.model.state = 3;
                }
                else {
                    this.model.state = 4;
                }
            }
        }
        else {
            if (showActivity) {
                if (showProvider) {
                    this.model.state = 5;
                }
                else {
                    this.model.state = 6;
                }
            }
            else {
                if (showProvider) {
                    this.model.state = 7;
                }
                else {
                    this.model.state = 8;
                }
            }
        }
    };
    CbOnlineBooking.prototype.renderFilters = function(filters) {
        var showLocation = (filters.location.show == 2 || filters.location.show == 1 && filters.location.length > 1),
            showActivity = (filters.activity.show == 1),
            showProvider = (filters.provider.show == 1);
        if (showLocation || showActivity || showProvider) {
            var $filters = $('<div class="cb-filters"></div>').prependTo(this.elements.$contentContainer);
            this.elements.$filters = $('<div></div>').appendTo($filters);
            this.elements.$filtersData = $('<div></div>').appendTo($filters);
            if (showLocation) {
                this.renderFilterLocation(filters.data.locations);
            }
            if (showActivity) {
                this.renderFilterActivity((showLocation ? 454 : 203));
            }
            if (showProvider) {
                var leftPos = 213;
                if (showLocation && showActivity) {
                    leftPos = 715;
                }
                else if (showLocation || showActivity) {
                    leftPos = 464;
                }
                this.renderFilterProvider(leftPos, filters.data.providers['A'].name);
            }
            this.setModelState(showLocation, showActivity, showProvider);
            var selectedLocations = [];
            if (this.model.defaults.locations.length > 0) {
                for (var i = 0; i < this.model.defaults.locations.length; i++) {
                    if (this.model.data.locations.hasOwnProperty(this.model.defaults.locations[i])) {
                        selectedLocations.push(this.model.defaults.locations[i]);
                    }
                }
            }
            if (this.model.state == 1 || this.model.state == 2 || this.model.state == 3 || this.model.state == 4) {
                if (selectedLocations.length == 0) {
                    var ids = Object.keys(filters.data.locations);
                    if (ids.length == 1) {
                        selectedLocations.push(ids[0]);
                    }
                }
                if (selectedLocations.length > 0) {
                    for (var i = 0; i < selectedLocations.length; i++) {
                        this.toggleLocation(this.elements.$filtersData.find('.cb-location[data-id="' + selectedLocations[i] + '"]'));
                    }
                    if (this.model.state == 1 || this.model.state == 2) {
                        this.model.providers.ids = this.model.defaults.providers;
                        this.updateFilterActivity();
                        this.tryAutoselectActivity();
                    }
                    else {
                        this.model.activityGroup = this.model.defaults.activityGroup;
                        this.model.activity = this.model.defaults.activity;
                        if (this.model.state == 3) {
                            this.renderFilterDataProvider();
                            this.tryAutoselectProvider();
                        }
                        else {
                            this.model.providers.ids = this.model.defaults.providers;
                        }
                        this.updateTimes();
                    }
                }
                else {
                    if (this.model.state == 1 || this.model.state == 2) {
                        this.model.providers.ids = this.model.defaults.providers;
                        this.elements.$filters.find('.cb-filter-activity').addClass('cb-filter-disabled');
                        if (this.model.state == 1) {
                            this.elements.$filters.find('.cb-filter-provider').addClass('cb-filter-disabled');
                        }
                    }
                    else {
                        this.model.activityGroup = this.model.defaults.activityGroup;
                        this.model.activity = this.model.defaults.activity;
                        this.model.providers.ids = this.model.defaults.providers;
                        if (this.model.state == 3) {
                            this.elements.$filters.find('.cb-filter-provider').addClass('cb-filter-disabled');
                        }
                    }
                    this.toggleFilter(this.elements.$filters.find('.cb-filter-location'));
                }
            }
            else {
                if (selectedLocations.length == 0) {
                    selectedLocations = Object.keys(filters.data.locations);
                }
                for (var i in selectedLocations) {
                    this.model.locations.add(selectedLocations[i]);
                }
                if (this.model.state == 5 || this.model.state == 6) {
                    this.model.providers.ids = this.model.defaults.providers;
                    this.updateFilterActivity();
                    this.tryAutoselectActivity();
                }
                else {
                    this.model.activityGroup = this.model.defaults.activityGroup;
                    this.model.activity = this.model.defaults.activity;
                    this.renderFilterDataProvider();
                    this.tryAutoselectProvider();
                    this.updateTimes();
                }
            }
            this.bindFiltersEvents();
        }
        else {
            this.model.state = 8;
            this.model.locations.ids = this.model.defaults.locations;
            this.model.activityGroup = this.model.defaults.activityGroup;
            this.model.activity = this.model.defaults.activity;
            this.model.providers.ids = this.model.defaults.providers;
            this.updateTimes();
        }
        if (Utils.isTrue(this.model.appearance.sections)) {
            $('<div class="cb-section-header"><h2>' + $.cbOnlineBookingLanguage.L46 + '</h2><div>' + $.cbOnlineBookingLanguage.L47.replace('%', '<b>' + this.model.reception.name + '</b>') + '</div></div>').prependTo(this.elements.$contentContainer);
        }
    };
    CbOnlineBooking.prototype.renderFilterLocation = function(locations) {
        this.elements.$filters.append('<button class="cb-filter cb-filter-location" data-filter-data=".cb-filter-location-data"><span class="cb-filter-name">' + $.cbOnlineBookingLanguage.L2 + '</span><span class="cb-filter-value">' + $.cbOnlineBookingLanguage.L3 + '</span><span class="cb-caret"></span></button>')
        this.elements.$filterLocationValue = this.elements.$filters.find('.cb-filter-location > .cb-filter-value');
        var html = '<div class="cb-popover cb-filter-location-data"><div class="cb-arrow" style="left:198px;"></div><div class="cb-popover-content">';
        for (var id in locations) {
            html += '<a href="#" class="cb-location" data-id="' + id + '"><div class="cb-checkbox"></div><div class="cb-location-data"><span>' + locations[id].name + '</span> <span class="cb-location-details">' + locations[id].address + '</span></div></a>';
        }
        html += '</div></div>';
        this.elements.$filtersData.append(html);
    };
    CbOnlineBooking.prototype.renderFilterActivity = function(leftPosition) {
        this.elements.$filters.append('<button class="cb-filter cb-filter-activity" data-filter-data=".cb-filter-activity-data"><span class="cb-filter-name">' + $.cbOnlineBookingLanguage.L4 + '</span><span class="cb-filter-value">' + $.cbOnlineBookingLanguage.L5 + '</span><span class="cb-caret"></span></button>')
        this.elements.$filterActivity = this.elements.$filters.find('.cb-filter-activity');
        this.elements.$filterActivityValue = this.elements.$filterActivity.find('.cb-filter-value');
        this.elements.$filtersData.append('<div class="cb-popover cb-filter-activity-data"><div class="cb-arrow" style="left:' + leftPosition + 'px;"></div><div class="cb-popover-content"></div></div>');
        this.elements.$filterDataActivity = this.elements.$filtersData.find(this.elements.$filterActivity.data('filter-data')).find('.cb-popover-content');
    };
    CbOnlineBooking.prototype.renderFilterProvider = function(leftPosition, defaultProvider) {
        this.elements.$filters.append('<button class="cb-filter cb-filter-provider" data-filter-data=".cb-filter-provider-data"><span class="cb-filter-name">' + $.cbOnlineBookingLanguage.L6 + '</span><span class="cb-filter-value">' + defaultProvider + '</span><span class="cb-caret"></span></button>')
        this.elements.$filterProvider = this.elements.$filters.find('.cb-filter-provider');
        this.elements.$filterProviderValue = this.elements.$filterProvider.find('.cb-filter-value');
        this.elements.$filtersData.append('<div class="cb-popover cb-filter-provider-data"><div class="cb-arrow" style="left:' + leftPosition + 'px;"></div><div class="cb-popover-content"></div></div>');
        this.elements.$filterDataProvider = this.elements.$filtersData.find(this.elements.$filterProvider.data('filter-data')).find('.cb-popover-content');
    };
    CbOnlineBooking.prototype.tryAutoselectActivity = function() {
        var toggleActivityFilter = true;
        if (this.model.defaults.activity != 0 && this.model.data.activities.hasOwnProperty(this.model.defaults.activity)) {
            var $element = this.elements.$filterDataActivity.find('.cb-activity[data-id="' + this.model.defaults.activity + '"]:first');
            if ($element.length > 0) {
                toggleActivityFilter = false;
                this.selectActivity($element.find('.cb-btn'));
            }
        }
        if (toggleActivityFilter) {
            this.toggleFilter(this.elements.$filters.find('.cb-filter-activity'));
        }
    };
    CbOnlineBooking.prototype.tryAutoselectPreviouslySelectedActivity = function() {
        if (this.model.activityGroup != 0 && this.model.activity != 0) {
            var $element = this.elements.$filterDataActivity.find('.cb-activity-group[data-id="' + this.model.activityGroup + '"] > .cb-activity[data-id="' + this.model.activity + '"]');
            if ($element.length > 0) {
                this.selectActivity($element.find('.cb-btn'), false);
            }
        }
    };
    CbOnlineBooking.prototype.updateFilterActivity = function() {
        this.resetFilterActivity();
        if (this.model.locations.ids.length > 0) {
            this.renderFilterDataActivity();
        }
        if (this.model.state == 1 || this.model.state == 5) {
            this.resetFilterProvider();
        }
    };
    CbOnlineBooking.prototype.resetFilterActivity = function() {
        this.elements.$filterActivityValue.text($.cbOnlineBookingLanguage.L5);
        this.elements.$filterActivity.addClass('cb-filter-disabled');
    };
    CbOnlineBooking.prototype.getActivityGroupsByLocations = function() {
        var groups = {};
        for (var i = 0; i < this.model.locations.ids.length; i++) {
            for (var j in this.model.data.mapping[this.model.locations.ids[i]]) {
                if (groups[j] === undefined) {
                    groups[j] = [];
                }
                for (var k in this.model.data.mapping[this.model.locations.ids[i]][j]) {
                    if ($.inArray(k, groups[j]) == -1) {
                        groups[j].push(k);
                    }
                }
            }
        }
        return groups;
    };
    CbOnlineBooking.prototype.renderFilterDataActivity = function() {
        var groups = this.getActivityGroupsByLocations();
        var html = '',
            htmlGroups = '',
            groupsCount = 0;
        for (var i in groups) {
            if (groups[i].length > 0) {
                if (Utils.isTrue(this.model.appearance.filters.activity.groups)) {
                    groupsCount++;
                    htmlGroups += '<a href="#" class="cb-btn cb-btn-green cb-go-to-activity-group" data-id="' + i + '">' + this.model.data.activities_groups[i].name + '</a> ';
                }
                html += '<div class="cb-activity-group" data-id="' + i + '"><div class="cb-title">' + this.model.data.activities_groups[i].name + '</div>';
                for (var j = 0; j < groups[i].length; j++) {
                    var activity = this.model.data.activities[groups[i][j]];
                    html += '<div class="cb-activity" data-id=' + groups[i][j] + '><div class="cb-title"' + (Utils.isTrue(this.model.appearance.filters.activity.duration) ? '' : ' style="line-height:38px;"') + '>' + activity.name + '</div>' + (Utils.isTrue(this.model.appearance.filters.activity.duration) ? '<div class="cb-details">' + activity.duration + ' ' + $.cbOnlineBookingLanguage.L14 + ' <!--<a href="#">' + $.cbOnlineBookingLanguage.L11 + '</a>--></div>' : '') + '<a href="#" class="cb-btn cb-btn-blue">' + $.cbOnlineBookingLanguage.L7 + '</a></div>';
                }
                html += '</div>'
            }
        }
        if (groupsCount > 1) {
            html = htmlGroups + html;
        }
        this.elements.$filterDataActivity.html(html);
        this.elements.$filterActivity.removeClass('cb-filter-disabled');
        if (groupsCount > 1) {
            this.elements.$filterDataActivity.on('click', '.cb-go-to-activity-group', $.proxy(this.goToActivityGroup, this));
        }
    };
    CbOnlineBooking.prototype.goToActivityGroup = function(e) {
        e.preventDefault();
        var groupId = $(e.currentTarget).data('id');
        $(this.elements.$container).animate({
            scrollTop: this.elements.$filterDataActivity.find('.cb-activity-group[data-id="' + groupId + '"]').offset().top
        }, 500);
    };
    CbOnlineBooking.prototype.tryAutoselectProvider = function() {
        var providers = [];
        if (!this.model.initialized) {
            if (this.model.defaults.providers.length >= 1) {
                for (var i = 0; i < this.model.defaults.providers.length; i++) {
                    if (this.model.data.providers.hasOwnProperty(this.model.defaults.providers[i])) {
                        var $element = this.elements.$filterDataProvider.find('.cb-provider[data-id="' + this.model.defaults.providers[i] + '"]');
                        if ($element.length > 0) {
                            providers.push($element);
                        }
                    }
                }
            }
        }
        else {
            for (var i = 0; i < this.model.providers.ids.length; i++) {
                var $element = this.elements.$filterDataProvider.find('.cb-provider[data-id="' + this.model.providers.ids[i] + '"]');
                if ($element.length > 0) {
                    providers.push($element);
                }
            }
        }
        if (providers.length == 0) {
            providers.push(this.elements.$filterDataProvider.find('.cb-provider[data-id="A"]'));
        }
        this.model.providers.ids = [];
        for (var i in providers) {
            this.selectProvider(providers[i], true);
        }
    };
    CbOnlineBooking.prototype.resetFilterProvider = function() {
        this.elements.$filterDataProvider.find('.cb-provider.cb-provider-selected').removeClass('cb-provider-selected').find('.cb-btn').remove();
        this.elements.$filterProviderValue.text($.cbOnlineBookingLanguage.L9);
        this.elements.$filterProvider.addClass('cb-filter-disabled');
    };
    CbOnlineBooking.prototype.getProvidersByLocationsAndActivity = function() {
        var providers = [];
        for (var i = 0; i < this.model.locations.ids.length; i++) {
            for (var j in this.model.data.mapping[this.model.locations.ids[i]]) {
                if (j == this.model.activityGroup || this.model.activityGroup == 'A') {
                    if (this.model.data.mapping[this.model.locations.ids[i]][j].hasOwnProperty(this.model.activity)) {
                        for (var k in this.model.data.mapping[this.model.locations.ids[i]][j][this.model.activity]) {
                            var providerId = this.model.data.mapping[this.model.locations.ids[i]][j][this.model.activity][k];
                            if ($.inArray(providerId, providers) == -1) {
                                providers.push(providerId);
                            }
                        }
                    }
                }
            }
        }
        return providers;
    };
    CbOnlineBooking.prototype.renderFilterDataProvider = function() {
        var providers = this.getProvidersByLocationsAndActivity();
        var html = '';
        for (var i = 0; i < providers.length; i++) {
            var clazz = 'cb-provider-data',
                photo = Utils.toAbsoluteURL('img/provider.png');
            if (this.model.data.providers[providers[i]].description == '') {
                clazz += ' cb-no-details';
            }
            if (providers[i] != 'A' && this.model.data.providers[providers[i]].photo != '') {
                photo = Utils.toAbsoluteURL(this.model.data.providers[providers[i]].photo);
            }
            html += '<a href="#" class="cb-provider" data-id=' + providers[i] + '><img src="' + photo + '" alt="" title=""><div class="' + clazz + '"><div class="cb-title">' + this.model.data.providers[providers[i]].name + '</div><div class="cb-details">' + this.model.data.providers[providers[i]].description + '</div></div></a>';
        }
        this.elements.$filterDataProvider.html(html);
        this.elements.$filterProvider.removeClass('cb-filter-disabled');
    };
    CbOnlineBooking.prototype.bindFiltersEvents = function() {
        $(this.elements.$filters).on('click', '.cb-filter', $.proxy(this.onToggleFilter, this));
        $(this.elements.$filtersData).on('click', '.cb-location', $.proxy(this.onToggleLocation, this));
        $(this.elements.$filtersData).on('click', '.cb-activity > a.cb-btn', $.proxy(this.onSelectActivity, this));
        $(this.elements.$filtersData).on('click', '.cb-provider', $.proxy(this.onSelectProvider, this));
    };
    CbOnlineBooking.prototype.onToggleFilter = function(e) {
        var $filter = $(e.currentTarget),
            show = !$filter.hasClass('cb-filter-active');
        this.closeActiveFilter(show);
        if (show) {
            this.toggleFilter($filter);
        }
    };
    CbOnlineBooking.prototype.toggleFilter = function($filter) {
        $filter.toggleClass('cb-filter-active');
        this.elements.$filtersData.find($filter.data('filter-data')).slideDown(500);
    };
    CbOnlineBooking.prototype.closeActiveFilter = function(show) {
        var $filter = this.elements.$filters.find('.cb-filter.cb-filter-active');
        if (show) {
            this.elements.$filtersData.find($filter.data('filter-data')).hide();
        }
        else {
            this.elements.$filtersData.find($filter.data('filter-data')).slideUp(500);
        }
        $filter.removeClass('cb-filter-active')
    };
    CbOnlineBooking.prototype.onToggleLocation = function(e) {
        e.preventDefault();
        this.toggleLocation($(e.currentTarget));
    };
    CbOnlineBooking.prototype.toggleLocation = function($element) {
        var id = $element.data('id');
        if ($element.hasClass('cb-location-selected')) {
            this.model.locations.remove(id);
        }
        else {
            this.model.locations.add(id);
        }
        $element.toggleClass('cb-location-selected');
        var text = $.cbOnlineBookingLanguage.L3;
        if (this.model.locations.ids.length > 0) {
            var names = [];
            for (var i = 0; i < this.model.locations.ids.length; i++) {
                names.push(this.model.data.locations[this.model.locations.ids[i]].name);
            }
            text = names.join(', ');
        }
        this.elements.$filterLocationValue.text(text);
        if (this.model.initialized) {
            if (this.model.state == 1 || this.model.state == 2) {
                this.updateFilterActivity();
                if (this.model.locations.ids.length > 0) {
                    this.tryAutoselectPreviouslySelectedActivity();
                }
            }
            else {
                if (this.model.state == 3) {
                    this.resetFilterProvider();
                    if (this.model.locations.ids.length > 0) {
                        this.renderFilterDataProvider();
                        this.tryAutoselectProvider();
                    }
                }
                if (this.model.locations.ids.length > 0) {
                    this.updateTimes();
                }
            }
        }
    };
    CbOnlineBooking.prototype.onSelectActivity = function(e) {
        e.preventDefault();
        this.elements.$filterDataActivity.find('.cb-activity.cb-activity-selected').removeClass('cb-activity-selected').find('.cb-btn').text($.cbOnlineBookingLanguage.L7);
        this.selectActivity($(e.currentTarget));
    };
    CbOnlineBooking.prototype.selectActivity = function($element, closeActiveFilter) {
        this.model.activity = $element.closest('.cb-activity').data('id');
        this.model.activityGroup = $element.closest('.cb-activity-group').data('id');
        $element.text($.cbOnlineBookingLanguage.L8);
        $element.closest('.cb-activity').addClass('cb-activity-selected');
        this.elements.$filterActivityValue.text(this.model.data.activities[this.model.activity].name);
        if (closeActiveFilter !== false) {
            this.closeActiveFilter();
        }
        if (this.model.state == 1 || this.model.state == 3 || this.model.state == 5 || this.model.state == 7) {
            this.renderFilterDataProvider();
            this.tryAutoselectProvider();
        }
        this.updateTimes();
    };
    CbOnlineBooking.prototype.clearSelectedProviders = function() {
        this.model.providers.ids = [];
        this.elements.$filterDataProvider.find('.cb-provider.cb-provider-selected').removeClass('cb-provider-selected').find('.cb-btn').remove();
    };
    CbOnlineBooking.prototype.onSelectProvider = function(e) {
        e.preventDefault();
        var $element = $(e.currentTarget);
        if ($element.data('id') == 'A') {
            this.closeActiveFilter(false);
            if ($element.hasClass('cb-provider-selected')) {
                return;
            }
            else {
                this.clearSelectedProviders();
            }
        }
        else {
            if (this.model.providers.ids.length == 1 && $element.hasClass('cb-provider-selected')) {
                return;
            }
            if ($.inArray('A', this.model.providers.ids) != -1) {
                this.clearSelectedProviders();
            }
        }
        this.selectProvider($element);
    };
    CbOnlineBooking.prototype.selectProvider = function($element, noUpdate) {
        if (!$element.hasClass('cb-provider-selected')) {
            this.model.providers.add($element.data('id'));
            $element.addClass('cb-provider-selected').append('<div class="cb-btn">' + $.cbOnlineBookingLanguage.L8 + '</div>');
        }
        else {
            this.model.providers.remove($element.data('id'));
            $element.removeClass('cb-provider-selected').find('.cb-btn').remove();
        }
        var text = '';
        if (this.model.providers.ids.length > 0) {
            var names = [];
            for (var i = 0; i < this.model.providers.ids.length; i++) {
                names.push(this.model.data.providers[this.model.providers.ids[i]].name);
            }
            text = names.join(', ');
        }
        this.elements.$filterProviderValue.text(text);
        if (noUpdate !== true) {
            this.updateTimes();
        }
    };
    CbOnlineBooking.prototype.onChangeWeek = function(e) {
        e.preventDefault();
        if ($(e.currentTarget).hasClass('cb-week-next')) {
            this.model.weekOffset += 1;
        }
        else {
            if (this.model.weekOffset == 0) {
                return;
            }
            this.model.weekOffset -= 1;
        }
        this.updateTimes({
            suggestion_engine: 0
        });
    };
    CbOnlineBooking.prototype.updateTimes = function(overrideParams) {
        if (this.model.timesDisabled) {
            this.enableWeekTimes();
        }
        this.elements.$weekTimesContainer.children('.cb-overlay').show();
        this.model.loadingTimes = true;
        var providers = this.model.providers.ids;
        if (providers.length == 1 && providers[0] == 'A') {
            providers = Object.keys(this.model.data.providers);
            providers.pop();
        }
        var params = {
            act: 'times',
            locations: this.model.locations.ids.join(','),
            activity: this.model.activity,
            providers: providers.join(','),
            week: this.model.weekOffset,
            suggestion_engine: 1
        };
        if (this.model.params.hasOwnProperty('days')) {
            params.days = this.model.params.days;
        }
        if (this.model.params.hasOwnProperty('algorithm')) {
            params.algorithm = this.model.params.algorithm;
        }
        if (overrideParams !== undefined) {
            $.extend(params, overrideParams);
        }
        if (params['suggestion_engine'] == 1) {
            params['suggestion_locations'] = Object.keys(this.model.data.locations).join(',');
            params['suggestion_providers'] = this.getProvidersByLocationsAndActivity().join(',');
        }
        Utils.ajax('GET', params, $.proxy(this.onTimesLoaded, this), $.proxy(this.onError, this));
    };
    CbOnlineBooking.prototype.onTimesLoaded = function(data) {
        this.renderWeekData(data.week);
        for (var i = 0; i < data.times.length; i++) {
            var html = '';
            if (data.times[i].length > 0) {
                for (var j = 0; j < data.times[i].length; j++) {
                    var clazz = 'cb-available-time',
                        group = 0,
                        recurring = '',
                        innerHtml = '<div class="cb-time">' + data.times[i][j].time.start + (Utils.isTrue(this.model.appearance.timetable.endTime) ? ' - ' + data.times[i][j].time.end : '') + '</div>';
                    if (this.model.settings.allow_booking == 0) {
                        clazz += ' cb-available-time-disabled';
                    }
                    if (this.model.locations.ids.length > 1) {
                        innerHtml += '<div>' + this.model.data.locations[data.times[i][j].location].name + '</div>';
                    }
                    if (Utils.isTrue(this.model.appearance.timetable.provider) && (this.model.providers.ids.length > 1 || this.model.providers.ids[0] == 'A')) {
                        innerHtml += '<div>' + this.model.data.providers[data.times[i][j].provider].name + '</div>';
                    }
                    if (data.times[i][j].hasOwnProperty('group')) {
                        if (data.times[i][j].group.places == 0) {
                            clazz += ' cb-not-bookable';
                        }
                        group = data.times[i][j].group.id;
                        innerHtml += '<div class="cb-group-name">' + data.times[i][j].group.name + '</div>';
                        innerHtml += '<div>' + data.times[i][j].group.places + ' ' + $.cbOnlineBookingLanguage.L56 + '</div>';
                        if (data.times[i][j].group.hasOwnProperty('recurring')) {
                            recurring = data.times[i][j].group.recurring.join(',');
                        }
                    }
                    html += '<a href="#" class="' + clazz + '" data-date="' + data.times[i][j].date + '" data-time="' + data.times[i][j].time.start + '" data-provider="' + data.times[i][j].provider + '" data-location="' + data.times[i][j].location + '" data-group="' + group + '" data-recurring="' + recurring + '">' + innerHtml + '</a>';
                }
            }
            else {
                html = '<div class="cb-no-available-times">' + $.cbOnlineBookingLanguage.L13 + '</div>';
            }
            this.elements.$timetable.children('.cb-col:eq(' + i + ')').children('.cb-col-body').html(html);
        }
        this.setNoAvailableTimesHeight();
        var $suggestionBar = this.elements.$weekTimesContainer.children('.cb-suggestion-bar');
        if (data.suggestions.length > 0) {
            $suggestionBar.empty();
            for (var i in data.suggestions) {
                $suggestionBar.append('<div class="cb-suggestion">' + data.suggestions[i] + '</div>');
            }
            $suggestionBar.addClass('cb-suggestion-bar-shown');
        }
        else {
            $suggestionBar.removeClass('cb-suggestion-bar-shown');
        }
        if (data.hasOwnProperty('js_weekOffset')) {
            this.model.weekOffset = data['js_weekOffset'];
        }
        this.elements.$weekTimesContainer.children('.cb-overlay').hide();
        if (!this.model.initialized) {
            this.contentLoaded();
        }
    };
    CbOnlineBooking.prototype.setNoAvailableTimesHeight = function() {};
    CbOnlineBooking.prototype.renderWeekData = function(week) {
        this.elements.$weekSelector.find('.cb-week-number > span').text(week.number);
        this.elements.$weekSelector.find('.cb-week-name').text(week.name);
        for (var i = 0; i < week.days.length; i++) {
            var $ch = this.elements.$timetable.children('.cb-col:eq(' + i + ')').children('.cb-col-head'),
                $parent = $ch.parent();
            $ch.find('.cb-day').text(week.days[i].day);
            $ch.find('.cb-day-name > span').text(week.days[i].name);
            $ch.find('.cb-day-month').text(week.days[i].month);
            if (week.days[i].hasOwnProperty('today')) {
                $parent.addClass('cb-today');
            }
            else if ($parent.hasClass('cb-today')) {
                $parent.removeClass('cb-today');
            }
        }
    };
    CbOnlineBooking.prototype.disableWeekTimes = function() {
        this.model.timesDisabled = true;
        this.elements.$timetable.children('.cb-col').children('.cb-col-body').html('');
        this.elements.$weekTimesContainer.addClass('cb-no-data-ready').find('.cb-overlay').show();
        this.elements.$weekTimesContainer.append('<div class="cb-note">' + $.cbOnlineBookingLanguage.L15 + '</div>');
    };
    CbOnlineBooking.prototype.enableWeekTimes = function() {
        this.model.timesDisabled = false;
        this.elements.$weekTimesContainer.removeClass('cb-no-data-ready').find('.cb-note').remove();
    };
    CbOnlineBooking.prototype.renderModal = function(signin, signup) {
        var randomId = Math.floor(Math.random() * 1000 + 1),
            signUpHtml = '';
        for (var i in signup) {
            var eId = 'cb-signup-i' + randomId + '-' + i.replace(/_/g, '-'),
                clazz = '';
            if (signup[i].hasOwnProperty('required') && signup[i].required == 1) {
                clazz = ' class="cb-input-required"';
            }
            signUpHtml += '<div class="cb-input-group">';
            if (signup[i].type == 'text') {
                signUpHtml += '<label for="' + eId + '" class="cb-input-label">' + signup[i].label + '</label><input type="text" id="' + eId + '" name="' + i + '"' + clazz + ' placeholder="' + signup[i].label + '">';
            }
            else if (signup[i].type == 'checkbox') {
                signUpHtml += '<input type="checkbox" id="' + eId + '" name="' + i + '" value="1"' + clazz + '> <label for="' + eId + '">' + signup[i].label + '</label>';
            }
            else if (signup[i].type == 'select') {
                signUpHtml += '<label for="' + eId + '" class="cb-input-label">' + signup[i].label + '</label><select id="' + eId + '" name="' + i + '">';
                for (var j in signup[i].options) {
                    signUpHtml += '<option value="' + j + '">' + signup[i].options[j] + '</option>';
                }
                signUpHtml += '</select>';
            }
            signUpHtml += '</div>';
        }
        var html = '<div class="cb-modal">' + '<div class="cb-modal-content">' + '<div class="cb-modal-header">' + '<a href="#" class="cb-close cb-hide-modal">&times;</a>' + '</div>' + '<div class="cb-modal-body">' + '<div class="cb-modal-body-content cb-modal-body-signed-in-as">' + '<h2>' + $.cbOnlineBookingLanguage.L44 + '</h2>' + '<img src="" class="cb-user-photo" alt="" title="">' + '<div class="cb-singed-in-name"></div>' + '<div class="cb-singed-in-not-you">' + $.cbOnlineBookingLanguage.L23 + ' <a href="#">' + $.cbOnlineBookingLanguage.L24 + '</a> ' + $.cbOnlineBookingLanguage.L25 + '</div>' + '<a href="#" class="cb-btn cb-btn-blue cb-btn-signed-in-continue">' + $.cbOnlineBookingLanguage.L26 + '</a>' + '</div>' + '<div class="cb-modal-body-content cb-modal-body-sign-in">' + '<h2>' + $.cbOnlineBookingLanguage.L16 + '</h2>' + '<form onsubmit="return false;">' + '<img src="' + Utils.toAbsoluteURL('img/user.png') + '" class="cb-user-photo" alt="" title="">' + '<label for="cb-i-' + randomId + '-sign-in" class="cb-input-label">' + signin.label + '</label>' + '<input type="text" id="cb-i-' + randomId + '-sign-in" name="' + signin.name + '" placeholder="' + signin.text + '">' + '<div class="cb-input-error"></div>' + '<input type="submit" class="cb-btn cb-btn-green cb-sign-in" value="' + $.cbOnlineBookingLanguage.L17 + '">' + '</form>' + '</div>' + '<div class="cb-modal-body-content cb-modal-body-sign-up">' + '<h2>' + $.cbOnlineBookingLanguage.L27 + '</h2>' + '<form onsubmit="return false;">' +
            signUpHtml + '<div class="cb-input-error"></div>' + '<input type="submit" class="cb-btn cb-btn-green cb-sign-up" value="' + $.cbOnlineBookingLanguage.L27 + '">' + '</form>' + '</div>' + '<div class="cb-modal-body-content cb-modal-body-review-booking-information">' + '<h2>' + $.cbOnlineBookingLanguage.L18 + '</h2>' + '<div class="cb-booking-information">' + '<table class="cb-callout cb-callout-info">' + '<tr>' + '<td class="cb-label">' + $.cbOnlineBookingLanguage.L19 + '</td>' + '<td></td>' + '</tr>' + '<tr>' + '<td class="cb-label">' + $.cbOnlineBookingLanguage.L20 + '</td>' + '<td></td>' + '</tr>' + '<tr>' + '<td class="cb-label">' + $.cbOnlineBookingLanguage.L21 + '</td>' + '<td></td>' + '</tr>' + '</table>' + '<div class="cb-callout cb-booking-status"></div>' + '<div class="cb-act">' + '<a href="#" class="cb-btn cb-btn-blue cb-confirm-booking">' + $.cbOnlineBookingLanguage.L28 + '</a>' + ' <a href="#" class="cb-btn cb-btn-white cb-hide-modal">' + $.cbOnlineBookingLanguage.L29 + '</a>' + '</div>' + '<div class="cb-done">' + '<div class="cb-auto-close-modal-note">' + $.cbOnlineBookingLanguage.L30 + ' <b>10</b> ' + $.cbOnlineBookingLanguage.L31 + '</div>' + '<div style="float:right;"><a href="#" class="cb-btn cb-btn-blue cb-hide-modal">' + $.cbOnlineBookingLanguage.L32 + '</a></div>' + '<div style="clear:both;"></div>' + '</div>' + '</div>' + '</div>' + '</div>' + '<div class="cb-modal-loader"></div>' + '</div>' + '</div>';
        this.elements.$modal = $(html).appendTo(this.elements.$content);
        this.elements.$modal.find('.cb-hide-modal').click($.proxy(this.hideModal, this));
        this.elements.$modal.find('.cb-singed-in-not-you > a').click($.proxy(this.doSignOut, this));
        this.elements.$modal.find('.cb-btn-signed-in-continue').click($.proxy(this.autoSignIn, this));
        this.elements.$modal.find('.cb-sign-in').click($.proxy(this.doSignIn, this));
        this.elements.$modal.find('.cb-sign-up').click($.proxy(this.doSignUp, this));
        this.elements.$modal.find('.cb-confirm-booking').click($.proxy(this.book, this));
    };
    CbOnlineBooking.prototype.showModal = function() {
        this.elements.$container.addClass('cb-modal-open');
        this.elements.$modal[0].offsetWidth;
        this.elements.$modal.addClass('cb-in');
    };
    CbOnlineBooking.prototype.showModalLoading = function() {
        this.elements.$modal.find('.cb-modal-loader').show();
    };
    CbOnlineBooking.prototype.hideModalLoading = function() {
        this.elements.$modal.find('.cb-modal-loader').hide();
    };
    CbOnlineBooking.prototype.hideModal = function(e) {
        if (e !== undefined) {
            e.preventDefault();
        }
        this.elements.$modal.removeClass('cb-in');
        var that = this;
        window.setTimeout(function() {
            that.elements.$container.removeClass('cb-modal-open');
        }, 200);
        if (this.closeModalIntervalID != null) {
            window.clearInterval(this.closeModalIntervalID);
            this.closeModalIntervalID = null;
            this.elements.$modal.find('.cb-auto-close-modal-note > b').text('10');
        }
    };
    CbOnlineBooking.prototype.onSelectTime = function(e) {
        e.preventDefault();
        var $this = $(e.currentTarget);
        if ($this.hasClass('cb-not-bookable')) {
            return;
        }
        if (this.model.expired) {
            this.onSessionExpired();
            return;
        }
        this.model.selectedTime = {
            date: $this.data('date'),
            time: $this.data('time'),
            activity: this.model.activity,
            provider: $this.data('provider'),
            location: $this.data('location'),
            group: $this.data('group'),
            recurring: $this.data('recurring')
        };
        this.trackEvent('Times', 'Click on a time (' + (this.model.user['signed_in'] == 1 ? 'after sign-in' : 'before sign-in') + ')', this.model.selectedTime.date);
        this.elements.$modal.find('.cb-modal-body').children().hide();
        this.showModal();
        if (this.model.user['signed_in'] == 0) {
            this.elements.$modal.find('.cb-modal-body-sign-in').show().find('input:first').focus();
        }
        else if (this.model.user['signed_in'] == 1) {
            this.reviewBookingInformation();
        }
        else if (this.model.user['signed_in'] == 2) {
            this.elements.$modal.find('.cb-modal-body-signed-in-as').show();
        }
    };
    CbOnlineBooking.prototype.doSignOut = function(e) {
        e.preventDefault();
        this.model.user['signed_in'] = 0;
        this.elements.$modal.find('.cb-modal-body-signed-in-as').slideUp();
        this.elements.$modal.find('.cb-modal-body-sign-in').show().find('input:first').focus();
        Utils.ajax('POST', {
            act: 'signout'
        });
    };
    CbOnlineBooking.prototype.autoSignIn = function(e) {
        e.preventDefault();
        this.showModalLoading();
        Utils.ajax('POST', {
            act: 'signin',
            login: ''
        }, $.proxy(this.onSignIn, this), $.proxy(this.onError, this));
    };
    CbOnlineBooking.prototype.doSignIn = function(e) {
        e.preventDefault();
        var $input = this.elements.$modal.find('.cb-modal-body-sign-in').find('input:first'),
            login = $input.val();
        if (login == '') {
            $input.focus();
            return;
        }
        this.showModalLoading();
        Utils.ajax('POST', {
            act: 'signin',
            login: login
        }, $.proxy(this.onSignIn, this), $.proxy(this.onError, this));
    };
    CbOnlineBooking.prototype.onSignIn = function(data) {
        if (data.status == 0) {
            this.trackEvent('Sign-ins', 'Failed sign-in', data.error);
            if (this.model.user['signed_in'] == 2) {
                this.model.user['signed_in'] = 0;
                this.elements.$modal.find('.cb-modal-body-signed-in-as').slideUp();
                this.elements.$modal.find('.cb-modal-body-sign-in').show();
            }
            this.elements.$modal.find('.cb-modal-body-sign-in').find('.cb-input-error').text(data.error).show();
            this.elements.$modal.find('.cb-modal-body-sign-in').find('input:first').focus();
            this.hideModalLoading();
        }
        else if (data.status == 1) {
            this.trackEvent('Sign-ins', 'Successful sign-in');
            this.model.userToken = data.token;
            if (this.model.user['signed_in'] == 2) {
                this.elements.$modal.find('.cb-modal-body-signed-in-as').slideUp();
            }
            else {
                this.elements.$modal.find('.cb-modal-body-sign-in').slideUp();
            }
            this.model.user['signed_in'] = 1;
            this.reviewBookingInformation();
        }
        else {
            var $signInInput = this.elements.$modal.find('.cb-modal-body-sign-in').find('input:first');
            this.elements.$modal.find('.cb-modal-body-sign-in').slideUp();
            this.elements.$modal.find('.cb-modal-body-sign-up').find('.cb-input-error').text('').hide();
            this.elements.$modal.find('.cb-modal-body-sign-up').show().find('input:first').focus();
            this.elements.$modal.find('.cb-modal-body-sign-up').find('input[name="' + $signInInput.prop('name') + '"]').val($signInInput.val());
            this.hideModalLoading();
        }
    };
    CbOnlineBooking.prototype.doSignUp = function(e) {
        e.preventDefault();
        var filled = true;
        this.elements.$modal.find('.cb-modal-body-sign-up').find('input.cb-input-required').each(function() {
            if ($(this).hasClass('cb-input-required-error')) {
                $(this).removeClass('cb-input-required-error');
            }
            if (this.type == 'text' && this.value == '' || this.type == 'checkbox' && !this.checked) {
                $(this).addClass('cb-input-required-error').focus();
                filled = false;
                return false;
            }
        });
        if (filled) {
            this.showModalLoading();
            var params = 'act=signup&' + this.elements.$modal.find('.cb-modal-body-sign-up').find('form').serialize();
            Utils.ajax('POST', params, $.proxy(this.onSignUp, this), $.proxy(this.onError, this));
        }
    };
    CbOnlineBooking.prototype.onSignUp = function(data) {
        if (data.status == 1) {
            this.trackEvent('Sign-ups', 'Successful sign-up');
            this.model.userToken = data.token;
            this.model.user['signed_in'] = 1;
            this.elements.$modal.find('.cb-modal-body-sign-up').slideUp();
            this.reviewBookingInformation();
        }
        else {
            this.trackEvent('Sign-ups', 'Failed sign-up', data.description);
            this.elements.$modal.find('.cb-modal-body-sign-up').find('.cb-input-error').text(data.description).show();
            this.hideModalLoading();
        }
    };
    CbOnlineBooking.prototype.reviewBookingInformation = function() {
        var $bookingInformation = this.elements.$modal.find('.cb-modal-body-review-booking-information');
        $bookingInformation.find('tr:eq(0) > td:eq(1)').html(this.model.data.activities[this.model.selectedTime.activity].name);
        $bookingInformation.find('tr:eq(1) > td:eq(1)').html(this.model.selectedTime.date + ' ' + this.model.selectedTime.time);
        if (this.model.selectedTime.group != 0 && this.model.selectedTime.recurring != '') {
            $bookingInformation.find('tr:eq(1) > td:eq(1)').append('<br>' + this.model.selectedTime.recurring.replace(/,/g, '<br>'));
        }
        $bookingInformation.find('tr:eq(2) > td:eq(1)').html(this.model.data.providers[this.model.selectedTime.provider].name);
        $bookingInformation.find('.cb-booking-status').removeClass('cb-callout-success cb-callout-error').hide();
        $bookingInformation.find('.cb-done').hide();
        $bookingInformation.find('.cb-act').show();
        $bookingInformation.show();
        this.hideModalLoading();
    };
    CbOnlineBooking.prototype.book = function(e) {
        e.preventDefault();
        this.showModalLoading();
        var params = this.model.selectedTime;
        params['act'] = 'book';
        params['token'] = this.model.userToken;
        if (this.model.affiliate != '') {
            params['affiliate'] = this.model.affiliate;
        }
        Utils.ajax('POST', params, $.proxy(this.onBook, this), $.proxy(this.onError, this));
    };
    CbOnlineBooking.prototype.onBook = function(data) {
        var redirect = (this.model.redirect_uri != '' && /^https?:\/\//.test(this.model.redirect_uri) && data.status == 1);
        if (data.status == -1) {
            this.model.user['signed_in'] = 0;
            this.onSessionExpired();
        }
        else if (data.status == 0 || data.status == 1) {
            if (redirect) {
                this.trackEvent('Bookings', 'Successful booking');
                var form = document.createElement('form');
                form.setAttribute('method', 'POST');
                form.setAttribute('action', this.model.redirect_uri);
                var input = document.createElement('input');
                input.setAttribute('type', 'hidden');
                input.setAttribute('name', 'booking_id');
                input.setAttribute('value', data.bookings[0].id);
                form.appendChild(input);
                document.body.appendChild(form);
                form.submit();
            }
            else {
                if (data.status == 1) {
                    this.trackEvent('Bookings', 'Successful booking');
                    this.elements.$modal.find('.cb-modal-body-review-booking-information').find('.cb-booking-status').removeClass('cb-callout-error').addClass('cb-callout-success').text(data.description).show();
                }
                else {
                    this.trackEvent('Bookings', 'Failed booking', data.description);
                    this.elements.$modal.find('.cb-modal-body-review-booking-information').find('.cb-booking-status').removeClass('cb-callout-success').addClass('cb-callout-error').text(data.description).show();
                }
                this.elements.$modal.find('.cb-modal-body-review-booking-information').find('.cb-act').hide();
                this.elements.$modal.find('.cb-modal-body-review-booking-information').find('.cb-done').show();
                this.updateTimes({
                    suggestion_engine: 0
                });
                if (data.status == 1) {
                    if (!this.bookedTimesRendered) {
                        this.renderBookedTimes();
                        this.bookedTimesRendered = true;
                    }
                    this.showBookedTimes(data.bookings);
                }
                this.closeModalIntervalID = window.setInterval($.proxy(this.onCloseModalStep, this), 1000);
            }
        }
        if (!redirect) {
            this.hideModalLoading();
        }
    };
    CbOnlineBooking.prototype.onCloseModalStep = function() {
        var $element = this.elements.$modal.find('.cb-auto-close-modal-note > b'),
            secondsLeft = parseInt($element.text()) - 1;
        if (secondsLeft == 0) {
            this.hideModal();
        }
        else {
            $element.text(secondsLeft);
        }
    };
    CbOnlineBooking.prototype.renderBookedTimes = function() {
        if (this.elements.$container.find('.cb-header').length == 0) {
            $('<div class="cb-header"><div class="cb-container"></div></div>').prependTo(this.elements.$container.find('.cb-content'));
        }
        this.elements.$container.find('.cb-header > .cb-container').append('<div class="cb-bookings"><a class="cb-btn cb-btn-white cb-booked-times-count">' + $.cbOnlineBookingLanguage.L33 + ' <span>0</span></a><div class="cb-popover"><div class="cb-arrow" style="left:330px;"></div><div class="cb-popover-content"><ul class="cb-booked-times"></ul></div></div></div>');
        this.elements.$bookedTimesCount = this.elements.$container.find('.cb-header > .cb-container').find('.cb-booked-times-count');
        this.elements.$bookedTimes = this.elements.$container.find('.cb-header > .cb-container').find('.cb-booked-times');
        this.elements.$bookedTimesCount.click($.proxy(this.onToggleBookedTimes, this));
        this.elements.$bookedTimes.on('click', '.cb-cancel-time', $.proxy(this.onCancelTime, this));
        this.elements.$bookedTimes.on('click', '.cb-cancel-time-yes', $.proxy(this.onCancelTimeYes, this));
        this.elements.$bookedTimes.on('click', '.cb-cancel-time-no', $.proxy(this.onCancelTimeNo, this));
    };
    CbOnlineBooking.prototype.showBookedTimes = function(bookings) {
        this.elements.$bookedTimes.find('li.cb-no-booked-times').remove();
        var html = '';
        for (var i in bookings) {
            html += '<li><div class="cb-callout cb-callout-info cb-booked-time">';
            html += '<div class="cb-b-time">' + bookings[i].date + ' ' + bookings[i].time + '</div>';
            html += '<div class="cb-b-info">' + this.model.data.activities[this.model.selectedTime.activity].name + ' ' + $.cbOnlineBookingLanguage.L45 + ' <span>' + this.model.data.providers[this.model.selectedTime.provider].name + '</span></div>';
            if (bookings[i].cancellable == 1) {
                html += '<div class="cb-cancel-time-placeholder"><a href="#" class="cb-btn cb-btn-mini cb-btn-red cb-cancel-time" data-id="' + bookings[i].id + '">' + $.cbOnlineBookingLanguage.L34 + '</a></div>';
            }
            else {
                html += '<div class="cb-cancel-time-note">' + $.cbOnlineBookingLanguage.L35 + '</div>';
            }
            html += '</div></li>';
        }
        this.elements.$bookedTimes.append(html);
        this.elements.$bookedTimesCount.find('span').html(this.elements.$bookedTimes.find('li').length);
    };
    CbOnlineBooking.prototype.onToggleBookedTimes = function(e) {
        e.preventDefault();
        this.elements.$bookedTimes.closest('.cb-popover').slideToggle();
    };
    CbOnlineBooking.prototype.onCancelTime = function(e) {
        e.preventDefault();
        var $this = $(e.currentTarget);
        if (!$this.hasClass('cb-btn-disabled')) {
            $this.text($.cbOnlineBookingLanguage.L36).addClass('cb-btn-disabled');
            $this.after(' <div style="display:inline-block;"><a href="#" class="cb-btn cb-btn-mini cb-btn-blue cb-cancel-time-yes">' + $.cbOnlineBookingLanguage.L37 + '</a> <a href="#" class="cb-btn cb-btn-mini cb-btn-white cb-cancel-time-no">' + $.cbOnlineBookingLanguage.L38 + '</a></div>');
        }
    };
    CbOnlineBooking.prototype.onCancelTimeYes = function(e) {
        e.preventDefault();
        if (this.model.expired) {
            this.onSessionExpired();
            return;
        }
        var $this = $(e.currentTarget),
            $a = $this.parent().prev(),
            $bt = $this.closest('.cb-booked-time');
        $bt.append('<div class="cb-modal-loader" style="display:block;"></div>');
        Utils.ajax('POST', {
            act: 'cancel',
            id: $a.data('id'),
            token: this.model.userToken
        }, $.proxy(this.onTimeCancelled, this, $bt.parent()), $.proxy(this.onError, this));
    };
    CbOnlineBooking.prototype.onTimeCancelled = function($li, data) {
        if (data.status == -1) {
            this.model.user['signed_in'] = 0;
            $li.find('.cb-modal-loader').remove();
            this.onSessionExpired();
        }
        else if (data.status == 1) {
            $li.remove();
            var bookedTimesCount = this.elements.$bookedTimes.find('li').length;
            this.elements.$bookedTimesCount.find('span').html(bookedTimesCount);
            if (bookedTimesCount == 0) {
                this.elements.$bookedTimes.append('<li class="cb-no-booked-times">' + $.cbOnlineBookingLanguage.L39 + '</li>');
            }
            this.updateTimes({
                suggestion_engine: 0
            });
        }
        else {
            $li.find('.cb-cancel-time-placeholder').html('<div class="cb-b-error">' + data.description + '</div>');
            $li.find('.cb-modal-loader').remove();
        }
    };
    CbOnlineBooking.prototype.onCancelTimeNo = function(e) {
        e.preventDefault();
        var $this = $(e.currentTarget),
            $a = $this.parent().prev();
        $this.parent().remove();
        $a.text($.cbOnlineBookingLanguage.L34).removeClass('cb-btn-disabled');
    };
    CbOnlineBooking.prototype.die = function(message, description) {
        this.elements.$content.html('<div class="cb-error"><h2>' + message + '</h2><div class="cb-error-description">' + description + '</div></div>');
        if (this.elements.$loader != null) {
            this.destroyLoader();
        }
        this.elements.$content.show();
        return;
    };
    CbOnlineBooking.prototype.onLoadFailed = function(data) {
        this.die($.cbOnlineBookingLanguage.L40, $.cbOnlineBookingLanguage.L41);
    };
    CbOnlineBooking.prototype.onError = function() {
        if (!this.model.initialized) {
            this.die($.cbOnlineBookingLanguage.L40, $.cbOnlineBookingLanguage.L41);
        }
        else {
            this.elements.$container.find('.cb-notification-bar').addClass('cb-notification-bar-shown').find('.cb-notification').html($.cbOnlineBookingLanguage.L22);
            this.elements.$weekTimesContainer.children('.cb-overlay').hide();
            this.hideModalLoading();
            if (this.elements.$bookedTimes != null) {
                this.elements.$bookedTimes.find('.cb-booked-time > .cb-modal-loader').remove();
            }
            if (this.elements.$contactForm != null) {
                this.elements.$contactForm.find('.cb-modal-loader').remove();
            }
            if (this.closeNotificationTopTimeoutID != null) {
                window.clearTimeout(this.closeNotificationTopTimeoutID);
            }
            var that = this;
            this.closeNotificationTopTimeoutID = window.setTimeout(function() {
                that.elements.$container.find('.cb-notification-bar').removeClass('cb-notification-bar-shown');
            }, 10000);
        }
    };
    CbOnlineBooking.prototype.onSessionExpired = function() {
        this.model.expired = true;
        this.elements.$modal.find('.cb-modal-body').html('<div class="cb-modal-body-content" style="display:block;"><h2>' + $.cbOnlineBookingLanguage.L40 + '</h2><div class="cb-callout cb-callout-error">' + $.cbOnlineBookingLanguage.L42 + '</div></div>');
        this.showModal();
    };
    CbOnlineBooking.prototype.onKeyDown = function(e) {
        if (e.which == 27) {
            if (!this.elements.$modal.find('.cb-modal-loader').is(':visible')) {
                this.hideModal();
            }
        }
    };
    CbOnlineBooking.prototype.onSuggestionClick = function(e) {
        e.preventDefault();
        var $target = $(e.target);
        if ($target.data('action') == 'showAllProviders') {
            this.elements.$filterDataProvider.children('a.cb-provider[data-id="A"]').trigger('click')
        }
        else if ($target.data('action') == 'changeWeek') {
            this.model.weekOffset = $target.data('week-offset');
            this.closeActiveFilter();
            this.updateTimes({
                suggestion_engine: 0
            });
        }
    };
    CbOnlineBooking.prototype.trackEvent = function(category, action, label, value) {
        gaTrackEvent('cbTracker', category, action, label, value);
        if (category != 'Ajax errors' && category != 'Unsupported browsers') {
            gaTrackEvent('clTracker', this.model.data.locations[this.model.selectedTime.location].name + ' - ' + this.model.data.activities[this.model.selectedTime.activity].name, category, action, label);
        }
    };
    $.fn.cbOnlineBooking = function(options) {
        return this.each(function() {
            var $this = $(this),
                data = $this.data('cb');
            if (!data) {
                $this.data('cb', new CbOnlineBooking(options, this));
            }
        });
    };
})(jQuery);