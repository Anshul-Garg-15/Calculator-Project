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
	var n = Number(num);
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
		}
		else{
			var output=getCurrentValue();
			var history=getPreviousValue();
			if(output==""&&history!=""){
				if(isNaN(history[history.length-1])){
					history= history.substr(0,history.length-1);
				}
			}
			if(output!="" || history!=""){
				output= output==""?output:reverseNumberFormat(output);
				history=history+output;
				if(this.id=="="){
					var result=eval(history);
					printCurrentValue(result);
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
		var output=reverseNumberFormat(getCurrentValue());
		if(output!=NaN){ //if output is a number
			output=output+this.id;
			printCurrentValue(output);
		}
	});
}