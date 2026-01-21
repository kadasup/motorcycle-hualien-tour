function renderTimeline(day) {
    const container = document.getElementById('timeline-container');
    container.innerHTML = ''; // 清空內容

    const items = tourData[day];

    // 計算總距離
    let totalKm = 0;
    items.forEach(item => {
        if (item.distance && item.distance.includes('km')) {
            totalKm += parseInt(item.distance);
        }
    });

    // 更新總里程顯示 (確保插在 tab-container 之後)
    let totalEl = document.getElementById('total-distance');
    if (!totalEl) {
        totalEl = document.createElement('div');
        totalEl.id = 'total-distance';
        const tabContainer = document.querySelector('.tab-container');
        if (tabContainer) {
            tabContainer.after(totalEl);
        } else {
            container.before(totalEl);
        }
    }
    totalEl.innerHTML = `本日預計行駛總里程：<span>${totalKm} km</span>`;

    items.forEach((item, index) => {
        const itemEl = document.createElement('div');
        itemEl.className = 'timeline-item';
        itemEl.style.transitionDelay = `${index * 0.1}s`;

        const typeMap = {
            'ride': '騎乘',
            'spot': '景點',
            'food': '美食',
            'stay': '住宿'
        };

        const imageIcon = item.image ? `<span class="photo-hint" data-img="${item.image}">📷</span>` : '';

        itemEl.innerHTML = `
            <div class="distance-tag">${item.distance ? `<span>↓</span> ${item.distance}` : ''}</div>
            <div class="marker"></div>
            <div class="time">${item.time}</div>
            <div class="card">
                <div class="location ${item.image ? 'clickable-photo' : ''}" data-img="${item.image || ''}">
                    ${imageIcon}${item.location}
                    <span class="tag tag-${item.type}">${typeMap[item.type]}</span>
                </div>
                <div class="highlight">${item.highlight}</div>
                <div class="guide-box">
                    <strong>停車與騎乘指引：</strong><br>
                    ${item.guide}
                </div>
                <div class="card-actions">
                    ${item.map ? `<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.map)}" target="_blank" class="action-link map-link">📍 導航</a>` : ''}
                </div>
            </div>
        `;

        // 幫具備照片的元素加上點擊事件
        if (item.image) {
            const clickTarget = itemEl.querySelector('.clickable-photo');
            clickTarget.addEventListener('click', () => openModal(item.image));
        }

        container.appendChild(itemEl);
    });

    // 如果是第一天，最下方增加「查看第二天」的按鈕
    if (day === 'D1') {
        const nextDayBtn = document.createElement('div');
        nextDayBtn.className = 'next-day-cta';
        nextDayBtn.innerHTML = `
            <button onclick="switchDay('D2'); setTimeout(() => { window.scrollTo({top: document.getElementById('timeline-container').offsetTop - 120, behavior: 'smooth'}); }, 50);">
                🚀 查看第二天行程
            </button>
        `;
        container.appendChild(nextDayBtn);
    }

    // 重新啟動觀察器以捕捉新元素
    observeItems();
}

function openModal(imgSrc) {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');

    // 1. 初始化狀態：顯示 Loader，隱藏圖片效果
    modal.classList.remove('image-loaded');
    modal.classList.add('loading');
    modal.style.display = 'flex';

    // 2. 建立預載入物件
    const tempImg = new Image();

    tempImg.onload = function () {
        modalImg.src = imgSrc;
        modal.classList.remove('loading');
        modal.classList.add('image-loaded');
    };

    tempImg.onerror = function () {
        modalImg.src = 'https://placehold.co/800x600?text=Photo+Not+Available';
        modal.classList.remove('loading');
        modal.classList.add('image-loaded');
    };

    // 觸發載入
    tempImg.src = imgSrc;
}

function closeModal() {
    const modal = document.getElementById('image-modal');
    modal.classList.remove('image-loaded');
    setTimeout(() => {
        modal.style.display = 'none';
        document.getElementById('modal-img').src = '';
    }, 300); // 等待縮小動畫完成
}

function switchDay(day) {
    // 更新按鈕樣式
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.innerText.includes(day === 'D1' ? '01' : '02')) {
            btn.classList.add('active');
        }
    });

    renderTimeline(day);
}


function observeItems() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.timeline-item').forEach(item => {
        observer.observe(item);
    });
}

// 天氣 API 實作 (使用 Open-Meteo，支援圖示)
async function fetchWeather(lat, lon, elementId, label) {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        const data = await response.json();
        const weather = data.current_weather;
        const temp = Math.round(weather.temperature);

        // 天氣代碼圖示
        const getWeatherUI = (code) => {
            if (code <= 1) return { desc: '晴朗', icon: '☀️' };
            if (code <= 3) return { desc: '多雲', icon: '⛅' };
            if (code <= 48) return { desc: '霧', icon: '🌫️' };
            if (code <= 67) return { desc: '細雨', icon: '🌦️' };
            if (code <= 82) return { desc: '陣雨', icon: '🌧️' };
            if (code <= 99) return { desc: '雷雨', icon: '⛈️' };
            return { desc: '未知', icon: '🌡️' };
        };

        const { desc, icon } = getWeatherUI(weather.weathercode);
        document.getElementById(elementId).innerHTML = `
            <div class="weather-item">
                <span class="weather-icon">${icon}</span>
                <span class="city">${label}</span>
                <span>${temp}°C | ${desc}</span>
            </div>
        `;
    } catch (error) {
        document.getElementById(elementId).innerText = `${label}天氣讀取失敗`;
    }
}

function initWeather() {
    // 固定顯示 台北 與 花蓮 的天氣
    fetchWeather(25.03, 121.56, 'local-weather', '台北'); // 台北
    fetchWeather(23.97, 121.60, 'hualien-weather', '花蓮'); // 花蓮
}

// 預載入所有行程與成員照片
function preloadAllImages() {
    const imagesToPreload = [];

    // 收集所有行程圖片
    if (tourData.D1) tourData.D1.forEach(item => item.image && imagesToPreload.push(item.image));
    if (tourData.D2) tourData.D2.forEach(item => item.image && imagesToPreload.push(item.image));

    // 收集成員圖片
    if (tourData.riders) tourData.riders.forEach(rider => rider.image && imagesToPreload.push(rider.image));

    // 收集 Hero 圖
    imagesToPreload.push('hero.png');

    // 去重並執行預載
    const uniqueImages = [...new Set(imagesToPreload)];
    console.log(`正在預載 ${uniqueImages.length} 張圖片...`);

    uniqueImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// 初始化渲染
document.addEventListener('DOMContentLoaded', () => {
    // 優先開始預載圖片
    preloadAllImages();

    renderTimeline('D1');
    initWeather();

    // 平滑捲動
    const exploreBtn = document.querySelector('.btn-primary');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    renderRiders();
    initScrollEffects();
});

function initScrollEffects() {
    const progressBar = document.getElementById('progress-bar');
    const scrollTopBtn = document.getElementById('scroll-top-btn');

    window.addEventListener('scroll', () => {
        // 進度條
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (progressBar) progressBar.style.width = scrolled + "%";

        // 回到頂端按鈕
        if (scrollTopBtn) {
            if (winScroll > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }
    });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 裝備檢核按鈕
    const checkBtn = document.getElementById('check-list-btn');
    if (checkBtn) {
        checkBtn.classList.add('visible');
        checkBtn.addEventListener('click', openChecklist);
    }
}

const defaultChecklist = [
    "安全帽 (全罩或 3/4 尤佳)",
    "防摔手套 & 防摔衣",
    "雨衣 (兩件式尤佳)",
    "行車紀錄器 (確認電量與記憶卡)",
    "備用鑰匙 (隨身攜帶)",
    "輪胎胎壓 & 鍊條檢查",
    "行動電源 & 充電線",
    "健保卡 & 駕駛執照"
];

function openChecklist() {
    const modal = document.getElementById('checklist-modal');
    const container = document.getElementById('checklist-items');
    container.innerHTML = '';

    const savedStatus = JSON.parse(localStorage.getItem('tourChecklist') || '{}');

    defaultChecklist.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = `checklist-item ${savedStatus[index] ? 'checked' : ''}`;
        div.innerHTML = `
            <input type="checkbox" id="item-${index}" ${savedStatus[index] ? 'checked' : ''}>
            <span for="item-${index}">${item}</span>
        `;
        div.addEventListener('click', (e) => {
            const checkbox = div.querySelector('input');
            if (e.target !== checkbox) checkbox.checked = !checkbox.checked;

            div.classList.toggle('checked', checkbox.checked);

            // 儲存狀態
            const currentStatus = JSON.parse(localStorage.getItem('tourChecklist') || '{}');
            currentStatus[index] = checkbox.checked;
            localStorage.setItem('tourChecklist', JSON.stringify(currentStatus));
        });
        container.appendChild(div);
    });

    modal.style.display = 'flex';
}

function closeChecklist() {
    document.getElementById('checklist-modal').style.display = 'none';
}

function renderRiders() {
    const container = document.getElementById('riders-grid');
    if (!container) return;

    const riders = tourData.riders;
    container.innerHTML = '';

    riders.forEach(rider => {
        const card = document.createElement('div');
        card.className = 'rider-card';

        const imgHtml = rider.image
            ? `<img src="${rider.image}" alt="${rider.name}" class="rider-img">`
            : `<div class="rider-placeholder"></div>`;

        card.innerHTML = `
            <div class="rider-img-container">
                ${imgHtml}
            </div>
            <div class="rider-info">
                <span class="rider-tag">${rider.tag}</span>
                <h3 class="rider-name">${rider.name}</h3>
                <p class="rider-bio">${rider.bio}</p>
            </div>
        `;
        container.appendChild(card);
    });
}
