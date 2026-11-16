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
    return svg("Vertical dimension lines mark tree height 4.5 m, eye height 1.5 m, and building height h. Horizontal dimension lines below the ground mark 5 m from viewer to tree and 30 m from viewer to building. The red line of sight meets both tops.",body,"0 0 960 550");
  }

  function cover() {
    return svg("A small square and a larger similar square. Corresponding sides have the same scale factor.", `<rect x="60" y="180" width="120" height="120" class="object-shape"/><rect x="390" y="120" width="180" height="180" class="image-shape"/>` + arrow(230,240,330,"× k") + right(60,300) + right(390,300), "0 70 650 300");
  }

  window.GEOMETRY = { trianglePair, squares, nested, sightline, cover };
  const heading = s => `<header class="scene-heading"><p class="eyebrow">${esc(s.eyebrow)}</p><h2>${esc(s.title)}</h2></header>`;
  const item = (s,i) => `<li class="evidence-step" data-evidence-step hidden><span>${String(i+1).padStart(2,"0")}</span><div><strong>${esc(s.label)}</strong>${s.body?`<p>${esc(s.body)}</p>`:""}${s.pairs?`<table class="side-pairs" aria-label="Corresponding sides and their lengths"><thead><tr><th scope="col">Object</th><th scope="col"><span class="sr-only">corresponds to</span></th><th scope="col">Image</th></tr></thead><tbody>${s.pairs.map(p=>`<tr class="pair-${esc(p.tone)}"><td>${esc(p.object)}</td><td aria-hidden="true">→</td><td>${esc(p.image)}</td></tr>`).join("")}</tbody></table>`:""}${s.emphasis?`<p class="step-result">${esc(s.emphasis)}</p>`:""}</div></li>`;
  const work = s => `<div class="evidence-panel"><p class="diagram-prompt">${esc(s.prompt)}</p>${s.formula || ""}<ol class="evidence-list" aria-live="polite">${(s.steps||[]).map(item).join("")}</ol><div class="evidence-actions"><button class="primary-button" type="button" data-geometry="reveal" aria-expanded="false">${esc(s.revealLabel||"Reveal reasoning")}</button><button class="text-button" type="button" data-geometry="reset">Reset</button><span class="reveal-count">0 / ${(s.steps||[]).length}</span></div></div>`;
  const diagram = s => `<div class="scene-inner geometry-layout">${heading(s)}<div class="geometry-stage"><figure class="math-figure">${s.visual}<figcaption>${esc(s.caption||"Match corresponding parts before calculating.")}</figcaption></figure>${work(s)}</div>${s.takeaway?`<p class="takeaway"><span>REMEMBER</span><strong>${esc(s.takeaway)}</strong></p>`:""}</div>`;

  function lab(s) {
    return `<div class="scene-inner lab-layout">${heading(s)}<p class="slide-instruction">${esc(s.prompt)}</p><div class="lab-stage"><div class="scale-visual">${svg("Interactive scale model. An original 4 by 4 square and its square image.", `<rect x="90" y="240" width="100" height="100" class="object-shape"/>${t(140,205,"OBJECT","shape-tag")}${t(140,380,"4")}${t(58,302,"4")}<rect x="590" y="240" width="100" height="100" class="image-shape" data-lab-rect/>${t(640,28,"IMAGE","shape-tag")}<text x="640" y="380" text-anchor="middle" data-lab-width>4</text><text x="563" y="302" text-anchor="middle" data-lab-height>4</text><g data-lab-forward>${arrow(240,250,405,"× 1")}</g><g data-lab-return><path d="M 405 325 H 240 l 12 -8 M 240 325 l 12 8" class="direction-line"/>${t(322.5,360,"× 1","arrow-label")}</g>`,"0 0 850 420")}</div><div class="lab-controls"><span class="eyebrow">Scale factor</span><output id="scaleOutput" for="scaleSlider">k = 1</output><label for="scaleSlider">Drag to resize every side</label><input id="scaleSlider" type="range" min="0.25" max="3" step="0.25" value="1" aria-valuetext="Scale factor 1, same size"><div class="preset-row"><button type="button" data-scale="0.5">k = ½</button><button type="button" data-scale="1">k = 1</button><button type="button" data-scale="2">k = 2</button></div><p class="scale-state" data-lab-state>Same size · congruent</p><dl class="lab-measures"><div><dt>Each side</dt><dd data-lab-equation>4 × 1 = 4</dd></div><div><dt>Image → object</dt><dd data-lab-reverse>4 × 1 = 4</dd></div><div><dt>Angles</dt><dd>Always 90°</dd></div></dl><button class="text-button" type="button" data-scale="1">Reset to original size</button></div></div><p class="takeaway"><span>NOTICE</span><strong>Reverse direction: use 1/k.</strong></p></div>`;
  }

  function reference(s) {
    return `<div class="scene-inner reference-layout">${heading(s)}<p class="slide-instruction">${esc(s.prompt)}</p><div class="test-table" role="table" aria-label="Four triangle similarity tests"><div class="test-row test-table-head" role="row"><span role="columnheader">Test</span><span role="columnheader">Evidence you need</span><span role="columnheader">Check carefully</span></div>${s.rows.map(r=>`<div class="test-row" role="row"><strong role="cell">${esc(r[0])}</strong><span role="cell">${esc(r[1])}</span><span role="cell">${esc(r[2])}</span></div>`).join("")}</div><p class="takeaway"><span>WRITE</span><strong>Match → compare → name the test → write ∼ in matching order.</strong></p></div>`;
  }

  window.LESSON_RENDERERS = { geometry: diagram, scaleLab: lab, reference };

  function updateScale(value) {
    const k=Number(value), stage=document.querySelector(".scene-scaleLab"), rect=stage.querySelector("[data-lab-rect]");
    const w=100*k,h=100*k,x=640-w/2,y=340-h;
    Object.entries({x,y,width:w,height:h}).forEach(([a,v])=>rect.setAttribute(a,v));
    const fmt = n => Number(n.toFixed(3)).toString();
    const width=stage.querySelector("[data-lab-width]"),height=stage.querySelector("[data-lab-height]");
    width.setAttribute("x",640); width.setAttribute("y",380); width.textContent=fmt(4*k);
    height.setAttribute("x",x-27);height.setAttribute("y",y+h/2+8);height.textContent=fmt(4*k);
    stage.querySelector("#scaleSlider").value=k;
    stage.querySelector("#scaleOutput").textContent=`k = ${fmt(k)}`;
    const state=k<1?"Reduction · 0 < k < 1":k>1?"Enlargement · k > 1":"Same size · congruent";
    stage.querySelector("[data-lab-state]").textContent=state;
    stage.querySelector("#scaleSlider").setAttribute("aria-valuetext",`Scale factor ${fmt(k)}, ${state}`);
    stage.querySelector("[data-lab-equation]").textContent=`4 × ${fmt(k)} = ${fmt(4*k)}`;
    const numerator=4,denominator=Math.round(k*4);
    const gcd=(a,b)=>b?gcd(b,a%b):a;
    const divisor=gcd(numerator,denominator);
    const reverse=denominator/divisor===1?String(numerator/divisor):`${numerator/divisor}/${denominator/divisor}`;
    stage.querySelector("[data-lab-forward] text").textContent=`× ${fmt(k)}`;
    stage.querySelector("[data-lab-return] text").textContent=`× ${reverse}`;
    stage.querySelector("[data-lab-reverse]").textContent=`${fmt(4*k)} × ${reverse} = 4`;
    stage.querySelectorAll("[data-scale]").forEach(b=>b.setAttribute("aria-pressed",String(Number(b.dataset.scale)===k)));
  }

  document.addEventListener("input",e=>{if(e.target.id==="scaleSlider")updateScale(e.target.value);});
  document.addEventListener("click", e => {
    const scaleButton=e.target.closest("[data-scale]");
    if(scaleButton)updateScale(scaleButton.dataset.scale);
    const button=e.target.closest("[data-geometry]");
    if(!button)return;
    const scene=button.closest(".scene"),steps=[...scene.querySelectorAll("[data-evidence-step]")],reveal=scene.querySelector('[data-geometry="reveal"]');
    let count=Number(scene.dataset.revealed||0);
    count=button.dataset.geometry==="reset"?0:Math.min(count+1,steps.length);
    scene.dataset.revealed=String(count);
    steps.forEach((step,i)=>step.hidden=i>=count);
    scene.querySelectorAll("[data-diagram-step]").forEach(element=>{
      const show=Number(element.dataset.diagramStep)<=count;
      element.toggleAttribute("hidden",!show);
      element.setAttribute("aria-hidden",String(!show));
    });
    reveal.disabled=count===steps.length;
    reveal.textContent=count===steps.length?"Reasoning complete":count===0?"Reveal reasoning":"Reveal next step";
    reveal.setAttribute("aria-expanded",String(count>0));
    scene.querySelector(".reveal-count").textContent=`${count} / ${steps.length}`;
  });

  document.addEventListener("DOMContentLoaded", () => {
    updateScale(1);
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
