# react-mesto-api-full
Репозиторий для приложения проекта `Mesto`, включающий фронтенд и бэкенд части приложения со следующими возможностями: авторизации и регистрации пользователей, операции с карточками и пользователями. Бэкенд расположите в директории `backend/`, а фронтенд - в `frontend/`. 
  
 публичный IP-адрес сервера 51.250.102.250
 client https://mesto-mern.nomoreparties.sbs
 server https://api.mesto-mern.nomoreparties.sbs
 
 Хранение JWT-токена реализовано через LocalStotage, после авторизации пользователя (GET запроса https://api.mesto-mern.nomoreparties.sbs/signin) в ответ пирдет JWT-токен.
 Для тестирования отсальных эндпоинтов в Postmam, в Headers нужно добавить заголовок Authorization со значением "Bearer + JWT-токен"
 https://skr.sh/sElD6RhnZki
