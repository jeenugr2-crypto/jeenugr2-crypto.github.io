/* Restrained motion system: scroll reveals and the founder count-up. */
(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var counter = document.querySelector('[data-count-to]');

  function finishCounter() {
    if (counter) counter.textContent = counter.getAttribute('data-count-to') + '+';
  }

  if (reduceMotion || !('IntersectionObserver' in window)) {
    finishCounter();
    return;
  }

  var groups = [
    '.hero__copy > *, .hero__visual',
    '.about__heading > *, .founder-story__body > *',
    '.why > .container > .eyebrow, .why > .container > .h2, .why__sub, .approach-promise, .benefit',
    '.study-notes .eyebrow, .study-notes .h2, .section-intro, .notes-card',
    '.testimonials .eyebrow, .testimonials .h2, .testimonial-marquee',
    '.booking__inner > *, .cta__top > *, .footer__inner > *'
  ];
  var revealItems = [];

  groups.forEach(function (selector) {
    document.querySelectorAll(selector).forEach(function (item, index) {
      if (revealItems.indexOf(item) !== -1) return;
      item.classList.add('reveal');
      item.style.setProperty('--reveal-delay', Math.min(index % 5, 4) * 70 + 'ms');
      revealItems.push(item);
    });
  });

  document.documentElement.classList.add('motion-ready');

  var revealObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });
  revealItems.forEach(function (item) { revealObserver.observe(item); });

  if (!counter) return;
  counter.textContent = '0+';
  var countObserver = new IntersectionObserver(function (entries, observer) {
    if (!entries[0].isIntersecting) return;
    var target = Number(counter.getAttribute('data-count-to')) || 100;
    var start = performance.now();
    var duration = 1400;

    function tick(now) {
      var progress = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.round(target * eased) + '+';
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
    observer.disconnect();
  }, { threshold: 0.6 });
  countObserver.observe(counter);
})();
