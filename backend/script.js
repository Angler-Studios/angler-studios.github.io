document.addEventListener('DOMContentLoaded', function() {
	// Hamburger toggle
	document.querySelectorAll('.hamburger').forEach(btn => {
		btn.addEventListener('click', function() {
			const header = btn.closest('.site-header');
			if (!header) return;
			const nav = header.querySelector('#site-nav');
			if (!nav) return;
			const isOpen = nav.classList.contains('open');
			if (isOpen) {
				nav.classList.remove('open');
				btn.classList.remove('open');
			} else {
				nav.classList.add('open');
				btn.classList.add('open');
			}
		});
	});

	// Language handling (supports both select and flag buttons)
	const supported = ['de','en'];

	function applyLanguage(lang) {
		if (!supported.includes(lang)) lang = 'de';
		document.documentElement.lang = lang;
		localStorage.setItem('siteLang', lang);

		// update common texts
		document.querySelectorAll('.site-nav').forEach(nav => {
			const links = nav.querySelectorAll('a');
			// adjust labels if needed (keeps English/German same for these)
			if (links.length >= 4) {
				links.forEach(link => {
					// no-op for now; can map href->label if needed
				});
			}
		});

		const introP = document.querySelector('.intro p');
		if (introP) {
			if (location.pathname.endsWith('team.html')) {
				introP.innerText = (lang === 'de') ? 'Das Team hinter der Vision.' : 'The team behind the vision.';
			} else if (location.pathname.endsWith('news.html')) {
				introP.innerText = (lang === 'de') ? 'Blog & Neuigkeiten' : 'Blog & News';
			}
		}

		const emptyH2 = document.querySelector('.empty-state h2');
		const emptyP = document.querySelector('.empty-state p');
		if (emptyH2) emptyH2.innerText = (lang === 'de') ? 'Noch keine News vorhanden' : 'No news yet';
		if (emptyP) emptyP.innerText = (lang === 'de') ? 'Schau bald wieder vorbei! Wir haben spannende Inhalte für dich in Planung!' : 'Check back soon — we’re preparing exciting content!';

		const searchInput = document.getElementById('searchInput');
		if (searchInput) searchInput.placeholder = (lang === 'de') ? 'Nach Namen oder Rolle suchen...' : 'Search by name or role...';

		const footerLink = document.querySelector('.footer-left a');
		if (footerLink) footerLink.innerText = (lang === 'de') ? 'impressum.html' : 'Imprint';

		// update construction page
		document.querySelectorAll('[data-lang-de]').forEach(el => {
			const deText = el.getAttribute('data-lang-de');
			const enText = el.getAttribute('data-lang-en');
			if (deText && enText) {
				el.innerText = (lang === 'de') ? deText : enText;
			}
		});

		// update controls
		document.querySelectorAll('#language-select').forEach(sel => sel.value = lang);
		document.querySelectorAll('.language-switch .lang-btn').forEach(b => {
			if (b.dataset && b.dataset.lang === lang) {
				b.classList.add('active');
				b.setAttribute('aria-pressed', 'true');
			} else {
				b.classList.remove('active');
				b.setAttribute('aria-pressed', 'false');
			}
		});
	}

	// bind select(s)
	document.querySelectorAll('#language-select').forEach(sel => {
		sel.addEventListener('change', () => applyLanguage(sel.value));
	});

	// bind flag buttons
	document.querySelectorAll('.language-switch .lang-btn').forEach(btn => {
		btn.addEventListener('click', () => {
			const lang = btn.dataset.lang;
			if (lang) applyLanguage(lang);
		});
	});

	// init
	const stored = localStorage.getItem('siteLang') || 'de';
	applyLanguage(stored);

	// Cookie Banner Logic
	const cookieBanner = document.getElementById('cookie-banner');
	const cookieAccept = document.getElementById('cookie-accept');
	const cookieReject = document.getElementById('cookie-reject');

	// Check if user has already accepted/rejected cookies
	const cookieConsent = localStorage.getItem('cookieConsent');

	if (cookieConsent) {
		// User has already made a choice, hide the banner
		cookieBanner.classList.add('hidden');
		setTimeout(() => {
			cookieBanner.style.display = 'none';
		}, 400);
	}

	// Accept cookies
	if (cookieAccept) {
		cookieAccept.addEventListener('click', () => {
			localStorage.setItem('cookieConsent', 'accepted');
			cookieBanner.classList.add('hidden');
			setTimeout(() => {
				cookieBanner.style.display = 'none';
			}, 400);
		});
	}

	// Reject cookies
	if (cookieReject) {
		cookieReject.addEventListener('click', () => {
			localStorage.setItem('cookieConsent', 'rejected');
			cookieBanner.classList.add('hidden');
			setTimeout(() => {
				cookieBanner.style.display = 'none';
			}, 400);
		});
	}
});

// Project Modal Functions
function openProjectModal(projectId) {
	const modal = document.getElementById(projectId + 'Modal');
	if (modal) {
		modal.classList.add('active');
		document.body.style.overflow = 'hidden';
	}
}

function closeProjectModal(projectId) {
	const modal = document.getElementById(projectId + 'Modal');
	if (modal) {
		modal.classList.remove('active');
		document.body.style.overflow = 'auto';
	}
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
	if (event.target.classList.contains('modal-overlay')) {
		const modal = event.target.closest('.project-modal');
		if (modal) {
			const projectId = modal.id.replace('Modal', '');
			closeProjectModal(projectId);
		}
	}
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
	if (event.key === 'Escape') {
		document.querySelectorAll('.project-modal.active').forEach(modal => {
			const projectId = modal.id.replace('Modal', '');
			closeProjectModal(projectId);
		});
	}
});
