(function () {
  "use strict";

  const lesson = window.LESSON;
  if (!lesson || !lesson.meta || !Array.isArray(lesson.slides) || lesson.slides.length === 0) {
    document.body.innerHTML = '<p class="fatal-error">Lesson content is missing or invalid.</p>';
    return;
  }

  const escapeHTML = (value = "") => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const list = (items, render) => (items || []).map(render).join("");

  function heading(slide) {
    return `
      <header class="scene-heading">
        <p class="eyebrow">${escapeHTML(slide.eyebrow || slide.phase || "Lesson")}</p>
        <h2>${escapeHTML(slide.title)}</h2>
      </header>`;
  }

  function renderOpening(slide) {
    return `
      <div class="scene-inner opening-layout">
        <div class="opening-copy">
          <p class="eyebrow">${escapeHTML(slide.eyebrow)}</p>
          <h1>${escapeHTML(slide.title)}</h1>
        </div>
        <div class="recall-strip">
          <span>${escapeHTML(slide.recall?.label || "Quick recall")}</span>
          <p>${escapeHTML(slide.recall?.text || "What do we already know?")}</p>
        </div>
        <div class="opening-question">
          <span>${escapeHTML(slide.questionLabel || "Today")}</span>
          ${slide.diagram || ""}
          <strong>${escapeHTML(slide.question)}</strong>
        </div>
        <ol class="opening-goals" aria-label="Success criteria">
          ${list(slide.goals, (goal, index) => `<li><span>${String(index + 1).padStart(2, "0")}</span><strong>${escapeHTML(goal)}</strong></li>`)}
        </ol>
        <button class="primary-button opening-action" type="button" data-action="next-slide">Begin <span aria-hidden="true">→</span></button>
      </div>`;
  }

  function renderConcept(slide) {
    const visual = slide.visual || {};
    const visualBody = visual.image
      ? `<img src="${escapeHTML(visual.image)}" alt="${escapeHTML(visual.alt || "Lesson visual")}">`
      : `<div class="visual-fallback" aria-label="Visual prompt placeholder"><span>${escapeHTML(visual.big || "?")}</span></div>`;

    return `
      <div class="scene-inner concept-layout">
        <figure class="concept-visual">
          ${visualBody}
          <b>${escapeHTML(visual.badge || "LOOK")}</b>
          <figcaption>${escapeHTML(visual.caption || "Add a meaningful local visual.")}</figcaption>
        </figure>
        <div class="concept-copy">
          ${heading(slide)}
          <p class="concept-prompt">${escapeHTML(slide.prompt)}</p>
          <ol class="observation-list">
            ${list(slide.points, (point, index) => `<li><span>${String(index + 1).padStart(2, "0")}</span>${escapeHTML(point)}</li>`)}
          </ol>
        </div>
      </div>`;
  }

  function renderSteps(slide) {
    return `
      <div class="scene-inner steps-layout">
        ${heading(slide)}
        <div class="worked-prompt"><span>START HERE</span><strong>${escapeHTML(slide.prompt)}</strong></div>
        <div class="step-bridge" aria-live="polite">
          ${list(slide.steps, (step, index) => `
            <article class="worked-step${index === 0 ? " is-visible" : ""}" data-step="${index}">
              <small>${String(index + 1).padStart(2, "0")} · ${escapeHTML(step.label)}</small>
              <p>${escapeHTML(step.body)}</p>
            </article>${index < slide.steps.length - 1 ? '<span class="step-arrow" aria-hidden="true">→</span>' : ""}`)}
        </div>
        <div class="step-actions">
          <button class="primary-button" type="button" data-action="next-step">Reveal next step</button>
          <button class="text-button" type="button" data-action="reset-steps">Reset</button>
        </div>
        <p class="takeaway"><span>KEY IDEA</span><strong>${escapeHTML(slide.takeaway)}</strong></p>
      </div>`;
  }

  function renderCheck(slide) {
    return `
      <div class="scene-inner check-layout">
        ${heading(slide)}
        <div class="check-question"><span>COMMIT FIRST</span><strong>${escapeHTML(slide.question)}</strong></div>
        <div class="choice-stack" role="group" aria-label="Choose one response">
          ${list(slide.options, (option, index) => `<button class="choice-button" type="button" data-action="choose-option" data-option="${index}" aria-pressed="false"><span>${String.fromCharCode(65 + index)}</span>${escapeHTML(option)}</button>`)}
        </div>
        <div class="check-actions">
          <button class="primary-button" type="button" data-action="check-choice" disabled>Check the reasoning</button>
          <button class="text-button" type="button" data-action="reset-choice">Reset</button>
        </div>
        <div class="check-feedback" data-feedback hidden aria-live="polite">${escapeHTML(slide.explanation)}</div>
      </div>`;
  }

  function renderPractice(slide) {
    return `
      <div class="scene-inner practice-layout">
        <div>
          ${heading(slide)}
          <p class="slide-instruction">${escapeHTML(slide.instruction)}</p>
        </div>
        <div class="practice-list">
          ${list(slide.questions, (item, index) => `
            <article class="practice-item">
              <div><span>${String(index + 1).padStart(2, "0")}</span><strong>${escapeHTML(item.prompt)}</strong></div>
              <button class="reveal-button" type="button" data-action="toggle-reveal" aria-expanded="false">Reveal model response</button>
              <p class="reveal-body" hidden>${escapeHTML(item.answer)}</p>
            </article>`)}
        </div>
      </div>`;
  }

  function renderPathways(slide) {
    return `
      <div class="scene-inner pathways-layout">
        <div>
          ${heading(slide)}
          <p class="slide-instruction">${escapeHTML(slide.instruction)}</p>
        </div>
        <div class="pathway-list">
          ${list(slide.paths, (path, index) => `
            <article class="pathway pathway-${index + 1}">
              <span>${escapeHTML(path.level)}</span>
              <strong>${escapeHTML(path.title)}</strong>
              <p>${escapeHTML(path.detail)}</p>
            </article>`)}
        </div>
        <p class="pathway-note"><b>Teacher decision:</b> choose from evidence, then name the checkpoint for moving on.</p>
      </div>`;
  }

  function renderExit(slide) {
    return `
      <div class="scene-inner exit-layout">
        <div class="exit-heading">
          ${heading(slide)}
          <p class="slide-instruction">${escapeHTML(slide.instruction)}</p>
        </div>
        <div class="exit-list">
          ${list(slide.prompts, (item, index) => `
            <article class="exit-item">
              <span>${String(index + 1).padStart(2, "0")}</span>
              <strong>${escapeHTML(item.question)}</strong>
              <div class="writing-lines" aria-hidden="true"></div>
              ${item.answer ? `<button class="reveal-button" type="button" data-action="toggle-reveal" aria-expanded="false">Show model response</button><p class="reveal-body" hidden>${escapeHTML(item.answer)}</p>` : ""}
            </article>`)}
        </div>
      </div>`;
  }

  const renderers = {
    opening: renderOpening,
    concept: renderConcept,
    steps: renderSteps,
    check: renderCheck,
    practice: renderPractice,
    pathways: renderPathways,
    exit: renderExit,
    ...(window.LESSON_RENDERERS || {})
  };

  const deck = document.querySelector("#lessonDeck");
  lesson.slides.forEach((slide, index) => {
    const renderer = renderers[slide.type];
    if (!renderer) throw new Error(`Unsupported slide type: ${slide.type}`);
    const section = document.createElement("section");
    section.className = `scene scene-${slide.type}${index === 0 ? " is-active" : ""}`;
    section.dataset.title = slide.title;
    section.dataset.phase = slide.phase || "Lesson";
    section.dataset.notes = slide.notes || "No notes for this slide.";
    section.dataset.currentStep = "0";
    section.setAttribute("aria-hidden", String(index !== 0));
    section.inert = index !== 0;
    section.innerHTML = renderer(slide);
    deck.appendChild(section);
  });

  document.title = `${lesson.meta.title} — ${lesson.meta.yearLevel}`;
  document.querySelector("#lessonTitle").textContent = lesson.meta.title;
  document.querySelector("#lessonMeta").textContent = `${lesson.meta.yearLevel} · ${lesson.meta.unit}`;
  document.querySelector("#brandMark").textContent = lesson.meta.mark;

  const scenes = Array.from(document.querySelectorAll(".scene"));
  const prevButton = document.querySelector("#prevButton");
  const nextButton = document.querySelector("#nextButton");
  const currentSlide = document.querySelector("#currentSlide");
  const totalSlides = document.querySelector("#totalSlides");
  const currentTitle = document.querySelector("#currentTitle");
  const progress = document.querySelector("#lessonProgress");
  const progressBar = progress.querySelector("span");
  const announcer = document.querySelector("#slideAnnouncer");
  const notesPanel = document.querySelector("#notesPanel");
  const notesButton = document.querySelector("#notesButton");
  const notesPhase = document.querySelector("#notesPhase");
  const notesText = document.querySelector("#notesText");
  let activeScene = 0;

  function updateNotes(scene) {
    notesPhase.textContent = scene.dataset.phase;
    notesText.textContent = scene.dataset.notes;
  }

  function goToScene(index, updateHash = true) {
    const nextIndex = Math.max(0, Math.min(index, scenes.length - 1));
    scenes[activeScene].classList.remove("is-active");
    activeScene = nextIndex;
    scenes.forEach((scene, sceneIndex) => {
      const active = sceneIndex === activeScene;
      scene.classList.toggle("is-active", active);
      scene.setAttribute("aria-hidden", String(!active));
      scene.inert = !active;
    });

    const scene = scenes[activeScene];
    scene.scrollTop = 0;
    currentSlide.textContent = String(activeScene + 1);
    currentTitle.textContent = scene.dataset.title;
    prevButton.disabled = activeScene === 0;
    nextButton.disabled = activeScene === scenes.length - 1;
    progressBar.style.transform = `scaleX(${(activeScene + 1) / scenes.length})`;
    progress.setAttribute("aria-valuenow", String(activeScene + 1));
    updateNotes(scene);
    announcer.textContent = `Slide ${activeScene + 1} of ${scenes.length}: ${scene.dataset.title}`;
    if (updateHash) {
      const hash = `#slide-${activeScene + 1}`;
      try { history.replaceState(null, "", hash); }
      catch { if (location.hash !== hash) location.hash = hash; }
    }
    document.dispatchEvent(new CustomEvent("lesson:slide", { detail: { index: activeScene } }));
  }

  function setNotes(open) {
    document.body.classList.toggle("notes-open", open);
    notesPanel.setAttribute("aria-hidden", String(!open));
    notesPanel.inert = !open;
    notesButton.setAttribute("aria-expanded", String(open));
  }

  function toggleReveal(button) {
    const body = button.nextElementSibling;
    const show = body.hidden;
    body.hidden = !show;
    button.setAttribute("aria-expanded", String(show));
    button.textContent = show ? "Hide model response" : "Reveal model response";
  }

  deck.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    const scene = button.closest(".scene");
    const action = button.dataset.action;

    if (action === "next-slide") goToScene(activeScene + 1);

    if (action === "next-step") {
      const steps = Array.from(scene.querySelectorAll(".worked-step"));
      const current = Number(scene.dataset.currentStep || 0);
      const next = Math.min(current + 1, steps.length - 1);
      scene.dataset.currentStep = String(next);
      steps.forEach((step, index) => step.classList.toggle("is-visible", index <= next));
      button.disabled = next === steps.length - 1;
      button.textContent = button.disabled ? "Example complete" : "Reveal next step";
    }

    if (action === "reset-steps") {
      scene.dataset.currentStep = "0";
      scene.querySelectorAll(".worked-step").forEach((step, index) => step.classList.toggle("is-visible", index === 0));
      const next = scene.querySelector('[data-action="next-step"]');
      next.disabled = false;
      next.textContent = "Reveal next step";
    }

    if (action === "choose-option") {
      scene.dataset.choice = button.dataset.option;
      scene.querySelectorAll(".choice-button").forEach((option) => {
        const selected = option === button;
        option.classList.toggle("is-selected", selected);
        option.classList.remove("is-correct", "is-wrong");
        option.setAttribute("aria-pressed", String(selected));
      });
      scene.querySelector('[data-action="check-choice"]').disabled = false;
      scene.querySelector("[data-feedback]").hidden = true;
    }

    if (action === "check-choice") {
      const slide = lesson.slides[activeScene];
      scene.querySelectorAll(".choice-button").forEach((option) => {
        const optionIndex = Number(option.dataset.option);
        option.classList.toggle("is-correct", optionIndex === slide.correct);
        option.classList.toggle("is-wrong", optionIndex === Number(scene.dataset.choice) && optionIndex !== slide.correct);
      });
      scene.querySelector("[data-feedback]").hidden = false;
    }

    if (action === "reset-choice") {
      delete scene.dataset.choice;
      scene.querySelectorAll(".choice-button").forEach((option) => {
        option.classList.remove("is-selected", "is-correct", "is-wrong");
        option.setAttribute("aria-pressed", "false");
      });
      scene.querySelector('[data-action="check-choice"]').disabled = true;
      scene.querySelector("[data-feedback]").hidden = true;
    }

    if (action === "toggle-reveal") toggleReveal(button);
  });

  document.querySelector("#homeButton").addEventListener("click", () => goToScene(0));
  prevButton.addEventListener("click", () => goToScene(activeScene - 1));
  nextButton.addEventListener("click", () => goToScene(activeScene + 1));
  notesButton.addEventListener("click", () => setNotes(!document.body.classList.contains("notes-open")));
  document.querySelector("#closeNotes").addEventListener("click", () => setNotes(false));

  document.addEventListener("keydown", (event) => {
    if (["INPUT", "TEXTAREA", "SELECT"].includes(event.target.tagName)) return;
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === "ArrowRight" || event.key === "PageDown") {
      event.preventDefault();
      goToScene(activeScene + 1);
    }
    if (event.key === "ArrowLeft" || event.key === "PageUp") {
      event.preventDefault();
      goToScene(activeScene - 1);
    }
    if (event.key === "Home") goToScene(0);
    if (event.key === "End") goToScene(scenes.length - 1);
    if (event.key.toLowerCase() === "n") setNotes(!document.body.classList.contains("notes-open"));
    if (event.key === "Escape" && document.body.classList.contains("notes-open")) setNotes(false);
  });

  const fullscreenButton = document.querySelector("#fullscreenButton");
  function syncFullscreen() {
    const presenting = Boolean(document.fullscreenElement);
    document.body.classList.toggle("presentation", presenting);
    fullscreenButton.setAttribute("aria-pressed", String(presenting));
    fullscreenButton.innerHTML = presenting
      ? '<span aria-hidden="true">×</span> Exit'
      : '<span aria-hidden="true">⛶</span> Present';
  }

  fullscreenButton.addEventListener("click", async () => {
    try {
      if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
      else await document.exitFullscreen();
    } catch (error) {
      document.body.classList.toggle("presentation");
      const presenting = document.body.classList.contains("presentation");
      fullscreenButton.setAttribute("aria-pressed", String(presenting));
    }
  });
  document.addEventListener("fullscreenchange", syncFullscreen);

  window.addEventListener("hashchange", () => {
    const match = window.location.hash.match(/slide-(\d+)/);
    if (match) goToScene(Number(match[1]) - 1, false);
  });

  totalSlides.textContent = String(scenes.length);
  progress.setAttribute("aria-valuemax", String(scenes.length));
  const initial = window.location.hash.match(/slide-(\d+)/);
  goToScene(initial ? Number(initial[1]) - 1 : 0);
  setNotes(false);
}());
