// Rotate Text Controller
var text_rotate = (function() {
    var TxtRotate = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };
    
    TxtRotate.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 300 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        setTimeout(function() {
            that.tick();
        }, delta);
    };
    
    window.onload = function() {
        var elements = document.getElementsByClassName('txt-rotate');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-rotate');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
                new TxtRotate(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #ffffff }";
        document.body.appendChild(css);
    };
})();




// UI Controller
var UI_controller = (function() {
    const API_KEY = 'rKoLtsaSoo5EMSgOylLbplSXZ'; // TODO: Don't forget to hide this
    const API_SECRET_KEY = 'DuJx4wEKYrV0555XF9YAbphxmHRoojWC3y91KpDESDTdTStXGE'; // TODO: Don't forget to hide this

    var DOM_strings = {
        instagram_1_img: '.event__picture--1',
        instagram_2_img: '.event__picture--2',
        instagram_3_img: '.event__picture--3',
        instagram_4_img: '.event__picture--4',
        instagram_1_title: 'event__title--1',
        instagram_2_title: 'event__title--2',
        instagram_3_title: 'event__title--3',
        instagram_4_title: 'event__title--4',
        instagram_1_link: 'event__link--1',
        instagram_2_link: 'event__link--2',
        instagram_3_link: 'event__link--3',
        instagram_4_link: 'event__link--4',
        footer_instagram_1_title: 'footer__title--1',
        footer_instagram_2_title: 'footer__title--2',
        footer_instagram_3_title: 'footer__title--3',
        footer_instagram_1_link: "footer__link--1",
        footer_instagram_2_link: "footer__link--2",
        footer_instagram_3_link: "footer__link--3",
        date_label: '.footer__date--year',
        nav_container: 'navbar__container',
        nav_toggler: 'navbar-toggler',
        filter_toggler: 'navbar__filter',
        send_btn: 'send-contact',
        send_first: 'first_name',
        send_last: 'last_name',
        send_email: 'email',
        send_message: 'message',
        nav_icon: 'navbar__icon',
        nav_logo: 'navbar__logo',
        item_1: 'nav-item--1',
        item_2: 'nav-item--2',
        item_3: 'nav-item--3',
        item_4: 'nav-item--4',
        item_5: 'nav-item--5',
        item_6: 'nav-item--6',
        link_1: 'nav-link--1',
        link_2: 'nav-link--2',
        link_3: 'nav-link--3',
        link_4: 'nav-link--4',
        link_5: 'nav-link--5',
        link_6: 'nav-link--6',
    };
    return { 
        display_method: function() {
            var now, year;
            now = new Date();
            year = now.getFullYear();
            document.querySelector(DOM_strings.date_label).textContent = year;
        },
        dark_nav: function() {
            document.getElementById(DOM_strings.nav_container).className = "navbar__container navbar__container--white";
            document.getElementById(DOM_strings.nav_toggler).className = "navbar-toggler navbar-toggler--dark";
            document.getElementById(DOM_strings.nav_icon).className = "navbar__icon navbar__icon--dark";
            document.getElementById(DOM_strings.nav_logo).src = "img/young-sons-logo-black.png";
            document.getElementById(DOM_strings.item_1).className = "nav-item nav-item--dark";
            document.getElementById(DOM_strings.item_2).className = "nav-item nav-item--dark";
            document.getElementById(DOM_strings.item_3).className = "nav-item nav-item--dark";
            document.getElementById(DOM_strings.item_4).className = "nav-item nav-item--dark";
            document.getElementById(DOM_strings.item_5).className = "nav-item nav-item--dark";
            document.getElementById(DOM_strings.item_6).className = "nav-item nav-item--dark";
            document.getElementById(DOM_strings.link_1).className = "nav-link nav-link--dark";
            document.getElementById(DOM_strings.link_2).className = "nav-link nav-link--dark";
            document.getElementById(DOM_strings.link_3).className = "nav-link nav-link--dark";
            document.getElementById(DOM_strings.link_4).className = "nav-link nav-link--dark";
            document.getElementById(DOM_strings.link_5).className = "nav-link nav-link--dark";
            document.getElementById(DOM_strings.link_6).className = "nav-link nav-link--dark";
        },
        light_nav: function() {
            document.getElementById(DOM_strings.nav_container).className = "navbar__container";
            document.getElementById(DOM_strings.nav_toggler).className = "navbar-toggler";
            document.getElementById(DOM_strings.nav_icon).className = "navbar__icon";
            document.getElementById(DOM_strings.nav_logo).src = "img/young-sons-logo-white.png";
            document.getElementById(DOM_strings.item_1).className = "nav-item";
            document.getElementById(DOM_strings.item_2).className = "nav-item";
            document.getElementById(DOM_strings.item_3).className = "nav-item";
            document.getElementById(DOM_strings.item_4).className = "nav-item";
            document.getElementById(DOM_strings.item_5).className = "nav-item";
            document.getElementById(DOM_strings.item_6).className = "nav-item";
            document.getElementById(DOM_strings.link_1).className = "nav-link";
            document.getElementById(DOM_strings.link_2).className = "nav-link";
            document.getElementById(DOM_strings.link_3).className = "nav-link";
            document.getElementById(DOM_strings.link_4).className = "nav-link";
            document.getElementById(DOM_strings.link_5).className = "nav-link";
            document.getElementById(DOM_strings.link_6).className = "nav-link";
        },
        display_instagram: function(photos) {
            document.querySelector(DOM_strings.instagram_1_img).style.backgroundImage = "linear-gradient(2deg, rgba(51, 51, 51, 0.4) 35%, rgba(15, 15, 15, 0.1) 50%), url(" + photos[0]["displayUrl"] + ")";
            document.getElementById(DOM_strings.instagram_1_title).innerHTML = photos[0]["caption"];
            document.getElementById(DOM_strings.instagram_1_link).href = photos[0]["url"];
            document.querySelector(DOM_strings.instagram_2_img).style.backgroundImage = "linear-gradient(2deg, rgba(51, 51, 51, 0.4) 35%, rgba(15, 15, 15, 0.1) 50%), url(" + photos[1]["displayUrl"] + ")";
            document.getElementById(DOM_strings.instagram_2_title).innerHTML = photos[1]["caption"];
            document.getElementById(DOM_strings.instagram_2_link).href = photos[1]["url"];
            document.querySelector(DOM_strings.instagram_3_img).style.backgroundImage = "linear-gradient(2deg, rgba(51, 51, 51, 0.4) 35%, rgba(15, 15, 15, 0.1) 50%), url(" + photos[2]["displayUrl"] + ")";
            document.getElementById(DOM_strings.instagram_3_title).innerHTML = photos[2]["caption"];
            document.getElementById(DOM_strings.instagram_3_link).href = photos[2]["url"];
            document.querySelector(DOM_strings.instagram_4_img).style.backgroundImage = "linear-gradient(2deg, rgba(51, 51, 51, 0.4) 35%, rgba(15, 15, 15, 0.1) 50%), url(" + photos[3]["displayUrl"] + ")";
            document.getElementById(DOM_strings.instagram_4_title).innerHTML = photos[3]["caption"];
            document.getElementById(DOM_strings.instagram_4_link).href = photos[3]["url"];

            document.getElementById(DOM_strings.footer_instagram_1_title).innerHTML = photos[0]["caption"];
            document.getElementById(DOM_strings.footer_instagram_1_link).href = photos[0]["url"];
            document.getElementById(DOM_strings.footer_instagram_2_title).innerHTML = photos[1]["caption"];
            document.getElementById(DOM_strings.footer_instagram_2_link).href = photos[1]["url"];
            document.getElementById(DOM_strings.footer_instagram_3_title).innerHTML = photos[2]["caption"];
            document.getElementById(DOM_strings.footer_instagram_3_link).href = photos[2]["url"];
        },
        get_DOM_strings: function() {
            return DOM_strings;
        },
    };
})();


