import { formatDiagnosticsWithColorAndContext } from 'typescript';
import Board from './Board';
import Color from './Color';

const arraySizes = [5, 10, 20, 25, 50, 100, 150]
const sortSpeeds = [1000, 500, 250, 100, 50, 25, 12, 6, 2, 1]

var start = document.getElementById("start");

var bubble = document.getElementById("bubble");
var selection = document.getElementById("selection");
var quick = document.getElementById("quick");

var arraySizeInput = document.getElementById("arraySize");
var sortSpeedInput = document.getElementById("sortSpeed");
var generateArray = document.getElementById("generateArray");


let color = new Color(sortSpeeds[2]);
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




bubble.onclick = function(){
    if(board.sortInProgress) return;

    board.algoID = 0;
}

selection.onclick = function(){
    if(board.sortInProgress) return;

    board.algoID = 1;
}

quick.onclick = function(){
    if(board.sortInProgress) return;

    board.algoID = 4;
}




start.onclick = function(){
    if(board.sortInProgress) return;

    board.startSorting();
}