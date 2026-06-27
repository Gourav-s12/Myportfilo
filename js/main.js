(function () {
  const body = document.body;
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  const sections = Array.from(document.querySelectorAll("main section[id]"));
  const progressBar = document.querySelector(".story-progress span");
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const storage = {
    get: function (key) {
      try {
        return window.localStorage.getItem(key);
      } catch (error) {
        return null;
      }
    },
    set: function (key, value) {
      try {
        window.localStorage.setItem(key, value);
      } catch (error) {
        return;
      }
    }
  };

  if (prefersReducedMotion.matches) {
    body.classList.add("reduced-motion");
  }

  function closeMobileNav() {
    body.classList.remove("nav-open");
    if (navToggle) {
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open menu");
    }
  }

  function openMobileNav() {
    body.classList.add("nav-open");
    if (navToggle) {
      navToggle.setAttribute("aria-expanded", "true");
      navToggle.setAttribute("aria-label", "Close menu");
    }
  }

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      if (body.classList.contains("nav-open")) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", closeMobileNav);
  });

  document.addEventListener("click", function (event) {
    if (!body.classList.contains("nav-open")) {
      return;
    }

    const clickedNav = event.target.closest(".site-nav");
    const clickedToggle = event.target.closest(".nav-toggle");
    if (!clickedNav && !clickedToggle) {
      closeMobileNav();
    }
  });

  function setActiveLink(id) {
    navLinks.forEach(function (link) {
      const isActive = link.getAttribute("href") === "#" + id;
      link.classList.toggle("active", isActive);
    });
  }

  if ("IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id || "home");
        }
      });
    }, {
      rootMargin: "-38% 0px -50% 0px",
      threshold: 0.01
    });

    sections.forEach(function (section) {
      navObserver.observe(section);
    });
  }

  function updateProgress() {
    if (!progressBar) {
      return;
    }

    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
    progressBar.style.transform = "scaleX(" + Math.min(Math.max(progress, 0), 1) + ")";
  }

  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  const revealItems = Array.from(document.querySelectorAll(".reveal"));
  if ("IntersectionObserver" in window && !prefersReducedMotion.matches) {
    const revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.16
    });

    revealItems.forEach(function (item) {
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("in-view");
    });
  }

  const typeTarget = document.querySelector("[data-typewriter]");
  const typeWords = ["web platforms", "backend systems", "data projects", "interactive UI"];
  let typeWordIndex = 0;
  let typeCharIndex = 0;
  let deleting = false;

  function typeLoop() {
    if (!typeTarget || prefersReducedMotion.matches) {
      return;
    }

    const word = typeWords[typeWordIndex];
    typeTarget.textContent = word.slice(0, typeCharIndex);

    if (!deleting && typeCharIndex < word.length) {
      typeCharIndex += 1;
      window.setTimeout(typeLoop, 80);
      return;
    }

    if (!deleting && typeCharIndex === word.length) {
      deleting = true;
      window.setTimeout(typeLoop, 1100);
      return;
    }

    if (deleting && typeCharIndex > 0) {
      typeCharIndex -= 1;
      window.setTimeout(typeLoop, 42);
      return;
    }

    deleting = false;
    typeWordIndex = (typeWordIndex + 1) % typeWords.length;
    window.setTimeout(typeLoop, 160);
  }

  typeLoop();

  const savedTheme = storage.get("portfolio-theme");
  if (savedTheme === "dark") {
    body.classList.add("dark");
  }

  function syncThemeButton() {
    if (!themeToggle) {
      return;
    }

    const isDark = body.classList.contains("dark");
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
    themeToggle.innerHTML = isDark
      ? '<i class="fas fa-sun" aria-hidden="true"></i>'
      : '<i class="fas fa-moon" aria-hidden="true"></i>';
  }

  syncThemeButton();

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      body.classList.toggle("dark");
      storage.set("portfolio-theme", body.classList.contains("dark") ? "dark" : "light");
      syncThemeButton();
    });
  }

  const skillTabs = Array.from(document.querySelectorAll(".skill-tab"));
  const skillPanels = Array.from(document.querySelectorAll(".skill-panel"));

  skillTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      const targetId = tab.getAttribute("aria-controls");

      skillTabs.forEach(function (item) {
        const isActive = item === tab;
        item.classList.toggle("active", isActive);
        item.setAttribute("aria-selected", isActive ? "true" : "false");
      });

      skillPanels.forEach(function (panel) {
        const isActive = panel.id === targetId;
        panel.classList.toggle("active", isActive);
        panel.hidden = !isActive;
      });
    });
  });

  const filterButtons = Array.from(document.querySelectorAll(".filter-btn"));
  const projectCards = Array.from(document.querySelectorAll(".project-card"));

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const filter = button.dataset.filter;

      filterButtons.forEach(function (item) {
        item.classList.toggle("active", item === button);
      });

      projectCards.forEach(function (card) {
        const matches = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("is-hidden", !matches);
      });
    });
  });

  const modal = document.querySelector("[data-project-modal]");
  const modalTitle = document.querySelector("[data-modal-title]");
  const modalCategory = document.querySelector("[data-modal-category]");
  const modalDescription = document.querySelector("[data-modal-description]");
  const modalImage = document.querySelector("[data-modal-image]");
  const modalCounter = document.querySelector("[data-gallery-counter]");
  const modalPrev = document.querySelector("[data-gallery-prev]");
  const modalNext = document.querySelector("[data-gallery-next]");
  const modalCloseControls = Array.from(document.querySelectorAll("[data-modal-close]"));
  let galleryImages = [];
  let galleryIndex = 0;
  let lastFocusedElement = null;

  function renderGalleryImage() {
    if (!modalImage || !modalCounter || galleryImages.length === 0) {
      return;
    }

    const src = galleryImages[galleryIndex];
    modalImage.src = src;
    modalImage.alt = (modalTitle ? modalTitle.textContent : "Project") + " screenshot " + (galleryIndex + 1);
    modalCounter.textContent = (galleryIndex + 1) + " of " + galleryImages.length;

    const singleImage = galleryImages.length <= 1;
    if (modalPrev && modalNext) {
      modalPrev.hidden = singleImage;
      modalNext.hidden = singleImage;
    }
  }

  function openModal(card) {
    if (!modal || !card) {
      return;
    }

    lastFocusedElement = document.activeElement;
    galleryImages = (card.dataset.gallery || "").split(",").map(function (item) {
      return item.trim();
    }).filter(Boolean);
    galleryIndex = 0;

    const title = card.querySelector("h3");
    const category = card.querySelector(".project-type");
    const description = card.querySelector(".project-card-body p:not(.project-type)");

    if (modalTitle && title) {
      modalTitle.textContent = title.textContent;
    }
    if (modalCategory && category) {
      modalCategory.textContent = category.textContent;
    }
    if (modalDescription && description) {
      modalDescription.textContent = description.textContent;
    }

    renderGalleryImage();
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    body.classList.add("modal-open");

    const closeButton = modal.querySelector(".modal-close");
    if (closeButton) {
      closeButton.focus();
    }
  }

  function closeModal() {
    if (!modal || !modal.classList.contains("open")) {
      return;
    }

    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    body.classList.remove("modal-open");

    if (modalImage) {
      modalImage.removeAttribute("src");
      modalImage.removeAttribute("alt");
    }

    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
  }

  function showNextImage() {
    if (galleryImages.length <= 1) {
      return;
    }
    galleryIndex = (galleryIndex + 1) % galleryImages.length;
    renderGalleryImage();
  }

  function showPrevImage() {
    if (galleryImages.length <= 1) {
      return;
    }
    galleryIndex = (galleryIndex - 1 + galleryImages.length) % galleryImages.length;
    renderGalleryImage();
  }

  function trapModalFocus(event) {
    if (!modal || event.key !== "Tab") {
      return;
    }

    const focusable = Array.from(modal.querySelectorAll("button:not([hidden]), a[href], [tabindex]:not([tabindex='-1'])"))
      .filter(function (item) {
        return !item.disabled && item.offsetParent !== null;
      });

    if (focusable.length === 0) {
      event.preventDefault();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  document.addEventListener("click", function (event) {
    const trigger = event.target.closest(".open-project");
    if (trigger) {
      openModal(trigger.closest(".project-card"));
    }
  });

  modalCloseControls.forEach(function (control) {
    control.addEventListener("click", closeModal);
  });

  if (modalPrev) {
    modalPrev.addEventListener("click", showPrevImage);
  }

  if (modalNext) {
    modalNext.addEventListener("click", showNextImage);
  }

  document.addEventListener("keydown", function (event) {
    if (!modal || !modal.classList.contains("open")) {
      if (event.key === "Escape") {
        closeMobileNav();
      }
      return;
    }

    if (event.key === "Escape") {
      closeModal();
    }

    trapModalFocus(event);

    if (event.key === "ArrowRight") {
      showNextImage();
    }

    if (event.key === "ArrowLeft") {
      showPrevImage();
    }
  });

  const achievementCards = Array.from(document.querySelectorAll(".achievement-card"));
  const achievementPrev = document.querySelector("[data-achievement-prev]");
  const achievementNext = document.querySelector("[data-achievement-next]");
  let achievementIndex = 0;

  function renderAchievement() {
    achievementCards.forEach(function (card, index) {
      card.classList.toggle("active", index === achievementIndex);
    });
  }

  if (achievementPrev) {
    achievementPrev.addEventListener("click", function () {
      achievementIndex = (achievementIndex - 1 + achievementCards.length) % achievementCards.length;
      renderAchievement();
    });
  }

  if (achievementNext) {
    achievementNext.addEventListener("click", function () {
      achievementIndex = (achievementIndex + 1) % achievementCards.length;
      renderAchievement();
    });
  }
})();
