import Board from "../Board";
import Color from "../Color";

class QuickSort{
    board:Board;
    colorhandler:Color;

    constructor(board:Board, colorhandler:Color){
        this.board = board;
        this.colorhandler = colorhandler;
    }

    async quickSortAlgorithm(start:number, end:number) { 
        if(start >= end) { 
            return; 
        } 
        let index = await this.partition(start, end);  
          
        await this.quickSortAlgorithm(start, index-1); 
        await this.quickSortAlgorithm(index+1, end);

    } 


    async partition(start:number, end:number) { 
        let pivotIndex = start; 
        let pivotValue = this.board.numArray[end]; 
        
        await this.colorhandler.setColor(end, 1);
        for(let i = start; i < end; i++) {
            await this.colorhandler.setColor(i, 1); 
            if(this.board.numArray[i] > pivotValue) { 
                //swap(arr, i, pivotIndex);
                this.board.swap(i, pivotIndex); 
                await this.colorhandler.arrangeTwoElements(
                    i,
                    this.board.numArray[i],
                    pivotIndex,
                    this.board.numArray[pivotIndex]
                );
                await this.colorhandler.set2IndexToOrdered(i, pivotIndex);
                await this.colorhandler.set2IndexToDefault(i, pivotIndex);
                pivotIndex++;
            } 

            await this.colorhandler.setColor(i, 0);
        } 
          
        //await swap(arr, pivotIndex, end); 
        this.board.swap(end, pivotIndex);
        await this.colorhandler.arrangeTwoElements(
            end,
            this.board.numArray[end],
            pivotIndex,
            this.board.numArray[pivotIndex]
        );
        await this.colorhandler.set2IndexToOrdered(end, pivotIndex);
        await this.colorhandler.set2IndexToDefault(end, pivotIndex);
          
        return pivotIndex; 
    }

    async execute(){
        this.board.sortInProgress = true;

        await this.quickSortAlgorithm(0, this.board.numArray.length-1);
        
        this.board.sortInProgress = false;
    }
}

export default QuickSort;