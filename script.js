// LOADER
window.addEventListener('load', () => {
  anime({targets:'.loader-petal span',rotate:'+=360',duration:1200,easing:'easeInOutSine',loop:2,complete:()=>{
    const loader = document.getElementById('loader');
    loader.style.opacity = '0';
    setTimeout(()=>{loader.remove();startHeroAnimations();},800);
  }});
});

// HERO ANIMATIONS
function startHeroAnimations(){
  const tl = anime.timeline({easing:'easeOutExpo'});
  tl.add({targets:'#bismillah',opacity:[0,1],translateY:[16,0],duration:1800})
    .add({targets:'#heroInvite',opacity:[0,1],translateY:[10,0],duration:1200},'-=1000')
    .add({targets:'#name1',opacity:[0,1],translateY:[20,0],duration:1400},'-=600')
    .add({targets:'#nameAnd',opacity:[0,1],scale:[0.8,1],duration:800},'-=800')
    .add({targets:'#name2',opacity:[0,1],translateY:[20,0],duration:1400},'-=900')
    .add({targets:'#heroDate',opacity:[0,1],translateY:[12,0],duration:1000},'-=600');
  initSlideshow();
}

// SLIDESHOW
function initSlideshow(){
  const slides = document.querySelectorAll('.slide-img');
  let current = 0;
  // First slide
  anime({targets:slides[0],opacity:1,scale:[1.08,1.03],duration:7000,easing:'linear'});
  function next(){
    const n = (current+1)%slides.length;
    const tl = anime.timeline({easing:'linear'});
    tl.add({targets:slides[current],opacity:[1,0],scale:[1.03,1.06],duration:1800})
      .add({targets:slides[n],opacity:[0,1],scale:[1.08,1.03],duration:6000,easing:'easeOutSine'},'-=1800');
    current = n;
    setTimeout(next,6500);
  }
  setTimeout(next,7000);
}

// SCROLL REVEAL
const io = new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');}});
},{threshold:0.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));


/* ── Slideshow JS ── (à placer avant </body>) */
(function () {
    const frames  = document.querySelectorAll('.slide-frame');
    const thumbs  = document.querySelectorAll('.thumb');
    const cur     = document.querySelector('.counter-cur');
    let   current = 0;
    let   timer;

    function goTo(n) {
        frames[current].classList.remove('active');
        frames[current].classList.add('exit');
        thumbs[current].classList.remove('active');

        setTimeout(() => frames[current === n ? current : current]
            .classList.remove('exit'), 900);

        current = (n + frames.length) % frames.length;

        frames[current].classList.add('active');
        thumbs[current].classList.add('active');
        if (cur) cur.textContent = current + 1;
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function startAuto() {
        timer = setInterval(next, 4000);
    }

    function resetAuto() {
        clearInterval(timer);
        startAuto();
    }

    document.querySelector('.slide-next')?.addEventListener('click', () => { next(); resetAuto(); });
    document.querySelector('.slide-prev')?.addEventListener('click', () => { prev(); resetAuto(); });

    thumbs.forEach((t) => {
        t.addEventListener('click', () => {
            goTo(parseInt(t.dataset.index));
            resetAuto();
        });
    });

    startAuto();
})();

// COUNTDOWN
function updateCountdown(){
  const target = new Date('2026-05-30T09:00:00');
  const now = new Date();
  const diff = target - now;
  if(diff<=0){
    document.getElementById('cd-days').textContent='00';
    document.getElementById('cd-hours').textContent='00';
    document.getElementById('cd-mins').textContent='00';
    document.getElementById('cd-secs').textContent='00';
    return;
  }
  const d = Math.floor(diff/86400000);
  const h = Math.floor((diff%86400000)/3600000);
  const m = Math.floor((diff%3600000)/60000);
  const s = Math.floor((diff%60000)/1000);
  document.getElementById('cd-days').textContent=String(d).padStart(2,'0');
  document.getElementById('cd-hours').textContent=String(h).padStart(2,'0');
  document.getElementById('cd-mins').textContent=String(m).padStart(2,'0');
  document.getElementById('cd-secs').textContent=String(s).padStart(2,'0');
}
updateCountdown();
setInterval(updateCountdown,1000);

// MUSIC
const music = document.getElementById('bgMusic');
const btn = document.getElementById('musicToggle');
let playing = false;
btn.addEventListener('click',()=>{
  if(playing){music.pause();btn.textContent='♪';}
  else{music.play().catch(()=>{});btn.textContent='❚❚';}
  playing=!playing;
});
// Try autoplay
window.addEventListener('load',()=>{
  music.volume=0.4;
  music.play().then(()=>{playing=true;btn.textContent='❚❚';}).catch(()=>{});
});