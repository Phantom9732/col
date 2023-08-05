let thumb = slider.querySelector('.thumb');
let ppos = document.querySelector('.position');
let nulltext = document.createTextNode(0);
ppos.appendChild(nulltext)

thumb.onmousedown = function(event) {

  let shiftX = event.clientX - thumb.getBoundingClientRect().left;

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

  function onMouseMove(event) {
    let newLeft = event.clientX - shiftX - slider.getBoundingClientRect().left;

    if (newLeft < 0) {
      newLeft = 0;
    }
    let rightEdge = slider.offsetWidth - thumb.offsetWidth;
    if (newLeft > rightEdge) {
      newLeft = rightEdge;
    }

    thumb.style.left = newLeft + 'px';

    prettypos = Math.floor(newLeft/3)
    let postext = document.createTextNode(prettypos);
    firstch = ppos.firstChild;
    ppos.replaceChild(postext, firstch);
    ppos.style.left = newLeft + 5 + 'px';

  }

  function onMouseUp() {
    document.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('mousemove', onMouseMove);
  }

};
