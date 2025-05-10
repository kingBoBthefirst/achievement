let Data = document.getElementById("Data");
let search = document.getElementById("search");
let submitBtn;
$(document).ready(() => {
    searchByName("").then(() => {
        $(".loading-screen").fadeOut(500)
        $("body").css("overflow", "visible")

    })
})

categories();

function Search(){
Data.innerHTML="";
search.innerHTML=`    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchbyname(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`;

}
function openSideNav() {
    $(".sidenav").animate({
        left: 0
    }, 500)


    $(".open-close-icon").removeClass("fa-bars");
    $(".open-close-icon").addClass("fa-x");


    for (let i = 0; i < 5; i++) {
        $(".first-nav li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}

function closeSideNav() {

    $(".sidenav").animate({
        left: -250
    }, 500)

    $(".open-close-icon").addClass("fa-bars");
    $(".open-close-icon").removeClass("fa-x");


    $(".first-nav li").animate({
        top: 300
    }, 500)
}
closeSideNav()
$(".second-nav i.open-close-icon").click(() => {
    if ($(".sidenav").css("left") == "0px") {
        closeSideNav()
    } else {
        openSideNav()
    }
})

async function categories() {
    search.innerHTML='';
    Data.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()
    display(response.categories)
    console.log(response)
}
async function display(arr) {
    let content = '';
    for (i = 0; i < arr.length; i++) {
        content += `<div class="col-md-3">
    <div onclick="filterbycategory('${arr[i].strCategory}')" class="meal cursor-pointer">
        <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" srcset="">
        <div class="meal-layer ">
            <h3>${arr[i].strCategory}</h3>
            <p>${arr[i].strCategoryDescription.split(" ").slice(0, 10).join(" ")}</p>
        </div>
    </div>
</div>
`
    }

    Data.innerHTML = content;
}


async function filterbycategory(str) {
    console.log(str);
    Data.innerHTML = ""
    let response2 = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${str}`)
    response2 = await response2.json()
    console.log(response2.meals)
    displaycategorymeals(response2.meals)
}

async function displaycategorymeals(str) {
    let content = '';
    for (i = 0; i < str.length; i++) {
        content += `<div class="col-md-3">
    <div onclick="mealcategoryingredient('${str[i].idMeal}')" class="meal cursor-pointer">
        <img class="w-100" src="${str[i].strMealThumb}" alt="" srcset="">
        <div class="meal-layer ">
            <h3>${str[i].strMeal}</h3>
        </div>
    </div>
</div>
`
    }

    Data.innerHTML = content;

}
async function mealcategoryingredient(str) {
    closeSideNav()
    Data.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${str}`);
    response = await response.json()
    console.log(response.meals[0])
    displaycategorymealsingredient(response.meals[0])

}

async function displaycategorymealsingredient(str) {
    search.innerHTML = "";
    let content = '';
    let ing = '';
    
        for (var j = 0; j<=20; j++) {
            if(str[`strIngredient${j}`]){
                ing += `<li class="alert alert-info m-2 p-1">${str[`strMeasure${j}`]} ${str[`strIngredient${j}`]}</li>`
            }
        }

        content += ` <div class=" meal-d col-md-6">
                    <img src=${str.strMealThumb} class="rounded-1" width='100%'/>
                    <h3>${str.strMeal}</h3>
                </div>
                <div class="col-md-6">
                    <Div>
                    <h3 style='color:white;'>instructions</h3>
                    <p style='color:white;'>${str.strInstructions}</p>
                </Div>
                <div>
                    <h3 style='color:white;'>Area</h3><span style='color:white;'>${str.strArea}</span>
                    <h3 style='color:white;'>Category</h3><span style='color:white;'>${str.strCategory}</span>
                    <div>
                    <h3 style='color:white;'>Recipes:</h3>
                    <ul class="ingred list-unstyled d-flex g-3 flex-wrap">
                             ${ing}
                    </ul>
                     </div>
                    <div>
                    <h3 style='color:white;'>Tags:</h3>
                    <a target="_blank" href="https://www.bbcgoodfood.com/recipes/15-minute-chicken-halloumi-burgers" class="btn btn-success">Source</a>
                    <a target="_blank" href="" class="btn btn-danger">Youtube</a>
                    </div>
               

                </div>
                </div>
 `


    Data.innerHTML = content;
}

async function area() {
    search.innerHTML='';
    Data.innerHTML = ""
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
    console.log(respone.meals);
    Area(respone.meals)
}
function Area(str) {
    let content = "";

    for (let i = 0; i < str.length; i++) {
        content += `
        <div class="col-md-3">
                <div onclick="filterbyarea('${str[i].strArea}')" class="rounded-2 text-center cursor-pointer text-light">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${str[i].strArea}</h3>
                </div>
        </div>`
    }
    Data.innerHTML = content
}
async function filterbyarea(str){

    Data.innerHTML = ""
    let response2 = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${str}`)
    response2 = await response2.json()
    displayareameals(response2.meals)
}
async function displayareameals(str) {
    let content = '';
    for (i = 0; i < str.length; i++) {
        content += `<div class="col-md-3">
    <div onclick="mealcategoryingredient('${str[i].idMeal}')" class="meal cursor-pointer">
        <img class="w-100" src="${str[i].strMealThumb}" alt="" srcset="">
        <div class="meal-layer ">
            <h3>${str[i].strMeal}</h3>
        </div>
    </div>
</div>
`
}

 Data.innerHTML = content;

}

async function ingredient(){
    search.innerHTML='';
    Data.innerHTML = ""
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    Ingredient(respone.meals)
}
function Ingredient(str) {
    let content = "";
    for (let i = 0; i < str.length; i++) {
        content += `
        <div class="col-md-3">
                <div onclick="filterbyingredient('${str[i].strIngredient}')" class="rounded-2 text-center cursor-pointer text-light">
                        <i class="fas fa-drumstick-bite fa-4x"></i>
                        <h3>${str[i].strIngredient}</h3>
                </div>
        </div>`
    }
    Data.innerHTML = content
}
async function filterbyingredient(str){
    Data.innerHTML = ""
    let response2 = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${str}`)
    response2 = await response2.json()
    displaymealsbyingredient(response2.meals)
}
async function displaymealsbyingredient(str) {
    let content = '';
    for (i = 0; i < str.length; i++) {
        content += `<div class="col-md-3">
    <div onclick="mealcategoryingredient('${str[i].idMeal}')" class="meal cursor-pointer">
        <img class="w-100" src="${str[i].strMealThumb}" alt="" srcset="">
        <div class="meal-layer ">
            <h3>${str[i].strMeal}</h3>
        </div>
    </div>
</div>
`
}

 Data.innerHTML = content;

}
async function contactus(){
    search.innerHTML='';
    Data.innerHTML='';
    Data.innerHTML=`
            <form>
            <div class="row">
                <div class=" contactin col-md-6 col-12 ">
                <input onkeyup="Name(); btn()"  class="name form-control"  type="text" placeholder="Enter Your Name">
                <div class="error_name alert alert-danger d-none" role="alert">
                </div> 
                <input onkeyup="Email(); btn()" class="email form-control  " type="text" placeholder="Enter Your E-mail">
                <div class="error_email alert alert-danger d-none" role="alert">
                </div>  
                <input onkeyup="Phone(); btn()"  class="phone form-control  " type="text" placeholder="Enter Your Phone"> 
                <div class="error_phone alert alert-danger d-none " role="alert">
                </div>                 
                </div>
                <div class=" contactin col-md-6 col-12 ">
                <input onkeyup="Age(); btn()"  class="age form-control " type="number" placeholder="Enter Your Age">
                          <div class="error_age alert alert-danger d-none " role="alert">
                        </div>    
                <input onkeyup="Password(); btn()"  class="password form-control  " type="password" placeholder="Enter Your Password">
                    <div class="error_pass alert alert-danger d-none " role="alert">
                    </div>    
                <input onkeyup="Repassword(); btn()"  class="repassword form-control " type="password" placeholder="Repassword"> 
                    <div class="error_repass alert alert-danger  d-none " role="alert">
                    </div>    
                </div>
                   <button onclick="button()" id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
             </div>
                   
            </form>
               `
}
var namechecker =false;
var emailchecker=false;
var agechecker=false;
var phonechecker=false;
var passchecker=false;
var repasschecker=false;


function Name(){

    function nameValidation() {
        return (/^[a-zA-Z ]+$/.test(document.querySelector(".name").value))
    }
    if(nameValidation()==true){
        document.querySelector('.error_name').classList.add("d-none");
        namechecker=true;
    }
    else{

        document.querySelector('.error_name').classList.remove("d-none");
        document.querySelector('.error_name').classList.add("d-block");
        document.querySelector('.error_name').innerHTML = "enter your name with no special characters or numbers";
        namechecker=false;
    }

}
function Email(){

    function validateEmail() {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return (regex.test(document.querySelector(".email").value))
      }
    if(validateEmail()){
        document.querySelector('.error_email').classList.add("d-none");
        emailchecker=true;  
    }
    else{
     
        document.querySelector('.error_email').classList.remove("d-none");
        document.querySelector('.error_email').classList.add("d-block");
        document.querySelector('.error_email').innerHTML = "enter email in this format example@example.com";
        emailchecker=false;  
    }

}

function Phone(){
    function validatePhoneNumber() {
        const regex = /^(\+?\d{1,3})?[-.\s]?(\(?\d{3}\)?)[-.\s]?\d{3}[-.\s]?\d{4}$/;
          return (regex.test(document.querySelector(".phone").value));
      }
    if(validatePhoneNumber()){
        document.querySelector('.error_phone').classList.add("d-none");
        phonechecker=true;
    }
    else{
        
        document.querySelector('.error_phone').classList.remove("d-none");
        document.querySelector('.error_phone').classList.add("d-block");
        document.querySelector('.error_phone').innerHTML = "enter phone number correctly ";
        phonechecker=false;
    }

}
function Age(){
    var agereal=document.querySelector(".age").value

    if( agereal > 0 && agereal < 120){
        document.querySelector('.error_age').classList.add("d-none");
        agechecker=true;
    } 
    else{
        
        document.querySelector('.error_age').classList.remove("d-none");
        document.querySelector('.error_age').classList.add("d-block");
        document.querySelector('.error_age').innerHTML = "enter phone number correctly your suitable age between 0 and 100 ";
        agechecker=false;

    }

}
function Password(){

    function validatePassword() {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return (passwordRegex.test(document.querySelector(".password").value));
    }

    if(validatePassword()){
        document.querySelector('.error_pass').classList.add("d-none");
        passchecker=true;
    } 
    else{
        
        document.querySelector('.error_pass').classList.remove("d-none");
        document.querySelector('.error_pass').classList.add("d-block");
        document.querySelector('.error_pass').innerHTML = "enter password it should be 8 characters with at least one special chracter and one number";
        passchecker=false;
    }

}
function Repassword(){

    if(document.querySelector(".password").value == document.querySelector(".repassword").value){
        document.querySelector('.error_repass').classList.add("d-none");
        repasschecker=true; 
    } 
    else{
        
        document.querySelector('.error_repass').classList.remove("d-none");
        document.querySelector('.error_repass').classList.add("d-block");
        document.querySelector('.error_repass').innerHTML = "not the same password";
        repasschecker=false;

    }

}
function btn(){
    if (namechecker==true &&  emailchecker==true &&  phonechecker==true &&    agechecker==true &&    passchecker==true &&    repasschecker == true){
        document.querySelector("#submitBtn").removeAttribute('disabled')
        
    }
    else{
        document.querySelector("#submitBtn").setAttribute('disabled', "true")
    }
}




async function searchbyname(str) {
    closeSideNav()
    Data.innerHTML =""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${str}`)
    response = await response.json()
   displaysearchmeal(response.meals)
    $(".inner-loading-screen").fadeOut(300)

}
function displaysearchmeal(str){
    let content = '';
    for (i = 0; i < str.length; i++) {
        content += `<div class="col-md-3">
    <div onclick="mealcategoryingredient('${str[i].idMeal}')" class="meal cursor-pointer">
        <img class="w-100" src="${str[i].strMealThumb}" alt="" srcset="">
        <div class="meal-layer">
            <h3>${str[i].strMeal}</h3>
        </div>
    </div>
</div>
`
}
Data.innerHTML=content;

}


async function searchByLetter(str) {
    closeSideNav()
    Data.innerHTML =""
     $(".inner-loading-screen").fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${str}`)
    response = await response.json()
   displaysearchmeal(response.meals)
   $(".inner-loading-screen").fadeOut(300)
}
function displaysearchmeal(str){
    let content = '';
    for (i = 0; i < str.length; i++) {
        content += `<div class="col-md-3">
    <div onclick="mealcategoryingredient('${str[i].idMeal}')" class="meal cursor-pointer">
        <img class="w-100" src="${str[i].strMealThumb}" alt="" srcset="">
        <div class="meal-layer">
            <h3>${str[i].strMeal}</h3>
        </div>
    </div>
</div>
`
}
Data.innerHTML=content;

}

