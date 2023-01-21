var firstbtn = document.getElementById("first-btn");
var model = document.querySelector(".model");
var cross = document.getElementById("cross");
var register = document.querySelector("#register-btn");
var update = document.querySelector("#update-btn");
var registerform = document.getElementById("register-form");
var tableData = document.querySelector("#table-data");
var eye = document.getElementsByClassName("eye");
var profile_Pic = document.querySelector("#profile-pic"); 
var file = document.querySelector("#file"); 

//--------------------------------------------------------------------ADD EMPLOYEE BUTTON------------------------------------------------------------------------
firstbtn.addEventListener("click",()=>{
    model.classList.add("active");
    update.disabled = true;
    register.disabled = false;
});

//--------------------------------------------------------------------CROSS AT FORM BUTTON------------------------------------------------------------------------
cross.addEventListener("click",()=>{
    model.classList.remove("active");
    registerform.reset('');
    profile_Pic.src = "profile.jpg";
});

var userData = [];
var id_el = document.getElementById("id");
var name_el = document.getElementById("name");
var lname_el = document.getElementById("l-name");
var email_el = document.getElementById("email");
var code_el = document.getElementById("code");
var jobtitle_el = document.getElementById("job-title");
var imgUrl;


//--------------------------------------------------------------------REGISTER BUTTON------------------------------------------------------------------------
register.onclick = function(e){
    e.preventDefault();              //prevent from reloading page after pressig register button
    registrationData();
    getdatafromlocal();
    registerform.reset('');
    // profile_Pic.src = "profile.jpg";
    model.classList.remove("active");
    swal("Job Done!", "Registration Successful!", "success");     //sweetalert = website;
} 

if(localStorage.getItem("userData") != null){
    userData = JSON.parse(localStorage.getItem("userData"));
}

function registrationData(){
    userData.push({
        id : id_el.value,
        name : name_el.value,
        lname : lname_el.value,
        email : email_el.value,
        code : code_el.value,
        jobtitle : jobtitle_el.value,
        profilepic : imgUrl == undefined ? "profile.jpg" : imgUrl
    });
    var userString = JSON.stringify(userData);
    console.log(userString);
    localStorage.setItem("userData",userString);
}

const getdatafromlocal = ()=>{
    tableData.innerHTML = "";
    userData.forEach((data,index)=>{
        tableData.innerHTML += `
        <tr index = '${index}'>
            <td>${index+1}</td>
            <td><img src = ${data.profilepic} width = "50" height = "50" style = "border-radius:100%"></td>
            <td>${data.id}</td>
            <td>${data.name}</td>
            <td>${data.lname}</td>
            <td>${data.email}</td>
            <td>${data.code}</td>
            <td>${data.jobtitle}</td>
            <td id = "acti">
                <button class = "eye"><i class="fa-sharp fa-solid fa-eye"></i></button>
                <button class = "delete-btn"><i class="fa-sharp fa-solid fa-trash"></i></button>
            </td>
        </tr>
        `;
    });

    //--------------------------------------------------------------------DELETE SINGLE DATA BUTTON------------------------------------------------------------------------
    var i;
    var all_del_btn = document.querySelectorAll(".delete-btn");
    for(i = 0;i<all_del_btn.length;i++){
        all_del_btn[i].onclick = function(){
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this Employee Data!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                  var tr = this.parentElement.parentElement;
                  var index = tr.getAttribute("index");
                  userData.splice(index,1);
                  var userString = JSON.stringify(userData);
                  localStorage.setItem("userData",userString);  
                  tr.remove();
                  swal("Employee Data has been deleted!", {
                    icon: "success",
                  });
                }
                //  else {
                //   swal("Your imaginary file is safe!");
                // }
            });
        }
    }
}
getdatafromlocal();


