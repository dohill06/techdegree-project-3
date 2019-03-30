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


const $emailInput = $('#mail');
const emailRegEx = /^[^@]+@[^@.]+\.[a-z]{2,}$/i;

const $creditInput = $('#cc-num');
const creditNumRegEx = /^\d{13,16}$/;

const $creditZipInput = $('#zip');
const creditZipRegEx = /^\d{5}$/;

const $creditCvvInput = $('#cvv');
const creditCvvRegEx = /^\d{3}$/;


function regExTest(reg, text) {
    return reg.test(text.val());
}


function errorMessage() {

}

const $nameSpan = $('<span> Please enter a name</span>').css('color', 'red');
$('#name').prev().append($($nameSpan));
$($nameSpan).hide();

const $emailSpan = $('<span> Not a valid Email address</span>').css('color', 'red');
$emailInput.prev().append($($emailSpan));
$($emailSpan).hide();

const $chkbxSpan = $('<span> Please choose activities</span>').css('color', 'red');
$('.activities legend').append($($chkbxSpan));
$($chkbxSpan).hide();

const $ccInputSpan = $('<span> Enter card number</span>').css('color', 'red');
$creditInput.prev().append($($ccInputSpan));
$($ccInputSpan).hide();

const $ccZipSpan = $('<span> Enter Zip</span>').css('color', 'red');
$creditZipInput.prev().append($($ccZipSpan));
$($ccZipSpan).hide();

const $ccCvvSpan = $('<span> Enter code</span>').css('color', 'red');
$creditCvvInput.prev().append($($ccCvvSpan));
$($ccCvvSpan).hide();

// submit button
$('form').on('submit', function(e) {
    if ($('#name').val().length == 0) {
        $('#name').css('border-color', 'red');
        $($nameSpan).show();
        e.preventDefault();
     }
    
    if (regExTest(emailRegEx, $emailInput) == false) {
        $emailInput.css('border-color', 'red');
        $($emailSpan).text(' Please enter a valid Email address');
        $($emailSpan).show();
        e.preventDefault();
    }

    if ($('input:checked').length == 0) {
        $($chkbxSpan).show();
        e.preventDefault();
    }

    if ($('#payment').val() == 'credit card') {

        if (regExTest(creditNumRegEx, $creditInput) == false) {
            $creditInput.css('border-color', 'red');
            $($ccInputSpan).show();
            e.preventDefault();
        }
        if (regExTest(creditZipRegEx, $creditZipInput) == false) {
            $creditZipInput.css('border-color', 'red');
            $($ccZipSpan).show();
            e.preventDefault();
        }
        if (regExTest(creditCvvRegEx, $creditCvvInput) == false) {
            $creditCvvInput.css('border-color', 'red');
            $($ccCvvSpan).show();
            e.preventDefault();
        }
    }
});


$('#name').on('input', function() {
    if ($('#name').val().length > 0) {
        $('#name').css('border-color', '');
        $($nameSpan).hide();
    }
});


// real-time mail input
$emailInput.on('input', function() {
    if (regExTest(emailRegEx, $emailInput)) {
        $emailInput.css('border-color', '');
        $($emailSpan).hide();
    } else if ($emailInput.val() == 0) {
        $emailInput.css('border-color', '');
        $($emailSpan).hide();
    } else {
        $emailInput.attr('type', 'text');
        $emailInput.css('border-color', 'red');
        $($emailSpan).text(' Not a valid Email address');
        $($emailSpan).show();
    }
});


$('.activities').on('input', function() {
    if ($('input:checked').length > 0) {
        $($chkbxSpan).hide();
    }
});


$($creditInput).on('input', function () {
    if (regExTest(creditNumRegEx, $creditInput)) {
        $creditInput.css('border-color', '');
        $($ccInputSpan).hide();
    } else if ($creditInput.val() == 0) {
        $creditInput.css('border-color', '');
        $($ccInputSpan).hide();
    } else {
        $creditInput.css('border-color', 'red');
        $($ccInputSpan).show();
    }
});


$($creditZipInput).on('input', function () {
    if (regExTest(creditZipRegEx, $creditZipInput)) {
        $creditZipInput.css('border-color', '');
        $($ccZipSpan).hide();
    } else if ($creditZipInput.val() == 0) {
        $creditZipInput.css('border-color', '');
        $($ccZipSpan).hide();
    } else {
        $creditZipInput.css('border-color', 'red');
        $($ccZipSpan).show();
    }
});


$($creditCvvInput).on('input', function () {
    if (regExTest(creditCvvRegEx, $creditCvvInput)) {
        $creditCvvInput.css('border-color', '');
        $($ccCvvSpan).hide();
    } else if ($creditCvvInput.val() == 0) {
        $creditCvvInput.css('border-color', '');
        $($ccCvvSpan).hide();
    } else {
        $creditCvvInput.css('border-color', 'red');
        $($ccCvvSpan).show();
    }
});