function draggablePanels(container) {
  container = container || document.body;
  var allPanels = container.getElementsByClassName('draggable');
  var dragFrom, dragTo;

  function drag(event) {
    event.preventDefault();
    dragFrom = event.target.position;
    console.log(event);
  }

  function over(event) {
    event.preventDefault();
    dragTo = event.target.position;
    //allPanels[2] === $0
    console.log(event);
  }

  function drop(event) {
    event.preventDefault();
    console.log(event);
  }

  var panel, i = 0;
  while (!!(panel = allPanels[i++])) {
    panel.position = i;
    panel.addEventListener("dragstart", drag);
    panel.addEventListener("dragover", over);
    panel.addEventListener("dragend", drop);
  }
}

/*

function allowDrop(ev) {
ev.preventDefault();
}

function drag(ev) {
ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
ev.preventDefault();
var data = ev.dataTransfer.getData("text");
ev.target.appendChild(document.getElementById(data));
}
</script>
</head>
<body>

<p>Drag the W3Schools image into the rectangle:</p>

<div id="div1" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
<div id="div2" ondrop="drop(event)" ondragover="allowDrop(event)"></div>

**/
