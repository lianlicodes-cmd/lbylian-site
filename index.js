  <!-- JS (menu + disclosure + year + image fallbacks) -->
        <script>
          // Fallback helper: try multiple URLs in order
          function nextSrc(img) {
            const urls = Array.prototype.slice.call(arguments, 1);
            const i = parseInt(img.dataset.fbi || "0", 10);
            if (i >= urls.length) {
              img.onerror = null;
              return;
            }
            img.dataset.fbi = i + 1;
            img.src = urls[i];
          }

          document.addEventListener("DOMContentLoaded", () => {
            const yearEl = document.getElementById("year");
            if (yearEl) yearEl.textContent = new Date().getFullYear();

            const $ = (sel) => document.querySelector(sel);
            const btn = $("#menuBtn"),
              menu = $("#siteMenu"),
              closeBtn = $("#menuClose"),
              overlay = $("#menuOverlay"),
              disBtn = $("#disclosureBtn"),
              panel = $("#disclosurePanel");

            const servicesDisBtn = $("#servicesDisclosureBtn"),
              servicesPanel = $("#servicesDisclosurePanel");

            const reduceMotion = window.matchMedia(
              "(prefers-reduced-motion: reduce)"
            ).matches;

            function openMenu() {
              menu.removeAttribute("inert");
              menu.classList.remove("translate-x-full");
              overlay.classList.remove("opacity-0", "pointer-events-none");
              overlay.classList.add("opacity-100");
              document.body.classList.add("overflow-hidden");
              btn.setAttribute("aria-expanded", "true");
              menu.setAttribute("aria-hidden", "false");
            }

            function closeMenu() {
              menu.setAttribute("inert", "");
              menu.classList.add("translate-x-full");
              overlay.classList.add("opacity-0", "pointer-events-none");
              overlay.classList.remove("opacity-100");
              document.body.classList.remove("overflow-hidden");
              btn.setAttribute("aria-expanded", "false");
              menu.setAttribute("aria-hidden", "true");
            }

            btn?.addEventListener("click", openMenu);
            closeBtn?.addEventListener("click", closeMenu);
            overlay?.addEventListener("click", closeMenu);

            document.addEventListener("keydown", (e) => {
              if (e.key === "Escape") closeMenu();
            });

            disBtn?.addEventListener("click", () => {
              const expanded = disBtn.getAttribute("aria-expanded") === "true";
              disBtn.setAttribute("aria-expanded", String(!expanded));
              (disBtn.querySelector("svg") || {}).classList?.toggle?.(
                "rotate-180",
                !expanded
              );

              if (!expanded) {
                panel.hidden = false;
                panel.style.maxHeight = panel.scrollHeight + "px";
              } else {
                panel.style.maxHeight = "0px";
                if (reduceMotion) {
                  panel.hidden = true;
                } else {
                  const onEnd = (event) => {
                    if (event.propertyName !== "max-height") return;
                    if (disBtn.getAttribute("aria-expanded") === "false")
                      panel.hidden = true;
                    panel.removeEventListener("transitionend", onEnd);
                  };
                  panel.addEventListener("transitionend", onEnd);
                }
              }
            });

            if (panel) {
              panel.hidden = true;
              if (reduceMotion) panel.style.transition = "none";
            }

            servicesDisBtn?.addEventListener("click", () => {
              const expanded =
                servicesDisBtn.getAttribute("aria-expanded") === "true";

              servicesDisBtn.setAttribute("aria-expanded", String(!expanded));
              (servicesDisBtn.querySelector("svg") || {}).classList?.toggle?.(
                "rotate-180",
                !expanded
              );

              if (!expanded) {
                servicesPanel.hidden = false;
                servicesPanel.style.maxHeight =
                  servicesPanel.scrollHeight + "px";
              } else {
                servicesPanel.style.maxHeight = "0px";
                if (reduceMotion) {
                  servicesPanel.hidden = true;
                } else {
                  const onEnd = (event) => {
                    if (event.propertyName !== "max-height") return;
                    if (
                      servicesDisBtn.getAttribute("aria-expanded") === "false"
                    ) {
                      servicesPanel.hidden = true;
                    }
                    servicesPanel.removeEventListener("transitionend", onEnd);
                  };
                  servicesPanel.addEventListener("transitionend", onEnd);
                }
              }
            });

            if (servicesPanel) {
              servicesPanel.hidden = true;
              if (reduceMotion) servicesPanel.style.transition = "none";
            }

            /* Desktop Work dropdown */
            const desktopWorkBtn = document.getElementById("desktopWorkButton");
            const desktopWorkMenu = document.getElementById("desktopWorkMenu");
            const desktopWorkGroup =
              document.getElementById("desktopWorkGroup");

            if (desktopWorkBtn && desktopWorkMenu && desktopWorkGroup) {
              const setDesktopExpanded = (value) =>
                desktopWorkBtn.setAttribute(
                  "aria-expanded",
                  value ? "true" : "false"
                );

              desktopWorkBtn.addEventListener("click", () => {
                const expanded =
                  desktopWorkBtn.getAttribute("aria-expanded") === "true";
                setDesktopExpanded(!expanded);
                if (!expanded) {
                  const first = desktopWorkMenu.querySelector(
                    "a[href], button:not([disabled])"
                  );
                  first?.focus?.();
                }
              });

              desktopWorkGroup.addEventListener("mouseenter", () =>
                setDesktopExpanded(true)
              );
              desktopWorkGroup.addEventListener("mouseleave", () =>
                setDesktopExpanded(false)
              );
              desktopWorkGroup.addEventListener("focusin", () =>
                setDesktopExpanded(true)
              );
              desktopWorkGroup.addEventListener("focusout", (e) => {
                if (
                  !e.relatedTarget ||
                  !desktopWorkGroup.contains(e.relatedTarget)
                )
                  setDesktopExpanded(false);
              });

              document.addEventListener("keydown", (e) => {
                if (e.key === "Escape") setDesktopExpanded(false);
              });
            }

            /* Desktop Services dropdown */
            const desktopServicesBtn = document.getElementById(
              "desktopServicesButton"
            );
            const desktopServicesMenu = document.getElementById(
              "desktopServicesMenu"
            );
            const desktopServicesGroup = document.getElementById(
              "desktopServicesGroup"
            );

            if (
              desktopServicesBtn &&
              desktopServicesMenu &&
              desktopServicesGroup
            ) {
              const setDesktopServicesExpanded = (value) =>
                desktopServicesBtn.setAttribute(
                  "aria-expanded",
                  value ? "true" : "false"
                );

              desktopServicesBtn.addEventListener("click", () => {
                const expanded =
                  desktopServicesBtn.getAttribute("aria-expanded") === "true";
                setDesktopServicesExpanded(!expanded);
                if (!expanded) {
                  const first = desktopServicesMenu.querySelector(
                    "a[href], button:not([disabled])"
                  );
                  first?.focus?.();
                }
              });

              desktopServicesGroup.addEventListener("mouseenter", () =>
                setDesktopServicesExpanded(true)
              );
              desktopServicesGroup.addEventListener("mouseleave", () =>
                setDesktopServicesExpanded(false)
              );
              desktopServicesGroup.addEventListener("focusin", () =>
                setDesktopServicesExpanded(true)
              );
              desktopServicesGroup.addEventListener("focusout", (e) => {
                if (
                  !e.relatedTarget ||
                  !desktopServicesGroup.contains(e.relatedTarget)
                ) {
                  setDesktopServicesExpanded(false);
                }
              });

              document.addEventListener("keydown", (e) => {
                if (e.key === "Escape") setDesktopServicesExpanded(false);
              });
            }

            window.addEventListener("pagehide", () =>
              document.body.classList.remove("overflow-hidden")
            );
            document.addEventListener("visibilitychange", () => {
              if (document.visibilityState === "hidden")
                document.body.classList.remove("overflow-hidden");
            });
          });
        </script>

        <!-- BACK TO TOP -->
        <script>
          (function () {
            const backToTop = document.getElementById("backToTop");
            if (!backToTop) return;

            const toggle = () => {
              backToTop.classList.toggle("invisible", window.scrollY < 400);
              backToTop.classList.toggle("opacity-0", window.scrollY < 400);
              backToTop.classList.toggle(
                "pointer-events-none",
                window.scrollY < 400
              );
            };

            backToTop.addEventListener("click", () => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            });

            toggle();
            window.addEventListener("scroll", toggle, {
              passive: true,
            });
          })();
        </script>

  <script>      


        <!-- TESTIMONIALS -->
        <script>
          (function () {
            const quotesEl = document.getElementById("quotes");
            const prevBtn = document.getElementById("quotePrev");
            const nextBtn = document.getElementById("quoteNext");
            if (!quotesEl || !prevBtn || !nextBtn) return;

            const testimonials = [
              {
                quote: `Working with Lian made a clear difference. She brought clarity to the structure and presentation, and handled images, SEO and performance.

She also photographed nine projects, which elevated the overall result.

Since the update, visits and engagement have increased. The site is more coherent, easier to navigate, and reflects the quality of my work.`,
                author: "Catriona Rowbotham",
                role: "Catriona Rowbotham Garden Designs",
                img: "Catriona Rowbotham-1.jpg",
                fallback:
                  "https://raw.githubusercontent.com/lianlicodes-cmd/my-website/main/Catriona%20Rowbotham-1.jpg",
                alt: "Portrait of Catriona Rowbotham",
                noFrame: false,
              },
              {
                quote:
                  "Work that goes above and beyond the brief, showing depth of thinking and a clear grounding in real-world design practice.",
                author: "Antony Conboy",
                role: "Mentor, CourseCareers UI/UX Design",
                img: "antonyconboy.png",
                fallback:
                  "https://raw.githubusercontent.com/lianlicodes-cmd/my-website/main/antonyconboy.png",
                alt: "Portrait of Antony Conboy",
                noFrame: false,
              },
              {
                quote:
                  "Lian est une photographe d’une grande sensibilité. Elle sait mettre en valeur ses sujets et trouver le détail qui rend l’image unique. Au Madame Figaro je lui ai confié plusieurs mandats; fiable, responsable et excellente dans ses relations avec la rédaction et ses sujets.",
                translation:
                  "Lian is a photographer of great sensitivity. She knows how to showcase her subjects and find the small detail that makes an image unique. At Madame Figaro I entrusted her with several assignments; reliable, responsible, and excellent with the editorial team and her subjects.",
                author: "Sophie Perraudin",
                role: "Madame Figaro",
                img: "Sophie Perraudin-1.jpg",
                fallback:
                  "https://raw.githubusercontent.com/lianlicodes-cmd/my-website/main/Sophie%20Perraudin-1.jpg",
                alt: "Portrait of Sophie Perraudin",
                noFrame: false,
              },
              {
                quote:
                  "One word that stands out is how Lian works: simply. She listens to the brief and turns it into storytelling images. Her easy-going, kind energy warms even stern sitters. Even with awful weather or tight locations, she solves problems fast and delivers beautiful photographs.",
                author: "Christian Kirk Jensen",
                role: "Danish Pastry Design",
                img: "Christian Kirk Jensen -1.jpg",
                fallback:
                  "https://raw.githubusercontent.com/lianlicodes-cmd/my-website/main/Christian%20Kirk%20Jensen%20-1.jpg",
                alt: "Portrait of Christian Kirk Jensen",
                noFrame: false,
              },
            ];

            let index = 0;
            let useTranslation = false;

            function escapeHtml(s) {
              return String(s)
                .replaceAll("&", "&amp;")
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;")
                .replaceAll('"', "&quot;")
                .replaceAll("'", "&#39;");
            }

            function slideMarkup(t) {
              const text =
                useTranslation && t.translation ? t.translation : t.quote;

              const toggle = t.translation
                ? `<button
                    id="toggle-translation"
                    type="button"
                    class="ml-3 inline-flex items-center justify-center h-9 w-9 rounded-full bg-black/5 text-lg text-brand-black hover:bg-black/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/50"
                    aria-label="${
                      useTranslation ? "Voir en français" : "Read in English"
                    }"
                    title="${
                      useTranslation ? "Voir en français" : "Read in English"
                    }"
                  >
                    <span aria-hidden="true">${
                      useTranslation ? "🇫🇷" : "🇬🇧"
                    }</span>
                  </button>`
                : "";

              const imgClass =
                "h-16 w-16 md:h-20 md:w-20 rounded-full object-cover " +
                (t.noFrame ? "" : "ring-2 ring-black/10 shadow-md");

              const fallbackAttr = t.fallback
                ? ` onerror="this.onerror=null;this.src='${t.fallback}'"`
                : "";

              return `
              <figure class="max-w-none">
                <div class="qwrap">
                  <span class="qmark">&ldquo;</span>
                  <blockquote class="quote-close text-brand-black font-medium tracking-tight leading-[1.2] text-xl sm:text-3xl md:text-4xl lg:text-5xl w-full">
                    ${escapeHtml(text)}
                  </blockquote>
                </div>

                <figcaption class="mt-6 flex items-center gap-4 text-brand-black/70 text-sm md:text-base">
                  <img
                    src="${escapeHtml(t.img)}"
                    alt="${escapeHtml(t.alt)}"
                    loading="lazy"
                    decoding="async"
                    class="${imgClass}"${fallbackAttr}
                  />
                  <div>
                    <span class="font-semibold text-brand-black">${escapeHtml(
                      t.author
                    )}</span>
                    <span class="mx-1 text-brand-black/50">&mdash;</span>
                    <span class="text-brand-black/70">${escapeHtml(
                      t.role
                    )}</span>
                  </div>
                  ${toggle}
                </figcaption>
              </figure>
            `;
            }

            function render(i) {
              quotesEl.innerHTML = slideMarkup(testimonials[i]);

              const toggleBtn = document.getElementById("toggle-translation");
              if (toggleBtn) {
                toggleBtn.addEventListener("click", () => {
                  useTranslation = !useTranslation;
                  render(i);
                });
              }
            }

            function goNext() {
              index = (index + 1) % testimonials.length;
              useTranslation = false;
              render(index);
            }

            function goPrev() {
              index = (index - 1 + testimonials.length) % testimonials.length;
              useTranslation = false;
              render(index);
            }

            prevBtn.addEventListener("click", goPrev);
            nextBtn.addEventListener("click", goNext);

            render(index);
          })();
        </script>

        <!-- JS: Subline fade-in on scroll -->
        <script>
          (function () {
            const el = document.getElementById("subline");
            if (!el) return;

            const reduceMotion = window.matchMedia(
              "(prefers-reduced-motion: reduce)"
            ).matches;

            if (reduceMotion) {
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
              return;
            }

            const show = () => {
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            };

            const hide = () => {
              el.style.opacity = "0";
              el.style.transform = "translateY(12px)";
            };

            hide();

            const observer = new IntersectionObserver(
              (entries) => {
                entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                    show();
                  } else {
                    hide();
                  }
                });
              },
              { threshold: 0.35 }
            );

            observer.observe(el);
          })();
        </script>

          <script>      
