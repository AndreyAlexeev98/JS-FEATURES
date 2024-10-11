const btn = document.querySelector("#button");
const container = document.querySelector("#container");

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function addDiv() {
  const newDev = document.createElement("div");
  newDev.style.width = Math.random() * 100 + "px";
  newDev.style.height = Math.random() * 100 + "px";
  newDev.style.backgroundColor = getRandomColor();

  newDev.style.position = "absolute";
  newDev.style.zIndex = 1000;
  newDev.style.top = Math.random() * 100 + "%";
  newDev.style.left = Math.random() * 100 + "%";

  container.append(newDev);

  function dragStartHandler(e) {
    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
      newDev.style.left = pageX - newDev.offsetWidth / 2 + "px";
      newDev.style.top = pageY - newDev.offsetHeight / 2 + "px";
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    document.addEventListener("mousemove", onMouseMove);

    newDev.onmouseup = function () {
      document.removeEventListener("mousemove", onMouseMove);
      newDev.onmouseup = null;
    };

    newDev.ondragstart = function () {
      return false;
    };
  }

  newDev.addEventListener("mousedown", dragStartHandler);
}

btn.addEventListener("click", addDiv);
