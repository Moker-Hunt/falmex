// Специальный JavaScript для слайдера пакетов
document.addEventListener('DOMContentLoaded', function() {
    console.log('Slider.js загружен');
    
    // Получаем все необходимые элементы
    const packagesSlider = document.querySelector('.packages-slider');
    const sliderPrev = document.querySelector('.slider-prev');
    const sliderNext = document.querySelector('.slider-next');
    const sliderDots = document.querySelectorAll('.slider-dots .dot');
    const packageCards = document.querySelectorAll('.package-card');
    
    // Проверяем, существуют ли элементы
    if (!packagesSlider) {
        console.error('Элемент .packages-slider не найден');
        return;
    }
    
    console.log('Слайдер найден:', packagesSlider);
    console.log('Количество карточек:', packageCards.length);
    
    // Настраиваем переменные
    let currentSlide = 0;
    const totalSlides = packageCards.length;
    
    // Настраиваем слайдер в зависимости от ширины экрана
    function setupSlider() {
        if (window.innerWidth <= 768) {
            // Мобильная версия - показываем одну карточку за раз
            packagesSlider.style.width = (totalSlides * 100) + '%';
            packageCards.forEach(card => {
                card.style.flex = `0 0 ${100 / totalSlides}%`;
                card.style.width = `${100 / totalSlides}%`;
            });
        } else {
            // Десктопная версия - показываем все карточки
            packagesSlider.style.width = '100%';
            packageCards.forEach(card => {
                card.style.flex = '0 0 100%';
                card.style.width = '100%';
            });
        }
    }
    
    // Функция для показа слайда
    function showSlide(index) {
        console.log(`Переключение на слайд ${index + 1}`);
        
        // Проверяем границы
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        
        currentSlide = index;
        
        if (window.innerWidth <= 768) {
            // Мобильная версия - сдвигаем слайдер
            const slideWidth = 100 / totalSlides;
            packagesSlider.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
        } else {
            // Десктопная версия - показываем только текущую карточку
            packageCards.forEach((card, i) => {
                if (i === currentSlide) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }
        
        // Обновляем активную точку
        sliderDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
        
        console.log(`Текущий слайд: ${currentSlide + 1}, всего слайдов: ${totalSlides}`);
    }
    
    // Обработчики событий для кнопок
    if (sliderPrev) {
        sliderPrev.addEventListener('click', function(e) {
            console.log('Нажата кнопка "Предыдущий"');
            e.preventDefault();
            showSlide(currentSlide - 1);
        });
    }
    
    if (sliderNext) {
        sliderNext.addEventListener('click', function(e) {
            console.log('Нажата кнопка "Следующий"');
            e.preventDefault();
            showSlide(currentSlide + 1);
        });
    }
    
    // Обработчики для точек
    sliderDots.forEach((dot, i) => {
        dot.addEventListener('click', function(e) {
            console.log(`Нажата точка ${i + 1}`);
            e.preventDefault();
            showSlide(i);
        });
    });
    
    // Поддержка свайпов
    let touchStartX = 0;
    let touchEndX = 0;
    
    packagesSlider.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        console.log('Начало свайпа:', touchStartX);
    }, false);
    
    packagesSlider.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        console.log('Конец свайпа:', touchEndX);
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        const swipeDiff = touchEndX - touchStartX;
        console.log('Разница свайпа:', swipeDiff);
        
        if (swipeDiff < -50) {
            // Свайп влево - следующий слайд
            showSlide(currentSlide + 1);
        } else if (swipeDiff > 50) {
            // Свайп вправо - предыдущий слайд
            showSlide(currentSlide - 1);
        }
    }
    
    // Обработка изменения размера окна
    window.addEventListener('resize', function() {
        console.log('Изменение размера окна, обновление слайдера');
        setupSlider();
        showSlide(currentSlide);
    });
    
    // Инициализация слайдера
    setupSlider();
    showSlide(0);
    
    console.log('Инициализация слайдера завершена');
});
