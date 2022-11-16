var documentHasScroll = function() {
    return window.innerHeight <= document.body.offsetHeight;
};
var keepFooter = function(documentHasScroll){
    if (!document.getElementById("layout-footer")){
        return;
    }

    if(documentHasScroll){
        document.getElementById("layout-footer").classList.remove('fixed-bottom');
    }else{
        document.getElementById("layout-footer").classList.add('fixed-bottom');
    }
}



$(document).ready(function() {
	var loggedInMenuNavbar = $('.navbar-loggedin-user');
	loggedInMenuNavbar.find('#menu').removeAttr('id');

	$('body').on('click', '.work_packages .accordion-toggle, #mycomponentpartners .accordion-toggle, .messages .accordion-toggle', function () {
		if ($(this).next(".accordion-content").is(':visible')) {
			$(this).next(".accordion-content").slideUp(300);
			$(this).children().find(".plusminus").text('+');
			$(this).children().find(".showmembers").text('Show members');
			$(this).children(".plusminus").html('<span class="plus"></span>');
		} else {
			$(this).next(".accordion-content").slideDown(300);
			$(this).children().find(".plusminus").text('-');
			$(this).children().find(".showmembers").text('Hide members');
			$(this).children(".plusminus").html('<span class="minus"></span>');
		}
	});

	$('.dropdown-menu').removeAttr('id');

	$('.tabs').each(function(){
		// For each set of tabs, we want to keep track of
		// which tab is active and its associated content
		var $active, $content, $links = $(this).find('a');
		var speed = "fast";
		var activeTab = $(location.hash);
		// If the location.hash matches one of the links, use that as the active tab.
		// If no match is found, use the first link as the initial active tab.
		$active = $($links.filter("[href=\'"+location.hash+"\']")[0] || $links[0]);

		$active.addClass('active');

		$content = $($active[0].hash);

		// Hide the remaining content
		$links.not($active).each(function () {
			$(this.hash).hide();
		});

		if(activeTab.length){
			$content.slideDown(speed);
			//scroll to element
			$('html, body').animate({
				scrollTop:  activeTab.offset().top - $('header').height()
			}, speed);
		}

		// Bind the click event handler
		$(this).find("a").click(function (e) {
			if($(this).hasClass('active')) {
				$content.slideDown({
					scrollTop: $content.offset().top - $('header').height()
				}, speed);
				var screenSize = getScreenSize();
				if (screenSize.width < 800) {
					// scroll to element
					$('html, body').animate({
						scrollTop: $content.offset().top - $('header').height() + 300  // mobile
					}, speed);
				}else{
					//scroll to element icons top
					$('html, body').animate({
						scrollTop:  $content.offset().top - $('header').height() + 300
					}, speed);
				}
				e.preventDefault();
				return false;
			}
			// Make the old tab inactive.
			$active.removeClass('active');
			// $content.slideUp({
			// 	scrollTop: $content.offset().top - $('header').height() - $('.left_sidebar').height()
			// }, speed);
			$content.hide();

			// Update the variables with the new link and content
			$active = $(this);
			$content = $(this.hash);

			location.hash = $active[0].hash;

			// Make the tab active.
			$active.addClass('active');
			$content.slideDown({
				scrollTop: $content.offset().top - $('header').height()
			}, speed);
			// var screenSize = getScreenSize();
			// if (screenSize.width < 800) {
			// 	// scroll to element
			// 	$('html, body').animate({
			// 		scrollTop: $content.offset().top - $('header').height() + 300 // mobile
			// 	}, speed);
			// }else{
			// 	//scroll to element icons top
			// 	$('html, body').animate({
			// 		scrollTop:  $content.offset().top - $('header').height() + 300
			// 	}, speed);
			// }

			// Prevent the anchor\'s default click action
			e.preventDefault();
		});
	});

	$('#mycomponentpartners .btn.btn-primary').hide();


	$('.advisory-board-container2 .card-body .body').each(function(){
		var countParagraphs = $(this).find('p').length;
		if(countParagraphs > 1) {
			$(this).find('p').first().append('<div class="dorsal">Read more</div>');
			$(this).find('p:not(:first)').wrapAll("<div class='toogle-contact-paragraphs'></div>")
		}
	});

	$('.dorsal').click(function () {
		var link = $(this);
		link.parent().parent().find('.toogle-contact-paragraphs').slideToggle('slow', function() {
			if ($(this).is(':visible')) {
				link.text('Read less');
			} else {
				link.text('Read more');
			}
		});

	});

    $('<div class="col-xs-12 col-sm-3 card internal no-border" style="margin-bottom: 15px">\n' +
        '<a class="folder-background" target="_blank" style="display:flex; background: url(https://showcase-project.eu/storage/app/media/publications-table.svg) center center no-repeat; background-size: 150px;" href="https://docs.google.com/spreadsheets/d/1O_RKlOjrAH9N7h5L6odYp-HZ_YbcUTUnTAQWC5T2c7Y/edit#gid=0" title="Publication table"></a>\n' +
        '<h3 class="card-header"><a href="https://docs.google.com/spreadsheets/d/1O_RKlOjrAH9N7h5L6odYp-HZ_YbcUTUnTAQWC5T2c7Y/edit#gid=0" target="_blank" title="Publication table">Publication table</a></h3>\n' +
        '</div>').insertAfter($('.card.internal').first());
        
    $('<div class="col-xs-12 col-sm-3 card internal no-border" style="margin-bottom: 15px">\n' +
		'<a class="folder-background" style="display:flex; background: url(https://showcase-project.eu/storage/app/media/dissemination-forms.svg) center center no-repeat; background-size: 100px; height: 200px" href="/internal-repository/dissemination-report-forms" title="Reporting forms"></a>\n' +
		'<h3 class="card-header"><a href="/internal-repository/dissemination-report-forms" title="Reporting forms">Reporting forms</a></h3>\n' +
		'</div>').insertAfter($('.card.internal:nth-child(2)'));
		
	$('<div class="col-xs-12 col-sm-3 card internal no-border" style="margin-bottom: 15px">\n' +
        '<a class="folder-background" target="_blank" style="display:flex; background: url(https://showcase-project.eu/storage/app/media/Relevant-content.svg) center center no-repeat; background-size: 150px;" href="https://docs.google.com/spreadsheets/d/1keGpeMxdG6xHkkoyLiZhM7K-pMR-wpfNPRNr4_8QHNA/edit#gid=0" title="Relevant content"></a>\n' +
        '<h3 class="card-header"><a href="https://docs.google.com/spreadsheets/d/1keGpeMxdG6xHkkoyLiZhM7K-pMR-wpfNPRNr4_8QHNA/editt#gid=0" target="_blank" title="Relevant content">Relevant content</a></h3>\n' +
        '</div>').insertAfter($('.card.internal').last());

	// $('#libraryForm select[name="Filter[type]"]').change(function(){
    //     $('#removeDivId').remove();
    //     if($(this).find('option:selected').val() == 1){
    //         $('#partialLibraries').before('<div style="margin-top: 40px; margin-bottom: 40px;" id="removeDivId">Please keep in mind that the content of all of SHOWCASE\'s deliverables is subject to change.</div>');
    //     }else{
    //         $('#removeDivId').remove();
    //     }
    // });




});



