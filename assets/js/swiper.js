const swiperPromotion = new Swiper('.swiper-event-fade', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true
    },
    autoplay: {
        delay: 3000,
    },
    loop: true,
    effect: 'fade',
    speed: 400,
    fadeEffect: {
        crossFade: true
    },
});