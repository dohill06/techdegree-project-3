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
$('#payment option').eq(0).hide();
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


// payment info section
$('#payment').on('change', function(){
    if ($(this).val() == 'credit card') {
        $creditCard.show();
        $payPal.hide();
        $bitCoin.hide();
    } else if ($(this).val() == 'paypal') {
        $payPal.show();
        $creditCard.hide();
        $bitCoin.hide();
    } else if ($(this).val() == 'bitcoin') {
        $bitCoin.show();
        $creditCard.hide();
        $payPal.hide();
    }
});


// form validation section
const $emailInput = $('#mail');
const emailRegEx = /^[^@]+@[^@.]+\.[a-z]{2,}$/i;
$emailInput.attr('type', 'text');

const $creditInput = $('#cc-num');
const creditNumRegEx = /^\d{13,16}$/;

const $creditZipInput = $('#zip');
const creditZipRegEx = /^\d{5}$/;

const $creditCvvInput = $('#cvv');
const creditCvvRegEx = /^\d{3}$/;

const $nameSpan = $('<span> Please enter a name</span>');
const $emailSpan = $('<span> Not a valid Email address</span>');

const $chkbxSpan = $('<span> Please choose activities</span>').css('color', 'red');
$('.activities legend').append($($chkbxSpan));
$($chkbxSpan).hide();

const $ccInputSpan = $('<span> Enter card number</span>')
const $ccZipSpan = $('<span> Enter Zip</span>')
const $ccCvvSpan = $('<span> Enter code</span>')

errorMessage($nameSpan, $('#name'));
errorMessage($emailSpan, $emailInput);
errorMessage($ccInputSpan, $creditInput);
errorMessage($ccZipSpan, $creditZipInput);
errorMessage($ccCvvSpan, $creditCvvInput);

function regExTest(reg, text) {
    return reg.test(text.val());
}

function errorMessage(span, name) {
    $(span).css('color', 'red');
    name.prev().append($(span));
    $(span).hide();
}

function showError(name, span) {
    name.css('border-color', 'red');
    $(span).show();
}

function hideError(name, span) {
    name.css('border-color', '');
    $(span).hide();
}

// form validation on submit 
$('form').on('submit', function(e) {
    if ($('#name').val().length == 0) {
        showError($('#name'), $nameSpan);
        e.preventDefault();
     }
    
    if (regExTest(emailRegEx, $emailInput) == false) {
        showError($emailInput, $emailSpan);
        $($emailSpan).text(' Please enter a valid Email address');
        e.preventDefault();
    }

    if ($('input:checked').length == 0) {
        $($chkbxSpan).show();
        e.preventDefault();
    }

    if ($('#payment').val() == 'credit card') {

        if (regExTest(creditNumRegEx, $creditInput) == false) {
            showError($creditInput, $ccInputSpan);
            e.preventDefault();
        }
        if (regExTest(creditZipRegEx, $creditZipInput) == false) {
            showError($creditZipInput, $ccZipSpan);
            e.preventDefault();
        }
        if (regExTest(creditCvvRegEx, $creditCvvInput) == false) {
            showError($creditCvvInput, $ccCvvSpan);
            e.preventDefault();
        }
    }
});


// real-time name input
$('#name').on('input', function() {
    if ($('#name').val().length > 0) {
        hideError($('#name'), $nameSpan);
    }
});


// real-time mail input
$emailInput.on('input', function() {
    if (regExTest(emailRegEx, $emailInput)) {
        hideError($emailInput, $emailSpan);
    } else if ($emailInput.val() == 0) {
        hideError($emailInput, $emailSpan);
    } else {
        $($emailSpan).text(' Not a valid Email address');
        showError($emailInput, $emailSpan);
    }
});


// real-time checkbox input
$('.activities').on('input', function() {
    if ($('input:checked').length > 0) {
        $($chkbxSpan).hide();
    }
});


// real-time credit card number input
$($creditInput).on('input', function () {
    if (regExTest(creditNumRegEx, $creditInput)) {
        hideError($creditInput, $ccInputSpan);
    } else if ($creditInput.val() == 0) {
        hideError($creditInput, $ccInputSpan);
    } else {
        showError($creditInput, $ccInputSpan);
    }
});


// real-time zip code input
$($creditZipInput).on('input', function () {
    if (regExTest(creditZipRegEx, $creditZipInput)) {
        hideError($creditZipInput, $ccZipSpan);
    } else if ($creditZipInput.val() == 0) {
        hideError($creditZipInput, $ccZipSpan);
    } else {
        showError($creditZipInput, $ccZipSpan);
    }
});


// real-time cvv code input
$($creditCvvInput).on('input', function () {
    if (regExTest(creditCvvRegEx, $creditCvvInput)) {
        hideError($creditCvvInput, $ccCvvSpan);
    } else if ($creditCvvInput.val() == 0) {
        hideError($creditCvvInput, $ccCvvSpan);
    } else {
        showError($creditCvvInput, $ccCvvSpan);
    }
});