<script>
(() => {
  const stage = document.getElementById("heroStage");
  if (!stage) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Timings
  const motionDuration = 2600;
  const stillDuration = 3200;
  const slideDuration = motionDuration + stillDuration;
  const fadeDuration = 800;
  const phoneRiseDuration = 700;
  const phoneTick = 450;
  const phoneStillDuration = 3600;

  let idx = 0;
  const modes = ["top", "bottom", "center"];

  // Use absolute paths with leading slashes to prevent sub-page breakage
  const slides = [
    {
      type: "image",
      src: "/assets/catriona-hero-image.webp",
      alt: "Soft summer light over a tranquil urban garden",
      fallback: "/assets/hero.jpg",
    },
    {
      type: "image",
      src: "/assets/lbylian-hero.webp",
      alt: "Digital design mockup showing L by Lian across multiple Apple devices.",
      fallback: "/assets/hero.jpg",
      speedFactor: 0.6,
      fit: "auto",
      bg: "#050608",
    },
    {
      type: "phonesRow",
      phones: [
        { src: "/assets/1.webp", fallback: "/assets/hero.jpg" },
        { src: "/assets/2.webp", fallback: "/assets/hero.jpg" },
        { src: "/assets/3.webp", fallback: "/assets/hero.jpg" },
        { src: "/assets/4.webp", fallback: "/assets/hero.jpg" },
        { src: "/assets/5.webp", fallback: "/assets/hero.jpg" },
      ],
    }
  ];

  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  function makeFrame(source) {
    const isContain = source.fit === "contain";
    const wrap = document.createElement("figure");
    wrap.className = "absolute inset-0 w-full h-full overflow-hidden" + (isContain ? " flex items-center justify-center" : "");
    if (source.bg) wrap.style.backgroundColor = source.bg;

    const img = document.createElement("img");
    img.src = source.src;
    img.className = isContain ? "w-full h-full object-contain" : "absolute inset-0 w-full h-full object-cover";
    img.style.willChange = "transform, opacity";
    
    wrap.appendChild(img);
    return { wrap, img };
  }

  async function showImage(slide, mode) {
    const source = slide && typeof slide === "object" ? slide : { src: slide };
    const { wrap, img } = makeFrame(source);
    stage.innerHTML = "";
    stage.appendChild(wrap);

    await new Promise(r => { img.onload = r; img.onerror = r; });

    if (!prefersReduced) {
      const anim = { duration: motionDuration, easing: "cubic-bezier(.2,.8,.2,1)", fill: "both" };
      if (mode === "top") img.animate([{ transform: "translateY(-20%)", opacity: 0 }, { transform: "translateY(0)", opacity: 1 }], anim);
      else if (mode === "bottom") img.animate([{ transform: "translateY(20%)", opacity: 0 }, { transform: "translateY(0)", opacity: 1 }], anim);
      else wrap.animate([{ opacity: 0 }, { opacity: 1 }], anim);
    }

    await wait(slideDuration - fadeDuration);
    wrap.animate([{ opacity: 1 }, { opacity: 0 }], { duration: fadeDuration, fill: "forwards" });
    await wait(fadeDuration);
  }

  async function showPhonesRow(phones) {
    stage.innerHTML = "";
    const row = document.createElement("div");
    row.className = "relative w-full h-full flex items-center justify-center gap-4";
    stage.appendChild(row);

    await Promise.all(phones.slice(0, 3).map(async (phone, i) => {
      const ph = document.createElement("div");
      ph.className = "w-1/4 aspect-[9/19] bg-black rounded-xl overflow-hidden opacity-0";
      const img = document.createElement("img");
      img.src = phone.src;
      img.className = "w-full h-full object-cover";
      ph.appendChild(img);
      row.appendChild(ph);

      if (!prefersReduced) {
        ph.animate([{ transform: "translateY(40px)", opacity: 0 }, { transform: "translateY(0)", opacity: 1 }], 
        { duration: 700, delay: i * 200, easing: "ease-out", fill: "forwards" });
      } else ph.style.opacity = 1;
    }));

    await wait(phoneStillDuration);
    row.animate([{ opacity: 1 }, { opacity: 0 }], { duration: fadeDuration, fill: "forwards" });
    await wait(fadeDuration);
  }

  async function start() {
    while (true) {
      const s = slides[idx % slides.length];
      const mode = modes[idx % modes.length];
      
      if (document.visibilityState === "visible") {
        if (s.type === "phonesRow") await showPhonesRow(s.phones);
        else await showImage(s, mode);
        idx++;
      } else {
        await wait(1000);
      }
    }
  }

  start();
})();
</script>
