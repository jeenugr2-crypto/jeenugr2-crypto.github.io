/* Renders testimonial cards from testimonials.json into #testimonials-grid */
(function () {
  document.querySelectorAll('svg.icon').forEach(function (icon) {
    icon.setAttribute('aria-hidden', 'true');
  });
  var year = document.getElementById('current-year');
  if (year) year.textContent = new Date().getFullYear();

  var grid = document.getElementById('testimonials-grid');
  if (!grid) return;

  // Keeps the page usable when opened directly from the filesystem, where
  // browsers block fetch() requests for local JSON files.
  var fallbackTestimonials = [
    { name: 'Priya S.', relation: 'Parent of Grade 7 student', rating: 5, quote: "Within just a couple of months, my daughter's marks in school have jumped noticeably. But what makes me happier is she actually enjoys maths now — something I never thought I'd say.", featured: true },
    { name: 'Anil K.', relation: 'Parent of Grade 5 student', rating: 5, quote: 'He looks forward to his maths session every single day. As a parent, that\'s all I could ask for.', avatar: null },
    { name: 'Meera R.', relation: 'Parent of Grade 9 student', rating: 5, quote: 'School performance has improved significantly. Her confidence in solving problems has changed completely.' },
    { name: 'Suresh M.', relation: 'Parent of Grade 6 student', rating: 5, quote: 'He used to dread maths homework. Now he finishes it before I even ask. The change has been wonderful.', avatar: null, tint: true },
    { name: 'Kavita D.', relation: 'Parent of Grade 8 student', rating: 5, quote: 'What surprised me most — my child actually talks about what she learnt today in maths. That spark is what every parent dreams of.' }
  ];

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function avatar(t) {
    var name = t.name.trim();
    var tone = 0;
    for (var i = 0; i < name.length; i += 1) tone += name.charCodeAt(i);
    return el('span', 'avatar avatar--initial avatar--tone-' + ((tone % 5) + 1), name.charAt(0).toUpperCase());
  }

  function card(t) {
    var article = el('article', 'tcard');
    article.tabIndex = 0;
    if (t.featured) article.classList.add('tcard--tint');
    if (t.tint) article.classList.add('tcard--tint');

    var top = el('div', 'tcard__top');
    top.appendChild(el('span', 'quote', '“'));
    var rating = Number.isFinite(Number(t.rating)) ? Math.round(Number(t.rating)) : 5;
    rating = Math.max(0, Math.min(5, rating));
    top.appendChild(el('span', 'stars', '★'.repeat(rating)));

    var quote = el('p', 'tcard__quote', '“' + t.quote + '”');
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

  function render(list) {
    grid.innerHTML = '';
    list.forEach(function (t) { grid.appendChild(card(t)); });
    list.forEach(function (t) {
      var duplicate = card(t);
      duplicate.setAttribute('aria-hidden', 'true');
      duplicate.tabIndex = -1;
      grid.appendChild(duplicate);
    });
  }

  fetch(grid.dataset.src || 'testimonials.json')
    .then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    })
    .then(function (list) {
      render(list);
    })
    .catch(function (err) {
      console.warn('Could not load testimonials.json; using embedded fallback data.', err);
      render(fallbackTestimonials);
    });
})();
