(() => {
  const labels = {
    en: {
      title: 'A little break.', eyebrow: 'Javier / Arcade', intro: 'Two small games. No downloads, no accounts, no fuss.',
      xo: 'Tic Tac Toe', drive: 'Pocket Drive', xoInfo: 'First to get three in a row wins.',
      solo: 'Vs computer', duo: 'Two players', turnX: 'X to play', turnO: 'O to play',
      youWin: 'You win.', cpuWins: 'Computer wins.', xWins: 'X wins.', oWins: 'O wins.', draw: 'A draw.',
      newRound: 'New round', resetScore: 'Reset score', you: 'X wins', other: 'O wins', ties: 'Draws',
      controls: 'Controls', keys: 'Arrow keys or WASD', mobile: 'On your phone, use the arrows below.',
      driveDesc: 'A tiny endless road. Dodge traffic, stay on the road.', start: 'Start driving', resume: 'Resume', restart: 'Try again', pause: 'Pause', paused: 'Paused', ready: 'Ready when you are', crashed: 'Game over', score: 'Score', best: 'Best', driveHint: 'Keep moving to avoid incoming cars.', steer: 'Move car', none: 'A little break between projects.'
    },
    es: {
      title: 'Un pequeño descanso.', eyebrow: 'Javier / Arcade', intro: 'Dos juegos cortitos. Sin descargas, cuentas ni complicaciones.',
      xo: 'Tres en raya', drive: 'Pocket Drive', xoInfo: 'El primero en hacer tres en línea gana.',
      solo: 'Vs. computadora', duo: 'Dos personas', turnX: 'Turno de X', turnO: 'Turno de O',
      youWin: 'Ganaste.', cpuWins: 'Ganó la computadora.', xWins: 'Ganó X.', oWins: 'Ganó O.', draw: 'Empate.',
      newRound: 'Nueva partida', resetScore: 'Reiniciar marcador', you: 'Victorias X', other: 'Victorias O', ties: 'Empates',
      controls: 'Controles', keys: 'Flechas o WASD', mobile: 'En el celular, usa las flechas de abajo.',
      driveDesc: 'Una carretera infinita. Esquiva el tráfico y no salgas de la pista.', start: 'Empezar', resume: 'Continuar', restart: 'Intentar otra vez', pause: 'Pausar', paused: 'En pausa', ready: '¿Listo para manejar?', crashed: 'Fin del juego', score: 'Puntos', best: 'Récord', driveHint: 'Muévete para evitar los carros que vienen.', steer: 'Mover carrito', none: 'Un recreo entre proyectos.'
    }
  };
  const txt = () => labels[document.documentElement.lang === 'es' ? 'es' : 'en'];
  const state = { tab: 'ttt', xo: { board: Array(9).fill(''), turn: 'X', mode: 'cpu', result: '', scores: { X: 0, O: 0, D: 0 } } };
  const car = { active: false, paused: false, over: false, started: false, score: 0, best: 0, time: 0, last: 0, spawn: 0, raf: 0, enemies: [], keys: new Set(), player: { x: 144, y: 307, w: 31, h: 53 }, ctx: null, canvas: null };
  try { car.best = Math.max(0, Number(localStorage.getItem('jd-arcade-best')) || 0) } catch {}
  const $ = (q, root = document) => root.querySelector(q);
  const win = () => $('.app-window[data-app="arcade"]');
  const visible = () => !!win() && !win().classList.contains('is-minimized');
  const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  let cpuTask = 0;
  const resultFor = (board) => {
    for (const seq of lines) if (board[seq[0]] && seq.every(i => board[i] === board[seq[0]])) return { winner: board[seq[0]], line: seq };
    return board.every(Boolean) ? { winner: 'D', line: [] } : null;
  };
  function idealMove(board, player = 'O') {
    const options = board.map((v,i) => v ? -1 : i).filter(i => i >= 0);
    const opponent = player === 'O' ? 'X' : 'O';
    for (const i of options) { const next = board.slice(); next[i] = player; if (resultFor(next)?.winner === player) return i; }
    for (const i of options) { const next = board.slice(); next[i] = opponent; if (resultFor(next)?.winner === opponent) return i; }
    if (board[4] === '') return 4;
    const corners = [0,2,6,8].filter(i => !board[i]);
    return (corners.length ? corners : options)[Math.floor(Math.random() * (corners.length ? corners.length : options.length))];
  }
  function gameStatus() {
    const g = state.xo;
    if (g.result === 'D') return txt().draw;
    if (g.result === 'X') return g.mode === 'cpu' ? txt().youWin : txt().xWins;
    if (g.result === 'O') return g.mode === 'cpu' ? txt().cpuWins : txt().oWins;
    return g.turn === 'X' ? txt().turnX : txt().turnO;
  }
  function xoMarkup() {
    const l = txt(), g = state.xo, victory = resultFor(g.board)?.line || [];
    return `<div class="arcade-game arcade-tictac">
      <div class="arcade-game-head"><div><h3>${l.xo}</h3><p>${l.xoInfo}</p></div><div class="arcade-mode" role="group" aria-label="Players"><button type="button" data-ttt-mode="cpu" aria-pressed="${g.mode==='cpu'}">${l.solo}</button><button type="button" data-ttt-mode="duo" aria-pressed="${g.mode==='duo'}">${l.duo}</button></div></div>
      <div class="xo-layout"><div class="xo-board-wrap"><div class="xo-board" role="grid" aria-label="${l.xo}">${g.board.map((value,i) => `<button type="button" role="gridcell" class="xo-cell ${value==='X'?'is-x':value==='O'?'is-o':''} ${victory.includes(i)?'won':''}" data-cell="${i}" aria-label="${l.xo}, ${i+1}: ${value||'empty'}" ${value||g.result||g.turn==='O'&&g.mode==='cpu'?'disabled':''}>${value||''}</button>`).join('')}</div></div>
      <div class="xo-side"><div class="xo-status" role="status" aria-live="polite"><span class="xo-status-dot"></span>${gameStatus()}</div><div class="xo-score"><div><span>${l.you}</span><strong>${g.scores.X.toString().padStart(2,'0')}</strong></div><div><span>${l.ties}</span><strong>${g.scores.D.toString().padStart(2,'0')}</strong></div><div><span>${l.other}</span><strong>${g.scores.O.toString().padStart(2,'0')}</strong></div></div><button class="arcade-button" data-ttt-new type="button">${l.newRound} <span>↗</span></button><button class="arcade-text-button" data-ttt-clear type="button">${l.resetScore}</button></div></div>
    </div>`;
  }
  function carMarkup() {
    const l = txt();
    return `<div class="arcade-game arcade-drive"><div class="arcade-game-head"><div><h3>${l.drive}</h3><p>${l.driveDesc}</p></div><div class="drive-indicator"><span></span>ARCADE 02</div></div>
      <div class="drive-layout"><div class="drive-machine"><div class="drive-screen"><canvas id="drive-canvas" width="320" height="380" role="img" aria-label="${l.driveDesc}"></canvas><div class="drive-overlay" id="drive-overlay"><strong id="drive-overlay-title">${l.ready}</strong><button class="arcade-button" type="button" data-drive-play>${l.start} <span>→</span></button></div></div><div class="drive-controls" aria-label="${l.steer}"><button data-drive-dir="ArrowLeft" type="button" aria-label="Left">←</button><button data-drive-dir="ArrowUp" type="button" aria-label="Up">↑</button><button data-drive-dir="ArrowDown" type="button" aria-label="Down">↓</button><button data-drive-dir="ArrowRight" type="button" aria-label="Right">→</button></div></div>
      <div class="drive-side"><div class="drive-score-grid"><div><span>${l.score}</span><strong id="drive-score">${car.score.toString().padStart(4,'0')}</strong></div><div><span>${l.best}</span><strong id="drive-best">${car.best.toString().padStart(4,'0')}</strong></div></div><div class="drive-instructions"><span>${l.controls}</span><strong>${l.keys}</strong><p>${l.mobile}</p></div><p class="drive-hint">${l.driveHint}</p><button class="arcade-text-button" data-drive-pause type="button">${l.pause}</button></div></div>
      </div>`;
  }
  function render() {
    const l = txt();
    return `<div class="view arcade-view"><div class="view-topline"><span class="eyebrow">${l.eyebrow}</span><span class="small-pill">02 / GAMES</span></div><h2>${l.title}</h2><p class="lead">${l.intro}</p><div class="arcade-tabs" role="tablist" aria-label="Arcade games"><button role="tab" type="button" id="arcade-tab-ttt" data-arcade-tab="ttt" aria-selected="${state.tab==='ttt'}">01 <span>${l.xo}</span></button><button role="tab" type="button" id="arcade-tab-drive" data-arcade-tab="drive" aria-selected="${state.tab==='drive'}">02 <span>${l.drive}</span></button></div><section id="arcade-stage" class="arcade-stage" role="tabpanel" aria-labelledby="arcade-tab-${state.tab}">${state.tab==='ttt'?xoMarkup():carMarkup()}</section><div class="arcade-footer">JAVIER.DAMIANI / EXPERIMENTS — 2026</div></div>`;
  }
  function redrawXo() {
    if (state.tab !== 'ttt' || !visible()) return;
    const stage = $('#arcade-stage', win());
    if (stage) stage.innerHTML = xoMarkup();
  }
  function takeCell(i) {
    const g = state.xo;
    if (g.board[i] || g.result || g.mode === 'cpu' && g.turn === 'O') return;
    g.board[i] = g.turn;
    const result = resultFor(g.board);
    if (result) { g.result = result.winner; g.scores[g.result]++; }
    else g.turn = g.turn === 'X' ? 'O' : 'X';
    redrawXo();
    if (!g.result && g.mode === 'cpu' && g.turn === 'O') scheduleComputer();
  }
  function scheduleComputer() {
    clearTimeout(cpuTask);
    cpuTask = setTimeout(() => {
      const g = state.xo;
      if (g.mode !== 'cpu' || g.turn !== 'O' || g.result || !visible()) return;
      const move = idealMove(g.board);
      if (move === undefined) return;
      g.board[move] = 'O';
      const result = resultFor(g.board);
      if (result) { g.result = result.winner; g.scores[g.result]++; } else g.turn = 'X';
      redrawXo();
    }, 320);
  }
  function newRound() {
    clearTimeout(cpuTask);
    state.xo.board = Array(9).fill('');
    state.xo.turn = 'X';
    state.xo.result = '';
    redrawXo();
  }
  function changeTab(tab) {
    if (tab === state.tab) return;
    if (state.tab === 'drive') pauseCar();
    clearTimeout(cpuTask);
    state.tab = tab;
    const stage = $('#arcade-stage', win());
    if (!stage) return;
    stage.setAttribute('aria-labelledby', `arcade-tab-${tab}`);
    stage.innerHTML = tab === 'ttt' ? xoMarkup() : carMarkup();
    $('[data-arcade-tab="ttt"]', win())?.setAttribute('aria-selected', String(tab==='ttt'));
    $('[data-arcade-tab="drive"]', win())?.setAttribute('aria-selected', String(tab==='drive'));
    if (tab === 'drive') mountCar();
    if (tab === 'ttt' && state.xo.mode === 'cpu' && state.xo.turn === 'O' && !state.xo.result) scheduleComputer();
  }
  function resetCar() {
    cancelAnimationFrame(car.raf);
    car.active = false;
    car.over = false;
    car.paused = false;
    car.started = false;
    car.score = 0;
    car.time = 0;
    car.last = 0;
    car.spawn = 0;
    car.enemies = [];
    car.keys.clear();
    car.player.x = 144;
    car.player.y = 307;
  }
  function mountCar() {
    const canvas = $('#drive-canvas', win());
    if (!canvas) return;
    car.canvas = canvas;
    car.ctx = canvas.getContext('2d');
    drawCar();
    updateCarDisplay();
    showCarOverlay();
  }
  function updateCarDisplay() {
    const root = win();
    if (!root) return;
    const score = $('#drive-score', root), best = $('#drive-best', root);
    if (score) score.textContent = String(car.score).padStart(4, '0');
    if (best) best.textContent = String(car.best).padStart(4, '0');
  }
  function showCarOverlay() {
    const el = $('#drive-overlay', win());
    if (!el) return;
    el.hidden = car.active;
    const title = $('#drive-overlay-title', el), btn = $('[data-drive-play]', el), pauseBtn = $('[data-drive-pause]', win());
    if (title) title.textContent = car.over ? txt().crashed : car.paused ? txt().paused : txt().ready;
    if (btn) btn.innerHTML = `${car.over ? txt().restart : car.paused ? txt().resume : txt().start} <span>→</span>`;
    if (pauseBtn) { pauseBtn.disabled = !car.started || car.over; pauseBtn.textContent = car.active ? txt().pause : txt().resume; }
  }
  function startCar() {
    if (!visible() || state.tab !== 'drive') return;
    if (!car.started || car.over) resetCar();
    car.started = true;
    car.paused = false;
    car.active = true;
    car.last = performance.now();
    showCarOverlay();
    cancelAnimationFrame(car.raf);
    car.raf = requestAnimationFrame(tick);
  }
  function pauseCar() {
    cancelAnimationFrame(car.raf);
    car.active = false;
    car.keys.clear();
    if (car.started && !car.over) car.paused = true;
    showCarOverlay();
  }
  function finishCar() {
    car.over = true;
    pauseCar();
    if (car.score > car.best) {
      car.best = car.score;
      try { localStorage.setItem('jd-arcade-best', String(car.best)) } catch {}
    }
    drawCar();
    updateCarDisplay();
    showCarOverlay();
  }
  const inRange = (x, lo, hi) => Math.max(lo, Math.min(hi, x));
  function collide(a,b) { return a.x+5 < b.x+b.w-5 && a.x+a.w-5 > b.x+5 && a.y+7 < b.y+b.h-7 && a.y+a.h-7 > b.y+7; }
  function tick(now) {
    if (!car.active || !visible() || state.tab !== 'drive') { pauseCar(); return; }
    const dt = Math.min((now-car.last)/1000, 0.04);
    car.last = now;
    car.time += dt;
    const left = car.keys.has('ArrowLeft') || car.keys.has('a');
    const right = car.keys.has('ArrowRight') || car.keys.has('d');
    const up = car.keys.has('ArrowUp') || car.keys.has('w');
    const down = car.keys.has('ArrowDown') || car.keys.has('s');
    car.player.x = inRange(car.player.x + (Number(right)-Number(left))*215*dt, 44, 244);
    car.player.y = inRange(car.player.y + (Number(down)-Number(up))*190*dt, 28, 320);
    const speed = Math.min(255, 130 + car.time*3.3);
    car.spawn -= dt;
    if (car.spawn <= 0) {
      const lanes = [68,144,220];
      const choices = lanes.filter(x=>!car.enemies.some(e=>e.y<92 && Math.abs(e.x-x)<36));
      if(choices.length) car.enemies.push({x:choices[Math.floor(Math.random()*choices.length)],y:-64,w:31,h:53,color:Math.random()>.52?'#b6c9d1':'#d8bda8'});
      car.spawn = Math.max(0.46, 1.12 - car.time*.008) + Math.random()*.28;
    }
    car.enemies.forEach(e=>e.y+=speed*dt);
    car.enemies=car.enemies.filter(e=>e.y<410);
    car.score=Math.floor(car.time*10);
    if(car.enemies.some(e=>collide(car.player,e))){finishCar();return;}
    drawCar();
    updateCarDisplay();
    car.raf=requestAnimationFrame(tick);
  }
  function rounded(ctx,x,y,w,h,r,color) {
    ctx.fillStyle=color;
    ctx.beginPath();
    ctx.roundRect(x,y,w,h,r);
    ctx.fill();
  }
  function paintVehicle(ctx, p, player, color) {
    const {x,y,w,h}=p;
    rounded(ctx,x-4,y+9,5,13,1.7,'#171a1d');
    rounded(ctx,x+w-1,y+9,5,13,1.7,'#171a1d');
    rounded(ctx,x-4,y+h-22,5,13,1.7,'#171a1d');
    rounded(ctx,x+w-1,y+h-22,5,13,1.7,'#171a1d');
    rounded(ctx,x,y,w,h,5,color);
    rounded(ctx,x+5,y+8,w-10,13,2,player?'#2d4651':'#657782');
    rounded(ctx,x+6,y+h-17,w-12,11,2,player?'#436675':'#90a0a7');
    rounded(ctx,x+3,y+h-5,7,3,1,'#bf4d49');
    rounded(ctx,x+w-10,y+h-5,7,3,1,'#bf4d49');
    rounded(ctx,x+3,y+2,7,3,1,'#f6e8bb');
    rounded(ctx,x+w-10,y+2,7,3,1,'#f6e8bb');
  }
  function drawCar() {
    const ctx = car.ctx;
    if (!ctx || !car.canvas?.isConnected) return;
    ctx.clearRect(0,0,320,380);
    ctx.fillStyle='#e6e9e7';ctx.fillRect(0,0,320,380);
    ctx.fillStyle='#c8cec9';ctx.fillRect(32,0,256,380);
    ctx.fillStyle='#30363d';ctx.fillRect(39,0,242,380);
    ctx.fillStyle='#e9ddba';ctx.fillRect(43,0,3,380);ctx.fillRect(274,0,3,380);
    ctx.fillStyle='#9298a0';
    const offset = (car.time*128)%75;
    for (const x of [120,200]) for(let y=-85+offset;y<420;y+=75)ctx.fillRect(x,y,3,39);
    car.enemies.forEach(e=>paintVehicle(ctx,e,false,e.color));
    paintVehicle(ctx,car.player,true,'#f3f0e9');
    ctx.fillStyle='rgba(255,255,255,.62)';ctx.font='10px ui-monospace, Menlo, monospace';ctx.textAlign='left';ctx.fillText('JD / 02',13,20);
  }
  function enter() {
    if (!visible()) return;
    if(state.tab === 'drive') mountCar();
    if(state.tab === 'ttt' && state.xo.mode==='cpu' && state.xo.turn==='O' && !state.xo.result) scheduleComputer();
  }
  function leave() { pauseCar(); clearTimeout(cpuTask); }
  document.addEventListener('click', e => {
    const tab = e.target.closest('[data-arcade-tab]');
    if(tab){ changeTab(tab.dataset.arcadeTab);return; }
    const cell = e.target.closest('[data-cell]');
    if(cell){takeCell(Number(cell.dataset.cell));return;}
    const mode = e.target.closest('[data-ttt-mode]');
    if(mode){state.xo.mode=mode.dataset.tttMode;newRound();return;}
    if(e.target.closest('[data-ttt-new]')){newRound();return;}
    if(e.target.closest('[data-ttt-clear]')){state.xo.scores={X:0,O:0,D:0};newRound();return;}
    if(e.target.closest('[data-drive-play]')){startCar();return;}
    if(e.target.closest('[data-drive-pause]')){car.active?pauseCar():startCar();return;}
  });
  document.addEventListener('keydown',e=>{
    if(!visible() || state.tab!=='drive'||e.altKey||e.ctrlKey||e.metaKey || /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName||''))return;
    const key=e.key.length===1?e.key.toLowerCase():e.key;
    if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','w','a','s','d'].includes(key)){
      if(car.active){e.preventDefault();car.keys.add(key);}
    }
    if((key===' '||key==='Enter')&&document.activeElement?.tagName==='CANVAS'){e.preventDefault();car.active?pauseCar():startCar();}
  });
  document.addEventListener('keyup',e=>car.keys.delete(e.key.length===1?e.key.toLowerCase():e.key));
  document.addEventListener('pointerdown',e=>{
    const button=e.target.closest('[data-drive-dir]');
    if(!button||!car.active)return;
    e.preventDefault();
    car.keys.add(button.dataset.driveDir);
    button.setPointerCapture?.(e.pointerId);
  });
  const release=e=>{
    const btn=e.target.closest?.('[data-drive-dir]');
    if(btn)car.keys.delete(btn.dataset.driveDir);
  };
  document.addEventListener('pointerup',release);
  document.addEventListener('pointercancel',release);
  window.addEventListener('blur',()=>{car.keys.clear();pauseCar();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)pauseCar()});
  window.Arcade={render,enter,leave};
})();
