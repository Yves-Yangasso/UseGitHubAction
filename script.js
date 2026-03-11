// Simple interactions: mobile menu, smooth scroll, contact form handler
document.addEventListener('DOMContentLoaded', function(){
	// year in footer
	const yearEl = document.getElementById('year');
	if(yearEl) yearEl.textContent = new Date().getFullYear();

	// mobile nav toggle
	const navToggle = document.getElementById('navToggle');
	const mainNav = document.getElementById('mainNav');
	if(navToggle && mainNav){
		navToggle.addEventListener('click', ()=>{
			const shown = mainNav.style.display === 'block';
			mainNav.style.display = shown ? '' : 'block';
		});
	}

	// smooth scroll for internal links
	document.querySelectorAll('a[href^="#"]').forEach(a=>{
		a.addEventListener('click', function(e){
			const href = this.getAttribute('href');
			if(href && href.startsWith('#')){
				const target = document.querySelector(href);
				if(target){
					e.preventDefault();
					target.scrollIntoView({behavior:'smooth',block:'start'});
					// close mobile nav if open
					if(window.innerWidth < 640 && mainNav) mainNav.style.display = '';
				}
			}
		});
	});

	// contact form simple demo handler
	const form = document.getElementById('contactForm');
	const status = document.getElementById('formStatus');
	if(form){
		form.addEventListener('submit', function(e){
			e.preventDefault();
			const data = new FormData(form);
			// Basic validation (browser already checks required)
			const name = data.get('name');
			const email = data.get('email');
			const message = data.get('message');
			// Simulate sending
			if(status) status.textContent = 'Envoi en cours...';
			setTimeout(()=>{
				if(status) status.textContent = 'Merci — votre message a été envoyé.';
				form.reset();
			},800);
		});
	}

	// reveal on scroll for sections/cards
	const revealEls = document.querySelectorAll('.section, .card, .hero-copy');
	if('IntersectionObserver' in window){
		const io = new IntersectionObserver((entries)=>{
			entries.forEach(e=>{
				if(e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
			});
		},{threshold:0.12});
		revealEls.forEach(el=>{
			el.classList.add('reveal'); io.observe(el);
		});
	} else {
		// fallback: make visible
		revealEls.forEach(el=>el.classList.add('visible'))
	}
});

