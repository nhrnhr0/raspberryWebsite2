

var current_vertion= undefined;
var current_data = undefined;
var tab1Swiper;
function fetch_data() {
    fetch('./data.json').then(response => response.json()).then(data => {
        if(data.vertion == current_vertion) {
        }else{
            current_data = data;
            update_html(data);
            current_vertion = data.vertion;
        }
    });
}

function update_html(data) {

    update_swiper(data);
    update_swiper2(data);
}
function productsToSwiperHtml(products) {
    var html = '<div class="swiper-wrapper">';
    for(var i = 0; i < products.length;i++) {
        var p = products[i];
        html += `
        <div class="swiper-slide">
        <div class="product-image-wraper">
        <div class="bg"></div>
        <img class="product-image" src="${p.img}"/>
    </div>
                    <div class="product-name">${p.name}</div>
                    
                </div>
        `
    }
        html += `</div>
        <!-- If we need pagination -->
        <div class="swiper-pagination"></div>
    </div>`
    return html;
}
function update_swiper2(data) {
    if(data == undefined) {
        console.log('could not update update_swiper2, data is undefined');
        return;
    }
    var products = data.products;
    html1 = productsToSwiperHtml(products.slice(0, products.length/3));
    html2 = productsToSwiperHtml(products.slice(products.length/3, (products.length/3)*2 ));
    html3 = productsToSwiperHtml(products.slice((products.length/3)*2 ));
    document.querySelector('#swiper2_1').innerHTML = html1;
    document.querySelector('#swiper2_2').innerHTML = html2;
    document.querySelector('#swiper2_3').innerHTML = html3;
    tab1Swipers = [];
    var swiper_settings = {
        loop: true,
        disableOnInteraction: true,
        direction: 'vertical',
        speed:4000,//4000,
        spaceBetween: 0,
        slidesPerView: "3",
        autoplay: {
            delay:0,
        }
    };
    var swiper_settings2 = {
        loop: true,
        disableOnInteraction: true,
        direction: 'vertical',
        speed:4000,//4000,
        spaceBetween: 0,
        slidesPerView: "6",
        autoplay: {
            delay:0,
        }
    };

    tab3Swipers = []
    tab3Swipers.push(new Swiper('#swiper2_1', swiper_settings2));
    tab3Swipers.push(new Swiper('#swiper2_2', swiper_settings));
    tab3Swipers.push(new Swiper('#swiper2_3', swiper_settings2));
}

function productsToImageSwiperHtml(products) {
    var html = '<div class="swiper-wrapper">';
    for(var i = 0; i < products.length;i++) {
        var p = products[i];
        html += `
        <div class="swiper-slide">
                    <img class="img" src="${p.img}" alt="${p.name}">
                </div>
        `
    }
        html += `</div>
        <!-- If we need pagination -->
        <div class="swiper-pagination"></div>
    </div>`
    return html;
}

function update_swiper(data){
    if(data == undefined) {
        console.log('could not update update_swiper2, data is undefined');
        return;
    }
    var products = data.products;
    html1 = productsToImageSwiperHtml(products.slice(0,products.length/2));
    html2 = productsToImageSwiperHtml(products.slice(products.length/2,products.length));
    
    document.querySelector('#swiper1_1').innerHTML = html1;
    document.querySelector('#swiper1_2').innerHTML = html2;
    
    var swiper_settings = {
        loop: true,
        disableOnInteraction: true,
        speed:3000,//4000,
        spaceBetween: 0,
        
        slidesPerView: "5",
        autoplay: {
            delay:0,
            reverseDirection:true,
        }
      };
    var swiper_settings2 = {
        loop: true,
        disableOnInteraction: true,
        speed:3000,//4000,
        spaceBetween: 0,
        slidesPerView: "5",
        autoplay: {
            delay:0,
            reverseDirection: false,
        }
      };
    tab1Swiper = new Swiper('#swiper1_1', swiper_settings);
    tab1Swiper = new Swiper('#swiper1_2', swiper_settings2);
        
}


fetch_data();
setInterval(fetch_data, 1000);


const BULLET_SLEEP = 1000;

setInterval(()=> {
    var bullets = document.querySelectorAll('.bullet');

    for(var i = 0; i < bullets.length; i++) {
        b = bullets[i];
        b.classList.add('animate');
    }
    setTimeout(()=> {
        for(var i = 0; i < bullets.length; i++) {
            b = bullets[i];
            b.classList.remove('animate');
        }
    },5500)
}, 6500);

function tab1Init() {
    update_swiper(current_data)
}

function tab2Init() {
    var vidDom = document.querySelector('.video video');
    vidDom.play();
}

function tab3Init() {
    update_swiper2(current_data);
}




var last_tab_change_stemp;
const TABS_TIMERS = [5000,5000,5000]///[40000,50000,40000];//[0,0,50000];//
const tabs = document.querySelectorAll('.tab');
var current_tab_idx;
function moveToTab(last, newTab) {
    tabs[last].classList.remove('active');
    tabs[last].classList.add('fadeout');
    setTimeout(()=> {
        tabs[last].classList.remove('fadeout');
    },1500);
    tabs[newTab].classList.add('active');
    tabs[newTab].classList.add('fadein');
    setTimeout(()=> {
        tabs[newTab].classList.remove('fadein');
    },1500);
    current_tab_idx = newTab;
    console.log('move to tab: ', newTab);
    last_tab_change_stemp =Date.now();
    switch(newTab) {
        case 0:
            tab1Init();
            break;
        case 1:
            tab2Init();
            break;
        case 2:
            tab3Init();
            break;
    }
    
}

function tabs_flow_update() {
    console.log(last_tab_change_stemp);
    if(last_tab_change_stemp == undefined) {
        moveToTab(0,0);
        last_tab_change_stemp = Date.now();
    }
    
    else if(last_tab_change_stemp + TABS_TIMERS[current_tab_idx] <= Date.now()) {
        moveToTab(current_tab_idx, (current_tab_idx+1)%TABS_TIMERS.length);
    }
}

setInterval(tabs_flow_update, 20);