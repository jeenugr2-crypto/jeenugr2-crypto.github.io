/* Renders testimonial cards from testimonials.json into #testimonials-grid */
(function () {
  var grid = document.getElementById('testimonials-grid');
  if (!grid) return;

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function avatar(t) {
    if (t.avatar) {
      var img = el('img', 'avatar');
      img.src = t.avatar;
      img.alt = '';
      return img;
    }
    return el('span', 'avatar avatar--initial', t.name.trim().charAt(0).toUpperCase());
  }

  function card(t) {
    var article = el('article', 'tcard');
    if (t.featured) article.classList.add('tcard--tint', 'tcard--tall');
    if (t.tint) article.classList.add('tcard--tint');

    var top = el('div', 'tcard__top');
    top.appendChild(el('span', 'quote', '“'));
    var rating = Math.max(0, Math.min(5, t.rating || 5));
    top.appendChild(el('span', 'stars', '★'.repeat(rating)));

    var quote = el('p', 'tcard__quote', '"' + t.quote + '"');
    if (t.featured) quote.classList.add('tcard__quote--lg');

    var footer = el('footer', 'tcard__author');
    footer.appendChild(avatar(t));
    var meta = el('span');
    meta.appendChild(el('strong', null, t.name));
    meta.appendChild(el('small', null, t.relation));
    footer.appendChild(meta);

    article.appendChild(top);
    article.appendChild(quote);
    article.appendChild(footer);
    return article;
  }

  fetch(grid.dataset.src || 'testimonials.json')
    .then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    })
    .then(function (list) {
      grid.innerHTML = '';
      list.forEach(function (t) { grid.appendChild(card(t)); });
    })
    .catch(function (err) {
      console.error('Could not load testimonials:', err);
      grid.innerHTML = '<p class="tgrid__error">Testimonials could not be loaded.</p>';
    });
})();
