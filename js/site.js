// site.js — loads header/footer, handles theme toggle and mobile nav
(function(){
  async function includeHTML(selector, url) {
    try {
      const res = await fetch(url);
      if (!res.ok) return;
      const html = await res.text();
      const el = document.querySelector(selector);
      if (el) el.innerHTML = html;
    } catch (e) {
      console.warn('Include failed', url, e);
    }
  }

  // Create floating theme button if it doesn't exist
  function createFloatingThemeButton() {
    if (document.getElementById('floating-theme-btn')) return;
    
    const btn = document.createElement('button');
    btn.id = 'floating-theme-btn';
    btn.className = 'floating-theme-btn';
    btn.innerHTML = '<i class="fas fa-moon"></i>';
    btn.setAttribute('type', 'button');
    btn.setAttribute('aria-label', 'Toggle theme');
    
    document.body.appendChild(btn);
  }

  // Load header/footer if placeholders exist
  document.addEventListener('DOMContentLoaded', async () => {
    await includeHTML('#site-header', 'includes/header.html');
    await includeHTML('#site-footer', 'includes/footer.html');

    // Create floating button
    createFloatingThemeButton();

    // Theme init
    const saved = localStorage.getItem('theme') || 'dark';
    setTheme(saved);

    // Wire up theme toggle (delegated for both floating and header buttons)
    document.body.addEventListener('click', (e) => {
      // Check for header theme toggle
      const headerTheme = e.target.closest('#theme-toggle');
      // Check for floating theme toggle
      const floatingTheme = e.target.closest('#floating-theme-btn');
      
      if (headerTheme || floatingTheme) {
        const now = document.documentElement.classList.contains('light-theme') ? 'light' : 'dark';
        const next = now === 'light' ? 'dark' : 'light';
        setTheme(next);
        localStorage.setItem('theme', next);
      }
    });

    // Mobile toggle
    document.body.addEventListener('click', (e) => {
      const mt = e.target.closest('.mobile-toggle');
      if (!mt) return;
      const nav = document.querySelector('.nav-links');
      if (nav) nav.classList.toggle('active');
    });
  });

  function setTheme(name) {
    if (name === 'light') {
      document.documentElement.classList.add('light-theme');
      const icon = document.querySelector('#theme-toggle i');
      if (icon) icon.className = 'fas fa-sun';
      const floatingIcon = document.querySelector('#floating-theme-btn i');
      if (floatingIcon) floatingIcon.className = 'fas fa-sun';
    } else {
      document.documentElement.classList.remove('light-theme');
      const icon = document.querySelector('#theme-toggle i');
      if (icon) icon.className = 'fas fa-moon';
      const floatingIcon = document.querySelector('#floating-theme-btn i');
      if (floatingIcon) floatingIcon.className = 'fas fa-moon';
    }
  }

})();
