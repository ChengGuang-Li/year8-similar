(function () {
  "use strict";
  const esc = (s = "") => String(s).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
  const t = (x, y, value, cls = "", anchor = "middle") => `<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}">${esc(value)}</text>`;
  const line = (x1, y1, x2, y2, cls = "") => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${cls}"/>`;
  const poly = (pts, cls = "") => `<polygon points="${pts.map(p => p.join(",")).join(" ")}" class="${cls}"/>`;
  const svg = (label, body, box = "0 0 900 460") => `<svg viewBox="${box}" role="img" aria-label="${esc(label)}" xmlns="http://www.w3.org/2000/svg"><title>${esc(label)}</title>${body}</svg>`;
  const right = (x, y, sx = 1, sy = -1) => `<path d="M ${x + sx * 18} ${y} v ${sy * 18} h ${-sx * 18}" class="angle-mark"/>`;
  const arrow = (x1, y, x2, label) => line(x1, y, x2, y, "direction-line") + `<path d="M ${x2-12} ${y-8} L ${x2} ${y} L ${x2-12} ${y+8}" class="direction-line"/>` + t((x1+x2)/2, y-18, label, "arrow-label");
  const tag = (x, y, text) => t(x, y, text, "shape-tag");

  function trianglePair(kind = "sss") {
    let a = "", b = "", extra = "";
    if (["sss", "missing", "match"].includes(kind)) {
      // Two exact 3:4:5 right triangles. The image is turned through 180 degrees.
      a = poly([[85,165],[85,285],[245,285]], "shape-wash") + line(85,165,85,285,"edge-a") + line(85,285,245,285,"edge-b") + line(85,165,245,285,"edge-c");
      a += t(43,239,"3") + t(165,330,"4") + t(190,203,"5");
      if (kind === "match") {
        b = poly([[520,120],[760,120],[760,300]], "shape-wash") + line(760,120,760,300,"edge-a") + line(520,120,760,120,"edge-b") + line(520,120,760,300,"edge-c") + t(820,228,"4.5") + t(640,82,"6") + t(621,257,"7.5");
      } else {
        b = poly([[470,100],[790,100],[790,340]], "shape-wash") + line(790,100,790,340,"edge-a") + line(470,100,790,100,"edge-b") + line(470,100,790,340,"edge-c") + t(838,238,"6") + t(630,64,kind==="missing"?"x":"8",kind==="missing"?"unknown":"") + t(605,272,"10");
      }
      if (kind === "match") {
        a += t(76,137,"A","vertex") + t(55,315,"B","vertex") + t(269,307,"C","vertex") + right(85,285);
        b += t(786,339,"E","vertex") + t(786,101,"D","vertex") + t(493,107,"F","vertex") + right(760,120,-1,1);
        extra = `<g data-diagram-step="2" hidden aria-hidden="true" aria-label="Small to large: scale factor 1.5. Triangle ABC is similar to triangle EDF.">${arrow(310,220,460,"× 1.5")}${t(450,430,"△ABC ∼ △EDF","similarity-result")}</g>`;
      } else { extra = tag(205,400,"OBJECT") + tag(670,425,"IMAGE"); }
    } else if (kind === "sas") {
      a = poly([[80,100],[80,340],[400,340]],"shape-wash") + line(80,100,80,340,"edge-a") + line(80,340,400,340,"edge-a") + line(80,100,400,340,"edge-muted") + right(80,340) + t(43,235,"12") + t(245,377,"16");
      b = poly([[585,160],[785,160],[785,310]],"shape-wash") + line(585,160,785,160,"edge-a") + line(785,160,785,310,"edge-a") + line(585,160,785,310,"edge-muted") + right(785,160,-1,1) + t(685,135,"2") + t(826,248,"1.5");
      extra = tag(235,425,"OBJECT") + tag(700,380,"IMAGE");
    } else if (kind === "aaa") {
      a = poly([[80,100],[80,330],[478.4,330]],"outline-shape") + right(80,330) + `<path d="M 80 144 A 44 44 0 0 0 118 122 M 430 330 A 48 48 0 0 1 437 306" class="angle-mark"/>` + t(123,175,"60°") + t(389,314,"30°");
      b = poly([[550,140],[810,140],[810,290]],"outline-shape") + right(810,140,-1,1) + `<path d="M 594 140 A 44 44 0 0 1 588 162 M 810 252 A 38 38 0 0 0 777 271" class="angle-mark"/>` + t(622,177,"30°") + t(765,239,"60°");
      extra = tag(450,412,"90° + 60° + 30° = 180°");
    } else if (kind === "rhs") {
      a = poly([[110,160],[110,280],[244.16,280]],"shape-wash") + line(110,160,110,280,"edge-a") + line(110,280,244.16,280,"edge-muted") + line(110,160,244.16,280,"edge-c") + right(110,280) + t(69,233,"2") + t(211,207,"3");
      b = poly([[531.67,330],[800,330],[800,90]],"shape-wash") + line(531.67,330,800,330,"edge-muted") + line(800,90,800,330,"edge-a") + line(531.67,330,800,90,"edge-c") + right(800,330,-1,-1) + t(847,225,"4") + t(634,205,"6");
      extra = tag(450,430,"The hypotenuse is opposite the right angle.");
    }
    return svg("Two triangles for " + kind + ". Side lengths and angle marks are labelled.", a+b+extra);
  }

  function squares(kind) {
    let body = "";
    const rect = (x,y,w,h,wLabel,hLabel,cls="object-shape") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" class="${cls}"/>` + t(x+w/2,y+h+42,wLabel) + (hLabel ? t(x-24,y+h/2+12,hLabel,"","end") : "");
    if (kind === "hook") {
      body = rect(65,195,120,120,"4","4") + tag(125,155,"ORIGINAL") + rect(330,75,240,240,"8","8","image-shape") + tag(450,35,"COPY A") + rect(650,195,240,120,"8","4","stretch-shape") + tag(770,155,"COPY B");
    } else if (kind === "formula") {
      body = rect(110,245,120,120,"4 cm","") + rect(515,65,300,300,"10 cm","","image-shape") + arrow(290,265,440,"× k") + tag(170,200,"OBJECT") + tag(665,35,"IMAGE") + right(110,365) + right(515,365);
    } else if (kind === "reverse") {
      body = rect(110,200,140,140,"4","4") + rect(510,60,280,280,"8","8","image-shape") + arrow(295,155,465,"× 2") + `<path d="M 465 295 H 295 l 12 -8 M 295 295 l 12 8" class="direction-line"/>` + t(380,332,"× ½","arrow-label") + tag(180,425,"SMALL") + tag(650,425,"LARGE");
    }
    return svg("Square scaling model: " + kind + ". Each square has equal width and height." + (kind === "hook" ? " Copy B is a stretched rectangle." : ""), body);
  }

  function nested() {
    let body = poly([[420,55],[150,370],[780,370]],"shape-wash") + line(420,55,150,370) + line(420,55,780,370) + line(150,370,780,370,"edge-b") + line(352.5,133.75,510,133.75,"edge-b");
    // Parallel marks are identical, independent of colour.
    body += `<path d="M 427 126 l 12 8 l -12 8 M 458 362 l 12 8 l -12 8" class="parallel-mark"/>`;
    body += t(420,33,"A","vertex") + t(327,131,"B","vertex") + t(540,138,"E","vertex") + t(126,397,"C","vertex") + t(806,397,"D","vertex");
    body += `<path d="M 399 79 A 32 32 0 0 0 447 79 M 165 352 A 27 27 0 0 1 180 370 M 368 115 A 27 27 0 0 1 383 134" class="angle-mark"/>`;
    const equalAngle=(x,y)=>{
      const ux=-360/Math.hypot(360,315), uy=-315/Math.hypot(360,315);
      const arc=r=>`M ${x-r} ${y} A ${r} ${r} 0 0 1 ${x+ux*r} ${y+uy*r}`;
      return `<path d="M ${x} ${y} L ${x-40} ${y} A 40 40 0 0 1 ${x+ux*40} ${y+uy*40} Z" class="equal-angle-fill"/><path d="${arc(40)} ${arc(30)}" class="equal-angle-arc"/>`;
    };
    body += `<g data-diagram-step="2" hidden aria-hidden="true" aria-label="Equal corresponding angles AEB and ADC, marked yellow with matching double arcs.">${equalAngle(510,133.75)}${equalAngle(780,370)}</g>`;
    return svg("Nested triangles ACD and ABE. Matching arrow marks show BE is parallel to CD. The given condition is written outside the diagram.",body);
  }

  function sightline() {
    // Vertical dimensions use height; horizontal dimensions use ground distance.
    // Eye-to-building distance is 600 drawing units; eye-to-tree is 100.
    const dimV=(x,y1,y2)=>line(x,y1,x,y2,"measurement")+`<path d="M ${x-5} ${y1+9} L ${x} ${y1} L ${x+5} ${y1+9} M ${x-5} ${y2-9} L ${x} ${y2} L ${x+5} ${y2-9}" class="measurement"/>`;
    const dimH=(x1,x2,y)=>line(x1,y,x2,y,"measurement")+`<path d="M ${x1+9} ${y-5} L ${x1} ${y} L ${x1+9} ${y+5} M ${x2-9} ${y-5} L ${x2} ${y} L ${x2-9} ${y+5}" class="measurement"/>`;
    let body = `<rect x="100" y="72" width="80" height="312" class="building"/>`;
    for (let x=116;x<172;x+=24) for(let y=94;y<360;y+=38) body+=`<rect x="${x}" y="${y}" width="10" height="16" class="window"/>`;
    body += line(80,384,820,384,"ground") + line(180,72,780,360,"edge-a") + line(180,360,780,360,"dashed");
    body += `<path d="M 680 384 V 339 M 654 359 L 680 312 L 706 359 Z M 659 344 L 680 312 L 701 344 Z" class="tree"/>`;
    body += `<circle cx="780" cy="360" r="6" class="person"/><path d="M 780 366 v 9 m 0 -6 l -7 3 m 7 -3 l 7 3 m -7 3 l -6 9 m 6 -9 l 6 9" class="person-line"/>`;
    body += line(68,72,96,72,"extension-line")+line(68,384,96,384,"extension-line")+dimV(68,72,384)+t(37,244,"h","unknown");
    body += line(605,312,670,312,"extension-line")+line(605,384,650,384,"extension-line")+dimV(605,312,384)+t(585,340,"4.5 m","measurement-label","end");
    body += line(792,360,846,360,"extension-line")+line(792,384,846,384,"extension-line")+dimV(840,360,384)+t(858,382,"1.5 m","measurement-label","start");
    body += line(680,393,680,450,"extension-line")+line(780,393,780,520,"extension-line")+dimH(680,780,440)+t(730,427,"5 m","measurement-label");
    body += line(180,393,180,520,"extension-line")+dimH(180,780,510)+t(480,497,"30 m","measurement-label");
    const trace=d=>`<path d="${d}" class="step-highlight-halo"/><path d="${d}" class="step-highlight-line"/>`;
    const highlight=(step,label,paths)=>`<g data-highlight-steps="${step}" hidden aria-hidden="true" aria-label="${esc(label)}">${paths}</g>`;
    body += highlight(1,"The two right triangles share the viewing angle.",trace("M 180 72 V 360 H 780 Z M 680 312 V 360 H 780 Z")+right(180,360)+right(680,360)+`<path d="M 730 360 A 50 50 0 0 1 734.92 338.36" class="angle-mark"/>`);
    body += highlight(2,"Subtract eye height 1.5 m from tree height 4.5 m to get the small triangle height 3 m.",trace("M 605 312 V 384 M 840 360 V 384 M 680 312 V 360")+dimV(605,312,384)+dimV(840,360,384)+dimV(680,312,360));
    body += highlight(3,"Compare the horizontal distances 30 m and 5 m.",trace("M 680 440 H 780 M 180 510 H 780")+dimH(680,780,440)+dimH(180,780,510));
    body += highlight(4,"Scale the small height above eye level to find the building height above eye level.",trace("M 180 72 V 360 M 680 312 V 360")+dimV(180,72,360)+dimV(680,312,360));
    body += highlight(5,"Add the eye height to find the full building height.",trace("M 68 72 V 384 M 840 360 V 384 M 180 360 V 384")+dimV(68,72,384)+dimV(840,360,384));
    return svg("Vertical dimension lines mark tree height 4.5 m, eye height 1.5 m, and building height h. Horizontal dimension lines below the ground mark 5 m from viewer to tree and 30 m from viewer to building. The red line of sight meets both tops.",body,"0 0 960 550");
  }

  function cover() {
    return svg("A small square and a larger similar square. Corresponding sides have the same scale factor.", `<rect x="60" y="180" width="120" height="120" class="object-shape"/><rect x="390" y="120" width="180" height="180" class="image-shape"/>` + arrow(230,240,330,"× k") + right(60,300) + right(390,300), "0 70 650 300");
  }

  window.GEOMETRY = { trianglePair, squares, nested, sightline, cover };
  const heading = s => `<header class="scene-heading"><p class="eyebrow">${esc(s.eyebrow)}</p><h2>${esc(s.title)}</h2></header>`;
  const item = (s,i) => `<li class="evidence-step" data-evidence-step hidden><span>${String(i+1).padStart(2,"0")}</span><div><strong>${esc(s.label)}</strong>${s.body?`<p>${esc(s.body)}</p>`:""}${s.pairs?`<table class="side-pairs" aria-label="Corresponding sides and their lengths"><thead><tr><th scope="col">Object</th><th scope="col"><span class="sr-only">corresponds to</span></th><th scope="col">Image</th></tr></thead><tbody>${s.pairs.map(p=>`<tr class="pair-${esc(p.tone)}"><td>${esc(p.object)}</td><td aria-hidden="true">→</td><td>${esc(p.image)}</td></tr>`).join("")}</tbody></table>`:""}${s.emphasis?`<p class="step-result">${esc(s.emphasis)}</p>`:""}</div></li>`;
  const work = s => `<div class="evidence-panel"${s.focusSteps?' data-reveal-style="focus"':''}><p class="diagram-prompt">${esc(s.prompt)}</p>${s.formula || ""}<ol class="evidence-list${s.focusSteps?' focus-step-list':''}" aria-live="polite">${(s.steps||[]).map(item).join("")}</ol><div class="evidence-actions"><button class="primary-button" type="button" data-geometry="reveal" aria-expanded="false">${esc(s.revealLabel||"Reveal reasoning")}</button>${s.focusSteps?'<button class="text-button" type="button" data-geometry="previous" disabled>Previous step</button>':''}<button class="text-button" type="button" data-geometry="reset">Reset</button><span class="reveal-count">0 / ${(s.steps||[]).length}</span></div></div>`;
  const diagram = s => `<div class="scene-inner geometry-layout">${heading(s)}<div class="geometry-stage"><figure class="math-figure">${s.visual}<figcaption>${esc(s.caption||"Match corresponding parts before calculating.")}</figcaption></figure>${work(s)}</div>${s.takeaway?`<p class="takeaway"><span>REMEMBER</span><strong>${esc(s.takeaway)}</strong></p>`:""}</div>`;

  const scaleModes = {
    up: { label: "Scale up", rule: "k > 1", objectSide: 4, min: 1.25, max: 3, initial: 2, presets: [1.5, 2, 3] },
    down: { label: "Scale down", rule: "0 < k < 1", objectSide: 8, min: 0.25, max: 0.75, initial: 0.5, presets: [0.25, 0.5, 0.75] }
  };

  function lab(s) {
    const panels = Object.entries(scaleModes).map(([mode, config]) => {
      const base = config.objectSide * 25;
      const imageSize = base * config.initial;
      const body = `<rect x="${180-base/2}" y="${340-base}" width="${base}" height="${base}" class="object-shape"/>${t(180,305-base,"OBJECT","shape-tag")}${t(180,380,config.objectSide)}${t(152-base/2,348-base/2,config.objectSide)}<rect x="${640-imageSize/2}" y="${340-imageSize}" width="${imageSize}" height="${imageSize}" class="image-shape" data-lab-rect/>${t(640,28,"IMAGE","shape-tag")}<text x="640" y="380" text-anchor="middle" data-lab-width>${config.objectSide*config.initial}</text><text x="${600-imageSize/2}" y="${348-imageSize/2}" text-anchor="middle" data-lab-height>${config.objectSide*config.initial}</text><g data-lab-forward>${arrow(300,260,445,`× ${config.initial}`)}</g>`;
      return `<section class="lab-stage" id="scale-${mode}-panel" data-scale-panel="${mode}" role="tabpanel" aria-labelledby="scale-${mode}-tab"${mode==="down"?' hidden aria-hidden="true" inert':' aria-hidden="false"'}><div class="scale-visual">${svg(`${config.label} model: an object square and its image.`,body,"0 0 850 420")}</div><div class="lab-controls"><span class="eyebrow">${config.label} · ${esc(config.rule)}</span><output id="scale-${mode}-output" for="scale-${mode}-factor">k = ${config.initial}</output><label class="sr-only" for="scale-${mode}-factor">Change the scale factor</label><input id="scale-${mode}-factor" data-scale-slider type="range" min="${config.min}" max="${config.max}" step="0.25" value="${config.initial}" aria-label="${config.label} factor"><div class="preset-row">${config.presets.map(k=>`<button type="button" data-scale="${k}" aria-pressed="${k===config.initial}">k = ${k}</button>`).join("")}<button class="scale-reset" type="button" data-scale-reset aria-label="Reset ${config.label.toLowerCase()}" title="Reset ${config.label.toLowerCase()}">↺</button></div><dl class="lab-measures"><div><dt>Side length</dt><dd data-lab-equation>${config.objectSide} × ${config.initial} = ${config.objectSide*config.initial}</dd></div></dl></div></section>`;
    }).join("");
    return `<div class="scene-inner lab-layout">${heading(s)}<p class="slide-instruction">${esc(s.prompt)}</p><div class="scale-modes" role="tablist" aria-label="Choose a scaling function">${Object.entries(scaleModes).map(([mode,config])=>`<button id="scale-${mode}-tab" type="button" role="tab" data-scale-mode="${mode}" aria-controls="scale-${mode}-panel" aria-selected="${mode==="up"}" tabindex="${mode==="up"?0:-1}">${config.label}</button>`).join("")}</div>${panels}<p class="takeaway"><span>NOTICE</span><strong>Every side uses the same scale factor. Angles stay equal.</strong></p></div>`;
  }

  function reference(s) {
    return `<div class="scene-inner reference-layout">${heading(s)}<p class="slide-instruction">${esc(s.prompt)}</p><div class="test-table" role="table" aria-label="Four triangle similarity tests"><div class="test-row test-table-head" role="row"><span role="columnheader">Test</span><span role="columnheader">Evidence you need</span><span role="columnheader">Check carefully</span></div>${s.rows.map(r=>`<div class="test-row" role="row"><strong role="cell">${esc(r[0])}</strong><span role="cell">${esc(r[1])}</span><span role="cell">${esc(r[2])}</span></div>`).join("")}</div><p class="takeaway"><span>WRITE</span><strong>Match → compare → name the test → write ∼ in matching order.</strong></p></div>`;
  }

  window.LESSON_RENDERERS = { geometry: diagram, scaleLab: lab, reference };

  function updateScale(value, panel) {
    const config = scaleModes[panel.dataset.scalePanel];
    const proposed = Number(value);
    const k = Math.max(config.min, Math.min(config.max, Number.isFinite(proposed) ? Math.round(proposed*4)/4 : config.initial));
    const size = config.objectSide * 25 * k;
    const rect = panel.querySelector("[data-lab-rect]");
    Object.entries({x:640-size/2,y:340-size,width:size,height:size}).forEach(([a,v])=>rect.setAttribute(a,v));
    const length = config.objectSide * k;
    const width = panel.querySelector("[data-lab-width]"), height = panel.querySelector("[data-lab-height]");
    width.textContent=String(length);
    height.setAttribute("x",600-size/2);height.setAttribute("y",348-size/2);height.textContent=String(length);
    panel.querySelector("input").value=k;
    panel.querySelector("output").textContent=`k = ${k}`;
    panel.querySelector("input").setAttribute("aria-valuetext",`${config.label}, scale factor ${k}, side length ${length}`);
    panel.querySelector("[data-lab-equation]").textContent=`${config.objectSide} × ${k} = ${length}`;
    panel.querySelector("[data-lab-forward] text").textContent=`× ${k}`;
    panel.querySelector("svg").setAttribute("aria-label",`${config.label}: object side ${config.objectSide}, image side ${length}, scale factor ${k}. All angles stay 90 degrees.`);
    panel.querySelectorAll("[data-scale]").forEach(b=>b.setAttribute("aria-pressed",String(Number(b.dataset.scale)===k)));
  }

  function setScaleMode(mode, focus = false) {
    if (!scaleModes[mode]) return;
    const scene = document.querySelector(".scene-scaleLab");
    scene.dataset.scaleMode = mode;
    scene.querySelectorAll("[data-scale-mode]").forEach(button=>{
      const active=button.dataset.scaleMode===mode;
      button.setAttribute("aria-selected",String(active));button.tabIndex=active?0:-1;
      if(active&&focus)button.focus();
    });
    scene.querySelectorAll("[data-scale-panel]").forEach(panel=>{
      const active=panel.dataset.scalePanel===mode;
      panel.hidden=!active;panel.inert=!active;panel.setAttribute("aria-hidden",String(!active));
    });
  }

  document.addEventListener("input",e=>{
    if(e.target.matches("[data-scale-slider]"))updateScale(e.target.value,e.target.closest("[data-scale-panel]"));
  });

  document.addEventListener("click", e => {
    const scaleButton=e.target.closest("[data-scale]");
    if(scaleButton)updateScale(scaleButton.dataset.scale,scaleButton.closest("[data-scale-panel]"));
    const modeButton=e.target.closest("[data-scale-mode]");
    if(modeButton)setScaleMode(modeButton.dataset.scaleMode);
    const resetButton=e.target.closest("[data-scale-reset]");
    if(resetButton){const panel=resetButton.closest("[data-scale-panel]");updateScale(scaleModes[panel.dataset.scalePanel].initial,panel);}
    const button=e.target.closest("[data-geometry]");
    if(!button)return;
    const scene=button.closest(".scene"),steps=[...scene.querySelectorAll("[data-evidence-step]")],reveal=scene.querySelector('[data-geometry="reveal"]');
    let count=Number(scene.dataset.revealed||0);
    count=button.dataset.geometry==="reset"?0:button.dataset.geometry==="previous"?Math.max(1,count-1):Math.min(count+1,steps.length);
    scene.dataset.revealed=String(count);
    const focused=Boolean(scene.querySelector('[data-reveal-style="focus"]'));
    steps.forEach((step,i)=>step.hidden=focused?i!==count-1:i>=count);
    scene.querySelectorAll("[data-diagram-step]").forEach(element=>{
      const show=Number(element.dataset.diagramStep)<=count;
      element.toggleAttribute("hidden",!show);
      element.setAttribute("aria-hidden",String(!show));
    });
    scene.querySelectorAll("[data-highlight-steps]").forEach(element=>{
      const show=element.dataset.highlightSteps.split(" ").map(Number).includes(count);
      element.toggleAttribute("hidden",!show);element.setAttribute("aria-hidden",String(!show));
    });
    const previous=scene.querySelector('[data-geometry="previous"]');
    if(previous)previous.disabled=count<=1;
    reveal.disabled=count===steps.length;
    reveal.textContent=count===steps.length?"Reasoning complete":count===0?"Reveal reasoning":"Reveal next step";
    reveal.setAttribute("aria-expanded",String(count>0));
    scene.querySelector(".reveal-count").textContent=`${count} / ${steps.length}`;
  });

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-scale-panel]").forEach(panel=>updateScale(scaleModes[panel.dataset.scalePanel].initial,panel));
    setScaleMode("up");
    document.querySelector(".scale-modes").addEventListener("keydown",e=>{
      if(!["ArrowLeft","ArrowRight","Home","End"].includes(e.key))return;
      e.preventDefault();e.stopPropagation();
      const current=document.querySelector(".scene-scaleLab").dataset.scaleMode;
      const next=e.key==="Home"?"up":e.key==="End"?"down":current==="up"?"down":"up";
      setScaleMode(next,true);
    });
    const panel=document.querySelector("#contentsPanel"),button=document.querySelector("#contentsButton"),list=document.querySelector("#slideList");
    window.LESSON.slides.forEach((s,i)=>{
      const a=document.createElement("a");a.href=`#slide-${i+1}`;a.innerHTML=`<span>${String(i+1).padStart(2,"0")}</span><strong>${esc(s.title)}</strong>`;list.append(a);
    });
    const setOpen=open=>{panel.hidden=!open;button.setAttribute("aria-expanded",String(open));if(open){document.querySelector("#notesButton").getAttribute("aria-expanded")==="true"&&document.querySelector("#notesButton").click();panel.querySelector('[aria-current="page"]')?.scrollIntoView({block:"nearest"});} };
    button.addEventListener("click",()=>setOpen(panel.hidden));
    document.querySelector("#closeContents").addEventListener("click",()=>{setOpen(false);button.focus();});
    list.addEventListener("click",e=>{if(e.target.closest("a"))setOpen(false);});
    document.querySelector("#notesButton").addEventListener("click",()=>setOpen(false));
    document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!panel.hidden){setOpen(false);button.focus();}});
    document.addEventListener("click",e=>{if(!panel.hidden&&!panel.contains(e.target)&&!button.contains(e.target))setOpen(false);});
    function syncContents(){const m=location.hash.match(/slide-(\d+)/);const current=m?Number(m[1])-1:0;[...list.children].forEach((a,i)=>{if(i===current)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current");});}
    document.addEventListener("lesson:slide",syncContents);syncContents();
    // Print an answer key without changing the teacher's live reveal state.
    window.addEventListener("beforeprint",()=>{document.querySelectorAll(".scene").forEach(s=>s.inert=false);document.querySelectorAll(".choice-button").forEach(b=>{const s=b.closest(".scene"),i=[...document.querySelectorAll(".scene")].indexOf(s);b.dataset.printCorrect=String(Number(b.dataset.option)===window.LESSON.slides[i].correct);});});
    window.addEventListener("afterprint",()=>{document.querySelectorAll(".scene").forEach(s=>s.inert=!s.classList.contains("is-active"));});
  });
}());
