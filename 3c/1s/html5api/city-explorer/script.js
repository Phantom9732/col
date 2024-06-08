document.addEventListener('DOMContentLoaded', (event) => {
    const apiList = document.getElementById('api-list');

    // Проверка поддержки HTML5 API
    const supportedApis = [
        { name: 'Geolocation API', supported: 'geolocation' in navigator },
        { name: 'LocalStorage API', supported: 'localStorage' in window },
        { name: 'ServiceWorker API', supported: 'serviceWorker' in navigator },
        { name: 'IndexedDB API', supported: 'indexedDB' in window },
        { name: 'WebRTC API', supported: 'RTCPeerConnection' in window },
        { name: 'Notification API', supported: 'Notification' in window },
        { name: 'Vibration API', supported: 'vibrate' in navigator },
        { name: 'Battery Status API', supported: 'getBattery' in navigator },
    ];

    supportedApis.forEach(api => {
        const li = document.createElement('li');
        li.textContent = `${api.name}: ${api.supported ? 'Supported' : 'Not Supported'}`;
        apiList.appendChild(li);
    });

    if (!supportedApis[0].supported) {
        alert('Geolocation is not supported by your browser.');
        return;
    }

    if (!supportedApis[1].supported) {
        alert('LocalStorage is not supported by your browser.');
        return;
    }

    // Инициализация карты
    const map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Функция для сохранения маркеров в LocalStorage
    function saveMarkers(markers) {
        localStorage.setItem('markers', JSON.stringify(markers));
    }

    // Загрузка маркеров из LocalStorage
    const markers = JSON.parse(localStorage.getItem('markers')) || [];

    // Добавление сохраненных маркеров на карту
    markers.forEach(marker => {
        L.marker([marker.latitude, marker.longitude]).addTo(map)
            .bindPopup(marker.popup)
            .openPopup();
    });

    // Обработка клика на карте для добавления нового маркера
    map.on('click', function(e) {
        const { lat, lng } = e.latlng;
        const popupText = prompt('Enter a name for this marker:');
        
        if (popupText) {
            const newMarker = { latitude: lat, longitude: lng, popup: popupText };
            markers.push(newMarker);
            saveMarkers(markers);

            L.marker([lat, lng]).addTo(map)
                .bindPopup(popupText)
                .openPopup();
        }
    });

    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        map.setView([latitude, longitude], 13);

        localStorage.setItem('lastPosition', JSON.stringify({ latitude, longitude }));

        L.marker([latitude, longitude]).addTo(map)
            .bindPopup('You are here!')
            .openPopup();
    });

    const lastPosition = JSON.parse(localStorage.getItem('lastPosition'));
    if (lastPosition) {
        map.setView([lastPosition.latitude, lastPosition.longitude], 13);
        L.marker([lastPosition.latitude, lastPosition.longitude]).addTo(map)
            .bindPopup('Last known position')
            .openPopup();
    }
});
