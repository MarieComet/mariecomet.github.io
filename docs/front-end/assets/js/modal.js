
const triggers = document.querySelectorAll('.js-modal');
triggers.forEach((trigger) => {
	const openBtn = trigger;
	const searchModal = document.getElementById(trigger.getAttribute('aria-controls'));
	const closeBtn = searchModal.querySelector('.close-modal');
	const overlay = searchModal.querySelector('.modal-overlay');

	let opened = false;

	// Click on .js-modal : open modal
	openBtn.addEventListener('click', (event) => {
		open(searchModal, event, closeBtn);
	});

	// Click on .close-modal : close modal
	closeBtn.addEventListener('click', (event) => {
		close(searchModal);
	});

	// Click on .modal-overlay : open modal
	overlay.addEventListener('click', (event) => {
		close(searchModal);
	});

	// Keydows inside the modal
	searchModal.addEventListener('keydown', (event) => {
		keydown(event, searchModal, openBtn);
	});

});

function open(searchModal, event, closeBtn) {
	event.preventDefault();
	openBtn = event.target; // redefine open button clicked
	openBtn.setAttribute( 'aria-expanded', true );
	searchModal.removeAttribute( 'hidden' );
	closeBtn.focus();
	requestAnimationFrame( () => {
		searchModal.classList.add( 'modal-open' );
		opened = true;
	} )
}

function close(searchModal) {
	if ( searchModal.hasAttribute( 'hidden' ) ) {
		return;
	}
	openBtn.setAttribute( 'aria-expanded', false );
	openBtn.focus();
	requestAnimationFrame( () => {
		searchModal.classList.remove( 'modal-open' );
		
		setTimeout(function(){
		  searchModal.setAttribute( 'hidden', '' );
		}, 500);
		opened = false;
	} )
}

function keydown( event, searchModal, openBtn ) {
	if ( searchModal.hasAttribute( 'hidden' ) ) {
		return;
	}
	if ( event.keyCode === 27 ) {
		close(searchModal, openBtn);
		return;
	}
	if ( event.keyCode === 9 ) {
		const interactives = searchModal.querySelectorAll( "a[href], area[href], input:not([type='hidden']):not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]" )
		const { 0 : first , [ interactives.length - 1 ] : last } = interactives;
		if ( ! event.shiftKey && last === event.target ) {
			event.preventDefault();
			first.focus();
		} else if ( event.shiftKey && first === event.target ) {
			event.preventDefault();
			last.focus();
		}
	}
}
