var x = document.getElementById('x');
var y = document.getElementById('y');
var z = document.getElementById('z');
var fpic = document.getElementById('first_pic');
var fpicr = document.getElementById('first_picr');
var spic = document.getElementById('second_pic');
var spicr = document.getElementById('second_picr');
var tpic = document.getElementById('third_pic');
var tpicr = document.getElementById('third_picr');
var fopic = document.getElementById('fourth_pic');
var fopicr = document.getElementById('fourth_picr');
var fipic = document.getElementById('fifth_pic');
var fipicr = document.getElementById('fifth_picr');
var sipic = document.getElementById('six_pic');
var sipicr = document.getElementById('six_picr');

 
  z.addEventListener('mouseenter',function(){
    y.style.display = 'block';
    x.style.display = 'none';
   
  });

  z.addEventListener('mouseleave', function(){
    y.style.display = 'none';
    x.style.display = 'block';

  });
  fpic.addEventListener('mouseenter',function(){
    fpic.style.display = 'none';   
    fpicr.style.display = 'block';
   
  });

  fpicr.addEventListener('mouseleave', function(){
    fpic.style.display = 'block';
    fpicr.style.display = 'none';

  });

  spic.addEventListener('mouseover',function(){
    spic.style.display = 'none';
    spicr.style.display = 'block';
   
  });

  spicr.addEventListener('mouseout', function(){
    spic.style.display = 'block';
    spicr.style.display = 'none';

  });
  tpic.addEventListener('mouseover',function(){
    tpic.style.display = 'none';
    tpicr.style.display = 'block';
   
  });

  tpicr.addEventListener('mouseout', function(){
    tpic.style.display = 'block';
    tpicr.style.display = 'none';

  });




  fopicr.addEventListener('mouseenter',function(){
    fopic.style.display = 'block';   
    fopicr.style.display = 'none';
   
  });

  fopic.addEventListener('mouseleave', function(){
    fopic.style.display = 'none';
    fopicr.style.display = 'block';

  });

  fipicr.addEventListener('mouseover',function(){
    fipic.style.display = 'block';
    fipicr.style.display = 'none';
   
  });

  fipic.addEventListener('mouseout', function(){
    fipic.style.display = 'none';
    fipicr.style.display = 'block';

  });
  sipicr.addEventListener('mouseover',function(){
    sipic.style.display = 'block';
    sipicr.style.display = 'none';
   
  });

  sipic.addEventListener('mouseout', function(){
    sipic.style.display = 'none';
    sipicr.style.display = 'block';

  });

