(function () {
  "use strict";

  var hero = document.querySelector("[data-hero-intro]");

  if (!hero) {
    return;
  }

  var canvas = hero.querySelector("[data-hero-canvas]");
  var title = hero.querySelector("[data-hero-title]");
  var reduceMotionQuery = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)");

  function currentMode() {
    return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function setModeClass(mode) {
    hero.classList.remove("hero-intro--light", "hero-intro--dark");
    hero.classList.add("hero-intro--" + mode);
  }

  function setFinalState() {
    setModeClass(currentMode());
    hero.style.setProperty("--hero-reveal", "100%");
    hero.classList.remove("hero-intro--active");
    hero.classList.add("hero-intro--complete");
  }

  if (!canvas || !title || !canvas.getContext) {
    setFinalState();
    return;
  }

  var ctx = canvas.getContext("2d", { alpha: true });

  if (!ctx) {
    setFinalState();
    return;
  }

  var duration = parseInt(hero.getAttribute("data-duration"), 10) || 7800;
  var frameId = 0;
  var startedAt = 0;
  var width = 0;
  var height = 0;
  var dpr = 1;

  function prefersReducedMotion() {
    return reduceMotionQuery && reduceMotionQuery.matches;
  }

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
      width: titleRect.width,
      height: titleRect.height,
      centerY: titleRect.top - heroRect.top + titleRect.height / 2
    };
  }

  function drawWater(sourceX, sourceY, targetX, targetY, progress, tick, fade) {
    var spread = clamp(width * 0.055, 22, 48);

    ctx.save();
    ctx.globalAlpha = fade;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.strokeStyle = "rgba(15, 118, 110, 0.38)";
    ctx.lineWidth = 1.35;
    ctx.beginPath();
    ctx.moveTo(sourceX, sourceY);
    ctx.quadraticCurveTo(
      sourceX + (targetX - sourceX) * 0.35,
      sourceY + 20,
      targetX,
      targetY
    );
    ctx.stroke();

    ctx.fillStyle = "rgba(15, 118, 110, 0.48)";
    for (var i = 0; i < 16; i += 1) {
      var phase = (tick * 0.85 + i * 0.16) % 1;
      var t = clamp(phase * 0.92 + 0.04, 0, 1);
      var wobble = Math.sin(tick * 5 + i * 1.7);
      var x = sourceX + (targetX - sourceX) * t + wobble * 3;
      var arc = Math.sin(t * Math.PI);
      var y = sourceY + (targetY - sourceY) * t + arc * 20 + Math.cos(tick * 4 + i) * 2;

      if (t > progress + 0.16) {
        continue;
      }

      ctx.beginPath();
      ctx.ellipse(x, y, 1.3 + (i % 3) * 0.35, 2.1, 0.15, 0, Math.PI * 2);
      ctx.fill();
    }

    var landing = ctx.createRadialGradient(targetX, targetY, 0, targetX, targetY, spread);
    landing.addColorStop(0, "rgba(15, 118, 110, 0.18)");
    landing.addColorStop(1, "rgba(15, 118, 110, 0)");
    ctx.fillStyle = landing;
    ctx.beginPath();
    ctx.arc(targetX, targetY, spread, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  function drawSprouts(box, progress, fade) {
    var count = 7;
    var baseline = box.bottom + 16;

    ctx.save();
    ctx.globalAlpha = 0.65 * fade;
    ctx.strokeStyle = "rgba(15, 118, 110, 0.42)";
    ctx.fillStyle = "rgba(15, 118, 110, 0.4)";
    ctx.lineWidth = 1;

    for (var i = 0; i < count; i += 1) {
      var threshold = (i + 1) / (count + 1);
      var grow = clamp((progress - threshold) * 10, 0, 1);

      if (grow <= 0) {
        continue;
      }

      var x = box.left + box.width * threshold;
      var stem = 5 + grow * 7;

      ctx.beginPath();
      ctx.moveTo(x, baseline);
      ctx.lineTo(x, baseline - stem);
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(x - 3 * grow, baseline - stem * 0.66, 3 * grow, 1.6 * grow, -0.55, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.ellipse(x + 3 * grow, baseline - stem * 0.55, 3 * grow, 1.6 * grow, 0.55, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  function drawSpotlight(sourceX, sourceY, targetX, targetY, fade) {
    var coneWidth = clamp(width * 0.2, 96, 180);
    var gradient = ctx.createLinearGradient(sourceX, sourceY, targetX, targetY);

    gradient.addColorStop(0, "rgba(244, 211, 94, " + 0.23 * fade + ")");
    gradient.addColorStop(0.52, "rgba(255, 248, 218, " + 0.25 * fade + ")");
    gradient.addColorStop(1, "rgba(140, 200, 255, 0)");

    ctx.save();
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(sourceX, sourceY);
    ctx.lineTo(targetX + coneWidth * 0.58, targetY - 36);
    ctx.quadraticCurveTo(targetX + coneWidth * 0.25, targetY + 10, targetX + coneWidth * 0.7, targetY + 54);
    ctx.closePath();
    ctx.fill();

    var glow = ctx.createRadialGradient(targetX, targetY, 0, targetX, targetY, coneWidth * 0.64);
    glow.addColorStop(0, "rgba(255, 250, 226, " + 0.2 * fade + ")");
    glow.addColorStop(1, "rgba(255, 250, 226, 0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(targetX, targetY, coneWidth * 0.64, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  function drawCharacter(layout, mode, fade) {
    var dark = mode === "dark";

    ctx.save();
    ctx.globalAlpha = 0.9 * fade;
    ctx.translate(layout.x, layout.y);
    ctx.scale(0.92, 0.92);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.fillStyle = dark ? "rgba(0, 0, 0, 0.24)" : "rgba(15, 23, 42, 0.12)";
    ctx.beginPath();
    ctx.ellipse(35, 104, 26, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = dark ? "#94a3b8" : "#1f2937";
    ctx.fillRect(25, 88, 8, 18);
    ctx.fillRect(43, 88, 8, 18);

    ctx.fillStyle = dark ? "#dbe7f5" : "#202a44";
    ctx.beginPath();
    ctx.moveTo(22, 49);
    ctx.lineTo(52, 51);
    ctx.lineTo(57, 91);
    ctx.lineTo(18, 91);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = dark ? "rgba(15, 23, 42, 0.2)" : "rgba(255, 255, 255, 0.16)";
    ctx.fillRect(28, 56, 18, 2);

    ctx.fillStyle = "#f0c8ad";
    ctx.beginPath();
    ctx.arc(37, 33, 14, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#111827";
    ctx.beginPath();
    ctx.moveTo(20, 29);
    ctx.quadraticCurveTo(29, 8, 51, 18);
    ctx.quadraticCurveTo(56, 25, 50, 34);
    ctx.quadraticCurveTo(37, 24, 24, 34);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "rgba(23, 32, 51, 0.76)";
    ctx.beginPath();
    ctx.arc(32, 35, 1.7, 0, Math.PI * 2);
    ctx.arc(43, 35, 1.7, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "#f0c8ad";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(51, 63);
    ctx.lineTo(72, 58);
    ctx.stroke();

    if (dark) {
      ctx.strokeStyle = "rgba(244, 211, 94, 0.84)";
      ctx.lineWidth = 2;
      ctx.strokeRect(68, 50, 15, 22);
      ctx.beginPath();
      ctx.arc(75.5, 50, 5, Math.PI, 0);
      ctx.stroke();
      ctx.fillStyle = "rgba(255, 244, 189, 0.92)";
      ctx.fillRect(73, 58, 5, 10);
    } else {
      ctx.fillStyle = "#8bc5bd";
      ctx.strokeStyle = "rgba(15, 118, 110, 0.72)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(66, 53, 25, 18, 6);
      } else {
        ctx.rect(66, 53, 25, 18);
      }
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(88, 58);
      ctx.lineTo(108, 51);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(64, 62, 8, Math.PI * 0.56, Math.PI * 1.48);
      ctx.stroke();
    }

    ctx.restore();
  }

  function characterLayout(box, motion, mode) {
    var characterWidth = 70;
    var startX = box.left - 112;
    var endX = Math.min(width - characterWidth - 4, box.right + 26);
    var x = startX + (endX - startX) * motion;
    var y = clamp(box.bottom + 8, 58, Math.max(58, height - 112));

    return {
      x: x,
      y: y,
      wateringX: x + 80,
      wateringY: y + 54,
      lanternX: x + 68,
      lanternY: y + 64
    };
  }

  function finish() {
    if (frameId) {
      window.cancelAnimationFrame(frameId);
      frameId = 0;
    }

    ctx.clearRect(0, 0, width, height);
    setFinalState();
  }

  function draw(timestamp) {
    if (!startedAt) {
      startedAt = timestamp;
    }

    var raw = clamp((timestamp - startedAt) / duration, 0, 1);
    var motion = easeInOut(clamp(raw / 0.96, 0, 1));
    var reveal = clamp((easeOut(raw) - 0.035) / 0.9, 0, 1);
    var fade = raw > 0.9 ? clamp((1 - raw) / 0.1, 0, 1) : 1;
    var mode = currentMode();
    var box = titleBox();
    var layout = characterLayout(box, motion, mode);
    var revealX = box.left + box.width * reveal;
    var targetY = Math.min(box.bottom + 16, layout.wateringY + 44);

    hero.style.setProperty("--hero-reveal", Math.round(reveal * 100) + "%");
    hero.style.setProperty("--hero-person-x", Math.round(layout.x) + "px");
    hero.style.setProperty("--hero-person-y", Math.round(layout.y) + "px");

    ctx.clearRect(0, 0, width, height);

    if (mode === "dark") {
      drawSpotlight(
        layout.lanternX,
        layout.lanternY,
        revealX,
        Math.max(box.centerY, layout.lanternY + 22),
        fade
      );
    } else {
      drawWater(layout.wateringX, layout.wateringY, revealX, targetY, reveal, raw * 5, fade);
      drawSprouts(box, reveal, fade);
    }

    drawCharacter(layout, mode, fade);

    if (raw < 1) {
      frameId = window.requestAnimationFrame(draw);
    } else {
      finish();
    }
  }

  function start() {
    if (frameId) {
      window.cancelAnimationFrame(frameId);
      frameId = 0;
    }

    setModeClass(currentMode());
    hero.classList.remove("hero-intro--complete");
    hero.classList.add("hero-intro--active");
    hero.style.setProperty("--hero-reveal", "0%");

    if (prefersReducedMotion()) {
      finish();
      return;
    }

    startedAt = 0;
    resizeCanvas();
    frameId = window.requestAnimationFrame(draw);
  }

  window.addEventListener("resize", function () {
    resizeCanvas();
  }, { passive: true });

  window.addEventListener("themechange", start);

  window.addEventListener("pagehide", function () {
    if (frameId) {
      window.cancelAnimationFrame(frameId);
    }
  });

  start();
}());
