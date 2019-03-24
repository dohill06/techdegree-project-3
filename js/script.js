// added focus to name input on load-in
$('#name').focus();
// hide other-title job role input on load-in
$('#other-title').hide();
// show other-title job role input when other is selected
$('#title').on('change', function() {
    let value = $('#title').val();
    if (value === 'other') {
        $('#other-title').show();
    } else {
        $('#other-title').hide(); 
    }
});