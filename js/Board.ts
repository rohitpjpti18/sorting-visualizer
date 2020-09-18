/*
Algorithm Name          Id
Bubble Sort             0
Insertion Sort          1
Selection Sort          2
Merge Sort              3
Quick Sort              4
Heap Sort               5
*/

import RandomNumbers from "./utilities/RandomNumbers";
import Color from "./Color";
import BubbleSort from './algorithms/BubbleSort';
import QuickSort from "./algorithms/QuickSort";
import MergeSort from "./algorithms/MergeSort";
import SelectionSort from "./algorithms/SelectionSort";
import HeapSort from "./algorithms/HeapSort";

class Board{
    numArray: number[];
    size: number;
    random: RandomNumbers;
    columnWidth: number;

    sortInProgress: boolean;
    algoID:number;
    colorHandler:Color;

    constructor(size:number, colorhandler:Color){
        this.size = size;
        this.random = new RandomNumbers();
        this.numArray = [];
        this.columnWidth = 100/size;
        this.algoID = -1;
        this.colorHandler = colorhandler;

        this.generateArray();

        this.sortInProgress = false;
    }


    generateNewBar(num:number, id:number, size:number){
        let container = document.getElementById("main-container");
        let newCol = document.createElement("div");
        newCol.className = 'column';
        newCol.style.width = this.columnWidth.toString() + '%';

        let newBar = document.createElement("div");
        newBar.className = 'bar';
        newBar.id = id.toString();
        if(size>50 && size<101){
            newBar.style.width = '75%';
        }
        else if(size>100){
            newBar.style.width = '67%';
        }
        else if(size>19 && size<51){
            newBar.style.width = '90%';
        }
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
            this.generateNewBar(newNum, i, this.size);
        }
    }

    updateSize(size:number){
        this.size = size;
        this.columnWidth = 100/size;
        this.generateArray();
    }

    swap(index1:number, index2:number){
        var temp = this.numArray[index1];
        this.numArray[index1] = this.numArray[index2];
        this.numArray[index2] = temp;
    }


    async startSorting(){
        switch(this.algoID){
            case 0:
                let bubbleSort = new BubbleSort(this, this.colorHandler);
                await bubbleSort.execute();
                await this.colorHandler.traverse(this.numArray);
                break;

            case 1:
                let selectionSort = new SelectionSort(this, this.colorHandler);
                await selectionSort.execute();
                await this.colorHandler.traverse(this.numArray);
                break;

            case 3:
                let mergesort = new MergeSort(this, this.colorHandler);
                await mergesort.execute();
                //console.log(this.numArray);
                await this.colorHandler.traverse(this.numArray);
                break;

            case 4:
                let quicksort = new QuickSort(this, this.colorHandler);
                await quicksort.execute();
                await this.colorHandler.traverse(this.numArray);
                break;

            case 5:
                let heapsort = new HeapSort(this, this.colorHandler);
                await heapsort.execute();
                await this.colorHandler.traverse(this.numArray);
                break;

            default:
                alert("No Algorithm Selected. Please select a sorting algorithm")
                console.log("no algorithm selected");
        }
    }
}


export default Board;