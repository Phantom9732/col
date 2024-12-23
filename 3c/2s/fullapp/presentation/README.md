# Презентация проекта по предмету "Сборка полнофункциональных приложений".
Выбранная предметная область: Е-коммерс приложение с админкой (магазин), а конкретно – магазин товаров для животных.
Стек технологий: Flask (python), React (js).

# Анализ выбора технологического стека:

## Backend (Flask)

### Преимущества Flask:
- Легкий и минималистичный фреймворк
- Быстрый старт разработки
- Гибкая структура проекта
- Отличная документация
- Большое сообщество

## Frontend (React)
### Преимущества React
- Компонентный подход
- Virtual DOM для производительности
- Большая экосистема библиотек
- Material-UI для быстрой разработки UI
- Отличная документация

## Взаимодействие. Преимущества связки
- RESTful API
- JSON для обмена данными
- Простая интеграция
- Асинхронные операции
- Легкое масштабирование

## Альтернативы
### Почему не Django
- Избыточен для небольшого проекта
- Менее гибкая структура
- Больше накладных расходов

### Почему не Vue/Angular
- React проще для начала
- Больше готовых компонентов
- Лучшая производительность

## Масштабируемость
### Flask
- Легко добавлять новые эндпоинты
- Простая интеграция с другими сервисами
- Поддержка микросервисной архитектуры
### React
- Компонентная архитектура
- Легкое добавление новых фич
- Поддержка code splitting

## Анализ предметной области
### Определение Целей и Задач:
#### Цели
- Создание онлайн-платформы для продажи товаров для животных
- Автоматизация процесса продаж и управления заказами
- Увеличение доступности зоотоваров для владельцев животных
#### Задачи
- Разработка удобного каталога товаров с категориями
- Внедрение системы управления заказами
- Реализация личных кабинетов пользователей
- Создание административной панели
### Анализ Рынка
#### Конкуренты:
1. PetShop.ru
- ✅ Широкий ассортимент
- ❌ Сложная навигация
2. Четыре Лапы
- ✅ Известный бренд
- ✅ Широкий ассортимент
- ✅ Много оффлайн магазинов
- ❌ Высокие цены
#### Наши преимущества:
- Простой интерфейс
- Быстрая обработка заказов
- Прозрачная система статусов
### Целевая Аудитория
- Владельцы домашних животных (25-45 лет)
- Заводчики
- Ветеринарные клиники
- Зоогостиницы
### Требования
#### Функциональные:
- Регистрация/авторизация
- Каталог товаров
- Корзина покупок
- Оформление заказов
- Административная панель
#### Нефункциональные:
- Время отклика < 2 сек
- Доступность 99.9%
- Поддержка всех браузеров
### Пользовательские Сценарии
#### Сценарии для неавторизованного пользователя
##### Просмотр каталога
1. Открывает главную страницу
2. Загружает список товаров
3. Фильтрует по категориям
4. Показывает отфильтрованные товары
##### Регистрация
1. Пользователь нажимает "Регистрация"
2. Заполняет форму:
   - Username
   - Email
   - Password
3. Система валидирует данные
4. Создаётся аккаунт
5. Перенаправление на логин

####  Сценарии для покупателя
##### Процесс покупки
1. Добавляет товар
2. Оформляет заказ
3. Указывает адрес
4. Подтверждает заказ
##### Работа с корзиной
1. Добавление товара:
   - Выбор товара
   - Указание количества
   - Добавление в корзину

2. Управление корзиной:
   - Изменение количества
   - Удаление товаров
   - Очистка корзины
##### Оформление заказа
1. Переход в корзину
2. Проверка состава заказа
3. Ввод адреса доставки
4. Подтверждение заказа
#### Сценарии для администратора
##### Управление товарами
1. Добавляет товар
2. Выбирает категорию
3. Устанавливает количество
4. Публикует товар
##### Обработка заказов
1. Просмотр новых заказов
2. Проверка наличия товаров
3. Изменение статуса:
   - В обработке
   - Отправлен
   - Доставлен
4. Отправка уведомлений

### Бизнес-процессы
#### Управление каталогом товаров
- Автоматическое обновление остатков
- Система уведомлений о низком остатке
- Автоматическое формирование заказов поставщикам

