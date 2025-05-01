import onChange from 'on-change';
import axios from 'axios';
import { string, setLocale } from 'yup';

import uniqueId from 'lodash/uniqueId.js';
import i18next from 'i18next';
import resources from './locales/index.js';
import render from './view.js';
import parser from './parser.js';

const defaultLanguage = 'ru';
const timeout = 5000;

// const validate = (url, urlList) => {
//   const schema = string().trim().required().url().notOneOf(urlList);
//   return schema.validate(url, { abortEarly: false }).catch((error) => {
//     console.error('Ошибка валидации Yup:', error.message, error.errors);
//     throw error;
//   });
// };

// const validate = (url, urlList) => {
//   const schema = string().trim().required().url().notOneOf(urlList);
//   console.log('Валидация URL:', url, 'Список существующих URL:', urlList); // Лог для отладки
//   return schema.validate(url, { abortEarly: false }).catch((error) => {
//     console.error('Ошибка валидации Yup:', error.message, error.errors); // Лог ошибки
//     throw error;
//   });
// };

const validate = (url, urlList) => {
  const schema = string().trim().required().url().notOneOf(urlList);
  console.log('Валидация URL:', url, 'Список существующих URL:', urlList);
  return schema.validate(url, { abortEarly: false })
    .then((result) => {
      console.log('Валидация успешна:', result); // Лог успеха
      return result;
    })
    .catch((error) => {
      console.error('Ошибка валидации Yup:', error.message, error.errors); // Лог ошибки
      throw error;
    });
};


const getAxiosResponse = (url) => {
  const allOrigins = 'https://allorigins.hexlet.app/get';
  const newUrl = new URL(allOrigins);
  newUrl.searchParams.set('url', url);
  newUrl.searchParams.set('disableCache', 'true');
  return axios.get(newUrl).catch((error) => {
    console.error('Ошибка в getAxiosResponse:', error.message);
    throw error;
  });
};

const createPosts = (state, newPosts, feedId) => {
  const preparedPosts = newPosts.map((post) => ({ ...post, feedId, id: uniqueId() }));
  state.content.posts = [...state.content.posts, ...preparedPosts];
};

const getNewPosts = (state) => {
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

export default () => {
  const i18nInstance = i18next.createInstance();
  i18nInstance.init({
    lng: defaultLanguage,
    debug: true,
    resources,
  }).then(() => {
    console.log('i18next инициализирован:', i18nInstance.t('success')); // Лог для проверки
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

    setLocale({
      mixed: {
        notOneOf: 'doubleRss',
        default: 'defaultError',
      },
      string: {
        url: 'invalidUrl',
        default: 'defaultError',
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

    elements.form.addEventListener('input', (e) => {
      e.preventDefault();
      watchedState.process.processState = 'filling';
      watchedState.inputValue = e.target.value;
    });

    elements.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const urlList = watchedState.content.feeds.map(({ link }) => link);
      console.log('Перед валидацией: inputValue=', watchedState.inputValue, 'urlList=', urlList); // Лог для отладки

      validate(watchedState.inputValue, urlList)
        .then(() => {
          watchedState.valid = true;
          watchedState.process.processState = 'sending';
          return getAxiosResponse(watchedState.inputValue);
        })
        .then((response) => {
          const data = response.data.contents;
          const { feed, posts } = parser(data, i18nInstance, elements);
          const feedId = uniqueId();

          watchedState.content.feeds.push({ ...feed, feedId, link: watchedState.inputValue });
          createPosts(watchedState, posts, feedId);

          watchedState.process.processState = 'finished';
        })
        .catch((error) => {
          console.error('Ошибка в обработчике submit:', error.message, error); // Лог ошибки
          watchedState.valid = false;
          watchedState.process.error = error.message ?? 'defaultError';
          watchedState.process.processState = 'error';
        });
    });

    elements.modal.modalWindow.addEventListener('show.bs.modal', (e) => {
      const currentPostId = e.relatedTarget.getAttribute('data-id');
      watchedState.uiState.visitedLinksIds.add(currentPostId);
      watchedState.uiState.modalId = currentPostId;
    });

    elements.posts.addEventListener('click', (e) => {
      console.log("кнопки отработал") // временно 
      console.log(posts) // временно 
      const currentPostId = e.target.dataset.id;
      if (currentPostId) {
        watchedState.uiState.visitedLinksIds.add(currentPostId);
        console.log(`Добавлен ID: ${currentPostId}`);
      }
      alert("Кнопка клик РАБОТАЕ!") // временно 
    });

  });

alert("APLIRKATION.JS отработал")

};