function encodeURIObject(data){
    return Object.keys(data).map(function (i) {
        return encodeURIComponent(i) + '=' + encodeURIComponent(data[i])
    }).join('&');
}

function appendProfile() {
    $(document).on('profile', function (e) {
        var headerNavbarNav = $('#headerNavbarNav');
        var li = '<li class="nav-item"><a href="/profile" target = "_self">Profile</a></li >';
        headerNavbarNav.find('>ul').append(li);
    });
}
function appendSignIn(){
    $(document).on('signin', function (e) {
        var headerNavbarLogin = $('#headerNavbarLogin');
        var li = '<li class="nav-item sign-in"><a href="/login" target = "_self">Login</a></li >';
		headerNavbarLogin.find('>ul').append(li);
		var menu = $('#menuToggle');
		menu.find('>ul').append(li);
    });
}

function appendSignOut() {
    $(document).on('signout', function (e) {
        var headerNavbarNav = $('#headerNavbarLogin');
        var li = '<li class="nav-item  sign-in"><a data-request="onLogout" data-request-data="redirect: \'/\'">Logout</a></li >';
        headerNavbarNav.find('>ul').append(li);
		var menu = $('#menuToggle');
		menu.find('>ul').append(li);
    });
}

function initAccordeon(pElem) {
	$('body').on('click', '.accordion-toggle', function () {
		if ($(this).next(".accordion-content").is(':visible')) {
			$(this).next(".accordion-content").slideUp(300);
			$(this).children(".plusminus").html('<span class="plus"></span>');
		} else {
			$(this).next(".accordion-content").slideDown(300);
			$(this).children(".plusminus").html('<span class="minus"></span>');
		}
	});
}

function isBreakpointLarge() {
    return window.innerWidth <= 991;
}

