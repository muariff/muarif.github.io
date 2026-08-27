// scroll reveal
const revealObs = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('show'); } });
}, {threshold:0.12});
document.querySelectorAll('.reveal').forEach(el=>revealObs.observe(el));

// skill bar fill on view
const skillObs = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const row = e.target;
      const fill = row.querySelector('.skill-fill');
      fill.style.width = row.dataset.level + '%';
      skillObs.unobserve(row);
    }
  });
}, {threshold:0.4});
document.querySelectorAll('.skill-row').forEach(el=>skillObs.observe(el));

// mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navList = document.getElementById('navList');
navToggle.addEventListener('click', ()=>{
  navToggle.classList.toggle('open');
  navList.classList.toggle('open');
});
document.querySelectorAll('.navlink').forEach(a=>{
  a.addEventListener('click', ()=>{
    navToggle.classList.remove('open');
    navList.classList.remove('open');
  });
});

// scroll-spy active nav link
const navLinks = document.querySelectorAll('.navlink');
const sections = [...navLinks].map(a=>document.querySelector(a.getAttribute('href')));
const spyObs = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    const id = '#' + entry.target.id;
    const link = document.querySelector('.navlink[href="'+id+'"]');
    if(!link) return;
    if(entry.isIntersecting){
      navLinks.forEach(l=>l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}, {rootMargin:'-45% 0px -45% 0px'});
sections.forEach(s=>{ if(s) spyObs.observe(s); });

// project filter
const filterBtns = document.querySelectorAll('.filter-btn');
const projCards = document.querySelectorAll('.proj-card');
filterBtns.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    filterBtns.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    projCards.forEach(card=>{
      card.classList.toggle('hide', f!=='all' && card.dataset.cat!==f);
    });
  });
});

// progress bar + back to top
const progressBar = document.getElementById('progressBar');
const totop = document.getElementById('totop');
window.addEventListener('scroll', ()=>{
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  progressBar.style.width = scrolled + '%';
  totop.classList.toggle('show', h.scrollTop > 500);
});
totop.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));

const modal = document.getElementById('projectModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalBody = document.getElementById('modalBody');
const modalCaption = document.getElementById('modalCaption');

// Open Modal when clicking a project card
projCards.forEach(card => {
  card.addEventListener('click', () => {
    // Get project data
    const title = card.querySelector('.proj-title').innerText;
    const type = card.dataset.previewType;
    const src = card.dataset.previewSrc;

    if(!src) return;

    // Build modal content based on type
    if (type === 'image') {
      modalBody.innerHTML = `<img src="${src}" alt="${title} Preview">`;
    } else if (type === 'video') {
      modalBody.innerHTML = `<video src="${src}" controls autoplay muted playsinline loop></video>`;
    }

    // Set caption and open modal
    modalCaption.innerText = title;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

// Close Modal logic
function closeModal() {
  modal.classList.remove('open');
  setTimeout(() => { modalBody.innerHTML = ''; }, 300); 
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('open')) {
    closeModal();
  }
});