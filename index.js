const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

function speedCircle() {
  var timeout;
  var xscale = 1;
  var yscale = 1;
  var xprev = 0;
  var yprev = 0;
  window.addEventListener("mousemove", function (detail) {
    clearTimeout(timeout);

    xscale = gsap.utils.clamp(0.8, 1.2, detail.clientX - xprev);
    yscale = gsap.utils.clamp(0.8, 1.2, detail.clientY - yprev);

    xprev = detail.clientX;
    yprev = detail.clientY;

    circleCursor(xscale, yscale);

    timeout = setTimeout(function () {
      document.querySelector(
        "#cursor-circle"
      ).style.transform = `translate(${detail.clientX}px, ${detail.clientY}px) scale(1,1)`;
    }, 100);
  });
}

function circleCursor(xscale, yscale) {
  window.addEventListener("mousemove", function (detail) {
    // console.log(detail);
    document.querySelector(
      "#cursor-circle"
    ).style.transform = `translate(${detail.clientX}px, ${detail.clientY}px) scale(${xscale}, ${yscale})`;
  });
}

function firstPageAnimation() {
  var tl = gsap.timeline();

  tl.from("#nav", {
    y: -10,
    duration: 1.5,
    opacity: 0,
  })
    .to(".boundary-elem", {
      y: 0,
      duration: 2,
      delay: -1,
      stagger: 0.2,
    })
    .from("#page1footer", {
      y: -10,
      duration: 1.5,
      delay: -1,
      opacity: 0,
    });
}

document.querySelectorAll(".element").forEach(function (elem) {
  var rotate = 0;
  var diffRotate = 0;

  elem.addEventListener("mouseleave", function (detail) {
    var diff = detail.clientY - elem.getBoundingClientRect().top;
    diffRotate = detail.clientX - rotate;
    rotate = detail.clientX;

    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    });
    gsap.to(elem.querySelector("h1"), {
      opacity: 1,
      x: 0,
    });
    gsap.to(elem.querySelector("h5"), {
      opacity: 1,
    });
  });

  elem.addEventListener("mousemove", function (detail) {
    var diff = detail.clientY - elem.getBoundingClientRect().top;
    diffRotate = detail.clientX - rotate;
    rotate = detail.clientX;

    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: detail.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffRotate),
    });
    gsap.to(elem.querySelector("h1"), {
      opacity: 0.3,
      x: 30,
    });
    gsap.to(elem.querySelector("h5"), {
      opacity: 0.3,
    });
  });
});

speedCircle();
circleCursor();
firstPageAnimation();
