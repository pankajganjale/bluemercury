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
            alert("Subscribed, you will receive daily tips on mail!");
            document.getElementById("email").value = null;
        }, 3000);
    }
}

// Function for User Login
function loginUser(event) {
    event.preventDefault();

    let mail = document.getElementById("Email").value;
    let pass = document.getElementById("Password").value;

    let accessData = localStorage.getItem("bluemercuryUser");
    let user = JSON.parse(accessData);

    let count = 0;
    for (let i = 0; i < user.length; i++) {
        if (Object.values(user[i])[0] === mail && Object.values(user[i])[3] === pass) {
            count++;
        }
    }

    if (count === 1) {
        window.location.href = "index.html";
    } else {
        alert("Invalid Credentials!")
    }

    document.getElementById("Email").value = null;
    document.getElementById("Password").value = null;
}

// For Recover Password

function recoverPassword(event) {
    event.preventDefault();

    let email = document.getElementById("Email_recover").value;

    let accessing = localStorage.getItem("bluemercuryUser");
    let convert = JSON.parse(accessing);

    let passCount = 0;
    for (let i = 0; i < convert.length; i++) {
        if (Object.values(convert[i])[0] === email) {
            setTimeout(function () {
                alert("Password recovery link has been sent to your E-mail!");
            }, 2000);
            break;
        } else if (Object.values(convert[i])[0] !== email) {
            passCount++;
        }
    }
    if (passCount === convert.length) {
        setTimeout(function () {
            alert("You are not a user. Create a new account!");
            window.location.href = "create_one.html";
        }, 2000);
    }
}

// Payment Right Section



function payRight() {
    let rightAdd = localStorage.getItem("bluemercuryCart");
    let rightConvert = JSON.parse(rightAdd);
    // console.log(rightConvert)

    rightConvert.forEach(function (prod) {
        let where = document.getElementById("p-right-section");

        let data = `<div class="p-grid">
        <div>
          <img src="${prod.image}" alt="">
          <div>
            <p>${prod.brand}</p>
            <p>${prod.name}</p>
          </div>
          <div class="get-price">$${prod.price}</div>
        </div>
      </div>
      <hr style="width: 80%; margin: auto;">`;

      where.innerHTML += data;
    })
}
payRight();

function promoBefore() {
    let rightAdd = localStorage.getItem("bluemercuryFinalAmount");
    let rightConvert = JSON.parse(rightAdd);

    let insert = `<div id="discount">
    <div>
      <input type="text" name="box" id="text" placeholder="Gift Card/Promo Code">
    </div>
    <div><button onclick="applyPromo()">APPLY</button></div>
  </div>
  <hr style="margin: 20px auto; width: 80%;">
  <div class="tot">
    <div>Subtotal</div>
    <div>${rightConvert[0].amount}</div>
  </div>
  <hr style="margin: 20px auto; width: 80%;">
  <div class="tot">
    <div>Total</div>
    <div id="tot">${rightConvert[0].amount}</div>
  </div>`

  let where = document.getElementById("p-right-section");
  where.innerHTML += insert;
}
promoBefore()

function applyPromo() {
    let input = document.getElementById("text").value;
    let totalAm = document.getElementById("tot").textContent;
    if (input === "blue30") {
        let a = '';
        for (let i = 1; i < totalAm.length; i++) {
            a += totalAm[i];
        }
        a = Number(a);
        a = Math.floor((a/100)*70);
        document.getElementById("tot").textContent = `$${a}`;

        let getingAm = localStorage.getItem("bluemercuryFinalAmount");
        let convertAm = JSON.parse(getingAm);
        
        convertAm[0].amount = `$${a}`;
     
        localStorage.setItem("bluemercuryFinalAmount", JSON.stringify(convertAm));
    } else {
        alert("Invalid Promo Code!");
    }
}

// Payment PAge Form

function nextPage(event) {
    event.preventDefault();
    let email = document.getElementById("Email").value;
    let fname = document.getElementById("Payment_username").value;
    let lname = document.getElementById("Payment_lastname").value;
    let add1 = document.getElementById("Payment_address").value;

    if (email.length < 5 || fname.length < 1 || lname.length < 1 || add1.length < 5) {
        alert("Enter Valid Details!");
    } else {
        window.location.href = "payment_2.html";
    }   
}

// JS for Last PAyment Page

function payMoney(event) {
    event.preventDefault();

    let cardNo = document.getElementById("cardno").value;
    let cardName = document.getElementById("cardname").value;
    let exp = document.getElementById("expiry").value;
    let code = document.getElementById("code").value;

    if (cardNo.length === 16 && cardName.length > 5 && exp.length > 3 && code.length >= 4) {
        localStorage.removeItem("bluemercuryCart")

        setTimeout(function () {
            alert("Paymet Successful!");
            window.location.href = "index.html";
        }, 2000);
    } else {
        alert("Invalid Details!")
    }
}