let img = document.querySelector(".img");
let container = document.querySelector(".container555");

function phones(phone){
     img.src = phone;
}
function colors(color){
     container.style.background = color;
}
function color(color){
    h2.style.color = color;
}





function login()
{
  var uname = document.getElementById("text1").value;
  var pwd = document.getElementById("psw").value;
  var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  if(uname =='')
  {
   
  }

  else if(pwd =='')
  {
        
  }
  else if(!filter.test(uname))
  {
    alert(" el email dh fy 7aga 8alat ");
  }

  else if( pwd.length < 6 )
  {  
    alert("Password is less than usual");
  }
  else
  {
     alert('na3eed mn el 2awal ');
     window.location = "register.html";
    }
}

function signup()
{
  var uname = document.getElementById("text1").value;
  var pwd = document.getElementById("psw").value;
  var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  var lname = document.getElementById("lname").value;
  var fname = document.getElementById("fname").value;
  var validFirstName=/^[A-Za-z]+$/;
  var validLastName=/^[A-Za-z]+$/;
   
  if(fname =='')
  {

    
  }
  else if(!validFirstName.test(fname)){
    alert("el first name mesh kolo string wa dh maynfa3sh");
  }

  else if(lname=="")
  {
   
  }else if(!validLastName.test(lname)){
    alert("el last name mesh kolo string wa dh maynfa3sh ");
  }else{
    
    return true;
  }
 
  if(uname =='')
  {
  
  }
  else if(pwd =='')
  {
    alert("ana la 2ara password");
  }
  else if(!filter.test(uname))
  {
    alert(" el email dh fy 7aga 8alat ");
  }

  else if(pwd.length < 6 )
  {  alert.display = block;
    alert("Password is less than usual ");
  }


}
function contactus()
{
  var lname = document.getElementById("lname").value;
  var fname = document.getElementById("fname").value;
  var validFirstName=/^[A-Za-z]+$/;
  var validLastName=/^[A-Za-z]+$/;
  var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
   
  if(fname =='')
  {

    
  }
  else if(!validFirstName.test(fname)){
    alert("el first name mesh kolo string wa dh maynfa3sh");
  }

  else if(lname=="")
  {
   
  }else if(!validLastName.test(lname)){
    alert("el last name mesh kolo string wa dh maynfa3sh ");
  }else{
    
    return true;
  }
  if(uname =='')
  {
  
  }
  else if(!filter.test(uname))
  {
    alert(" el email dh fy 7aga 8alat ");
  }
}