function init() {
    window.addEventListener('resize', function () {
        if (isBreakpointLarge()) {
            $('#card-carousel').slick('unslick');
        } else {
            if (typeof cardCarousel === 'function') {
                cardCarousel({
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    autoplay: true,
                    autoplaySpeed: 6000,
                    prevArrow: '<i class="slick-prev pr p-back"/>',
                    nextArrow: '<i class="slick-next pr p-forward"/>',
                });
             }
        }
        keepFooter(documentHasScroll());

    });
    document.addEventListener('DOMContentLoaded', function () {
        if (!isBreakpointLarge()) {
            if (typeof cardCarousel === 'function') {
                cardCarousel({
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    autoplay: true,
                    autoplaySpeed: 6000,
                    prevArrow: '<i class="slick-prev pr p-back"/>',
                    nextArrow: '<i class="slick-next pr p-forward"/>',
                });
            }
        }
        keepFooter(documentHasScroll());

    });
    // appendProfile()
    appendSignIn()
    appendSignOut()
}

function onPartners(pCode) {
	$.request('onPartners', {
		update: { 'components/partners_list': '#mycomponentpartners',
		},
		data: {
			code: pCode
		},
	}).then(response => {
		$('html, body').animate({
			scrollTop: $("#mycomponentpartners").offset().top - 100
		}, 1000);
		var tooltip = document.getElementById("tooltip");
		tooltip.classList.remove("active");

		$('#mycomponentpartners .coordinator_info .body').each(function(){
			var countParagraphs = $(this).find('p').length;
			if(countParagraphs > 1) {
				$(this).find('p').first().append('<div class="dorsal">Read more</div>');
				$(this).find('p:not(:first)').wrapAll("<div class='toogle-contact-paragraphs'></div>")
			}
		});

		$('.dorsal').click(function () {
			var link = $(this);
			link.parent().parent().find('.toogle-contact-paragraphs').slideToggle('slow', function() {
				if ($(this).is(':visible')) {
					link.text('Read less');
				} else {
					link.text('Read more');
				}
			});

		});

	});
}


$(window).scroll(function(){
	var tooltip = document.getElementById("tooltip");
	if(tooltip){
		tooltip.classList.remove("active");
	}
});

function handleSVGMapMouseMove(event) {
	var countryCode = $(event.target).attr('country_code');
	var tooltip = document.getElementById("tooltip");
	if (!countryCode) {
		countryCode = $(event.target).parent().attr('country_code');
	}

	switch (countryCode) {
		case "AF":
		case "AX":
		case "AL":
		case "DZ":
		case "AS":
		case "AD":
		case "AD":
		case "AO":
		case "AI":
		case "AQ":
		case "AG":
		case "AR":
		case "AM":
		case "AW":
		case "AT":
		case "AZ":
		case "BS":
		case "BH":
		case "BD":
		case "BB":
		case "BY":
		case "BE":
		case "BZ":
		case "BJ":
		case "BM":
		case "BT":
		case "BO":
		case "BQ":
		case "BA":
		case "BW":
		case "BV":
		case "BR":
		case "IO":
		case "BN":
		case "BG":
		case "BF":
		case "BI":
		case "KH":
		case "CM":
		case "CV":
		case "KY":
		case "CF":
		case "TD":
		case "CL":
		case "CN":
		case "CX":
		case "CC":
		case "CO":
		case "KM":
		case "CG":
		case "CD":
		case "CK":
		case "CR":
		case "CI":
		case "HR":
		case "CU":
		case "CW":
		case "CY":
		case "CZ":
		case "DK":
		case "DJ":
		case "DM":
		case "DO":
		case "EC":
		case "EG":
		case "SV":
		case "GQ":
		case "ER":
		case "EE":
		case "ET":
		case "FK":
		case "FO":
		case "FI":
		case "FJ":
		case "GF":
		case "PF":
		case "TF":
		case "GA":
		case "GM":
		case "GE":
		case "GH":
		case "GI":
		case "GR":
		case "GL":
		case "GD":
		case "GP":
		case "GU":
		case "GT":
		case "GG":
		case "GN":
		case "GW":
		case "GY":
		case "HT":
		case "HM":
		case "VA":
		case "HN":
		case "HK":
		case "IS":
		case "ID":
		case "IR":
		case "IQ":
		case "IM":
		case "IL":
		case "IT":
		case "JM":
		case "JP":
		case "JE":
		case "JO":
		case "KZ":
		case "KE":
		case "KI":
		case "KP":
		case "KR":
		case "KW":
		case "KG":
		case "LA":
		case "LV":
		case "LB":
		case "LS":
		case "LR":
		case "LY":
		case "LI":
		case "LT":
		case "LU":
		case "MO":
		case "MK":
		case "MG":
		case "MW":
		case "MY":
		case "MV":
		case "ML":
		case "MT":
		case "MH":
		case "MQ":
		case "MR":
		case "MU":
		case "YT":
		case "MX":
		case "FM":
		case "MD":
		case "MC":
		case "MN":
		case "ME":
		case "MS":
		case "MA":
		case "MZ":
		case "MM":
		case "NA":
		case "NR":
		case "NP":
		case "NC":
		case "FR":
		case "IN":
		case "NL":
		case "HU":
		case "IE":
		case "CA":
		case "NZ":
		case "DE":
		case "NI":
		case "NE":
		case "NG":
		case "NU":
		case "NF":
		case "MP":
		case "NO":
		case "OM":
		case "PK":
		case "PW":
		case "PS":
		case "PA":
		case "PG":
		case "PY":
		case "PE":
		case "PH":
		case "PN":
		case "PT":
		case "PR":
		case "QA":
		case "RE":
		case "RU":
		case "RW":
		case "BL":
		case "SH":
		case "KN":
		case "LC":
		case "MF":
		case "PM":
		case "VC":
		case "WS":
		case "SM":
		case "ST":
		case "SA":
		case "SN":
		case "RS":
		case "SC":
		case "SL":
		case "SG":
		case "SX":
		case "SK":
		case "SI":
		case "SB":
		case "SO":
		case "ZA":
		case "GS":
		case "LK":
		case "SD":
		case "SR":
		case "SJ":
		case "SZ":
		case "SE":
		case "SY":
		case "TW":
		case "TJ":
		case "TZ":
		case "TH":
		case "TL":
		case "TG":
		case "TK":
		case "TO":
		case "TT":
		case "TN":
		case "TR":
		case "TM":
		case "TC":
		case "TV":
		case "UG":
		case "UA":
		case "AE":
		case "UM":
		case "UY":
		case "UZ":
		case "VU":
		case "VE":
		case "VN":
		case "VG":
		case "VI":
		case "WF":
		case "EH":
		case "YE":
		case "ZM":
		case "ZW":
		case "US":
		case "GB":
		case "ES":
		case "AU":
		case "RO":
		case "CH":
		case "PL":
			break;
		default:
			return tooltip.classList.remove("active");
	}

	var x = event.clientX;
	var y = event.clientY;

	tooltip.style.left = (x + 20) + "px";
	tooltip.style.top = (y - 20) + "px";

	tooltip.innerHTML = $(event.target).attr('title');
	tooltip.classList.add("active");

}


