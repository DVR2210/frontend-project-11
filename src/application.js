import onChange from 'on-change';
import axios from 'axios';
import { string, setLocale } from 'yup'; //import * as yup from 'yup';

import uniqueId from 'lodash/uniqueId.js'; //
import i18next from 'i18next';
import resources from './locales/index.js';
import parser from './parser.js';
import render from './view.js'; //

const defaultLanguage = 'ru';
const timeout = 5000; 

const validate = (url, urlList) => { //
  const schema = string().trim().required().url()
    .notOneOf(urlList);
  return schema.validate(url);
};

const getAxiosResponse = (url) => {
  const allOrigins = 'https://allorigins.hexlet.app/get';
  const newUrl = new URL(allOrigins);
  newUrl.searchParams.set('url', url);
  newUrl.searchParams.set('disableCache', 'true');
  return axios.get(newUrl);
};

const createPosts = (state, newPosts, feedId) => { ///
  const preparedPosts = newPosts.map((post) => ({ ...post, feedId, id: uniqueId() }));
  state.content.posts = [...state.content.posts, ...preparedPosts];
};

const getNewPosts = (state) => { //
  const promises = state.content.feeds
    .map(({ link, feedId }) => getAxiosResponse(link)
      .then((response) => {
        const { posts } = parser(response.data.contents);
        const addedPosts = state.content.posts.map((post) => post.link);
        const newPosts = posts.filter((post) => !addedPosts.includes(post.link));
        if (newPosts.length > 0) {
          createPosts(state, newPosts, feedId);
        }
        return Promise.resolve();
      }));

  Promise.allSettled(promises)
    .finally(() => {
      setTimeout(() => getNewPosts(state), timeout);
    });
};

setLocale({
  mixed: {
    notOneOf: 'doubleRss',
  },
  string: {
    url: 'invalidUrl',
  },
});

const initialState = {
  valid: true,
  inputValue: '',
  process: {
    processState: 'filling',
    error: '',
  },
  content: {
    posts: [],
    feeds: [],
  },
  uiState: {
    visitedLinksIds: new Set(),
    modalId: '',
  },
};

const watchedState = onChange(initialState, render(elements, initialState, i18nInstance));
getNewPosts(watchedState);


// export default () => {
//   const i18nInstance = i18next.createInstance();
//   i18nInstance.init({
//     lng: defaultLanguage,
//     debug: true,
//     resources,
//   }).then(() => {
//     const elements = {
//       form: document.querySelector('.rss-form'),
//       input: document.querySelector('input[id="url-input"]'),
//       button: document.querySelector('button[type="submit"]'),
//       feedback: document.querySelector('.feedback'),
//       feeds: document.querySelector('.feeds'),
//       posts: document.querySelector('.posts'),
//       modal: {
//         modalWindow: document.querySelector('.modal'),
//         title: document.querySelector('.modal-title'),
//         body: document.querySelector('.modal-body'),
//         button: document.querySelector('.full-article'),
//       },
//     };

//     const messages = {
//       success: i18nInstance.t('текст о том что все ок'),
//       invalidUrl: i18nInstance.t('errors.invalidUrl'),
//       doubleRss: i18nInstance.t('errors.doubleRss'),
//       emptyField: i18nInstance.t('errors.emptyField'),
//     };

//     const showMessage = (message, isError = true) => {
//       elements.feedback.innerText = message;
//       elements.feedback.classList.toggle('text-danger', isError);
//       elements.feedback.classList.toggle('text-success', !isError);
//       elements.input.classList.toggle('is-invalid', isError);
//     };

//     const schema = yup.object().shape({
//       url: yup.string()
//         .url(messages.invalidUrl)
//         .required(messages.emptyField)
//         .test('unique', messages.doubleRss, function (value) {
//           const { existingUrls } = this.options.context;
//           return existingUrls ? !existingUrls.includes(value) : true;
//         }),
//     });

//     const validateUrl = async (url) => {
//       try {
//         await schema.validate({ url }, { context: { existingUrls: ['http://existingurl.com'] } });
//         showMessage(messages.success, false);
//         return true;
//       } catch (err) {
//         if (err.inner.length === 0) {
//           err.inner = [err];
//         }

//         err.inner.forEach((error) => {
//           switch (error.message) {
//             case messages.invalidUrl:
//               showMessage(messages.invalidUrl);
//               break;
//             case messages.emptyField:
//               showMessage(messages.emptyField);
//               break;
//             case messages.doubleRss:
//               showMessage(messages.doubleRss);
//               break;
//             default:
//               showMessage('Неизвестная ошибка валидации');
//           }
//         });
//         return false;
//       }
//     };
//     elements.input.addEventListener('input', async () => {
//       const url = elements.input.value.trim();
//       if (url === '') {
//         showMessage(messages.emptyField);
//         return;
//       }

//       await validateUrl(url);
//     });
//     elements.form.addEventListener('submit', async (event) => {
//       event.preventDefault();

//       const url = elements.input.value.trim();
//       if (url === '') {
//         showMessage(messages.emptyField);
//         return;
//       }

//       const isValid = await validateUrl(url);
//       if (!isValid) {
//         return;
//       }

//       try {
//         const response = await getAxiosResponse(url);
//         const parsedData = parser(response.data.contents);
//         console.log('Результат парсинга:', parsedData);
//         showMessage(messages.success, false);
//         //renderPosts(parsedData);
//       } catch (error) {
//         showMessage('Ошибка при загрузке RSS');
//         console.error('Ошибка при загрузке RSS:', error);
//       }
//     });
//   });

//   const { addPostBlock, addFidsBlock, createListItem } = view;
  
//   addPostBlock();
//   addFidsBlock();

// };

  