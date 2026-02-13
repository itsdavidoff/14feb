// Список комплиментов
const compliments = [
    "Твоя улыбка — это весь мой мир!",
    "Ты самая прекрасная и любимая!",
    "Твои глаза светятся как звезды!",
    "Ты делаешь каждый мой день особенным!",
    "Валентинка для моей самой лучшей Валентины!",
    "Твоя красота затмевает всё вокруг!",
    "Ты — моё самое главное сокровище!",
    "С тобой мир становится по-настоящему ярким!",
    "Твой смех — самая сладкая музыка!",
    "Ты — самое ценное, что у меня есть!",
    "Ты прекрасна в каждом своем проявлении!",
    "Ты украшаешь мою жизнь своим присутствием!",
    "Твои объятия — моё самое любимое место!",
    "Ты делаешь мою жизнь счастливой!",
    "Ты — моя любимая Валентинка!",
    "Ты восхитительна и неповторима!",
    "Твоя нежность согревает моё сердце!",
    "Ты — причина моего счастья каждый день!",
    "Люблю тебя больше всего на свете!"
];

// Создаем звезды
function createStars() {
    const starsContainer = document.querySelector('.stars');
    for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.top = `${Math.random() * 100}vh`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        starsContainer.appendChild(star);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    createStars();
    const openBtn = document.getElementById('openBtn');

    openBtn.addEventListener('click', function () {
        document.querySelector('.intro-screen').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.intro-screen').style.display = 'none';
            document.querySelector('.congrats-screen').classList.add('visible');
            document.getElementById('nextBtn').style.display = 'block'; // Показываем кнопку
        }, 1000);

        // Увеличиваем интенсивность лепестков
        setInterval(createPetal, 300);
    });

    // Добавить в script.js
    document.addEventListener('mousemove', (e) => {
        const stars = document.querySelector('.stars');
        const x = e.clientX / window.innerWidth * 10;
        const y = e.clientY / window.innerHeight * 10;
        stars.style.transform = `translate(${x}px, ${y}px)`;
    });


    // Обработчик для розы
    document.getElementById('bouquet-btn').addEventListener('click', function (e) {
        createParticles(e.clientX, e.clientY);
        for (let i = 0; i < 10; i++) setTimeout(createPetal, i * 100);
        showRandomCompliment();
    });

    // Начальные лепестки
    setInterval(createPetal, 1000);
});

// Функция создания частиц при клике
function createParticles(x, y) {
    const container = document.body;
    const count = 30; // Количество частиц

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Случайный размер частицы (от 5px до 10px)
        const size = Math.random() * 8 + 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Случайный цвет частицы (оттенки розового и красного)
        const hue = Math.floor(Math.random() * 40) + 340; // от 340 до 380 (20) по шкале HSL
        const saturation = Math.floor(Math.random() * 30) + 70; // от 70% до 100%
        const lightness = Math.floor(Math.random() * 20) + 60; // от 60% до 80%
        particle.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

        // Размещаем частицу в месте клика
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;

        // Задаем случайное направление и расстояние движения
        const tx = (Math.random() - 0.5) * 200; // Смещение по X (-100px до 100px)
        const ty = (Math.random() - 0.5) * 200; // Смещение по Y (-100px до 100px)
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);

        // Добавляем частицу на страницу
        container.appendChild(particle);

        // Удаляем частицу после завершения анимации
        particle.addEventListener('animationend', () => {
            particle.remove();
        });
    }
}