/* JS: Hero slideshow (phone row + image slides) */

(() => {
  const stage = document.getElementById("heroStage");
  if (!stage) return;

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const motionDuration = 2600;
  const stillDuration = 3200;
  const slideDuration = motionDuration + stillDuration;
  const fadeDuration = 800;

  const phoneRiseDuration = 700;
  const phoneTick = 450;
  const phoneStillDuration = 3600;

  let idx = 0;
  const modes = ["top", "bottom", "center"];

  const slides = [
    {
      type: "image",
      src: "assets/catriona-hero-image.webp",
      alt: "Soft summer light over a tranquil urban garden",
      fallback: "assets/hero.jpg",
    },
    {
      type: "image",
      src: "assets/lbylian-hero.webp",
      alt: "Digital design mockup showing L by Lian across multiple Apple devices.",
      fallback: "assets/hero.jpg",
      speedFactor: 0.6,
      fit: "auto",
      bg: "#050608",
    },
    {
      type: "phonesRow",
      phones: [
        { src: "assets/1.webp", fallback: "assets/hero.jpg" },
        { src: "assets/2.webp", fallback: "assets/hero.jpg" },
        { src: "assets/3.webp", fallback: "assets/hero.jpg" },
        { src: "assets/4.webp", fallback: "assets/hero.jpg" },
        { src: "assets/5.webp", fallback: "assets/hero.jpg" },
      ],
    }
  ];

  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  function showHeroPlaceholder() {
    stage.innerHTML = `
<div class="absolute inset-0 flex items-center justify-center px-6 text-center">
  <div class="rounded-2xl bg-white/70 ring-1 ring-black/10 px-5 py-4 backdrop-blur">
    <p class="text-sm md:text-base text-brand-black font-semibold">Preview unavailable</p>
    <p class="mt-1 text-xs md:text-sm text-brand-gray">Hero images couldn’t be loaded.</p>
  </div>
</div>
`;
  }

  function makeFrame(source) {
    const isContain = source.fit === "contain";

    const wrap = document.createElement("figure");
    wrap.className = isContain
      ? "absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center"
      : "absolute inset-0 w-full h-full overflow-hidden";

    if (source.bg) wrap.style.backgroundColor = source.bg;

    const img = document.createElement("img");
    img.src = source.src;
    img.alt = source.alt || "";
    img.loading = "eager";
    img.decoding = "async";

    if (isContain) {
      wrap.style.padding = "clamp(12px, 3vw, 28px)";
      img.className =
        "w-full h-full object-contain will-change-transform";
      img.style.maxWidth = "1400px";
      img.style.maxHeight = "100%";
    } else {
      img.className =
        "absolute inset-0 w-full h-full object-cover will-change-transform";
    }

    wrap.appendChild(img);
    return { wrap, img };
  }

  async function showImage(slide, mode) {
    const source =
      slide && typeof slide === "object" ? slide : { src: slide };

    stage.style.backgroundImage = "none";
    stage.style.backgroundColor = source.bg || "#050608";

    const speedFactor = source.speedFactor || 1;
    const totalSlideDuration = slideDuration * speedFactor;
    const motionMs = motionDuration * speedFactor;

    const { wrap, img } = makeFrame(source);
    stage.innerHTML = "";
    stage.appendChild(wrap);

    const loadOk = await new Promise((resolve) => {
      const done = (ok) => resolve(ok);
      
      if (img.complete && img.naturalWidth > 0) {
        return done(true);
      }

      img.onload = () => done(true);

      if (source.fallback) {
        img.onerror = () => {
          img.onerror = null;
          img.src = source.fallback;
          if (img.complete && img.naturalWidth > 0) return done(true);
          img.onload = () => done(true);
          img.onerror = () => done(false);
        };
      } else {
        img.onerror = () => done(false);
      }
    });

    if (!loadOk) {
      showHeroPlaceholder();
      await wait(totalSlideDuration);
      return;
    }

    if (!prefersReduced) {
      const common = {
        duration: motionMs,
        easing: "cubic-bezier(.2,.8,.2,1)",
        fill: "both",
      };

      if (mode === "top") {
        img.animate(
          [
            {
              transform: "translate3d(0,-30%,0) scale(1.05)",
              opacity: 0,
            },
            {
              transform: "translate3d(0,0,0) scale(1)",
              opacity: 1,
            },
          ],
          common
        );
      } else if (mode === "bottom") {
        img.animate(
          [
            {
              transform: "translate3d(0,30%,0) scale(1.05)",
              opacity: 0,
            },
            {
              transform: "translate3d(0,0,0) scale(1)",
              opacity: 1,
            },
          ],
          common
        );
      } else {
        wrap.animate(
          [
            { clipPath: "inset(50% 0 50% 0)", opacity: 0 },
            { clipPath: "inset(0 0 0 0)", opacity: 1 },
          ],
          common
        );

        img.animate(
          [{ transform: "scale(1.06)" }, { transform: "scale(1)" }],
          {
            duration: motionMs,
            easing: "ease-out",
            fill: "both",
          }
        );
      }
    }

    const visibleDuration = Math.max(
      0,
      totalSlideDuration - fadeDuration
    );
    await wait(visibleDuration);

    wrap.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: fadeDuration,
      easing: "cubic-bezier(.2,.8,.2,1)",
      fill: "forwards",
    });

    await wait(fadeDuration);
  }

  function setPhonesBackground() {
    const local = "assets/03-evening-pathway-detail.webp";
    stage.style.backgroundSize = "cover";
    stage.style.backgroundPosition = "center";
    stage.style.backgroundRepeat = "no-repeat";

    const bg = new Image();
    bg.onload = () =>
      (stage.style.backgroundImage = `url('${local}')`);
    bg.src = local;
  }

  async function showPhonesRow(phones) {
    stage.innerHTML = "";
    setPhonesBackground();

    const isSmall = window.matchMedia("(max-width: 640px)").matches;
    const isMedium = window.matchMedia("(max-width: 1024px)").matches;

    const visiblePhones = isSmall
      ? phones.slice(0, 2)
      : isMedium
      ? phones.slice(0, 3)
      : phones;

    const row = document.createElement("div");
    row.className =
      "relative w-full h-full flex items-center justify-center gap-[clamp(0.75rem,2vw,2.5rem)]";
    stage.appendChild(row);

    const tick = prefersReduced ? 0 : phoneTick;

    const results = await Promise.all(
      visiblePhones.map((phone, i) => {
        const ph = document.createElement("div");
        ph.className =
          "phone w-[42vw] max-w-[240px] min-w-[140px] aspect-[9/19.5] bg-black/70 overflow-hidden rounded-[1.8rem] shadow-xl opacity-0";

        const img = document.createElement("img");
        img.src = phone.src;
        img.alt = "";
        img.loading = "eager";
        img.decoding = "async";
        img.className = "w-full h-full object-cover";

        const loaded = new Promise((resolve) => {
          if (img.complete && img.naturalWidth > 0) return resolve(true);
          img.onload = () => resolve(true);

          if (phone.fallback) {
            img.onerror = () => {
              img.onerror = null;
              img.src = phone.fallback;
              if (img.complete && img.naturalWidth > 0) return resolve(true);
              img.onload = () => resolve(true);
              img.onerror = () => resolve(false);
            };
          } else {
            img.onerror = () => resolve(false);
          }
        });

        ph.appendChild(img);
        row.appendChild(ph);

        if (!prefersReduced) {
          ph.animate(
            [
              {
                transform: "translate3d(0,40px,0) scale(.95)",
                opacity: 0,
              },
              {
                transform: "translate3d(0,0,0) scale(1)",
                opacity: 1,
              },
            ],
            {
              duration: phoneRiseDuration,
              delay: i * tick,
              easing: "cubic-bezier(.2,.8,.2,1)",
              fill: "forwards",
            }
          );
        } else {
          ph.style.opacity = 1;
        }

        return loaded;
      })
    );

    const total =
      (visiblePhones.length - 1) * tick +
      phoneRiseDuration +
      phoneStillDuration;
    const visibleDuration = Math.max(0, total - fadeDuration);
    await wait(visibleDuration);

    row.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: fadeDuration,
      easing: "cubic-bezier(.2,.8,.2,1)",
      fill: "forwards",
    });

    await wait(fadeDuration);
  }

  async function loop() {
    const s = slides[idx % slides.length];
    let mode = modes[idx % modes.length];

    if (s.type === "image" && s.fit === "contain") mode = "center";

    if (document.visibilityState === "hidden") {
      await wait(slideDuration);
    } else if (s.type === "phonesRow") {
      await showPhonesRow(s.phones);
    } else {
      await showImage(s, mode);
    }

    idx++;
    requestAnimationFrame(loop);
  }

  (async () => {
    const first = slides[0];
    let mode = modes[0];

    if (first.type === "image" && first.fit === "contain")
      mode = "center";

    if (first.type === "phonesRow") await showPhonesRow(first.phones);
    else await showImage(first, mode);

    idx = 1;
    requestAnimationFrame(loop);
  })();
})();
        </script>
