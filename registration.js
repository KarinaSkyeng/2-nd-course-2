export async function handleRegistrationFormSubmit(event) {
    try {
        event.preventDefault(); // Предотвращаем отправку формы по умолчанию

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
        // Здесь вы можете выполнить дополнительные действия после успешной регистрации
    } catch (error) {
        console.error('Ошибка при регистрации:', error.message);
        // Здесь вы можете обработать ошибку регистрации
    }
}
