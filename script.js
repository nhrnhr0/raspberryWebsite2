

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
                    <div class="product-name">${p.name}</div> ⚫
                </div>
        `
    }
        html += `</div>
        <!-- If we need pagination -->
        <div class="swiper-pagination"></div>
    </div>`
    return html;
}

function show_swiper2() {    
    var swiper_settings = {
        loop: true,
        disableOnInteraction: true,
        //direction: 'vertical',
        speed:4000,//4000,
        spaceBetween: 0,
        slidesPerView: "2",
        autoplay: {
            delay:0,
            reverseDirection:true,
        }
    };
    swiper2_1 = new Swiper('#swiper2_1', swiper_settings)

}

const swiper2_1_dom = document.querySelector('#swiper2_1');
var swiper2_1;

function update_swiper2(data) {
    if(data == undefined) {
        console.log('could not update update_swiper2, data is undefined');
        return;
    }
    var products = data.products;
    shuffleArray(products);
    html = productsToSwiperHtml(products);
    swiper2_1_dom.innerHTML = html;
}


function shuffleArray(array) {
    var currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
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

var swiper1_1;
function show_swiper() {
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
    swiper1_1 = new Swiper('#swiper1_1', swiper_settings);
}
const swiper1_1_dom = document.querySelector('#swiper1_1');
function update_swiper(data){
    if(data == undefined) {
        console.log('could not update update_swiper2, data is undefined');
        return;
    }
    var products = data.products;
    shuffleArray(products);
    html1 = productsToImageSwiperHtml(products);
    swiper1_1_dom.innerHTML = html1;    
}


fetch_data();
setInterval(fetch_data, 20000);


const BULLET_SLEEP = 1000;
var bullets = document.querySelectorAll('.bullet');
setInterval(()=> {
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

var vidDom = document.querySelector('.video video');
function tab2Init() {
    vidDom.play();
}

function tab3Init() {
    update_swiper2(current_data);
}

function tab1Show() {
    show_swiper();
}

function tab2Show() {
    vidDom.currentTime = 0;
}

function tab3Show() {
    show_swiper2();
}


var last_tab_change_stemp;
const TABS_TIMERS =[40000,50000,40000];// [40000,50000,40000];//[0,0,50000];////[0,0,50000];//
const tabs = document.querySelectorAll('.tab');
var current_tab_idx;
function moveToTab(last, newTab) {
    /*
    tabs[last].classList.add('fadeout');
    setTimeout(()=> {
        tabs[last].classList.remove('fadeout');
    },1500);
    
    tabs[newTab].classList.add('fadein');
    setTimeout(()=> {
        tabs[newTab].classList.remove('fadein');
    },1500);*/
    current_tab_idx = newTab;
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
    setTimeout(()=>{
        tabs[last].classList.remove('active');
        tabs[newTab].classList.add('active');
        switch(newTab) {
            case 0:
                tab1Show();
                break;
            case 1:
                tab2Show();
                break;
            case 2:
                tab3Show();
                break;
        }
    })
}

function tabs_flow_update() {
    //console.log(last_tab_change_stemp);
    const now = Date.now()
    if(last_tab_change_stemp == undefined) {
        moveToTab(0,0);
        last_tab_change_stemp = now;
    }
    
    else if(last_tab_change_stemp + TABS_TIMERS[current_tab_idx] <= now) {
        moveToTab(current_tab_idx, (current_tab_idx+1)%TABS_TIMERS.length);
        last_tab_change_stemp = now;
    }
}

setInterval(tabs_flow_update, 500);
