document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("nav a");
  const pageSections = document.querySelectorAll(".page-section");
  const header = document.querySelector("header");

  function showPage(pageId) {
    pageSections.forEach((section) => {
      section.classList.remove("active");
    });
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
      targetPage.classList.add("active");
    }
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const pageToShow = this.getAttribute("data-page");
      showPage(pageToShow);
      window.location.hash = pageToShow;
    });
  });

  if (window.location.hash) {
    const initialPage = window.location.hash.substring(1);
    showPage(initialPage);
  } else {
    showPage("home");
  }

  gsap.from(header, {
    y: -50,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    delay: 0.2,
  });

  gsap.utils.toArray(".landing-page .hero-content > *").forEach((elem, i) => {
    gsap.from(elem, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.6 + i * 0.2,
      ease: "power2.out",
    });
  });
  gsap.from(".landing-page .hero-image", {
    opacity: 0,
    x: 50,
    duration: 1,
    ease: "power2.out",
    delay: 0.8,
  });

  pageSections.forEach((section) => {
    if (section.id !== "home") {
      gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });
    }
  });
});
