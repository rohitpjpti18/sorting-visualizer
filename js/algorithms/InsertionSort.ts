import Board from "../Board";
import Color from "../Color";

class InsertionSort{
    board: Board;
    colorhandler: Color;

    constructor(board:Board, colorhandler:Color){
        this.board = board;
        this.colorhandler = colorhandler;
    }

    valueAt(i:number){
        return this.board.numArray[i];
    }

    async insertionSortAlgorithm(){
        let n = this.board.numArray.length;
        for (let i = 1; i < n; i++){
            await this.colorhandler.setColor(i, 1);
            let current = this.valueAt(i);
            // The last element of our sorted subarray
            let j = i-1; 
            while ((j > -1) && (current > this.valueAt(j))){
                await this.colorhandler.setColor(j, 1);
                await this.colorhandler.changeElement(j+1, this.valueAt(j));
                this.board.numArray[j+1] = this.valueAt(j);

                await this.colorhandler.set2IndexToDefault(j, j+1);
                j--;
            }
            this.board.numArray[j+1] = current;
            await this.colorhandler.changeElement(j+1, current);
            await this.colorhandler.setColor(j+1, 0);
        }
    }

    async execute(){
        this.board.sortInProgress = true;

        await this.insertionSortAlgorithm();
        
        this.board.sortInProgress = false;
    }
}


export default InsertionSort;