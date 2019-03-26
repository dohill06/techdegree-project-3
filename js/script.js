// added focus to name input on load-in
$('#name').focus();
// hide other-title job role input on load-in
$('#other-title').hide();
// hide t-shirt 'Color' menu on load-in and add instructions
$('#color').hide();
$('#colors-js-puns label').append('<p>Please select a T-shirt theme.</p>');
$('#colors-js-puns p').css('margin-top', '9px');

// show other-title job role input when other is selected
$('#title').on('change', function() {
    let value = $('#title').val();
    if (value === 'other') {
        $('#other-title').show();
    } else {
        $('#other-title').hide(); 
    }
});
// variable for regex check of t-shirts
const shirtRegEx = new RegExp('P');
// make color menu show on change with correct options
$('#design').on('change', function() {
    $('#design option').eq(0).hide();
    $('#colors-js-puns p').hide();
    $('#color').show();

    if ($(this).val() == 'js puns') {
        let optNotSelected = '';
        let optSelected = '';
        $('#color option').each(function(i, el) {
            if (shirtRegEx.test($(el).text())) {
                $(el).show();
                optNotSelected = (i + 1);
            } else {
                $(el).hide();
                optSelected = (i - i);
            }
        });
        $('#color option').eq(optNotSelected).attr('selected', false);
        $('#color option').eq(optSelected).attr('selected', true);
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
        $('#color option').eq(optNotSelected).attr('selected', false);
        $('#color option').eq(optSelected).attr('selected', true);
    }
});

$('.activities input').on('click', function() {
    if ($(this).prop('checked')) {
        console.log('check');
    } else if ($(this).prop('checked') == false) {
        console.log('unchecked');
    }
});