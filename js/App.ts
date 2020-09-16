import { formatDiagnosticsWithColorAndContext } from 'typescript';
import Board from './Board';
import Color from './Color';

const arraySizes = [5, 10, 20, 25, 50, 100, 200]
const sortSpeeds = [1000, 400, 200, 100, 50, 20, 5]

var arraySizeInput = document.getElementById("arraySize");
var sortSpeedInput = document.getElementById("sortSpeed");
var generateArray = document.getElementById("generateArray");

let board = new Board(25);
let color = new Color(sortSpeeds[2]);

arraySizeInput.oninput = function(e){
    let size = parseInt((<HTMLInputElement>e.target).value);
    board.updateSize(arraySizes[size]);
}

sortSpeedInput.oninput = function(e){
    let speed = parseInt((<HTMLInputElement>e.target).value);
    color.updateSpeed(sortSpeeds[speed]);
}


generateArray.onclick = function(){
    board.generateArray();
}