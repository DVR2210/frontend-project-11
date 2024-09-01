function addPostBlock() {
    // Создаем основной div с классом 'card border-0'
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card border-0';

    // Создаем вложенный div с классом 'card-body'
    const cardBodyDiv = document.createElement('div');
    cardBodyDiv.className = 'card-body';

    // Создаем div с текстом 'Посты' и классом 'card-title h4'
    const cardTitleDiv = document.createElement('div');
    cardTitleDiv.className = 'card-title h4';
    cardTitleDiv.textContent = 'Посты';

    // Вставляем cardTitleDiv внутрь cardBodyDiv
    cardBodyDiv.appendChild(cardTitleDiv);

    // Вставляем cardBodyDiv внутрь cardDiv
    cardDiv.appendChild(cardBodyDiv);

    // Находим элемент с классом 'posts'
    const postsContainer = document.querySelector('.posts');

    // Вставляем созданный cardDiv внутрь postsContainer
    postsContainer.appendChild(cardDiv);
}

function addFidsBlock() {
  // Создаем основной div с классом 'card border-0'
  const cardDiv = document.createElement('div');
  cardDiv.className = 'card border-0';

  // Создаем вложенный div с классом 'card-body'
  const cardBodyDiv = document.createElement('div');
  cardBodyDiv.className = 'card-body';

  // Создаем div с текстом 'Посты' и классом 'card-title h4'
  const cardTitleDiv = document.createElement('div');
  cardTitleDiv.className = 'card-title h4';
  cardTitleDiv.textContent = 'Фиды';

  // Вставляем cardTitleDiv внутрь cardBodyDiv
  cardBodyDiv.appendChild(cardTitleDiv);

  // Вставляем cardBodyDiv внутрь cardDiv
  cardDiv.appendChild(cardBodyDiv);

  // Находим элемент с классом 'posts'
  const feedsContainer = document.querySelector('.feeds');

  // Вставляем созданный cardDiv внутрь postsContainer
  feedsContainer.appendChild(cardDiv);
}

// function createUlElement() { // Создаем элемент ul
//   const ulElement = document.createElement('ul');
//   ulElement.classList.add('list-group', 'border-0', 'rounded-0'); // Добавляем классы к элементу
//   return ulElement; // Возвращаем созданный элемент
// }

function createListItem(href, textContent, dataId) { // Создаем элемент li

    const ulElement = document.createElement('ul');
    ulElement.classList.add('list-group', 'border-0', 'rounded-0'); 
    
    const liElement = document.createElement('li');
    liElement.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');

    const aElement = document.createElement('a'); // Создаем элемент a
    aElement.href = href;
    aElement.classList.add('fw-bold');
    aElement.setAttribute('data-id', dataId);
    aElement.target = '_blank';
    aElement.rel = 'noopener noreferrer';
    aElement.textContent = textContent;

    const buttonElement = document.createElement('button'); // Создаем кнопку
    buttonElement.type = 'button';
    buttonElement.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    buttonElement.setAttribute('data-id', dataId);
    buttonElement.setAttribute('data-bs-toggle', 'modal');
    buttonElement.setAttribute('data-bs-target', '#modal');
    buttonElement.textContent = 'Просмотр';

    ulElement.appendChild(liElement);
    liElement.appendChild(aElement); // Вкладываем элементы a и кнопку в li
    liElement.appendChild(buttonElement); 

    const cardTitleDiv = document.querySelector('.card-title');
    cardTitleDiv.appendChild(ulElement);
    
};

export default { 
    addPostBlock, 
    addFidsBlock, 
    //createUlElement,
    createListItem
};
