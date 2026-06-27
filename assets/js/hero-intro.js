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
  var darkQuery = window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)");
  var mode = darkQuery && darkQuery.matches ? "dark" : "light";

  hero.classList.add("hero-intro--" + mode);

  function finish() {
    hero.style.setProperty("--hero-reveal", "100%");
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

  var duration = parseInt(hero.getAttribute("data-duration"), 10) || 4500;
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

  function titleBox() {
    var heroRect = hero.getBoundingClientRect();
    var titleRect = title.getBoundingClientRect();
    return {
      left: titleRect.left - heroRect.left,
      right: titleRect.right - heroRect.left,
      top: titleRect.top - heroRect.top,
      bottom: titleRect.bottom - heroRect.top,
      x: titleRect.left - heroRect.left + titleRect.width / 2,
      y: titleRect.top - heroRect.top + titleRect.height / 2,
      width: titleRect.width,
      height: titleRect.height
    };
  }

  function drawBackground() {
    return;
  }

  function drawSpotlight(sourceX, sourceY, targetX, targetY, fade) {
    var coneWidth = clamp(width * 0.18, 74, 150);
    var gradient = ctx.createLinearGradient(sourceX, sourceY, targetX, targetY);
    gradient.addColorStop(0, "rgba(94, 234, 212, " + 0.17 * fade + ")");
    gradient.addColorStop(0.54, "rgba(255, 248, 218, " + 0.2 * fade + ")");
    gradient.addColorStop(1, "rgba(140, 200, 255, 0)");

    ctx.save();
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(sourceX, sourceY);
    ctx.lineTo(targetX + coneWidth, targetY - 44);
    ctx.quadraticCurveTo(targetX + coneWidth * 0.45, targetY, targetX + coneWidth, targetY + 52);
    ctx.lineTo(sourceX, sourceY);
    ctx.closePath();
    ctx.fill();

    var glow = ctx.createRadialGradient(targetX, targetY, 0, targetX, targetY, coneWidth * 0.74);
    glow.addColorStop(0, "rgba(255, 250, 226, " + 0.22 * fade + ")");
    glow.addColorStop(1, "rgba(255, 250, 226, 0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(targetX, targetY, coneWidth * 0.74, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawWater(sourceX, sourceY, targetX, targetY, progress, step, fade) {
    ctx.save();
    ctx.globalAlpha = 0.82 * fade;
    ctx.strokeStyle = "rgba(15, 118, 110, 0.34)";
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(sourceX, sourceY);
    ctx.quadraticCurveTo(
      sourceX + (targetX - sourceX) * 0.34,
      sourceY + 28,
      targetX,
      targetY
    );
    ctx.stroke();

    ctx.fillStyle = "rgba(15, 118, 110, 0.46)";
    for (var i = 0; i < 12; i += 1) {
      var offset = (step * 26 + i * 17) % 92;
      var t = clamp((i / 11) * progress + offset / 520, 0, 1);
      var x = sourceX + (targetX - sourceX) * t;
      var arc = Math.sin(t * Math.PI);
      var y = sourceY + (targetY - sourceY) * t + arc * 30 + Math.sin(step * 7 + i) * 2;
      var r = 1.3 + (i % 3) * 0.45;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function drawSprouts(box, progress, fade) {
    var count = 8;
    var baseline = box.bottom + 12;

    ctx.save();
    ctx.globalAlpha = 0.72 * fade;
    ctx.strokeStyle = "rgba(15, 118, 110, 0.45)";
    ctx.fillStyle = "rgba(15, 118, 110, 0.42)";
    ctx.lineWidth = 1;

    for (var i = 0; i < count; i += 1) {
      var threshold = (i + 1) / (count + 1);
      if (progress < threshold) {
        continue;
      }

      var x = box.left + box.width * threshold;
      var grow = clamp((progress - threshold) * 10, 0, 1);
      var stem = 5 + grow * 7;

      ctx.beginPath();
      ctx.moveTo(x, baseline);
      ctx.lineTo(x, baseline - stem);
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(x - 3 * grow, baseline - stem * 0.72, 3 * grow, 1.7 * grow, -0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(x + 3 * grow, baseline - stem * 0.58, 3 * grow, 1.7 * grow, 0.5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  function drawCharacter(x, groundY, scale, step, fade) {
    var dark = mode === "dark";
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

    ctx.strokeStyle = dark ? "rgba(226, 237, 247, 0.58)" : "rgba(23, 32, 51, 0.58)";
    ctx.lineWidth = Math.max(1.4, scale * 0.05);

    ctx.beginPath();
    ctx.moveTo(centerX - scale * 0.1, torsoBottom);
    ctx.lineTo(centerX - scale * 0.23, y);
    ctx.lineTo(centerX - scale * 0.46, y + scale * 0.08);
    ctx.moveTo(centerX + scale * 0.08, torsoBottom);
    ctx.lineTo(centerX + scale * 0.28, y);
    ctx.lineTo(centerX + scale * 0.5, y + scale * 0.03);
    ctx.stroke();

    ctx.fillStyle = dark ? "#d9e6f5" : "#243447";
    ctx.beginPath();
    ctx.moveTo(centerX - scale * 0.28, torsoTop);
    ctx.lineTo(centerX + scale * 0.24, torsoTop + scale * 0.05);
    ctx.lineTo(centerX + scale * 0.17, torsoBottom);
    ctx.lineTo(centerX - scale * 0.24, torsoBottom + scale * 0.03);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = dark ? "#5eead4" : "#0f766e";
    ctx.beginPath();
    ctx.moveTo(centerX - scale * 0.22, torsoTop + scale * 0.08);
    ctx.lineTo(centerX + scale * 0.2, torsoTop + scale * 0.1);
    ctx.lineTo(centerX + scale * 0.12, torsoBottom - scale * 0.04);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = dark ? "rgba(226, 237, 247, 0.66)" : "rgba(23, 32, 51, 0.66)";
    ctx.beginPath();
    ctx.moveTo(centerX + scale * 0.2, torsoTop + scale * 0.22);
    ctx.lineTo(centerX + scale * 0.62, torsoTop + scale * 0.06);
    ctx.stroke();

    ctx.fillStyle = "#f7d7bd";
    ctx.beginPath();
    ctx.arc(centerX + scale * 0.03, torsoTop - headR * 0.75, headR, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = dark ? "#07111f" : "#172033";
    ctx.beginPath();
    ctx.moveTo(centerX - headR * 0.74, torsoTop - headR * 0.82);
    ctx.quadraticCurveTo(centerX + headR * 0.08, torsoTop - headR * 1.55, centerX + headR * 0.86, torsoTop - headR * 0.72);
    ctx.lineTo(centerX + headR * 0.72, torsoTop - headR * 0.33);
    ctx.quadraticCurveTo(centerX, torsoTop - headR * 0.78, centerX - headR * 0.7, torsoTop - headR * 0.37);
    ctx.closePath();
    ctx.fill();

    if (dark) {
      ctx.fillStyle = "#f4d35e";
      ctx.fillRect(centerX + scale * 0.56, torsoTop - scale * 0.02, scale * 0.18, scale * 0.1);
    } else {
      ctx.fillStyle = "#73a9a2";
      ctx.strokeStyle = "rgba(15, 118, 110, 0.68)";
      ctx.lineWidth = Math.max(1, scale * 0.035);
      ctx.beginPath();
      ctx.moveTo(centerX + scale * 0.5, torsoTop + scale * 0.04);
      ctx.lineTo(centerX + scale * 0.78, torsoTop + scale * 0.02);
      ctx.lineTo(centerX + scale * 0.76, torsoTop + scale * 0.22);
      ctx.lineTo(centerX + scale * 0.48, torsoTop + scale * 0.23);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(centerX + scale * 0.76, torsoTop + scale * 0.07);
      ctx.lineTo(centerX + scale * 0.98, torsoTop - scale * 0.02);
      ctx.stroke();
    }

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
      var box = titleBox();

      hero.style.setProperty("--hero-reveal", Math.round(reveal * 100) + "%");
      hero.style.setProperty("--hero-reveal-width", Math.round(box.width * reveal) + "px");

      ctx.clearRect(0, 0, width, height);
      drawBackground();

      var groundY = height - 28;
      var scale = clamp(height * 0.23, 34, 46);
      var charX = -scale + (width + scale * 2.2) * motion;
      var handX = charX + scale * 0.64;
      var handY = groundY - scale * 1.12;
      var revealX = box.left + box.width * reveal;

      if (mode === "dark") {
        drawSpotlight(handX, handY, revealX, box.y, endFade);
      } else {
        drawWater(handX + scale * 0.32, handY - scale * 0.06, revealX, box.bottom + 2, reveal, raw * 3.2, endFade);
        drawSprouts(box, reveal, endFade);
      }

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
