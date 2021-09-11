import { disableScrolling, enableScrolling } from '../utils/scroll-lock';

const openPanel = (openBtnClass, panelClass, overlayClass, closeBtnClass) => {
	const header = document.querySelector('.header');
	const BREAKPOINT = '(min-width: 1200px)';

	if (header) {
		const openBtn = header.querySelector('.' + openBtnClass);
		const panel = document.querySelector('.' + panelClass);
		const overlay = document.querySelector('.' + overlayClass);
		const closeBtn = document.querySelector('.' + closeBtnClass);

		const removeHideAnimation = () => {
			if (panel.classList.contains(panelClass + '--hide')) {
				panel.classList.remove(panelClass + '--hide');
			}
			if (overlay.classList.contains(overlayClass + '--hide')) {
				overlay.classList.remove(overlayClass + '--hide');
			}
		};

		const onEscPress = evt => {
			const isEscKey = evt.key === 'Escape' || evt.key === 'Esc';

			if (isEscKey) {
				evt.preventDefault();
				panelClose();
				enableScrolling();
			}
		};

		const onOverlayClick = evt => {
			if (evt.target === overlay) {
				panelClose();
				enableScrolling();
			}
		};

		const panelOpen = () => {
			overlay.classList.add(overlayClass + '--show');
			panel.classList.add(panelClass + '--open');
			removeHideAnimation();

			document.addEventListener('keydown', onEscPress);
			document.addEventListener('click', onOverlayClick);
		};

		const panelClose = () => {
			overlay.classList.remove(overlayClass + '--show');
			overlay.classList.add(overlayClass + '--hide');
			panel.classList.remove(panelClass + '--open');
			panel.classList.add(panelClass + '--hide');

			document.removeEventListener('keydown', onEscPress);
			document.removeEventListener('click', onOverlayClick);
		};

		const onOpenBtnClick = () => {
			panelOpen();
			disableScrolling();
		};

		const onCloseBtnClick = () => {
			panelClose();
			enableScrolling();
		};

		removeHideAnimation();

		openBtn.addEventListener('click', onOpenBtnClick);
		closeBtn.addEventListener('click', onCloseBtnClick);

		//временное отключение вызова события по клику на кнопку корзины,
		//так как нет ТЗ и общего вида сайта и не очень ясно,
		//какая функция за этой кнопкой скрывается в принципе на десктопе
		if (window.matchMedia(BREAKPOINT).matches) {
			openBtn.removeEventListener('click', onOpenBtnClick);
		}

		window.addEventListener('resize', function () {
			if (panel.classList.contains(panelClass + '--open')) {
				enableScrolling();
				panelClose();
				removeHideAnimation();
			}

			if (window.matchMedia(BREAKPOINT).matches) {
				openBtn.removeEventListener('click', onOpenBtnClick);
			} else {
				openBtn.addEventListener('click', onOpenBtnClick);
			}
		});

		if (module.hot) {
			module.hot.dispose(() => {
				openBtn.removeEventListener('click', onOpenBtnClick);
				closeBtn.removeEventListener('click', onCloseBtnClick);
			});
		}
	}
};

const initOpenPanel = () => {
	openPanel('aside-menu__item--burger', 'menu__wrapper', 'menu__overlay', 'menu__toggle');
	openPanel('aside-menu__item--cart', 'sidebar__wrapper', 'sidebar__overlay', 'sidebar__toggle');
};

export default initOpenPanel();
