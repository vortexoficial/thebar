(() => {
  const body = document.body;
  const loader = document.querySelector(".site-loader");
  const siteHeader = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileOverlay = document.querySelector(".mobile-overlay");

  if (loader) {
    const startedAt = Date.now();
    let loaderHidden = false;
    const hideLoader = () => {
      if (loaderHidden) return;
      loaderHidden = true;
      const elapsed = Date.now() - startedAt;
      const delay = Math.max(0, 1250 - elapsed);

      window.setTimeout(() => {
        loader.classList.add("is-hidden");
        document.documentElement.classList.remove("is-loading");
        window.setTimeout(() => loader.remove(), 760);
      }, delay);
    };

    if (document.readyState === "complete") {
      hideLoader();
    } else {
      window.addEventListener("load", hideLoader, { once: true });
      window.setTimeout(hideLoader, 4200);
    }
  } else {
    document.documentElement.classList.remove("is-loading");
  }

  if (siteHeader) {
    const updateHeaderState = () => {
      siteHeader.classList.toggle("is-scrolled", window.scrollY > 16);
    };

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });
  }

  const floatingScrollbar = document.createElement("div");
  const floatingScrollbarThumb = document.createElement("span");
  let scrollbarTimer;
  let scrollbarFrame = null;

  floatingScrollbar.className = "floating-scrollbar";
  floatingScrollbar.setAttribute("aria-hidden", "true");
  floatingScrollbar.appendChild(floatingScrollbarThumb);
  body.appendChild(floatingScrollbar);

  function updateFloatingScrollbar(show) {
    const doc = document.documentElement;
    const viewportHeight = window.innerHeight;
    const scrollHeight = Math.max(doc.scrollHeight, body.scrollHeight);
    const maxScroll = scrollHeight - viewportHeight;

    if (!show) floatingScrollbar.classList.remove("is-visible");

    if (maxScroll <= 1 || body.classList.contains("menu-open") || body.classList.contains("lightbox-open")) {
      floatingScrollbar.classList.remove("is-visible");
      return;
    }

    const trackHeight = Math.max(1, floatingScrollbar.clientHeight || viewportHeight - 28);
    const thumbHeight = Math.max(34, Math.round((viewportHeight / scrollHeight) * trackHeight));
    const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
    const travel = Math.max(0, trackHeight - thumbHeight);

    floatingScrollbarThumb.style.height = `${thumbHeight}px`;
    floatingScrollbarThumb.style.transform = `translate3d(0, ${Math.round(progress * travel)}px, 0)`;

    if (!show) return;
    floatingScrollbar.classList.add("is-visible");
    window.clearTimeout(scrollbarTimer);
    scrollbarTimer = window.setTimeout(() => floatingScrollbar.classList.remove("is-visible"), 720);
  }

  function requestScrollbarUpdate(show) {
    if (scrollbarFrame) window.cancelAnimationFrame(scrollbarFrame);
    scrollbarFrame = window.requestAnimationFrame(() => {
      scrollbarFrame = null;
      updateFloatingScrollbar(show);
    });
  }

  function hideFloatingScrollbar() {
    window.clearTimeout(scrollbarTimer);
    floatingScrollbar.classList.remove("is-visible");
  }

  requestScrollbarUpdate(false);
  window.addEventListener("scroll", () => requestScrollbarUpdate(true), { passive: true });
  window.addEventListener("resize", () => requestScrollbarUpdate(false));

  function closeMenu() {
    if (!menuToggle || !mobileOverlay) return;
    body.classList.remove("menu-open");
    hideFloatingScrollbar();
    menuToggle.setAttribute("aria-expanded", "false");
    mobileOverlay.setAttribute("aria-hidden", "true");
  }

  if (menuToggle && mobileOverlay) {
    menuToggle.addEventListener("click", () => {
      const open = !body.classList.contains("menu-open");
      body.classList.toggle("menu-open", open);
      if (open) hideFloatingScrollbar();
      menuToggle.setAttribute("aria-expanded", String(open));
      mobileOverlay.setAttribute("aria-hidden", String(!open));
    });

    mobileOverlay.addEventListener("click", (event) => {
      if (event.target.matches("a")) closeMenu();
    });
  }

  const currentPage = body.dataset.page || "/";
  document.querySelectorAll("[data-nav]").forEach((link) => {
    const target = link.dataset.nav;
    const active = target === currentPage || (target !== "/" && currentPage.startsWith(`${target}/`));
    link.classList.toggle("is-active", active);
  });

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  document.querySelectorAll("lord-icon[data-icon-loop]").forEach((icon) => {
    let timer = null;

    function stopTimer() {
      if (!timer) return;
      window.clearInterval(timer);
      timer = null;
    }

    function replay(player) {
      if (reducedMotion.matches) {
        stopTimer();
        player.stop?.();
        player.seekToStart?.();
        return;
      }

      player.loop = false;
      if (typeof player.playFromStart === "function") {
        player.playFromStart();
      } else {
        player.seekToStart?.();
        player.play?.();
      }
    }

    function startManualLoop() {
      const player = icon.playerInstance;
      if (!player) return;
      const interval = Math.max(1000, Number(icon.dataset.iconLoop) || 4000);

      stopTimer();
      player.loop = false;
      player.stop?.();
      player.seekToStart?.();
      replay(player);
      timer = window.setInterval(() => replay(player), interval);
    }

    if (icon.playerInstance?.ready) {
      startManualLoop();
    } else {
      icon.addEventListener("ready", startManualLoop, { once: true });
    }
  });

  const revealItems = [...document.querySelectorAll("[data-reveal]")];
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  const servicesCarousel = document.querySelector(".services-carousel");
  const serviceCards = servicesCarousel ? [...servicesCarousel.querySelectorAll(".service-card")] : [];

  if (servicesCarousel && serviceCards.length > 1) {
    const mobileCarousel = window.matchMedia("(max-width: 640px)");
    const carouselInterval = 4000;
    const carouselTransition = 720;
    let activeServiceIndex = 0;
    let carouselTimer = null;
    let shineTimer = null;
    let carouselVisible = !("IntersectionObserver" in window);
    let pointerDown = false;
    let pointerDragging = false;
    let pointerId = null;
    let pointerStartX = 0;
    let pointerStartY = 0;
    let suppressCarouselClick = false;

    function carouselEnabled() {
      return mobileCarousel.matches && !reducedMotion.matches;
    }

    function stopCarouselTimer() {
      if (!carouselTimer) return;
      window.clearInterval(carouselTimer);
      carouselTimer = null;
    }

    function clearCarouselShine() {
      window.clearTimeout(shineTimer);
      shineTimer = null;
      serviceCards.forEach((card) => card.classList.remove("is-shining"));
    }

    function setCarouselDragOffset(value) {
      const drag = Math.max(-120, Math.min(120, value));
      servicesCarousel.style.setProperty("--service-drag", `${Math.round(drag)}px`);
      servicesCarousel.style.setProperty("--service-drag-soft", `${Math.round(drag * 0.35)}px`);
    }

    function clearCarouselDragOffset() {
      servicesCarousel.style.removeProperty("--service-drag");
      servicesCarousel.style.removeProperty("--service-drag-soft");
    }

    function triggerCenteredCardShine(delay = carouselTransition) {
      clearCarouselShine();
      if (!carouselEnabled() || !carouselVisible) return;

      const activeCard = serviceCards[activeServiceIndex];
      shineTimer = window.setTimeout(() => {
        if (!carouselEnabled() || !carouselVisible || !activeCard.classList.contains("is-active")) return;
        activeCard.classList.remove("is-shining");
        activeCard.offsetWidth;
        activeCard.classList.add("is-shining");
      }, delay);
    }

    function setActiveServiceCard(index, options = {}) {
      const { shineDelay = carouselTransition, restart = true } = options;
      activeServiceIndex = (index + serviceCards.length) % serviceCards.length;
      const previousIndex = (activeServiceIndex - 1 + serviceCards.length) % serviceCards.length;
      const nextIndex = (activeServiceIndex + 1) % serviceCards.length;

      serviceCards.forEach((card, cardIndex) => {
        card.classList.toggle("is-active", cardIndex === activeServiceIndex);
        card.classList.toggle("is-prev", cardIndex === previousIndex);
        card.classList.toggle("is-next", cardIndex === nextIndex);
        card.classList.remove("is-shining");
      });

      clearCarouselDragOffset();
      triggerCenteredCardShine(shineDelay);

      if (restart) startCarouselTimer(true);
    }

    function startCarouselTimer(restart = false) {
      if (restart) stopCarouselTimer();
      if (carouselTimer || !carouselEnabled() || !carouselVisible || pointerDown) return;
      carouselTimer = window.setInterval(() => {
        setActiveServiceCard(activeServiceIndex + 1, { restart: false });
      }, carouselInterval);
    }

    function enableServiceCarousel() {
      servicesCarousel.classList.add("is-mobile-carousel");
      setActiveServiceCard(activeServiceIndex, { shineDelay: 180, restart: false });
      startCarouselTimer();
    }

    function disableServiceCarousel() {
      stopCarouselTimer();
      clearCarouselShine();
      clearCarouselDragOffset();
      servicesCarousel.classList.remove("is-mobile-carousel", "is-dragging");
      serviceCards.forEach((card) => {
        card.classList.remove("is-active", "is-prev", "is-next", "is-shining");
      });
    }

    function updateServiceCarouselMode() {
      if (carouselEnabled()) {
        enableServiceCarousel();
      } else {
        disableServiceCarousel();
      }
    }

    servicesCarousel.addEventListener("pointerdown", (event) => {
      if (!carouselEnabled()) return;
      if (event.pointerType === "mouse" && event.button !== 0) return;
      pointerDown = true;
      pointerDragging = false;
      pointerId = event.pointerId;
      pointerStartX = event.clientX;
      pointerStartY = event.clientY;
      stopCarouselTimer();
      clearCarouselShine();
      try {
        servicesCarousel.setPointerCapture?.(event.pointerId);
      } catch {
        // Some synthetic or older pointer implementations do not allow capture.
      }
    });

    servicesCarousel.addEventListener("pointermove", (event) => {
      if (!pointerDown || pointerId !== event.pointerId || !carouselEnabled()) return;
      const deltaX = event.clientX - pointerStartX;
      const deltaY = event.clientY - pointerStartY;

      if (!pointerDragging && Math.abs(deltaX) > 12 && Math.abs(deltaX) > Math.abs(deltaY) * 1.1) {
        pointerDragging = true;
        servicesCarousel.classList.add("is-dragging");
      }

      if (!pointerDragging) return;
      event.preventDefault();
      setCarouselDragOffset(deltaX);
    });

    function finishCarouselPointer(event, cancelled = false) {
      if (!pointerDown || pointerId !== event.pointerId) return;
      const deltaX = event.clientX - pointerStartX;
      const shouldMove = pointerDragging && !cancelled && Math.abs(deltaX) > 46;

      pointerDown = false;
      pointerDragging = false;
      pointerId = null;
      servicesCarousel.classList.remove("is-dragging");
      try {
        servicesCarousel.releasePointerCapture?.(event.pointerId);
      } catch {
        // The pointer may not have been captured if the browser rejected capture.
      }

      if (shouldMove) {
        suppressCarouselClick = true;
        setActiveServiceCard(activeServiceIndex + (deltaX < 0 ? 1 : -1));
        window.setTimeout(() => {
          suppressCarouselClick = false;
        }, 360);
        return;
      }

      clearCarouselDragOffset();
      triggerCenteredCardShine(160);
      startCarouselTimer(true);
    }

    servicesCarousel.addEventListener("pointerup", (event) => finishCarouselPointer(event));
    servicesCarousel.addEventListener("pointercancel", (event) => finishCarouselPointer(event, true));

    servicesCarousel.addEventListener("click", (event) => {
      if (!carouselEnabled()) return;
      const card = event.target.closest(".service-card");
      if (!card) return;

      if (suppressCarouselClick) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      if (!card.classList.contains("is-active")) {
        event.preventDefault();
        setActiveServiceCard(serviceCards.indexOf(card));
      }
    });

    serviceCards.forEach((card) => {
      card.addEventListener("animationend", (event) => {
        if (event.animationName === "service-card-mobile-shine") {
          card.classList.remove("is-shining");
        }
      });
    });

    if ("IntersectionObserver" in window) {
      const serviceCarouselObserver = new IntersectionObserver(
        (entries) => {
          carouselVisible = entries.some((entry) => entry.isIntersecting);
          if (carouselVisible) {
            if (carouselEnabled()) {
              setActiveServiceCard(activeServiceIndex, { shineDelay: 180, restart: false });
              startCarouselTimer();
            }
          } else {
            stopCarouselTimer();
            clearCarouselShine();
          }
        },
        { threshold: 0.36 }
      );
      serviceCarouselObserver.observe(servicesCarousel);
    }

    mobileCarousel.addEventListener?.("change", updateServiceCarouselMode);
    reducedMotion.addEventListener?.("change", updateServiceCarouselMode);
    updateServiceCarouselMode();
  }

  document.querySelectorAll(".faq-question").forEach((button, index) => {
    const item = button.closest(".faq-item");
    const answer = item?.querySelector(".faq-answer");
    if (!item || !answer) return;
    const answerId = answer.id || `faq-answer-${index + 1}`;
    answer.id = answerId;
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-controls", answerId);

    button.addEventListener("click", () => {
      const open = item.classList.toggle("is-open");
      button.querySelector("span:last-child").textContent = open ? "-" : "+";
      button.setAttribute("aria-expanded", String(open));
    });
  });

  const testimonials = [...document.querySelectorAll("[data-testimonial]")];
  const testimonialPrev = document.querySelector("[data-testimonial-prev]");
  const testimonialNext = document.querySelector("[data-testimonial-next]");
  let testimonialIndex = 0;

  function showTestimonial(index) {
    if (!testimonials.length) return;
    testimonialIndex = (index + testimonials.length) % testimonials.length;
    testimonials.forEach((item, itemIndex) => item.classList.toggle("is-active", itemIndex === testimonialIndex));
  }

  testimonialPrev?.addEventListener("click", () => showTestimonial(testimonialIndex - 1));
  testimonialNext?.addEventListener("click", () => showTestimonial(testimonialIndex + 1));

  const lightbox = document.querySelector("#lightbox");
  const lightboxImage = document.querySelector("#lightbox-img");
  const lightboxTitle = document.querySelector("#lightbox-title");
  const lightboxText = document.querySelector("#lightbox-text");
  const lightboxClose = document.querySelector(".lightbox-close");

  function closeLightbox() {
    if (!lightbox || !lightboxImage) return;
    lightbox.classList.remove("is-visible");
    lightbox.setAttribute("aria-hidden", "true");
    body.classList.remove("lightbox-open");
    lightboxImage.removeAttribute("src");
  }

  document.querySelectorAll("[data-lightbox-title]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!lightbox || !lightboxImage || !lightboxTitle || !lightboxText) return;
      lightboxImage.src = button.dataset.img;
      lightboxImage.alt = button.querySelector("img")?.alt || "";
      lightboxTitle.textContent = button.dataset.lightboxTitle;
      lightboxText.textContent = button.dataset.lightboxText;
      lightbox.classList.add("is-visible");
      lightbox.setAttribute("aria-hidden", "false");
      body.classList.add("lightbox-open");
      lightboxClose?.focus();
    });
  });

  lightboxClose?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      closeLightbox();
    }
  });

  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      document.querySelectorAll("[data-filter]").forEach((item) => item.classList.toggle("is-active", item === button));
      document.querySelectorAll("[data-category]").forEach((card) => {
        card.hidden = filter !== "all" && card.dataset.category !== filter;
      });
    });
  });

  const cookieBanner = document.querySelector("#cookie-banner");
  const cookieOptions = document.querySelector("#cookie-options");
  const cookieKey = "thebar-cookie-preferences";

  const storage = {
    get(key) {
      try {
        return window.localStorage.getItem(key);
      } catch {
        return null;
      }
    },
    set(key, value) {
      try {
        window.localStorage.setItem(key, value);
      } catch {
        return false;
      }
      return true;
    }
  };

  function saveCookiePreferences(value) {
    storage.set(cookieKey, JSON.stringify(value));
    if (cookieBanner) cookieBanner.hidden = true;
  }

  if (cookieBanner && storage.get(cookieKey)) {
    cookieBanner.hidden = true;
  }

  document.querySelector("[data-cookie-accept]")?.addEventListener("click", () => {
    saveCookiePreferences({ essential: true, performance: true, marketing: true });
  });

  document.querySelector("[data-cookie-reject]")?.addEventListener("click", () => {
    saveCookiePreferences({ essential: true, performance: false, marketing: false });
  });

  document.querySelector("[data-cookie-custom]")?.addEventListener("click", () => {
    cookieOptions?.classList.toggle("is-visible");
  });

  document.querySelector("[data-cookie-save]")?.addEventListener("click", () => {
    saveCookiePreferences({
      essential: true,
      performance: document.querySelector("#cookie-performance")?.checked || false,
      marketing: document.querySelector("#cookie-marketing")?.checked || false
    });
  });

  document.querySelector("[data-cookie-open]")?.addEventListener("click", () => {
    if (!cookieBanner) return;
    cookieBanner.hidden = false;
    cookieOptions?.classList.add("is-visible");
  });

  const form = document.querySelector("#contact-form");
  const successState = document.querySelector("#success-state");

  function setError(input, message) {
    const slot = document.querySelector(`[data-error-for="${input.id}"]`);
    if (slot) slot.textContent = message;
    input.setAttribute("aria-invalid", message ? "true" : "false");
  }

  function validateInput(input) {
    if (input.required && !input.value.trim()) {
      setError(input, "Campo obrigatório.");
      return false;
    }
    if (input.type === "email" && input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
      setError(input, "Informe um email válido.");
      return false;
    }
    if (input.type === "tel" && input.value && input.value.replace(/\D/g, "").length < 10) {
      setError(input, "Informe um WhatsApp válido.");
      return false;
    }
    setError(input, "");
    return true;
  }

  if (form) {
    form.querySelectorAll("input, select, textarea").forEach((input) => {
      if (input.name !== "empresa") {
        input.addEventListener("input", () => validateInput(input));
        input.addEventListener("blur", () => validateInput(input));
      }
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (form.empresa?.value) return;
      const fields = [...form.querySelectorAll("input, select, textarea")].filter((input) => input.name !== "empresa");
      const valid = fields.every(validateInput);
      if (!valid) return;
      form.style.display = "none";
      successState?.classList.add("is-visible");
      successState?.setAttribute("tabindex", "-1");
      successState?.focus();
    });
  }
})();
