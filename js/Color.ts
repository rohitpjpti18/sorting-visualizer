import { updateArrayTypeNode } from "typescript";
/*
Color           ColorID
default         0
check           1
ordered         2
unordered       3
final           4
*/

import Board from "./Board";

class Color{
    speed:number;
    checkColor:string;
    unorderedColor:string;
    defaultColor:string;
    orderedColor:string;
    finalColor:string;
    colorArray:string[];

    constructor(speed:number){
        this.speed = speed;
        this.checkColor = "#e8dc7d";
        this.unorderedColor = "#c45c5c";
        this.defaultColor = "#6199f2";
        this.orderedColor = "#66de7e";
        this.finalColor = "#9983a3";
        this.colorArray = [
                            this.defaultColor, 
                            this.checkColor, 
                            this.orderedColor,
                            this.unorderedColor,
                            this.finalColor    
                        ]
    }

    sleep(){
        return new Promise(resolve => setTimeout(resolve, this.speed));
    }

    async setColor(index:number, colorId:number){
        var element = document.getElementById(index.toString());

        element.style.backgroundColor = this.colorArray[colorId]


        await this.sleep();
    }

    async set2IndexToDefault(index1:number, index2:number){
        await Promise.all([this.setColor(index1, 0), this.setColor(index2, 0)]);
    }

    async set2IndexToCheck(index1:number, index2:number){
        await Promise.all([this.setColor(index1, 1), this.setColor(index2, 1)]);
    }

    async set2IndexToOrdered(index1:number, index2:number){
        await Promise.all([this.setColor(index1, 2), this.setColor(index2, 2)]);
    }

    async set2IndexToUnordered(index1:number, index2:number){
        await Promise.all([this.setColor(index1, 3), this.setColor(index2, 3)]);
    }

    async set2IndexToFinal(index1:number, index2:number){
        await Promise.all([this.setColor(index1, 4), this.setColor(index2, 4)]);
    }

    updateSpeed(speed:number){
        this.speed = speed;
    }

    async arrangeTwoElements(index1:number, value1:number, index2:number, value2:number){
        await Promise.all([
            this.changeElement(index1, value1),
            this.changeElement(index2, value2)
        ]);
    }

    async changeElement(index:number, value:number){
        await this.setColor(index,3);

        var elm = document.getElementById(index.toString());
        elm.style.height = (value*10).toString()+'px';

        await this.setColor(index,2);
    }

    async traverse(array:number[]){
        for(let i = 0; i<array.length; i++){
            await this.setColor(i, 4);
        }
    }
}


export default Color;