function initMailingTooltip(){
    var searchStr = '';
    $('.group-holder').eq(0).find('.inputWithTooltip span').each(function(i, obj) {
        $('<img src="/storage/app/media/CMS_icons_groups.svg" style="max-width: 16px; margin-right: 5px;" class="icon mailing_list_tooltip_'+i+'" />').insertBefore(this);
        searchStr = $.trim($(obj).text());
        //groups
        $.request('onFetchMailingList', {
            update: { 'mailing_list': '#mailing_list_tooltip_content_'+i,
            },
            data: {
                search_str: searchStr
            },
        }).then(response => {
            $('<script>createTippy(\'.row:nth-of-type(3) .row:nth-of-type(2) .mailing_list_tooltip_' + i + '\', {' +
                'placement: \'left\',\n' +
                'content: \'' + response.mailing_list + '\'})</script>').insertAfter(this);
        });
    });
    $('.group-holder').eq(1).find('.inputWithTooltip span').each(function(i, obj) {
        $('<img src="/storage/app/media/CMS_icons_individuals.svg" style="max-width: 16px; margin-right: 5px;" class="icon mailing_list_tooltip_individuals_'+i+'" />').insertBefore(this);
        searchStr = $.trim($(obj).text());
        //individuals
        $.request('onFetchSingleMail', {
            update: { 'individual_email': '#individual_tooltip_content_'+i,
            },
            data: {
                search_str: searchStr
            },
        }).then(response => {
            $('<script>createTippy(\'.row:nth-of-type(4) .row:nth-of-type(2) .mailing_list_tooltip_individuals_' + i + '\', {' +
                'placement: \'left\',\n' +
                'content: \'' + response.individual_email + '\'})</script>').insertAfter(this);
        });
    });
    
    $('.group-holder').eq(0).prepend( "<p style='margin-left: 10px; width: 100%;'>Prior to sending group emails, please make sure that all individuals you want to contact have been included in the respective group by hovering over the group icon.</p><p></p>" );
    $('.group-holder').eq(1).prepend( "<p style='margin-left: 10px; width: 100%;'>To see each person’s email, hover over the account icon.</p><p></p>" );
}

function createTippy(element, options) {
    return new Promise(resolve => {
        tippy(element, Object.assign({}, {
            allowHTML: true,
            interactive: true,
            animation: 'scale',
            theme: 'light',
        }, options));
        resolve();
    });
}

init()
