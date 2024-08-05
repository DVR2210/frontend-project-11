import * as yup from 'yup';
import './styles.scss';
import resources from './locales/index.js';
import onChange from 'on-change';
import i18next from 'i18next';

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
          .test('hasDomain', 'URL должен содержать доменное имя', function(value) {
            const domainPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.[a-zA-Z]{2,})(\/|$)/;
            return domainPattern.test(value);
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
              
        })
        .catch((err) => {
          console.log("имя ошибки", err.name.massage)
          elements.input.classList.add('is-invalid');
          showInvalidUrlMessage();
        });
      });

     
    });
  };
  