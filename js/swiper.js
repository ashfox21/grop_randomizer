const swiperTeams = new Swiper('._teams__swiper', {
    // Optional parameters
    slidesPerView: "auto",
    direction: 'horizontal',
    loop: false,

    pagination: {
        el: '.teams__swiper-pagination',
        type: "progressbar",
        clickable: true,
    },
});

const swiperGroups = new Swiper('._groups__swiper', {
    // Optional parameters
    slidesPerView: "auto",
    direction: 'horizontal',
    loop: false,

    pagination: {
        el: '.groups__swiper-pagination',
        type: "progressbar",
        clickable: true,
    },
});