//--------------------------------------------------------------------IMAGE UPLOADING------------------------------------------------------------------------
file.onchange = function(){
    if(file.files[0].size<1000000){
        var freader = new FileReader();
        freader.onload = function(e){
            imgUrl = e.target.result;
            profile_Pic.src = imgUrl;
        }
        freader.readAsDataURL(file.files[0]);
    }else{
        alert("File Size is Not Accepted");
    }
}


//--------------------------------------------------------------------UPDATE BUTTON------------------------------------------------------------------------
var alledit = document.querySelectorAll(".eye");
for(i=0;i<alledit.length;i++){
    alledit[i].onclick = function(){
       model.classList.add("active");
       register.disabled = true;
       update.disabled = false;
       var tr = this.parentElement.parentElement;
       var td = tr.getElementsByTagName("td");
       var index = tr.getAttribute("index");
       var imgTag = td[1].getElementsByTagName("img");
       var profilepic = imgTag[0].src;
       var idTag = td[2].innerHTML;
       var nameTag = td[3].innerHTML;
       var l_nameTag = td[4].innerHTML;
       var email_Tag = td[5].innerHTML;
       var code_Tag = td[6].innerHTML;
       var title_Tag = td[7].innerHTML;
       id_el.value = idTag;
       name_el.value = nameTag;
       lname_el.value = l_nameTag;
       email_el.value = email_Tag;
       code_el.value = code_Tag;
       jobtitle_el.value = title_Tag;
       profile_Pic.src = profilepic;
       update.onclick = function(e){
            e.preventDefault();
            userData[index] = {
                id : id_el.value,
                name : name_el.value,
                lname : lname_el.value,
                email : email_el.value,
                code : code_el.value,
                jobtitle : jobtitle_el.value,
                profilepic : file.value == "" ? profile_Pic.src : imgUrl
            }
            var userString = JSON.stringify(userData);
            localStorage.setItem("userData",userString);
            model.classList.remove("active");
            registerform.reset('');
            swal({
                title: "Are you sure?",
                text: "Once Updated, you will not be able to recover the older Data!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                  location.reload();     //to reload page as my updated data is visible after refreshing page
                }
            }); 
        }
        
    }
}


//--------------------------------------------------------------------SEARCH BUTTON------------------------------------------------------------------------
var search = document.querySelector("#search");
var third_btn = document.querySelector("#third-btn");
search.oninput = function(){
    searchFun();
}

function searchFun(){
    var tr = tableData.querySelectorAll("tr");
    var filter = search.value.toLowerCase();
    var i;
    for(i = 0;i<tr.length;i++){
        var id = tr[i].getElementsByTagName("td")[2].innerHTML;
        var name = tr[i].getElementsByTagName("td")[3].innerHTML;
        var lname = tr[i].getElementsByTagName("td")[4].innerHTML;
        var email = tr[i].getElementsByTagName("td")[5].innerHTML;
        var code = tr[i].getElementsByTagName("td")[6].innerHTML;
        var jobtitle = tr[i].getElementsByTagName("td")[7].innerHTML;
        if(id.toLowerCase().indexOf(filter) > -1){
            tr[i].style.display = "";
        }
        else if(name.toLowerCase().indexOf(filter) > -1){
            tr[i].style.display = "";
        }
        else if(lname.toLowerCase().indexOf(filter) > -1){
            tr[i].style.display = "";
        }
        else if(email.toLowerCase().indexOf(filter) > -1){
            tr[i].style.display = "";
        }
        else if(code.toLowerCase().indexOf(filter) > -1){
            tr[i].style.display = "";
        }
        else if(jobtitle.toLowerCase().indexOf(filter) > -1){
            tr[i].style.display = "";
        }
        else{
            tr[i].style.display = "none";
        }
    }
}


//--------------------------------------------------------------------DELETE BUTTON------------------------------------------------------------------------
var del_all_btn = document.getElementById("second-btn");
del_all_btn.addEventListener('click',()=>{
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover Data!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            localStorage.removeItem("userData");
            window.location = location.href; // to reload page for updated data
        }
    });
})


