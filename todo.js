const adder = document.querySelector('.add');
const list = document.querySelector('.list');
const taskname =document.querySelector('.list-name');
const todo = document.querySelector('.tasks')
const task =document.querySelector('.tasked');
const add_task=document.querySelector('.add-task');
const rem =document.querySelector('#rem');

let l = undefined;
adder.addEventListener('submit',(e)=>{
    e.preventDefault();
    const val=adder.querySelector('#newlist').value;
    if(listnames.length==1){
    taskname.innerHTML=listnames[0];
  }
    if(listnames.includes(val)){
        const err =document.querySelector('.error');
        err.innerHTML='<strong>List of this name already exists</strong>';
        adder.querySelector('input').value='';
        setTimeout(()=> err.innerHTML='',1900);
    }
    else if(val.length!==0) {   
        localStorage.setItem(val,'[]');
        showlist();
        adder.querySelector('input').value='';
        location.reload();
    }
})

add_task.addEventListener('submit',(e)=>{
  e.preventDefault();
  let valu=add_task.querySelector('#newtask').value;
  if(valu.length!==0) {
    for(i=0;i<tsk.length;i++){
      if(Object.keys(Object.entries(tsk)[i][1])[0]==valu){
        alert('same name task exists choose another name');
        add_task.querySelector('input').value='';
        throw'same name task exists choose another name';
      }}
      if(localStorage.getItem(taskname.textContent)!=='[]'){  
        l=JSON.parse(localStorage.getItem(taskname.textContent));
        l.push({[valu]:'no'});
        }else{
          console.log('task list empty');
          l=[{[valu]:'no'}];
        }
        localStorage.setItem(`${taskname.textContent}`,'[]');
        localStorage.setItem(`${taskname.textContent}`,JSON.stringify(l));
        add_task.querySelector('input').value='';
        location.reload();
  }
})
task.addEventListener('change',(e)=>{
  let m=0;
  tsk.forEach((v)=>{ 
    if(Object.keys(v)[0]==e.target.id){
      if(tsk[m][`${e.target.id}`]=='no'){
         tsk[m][`${e.target.id}`]='yes';
         localStorage.setItem(`${taskname.textContent}`,JSON.stringify(tsk));
         rem_tsk();
        }else{
        tsk[m][`${e.target.id}`]='no';
         localStorage.setItem(`${taskname.textContent}`,JSON.stringify(tsk));
         rem_tsk();
        }
    }else{
      m++;
    }
    
  })
})
const listnames=Object.keys({...localStorage});

taskname.innerHTML= listnames[0];
list.addEventListener('click',(e)=>{
  y=e.target.className;
  if(y==null || y==undefined || y=='list'){
    //pass;
  }else{
      taskname.innerHTML=y;
      sessionStorage.setItem('last',y); 
      location.reload(); 
  }
}) 
if(listnames.length==0){
    todo.setAttribute("style","display:none")
  }else if(listnames.length==1){
    taskname.innerHTML=listnames[0];
  }else{
    taskname.innerHTML= sessionStorage.getItem("last");
  }
let tsk=JSON.parse(localStorage.getItem(taskname.textContent));
//functions
showlist=()=>{
      listnames.forEach((key)=>{
        list.innerHTML+=`<li class="${key}">${key}</li>`; 
      }) 
}

showtask=()=>{
      // let tsk = JSON.parse(localStorage.getItem(taskname.textContent));
      tsk.forEach((key)=>{
        task.innerHTML+=`<br>
        <input type="checkbox" name="check-task" id="${Object.keys(key)[0]}">
        <label for="${Object.keys(key)[0]}">${Object.keys(key)[0]}</label>
        <br>`;
})
}
check=()=>{
  // let tsk = JSON.parse(localStorage.getItem(taskname.textContent));
  tsk.forEach((key)=>{
    if(Object.values(key)[0]==='yes'){
      document.getElementById(Object.keys(key)[0]).checked = true;
      
    }
  })
}
clear_comp_tsk=()=>{
  let c =confirm('Are you sure you want to clear completed tasks?');
  if(c===true){ 
    let uncomp = [];
    let m=0
    tsk.forEach((key)=>{
      if(tsk[m][Object.keys(key)]=='no'){
        uncomp.push(tsk[m]);
        m++;
      }else{
        m++;
      }
    localStorage.setItem(`${taskname.textContent}`,JSON.stringify(uncomp));
    location.reload();
    })
  }else{
    //pass;
  }
}
dele_list=()=>{
  let c =confirm('Are you sure you want to delete this list?');
  if(c===true){
    sessionStorage.setItem('last','');
    localStorage.removeItem(`${taskname.textContent}`);
    location.reload();
  }else{
    location.reload();
  }
}
rem_tsk=()=>{
  let n=0
  for(i=0;i<tsk.length;i++){
    if((Object.values(tsk[i])[0])=='no'){
       n+=1;
    }
  }
  rem.textContent=`${n} Remaining tasks` ; 
}

try{
  showlist();
  showtask();
  check();
  rem_tsk();
}catch(e){
  console.log(e);
}