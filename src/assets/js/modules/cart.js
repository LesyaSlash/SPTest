const initCart = () => {
	const basketBlock = document.querySelector('.sidebar');
	if (basketBlock) {
		const basketWrapper = basketBlock.querySelector('.basket');
		if (basketWrapper) {
			const items = basketWrapper.querySelectorAll('.basket__item');
			const subtotalWrapper = basketBlock.querySelector('.js-subtotal');
			//let subtotal = parseInt(subtotalWrapper.textContent, 10);
			const totalWrapper = basketBlock.querySelector('.js-total');
			const tax = parseInt(basketBlock.querySelector('.js-tax').textContent, 10);
			const shipping = parseInt(basketBlock.querySelector('.js-shipping').textContent, 10);
			//let total = parseInt(totalWrapper.textContent, 10);

			const amountCalculate = () => {
				const priceWrappers = basketBlock.querySelectorAll('.js-price');
				const prices = [];
				let subtotal = 0;
				let total = 0;

				priceWrappers.forEach(item => {
					const itemNum = parseInt(item.textContent, 10);
					prices.push(itemNum);
				});

				for (let i = 0; i < prices.length; i++) {
					subtotal = subtotal + prices[i];
				}
				subtotalWrapper.textContent = subtotal;

				total = subtotal + tax + shipping;
				totalWrapper.textContent = total;
			};

			items.forEach(item => {
				const btnMinus = item.querySelector('.basket__button--minus');
				const btnPlus = item.querySelector('.basket__button--plus');
				const btnDelete = item.querySelector('.basket__delete-btn');
				const amountWrapper = item.querySelector('.basket__amount');
				let amount = parseInt(amountWrapper.textContent, 10);
				const priceWrapper = item.querySelector('.js-price');
				const startPrice = parseInt(priceWrapper.textContent, 10);
				let newPrice = '';

				const deleteItem = () => {
					item.remove();
				};

				const increaseAmount = () => {
					amount++;
					amountWrapper.textContent = amount;
				};

				const decreaseAmount = () => {
					if (amount > 1) {
						amount--;
						amountWrapper.textContent = amount;
					} else {
						deleteItem();
					}
				};

				const changePrice = () => {
					if (amount >= 1) {
						newPrice = amount * startPrice;
						priceWrapper.textContent = newPrice;
					} else {
						newPrice = 0;
					}
				};

				// const changeSubtotal = () => {
				// 	subtotal = subtotal + newPrice;
				// 	subtotalWrapper.textContent = subtotal;
				// };

				btnMinus.addEventListener('click', evt => {
					evt.preventDefault();
					decreaseAmount();
					changePrice();
					amountCalculate();
				});

				btnPlus.addEventListener('click', evt => {
					evt.preventDefault();
					increaseAmount();
					changePrice();
					amountCalculate();
				});

				btnDelete.addEventListener('click', evt => {
					evt.preventDefault();
					deleteItem();
					amountCalculate();
				});
			});
		}
	}
};

export default initCart();
