export default (data) => {
  const parser = new DOMParser();
  const parsedData = parser.parseFromString(data, 'application/xml');

  const error = parsedData.querySelector('parsererror');
  if (error) {
    throw new Error('parseError');
  }

  const channel = parsedData.querySelector('channel');
  const feedTitle = channel.querySelector('title').textContent;
  const feedDescription = channel.querySelector('description').textContent;
  const feedLink = channel.querySelector('link').textContent;
  const feed = { title: feedTitle, description: feedDescription, link: feedLink };

  const items = Array.from(parsedData.querySelectorAll('item'));

  const posts = items.map((item) => {
    const title = item.querySelector('title').textContent;
    const description = item.querySelector('description').textContent;
    const link = item.querySelector('link').textContent;

    return { title, description, link };
  });
   
  return { feed, posts };
};

// {
//   feed: {
//     title: "Мой RSS-канал",
//     description: "Описание канала",
//     link: "https://example.com/feed"
//   },
//   posts: [
//     { title: "Пост 1", description: "Описание поста 1", link: "https://example.com/post1" },
//     { title: "Пост 2", description: "Описание поста 2", link: "https://example.com/post2" },
//     // ...
//   ]
// }