// Функция для создания лепестка (сердечка)
function createPetal() {
    const petal = document.createElement('img');
    // Разноцветные сердечки
    const colors = ['#ff4d4d', '#ff85a1', '#ffb3c1', '#c9184a', '#ff0054'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    // Используем Base64 для максимальной совместимости с мобильными браузерами
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z" fill="${randomColor}" /></svg>`;
    const base64Svg = btoa(unescape(encodeURIComponent(svg)));
    petal.src = `data:image/svg+xml;base64,${base64Svg}`;
    petal.classList.add('petal');

    // Случайный размер лепестка (от 20px до 50px)
    const size = Math.floor(Math.random() * 30) + 20;
    petal.style.width = `${size}px`;

    // Случайная начальная позиция по X (в пределах ширины экрана)
    const x = Math.random() * window.innerWidth;
    petal.style.left = `${x}px`;

    // Начальная позиция по Y (над верхней границей экрана)
    petal.style.top = `-50px`;

    // Случайное направление вращения (влево или вправо)
    const rotationDirection = Math.random() > 0.5 ? 1 : -1;
    const rotationSpeed = Math.random() * 360; // Случайная скорость вращения

    // Случайное отклонение по горизонтали
    const horizontalDrift = (Math.random() - 0.5) * 200; // Отклонение от -100px до 100px

    // Добавляем лепесток в контейнер
    const petalsContainer = document.getElementById('petals-container');
    if (petalsContainer) {
        petalsContainer.appendChild(petal);
    }

    // Анимация падения
    const animationDuration = Math.random() * 3 + 2; // Случайная длительность падения (2-5 секунд)
    petal.style.animation = `fall ${animationDuration}s linear forwards`;

    // Управление отклонением по горизонтали
    petal.style.setProperty('--drift', `${horizontalDrift}px`);

    // Удаляем лепесток после завершения анимации
    petal.addEventListener('animationend', () => {
        petal.remove();
    });

    // Вращение лепестка
    let rotation = 0;
    const rotatePetal = () => {
        rotation += rotationSpeed * rotationDirection * 0.01;
        petal.style.transform = `rotate(${rotation}deg)`;
        requestAnimationFrame(rotatePetal);
    };
    requestAnimationFrame(rotatePetal);
}

// Функция для создания летящего ангелочка
function createAngel() {
    const angel = document.createElement('div');
    angel.classList.add('angel-wrapper');

    // Купидон с сердечком (SVG)
    angel.innerHTML = `
        <svg class="angel-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 30 C 40 30, 35 40, 35 50 C 35 65, 50 80, 50 80 C 50 80, 65 65, 65 50 C 65 40, 60 30, 50 30" fill="#FFE4E1" />
            <path d="M35 50 C 10 30, 10 70, 35 60 Z" fill="white" />
            <path d="M65 50 C 90 30, 90 70, 65 60 Z" fill="white" />
            <circle cx="50" cy="25" r="12" fill="#FFE4E1" />
            <path d="M50 45 C 45 40, 40 45, 50 55 C 60 45, 55 40, 50 45" fill="#FF4D4D" />
        </svg>
    `;

    const startFromLeft = Math.random() > 0.5;
    const startY = Math.random() * (window.innerHeight - 100) + 50;

    angel.style.top = `${startY}px`;
    if (startFromLeft) {
        angel.style.left = `-100px`;
        angel.style.animation = `flyRight ${Math.random() * 5 + 10}s linear forwards`;
    } else {
        angel.style.left = `${window.innerWidth + 100}px`;
        angel.style.transform = `scaleX(-1)`;
        angel.style.animation = `flyLeft ${Math.random() * 5 + 10}s linear forwards`;
    }

    document.body.appendChild(angel);

    angel.addEventListener('animationend', () => {
        angel.remove();
    });
}

// Функция для показа случайного комплимента
function showRandomCompliment() {
    const complimentElement = document.getElementById('compliment');
    if (!complimentElement) return;

    // Удаляем класс показа, если он есть
    complimentElement.classList.remove('show');

    // Ожидаем, пока анимация исчезновения завершится
    setTimeout(() => {
        // Выбираем случайный комплимент
        const randomIndex = Math.floor(Math.random() * compliments.length);
        complimentElement.textContent = compliments[randomIndex];

        // Добавляем класс для показа комплимента
        complimentElement.classList.add('show');
    }, 100); // Короткая задержка для сброса анимации
}

// Данные для медиа (10 элементов)
const mediaData = [
    {
        type: 'image',
        src: 'images/1day.jpg',
        comment: 'Наш первый день знакомства',
    },
    {
        type: 'image',
        src: 'images/vmeste2.jpg',
        comment: 'Тут мы всей нашей большой семьей',
    },
    {
        type: 'image',
        src: 'images/vmeste.jpg',
        comment: 'Тут мы очень мили и красиви☺️',
    },
    {
        type: 'image',
        src: 'images/wolf.jpg',
        comment: 'Тут мы очень модни👞',
    },
    {
        type: 'image',
        src: 'images/Ng.jpg',
        comment: 'Наш первый новый год вместе!❤️',
    },
    // Добавьте остальные 8 элементов...
];

let currentMediaIndex = 0;
let mediaElements = [];

// Предзагрузка медиа
function preloadMedia() {
    mediaData.forEach((item, index) => {
        if (item.type === 'image') {
            const img = new Image();
            img.src = item.src;
            img.onload = () => {
                mediaElements[index] = img;
            };
            img.onerror = () => console.error("Ошибка загрузки:", item.src);
        } else {
            const video = document.createElement('video');
            video.src = item.src;
            video.muted = item.muted;
            video.preload = 'auto';
            video.onerror = () => console.error("Ошибка загрузки:", item.src);
            mediaElements[index] = video;
        }
    });
}

// Показать текущее медиа
function showCurrentMedia() {
    const container = document.getElementById('media-display');
    // Остановить предыдущее видео и очистить контейнер
    container.querySelector('video')?.pause();
    container.innerHTML = '';

    const media = mediaElements[currentMediaIndex].cloneNode(true);
    media.classList.add('active');

    if (media.tagName === 'VIDEO') {
        // Автовоспроизведение с отключением звука (требование браузеров)
        media.autoplay = true;
        media.muted = true;
        media.setAttribute('playsinline', '');
        media.setAttribute('webkit-playsinline', '');
        media.loop = true;

        // Блокировка контекстного меню
        media.oncontextmenu = (e) => {
            e.preventDefault();
            return false;
        };

        // Принудительный запуск для мобильных устройств
        media.play().catch(error => {
            console.log('Автовоспроизведение заблокировано. Нужно взаимодействие пользователя.');
        });
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'media-wrapper';
    wrapper.appendChild(media);
    container.appendChild(wrapper);

    // Анимация комментария
    const comment = document.getElementById('media-comment');
    comment.classList.remove('show');
    setTimeout(() => {
        comment.textContent = mediaData[currentMediaIndex].comment;
        comment.classList.add('show');
    }, 300);
}

// Функция для переключения экранов с анимацией
function switchScreen(fromSelector, toSelector) {
    const fromScreen = document.querySelector(fromSelector);
    const toScreen = document.querySelector(toSelector);

    fromScreen.classList.remove('visible');

    setTimeout(() => {
        if (fromSelector === '.memories-screen' || toSelector === '.memories-screen') {
            fromScreen.style.display = 'none';
            fromScreen.classList.remove('active-display');
            toScreen.style.display = 'block';
            toScreen.classList.add('active-display');
        }

        // Маленький таймаут для запуска CSS transition
        setTimeout(() => {
            toScreen.classList.add('visible');
        }, 50);
    }, 800); // Должно совпадать с длительностью transition в CSS
}

// Обработка интерактивности розы
function updateRoseParallax(e) {
    const container = document.querySelector('.animated-bouquet .container');
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const deltaX = (clientX - centerX) / (window.innerWidth / 2);
    const deltaY = (clientY - centerY) / (window.innerHeight / 2);

    const rotateX = -deltaY * 20; // Ограничиваем наклон до 20 градусов
    const rotateY = deltaX * 20;

    container.style.setProperty('--rotate-x', `${rotateX}deg`);
    container.style.setProperty('--rotate-y', `${rotateY}deg`);

    // Усиливаем свечение при движении
    const glow = container.querySelector('.glow');
    if (glow) {
        const intensity = 0.3 + (Math.abs(deltaX) + Math.abs(deltaY)) * 0.4;
        container.style.setProperty('--glow-opacity', intensity);
    }
}

function resetRoseParallax() {
    const container = document.querySelector('.animated-bouquet .container');
    if (container) {
        container.style.setProperty('--rotate-x', '0deg');
        container.style.setProperty('--rotate-y', '0deg');
        container.style.setProperty('--glow-opacity', '0.3');
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    preloadMedia();
    createStars();
    setInterval(createPetal, 300);
    setInterval(createAngel, 7000);

    // Инициализация
    document.getElementById('media-display').addEventListener('click', (e) => {
        e.preventDefault();
        currentMediaIndex = (currentMediaIndex + 1) % mediaData.length;
        showCurrentMedia();
    });

    const openBtn = document.getElementById('openBtn');
    openBtn.addEventListener('click', () => {
        switchScreen('.intro-screen', '.congrats-screen');
        // Пытаемся запустить музыку при первом клике (browser policy)
        if (!isMusicPlaying) {
            bgMusic.play().catch(() => { });
            isMusicPlaying = true;
            musicBtn.querySelector('.icon').textContent = '🔇';
        }
    });

    const nextBtn = document.getElementById('nextBtn');
    nextBtn.addEventListener('click', function () {
        switchScreen('.congrats-screen', '.memories-screen');
        showCurrentMedia();
    });

    const backBtn = document.getElementById('backBtn');
    backBtn.addEventListener('click', function () {
        switchScreen('.memories-screen', '.congrats-screen');
    });

    // Интерактивность розы
    const roseContainer = document.querySelector('.animated-bouquet');
    if (roseContainer) {
        window.addEventListener('mousemove', updateRoseParallax);
        window.addEventListener('touchmove', updateRoseParallax, { passive: true });
        window.addEventListener('touchend', resetRoseParallax);
    }

    // Инициализация кнопок
    nextBtn.style.display = 'block';
});

// Скрытие прелоадера после полной загрузки
window.onload = () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('fade-out');
    }, 1500); // Даем пользователю полюбоваться сердечком
};
