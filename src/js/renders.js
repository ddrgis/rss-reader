import $ from 'jquery';

export const renderFeedList = feeds => {
  const container = $('#rss-list');
  const feedItems = feeds.map(
    feed => `<div class="list-group-item">
      <h5>${feed.title}</h5>
      <p>${feed.description}</p>
    </div>`
  );
  const content = `<ul class="list-group">${feedItems}</ul>`;
  container.html(content);
};

export const renderRSSModal = ({ title, description, link }) => {
  $('#rss-modal-label').html(title);
  $('#rss-modal-body')
    .html(`<p class="lead">${description}</p>`)
    .append(
      `<br/><small class="text-muted"><a href='${link}' title='${title}'>Source: ${link}</a></small>`
    );
  $('#rss-modal').modal('show');
};

export const renderArticlesList = articles => { // TODO: sorting
  const container = $('#articles-list');
  const articlesItems = articles.map(a => {
    const link = document.createElement('a');
    link.setAttribute('href', '');
    link.setAttribute('title', a.title);
    link.setAttribute('data-toggle', 'modal');
    link.setAttribute('data-target', '#rss-modal');
    link.innerHTML = a.title;
    link.addEventListener('click', renderRSSModal.bind(this, a));
    const li = document.createElement('li');
    li.setAttribute('class', 'list-group-item');
    li.appendChild(link);
    return li;
  });

  const ul = document.createElement('ul');
  ul.setAttribute('class', 'list-group');
  articlesItems.forEach(a => {
    ul.appendChild(a);
  });

  const div = document.createElement('div');
  div.appendChild(ul);
  container.html(div);
};

export const renderValidationError = error => {
  const container = $('#rss-input-error');
  const rssURLInput = $('#input-rss-url');

  if (error) {
    rssURLInput.addClass('border border-danger');
  } else {
    rssURLInput.removeClass('border border-danger');
  }

  container.html(error);
};

export const toggleRSSLoading = isLoading => {
  const loader = $('#rss-input-loader');
  if (isLoading) {
    loader.removeClass('invisible');
    loader.addClass('visible');
  } else {
    loader.removeClass('visible');
    loader.addClass('invisible');
  }
  $('#btn-submit').prop('disabled', (index, value) => !value);
};

export const showContentContainer = () => {
  const container = $('#rss-container');
  container.removeClass('invisible');
  container.addClass('visible');
};