document.addEventListener('DOMContentLoaded', function() {
    // Navigation toggle for mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            
            // Transform hamburger to X
            const spans = menuToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.classList.toggle('active');
            });
        });
    }
    
    // Hide header on scroll down, show on scroll up
    let lastScrollTop = 0;
    const header = document.querySelector('.site-header');
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.classList.add('hidden');
            
            // Close mobile menu if open
            if (navList && navList.classList.contains('active')) {
                navList.classList.remove('active');
                
                if (menuToggle) {
                    const spans = menuToggle.querySelectorAll('span');
                    spans.forEach(span => {
                        span.classList.remove('active');
                    });
                }
            }
        } else {
            // Scrolling up
            header.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Cookie consent
    const cookieConsent = document.querySelector('.cookie-consent');
    const acceptCookiesBtn = document.querySelector('.accept-cookies');
    
    // Check if user has already accepted cookies
    if (!localStorage.getItem('cookiesAccepted')) {
        // Show cookie consent
        setTimeout(() => {
            if (cookieConsent) {
                cookieConsent.classList.add('active');
                document.body.classList.add('cookie-blur');
            }
        }, 1000);
    }
    
    // Handle cookie acceptance
    if (acceptCookiesBtn) {
        acceptCookiesBtn.addEventListener('click', function() {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieConsent.classList.remove('active');
            document.body.classList.remove('cookie-blur');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-list a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Funcionalidad para el acordeón de preguntas frecuentes
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Cerrar todos los otros items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Alternar el estado activo del item actual
                item.classList.toggle('active');
            });
        });
        
        // Abrir el primer item por defecto
        faqItems[0].classList.add('active');
    }
    
    // Funcionalidades para la página principal (index.html)
    // Tabs para la sección de Telcel
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remover clase active de todos los botones y contenidos
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Añadir clase active al botón clickeado
                button.classList.add('active');
                
                // Mostrar el contenido correspondiente
                const tabId = button.getAttribute('data-tab');
                document.getElementById(`${tabId}-tab`).classList.add('active');
            });
        });
    }
    
    // Slider para los paquetes de Izzi - Versión mejorada
    document.addEventListener('DOMContentLoaded', function() {
        initPackagesSlider();
    });

    function initPackagesSlider() {
        const sliderDots = document.querySelectorAll('.slider-dots .dot');
        const sliderPrev = document.querySelector('.slider-prev');
        const sliderNext = document.querySelector('.slider-next');
        const packagesSlider = document.querySelector('.packages-slider');
        
        if (!packagesSlider) return;
        
        // Asegurarse de que los slides sean visibles
        const packageSlides = document.querySelectorAll('.package-slide');
        packageSlides.forEach(slide => {
            slide.style.display = 'block';
            slide.style.visibility = 'visible';
        });
        
        let currentSlide = 0;
        const totalSlides = sliderDots.length || 3;
        
        // Función para mostrar un slide específico
        function showSlide(index) {
            if (index < 0) index = totalSlides - 1;
            if (index >= totalSlides) index = 0;
            
            currentSlide = index;
            
            // Calcular el ancho exacto para el desplazamiento
            const slideWidth = 100 / totalSlides;
            if (packagesSlider) {
                packagesSlider.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
            }
            
            // Actualizar los dots
            sliderDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
            
            console.log(`Mostrando slide ${currentSlide + 1} de ${totalSlides}`);
        }
        
        // Event listeners para los controles del slider
        if (sliderPrev) {
            sliderPrev.addEventListener('click', function(e) {
                e.preventDefault();
                showSlide(currentSlide - 1);
            });
        }
        
        if (sliderNext) {
            sliderNext.addEventListener('click', function(e) {
                e.preventDefault();
                showSlide(currentSlide + 1);
            });
        }
        
        // Event listeners para los dots
        sliderDots.forEach((dot, i) => {
            dot.addEventListener('click', function(e) {
                e.preventDefault();
                showSlide(i);
            });
        });
        
        // Inicializar el slider
        showSlide(0);
        
        // Soporte para gestos táctiles en móviles
        let touchStartX = 0;
        let touchEndX = 0;
        
        if (packagesSlider) {
            packagesSlider.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
            }, false);
            
            packagesSlider.addEventListener('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, false);
        }
        
        function handleSwipe() {
            if (touchEndX < touchStartX) {
                // Deslizar a la izquierda (siguiente slide)
                showSlide(currentSlide + 1);
            } else if (touchEndX > touchStartX) {
                // Deslizar a la derecha (slide anterior)
                showSlide(currentSlide - 1);
            }
        }
        
        // Actualizar el slider cuando cambia el tamaño de la ventana
        window.addEventListener('resize', function() {
            // Siempre aplicar transformación según el slide actual
            showSlide(currentSlide);
        });
    }
    
    // Tabs para la sección de comparación
    const comparisonTabs = document.querySelectorAll('.comparison-tab');
    const comparisonContents = document.querySelectorAll('.comparison-content');
    
    if (comparisonTabs.length > 0) {
        comparisonTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remover clase active de todos los tabs y contenidos
                comparisonTabs.forEach(t => t.classList.remove('active'));
                comparisonContents.forEach(content => content.classList.remove('active'));
                
                // Añadir clase active al tab clickeado
                tab.classList.add('active');
                
                // Mostrar el contenido correspondiente
                const category = tab.getAttribute('data-category');
                document.getElementById(`${category}-comparison`).classList.add('active');
            });
        });
    }
    
    // Añadir atributos data-label a las celdas de la tabla para responsividad
    const tableRows = document.querySelectorAll('.table-row');
    
    if (tableRows.length > 0) {
        tableRows.forEach(row => {
            // Obtener los encabezados de la tabla
            const headerCells = row.closest('.comparison-content').querySelector('.table-header').querySelectorAll('.header-cell');
            const cells = row.querySelectorAll('div');
            
            // Añadir atributos data-label a cada celda basado en el encabezado correspondiente
            cells.forEach((cell, index) => {
                if (headerCells[index]) {
                    const headerText = headerCells[index].textContent.trim();
                    cell.setAttribute('data-label', headerText);
                }
            });
        });
    }
    
    // Funcionalidad para la sección de cobertura nacional
    const providerBtns = document.querySelectorAll('.provider-btn');
    const serviceBtns = document.querySelectorAll('.service-btn');
    const coveragePoints = document.querySelectorAll('.coverage-points');
    const statsCards = document.querySelectorAll('.stats-card');
    
    // Función para actualizar la visualización del mapa
    function updateMapVisualization() {
        // Obtener el proveedor y servicio activos
        const activeProvider = document.querySelector('.provider-btn.active').getAttribute('data-provider');
        const activeService = document.querySelector('.service-btn.active').getAttribute('data-service');
        
        // Ocultar todos los puntos de cobertura
        coveragePoints.forEach(points => {
            points.classList.remove('active');
        });
        
        // Mostrar los puntos correspondientes al proveedor y servicio seleccionados
        const activePoints = document.querySelector(`.coverage-points.${activeProvider}.${activeService}`);
        if (activePoints) {
            activePoints.classList.add('active');
        }
        
        // Actualizar las tarjetas de estadísticas
        statsCards.forEach(card => {
            card.classList.remove('active');
        });
        
        const activeStatsCard = document.querySelector(`.stats-card.${activeProvider}-stats`);
        if (activeStatsCard) {
            activeStatsCard.classList.add('active');
        }
    }
    
    // Event listeners para los botones de proveedor
    if (providerBtns.length > 0) {
        providerBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remover clase active de todos los botones de proveedor
                providerBtns.forEach(b => b.classList.remove('active'));
                
                // Añadir clase active al botón clickeado
                btn.classList.add('active');
                
                // Actualizar la visualización
                updateMapVisualization();
            });
        });
    }
    
    // Event listeners para los botones de servicio
    if (serviceBtns.length > 0) {
        serviceBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remover clase active de todos los botones de servicio
                serviceBtns.forEach(b => b.classList.remove('active'));
                
                // Añadir clase active al botón clickeado
                btn.classList.add('active');
                
                // Actualizar la visualización
                updateMapVisualization();
            });
        });
    }
    
    // Inicializar la visualización del mapa
    if (providerBtns.length > 0 && serviceBtns.length > 0) {
        updateMapVisualization();
    }
});
