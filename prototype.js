const menuButton = document.querySelector('.menu-button');
const siteNav = document.querySelector('.site-nav');

if (menuButton && siteNav) {
  const closeMenu = () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.querySelector('.sr-only').textContent = 'Open navigation';
    siteNav.classList.remove('is-open');
  };

  menuButton.addEventListener('click', () => {
    const willOpen = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(willOpen));
    menuButton.querySelector('.sr-only').textContent = willOpen ? 'Close navigation' : 'Open navigation';
    siteNav.classList.toggle('is-open', willOpen);
  });

  siteNav.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeMenu();
      menuButton.focus();
    }
  });
}

document.querySelectorAll('[data-current-year]').forEach(element => {
  element.textContent = new Date().getFullYear();
});

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.reveal');

if (!reduceMotion && 'IntersectionObserver' in window) {
  revealItems.forEach(item => item.classList.add('is-pending'));
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('is-pending');
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
}


// Interactive About page
const globe = document.querySelector('#journey-globe');
const globeTrigger = document.querySelector('.globe-trigger');
const flight = document.querySelector('#journey-flight');

if (globe && flight && !reduceMotion) {
  let flightTimer;
  const replayFlight = () => {
    window.clearTimeout(flightTimer);
    globe.classList.remove('is-traveling');
    void globe.offsetWidth;
    globe.classList.add('is-traveling');
    if (typeof flight.beginElement === 'function') flight.beginElement();
    if (globeTrigger) globeTrigger.setAttribute('aria-pressed', 'true');
    flightTimer = window.setTimeout(() => {
      globe.classList.remove('is-traveling');
      if (globeTrigger) globeTrigger.setAttribute('aria-pressed', 'false');
    }, 3100);
  };
  globe.addEventListener('mouseenter', replayFlight);
  globe.addEventListener('focus', replayFlight);
  globe.addEventListener('click', replayFlight);
  if (globeTrigger) globeTrigger.addEventListener('click', replayFlight);
}

const journey = document.querySelector('[data-scroll-journey]');
const journeyPath = journey?.querySelector('[data-journey-progress]');
const journeyCharacter = journey?.querySelector('[data-journey-character]');
const journeyStops = [...(journey?.querySelectorAll('[data-journey-stop]') || [])];
const dotsGroup = journey?.querySelector('[data-stop-dots]');

if (journey && journeyPath && journeyCharacter && journeyStops.length) {
  const pathLength = journeyPath.getTotalLength();
  journeyPath.style.strokeDasharray = String(pathLength);
  const dots = [];

  if (dotsGroup) {
    journeyStops.forEach((_, index) => {
      const point = journeyPath.getPointAtLength(pathLength * (index / (journeyStops.length - 1)));
      const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('cx', point.x);
      dot.setAttribute('cy', point.y);
      dot.setAttribute('r', '10');
      dot.setAttribute('class', 'journey-stop-dot');
      dotsGroup.appendChild(dot);
      dots.push(dot);
    });
  }

  let ticking = false;
  const updateJourney = () => {
    const rect = journey.getBoundingClientRect();
    const viewportAnchor = window.innerHeight * 0.55;
    const progress = Math.max(0, Math.min(1, (viewportAnchor - rect.top) / Math.max(1, rect.height - window.innerHeight * 0.22)));
    const point = journeyPath.getPointAtLength(pathLength * progress);
    journeyCharacter.setAttribute('transform', 'translate(' + point.x + ' ' + point.y + ')');
    journeyPath.style.strokeDashoffset = String(pathLength * (1 - progress));

    const activeIndex = Math.min(journeyStops.length - 1, Math.floor(progress * journeyStops.length));
    journeyStops.forEach((stop, index) => stop.classList.toggle('is-active', index <= activeIndex));
    dots.forEach((dot, index) => dot.classList.toggle('is-active', index <= activeIndex));
    journeyCharacter.dataset.stop = String(activeIndex);
    ticking = false;
  };

  const requestJourneyUpdate = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateJourney);
      ticking = true;
    }
  };

  if (reduceMotion) {
    journeyPath.style.strokeDashoffset = '0';
    journeyStops.forEach(stop => stop.classList.add('is-active'));
    dots.forEach(dot => dot.classList.add('is-active'));
  } else {
    updateJourney();
    window.addEventListener('scroll', requestJourneyUpdate, { passive: true });
    window.addEventListener('resize', requestJourneyUpdate);
  }
}

const methodData = {
  listen: {
    number: '01',
    title: 'Listen for the real need.',
    copy: 'Understand the people, constraints, and context around a problem before deciding what the technology should do.',
    example: 'In practice: separating the needs of youth players, adult players, and organizers for the KVA website.'
  },
  question: {
    number: '02',
    title: 'Question the first explanation.',
    copy: 'Look for hidden assumptions, edge cases, and the gap between what a system reports and what people actually experience.',
    example: 'In practice: asking whether continuous node risk was being lost inside a binary classification target during routing research.'
  },
  model: {
    number: '03',
    title: 'Make the system visible.',
    copy: 'Turn uncertainty into a diagram, experiment, data model, or small prototype that the team can inspect and challenge.',
    example: 'In practice: modeling roles, inventory, credit, payments, and security before implementing the retail resale system.'
  },
  build: {
    number: '04',
    title: 'Build the smallest honest proof.',
    copy: 'Create a working slice that tests the important decision, then improve it with evidence instead of decorating an untested idea.',
    example: 'In practice: completing the provider-neutral routing, fallback, and operational design of the LLM gateway.'
  },
  reflect: {
    number: '05',
    title: 'Learn from what changed.',
    copy: 'Compare the result with the original need, document the tradeoffs, and carry the lesson into the next iteration.',
    example: 'In practice: using the MD3 experiment results to explain how shrinking touch targets changed error rates.'
  }
};

document.querySelectorAll('[data-method-explorer]').forEach(explorer => {
  const tabs = [...explorer.querySelectorAll('[data-method]')];
  const number = explorer.querySelector('[data-method-number]');
  const title = explorer.querySelector('[data-method-title]');
  const copy = explorer.querySelector('[data-method-copy]');
  const example = explorer.querySelector('[data-method-example]');

  const activate = key => {
    const item = methodData[key];
    if (!item) return;
    tabs.forEach(tab => tab.setAttribute('aria-selected', String(tab.dataset.method === key)));
    number.textContent = item.number;
    title.textContent = item.title;
    copy.textContent = item.copy;
    example.textContent = item.example;
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(tab.dataset.method));
    tab.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      const nextIndex = event.key === 'ArrowRight' ? (index + 1) % tabs.length : (index - 1 + tabs.length) % tabs.length;
      tabs[nextIndex].focus();
      activate(tabs[nextIndex].dataset.method);
    });
  });
});
