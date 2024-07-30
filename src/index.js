import * as yup from 'yup';
import './styles.scss';

const form = document.getElementById('rss-form');
const input = document.getElementById('url-input');
const button = document.getElementById('add-button');


// const schema = yup.object().shape({
//   url: yup.string()
//     .url('Введите корректный URL') // Проверяет, что строка является корректным URL
//     .required('URL обязателен') // Проверяет, что поле не пустое
//     .test('unique', 'URL уже добавлен', function(value) {
//         const { existingUrls } = this.options.context;
//         return existingUrls ? !existingUrls.includes(value) : true;
//     })
// });

//   form.addEventListener('submit', (event) => {
//     event.preventDefault(); // 
    
//     const url = input.value.trim();
//     const formData = { url };
    
//     schema.validate(formData, { context: { existingUrls: ['http://existingurl.com'] } })
//     .then(() => {
//       input.classList.remove('is-invalid');
//       alert(`"Успех" ${formData}`);
//     })
//     .catch(() => {
//       input.classList.add('is-invalid');
//       alert(`"Не удача" ${formData}`);
//     });
// });

const schema = yup.object().shape({
  url: yup.string()
    .url('Введите корректный URL') // Проверяет, что строка является корректным URL
    .required('URL обязателен') // Проверяет, что поле не пустое
    .test('unique', 'URL уже добавлен', function(value) {
        const { existingUrls } = this.options.context;
        console.log('Проверяемый URL:', value);
        console.log('Существующие URL:', existingUrls);
        return existingUrls ? !existingUrls.includes(value) : true;
    })
});

form.addEventListener('submit', (event) => {
  event.preventDefault(); 
  
  const url = input.value.trim();
  const formData = { url };
  
  console.log('Отправленные данные формы:', formData);

  schema.validate(formData, { context: { existingUrls: ['http://existingurl.com'] } })
  .then(() => {
    input.classList.remove('is-invalid');
    alert(`"Успех" ${JSON.stringify(formData)}`);
  })
  .catch((err) => {
    input.classList.add('is-invalid');
    console.error('Ошибка валидации:', err.errors);
    alert(`"Не удача" ${JSON.stringify(formData)}`);
  });
});
 