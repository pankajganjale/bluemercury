// Function to Create New User
if (localStorage.getItem("bluemercuryUser") === null) {
    localStorage.setItem("bluemercuryUser", JSON.stringify([]));
}

let gettingUser = localStorage.getItem("bluemercuryUser");
let user = JSON.parse(gettingUser);

function bluemercuryUser(event) {
    event.preventDefault();

    let email = document.getElementById("CreateAccountEmail").value;
    let fname = document.getElementById("CreateAccountFirstName").value;
    let lname = document.getElementById("Creat_LastName").value;
    let pass = document.getElementById("Creat_Password").value;

    if (email.length === 0 || fname.length === 0 || lname.length === 0 || pass.length === 0) {
        alert("Fill all the detail!");
    } else {
        if (user.length === 0) {
            

            user.push({ email: email, fname: fname, lname: lname, password: pass });

            let addData = JSON.stringify(user);
            localStorage.setItem("bluemercuryUser", addData);
        } else {
            let receiveData = localStorage.getItem("bluemercuryUser");
            let users = JSON.parse(receiveData);
            let check = 0;
            for (let i = 0; i < users.length; i++) {
                if (Object.values(users[i])[0] === email) {
                    check++;
                }
            }
            if (check > 0) {
                alert("User already exist. Please Login!");
            } else {
                user.push({ email: email, fname: fname, lname: lname, password: pass });
                let addData = JSON.stringify(user);
                localStorage.setItem("bluemercuryUser", addData);
            }
        }
    }
    document.getElementById("CreateAccountEmail").value = null;
    document.getElementById("CreateAccountFirstName").value = null;
    document.getElementById("Creat_LastName").value = null;
    document.getElementById("Creat_Password").value = null;
}

// Function for Mail Subscription in Footer
function mailSent() {
    let email = document.getElementById("email").value;

    if (email != null) {
        setTimeout(function () {
            alert("Subscribed, you will receive daily tips on mail!")
        }, 3000);
    }
}