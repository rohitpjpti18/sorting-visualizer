import RandomNumbers from "./RandomNumbers";


class Board{
    numArray: number[];
    size: number;
    random: RandomNumbers;

    constructor(size:number){
        this.size = size;
        this.random = new RandomNumbers();
        this.numArray = [];

        this.generateArray();
    }


    generateNewBar(num:number, id:number){
        let container = document.getElementById("main-container");
        let newCol = document.createElement("div");
        newCol.className = 'column';

        let newBar = document.createElement("div");
        newBar.className = 'bar';
        newBar.id = id.toString();
        newBar.style.height = (num*10).toString()+'px';

        newCol.appendChild(newBar);
        container.appendChild(newCol);
    }

    generateArray(){
        let container = document.getElementById("main-container");
        while(container.hasChildNodes()){
            container.removeChild(container.childNodes[0]);
        }

        for(let i=0; i<this.size; i++){
            let newNum = this.random.GenerateRandomNumber(2, 50);
            this.generateNewBar(newNum, i);
        }
    }
}


export default Board;