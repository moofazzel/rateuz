/**
 * Template Name: RateFii  - v1.0
 * Template URL: https://zohirs.com
 * Author: Zohir
 */
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }



  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }


  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }


  // View more toggler 

  /* Event handlers - you customize these */
  const whatever = document.querySelector('.whatever');
  document.querySelector('.btn1').addEventListener('click', () => {
    slideToggle(whatever); // here's the magic
  });

  const whatever2 = document.querySelector('.whatever2');
  document.querySelector('.btn2').addEventListener('click', () => {
    slideToggle(whatever2, 1000); // more magic, can add custom duration in ms
  });


  /* Slide functionality - leave everything below as-is */
  function slideToggle(el, duration) {
    if (el.clientHeight === 0) {
      _s(el, duration, true);
    } else {
      _s(el, duration);
    }
  }

  function slideUp(el, duration) {
    _s(el, duration);
  }

  function slideDown(el, duration) {
    _s(el, duration, true);
  }

  function _s(el, duration, isDown) {

    if (typeof duration === 'undefined') duration = 400;
    if (typeof isDown === 'undefined') isDown = false;

    el.style.overflow = "hidden";
    if (isDown) el.style.display = "block";

    var elStyles = window.getComputedStyle(el);
    var elMarginTop = parseFloat(elStyles.getPropertyValue('margin-top'));
    var elMarginBottom = parseFloat(elStyles.getPropertyValue('margin-bottom'));
    var elPaddingTop = parseFloat(elStyles.getPropertyValue('padding-top'));
    var elPaddingBottom = parseFloat(elStyles.getPropertyValue('padding-bottom'));
    var elHeight = parseFloat(elStyles.getPropertyValue('height'));

    var stepMarginTop = elMarginTop / duration;
    var stepMarginBottom = elMarginBottom / duration;
    var stepPaddingTop = elPaddingTop / duration;
    var stepPaddingBottom = elPaddingBottom / duration;
    var stepHeight = elHeight / duration;

    var start;

    function step(timestamp) {

      if (start === undefined) start = timestamp;

      var elapsed = timestamp - start;

      if (isDown) {
        el.style.marginTop = (stepMarginTop * elapsed) + "px";
        el.style.marginBottom = (stepMarginBottom * elapsed) + "px";
        el.style.paddingTop = (stepPaddingTop * elapsed) + "px";
        el.style.paddingBottom = (stepPaddingBottom * elapsed) + "px";
        el.style.height = (stepHeight * elapsed) + "px";
      } else {
        el.style.marginTop = elMarginTop - (stepMarginTop * elapsed) + "px";
        el.style.marginBottom = elMarginBottom - (stepMarginBottom * elapsed) + "px";
        el.style.paddingTop = elPaddingTop - (stepPaddingTop * elapsed) + "px";
        el.style.paddingBottom = elPaddingBottom - (stepPaddingBottom * elapsed) + "px";
        el.style.height = elHeight - (stepHeight * elapsed) + "px";
      }

      if (elapsed >= duration) {
        el.style.marginTop = "";
        el.style.marginBottom = "";
        el.style.paddingTop = "";
        el.style.paddingBottom = "";
        el.style.height = "";
        el.style.overflow = "";
        if (!isDown) el.style.display = "none";
      } else {
        window.requestAnimationFrame(step);
      }
    }

    window.requestAnimationFrame(step);
  }


})()