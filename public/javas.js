class User{
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