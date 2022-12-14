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
    constructor(userName,password,firstName,lastName) {
      this.userName = userName;
      this.password = password;
      this.firstName = firstName;
      this.lastName=lastName;
      
      
    }
  
    getUsername() {
      return this.userName;
    }
  }
  
  
  // login functionality
  let loginForm = document.getElementById("login-page");
  if(loginForm) loginForm.addEventListener('submit', login);
  
  function login(e) {
    e.preventDefault();
  
    let userName = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let user = new User(userName,password);
  //console.log(user)
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
  let regForm = document.getElementById("register-form");
  if(regForm) regForm.addEventListener('submit', register);
  
  function register(e) {
    e.preventDefault();
  
    let userName = document.getElementById("Uname").value;
    let userFname = document.getElementById("fname").value;
    let userLname = document.getElementById("Lname").value;
    
    let password = document.getElementById("password").value;
    let user = new User(userName, userFname, userLname, password);
    console.log(user)
    fetchData("/users/register", user, "POST")
    .then((data) => {
      setCurrentUser(data);
      alert("registration success")
      window.location.href = "note.html";
    })
    .catch((err) =>{
      console.log(err);
    })
  }
  //Note Functionality
  class Note{
    constructor(noteContent) {
      this.noteContent = noteContent;
    }
    getNotes() {
      return this.noteContent;
    }
  }
let user=getCurrentUser();
let note = document.getElementById("noteForm");
if(note) note.addEventListener('submit',notePageFunction)
function notePageFunction(e){
    e.preventDefault();
    let noted= document.getElementById('note').value;
    const note = new Note(noted);
    note.userID = user.userID;
    fetchData("/notes/create", note, "POST")
    .then((data) => {
      //setCurrentUser(data);
      alert("note added")
      window.location.href = "note.html";
    })
    .catch((err) =>{
      console.log(err);
    })
 document.getElementById("noteForm").reset();
}
if(user&&note) getallnotes();

function getallnotes(){
  let notedata =document.getElementById('note');
  fetchData("/notes/getNote",user,"POST")
  .then((data)=>{
    console.log(data);
    for(let i=0;i<data.length;i++){
      notedata.value+=data[i].noteContent;
    }
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
    localStorage.removeItem('user');
    window.location.href="login.html";
  }



/*async function fetchData(route = '', data = {}, methodType) {
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
  
  // logout event listener
  let logout = document.getElementById("logout-btn");
  if(logout) logout.addEventListener('click', removeCurrentUser)
  
  // stateful mechanism for user
  // logging in a user
  function setCurrentUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  
  // getting current user function
  function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
  
  // logout function for current user
  function removeCurrentUser() {
    localStorage.removeItem('user');
    window.location.href = "login.html";
  }
  
  function setCurrentNote(note) {
    localStorage.setItem('note', JSON.stringify(note));
  }
  
  // getting current note function
  function getCurrentNote() {
    return JSON.parse(localStorage.getItem('note'));
  }

// user functionality
class User {
    constructor(username, password, firstname, lastname) {
      this.username = username;
      this.password = password;
      this.firstname = firstname;
      this.lastname = lastname;
    }
  
    getUsername() {
      return this.username;
    }
  }
  
  // login functionality
  let loginForm = document.getElementById("login");
  if(loginForm) loginForm.addEventListener('submit', login);
  
  function login(e) {
    e.preventDefault();
  
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let user = new User(username, password);
  
    fetchData("/users/login", user, "POST")
    .then((data) => {
      setCurrentUser(data);
      alert("LOGIN SUCCESSFULL")
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
    let firstname = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let user = new User(username, password, lastname, firstname);
    console.log(user);
    fetchData("/users/register", user, "POST")
    .then((data) => {
      setCurrentUser(data);
      alert("REGISTRATION SUCCESSFULL")
      window.location.href = "note.html";
    })
    .catch((err) =>{
      console.log(err);
    })
  }
//note functionality

let enterNote = document.getElementById("Notes");
if(enterNote) enterNote.addEventListener('submit', notef);


  function notef(e){
    e.preventDefault();
    let notes=document.getElementById('note').value;
    

    let note = new Note(notes);
    
    let user = getCurrentUser();
    note.userID = user.userID;

    fetchData("/notes/create", note, "POST")
    .then((data) => {
    //setCurrentNote(data);
    setCurrentNote(data);
    alert("note added")
    console.log(note);
    window.location.href = "note.html";
    })
    .catch((err) =>{
    console.log(err);
    })

    document.getElementById("Notes").reset();

}

class Note {
    constructor(noteContent) {
      this.noteContent = noteContent;
      
      
    }
  
    getNote() {
      return this.noteContent;
    }

  }

  let user = getCurrentUser();
  
if(user&& enterNote) getNotes();



function getNotes(){
    let notedata = document.getElementById('note');
    fetchData("/notes/getNote",user,"POST")
    .then((data)=>{
        console.log(data);
        for(let i=0;i<data.length;i++){
            notedata.value+=data[i].noteContent;
        }
    })
    */
  /*
  let user = getCurrentUser();
   fetchData("/notes/", user,"post")
   .then((data)=>{
       let ul=document.getElementById("enterNotes");

       data.forEach((note)=>{
           let li=document.createElement('li');
           let text=document.createTextNode(note.note);
           li.appendChild(text);
           ul.appendChild(li);

       })
   })
   .catch((err)=>console.log(`Error! ${err}`));

   //window.location.href="note.html";
   */
