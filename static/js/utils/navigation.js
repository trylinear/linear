const navigation = document.querySelector('.navigation');

document.querySelector('.toggle-navigation a').addEventListener('click', e => {

    e.preventDefault();

    navigation.style.display = navigation.style.display ? '' : 'block';

});
