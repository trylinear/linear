const $ = require('jquery');

const $navigation = $('.navigation');

$('.toggle-navigation a').on('click', e => {

    e.preventDefault();

    $navigation.toggle();

});
