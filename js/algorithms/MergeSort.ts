import Board from '../Board';
import Color from '../Color';

class MergeSort{
    board:Board;
    colorhandler:Color;
    constructor(board:Board, colorhandler:Color){
        this.board = board;
        this.colorhandler = colorhandler;
    }

    valueAt(i:number){
        return this.board.numArray[i];
    }

    async execute(){
        this.board.sortInProgress = true;

        await this.mergeSortAlgorithm(0, this.board.numArray.length);

        this.board.sortInProgress = false;
    }

    async mergeSortAlgorithm(start:number, end:number){
        if(end-start>1){
            let mid:number= parseInt(((end+start)/2).toString());

            //console.log(start + " " + mid + " " + end);

            await this.mergeSortAlgorithm(start, mid);
            await this.mergeSortAlgorithm(mid, end);
            await this.merge(start, mid, end);
        }
    }

    async merge(start:number, mid:number, end:number){
        let i = start;
        let j = mid;
        let k = 0;
        let index = 0;
        let temp:number[] = [];
        console.log(start + " " + mid + " " + end);
        console.log(temp);

        while(k<end-start){
            console.log("i,j: "+i+" "+j)
            if(i != mid)
                await this.colorhandler.setColor(i, 1);
            if(j != end)
                await this.colorhandler.setColor(j, 1);
            if(i != mid)
                await this.colorhandler.setColor(i, 0);
            if(j != end)
                await this.colorhandler.setColor(j, 0);

            if( i != mid && (j>=end || (this.valueAt(i) >= this.valueAt(j)))){
                temp.push(this.valueAt(i));
                i++; k++;
            }
            else{
                temp.push(this.valueAt(j));
                j++; k++;
            }


        }


        k = 0;
        i = start;

        while(i<end){
            await this.colorhandler.changeElement(i, temp[k]);
            await this.colorhandler.setColor(i, 0);

            this.board.numArray[i] = temp[k];
            k++; i++;
        }
    }
}

export default MergeSort;