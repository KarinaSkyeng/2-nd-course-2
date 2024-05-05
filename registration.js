// Функция для обработки отправки формы регистрации
export async function handleRegistrationFormSubmit(event) {
    try {
        event.preventDefault(); // Предотвращаем отправку формы по умолчанию
        event.stopPropagation(); // Останавливаем дальнейшее распространение события

        // Получаем данные из полей формы
        const name = document.getElementById('name').value;
        const login = document.getElementById('login').value;
        const password = document.getElementById('password').value;

        // Создаем объект userData с данными пользователя
        const userData = {
            name: name,
            login: login,
            password: password
        };

        // Вызываем функцию регистрации пользователя
        await registerUser(userData);
        console.log('Регистрация прошла успешно!');

        // Дополнительные действия после успешной регистрации (например, переход на страницу авторизации)
        renderLoginForm(); // Пример перехода на форму авторизации после успешной регистрации
 
        return false;
    } catch (error) {
        console.error('Ошибка при регистрации:', error.message);
        // Обработка ошибки регистрации (например, вывод сообщения об ошибке пользователю)
        // alert('Ошибка при регистрации: ' + error.message);
    }
}

