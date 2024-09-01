import * as yup from 'yup';
import './styles.scss';
import resources from './locales/index.js';
import onChange from 'on-change';
import i18next from 'i18next';
import parser from './parser.js';
import axios from 'axios';
import view from './view.js';


const getAxiosResponse = (url) => {
  const allOrigins = 'https://allorigins.hexlet.app/get';
  const newUrl = new URL(allOrigins);
  newUrl.searchParams.set('url', url);
  newUrl.searchParams.set('disableCache', 'true');
  return axios.get(newUrl);
};


getAxiosResponse('https://lorem-rss.hexlet.app/feed')
  .then(response => {
    console.log('Full response:', response);
    
    console.log('Contents:', response.data.contents);
    console.log("функция парсер", parser(response.data.contents));
  })
  .catch(error => console.error('Error:', error));



const defaultLanguage = 'ru';

export default () => {
    const i18nInstance = i18next.createInstance();
    i18nInstance.init({
      lng: defaultLanguage,
      debug: true,
      resources,
    }).then(() => {
      const elements = {
        form: document.querySelector('.rss-form'),
        input: document.querySelector('input[id="url-input"]'),
        button: document.querySelector('button[type="submit"]'),
        feedback: document.querySelector('.feedback'),
        feeds: document.querySelector('.feeds'),
        posts: document.querySelector('.posts'),
        modal: {
          modalWindow: document.querySelector('.modal'),
          title: document.querySelector('.modal-title'),
          body: document.querySelector('.modal-body'),
          button: document.querySelector('.full-article'),
        },
      };

      const showSucсessMessage = () => { // RSS успешно загружен
        const message = i18nInstance.t('sucсess'); 
        elements.feedback.innerText = message;
      };

      const showInvalidUrlMessage = () => { // Ссылка должна быть валидным URL     
        const message = i18nInstance.t('errors.invalidUrl'); 
        elements.feedback.innerText = message; 
      };

      const showDubleRssMessage = () => { // 'RSS уже существует'
        const message = i18nInstance.t('errors.doubleRss');
        elements.feedback.innerText = message; 
      }; 

      const showEmptyFieldMessage = () => { // Поле не должно быть пустым'
        const message = i18nInstance.t('errors.emptyField');
        elements.feedback.innerText = message;
      };


      const schema = yup.object().shape({
        url: yup.string()
          .url('Ссылка должна быть валидным URL') // Проверяет, что строка является корректным URL
          .required('Поле не должно быть пустым') // Проверяет, что поле не пустое
          .test('unique', 'RSS уже существует', function(value) {
              const { existingUrls } = this.options.context;
              console.log('Проверяемый URL:', value);
              console.log('Существующие URL:', existingUrls);
              return existingUrls ? !existingUrls.includes(value) : true;
          })
          
      });

      elements.form.addEventListener('submit', (event) => {
        event.preventDefault(); 
        
        const url = elements.input.value.trim();
        const formData = { url };

           
        schema.validate(formData, { context: { existingUrls: ['http://existingurl.com'] } })
        .then(() => {
          elements.input.classList.remove('is-invalid');
          elements.feedback.classList.remove('text-danger');
          elements.feedback.classList.add('text-success');
          showSucсessMessage()
          const parsedData = parser(url);
          console.log(parsedData);

          return getAxiosResponse(url); // новое изменение - поулчение данных <------- вот эти коменты 
              
        })

        .then((response) => { // Парсим данные с помощью функции parser <------- вот эти коменты 
          const parsedData = parser(response.data.contents);
          console.log('Результат парсинга:', parsedData);
        })

    

        .catch((err) => {
          
          if (err.inner.length === 0) {
            err.inner = [err];
          }
      
          err.inner.forEach((error) => {
            switch (error.message) {

              case 'Ссылка должна быть валидным URL':
                elements.input.classList.add('is-invalid');
                elements.feedback.classList.remove('text-success');
                elements.feedback.classList.add('text-danger');
                showInvalidUrlMessage();
                console.log('Ошибка валидации: Некорректный URL');
                break;

              case 'Поле не должно быть пустым':
                elements.input.classList.add('is-invalid');
                elements.feedback.classList.remove('text-success');
                elements.feedback.classList.add('text-danger');
                showEmptyFieldMessage();
                console.log('Ошибка валидации: URL обязателен');
                break;


              case 'RSS уже существует':
                elements.input.classList.add('is-invalid');
                elements.feedback.classList.remove('text-success');
                elements.feedback.classList.add('text-danger');
                showDubleRssMessage();
                console.log('Ошибка валидации: RSS уже существует');
                break;


              default:
                console.log('Неизвестная ошибка валидации');
            }
          });

        });

      }); 

    document.getElementById('btn-lg').addEventListener('click', function(event) {
      event.preventDefault(); // Предотвращаем отправку формы
      view.addPostBlock(); // Вызываем функцию добавления блока "Посты"
      view.addFidsBlock(); // Вызываем функцию добавления блока "Посты"
      view.createListItem('http', 'мой тестовый текст', '234');  
    });


  });
};


  