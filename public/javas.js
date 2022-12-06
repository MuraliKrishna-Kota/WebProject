async function fetchData(route = '', data = {}, methodType) {
    const response = await fetch(`http://localhost:3000${route}`, {
      method: methodType, // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    if(response.ok) {
      return await response.json(); // parses JSON response into native JavaScript objects
    } else {
      throw await response.json();
    }
  }
  
  // user class
  class User {
    constructor(userName, password, fullName) {
      this.userName = userName;
      this.password = password;
      this.fullName = fullName;
    }
  
    getUsername() {
      return this.userName;
    }
  }
  
  // login functionality
  let loginForm = document.getElementById("login");
  if(loginForm) loginForm.addEventListener('submit', login);
  
  function login(e) {
    e.preventDefault();
  
    let userName = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let user = new User(userName, password);
  
    fetchData("/users/login", user, "POST")
    .then((data) => {
      setCurrentUser(data);
      window.location.href = "note.html";
    })
    .catch((err) => {
      console.log(`Error!!! ${err.message}`)
    }) 
  }
   
  // register functionality
  let regForm = document.getElementById("Register");
  if(regForm) regForm.addEventListener('submit', register);
  
  function register(e) {
    e.preventDefault();
    let userfname = document.getElementById("firstname").value;
    let userlname = document.getElementById("lastname").value;
    let userName = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let user = new User(userName, password, userfname, userlname);
  
    fetchData("/users/register", user, "POST")
    .then((data) => {
      setCurrentUser(data);
      window.location.href = "login.html";
    })
    .catch((err) =>{
      console.log(err);
    })
  }
  
  // logout event listener
  let logout = document.getElementById("logout-btn");
  if(logout) logout.addEventListener('click', removeCurrentUser)
  
  // stateful mechanism for user
  // logging in a user
  function setCurrentUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  
  // getting current user function
  // FIX this next class
  function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
  
  // logout function for current user
  function removeCurrentUser() {
    localStorage.removeItem('user')
  }
  

/*class User{
    constructor(Firstname,Lastname,Username,Password){
          this.Firstname = Firstname;
          this.Lastname = Lastname;
          this.Username = Username;
          this.Password = Password;
         
    }
       getFirstName(){
        return this.Firstname;
       }

       getLastName(){
        return this.Lastname;
       }
         
       getUserName(){
        return this.Username;
       }

       getPassWord(){
        return this.Password;
       }

}

let Register = document.getElementById("register");
if(Register) Register.addEventListener('submit',registration);

function registration(e){
    e.preventDefault();

    let Firstname = document.getElementById("fname").value;
    let Lastname = document.getElementById("lname").value;
    let Username = document.getElementById("email").value;
    let Password = document.getElementById("password").value;
    let user = new User(Firstname,Lastname,Username,Password);

   

   console.log(user);
   document.getElementById("fname").value="";
   document.getElementById("lname").value="";
   document.getElementById("email").value="";
   document.getElementById("password").value="";

}

//Login javascript

let Login = document.getElementById("login");
if (Login) Login.addEventListener("submit",Loggin);
   
   
   function Loggin(e){
   e.preventDefault();
   
   let Username = document.getElementById("email").value;
   let Password = document.getElementById("password").value;
   let signin = new User(null, null, Username,Password);
   
   console.log(signin);
   
   document.getElementById("email").value="";
   document.getElementById("password").value="";
   }
   

//Notes javascript part
class Note{
constructor(Notes) {
   this.Notes = Notes;
}
getComments(){
   return this.Notes; 
 }
}
let comment = document.getElementById("comments");
if (comment) comment.addEventListener("submit",note1);

function note1(e){
   e.preventDefault();
  
   let Notes = document.getElementById("notetaking").value;
   let Newcomment = new Note(Notes);

   console.log(Newcomment);
}

const seeUsers= document.getElementById("print");
document.getElementById("users-btn").addEventListener('click', getUsers);

function getUsers()
{
    fetch("http://localhost:3000/users")
    .then((res)=>res.json())
    .then((data) => {
        
        data.forEach((user) => {
            let section = `
            <div class="seeuser">
                
                <h2>${user.userName}</h2>
                <h2>${user.password}</h2>
                

                <br>
            </div>
            `
            seeUsers.innerHTML+=section;
        })
    })
    .catch((err)=>console.log(`Error! ${err}`));
   }
   */