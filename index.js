var canvasBoxes = [],
    selectedItem = '';
function getClippedRegion(image, x, y, width, height) {

    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;

    //                   source region         dest. region
    ctx.drawImage(image, x, y, width, height,  0, 0, width, height);

    return canvas;
}
function selectItem(e){
    if(e.keyCode === 32){
        selectedItem = e.target;
    }
}
function acceptItem(e){
    if(e.keyCode === 32){
        e.target.appendChild(selectedItem);
    }
}
function allowDrop(ev) {
    ev.preventDefault();
    ev.target.classList.add('hoverBox');

}
function dragLeave(ev) {
    ev.preventDefault();
    ev.target.classList.remove('hoverBox');

}
function drag(ev) {
    ev.dataTransfer.setData('text', ev.target.id);
    var tilePos = ev.currentTarget.id.replace('myscreencanvas', '').replace('-draggable','');
    ev.dataTransfer.setData('tile',tilePos);
    
}
  
function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData('text');
    console.log(canvasBoxes,parseInt(ev.target.id.replace('myscreencanvas', '').replace('-droppable',''),10),
    window.canvasBoxes.indexOf(parseInt(ev.dataTransfer.getData('tile'),10)));
    if(parseInt(ev.target.id.replace('myscreencanvas', '').replace('-droppable',''),10) === 
    window.canvasBoxes.indexOf(parseInt(ev.dataTransfer.getData('tile'),10)))
        ev.target.appendChild(document.getElementById(data));
    ev.target.classList.remove('hoverBox');
}
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
window.addEventListener('load', function () {
    
    var image  = document.getElementById('img'),
        row = 4,
        column = 7,
        canvasBoxesX= Array.apply(0,new Array(row*column)).map(function(_,i){ return i; });
    shuffleArray(canvasBoxesX);
    window.canvasBoxes = canvasBoxesX.slice();
    for(var i=0;i<row*column;i++){
        var canvasDraggable = document.createElement('div'),
            canvasDroppable = document.createElement('div'),
            emptyCanvas = document.createElement('div');
        emptyCanvas.width = image.width/column;
        emptyCanvas.height = image.height/row;
        canvasDraggable.setAttribute('id','myscreencanvas'+i+'-draggable');
        canvasDraggable.setAttribute('tabindex','0');   
        canvasDraggable.setAttribute('aria-grabbed', 'false');
        canvasDraggable.setAttribute('draggable','true');
        canvasDraggable.setAttribute('ondragstart','drag(event)');
        canvasDraggable.setAttribute('onkeydown','selectItem(event)');

        canvasDroppable.setAttribute('id','myscreencanvas'+i+'-droppable');
        canvasDroppable.setAttribute('class','droppable-child');
        canvasDroppable.setAttribute('tabindex','0');   
        canvasDroppable.setAttribute('onkeydown','acceptItem(event)');

        canvasDroppable.style.width = image.width/column+'px';
        canvasDroppable.style.height = image.height/row+'px';
        document.getElementById('droppable').style.width = image.width+((column*2))+'px';
        canvasDroppable.setAttribute('ondrop','drop(event)');
        canvasDroppable.setAttribute('ondragover','allowDrop(event)');
        canvasDroppable.setAttribute('ondragleave','dragLeave(event)');

        emptyCanvas.setAttribute('id','myscreencanvas'+i);
        document.getElementById('myscreencanvas').appendChild(canvasDraggable);
        document.getElementById('droppable').appendChild(canvasDroppable);

        document.getElementById('myscreencanvas'+i+'-draggable').appendChild(emptyCanvas);
    }
    for(var k=0;k<row;k++){
        for(var l=0;l<column;l++){
            var canvas = document.getElementById('myscreencanvas'+canvasBoxesX[0]);
                //ctx    = canvas.getContext('2d');
            canvasBoxesX.shift();
            /* var clip   = getClippedRegion(image, l*(image.width/column), 
            k*(image.height/row), image.width/column, image.height/row);
            ctx.drawImage(clip, 0, 0, image.width/column, image.height/row); */
            canvas.style.width = image.width/column+'px';
            canvas.style.height = image.height/row+'px';
            canvas.style.backgroundImage = "url('img.jpeg')";
            canvas.style.backgroundPositionX = -l*(image.width/column)+'px';
            canvas.style.backgroundPositionY = -k*(image.height/row)+'px';

        }
    }

}, false);
