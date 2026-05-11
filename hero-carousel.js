/* JS: Hero Slideshow + Testimonials + Scroll Effects */
(() => {
  const stage = document.getElementById("heroStage");
  if (!stage) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const motionDuration = 2600;
  const slideDuration = 5800; 
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
      fit: "auto",
      bg: "#050608",
    },
    {
      type: "phonesRow",
      phones: [
        { src: "assets/1.webp" },
        { src: "assets/2.webp" },
        { src: "assets/3.webp" },
        { src: "assets/4.webp" },
        { src: "assets/5.webp" },
      ],
    }
  ];

  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  async function showImage(slide, mode) {
    stage.innerHTML = "";
    stage.style.backgroundColor = slide.bg || "#050608";
    
    const wrap = document.createElement("figure");
    wrap.className = "absolute inset-0 w-full h-full overflow-hidden";
    const img = document.createElement("img");
    img.src = slide.src;
    img.className = "absolute inset-0 w-full h-full object-cover";
    wrap.appendChild(img);
    stage.appendChild(wrap);

    if (!prefersReduced) {
      wrap.animate([{ opacity: 0 }, { opacity: 1 }], { duration: fadeDuration });
    }
    await wait(slideDuration - fadeDuration);
    wrap.animate([{ opacity: 1 }, { opacity: 0 }], { duration: fadeDuration, fill: "forwards" });
    await wait(fadeDuration);
  }

  async function showPhonesRow(phones) {
    stage.innerHTML = "";
    stage.style.backgroundImage = "url('assets/03-evening-pathway-detail.webp')";
    const row = document.createElement("div");
    row.className = "relative w-full h-full flex items-center justify-center gap-4";
    stage.appendChild(row);

    await Promise.all(phones.map((p, i) => {
      const ph = document.createElement("div");
      ph.className = "phone w-[40vw] max-w-[200px] aspect-[9/19.5] bg-black rounded-3xl opacity-0";
      const img = document.createElement("img");
      img.src = p.src;
      ph.appendChild(img);
      row.appendChild(ph);
      return ph.animate([{ transform: "translateY(40px)", opacity: 0 }, { transform: "translateY(0)", opacity: 1 }], 
        { duration: phoneRiseDuration, delay: i * phoneTick, fill: "forwards" }).finished;
    }));

    await wait(phoneStillDuration);
    row.animate([{ opacity: 1 }, { opacity: 0 }], { duration: fadeDuration, fill: "forwards" });
    await wait(fadeDuration);
  }

  async function loop() {
    const s = slides[idx % slides.length];
    if (s.type === "phonesRow") await showPhonesRow(s.phones);
    else await showImage(s, modes[idx % modes.length]);
    idx++;
    loop();
  }

  /* --- TESTIMONIALS LOGIC --- */
  const quotesEl = document.getElementById("quotes");
  if (quotesEl) {
    const testimonials = [
      {
        quote: "Working with Lian made a clear difference. She brought clarity to the structure...",
        author: "Catriona Rowbotham",
        role: "Catriona Rowbotham Garden Designs",
        img: "Catriona Rowbotham-1.jpg"
      },
      // ... (You can add the rest of your testimonial objects here later)
    ];
    
    let tIdx = 0;
    const render = (i) => {
      const t = testimonials[i];
      quotesEl.innerHTML = `<blockquote class="text-xl md:text-3xl font-medium">${t.quote}</blockquote>
                            <figcaption class="mt-4 flex items-center gap-3">
                              <img src="${t.img}" class="h-12 w-12 rounded-full">
                              <div><p class="font-bold">${t.author}</p><p class="text-sm">${t.role}</p></div>
                            </figcaption>`;
    };
    
    document.getElementById("quoteNext")?.addEventListener("click", () => { tIdx = (tIdx + 1) % testimonials.length; render(tIdx); });
    document.getElementById("quotePrev")?.addEventListener("click", () => { tIdx = (tIdx - 1 + testimonials.length) % testimonials.length; render(tIdx); });
    render(0);
  }

  loop();
})();
