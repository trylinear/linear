(function () {

    var navigation = document.querySelector('.navigation');

    document.querySelector('.toggle-navigation a').addEventListener('click', function (e) {

        e.preventDefault();

        navigation.style.display = navigation.style.display ? '' : 'block';

    });

}());
