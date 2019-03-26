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


// make color menu show on change with correct options
$('#design').on('change', function() {
    $('#design option').eq(0).hide();
    $('#colors-js-puns p').hide();
    $('#color').show();

    if ($(this).val() == 'js puns') {
        console.log('yes');
        $('#color option').slice(3).hide();
        $('#color option').slice(0, 3).show();
        $('#color option').eq(0).attr('selected', true);
        $('#color option').eq(3).attr('selected', false);
    } else if ($(this).val() == 'heart js') {
        console.log('no');
        $('#color option').slice(0, 3).hide();
        $('#color option').slice(3).show();
        $('#color option').eq(3).attr('selected', true);
        $('#color option').eq(0).attr('selected', false);
    }
})
