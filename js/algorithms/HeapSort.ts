import Board from "../Board";
import Color from "../Color";

/* function heap_root(input, i) {
    var left = 2 * i + 1;
    var right = 2 * i + 2;
    var max = i;

    if (left < array_length && input[left] > input[max]) {
        max = left;
    }

    if (right < array_length && input[right] > input[max])     {
        max = right;
    }

    if (max != i) {
        swap(input, i, max);
        heap_root(input, max);
    }
}

function swap(input, index_A, index_B) {
    var temp = input[index_A];

    input[index_A] = input[index_B];
    input[index_B] = temp;
}

function heapSort(input) {
    
    array_length = input.length;

    for (var i = Math.floor(array_length / 2); i >= 0; i -= 1)      {
        heap_root(input, i);
      }

    for (i = input.length - 1; i > 0; i--) {
        swap(input, 0, i);
        array_length--;
      
      
        heap_root(input, 0);
    }
} */



class HeapSort{
    board:Board;
    colorhandler:Color;
    arrayLen:number

    constructor(board:Board, colorhandler:Color){
        this.board = board;
        this.colorhandler = colorhandler;
    }

    valueAt(i:number){
        return this.board.numArray[i];
    }

    async heapRoot(i:number){
        var left = 2 * i + 1;
        var right = 2 * i + 2;
        var min = i;

        await this.colorhandler.setColor(i, 1);
    
        if(left < this.arrayLen && this.valueAt(left) < this.valueAt(min)){
            min = left;
        }
    
        if(right < this.arrayLen && this.valueAt(right) < this.valueAt(min)){
            min = right;
        }
    
        if(min != i){
            await this.colorhandler.set2IndexToCheck(i, min);
            this.board.swap(i, min);
            await this.colorhandler.arrangeTwoElements(i, this.board.numArray[i], min, this.board.numArray[min]);
            await this.colorhandler.set2IndexToDefault(i, min);
            await this.heapRoot(min);
        }

        await this.colorhandler.setColor(i, 0);
    }


    async heapSortAlgorithm(){
        this.arrayLen = this.board.numArray.length
        for (let i = Math.floor(this.arrayLen/2); i >= 0; i -= 1)      {
            await this.heapRoot(i);
        }
    
        for(let i = this.board.numArray.length-1; i > 0; i--) {
            await this.colorhandler.set2IndexToCheck(0, i);
            this.board.swap(0, i);
            await this.colorhandler.arrangeTwoElements(0, this.board.numArray[0], i, this.board.numArray[i]);
            await this.colorhandler.set2IndexToDefault(0, i);
            await this.colorhandler.setColor(0, 1);
            this.arrayLen--;
        
            await this.heapRoot(0);
            await this.colorhandler.setColor(0, 0);
        }
    }


    async execute(){
        this.board.sortInProgress = true;

        await this.heapSortAlgorithm();

        console.log(this.board.numArray);

        this.board.sortInProgress = false;
    }
}


export default HeapSort;