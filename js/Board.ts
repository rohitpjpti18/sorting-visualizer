import RandomNumbers from "./utilities/RandomNumbers";


class Board{
    numArray: number[];
    size: number;
    random: RandomNumbers;
    columnWidth: number

    constructor(size:number){
        this.size = size;
        this.random = new RandomNumbers();
        this.numArray = [];
        this.columnWidth = 100/size;

        this.generateArray();
    }


    generateNewBar(num:number, id:number){
        let container = document.getElementById("main-container");
        let newCol = document.createElement("div");
        newCol.className = 'column';
        newCol.style.width = this.columnWidth.toString() + '%';

        let newBar = document.createElement("div");
        newBar.className = 'bar';
        newBar.id = id.toString();
        newBar.style.height = (num*10).toString()+'px';

        newCol.appendChild(newBar);
        container.appendChild(newCol);
    }

    generateArray(){
        this.numArray = []
        let container = document.getElementById("main-container");
        while(container.hasChildNodes()){
            container.removeChild(container.childNodes[0]);
        }

        for(let i=0; i<this.size; i++){
            let newNum = this.random.GenerateRandomNumber(2, 50);
            this.numArray.push(newNum);
            this.generateNewBar(newNum, i);
        }
    }

    updateSize(size:number){
        this.size = size;
        this.columnWidth = 100/size;
        this.generateArray();
    }
}


export default Board;