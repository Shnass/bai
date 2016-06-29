"use strict";
$(function () {
    /*** CHECK WIDTH ***/
    function if_mobile() {
        if ($(window).width() < 760) return true;
    }

    function if_tab() {
        if ($(window).width() < 1001) return true;
    }

    /*** side bar bavi slider ***/
    $('.aside_navi_slider').each(function () {
        var $this = $(this);
        $this.data('linkedEl', $this.bxSlider({
            auto: false,
            controls: true,
            pager: false,
            pause: 6500,
            autoHover: true,
            speed: 500,
            adaptiveHeight: true
        }));
    })

    $('.sort_selected').click(function (e) {
        e.preventDefault();
        $(this).siblings('.output_filter').slideToggle();
    })

    $('.output_filter li').click(function (e) {
        e.preventDefault();
        $(this).parents('.output_filter').find('.selected').removeClass('selected');
        $(this).find('a').addClass('selected').parents('.output_filter').siblings('.sort_selected').find('span').text($(this).text());
        if (if_mobile()) {
            $(this).find('a').addClass('selected').parents('.output_filter').slideUp();
        }
        console.log('SOME AJAX EVENT');
    })


    function voteCount(x) {
        x.css("width", (parseInt(x.text())) + '%');
    }

    $('.vote_progress span').each(function () {
        voteCount($(this));
    })

    $('.vote_module .q .btn').click(function (e) {
        e.preventDefault();
        $(this).parents('.q').slideUp().siblings('.results').slideDown();
    })


    if (if_tab()) {
        $('.aside_testimonial_list').each(function () {
            var $this = $(this);
            $this.data('linkedEl', $this.bxSlider({
                auto: true,
                controls: true,
                pager: false,
                pause: 6500,
                autoHover: true,
                speed: 500,
                adaptiveHeight: true
            }));
        })
    }


    $('.filters_more .call_more').click(function(e){
        e.preventDefault();
        $(this).siblings('ul').show()
    })
    $('.filters_more ul li').click(function(e){
        e.preventDefault();
        $(this).parents('ul').hide().parents('.filters_more').find('.call_more span').text($(this).text())
    })



    /*** CUSTOM CHECKBOX ***/
    $('.cC').click(function (e) {
        e.preventDefault();
        if ($(this).find(':radio')) $("input[name='" + $(this).find('input').attr('name') + "']").prop('checked', false).parents('.cC').removeClass('checked');
        $(this).toggleClass('checked').find('input').click();
        console.log('OPTION CHANGED ' + $(this).find('input').val());
    }).each(function () {
        if ($(this).find('input').is(':checked')) $(this).addClass('checked');
    })

    $('.cC input').click(function (e) {
        e.stopPropagation()
    })
    $('.cC a').click(function (e) {
        e.stopPropagation()
    })


    $('.tabs_controls>*').click(function (e) {
        e.preventDefault();
        $(this).addClass('on').siblings().removeClass('on');
        var base = $(this).parents('.tabs');
        if ($(this).parents('.tabs_controls').is('[data-src]')) base = $('#' + $(this).parents('.tabs_controls').attr('data-src'));
        base.find('.tab:eq(' + $(this).index() + ')').addClass('on').siblings().removeClass('on');
    })
    $('.tabs_controls').each(function () {
        $(this).children().first().click();
    })


    function close_pop(pop) {
        var pop = pop || $('.pop_up:visible'), glow = $('.pop_fade');
        $('html').removeClass('pop_called');
        pop.hide();
        glow.hide();
    }

    $('.pop_up_close, .pop_fade').click(function (e) {
        e.preventDefault();
        var pop = ($(this).parents('.pop_up').length) ? $(this).parents('.pop_up') : $('.pop_up:visible');
        close_pop(pop);
    })

    $('[data-pop-link]').click(function (e) {
        e.preventDefault();
        var pop = $('.pop_up[data-pop="' + $(this).attr('data-pop-link') + '"]');
        $('html').addClass('pop_called');
        $('.pop_fade').show().css('height', $(document).height());
        pop.show().css({'top': $(window).scrollTop() + $(window).height() / 2 - pop.height() / 2});
    })


    /*** MISC ACCORDION ***/
    $('.acc_h').click(function (e) {
        e.preventDefault();
        $(this).parents('.acc').toggleClass('opened').find('.acc_c').slideToggle(
            function () {
                if ($(this).parents('.acc').hasClass('opened') && $(this).parents('.acc').find('.filter_tip').length) {
                    $(this).parents('.acc').find('.acc_c').css('min-height', '170px');
                }
                else {
                    $(this).parents('.acc').find('.acc_c').css('min-height', 'none');
                }
            }
        );
    })

    $('.acc_h a').click(function (e) {
        e.stopPropagation();
    })


    /*** FOCUSING THE SEARCH BAR  ***/
    $('.page_header_search input').focus(function () {
        $(this).parents('.page_header_search').addClass('focus')
    }).blur(function () {
        $(this).parents('.page_header_search').removeClass('focus')
    })


    var cities = [
        "Каменногорск",
        "Кикерино",
        "Кингисепп",
        "Кириши",
        "Кировск",
        "Кобринское",
        "Колпино",
        "Коммунар",
        "Кронштадт",
        "Вознесенье",
        "Волосово",
        "Волхов",
        "Всеволожск",
        "Выборг",
        "Вырица",
        "Высоцк",
        "Павловск",
        "Парголово",
        "Петродворец",
        "Пикалёво",
        "Подпорожье",
        "Приозерск",
        "Пушкин"
        ];
        $( ".cities_select" ).autocomplete({
          source: cities
        });



    /*** DROP MENUS ***/
    $('.page_header_location_actual').click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('[data-navi-type="city_navi"]').slideToggle().siblings('[data-navi-type]').slideUp();
        $('html').toggleClass('navicalled')
    })
    $('.page_navigation_toggle').click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (if_mobile()) {
            $(this).toggleClass('clicked');
            $('.page_navigation_in').slideToggle();
        }
        else {
            $('[data-navi-type="full_navi"]').slideToggle().siblings('[data-navi-type]').slideUp();
            $('html').toggleClass('navicalled')
        }
    })
    $('[data-navi-type]').click(function (e) {
        e.stopPropagation();
    })
    $('html').click(function () {
        //e.preventDefault()
        if ($(this).hasClass('navicalled')) {
            $('[data-navi-type]').slideUp();
            $('html').removeClass('navicalled')
        }
    })

    /*** CUSTOM SELECT  ***/
    $.widget("custom.curselect", $.ui.selectmenu, {
        _renderItem: function (ul, item) {
            ul.addClass('cs_select_short_ul');
            var li = $("<li>", {text: item.label});
            return li.appendTo(ul);
        }
    });
    $(".curselect_cs").curselect({
        change: function (event, ui) {
            console.log('SELECT CHANGED ' + ui.item.value);
            $(ui.item.element.context.parentElement).change().addClass('changed');
            //.change();
        }
    }).curselect('widget').addClass('cs_select_short_btn');
    

    //$(function () {
        $('.curselect').wrap('<div class="select_place">').ikSelect({
        syntax: '<div class="ik_select_link"><div class="ik_select_link_inner"><span class="ik_select_link_text"></span></div></div><div class="ik_select_dropdown"><div class="ik_select_list"></div></div>',
        customClass: 'intro-select2',
        extractLink: true,
        ddMaxHeight: 1000,
        equalWidths: true,
        //autoWidth: false,
        onShow: function (inst) {
            console.log(inst);
            if($(inst.el).parents('.filter_small').length){
               $(inst.$dropdown).addClass('opts_small');
               //.addClass('opt_small')
            }
            // ik_select_link_inner
            // $linkText

            inst.$dropdown.css({
                top: inst.$link.offset().top - inst.$hover.position().top,
                "width": inst.$link.width()
            });
            setTimeout(function () {
                inst.$link.add(inst.$dropdown).addClass('transition');
                inst.$link.add(inst.$dropdown).addClass('animate');
            }, 0);
        },
        onHide: function (inst) {
            inst.$link.add(inst.$dropdown).removeClass('animate');
            inst.$link.add(inst.$dropdown).removeClass('transition');
        },
        onKeyDown: function (inst, keycode) {
            // if (keycode === 40 || keycode === 38) {
            //     inst.$dropdown.css({
            //         top: inst.$link.offset().top - inst.$hover.position().top
            //     });
            //     inst._makeOptionActive(inst.hoverIndex, true);
            // }
        }
    });
    //});

    //$(".sel_placeholder").curselect('widget').addClass('placeholdered');


    if (!if_mobile()) {
        $('.bank_address_units').jScrollPane();
    }
    $('.bank_address_unit').click(function () {
        $(this).addClass('current').siblings().removeClass('current')
    });

    $('.output_scrl').jScrollPane();

    $('.rated').each(function () {
        var cf = 1;
        if ($(this).parents('.rate').hasClass('rate10')) {
            cf = 2
        }
        ;
        $(this).width(parseInt($(this).parents('.rate').width() / 5 * parseFloat($(this).text()) / cf) + 'px');
    })

    $('.rate_select li').click(function (e) {
        e.preventDefault();
        $(this).addClass('selected').siblings().removeClass('selected');
        $(this).find('input').click()
    })

    $('.rate_select li input').click(function(e){
        e.stopPropagation()
    })

    $('.btn_submiting_slim').click(function (e) {
        e.preventDefault();
        $(this).fadeOut().next('.testimonial_form').slideDown();
    })


    $('.local_link_tell').click(function (e) {
        e.preventDefault();
        $(this).parents('.news_testimonial').find('.comment_form').slideToggle();
    })

    $('input.autonum').autoNumeric('init', {aSep: ' ', aDec: '.', mDec: 0});

    /*** PRICE SELECTION  ***/
    $(".sum_selection").each(function () {

        $(this).slider({
            range: "min",
            min: parseInt($(this).attr('data-min').trim()),
            max: parseInt($(this).attr('data-max').trim()),
            value: parseInt($(this).attr('data-min').trim()),
            step: parseInt($(this).attr('data-max').trim()) / 10,
            slide: function (event, ui) {
                var $input = $(this).parents('.sum_ammount_select').find('input.autonum');
                $input.autoNumeric('set', ui.value);
            },
            stop: function (event, ui) {
                var $input = $(this).parents('.sum_ammount_select').find('input.autonum');
                $input.trigger('change');
            },
            create: function (event, ui) {
                var $input = $(this).parents('.sum_ammount_select').find('input.autonum');
                $(this).slider('value', parseInt($input.autoNumeric('get')));
            }
        });
    })

    $(document).on('submit', 'form.with-autonum', function (evt) {
        var form = $(this);
        $('input.autonum').each(function (i) {
            var self = $(this);
            try {
                var v = self.autoNumeric('get');
                self.autoNumeric('destroy');
                self.val(v);
            } catch (err) {
                console.log("Not an autonumeric field: " + self.attr("name"));
            }
        });
        return true;
    });

    $('.filter_form input, .filter_form select').change(function () {
        $('.offers_list').fadeOut()
        if ($('.preloading').length < 1) {
            $('.offers_list').before('<div class="preloading">Идет загрузка таблицы</div>');
        }
    })

    $('.dateselect').datepicker({
        showOtherMonths: true,
        selectOtherMonths: true,
        onSelect: function (dateText, inst) {
            $(this).next('.dateselect_link').text(dateText)
        }
    });
    $('.dateselect_link').click(function (e) {
        e.preventDefault();
        $(this).siblings('.dateselect').datepicker("show");
        ;
    })


    $('.testimonial_marked').click(function (e) {
        e.preventDefault();
        $(this).parents('.news_testimonial').toggleClass('flagged')
    })


    $("[data-action='loadMore']").click(function (e) {
        e.preventDefault();
        $(this).addClass('processing')
    })


    $('.address_tr').parents('tr').prev('tr').click(function (e) {
        e.preventDefault();
        $(this).find('th').width($(this).find('th').width() + 10);
        $(this).next('tr').find('.bank_address_toggle').toggleClass('v').slideToggle(function () {
            if ($(this).hasClass("v")) {
                //.container.fitToViewport()
                //$(this).css('display','table');
                if (!if_mobile()) {
                    $('.bank_address_units').jScrollPane();
                    var pane = $(this).find($('.bank_address_units'));
                    pane.css('height', pane.parents('.bank_address_addresses').height() - pane.siblings('.address_units_hint').height())
                    var api = pane.data('jsp');
                    api.reinitialise();
                }
                //$(this).parents('tr').prev('tr').find('th').css('width','');

            }
        });
    })


    $('[data-mode-switch]').click(function (e) {
        e.preventDefault();
        $('[data-mode-content]').removeClass('on');
        $('[data-mode-content="' + $(this).attr("data-mode-switch") + '"]').addClass('on')
    })


    jpg_compare();


})

function moveOverlay(amt) {
    var overlay = $('.over_jpg'), current = parseInt(overlay.css('top'));
    overlay.css('top', current + amt)
}

function jpg_compare() {
    var img = $('body').attr('data-over-src') || 'images/over.jpg';
    $('body').append('<div class="over_jpg" style="background-image:url(' + img + ')"></div>')
    $('body').on("click", ".over_jpg", function () {
        $(this).toggleClass('h');
    })

    $(document).bind("keypress", function (e) {
        if (e.which == 17) {
            $('.over_jpg').toggle();
        }
        if (e.which == 44) {
            moveOverlay(-1)
        }
        if (e.which == 46) {
            moveOverlay(1)
        }
        if (e.which == 60) {
            moveOverlay(-10)
        }
        if (e.which == 62) {
            moveOverlay(10)
        }
        if (e.which == 109) {
            moveOverlay(-100)
        }
        if (e.which == 47) {
            moveOverlay(100)
        }
    });
}