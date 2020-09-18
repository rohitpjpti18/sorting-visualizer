import { formatDiagnosticsWithColorAndContext } from 'typescript';
import MergeSort from './algorithms/MergeSort';
import Board from './Board';
import Color from './Color';

const active = "#6199f2";
const arraySizes = [5, 10, 20, 25, 50, 100, 150]
const sortSpeeds = [1000, 500, 250, 100, 50, 25, 12, 6, 2, 1]

var start = document.getElementById("start");

var bubble = document.getElementById("bubble");
var selection = document.getElementById("selection");
var insertion = document.getElementById("insertion");
var merge = document.getElementById("merge");
var quick = document.getElementById("quick");
var heap = document.getElementById("heap");

var arraySizeInput = document.getElementById("arraySize");
var sortSpeedInput = document.getElementById("sortSpeed");
var generateArray = document.getElementById("generateArray");


let color = new Color(sortSpeeds[4]);
let board = new Board(25, color);

arraySizeInput.oninput = function(e){
    if(board.sortInProgress) return;

    let size = parseInt((<HTMLInputElement>e.target).value);
    board.updateSize(arraySizes[size]);
}

sortSpeedInput.oninput = function(e){
    let speed = parseInt((<HTMLInputElement>e.target).value);
    color.updateSpeed(sortSpeeds[speed]);
}

generateArray.onclick = function(){
    if(board.sortInProgress) return;

    board.generateArray();
}

function updateActive(activeStr:number){
    var algo = [bubble, selection, insertion, merge, quick, heap];

    for(let i = 0; i<algo.length; i++){
        algo[i].style.backgroundColor = "initial";
    }

    algo[activeStr].style.backgroundColor = active;
}



bubble.onclick = function(){
    if(board.sortInProgress) return;
    
    updateActive(0);
    board.algoID = 0;
}

selection.onclick = function(){
    if(board.sortInProgress) return;
    
    updateActive(1);
    board.algoID = 1;
}

insertion.onclick = function(){
    if(board.sortInProgress) return;

    updateActive(2);
    board.algoID = 2;
}

merge.onclick = function(){
    if(board.sortInProgress) return;

    updateActive(3);
    board.algoID = 3;
}
 
quick.onclick = function(){
    if(board.sortInProgress) return;

    updateActive(4);
    board.algoID = 4;
}

heap.onclick = function(){
    if(board.sortInProgress) return;

    updateActive(5);
    board.algoID = 5;
}




start.onclick = function(){
    if(board.sortInProgress) return;

    board.startSorting();
}