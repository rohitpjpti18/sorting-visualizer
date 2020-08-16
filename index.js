var newArr = [];
var waitTime = 21;
var orderedColor = "#3fb04e";
var unorderedColor = "#d65151";
var checkingColor = "#e3a93d";
var defaultColor = "#6199f2";


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function generateArray(){
    var len = 50;
    newArr = [];

    
    var list = document.getElementById("main-container");
    while(list.hasChildNodes()){
        list.removeChild(list.childNodes[0]);
    }



    for(i = 0; i<len; i++){
        var num1 = Math.floor((Math.random() * 40) + 1);
        newArr.push(num1);
        var elm = "elm" + i.toString();

        let cont = document.getElementById("main-container");
        let newRow = document.createElement("div");
        let newClass1 = document.createAttribute("class");
        newClass1.value = "row";
        newRow.setAttributeNode(newClass1);

        let newBar = document.createElement("div");
        let newClass2 = document.createAttribute("class");
        let newId2 = document.createAttribute("id");
        newId2.value = elm;
        newClass2.value = "bar";
        newBar.setAttributeNode(newClass2);
        newBar.setAttributeNode(newId2);

        newRow.appendChild(newBar);
        cont.appendChild(newRow);

        let arr = newArr[i]*10;
        let arrInt = arr.toString() + "px";

        document.getElementById(elm).style.height = arrInt;
        // console.log(document.getElementById(elm).style.height);
    }
}

async function swapBar(a, b){
    var elma = "elm" + a.toString();
    var elmb = "elm" + b.toString();

    var heiat = newArr[a]*10;
    var heia = heiat + "px";
    var heibt = newArr[b]*10;
    var heib = heibt + "px"; 

    //console.log(heia + " " + heib);

    document.getElementById(elma).style.backgroundColor = unorderedColor;
    document.getElementById(elmb).style.backgroundColor = unorderedColor;
    await sleep(waitTime);
    document.getElementById(elma).style.height = heia;
    document.getElementById(elmb).style.height = heib;
}

async function checkBar(a, b){
    var elma = "elm" + a.toString();
    var elmb = "elm" + b.toString();

    document.getElementById(elma).style.backgroundColor = checkingColor;
    document.getElementById(elmb).style.backgroundColor = checkingColor;
    await sleep(waitTime);

}

async function checkBarSingle(a){
    var elma = "elm" + a.toString();

    document.getElementById(elma).style.backgroundColor = checkingColor;
    await sleep(waitTime);
}





async function nowCorrectBar(a, b){
    var elma = "elm" + a.toString();
    var elmb = "elm" + b.toString();

    document.getElementById(elma).style.backgroundColor = orderedColor;
    document.getElementById(elmb).style.backgroundColor = orderedColor;
    await sleep(waitTime);

}

async function nowCorrectBarSingle(a){
    var elma = "elm" + a.toString();
    document.getElementById(elma).style.backgroundColor = orderedColor;
    await sleep(waitTime);
}



async function nowNormalBar(a, b){
    var elma = "elm" + a.toString();
    var elmb = "elm" + b.toString();

    document.getElementById(elma).style.backgroundColor = defaultColor;
    document.getElementById(elmb).style.backgroundColor = defaultColor;
    await sleep(waitTime);
}

async function nowNormalBarSingle(a){
    var elma = "elm" + a.toString();

    document.getElementById(elma).style.backgroundColor = defaultColor;
    await sleep(waitTime);
}

async function greenBar(elm){
    var currentBar = document.getElementById(elm);
    document.getElementById(elm).style.backgroundColor = orderedColor;
    await sleep(waitTime);
}

async function traverse(){
    for(var i = 0; i<newArr.length; i++){
        var elm = "elm" + i.toString();
        await greenBar(elm);
    }
}

async function bubbleSort(){
    var n = newArr.length - 1;
    do{
        swapp = false;
        for(var i = 0; i < n; i++){
            await checkBar(i, i+1);
            if(newArr[i] < newArr[i+1]){
                var temp = newArr[i];
                newArr[i] = newArr[i+1];
                newArr[i+1] = temp;
                swapp = true;
                await swapBar(i, i+1);
            }
            await nowCorrectBar(i, i+1);
            await nowNormalBar(i, i+1);
            
            //console.log(i + " " + j + " " );
        }
        n--;
    }while(swapp);

    await traverse();
}

async function selectionSort() {

    let len = newArr.length;
    for (let i = 0; i < len; i++) {
        let min = i;
        await checkBarSingle(i);
        for (let j = i + 1; j < len; j++) {
            await checkBarSingle(j);
            if (newArr[min] < newArr[j]) {
                min = j;
            }
            await nowNormalBarSingle(j);
        }
        if (min !== i) {
            let temp = newArr[i];
            newArr[i] = newArr[min];
            newArr[min] = temp;
            await swapBar(i, min);
            await nowCorrectBar(i, min);
        }
        await nowNormalBar(i, min);
    }

    await traverse();
}



async function quickSort(origArray){
	if (origArray.length <= 1) { 
		return origArray;
	} else {

		var left = [];
		var right = [];
        var newArray = [];
        var last = origArray.length;
        checkBarSingle(last);
		var pivot = origArray.pop();
		var length = origArray.length;

		for (var i = 0; i < length; i++) {
			if (origArray[i] <= pivot) {
				left.push(origArray[i]);
			} else {
				right.push(origArray[i]);
			}
		}

		return newArray.concat(quick_Sort(left), pivot, quick_Sort(right));
	}
}

async function quickSort(){
    await quickSortActual(0, 49);

    await traverse();
}


async function quickSortActual(start, end) { 
    if(start >= end) { 
        return; 
    } 
    let index = await partition(start, end);  
      
    await Promise.all([quickSortActual(start, index-1), 
            quickSortActual(index+1, end)]);
} 
  

async function partition(start, end) { 
    let pivotIndex = start; 
    let pivotValue = newArr[end]; 
    
    await checkBarSingle(end);
    for(let i = start; i < end; i++) {
        await checkBarSingle(i); 
        if(newArr[i] > pivotValue) { 
            //swap(arr, i, pivotIndex); 
            var temp = newArr[i];
            newArr[i] = newArr[pivotIndex];
            newArr[pivotIndex] = temp;
            await swapBar(i, pivotIndex); 
            await nowCorrectBar(i, pivotIndex);
            await nowNormalBar(i, pivotIndex);
            pivotIndex++;
        } 
        await nowNormalBarSingle(i);
    } 
      
    //await swap(arr, pivotIndex, end); 
    var temp = newArr[end];
    newArr[end] = newArr[pivotIndex];
    newArr[pivotIndex] = temp;
    await swapBar(end, pivotIndex);
    await nowCorrectBar(end, pivotIndex);
    await nowNormalBar(end, pivotIndex);
      
    return pivotIndex; 
} 
