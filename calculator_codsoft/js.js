const display = document.getElementById("display");
function show_on_display(input) {
display.value += input;
}
function clearDisplay() {
display.value = "";
}
function operate() {
try{
display.value = eval(display.value);
}
catch(error){
display.value = "Error";
}
}