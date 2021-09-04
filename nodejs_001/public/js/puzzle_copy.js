document.addEventListener("DOMContentLoaded", (e) => {
	
	const puzzle = document.querySelectorAll(".puzzle_num");
	const rootPuzzle = document.querySelector('img[data-id="rootPuzzle"]');
	let dragging = false; // 마우스 다운된 상태냐?
	let offset = { x: 0, y: 0 };
	let current = null;
	let i = 1;
  
	// 마우스가 눌려있을 때
	document.addEventListener("mousedown", (e) => {
	  offset.x = e.offsetX;
	  offset.y = e.offsetY;
	  // 정확히 퍼즐을 선택했을 때만 실행되게
	  if (e.target.classList.contains("puzzle_num")) dragging = true;
	  if (e.target === rootPuzzle) {
		let newNode = rootPuzzle.cloneNode();
		current = newNode;
		newNode.dataset.id = Math.random().toString(36).substr(2, 10);
		// 10자리랜덤문자열생성
		newNode.dataset.num = i++;
		newNode.style.zIndex = 2;
		newNode.style.left = e.pageX - offset.x + "px";
		newNode.style.top = e.pageY - offset.y + "px";
		document.body.appendChild(newNode);
	  } else {
		current = e.target;
	  }
	});
  
	document.addEventListener("mousemove", (e) => {
	  // console.log(current);
	  // console.log(e.target.dataset.id);
	  if (dragging) {
		current.style.left = e.pageX - offset.x + "px";
		current.style.top = e.pageY - offset.y + "px";
	  }
	});
  
	document.addEventListener("mouseup", (e) => {
	  dragging = false;
	  //   alert(current.dataset.id);
	});
  });