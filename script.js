
function getPreviousValue(){
	return document.getElementById("history-value").innerText;
}
function printPreviousValue(num){
	document.getElementById("history-value").innerText=num;
}
function getCurrentValue(){
	return document.getElementById("output-value").innerText;
}
function printCurrentValue(num){
	if(num==""){
		document.getElementById("output-value").innerText=num;
	}
	else{
		document.getElementById("output-value").innerText=getFormattedNumber(num);
	}	
}
function getFormattedNumber(num){
	if(num=="-"){
		return "";
    }
    var n = parseInt(num);
	var value = n.toLocaleString("en");
    return value;
}
function reverseNumberFormat(num){
	return Number(num.replace(/,/g,''));
}

var operator = document.getElementsByClassName("operator");
for(var i =0;i<operator.length;i++){
	operator[i].addEventListener('click',function(){

		if(this.id=="clear"){
			printPreviousValue("");
			printCurrentValue("");
		}
		else if(this.id=="backspace"){
			var output=reverseNumberFormat(getCurrentValue()).toString();
			if(output){//if output has a value
				output= output.substr(0,output.length-1);
				printCurrentValue(output);
			}
		}else if(this.id == "percentage"){
            var output = parseInt(document.getElementById("output-value").innerText);
			var result = output / 100;
			var output = document.getElementById('output-value');
			output.innerText = result;
        }
		else{
			var output=getCurrentValue();
			var history=getPreviousValue();
			console.log(output);
			console.log(history);
			if(output==""&&history!=""){
				if(isNaN(history[history.length-1])){
					history= history.substr(0,history.length-1);
				}
			}
			if(output!="" || history!=""){
				output= output==""?output:reverseNumberFormat(output);
				history=history+output;
				if(this.id=="="){
					if ((output+"").includes(".") || (history+"").includes(".")) {
						var result = document.getElementById('output-value');
						console.log(eval(history));
						result.innerText = eval(history);
					} else {
						var result=eval(history);
					if (result==NaN || result==Infinity) {
						var output = document.getElementById('output-value');
						output.innerText = 'Cannot divide by 0';
					} else {
						printCurrentValue(result);
					}
					}
					printPreviousValue("");
				}
				else{
					history=history+this.id;
					printPreviousValue(history);
					printCurrentValue("");
				}
			}
		}
		
	});
}
var number = document.getElementsByClassName("number");
for(var i =0;i<number.length;i++){
	number[i].addEventListener('click',function(){
        if (document.getElementById('output-value').innerText.includes(".")) {
			var output = document.getElementById('output-value');
			var text = output.innerText;
			text = text + this.innerText;
			output.innerText = text;
			console.log(text);
		} else {
			if (this.id == 'dot') {
				var output = document.getElementById('output-value');
				var text = output.innerText;
				console.log(text);
				if (!text.includes('.')) {
					text = text+".";
					output.innerText = text;
				}
				console.log(text);
				console.log(output.innerText);
			} else {
				var output=reverseNumberFormat(getCurrentValue());
			if(this.id=="changesign"){
				output = -1*output;
				printCurrentValue(output);
			}
			if(output!=NaN){ //if output is a number
				output=output+this.id;
				printCurrentValue(output);
			}
			}
		}
	});
}