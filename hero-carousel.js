/* JS: Hero Slideshow + Testimonials */
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
        { src: "assets/1.webp", fallback: "assets/hero.jpg" },
        { src: "assets/2.webp", fallback: "assets/hero.jpg" },
        { src: "assets/3.webp", fallback: "assets/hero.jpg" },
        { src: "assets/4.webp", fallback: "assets/hero.jpg" },
        { src: "assets/5.webp", fallback: "assets/hero.jpg" },
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
    stage.style.backgroundSize = "cover";
    const row = document.createElement("div");
    row.className = "relative w-full h-full flex items-center justify-center gap-4";
    stage.appendChild(row);

    await Promise.all(phones.map((p, i) => {
      const ph = document.createElement("div");
      ph.className = "phone w-[40vw] max-w-[200px] aspect-[9/19.5] bg-black rounded-3xl opacity-0 overflow-hidden";
      const img = document.createElement("img");
      img.src = p.src;
      img.className = "w-full h-full object-cover";
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

  // --- TESTIMONIALS LOGIC ---
  const quotesEl = document.getElementById("quotes");
  if (quotesEl) {
    const testimonials = [
      {
        quote: "Working with Lian made a clear difference. She brought clarity to the structure and presentation, and handled images, SEO and performance. Since the update, visits and engagement have increased.",
        author: "Catriona Rowbotham",
        role: "Catriona Rowbotham Garden Designs",
        img: "Catriona Rowbotham-1.jpg",
        alt: "Portrait of Catriona Rowbotham"
      },
      {
        quote: "Work that goes above and beyond the brief, showing depth of thinking and a clear grounding in real-world design practice.",
        author: "Antony Conboy",
        role: "Mentor, CourseCareers UI/UX Design",
        img: "antonyconboy.png",
        alt: "Portrait of Antony Conboy"
      },
      {
        quote: "Lian est une photographe d’une grande sensibilité. Elle sait mettre en valeur ses sujets et trouver le détail qui rend l’image unique.",
        translation: "Lian is a photographer of great sensitivity. She knows how to showcase her subjects and find the small detail that makes an image unique.",
        author: "Sophie Perraudin",
        role: "Madame Figaro",
        img: "Sophie Perraudin-1.jpg",
        alt: "Portrait of Sophie Perraudin"
      },
      {
        quote: "One word that stands out is how Lian works: simply. She listens to the brief and turns it into storytelling images.",
        author: "Christian Kirk Jensen",
        role: "Danish Pastry Design",
        img: "Christian Kirk Jensen -1.jpg",
        alt: "Portrait of Christian Kirk Jensen"
      }
    ];
    
    let tIdx = 0;
    let useTranslation = false;

    const render = (i) => {
      const t = testimonials[i];
      const text = useTranslation && t.translation ? t.translation : t.quote;
      const toggleLabel = useTranslation ? "🇫🇷" : "🇬🇧";

      quotesEl.innerHTML = `
        <figure>
          <blockquote class="text-xl md:text-3xl font-medium leading-tight">&ldquo;${text}&rdquo;</blockquote>
          <figcaption class="mt-6 flex items-center gap-4">
            <img src="${t.img}" alt="${t.alt}" class="h-14 w-14 rounded-full object-cover ring-2 ring-black/5">
            <div>
              <p class="font-bold text-brand-black">${t.author}</p>
              <p class="text-sm text-brand-gray">${t.role}</p>
            </div>
            ${t.translation ? `<button id="toggle-trans" class="ml-auto text-lg p-2 bg-black/5 rounded-full">${toggleLabel}</button>` : ""}
          </figcaption>
        </figure>`;

      document.getElementById("toggle-trans")?.addEventListener("click", () => {
        useTranslation = !useTranslation;
        render(i);
      });
    };
    
    document.getElementById("quoteNext")?.addEventListener("click", () => { tIdx = (tIdx + 1) % testimonials.length; useTranslation = false; render(tIdx); });
    document.getElementById("quotePrev")?.addEventListener("click", () => { tIdx = (tIdx - 1 + testimonials.length) % testimonials.length; useTranslation = false; render(tIdx); });
    render(0);
  }

  loop();
})();