#### Управление складом
- Автоматический учёт остатков
- Прогнозирование спроса
- Автоматическое формирование заявок поставщикам

#### Обработка заказов
#### Управление товарами
#### Работа с клиентами

### Технические Ограничения
#### Технологии:
- Frontend: React
- Backend: Flask
- Database: SQLite
#### Frontend Ограничения
##### Браузеры
- Chrome 89+
- Firefox 87+
- Safari 14+
- Edge 89+
- Internet Explorer не поддерживается
##### React Ограничения
- React 18.0+
- Node.js 14.0+
- npm 6.14+
#### Backend Ограничения
##### База данных SQLite
- Максимальный размер БД: 281 TB
- Ограничения конкурентного доступа
- Отсутствие встроенной репликации
- Ограниченная масштабируемость
#### Инфраструктурные ограничения
##### Хостинг
- Минимальные требования:
  - CPU: 2 ядра
  - RAM: 4GB
  - Диск: 20GB SSD
##### Сеть
- Пропускная способность: 100Mbps
- Latency: < 100ms
- SSL/TLS шифрование
#### Безопасность
##### Аутентификация
- Сложность пароля:
  - Минимум 8 символов
  - Цифры + буквы + спецсимволы
- Максимум 5 попыток входа
- Двухфакторная аутентификация
##### Авторизация
- Role-based access control
- Разграничение прав доступа
- Логирование действий

### Законодательство
#### Защита персональных данных
##### ФЗ-152 "О персональных данных"
- Требования к хранению:
  - Шифрование данных
  - Хранение на территории РФ
  - Срок хранения данных
- Обязательные документы:
  - Политика обработки ПД
  - Согласие на обработку ПД
  - Уведомление Роскомнадзора
#### Интернет-торговля
##### Закон "О защите прав потребителей"
- Информация о товаре:
  - Полное описание
  - Характеристики
  - Цена
  - Производитель
- Возврат товара:
  - 14 дней без объяснения
  - 7 дней для обмена

#### ФЗ-54 "О применении ККТ"
- Онлайн-кассы
- Электронные чеки
- Передача данных в ФНС

### Ветеринарное законодательство
#### ФЗ "О ветеринарии"
- Требования к кормам:
  - Сертификаты качества
  - Условия хранения
  - Сроки годности
- Ветеринарные препараты:
  - Лицензирование
  - Особые условия продажи
### Информационная безопасность
#### 152-ФЗ требования
- Уровни защиты информации
- Классификация информационных систем
- Меры по защите информации
### Налогообложение
#### Налоговый учет
- НДС (20%)
- Налог на прибыль
- Онлайн-отчетность
### Документооборот
#### Обязательные документы
- Договор оферты
- Политика конфиденциальности
- Пользовательское соглашение
### Реализация требований
#### Технические меры
- SSL/TLS шифрование
- Двухфакторная аутентификация
- Логирование действий
- Резервное копирование
#### Организационные меры
- Назначение ответственных лиц
- Внутренние регламенты
- Обучение персонала
### Проведение SWOT-анализа:
#### Strengths (Сильные стороны)
##### Технологические
- Современный стек технологий (React + Flask)
- Быстрая загрузка страниц
- Адаптивный дизайн
- REST API архитектура
##### Функциональные
- Простой и понятный интерфейс
- Удобная система поиска товаров
- Автоматизированная обработка заказов
- Система отслеживания статусов
##### Бизнес
- Низкие операционные расходы
- Быстрый запуск проекта
- Масштабируемая архитектура
- Легкая интеграция новых функций
#### Weaknesses (Слабые стороны)
##### Технические ограничения
- Ограничения SQLite при высокой нагрузке
- Отсутствие мобильного приложения
- Зависимость от внешних сервисов
- Ограниченная производительность
##### Функциональные недостатки
- Отсутствие многоязычности
- Отсутвтует система рекомендаций
- Ограниченные методы оплаты
- Простая система лояльности
#### Opportunities (Возможности)
##### Технологическое развитие
- Миграция на PostgreSQL
- Разработка мобильного приложения
- Внедрение AI для рекомендаций
- Улучшение производительности
##### Бизнес-возможности
- Расширение ассортимента
- Интеграция с поставщиками
- Выход на новые рынки
- Партнерские программы
##### Маркетинговые возможности
- Социальные сети интеграция
- Email-маркетинг
- Программа лояльности
- Реферальная система
#### Threats (Угрозы)
##### Технические риски
- Сбои в работе системы
- Проблемы с безопасностью
- Технические долги
- Устаревание технологий
##### Рыночные угрозы
- Сильная конкуренция
- Экономический спад
- Изменение поведения потребителей
- Новые конкуренты
##### Правовые риски
- Изменение законодательства
- Проблемы с персональными данными
- Ужесточение требований к онлайн-торговле
# Техническая документация
## Функциональность
### Основные функции
- Каталог товаров с категориями
- Корзина покупок
- Система заказов
- Административная панель
- Личный кабинет пользователя
### Роли пользователей
- Администратор: полный доступ
- Пользователь: покупки и история заказов
- Гость: просмотр каталога
## Архитектура
### Технологический стек
Frontend:
- React 18.0
- Material-UI
- Axios

