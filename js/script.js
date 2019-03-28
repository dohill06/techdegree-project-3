// added focus to name input on load-in
$('#name').focus();

// hide other-title job role input on load-in
$('#other-title').hide();

// hide t-shirt 'Color' menu on load-in and add instructions
$('#color').hide();
$('#colors-js-puns label').append('<p>Please select a T-shirt theme.</p>');
$('#colors-js-puns p').css('margin-top', '9px');

// hide payment options on load-in
const $creditCard = $('#credit-card')
const $payPal = $creditCard.next();
const $bitCoin = $creditCard.next().next();
$payPal.hide();
$bitCoin.hide();
$('#payment option').eq(1).attr('selected', true);

// show other-title job role input when other is selected
$('#title').on('change', function() {
    let value = $('#title').val();
    if (value === 'other') {
        $('#other-title').show();
    } else {
        $('#other-title').hide(); 
    }
});


// make color menu show on change with correct options
$('#design').on('change', function() {
    const shirtRegEx = /Puns/;
    let optNotSelected = '';
    let optSelected = '';

    $('#design option').eq(0).hide();
    $('#colors-js-puns p').hide();
    $('#color').show();

    function optSelection() {
        $('#color option').eq(optNotSelected).attr('selected', false);
        $('#color option').eq(optSelected).attr('selected', true);
    }

    if ($(this).val() == 'js puns') {
        $('#color option').each(function(i, el) {
            if (shirtRegEx.test($(el).text())) {
                $(el).show();
                optNotSelected = (i + 1);
            } else {
                $(el).hide();
                optSelected = (i - i);
            }
        });
        optSelection();
    } else if ($(this).val() == 'heart js') {
        $('#color option').each(function (i, el) {
            if (shirtRegEx.test($(el).text()) == false) {
                $(el).show();
                optNotSelected = (i - i);
            } else {
                $(el).hide();
                optSelected = (i + 1);
            }
        });
        optSelection();
    }
});


// register total
let total = 0;
const $sum = $(`<p>Total: $${total}</p>`);
$('.activities').append($sum);
$($sum).hide();

// register checkbox section
$('.activities input').on('change', function() {
    const tuesMorningRegEx = /T\w+ \d+am-\d+pm/;
    const tuesAfternoonRegEx = /T\w+ \d+pm-\d+pm/;
    const $label = $('.activities label');   
    const $checked = $(this);
    const $checkedText = $checked.parent().text();

    $($sum).show();
   
    if ($checkedText.match('Main') && $checked.prop('checked')) {
        total += 200;
    } else if ($checkedText.match('Main') && $checked.prop('checked') == false) {
        total -= 200;
    } else if ($checked.prop('checked')) {
        total += 100;
    } else if ($checked.prop('checked') == false) {
        total -= 100;
    }
    
    $sum.html(`<p>Total: $${total}</p>`);

    $label.each(function (i, el) {
        let $labelText = $(el).text();
        let $labelKids = $(el).children();

        function checkState(reg, chk, color) {
            if ($labelText.match(reg)) {

                if ($labelKids.prop('checked') == false) {
                    $labelKids.attr('disabled', chk);
                    $(el).css('color', color);

                }
            }
        }

        if ($checkedText.match(tuesMorningRegEx) && $checked.prop('checked')) {
            checkState(tuesMorningRegEx, true, 'gray');
             
        } else if ($checkedText.match(tuesAfternoonRegEx) && $checked.prop('checked')) {
            checkState(tuesAfternoonRegEx, true, 'gray');

        } else if ($checkedText.match(tuesMorningRegEx) && $checked.prop('checked') == false) {
            checkState(tuesMorningRegEx, false, '');

         } else if ($checkedText.match(tuesAfternoonRegEx) && $checked.prop('checked') == false) {
            checkState(tuesAfternoonRegEx, false, '');

         }
         
         if ($('input:checked').length == 0) {
             $($sum).hide();
         }

    });
    
});

