import Board from "./Board";

class Color{
    speed:number;
    checkColor:string;
    unorderedColor:string;
    defaultColor:string;
    orderedColor:string;
    finalColor:string;

    constructor(speed:number){
        this.speed = speed;
        this.checkColor = "yellow";
        this.unorderedColor = "red";
        this.defaultColor = "blue";
        this.orderedColor = "green";
        this.finalColor = "voilet";
    }

    sleep(){
        return new Promise(resolve => setTimeout(resolve, this.speed));
    }

    async check(index:number){
        var element = document.getElementById(index.toString());

        element.style.backgroundColor = this.checkColor

        await this.sleep();
    }

    async setToCheck(index1:number, index2:number){
        await Promise.all([this.check(index1), this.check(index2)]);
    }

    updateSpeed(speed:number){
        this.speed = speed;
    }

    async swapTwoElements(index1:number, value1:number, index2:number, value2:number){
        await this.setToCheck(index1,index2);
        
        var elm1 = document.getElementById(index1.toString());
        var elm2 = document.getElementById(index2.toString());

        elm1.style.height = (value1*10).toString()+'px';
        elm2.style.height = (value2*10).toString()+'px';

        
    }
}


export default Color;