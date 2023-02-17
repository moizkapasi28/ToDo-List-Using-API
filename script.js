let taskList = [];
let tasCompleted = [];
let task = $("#form3").val();
let des = $("#form4").val();
var index;
var content;
var url = "https://internapp.vercel.app/Moiz%20Kapasi/todos/";

window.onload = (e)=>{
  document.getElementById('form3').focus();
  console.log("page is fully loaded")
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  })
    .then((response) => response.json())
    .then((json) => {
      taskList = json;
      console.log(taskList)
      taskDisplay(taskList);
    });
}

function validation(input) {
  let returnVal = true;
  if (input.trim() == "") {
    $("#error").css("display", "block");
    $("#error").text("*Input is Empty");
    setTimeout(() => {
      $("#error").css("display", "block");
      $("#error").text("");
    }, 4000);
    returnVal = false;
  } else {
    $("#error").text("");
  }
  return returnVal;
}

function taskDisplay(taskList) {
  $("#taskpending").html("");
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].completed == false) {
      $("#taskpending").append(`<li
    class="list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2">
    <div class="d-flex align-items-center">
      <span class="checked"><input class="form-check-input" id="checkbx" type="checkbox" value="" aria-label="..." onChange="check('${taskList[i].id}',${i})"/></span>
      ${taskList[i].title}</br>${taskList[i].description}
      <button class="btnremove" style="floadt:right" id="btnremove" onclick="itemDelete('${taskList[i].id}',${i})" ><span class="span">Delete</span></button>
    </div>
  </li>`);
    }
    if (taskList[i].completed == true) {
      $("#taskcompleted")
        .append(
          `<li
  class="list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2">
  <div class="d-flex align-items-center">
  <span class="unchecked"><input class="form-check-input" id="uncheckbx" type="checkbox" value="" aria-label="..." onChange="uncheck('${taskList[i].id}',${i})" checked/></span>
    ${taskList[i].title}<button class="btnremove" onclick="itemDelete('${taskList[i].id}',${i});" ><span class="span">Delete</span></button>
  </div>
  </li>`
        )
        .css({
          "text-decoration": "line-through solid black 3px",
        });
    }
  }
}
function check(index,id) {
  fetch(url + index, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      completed: true,
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
  taskList[id].completed = true;
  $("#taskcompleted").html("")
  taskDisplay(taskList);
}
function uncheck(index,id) {
  fetch(url + index, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      completed: false,
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
  taskList[id].completed = false;
  $("#taskcompleted").html("")
  taskDisplay(taskList);
}
$(document).ready(function () {
  $("#btnsubmit").click(function (e) {
    $("#taskpending").html("");
    $("#taskcompleted").html("");
    e.preventDefault();
    let task = $("#form3").val();
    let des = $("#form4").val();
    $("#form3").val("").focus();
    $("#form4").val("");
    if (validation(task)) {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: enCode(task),
          description: enCode(des),
          completed: false,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          taskList = [...taskList, json];
          $("#form3").val("");
          $("#form4").val("");
          console.log(taskList);
          taskDisplay(taskList);
        });
    }
  });
});
function enCode(text){
  const entities ={
      "<":"&lt;",
      ">":"&gt;",
      "/":"&#47;",
      ":":"&#58;",
      ".":"&#xb7;",
  };
  let arr = text.split("").map(function(elem){
      if(entities.hasOwnProperty(elem)){
          return entities[elem]; 
      }else{
          return elem;
      }
  });
  return arr.join("") 
}
function itemDelete(id,i) {
  console.log(id);
  fetch(url + id, {
    method: "DELETE",
  }).then((response) => response.json())
  taskList.splice(i,1)
  $("#taskcompleted").html("")
  taskDisplay(taskList)
}
