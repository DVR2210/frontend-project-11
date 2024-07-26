import * as yup from 'yup';

const schema = yup.object().shape({
    url: yup.string()
      .url('Введите корректный URL') // Проверяет, что строка является корректным URL
      .required('URL обязателен') // Проверяет, что поле не пустое
      .test('unique', 'URL уже добавлен', function(value) { // Пользовательская проверка уникальности
        const { existingUrls } = this.options.context; // Получаем существующие URL из контекста
        return !existingUrls.includes(value); // Проверяем, что URL уникален
      }),
  });

  export default schema;