import Board from "../Board";
import Color from "../Color";

class BubbleSort{
    board:Board;
    colorhandler:Color;

    constructor(board:Board, colorhandler:Color){
        this.board = board;
        this.colorhandler = colorhandler;
    }


    async bubbleSortAlgorithm(array:number[]){
        let n = array.length - 1;
        let flag = false;
        do{
            flag = false;
            for(var i = 0; i < n; i++){
                await this.colorhandler.set2IndexToCheck(i, i+1);
                if(array[i] < array[i+1]){
                    flag = true;
                    this.board.swap(i, i+1);
                    await this.colorhandler.arrangeTwoElements(i, this.board.numArray[i], i+1, this.board.numArray[i+1]);
                }else{
                    await this.colorhandler.set2IndexToOrdered(i, i+1);
                }

                await this.colorhandler.set2IndexToDefault(i, i+1);
            }
            n--;
        }while(flag);
    }


    async execute(){
        this.board.sortInProgress = true;

        await this.bubbleSortAlgorithm(this.board.numArray);
        
        this.board.sortInProgress = false;
    }

}


export default BubbleSort;