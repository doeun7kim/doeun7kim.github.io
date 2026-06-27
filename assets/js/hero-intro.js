(function () {
  "use strict";

  var hero = document.querySelector("[data-hero-intro]");
  if (!hero) {
    return;
  }

  var canvas = hero.querySelector("[data-hero-canvas]");
  var title = hero.querySelector("[data-hero-title]");
  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function finish() {
    hero.style.setProperty("--hero-reveal-width", "100%");
    hero.classList.remove("hero-intro--active");
    hero.classList.add("hero-intro--complete");
  }

  if (!canvas || !title || reduceMotion || !canvas.getContext) {
    finish();
    return;
  }

  var ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) {
    finish();
    return;
  }

  var duration = parseInt(hero.getAttribute("data-duration"), 10) || 4300;
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var width = 0;
  var height = 0;
  var startedAt = 0;
  var frameId = 0;

  hero.classList.add("hero-intro--active");

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function easeInOut(value) {
    return value < 0.5
      ? 4 * value * value * value
      : 1 - Math.pow(-2 * value + 2, 3) / 2;
  }

  function easeOut(value) {
    return 1 - Math.pow(1 - value, 3);
  }

  function resizeCanvas() {
    var rect = hero.getBoundingClientRect();
    width = Math.max(1, Math.round(rect.width));
    height = Math.max(1, Math.round(rect.height));
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function titleCenter() {
    var heroRect = hero.getBoundingClientRect();
    var titleRect = title.getBoundingClientRect();
    return {
      x: titleRect.left - heroRect.left + titleRect.width / 2,
      y: titleRect.top - heroRect.top + titleRect.height / 2,
      width: titleRect.width
    };
  }

  function drawBackground() {
    ctx.save();
    ctx.globalAlpha = 0.48;
    ctx.strokeStyle = "#d9e0e8";
    ctx.lineWidth = 1;
    for (var x = 28; x < width; x += 58) {
      ctx.beginPath();
      ctx.moveTo(x, height * 0.2);
      ctx.lineTo(x, height - 22);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawSpotlight(sourceX, sourceY, targetX, targetY, fade) {
    var coneWidth = clamp(width * 0.18, 74, 150);
    var gradient = ctx.createLinearGradient(sourceX, sourceY, targetX, targetY);
    gradient.addColorStop(0, "rgba(15, 118, 110, " + 0.2 * fade + ")");
    gradient.addColorStop(0.56, "rgba(255, 248, 218, " + 0.18 * fade + ")");
    gradient.addColorStop(1, "rgba(15, 90, 166, 0)");

    ctx.save();
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(sourceX, sourceY);
    ctx.lineTo(targetX + coneWidth, targetY - 42);
    ctx.quadraticCurveTo(targetX + coneWidth * 0.45, targetY, targetX + coneWidth, targetY + 48);
    ctx.lineTo(sourceX, sourceY);
    ctx.closePath();
    ctx.fill();

    var glow = ctx.createRadialGradient(targetX, targetY, 0, targetX, targetY, coneWidth * 0.72);
    glow.addColorStop(0, "rgba(255, 250, 226, " + 0.2 * fade + ")");
    glow.addColorStop(1, "rgba(255, 250, 226, 0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(targetX, targetY, coneWidth * 0.72, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawCharacter(x, groundY, scale, step, fade) {
    var bob = Math.sin(step * Math.PI * 2) * 2.2;
    var y = groundY + bob;
    var headR = scale * 0.22;
    var torsoTop = y - scale * 1.2;
    var torsoBottom = y - scale * 0.44;
    var centerX = x;

    ctx.save();
    ctx.globalAlpha = fade;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.strokeStyle = "rgba(23, 32, 51, 0.58)";
    ctx.lineWidth = Math.max(1.4, scale * 0.05);

    ctx.beginPath();
    ctx.moveTo(centerX - scale * 0.1, torsoBottom);
    ctx.lineTo(centerX - scale * 0.23, y);
    ctx.lineTo(centerX - scale * 0.46, y + scale * 0.08);
    ctx.moveTo(centerX + scale * 0.08, torsoBottom);
    ctx.lineTo(centerX + scale * 0.28, y);
    ctx.lineTo(centerX + scale * 0.5, y + scale * 0.03);
    ctx.stroke();

    ctx.fillStyle = "#243447";
    ctx.beginPath();
    ctx.moveTo(centerX - scale * 0.28, torsoTop);
    ctx.lineTo(centerX + scale * 0.24, torsoTop + scale * 0.05);
    ctx.lineTo(centerX + scale * 0.17, torsoBottom);
    ctx.lineTo(centerX - scale * 0.24, torsoBottom + scale * 0.03);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#0f766e";
    ctx.beginPath();
    ctx.moveTo(centerX - scale * 0.22, torsoTop + scale * 0.08);
    ctx.lineTo(centerX + scale * 0.2, torsoTop + scale * 0.1);
    ctx.lineTo(centerX + scale * 0.12, torsoBottom - scale * 0.04);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = "rgba(23, 32, 51, 0.66)";
    ctx.beginPath();
    ctx.moveTo(centerX + scale * 0.2, torsoTop + scale * 0.22);
    ctx.lineTo(centerX + scale * 0.62, torsoTop + scale * 0.06);
    ctx.stroke();

    ctx.fillStyle = "#f7d7bd";
    ctx.beginPath();
    ctx.arc(centerX + scale * 0.03, torsoTop - headR * 0.75, headR, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#172033";
    ctx.beginPath();
    ctx.moveTo(centerX - headR * 0.74, torsoTop - headR * 0.82);
    ctx.quadraticCurveTo(centerX + headR * 0.08, torsoTop - headR * 1.55, centerX + headR * 0.86, torsoTop - headR * 0.72);
    ctx.lineTo(centerX + headR * 0.72, torsoTop - headR * 0.33);
    ctx.quadraticCurveTo(centerX, torsoTop - headR * 0.78, centerX - headR * 0.7, torsoTop - headR * 0.37);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#f4d35e";
    ctx.fillRect(centerX + scale * 0.56, torsoTop - scale * 0.02, scale * 0.18, scale * 0.1);

    ctx.restore();
  }

  function draw(timestamp) {
    if (!startedAt) {
      startedAt = timestamp;
    }

    try {
      var raw = clamp((timestamp - startedAt) / duration, 0, 1);
      var motion = easeInOut(clamp(raw / 0.92, 0, 1));
      var reveal = clamp((easeOut(raw) - 0.05) / 0.82, 0, 1);
      var endFade = raw > 0.84 ? clamp((1 - raw) / 0.16, 0, 1) : 1;
      var titleInfo = titleCenter();

      hero.style.setProperty("--hero-reveal-width", Math.round(titleInfo.width * reveal) + "px");

      ctx.clearRect(0, 0, width, height);
      drawBackground();

      var groundY = height - 28;
      var scale = clamp(height * 0.23, 34, 46);
      var charX = -scale + (width + scale * 2.2) * motion;
      var handX = charX + scale * 0.64;
      var handY = groundY - scale * 1.12;
      var lightX = titleInfo.x - titleInfo.width * 0.5 + titleInfo.width * reveal;

      drawSpotlight(handX, handY, lightX, titleInfo.y, endFade);
      drawCharacter(charX, groundY, scale, raw * 2.8, endFade);

      if (raw < 1) {
        frameId = window.requestAnimationFrame(draw);
      } else {
        finish();
      }
    } catch (error) {
      finish();
    }
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas, { passive: true });

  frameId = window.requestAnimationFrame(draw);

  window.addEventListener("pagehide", function () {
    if (frameId) {
      window.cancelAnimationFrame(frameId);
    }
  });
}());
