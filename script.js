function scrollToSmoothly(pos, time) {
  const startPos = window.scrollY;
  const distance = pos - startPos;
  const startTime = performance.now();
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  function animation(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / time, 1);
    const ease = easeInOutQuad(progress);
    const scrollPos = startPos + distance * ease;
    window.scrollTo(0, Math.min(scrollPos, maxScroll)); // nunca passa do máximo scroll
    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const targetPos = Math.min(target.offsetTop, maxScroll);
      scrollToSmoothly(targetPos, 1800);
    }
  });
});