// Event Controller
var event_controller = (function() {
    return {
        scroll_event: function() { 
            return document.documentElement.scrollTop
        },
        get_toggler: function(DOM) { 
            let elements = document.getElementsByClassName(DOM.nav_toggler);
            result = elements[0].getAttribute('aria-expanded');
            if (result === 'true') {
                return true;
            } else {
                return false;
            }
        },
        get_instagram: function(callback) {
            const instagramRegExp = new RegExp(/<script type="text\/javascript">window\._sharedData = (.*);<\/script>/)

            const fetchInstagramPhotos = async (accountUrl) => {
                const response = await axios.get(accountUrl)
                const json = JSON.parse(response.data.match(instagramRegExp)[1])
                const edges = json.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges.splice(0, 4)
                const photos = edges.map(({ node }) => {
                    return {
                    url: `https://www.instagram.com/p/${node.shortcode}/`,
                    thumbnailUrl: node.thumbnail_src,
                    displayUrl: node.display_url,
                    caption: node.edge_media_to_caption.edges[0].node.text
                    }
                })
                return photos
            }
            (async () => {
                try {
                    const photos = await fetchInstagramPhotos('https://www.instagram.com/waydecrawford/')
                    setTimeout(function(){
                        callback(photos);
                    }, 2000);
              } catch (e) {
                console.error('Fetching Instagram photos failed', e)
              }
            })()
        },
        send_info: function(first, last, email, msg) {
            console.log(first, last, email, msg);

            let valid = true;
            valid &= fieldValidation(first, isNotEmpty)
            valid &= fieldValidation(last, isNotEmpty)
            valid &= fieldValidation(email, isNotEmpty)
            if (valid) {
                console.log("it was true")
            } else {
                alert("Your messege couldn't send.")
            }
        },
    };
})();



