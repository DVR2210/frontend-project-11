import * as yup from 'yup';
import './styles.scss';

const schema = yup.object().shape({
    url: yup.string()
      .url('Введите корректный URL') // Проверяет, что строка является корректным URL
      .required('URL обязателен') // Проверяет, что поле не пустое
      .test('unique', 'URL уже добавлен', function(value) { // Пользовательская проверка уникальности
        const { existingUrls } = this.options.context; // Получаем существующие URL из контекста
        return !existingUrls.includes(value); // Проверяем, что URL уникален
      }),
  });

 
  const form = document.getElementById('rss-form');
  const input = document.getElementById('url-input');

  form.addEventListener('submit', (event) => {
    event.preventDefault(); // 
    
    const url = input.value.trim();
    const formData = { url };

    schema.validate(formData, { context: { existingUrls: ['http://existingurl.com'] } })
    .then(() => {
      input.classList.remove('is-invalid');
    })
    .catch((err) => {
      input.classList.add('is-invalid');
    });
});

 