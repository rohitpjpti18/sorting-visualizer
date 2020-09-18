import Board from '../Board';
import Color from '../Color';

class SelectionSort{
    board: Board;
    colorhandler: Color;

    constructor(board:Board, colorhandler:Color){
        this.board = board;
        this.colorhandler = colorhandler;
    }

    valueAt(i:number){
        return this.board.numArray[i];
    }

    async selectionSortAlgorithm(){
        for (let i = 0; i < this.board.numArray.length; i++) {
            let min = i;
            await this.colorhandler.setColor(i, 1);
            for (let j = i + 1; j < this.board.numArray.length; j++) {
                await this.colorhandler.setColor(j, 1);
                if (this.valueAt(min) < this.valueAt(j)) {
                    min = j;
                }
                await this.colorhandler.setColor(j, 0);
            }
            if (min !== i) {
                this.board.swap(i,min);
                await this.colorhandler.arrangeTwoElements(i, this.valueAt(i), min, this.valueAt(min))
            }
            await this.colorhandler.set2IndexToDefault(i, min);
        }
    }

    async execute(){
        this.board.sortInProgress = true;

        await this.selectionSortAlgorithm();
        
        this.board.sortInProgress = false;
    }
}


export default SelectionSort;