// Global App Controller
var app_controller = (function(event_ctr, UI_ctr) { 
    let DOM = UI_ctr.get_DOM_strings();
    if (event_ctr.scroll_event() > 400) {
        UI_ctr.dark_nav();
    };
    var setup_event_listeners = function() {
        document.getElementById(DOM.nav_toggler).addEventListener('click', ctrl_nav_toggle);
        document.getElementById(DOM.filter_toggler).addEventListener('click', ctrl_nav_toggle);
        document.getElementById(DOM.send_btn).addEventListener('click', send_contact);
        window.onscroll = function() {
            let scroll_top = event_ctr.scroll_event();
            let result = event_ctr.get_toggler(DOM);
            if (scroll_top > 400) {
                if (result) {
                    UI_ctr.dark_nav();
                    document.getElementById(DOM.nav_icon).className = "navbar__icon navbar__icon--dark navbar__icon--clicked";
                } else {
                    UI_ctr.dark_nav();
                };
            } else if (scroll_top < 400) {
                if (result) {
                    UI_ctr.dark_nav();
                    document.getElementById(DOM.nav_icon).className = "navbar__icon navbar__icon--dark navbar__icon--clicked";
                } else {
                    UI_ctr.light_nav();
                };
            };
        };
    };
    var ctrl_nav_toggle = function() {
        let scroll_top = event_ctr.scroll_event();
        let result = event_ctr.get_toggler(DOM);
        if (result) {
            if (scroll_top > 400) {
                UI_ctr.dark_nav();
                document.getElementById(DOM.filter_toggler).className = "navbar__filter navbar__filter--closed";
            } else {
                UI_ctr.light_nav();
                document.getElementById(DOM.filter_toggler).className = "navbar__filter navbar__filter--closed";
            }
        } else {
            if (scroll_top < 400) {
                UI_ctr.dark_nav();
                document.getElementById(DOM.nav_icon).className = "navbar__icon navbar__icon--dark navbar__icon--clicked";
                document.getElementById(DOM.filter_toggler).className = "navbar__filter navbar__filter--open";
            } else {
                UI_ctr.dark_nav();
                document.getElementById(DOM.nav_icon).className = "navbar__icon navbar__icon--dark navbar__icon--clicked";
                document.getElementById(DOM.filter_toggler).className = "navbar__filter navbar__filter--open";
            }
        };
    };
    var setup_instagram = function() {
        event_ctr.get_instagram(function(photos) {
            UI_ctr.display_instagram(photos);
        });
    };
    var send_contact = function() {
        console.log("Clicked");
        let first = document.getElementById(DOM.send_first).value;
        let last = document.getElementById(DOM.send_last).value;
        let email = document.getElementById(DOM.send_email).value;
        let msg = document.getElementById(DOM.send_message).value;
        event_ctr.send_info(first, last, email, msg);
    };
    return {
        init: function() {
            UI_ctr.display_method();
            setup_instagram();
            setup_event_listeners();
        }
    };
})(event_controller, UI_controller);
app_controller.init();



