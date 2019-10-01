(function(){
	// DOM ELEMENTS
	const $display = document.querySelector('.calc__current');
	const $icons = Array.from(document.querySelectorAll('.calc__icon'));
	const $buttons = document.querySelectorAll('.calc__button');
	const $events = document.querySelector('.events');

	// VALUES
	let current = 0;
	let memory = 0;
	let mode = null;
	let events = [];

	// FUNCTIONS
	function setMode(type) {
		$icons.forEach(icon => icon.classList.remove('active'));
		if (!type) { return mode = null };

		const found = $icons.find(icon => icon.dataset.mode === type);
		if (found) {
			if (found.classList.contains('active')) {
				return;
			} else {
				found.classList.add('active');
			}
		}

		mode = type;
		console.log(mode);

		if (current !== 0) {
			memory = current;
			current = 0;
		}
		
		render();
	}

	function calc(mode) {
		current = parseFloat(current);
		memory = parseFloat(memory);

		switch(mode) {
			case 'add':
				events.unshift(`${memory} + ${current}`);
				current = memory + current;
				break;
			case 'subtract':
				current = memory - current;
				break;
			case 'multiply':
				current = memory * current;
				break;
			case 'divide':
				current = memory / current;
				break;
			case 'invert':
				current = -current;
				break;
			case 'sqrt':
				current = parseFloat(Math.sqrt(current).toFixed(3));
				break;
			case 'percentage':
				current = memory * (current / 100);
				break;
			default:
				return;
		}
		setMode(null);
	}

	function decimal(value) {
		if (!value.includes('.')) { current = value + '.' };
		return;
	}

	function clear() {
		current = 0;
		memory = 0;
		events = [];
		render();
		setMode(null);
	}

	function render() {
		$events.innerHTML = '';
		if (events.length > 0) {
			$events.innerHTML += events.forEach(event => `<div class="event">${event}</div>`);
		}

		$display.textContent = current;
	}

	$buttons.forEach(button => {
		button.addEventListener('click', () => {
			const input = button.textContent;
			const currStr = current.toString();
			if (/^\d+$/.test(input)) {
				if (current === 0) {
					current = input;
				} else if (currStr.length >= 9) {
					alert('Too many characters!');
				} else {
					const newVal = currStr + input;
					current = newVal;
				}
			} else {
				switch(input) {
					case 'C':
						clear();
						break;
					case '±':
						calc('invert');
						break;
					case '√':
						calc('sqrt');
						break;
					case '%':
						setMode('percentage');
						break;
					case '.':
						decimal(currStr);
						break;
					case '+':
						setMode('add');
						break;
					case '−':
						setMode('subtract');
						break;
					case '×':
						setMode('multiply');
						break;
					case '÷':
						setMode('divide');
						break;
					case '=':
						calc(mode);
						break;
				}
			}
			render();
		})
	})
}())