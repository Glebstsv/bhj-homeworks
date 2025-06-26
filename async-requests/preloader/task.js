document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');
    const itemsContainer = document.getElementById('items');
    
    // Проверяем, есть ли кэшированные данные
    const cachedData = localStorage.getItem('currencyData');
    const cachedTimestamp = localStorage.getItem('currencyTimestamp');
    const oneHour = 60 * 60 * 1000; // 1 час в миллисекундах
    
    if (cachedData && cachedTimestamp && (Date.now() - parseInt(cachedTimestamp) < oneHour)) {
        // Если есть свежие (менее 1 часа) кэшированные данные, используем их
        displayCurrencyData(JSON.parse(cachedData));
        loader.classList.remove('loader_active');
    } else {
        // Если нет кэша или данные устарели, делаем запрос
        fetchCurrencyData();
    }
    
    function fetchCurrencyData() {
        loader.classList.add('loader_active');
        itemsContainer.innerHTML = '';
        
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/slow-get-courses', true);
        
        xhr.onload = function() {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                
                // Кэшируем данные и текущее время
                localStorage.setItem('currencyData', xhr.responseText);
                localStorage.setItem('currencyTimestamp', Date.now().toString());
                
                displayCurrencyData(data);
            } else {
                console.error('Ошибка загрузки данных:', xhr.statusText);
            }
            loader.classList.remove('loader_active');
        };
        
        xhr.onerror = function() {
            console.error('Ошибка сети');
            loader.classList.remove('loader_active');
        };
        
        xhr.send();
    }
    
    function displayCurrencyData(data) {
        if (!data || !data.response || !data.response.Valute) {
            console.error('Некорректные данные о валютах');
            return;
        }
        
        const valutes = data.response.Valute;
        itemsContainer.innerHTML = '';
        
        for (const key in valutes) {
            if (valutes.hasOwnProperty(key)) {
                const valute = valutes[key];
                
                const itemDiv = document.createElement('div');
                itemDiv.className = 'item';
                
                const codeDiv = document.createElement('div');
                codeDiv.className = 'item__code';
                codeDiv.textContent = valute.CharCode;
                
                const valueDiv = document.createElement('div');
                valueDiv.className = 'item__value';
                valueDiv.textContent = valute.Value;
                
                const currencyDiv = document.createElement('div');
                currencyDiv.className = 'item__currency';
                currencyDiv.textContent = 'руб.';
                
                itemDiv.appendChild(codeDiv);
                itemDiv.appendChild(valueDiv);
                itemDiv.appendChild(currencyDiv);
                
                itemsContainer.appendChild(itemDiv);
            }
        }
    }
});