Backend:
- Flask 2.0
- SQLAlchemy
- JWT Authentication

Database:
- SQLite 3
## База данных
### Связи
- User -> Orders (1:N)
- Product -> OrderItems (1:N)
- Order -> OrderItems (1:N)
#### Диаграмма
[![ER Diagramm](https://github.com/Phantom9732/col/blob/main/3c/2s/fullapp/presentation/img/db_diagramm.png?raw=true "Диаграмма")]
## Установка
### Требования
- Python 3.8+
- Node.js 14+
- npm 6+
### Команды
##### Backend
    # Backend
    cd backend
    python -m venv venv
    venv\Scripts\activate
    pip install -r requirements.txt
    python run.py

##### Frontend
    # Frontend
    cd frontend
    npm install
    npm start
# Пользовательская документация
## Руководство пользователя
### Регистрация и вход
1. Регистрация:
- Нажмите "Регистрация"
- Заполните поля:
    * Имя пользователя (мин. 3 символа)
    * Email (действующий)
    * Пароль (мин. 8 символов)
- Нажмите "Зарегистрироваться"

2. Вход:
- Введите имя пользователя
- Введите пароль
- Нажмите "Войти"
### Каталог товаров
1. Просмотр товаров:
   - Фильтрация по категориям
   - Сортировка по цене/названию
   - Поиск по названию

2. Карточка товара:
   - Название и описание
   - Цена
   - Наличие
   - Кнопка "В корзину"
### Корзина
1. Управление товарами:
   - Добавление товаров
   - Изменение количества
   - Удаление товаров
   - Очистка корзины

2. Оформление заказа:
   - Проверка состава
   - Ввод адреса доставки
   - Подтверждение заказа
### Личный кабинет
1. Заказы:
   - История заказов
   - Статусы заказов
   - Детали заказов

2. Профиль:
   - Личные данные
   - Смена пароля
   - Адреса доставки
## Руководство администратора
### Вход в админ-панель
Доступ:
- Логин: admin
- Пароль: admin
- URL: /admin
### Управление товарами
1. Добавление товара:
   - Название
   - Описание
   - Цена
   - Количество
   - Категория
   - Изображение

2. Редактирование:
   - Изменение данных
   - Обновление остатков
   - Удаление товаров
### Управление категориями
1. Создание категории:
   - Название
   - Описание
   - Изображение

2. Редактирование:
   - Изменение данных
   - Удаление (если нет товаров)
### Управление заказами
1. Просмотр заказов:
   - Фильтрация по статусу
   - Поиск по номеру

2. Обработка заказов:
   - Изменение статуса
   - Отмена заказа
   - Комментарии
## Техническая информация
### Статусы заказов
- Pending: новый заказ
- Processing: в обработке
- Shipped: отправлен
- Delivered: доставлен
- Cancelled: отменен
### Требования к системе
- Современный браузер
- Включенный JavaScript
- Стабильный интернет
### Безопасность
1. Требования к паролю:
   - Минимум 8 символов
   - Буквы и цифры
   - Спецсимволы

2. Защита данных:
   - Шифрование
   - Авторизация
   - Логирование
## Устранение неполадок
### 1. Проблемы входа:
   - Проверьте правильность данных
   - Используйте восстановление пароля

2. Проблемы заказа:
   - Проверьте наличие товара
   - Проверьте адрес доставки

3. Технические проблемы:
   - Очистите кэш браузера
   - Обновите страницу