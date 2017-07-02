document.addEventListener( 'DOMContentLoaded', () => {
	let dragSrcEl = null;

	function handleDragStart(event) {

		dragSrcEl = this;

		event.dataTransfer.effectAllowed = 'move';
		event.dataTransfer.setData('text/html', this.innerHTML);
	}


	function handleDragOver(event) {
		if (event.preventDefault) {
			event.preventDefault();
		}

		event.dataTransfer.dropEffect = 'move';

		return false;
	}


	function handleDragEnter(event) {
		this.classList.add('over');
	}

	function handleDragLeave(event) {
		this.classList.remove('over');
	}

	function handleDrop(event) {

		if (event.stopPropagation) {
			event.stopPropagation();
		}

		if (dragSrcEl != this) {

			dragSrcEl.innerHTML = this.innerHTML;
			this.innerHTML = event.dataTransfer.getData('text/html');
		}

		return false;
	}


	function handleDragEnd(event) {

		blocks.forEach(block => {
			block.classList.remove('over');
		});
	}

	let blocks = document.querySelectorAll('#blocks .block');
	blocks.forEach(block => {
		block.addEventListener('dragstart', handleDragStart, false);
		block.addEventListener('dragenter', handleDragEnter, false);
		block.addEventListener('dragover', handleDragOver, false);
		block.addEventListener('dragleave', handleDragLeave, false);
		block.addEventListener('drop', handleDrop, false);
		block.addEventListener('dragend', handleDragEnd, false);
	});
});