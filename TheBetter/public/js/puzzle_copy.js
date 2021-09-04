document.addEventListener("DOMContentLoaded", (e) => {
	
	const puzzle = document.querySelectorAll(".puzzle");
	const rootPuzzle = document.querySelectorAll('div[data-id="rootPuzzle"]');
	let dragging = false; // 마우스 다운된 상태냐?
	let offset = { x: 0, y: 0 };
	let current = null;
	let i = 1;
  
	
	// 마우스가 눌려있을 때
	document.addEventListener("mousedown", (e) => {
	  offset.x = e.offsetX;
	  offset.y = e.offsetY;
	  // 정확히 퍼즐을 선택했을 때만 실행되게
	  console.log("드래깅중")
	  console.log(rootPuzzle)
	  if (e.target.classList.contains("puzzle")) dragging = true;
	  if (e.target.dataset.id === "rootPuzzle") {
		console.log(e.target)
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