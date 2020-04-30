(function () {
	// DOM ELEMENTS
	const $display = document.querySelector('.calc__current');
	const $icons = Array.from(document.querySelectorAll('.calc__icon'));
	const $buttons = document.querySelectorAll('.calc__button');
	const $events = document.querySelector('.events');
	const $clearHistory = document.querySelector('.history__clear');

	// VALUES
	let current = 0;
	let memory = 0;
	let mode = null;
	let events = [];

	// FUNCTIONS
	function setMode(type) {
		$icons.forEach((icon) => icon.classList.remove('active'));
		if (!type) {
			return (mode = null);
		}

		mode = type;

		if (current !== 0) {
			memory = current;
			current = 0;
		}

		const found = $icons.find((icon) => icon.dataset.mode === type);
		if (found) {
			if (found.classList.contains('active')) {
				return;
			} else {
				console.log(mode);
				found.classList.add('active');
			}
		}
	}

	function calc(mode) {
		current = parseFloat(current);
		memory = parseFloat(memory);
		let compiled = 0;

		switch (mode) {
			case 'add':
				compiled = decimalFix(memory + current);
				events.unshift(`${memory} + ${current} = ${compiled}`);
				break;
			case 'subtract':
				compiled = decimalFix(memory - current);
				events.unshift(`${memory} - ${current} = ${compiled}`);
				break;
			case 'multiply':
				compiled = decimalFix(memory * current);
				events.unshift(`${memory} × ${current} = ${compiled}`);
				break;
			case 'divide':
				compiled = decimalFix(memory / current);
				events.unshift(`${memory} × ${current} = ${compiled}`);
				break;
			case 'invert':
				compiled = -decimalFix(current);
				events.unshift(`${current} × -1 = ${compiled}`);
				break;
			case 'sqrt':
				compiled = decimalFix(Math.sqrt(current));
				events.unshift(`√${current} = ${compiled}`);
				break;
			case 'percentage':
				compiled = decimalFix(memory * (current / 100));
				events.unshift(`${current}% OF ${memory} = ${compiled}`);
				break;
			default:
				return;
		}
		current = compiled;
		memory = compiled;
		setMode(null);
	}

	function decimal(value) {
		if (!value.includes('.')) {
			current = value + '.';
		}
		return;
	}

	function clear() {
		current = 0;
		memory = 0;
		setMode(null);
	}

	function clearHistory() {
		events = [];
		render();
	}

	function render() {
		$events.innerHTML = '';
		if (events.length > 0) {
			const HTML = events.map((event) => `<div class="event">${event}</div>`).join('\n');
			$events.innerHTML = HTML;
		}

		$display.textContent = current;
		console.log('render');
	}

	function decimalFix(num) {
		return parseFloat(num.toFixed(4));
	}

	// EVENTS

	$buttons.forEach((button) => {
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
				switch (input) {
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
		});
	});

	$clearHistory.addEventListener('click', clearHistory);
})();
