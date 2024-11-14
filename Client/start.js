
import { User } from "./User.js";
import { ProductView } from "./ProductView.js";
export class Start {
	constructor() {
		this.container = null;
		this.username = null;
	}

	
	draw(host) {
		this.container = document.createElement("div");
		this.container.className = "main1";
		host.appendChild(this.container);
       
		const h1=document.createElement("h1");
		h1.className="appName";
		h1.innerHTML="FURNITURE";
		this.container.appendChild(h1);

		const divLog=document.createElement("div");
		divLog.className="divLog";
		this.container.appendChild(divLog);
		
		const left = document.createElement("div");
		left.className = "left1";
		divLog.appendChild(left);

		
		//login form
		const login = document.createElement("div");
		login.className = "login1";
		left.appendChild(login);

		const loginform = document.createElement("div");
		loginform.className = "loginForm1 ui form";
		login.appendChild(loginform);

		const loginLabel = document.createElement("label");
		loginLabel.className = "loginLabel1";
		loginLabel.innerHTML = "Login:";
		loginform.appendChild(loginLabel);

		//login username
		const loginUsername = document.createElement("div");
		loginUsername.className = "field";
		loginform.appendChild(loginUsername);

		const loginUsernameLbl = document.createElement("label");
		loginUsernameLbl.innerHTML = "Username";
		loginUsername.appendChild(loginUsernameLbl);

		const loginUsernameInput = document.createElement("input");
		loginUsernameInput.type = "text";
		loginUsernameInput.name = "username";
		loginUsernameInput.placeholder = "Username";
		loginUsername.appendChild(loginUsernameInput);

		//login password
		const loginPassword = document.createElement("div");
		loginPassword.className = "field";
		loginform.appendChild(loginPassword);

		const loginPasswordLbl = document.createElement("label");
		loginPasswordLbl.innerHTML = "Password";
		loginPassword.appendChild(loginPasswordLbl);

		const loginPasswordInput = document.createElement("input");
		loginPasswordInput.type = "password";
		loginPasswordInput.name = "Password";
		loginPassword.appendChild(loginPasswordInput);

		loginPasswordInput.onkeydown = (ev) => {
			if (ev.key.match("Enter")) LoginButton.click();
		};

		const LoginButton = document.createElement("button");
		LoginButton.className = "ui green button";
		LoginButton.innerHTML = "Confirm";
		loginform.appendChild(LoginButton);

	

		LoginButton.onclick = () => {
			if (loginUsernameInput.value == "" || loginPasswordInput.value == "") {
				alert("input Login info.");
				return;
			}
			fetch(
				`https://localhost:5001/Furniture/LogIn/${loginUsernameInput.value}&${loginPasswordInput.value}`,
				{
					method: "GET",
					headers: { "Content-Type": "application/json" },
				}
			).then((p) => {
				if (p.ok)
					p.json().then((a) => {
						const profile = new User(
							a._id,
							a.username,
							a.password,
							a.firstName,
							a.lastName,
							a.contact,
							a.city,
							a.money
						);
						document.body.removeChild(this.container);
						profile.draw();
					});
				else alert("Invalid Sign in");
			});
		};


		const register = document.createElement("div");
		register.className = "register1";
		divLog.appendChild(register);

		const registerform = document.createElement("div");
		registerform.className = "registerForm1 ui raised form";
		register.appendChild(registerform);

		const registerLabel = document.createElement("label");
		registerLabel.className = "registerLabel1";
		registerLabel.innerHTML = "Sign up:";
		registerform.appendChild(registerLabel);

		//register username
		const registerUsername = document.createElement("div");
		registerUsername.className = "field";
		registerform.appendChild(registerUsername);

		const registerUsernameLbl = document.createElement("label");
		registerUsernameLbl.innerHTML = "Username";
		registerUsername.appendChild(registerUsernameLbl);

		const registerUsernameInput = document.createElement("input");
		registerUsernameInput.type = "text";
		registerUsernameInput.name = "username";
		registerUsernameInput.placeholder = "Username";
		registerUsername.appendChild(registerUsernameInput);

		//register password
		const registerPassword = document.createElement("div");
		registerPassword.className = "field";
		registerform.appendChild(registerPassword);

		const registerPasswordLbl = document.createElement("label");
		registerPasswordLbl.innerHTML = "Password";
		registerPassword.appendChild(registerPasswordLbl);

		const registerPasswordInput = document.createElement("input");
		registerPasswordInput.type = "password";
		registerPasswordInput.name = "Password";
		registerPassword.appendChild(registerPasswordInput);

		//register First name
		const register1 = document.createElement("div");
		register1.className = "field";
		registerform.appendChild(register1);

		const registerLbl1 = document.createElement("label");
		registerLbl1.innerHTML = "First name";
		register1.appendChild(registerLbl1);

		const registerInput1 = document.createElement("input");
		registerInput1.type = "text";
		registerInput1.name = "FirstName";
		registerInput1.placeholder = "First name";
		register1.appendChild(registerInput1);

		//register Last name
		const register2 = document.createElement("div");
		register2.className = "field";
		registerform.appendChild(register2);

		const registerLbl2 = document.createElement("label");
		registerLbl2.innerHTML = "Last name";
		register2.appendChild(registerLbl2);

		const registerInput2 = document.createElement("input");
		registerInput2.type = "text";
		registerInput2.name = "FirstName";
		registerInput2.placeholder = "Last name";
		register2.appendChild(registerInput2);

		//register city
		const register3 = document.createElement("div");
		register3.className = "field";
		registerform.appendChild(register3);

		const registerLbl3 = document.createElement("label");
		registerLbl3.innerHTML = "City";
		register3.appendChild(registerLbl3);

		const registerInput3 = document.createElement("input");
		registerInput3.type = "text";
		registerInput3.name = "FirstName";
		registerInput3.placeholder = "City";
		register3.appendChild(registerInput3);

		//register contact
		const register4 = document.createElement("div");
		register4.className = "field";
		registerform.appendChild(register4);

		const registerLbl4 = document.createElement("label");
		registerLbl4.innerHTML = "Contact";
		register4.appendChild(registerLbl4);

		const registerInput4 = document.createElement("input");
		registerInput4.type = "text";
		registerInput4.name = "FirstName";
		registerInput4.placeholder = "Contact";
		register4.appendChild(registerInput4);

		registerInput4.onkeydown = (ev) => {
			if (ev.key.match("Enter")) RegisterButton.click();
		};

		const RegisterButton = document.createElement("button");
		RegisterButton.className = "ui green button";
		RegisterButton.innerHTML = "Confirm";
		registerform.appendChild(RegisterButton);
		RegisterButton.onclick = () => {
			if (
				registerUsernameInput.value == "" ||
				registerPasswordInput.value == "" ||
				registerInput2.value == "" ||
				registerInput3.value == "" ||
				registerInput4.value == ""
			) {
				alert("Fill all input fields.");
				return;
			}
			fetch(`https://localhost:5001/Furniture/Register`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					username: registerUsernameInput.value,
					password: registerPasswordInput.value,
					firstName: registerInput1.value,
					lastName: registerInput2.value,
					city: registerInput4.value,
					contact: registerInput3.value,
					money: 0,
				}),
			}).then((p) => {
				if (p.ok)
					p.json().then((a) => {
						const profile = new User(
							a._id,
							a.username,
							a.password,
							a.firstName,
							a.lastName,
							a.contact,
							a.city,
							a.money
						);
						document.body.removeChild(this.container);
						profile.draw();
					});
				else alert("Username already in use.");
			});
		};
	}
	

}
