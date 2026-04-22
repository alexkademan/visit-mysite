(() => {
	// DOM elements:
	let toggleButton = false;
	let list = false;
	let modal = false;
	let navCol = false;
	let closeButton = false;

	// state variables:
	let modalState = 'off';
	let modalAnimationState = 'off';

	document.addEventListener('DOMContentLoaded', () => {
		toggleButton = document.getElementById('menu-toggle-button');
		list = document.getElementById('masthead-navigation');
		modal = document.getElementById('menu-modal-main-nav');
		navCol = document.getElementById('menu-modal-nav-column');
		closeButton = document.getElementById('menu-modal-close-button');
		// console.log(toggleButton);
		if (toggleButton && list && modal && navCol && closeButton) {
			
			const links = list.innerHTML;
			const listToRender = document.createElement('ul');
			listToRender.innerHTML = list.innerHTML;
			navCol.append(listToRender);

			toggleButton.addEventListener('click', toggleMenuState);
			modal.addEventListener('click', findClickedElement);
			closeButton.addEventListener('click', toggleMenuState);

			document.addEventListener('keypress', keyboard);
		}

	}, false);

	function toggleMenuState() {

		if (modalAnimationState === 'off') {
			if (modalState === 'off') {
				// turn on the modal
				modalState = 'on';
				modalAnimationState = 'on';

				modal.className = "menu-modal modal-on";
				setTimeout(() => {
					// timer is up
					modalAnimationState = 'off';
				}, 450);

			} else {
				// turn ON the modal
				modalState = 'off';
				modalAnimationState = 'on';

				modal.className = "menu-modal modal-off";
				setTimeout(() => {
					// timer is up
					modal.className = "menu-modal";
					modalAnimationState = 'off';
				}, 450);
			}
		}
	}

	function findClickedElement(e) {
		if (
			e.target.className === 'menu-modal modal-on' ||
			e.target.className === 'close-button'
		) {
			toggleMenuState();
		}
	}

	function keyboard(e) {
		if (e.key === 'q') {
			toggleMenuState();
		}
	}

})();