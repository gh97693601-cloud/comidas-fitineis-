(function () {
  const cfg = window.CLONE_CONFIG || {};
  const toast = document.querySelector('.toast');
  const upgradeModal = document.querySelector('.upgrade-modal');

  function notify(text) {
    toast.textContent = text;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3800);
  }

  function goToCheckout(url) {
    if (!url) {
      notify('Configure seus links de checkout em config.js antes de publicar.');
      return;
    }
    const checkoutUrl = new URL(url);
    const trackingParams = new URLSearchParams(window.location.search);
    trackingParams.forEach((value, key) => checkoutUrl.searchParams.set(key, value));
    window.location.href = checkoutUrl.toString();
  }

  function openUpgrade() {
    upgradeModal.classList.add('open');
    upgradeModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-lock');
    upgradeModal.querySelector('.upgrade-accept').focus();
  }

  function closeUpgrade() {
    upgradeModal.classList.remove('open');
    upgradeModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-lock');
  }

  document.querySelectorAll('[data-scroll]').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelector('#ofertas').scrollIntoView({ behavior: 'smooth' });
    });
  });

  document.querySelectorAll('[data-plan]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      if (link.dataset.plan === 'basico') {
        openUpgrade();
        return;
      }
      goToCheckout(cfg.checkoutCompleto);
    });
  });

  upgradeModal.querySelector('.upgrade-accept').addEventListener('click', () => {
    goToCheckout(cfg.checkoutUpgrade);
  });

  upgradeModal.querySelector('.upgrade-decline').addEventListener('click', () => {
    goToCheckout(cfg.checkoutBasico);
  });

  upgradeModal.querySelector('.upgrade-close').addEventListener('click', closeUpgrade);
  upgradeModal.addEventListener('click', (event) => {
    if (event.target === upgradeModal) closeUpgrade();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && upgradeModal.classList.contains('open')) closeUpgrade();
  });

  const recipeModal = document.querySelector('.modal');
  const recipeImage = recipeModal.querySelector('img');
  document.querySelectorAll('.page-shot').forEach((button) => {
    button.addEventListener('click', () => {
      const source = button.querySelector('img');
      recipeImage.src = source.src;
      recipeImage.alt = source.alt;
      recipeModal.classList.add('open');
    });
  });
  recipeModal.querySelector('button').addEventListener('click', () => recipeModal.classList.remove('open'));
  recipeModal.addEventListener('click', (event) => {
    if (event.target === recipeModal) recipeModal.classList.remove('open');
  });
})();

