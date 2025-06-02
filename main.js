// Lucide ikonok inicializálása
lucide.createIcons();

// Galéria elemek és modal referencia
const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
const modal = document.getElementById('lightboxModal');
const modalImg = document.getElementById('lightboxImg');
const closeBtn = document.getElementById('lightboxClose');
const prevBtn = document.getElementById('lightboxPrev');
const nextBtn = document.getElementById('lightboxNext');
let currentIndex = 0;

// Kép megnyitása
galleryItems.forEach((img, index) => {
    img.addEventListener('click', () => {
        currentIndex = index;
        openModal();
    });
});

function openModal() {
    modalImg.src = galleryItems[currentIndex].src;
    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
}

// Bezárás
closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
});
modal.addEventListener('click', e => {
    if (e.target === modal) {
        modal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    }
});

// Előző kép
prevBtn.addEventListener('click', e => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    openModal();
});

// Következő kép
nextBtn.addEventListener('click', e => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % galleryItems.length;
    openModal();
});

// STICKY NAV SHOW/ HIDE
const stickyNav = document.getElementById('stickyNav');
const headerEl  = document.querySelector('header');

window.addEventListener('scroll', () => {
  const triggerPoint = headerEl.offsetHeight - 50;
  if (window.scrollY > triggerPoint) {
  // megjelenítés
  stickyNav.classList.remove('opacity-0','pointer-events-none');
  stickyNav.classList.add   ('opacity-100','pointer-events-auto');
  } else {
  // elrejtés
  stickyNav.classList.add   ('opacity-0','pointer-events-none');
  stickyNav.classList.remove('opacity-100','pointer-events-auto');
  }
});

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
  if (entry.isIntersecting) {
    entry.target.classList.add('active');
    observer.unobserve(entry.target);
  }
});
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// --- AJAX form submit & EmailJS ---
const alertSuccess = document.getElementById('alertSuccess');
const alertError   = document.getElementById('alertError');
const alertErrorMsg= document.getElementById('alertErrorMsg');

const form = document.getElementById('registerForm');

form.addEventListener('submit', function(e) {
e.preventDefault();

if (!form.name.value ||
  !form.email.value ||
  !form.phone.value ||
  !form.szallas.value) {
  alertErrorMsg.textContent = 'Kérlek töltsd ki a kötelező mezőket!';
  showAlert(alertError);
  return;
}

const templateParams = {
  name:    form.name.value,
  email:   form.email.value,
  phone:   form.phone.value,
  szallas: form.szallas.value,
  igenyek: form.igenyek.value || 'nincs megadva',
  time:    new Date().toLocaleString('hu-HU')
};

emailjs.send('service_b3c1mat','template_cyejuzc', templateParams)
  .then(() => {
      // konfetti a sikeres küldés után
      emailjs.send('service_b3c1mat','template_jhcbsbh', templateParams)
          .then(() => {
              console.log('EmailJS küldés sikeres');
          }, (err) => {
              console.error('EmailJS küldés hiba:', err);
          });
      confetti({
          particleCount: 150,
          spread:        60,
          origin:        { y: 0.6 }
      });
      showAlert(alertSuccess);
      // mezők törlése
      form.reset();
  }, (err) => {
      console.error('EmailJS hiba:', err);
      alertErrorMsg.textContent = 'Hiba történt a küldés során, próbáld újra!';
      showAlert(alertError);
  });
});

function showAlert(element) {
  element.classList.remove('hidden');
  setTimeout(() => {
      element.classList.add('hidden');
  }, 5000);
}  

  const toggleBtn = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  let menuOpen = false;

  toggleBtn.addEventListener('click', () => {
    menuOpen = !menuOpen;
    if (menuOpen) {
      mobileMenu.classList.add('menu-open');
    } else {
      mobileMenu.classList.remove('menu-open');
    }
  });