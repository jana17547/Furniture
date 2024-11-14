import { User } from "./User.js";

export class Product {
	constructor(id, img, price, description , name,custom) {

		this.id = id;
		this.img = img;
		this.price = price;
		this.description  = description ;
		this.name = name;
		this.custom=custom;
		this.container=null;
	}

	draw(user,username,productid) {

		this.container = document.createElement("div");
		this.container.className = "productView";
		document.body.appendChild(this.container);

		const testButton = document.createElement("button");
		testButton.innerHTML = "back";
		testButton.className = "ui yellow button testButton3";
		testButton.onclick = () => {
			fetch("https://localhost:5001/Furniture/GetUser/"+username).then(p=>{
				p.json().then(info=>{
					document.body.removeChild(this.container);
					let u=new User(info._id,info.username,info.password,info.firstName,info.lastName,info.contact,info.city,info.money);
					u.draw();
				})
			})
			
		};
		this.container.appendChild(testButton);
        
		const divLR=document.createElement("div");
		divLR.className="divLR";
		this.container.appendChild(divLR);
		
		const leftDiv3 = document.createElement("div");
		leftDiv3.className = "leftDiv3 ";
		leftDiv3.classList.add("bigDiv3");
		divLR.appendChild(leftDiv3);


		const rightDiv3 = document.createElement("div");
		rightDiv3.className = "rightDiv3  ";
		rightDiv3.classList.add("bigDiv3");
		divLR.appendChild(rightDiv3);

    
	

		this.drawLeftDiv(leftDiv3,user,username,productid);
		if(user != username)
		  this.drawRightDiv(rightDiv3,user,username,productid);

		
	}

	drawLeftDiv(leftDiv3,user,username,productid) {
		

		// picture
		const picture = document.createElement("img");
		picture.src = this.img;
		picture.className = "imageProduct";
		picture.classList.add("div3");
		leftDiv3.appendChild(picture);

		// name
		const name = document.createElement("h1");
		name.innerHTML = this.name;
		name.classList.add("name3");
		name.classList.add("div3");
		leftDiv3.appendChild(name);

		// description
		const description = document.createElement("div");
		description.innerHTML =  this.description;
		description.style.fontSize = "Large";
		description.classList.add("description3");
		description.classList.add("div3");
		leftDiv3.appendChild(description);

		// contact
		const contact = document.createElement("div");
		contact.innerHTML = "Price: " + this.price +" rsd";
		contact.style.fontSize = "Large";
		contact.classList.add("contact3");
		contact.classList.add("div3");
		leftDiv3.appendChild(contact);
        
		if(user===username)
		{
		const btnDelete=document.createElement("button");
		btnDelete.innerHTML="DELETE";
		btnDelete.className="ui red button tiny";
		leftDiv3.appendChild(btnDelete);

		const br=document.createElement("br");
		leftDiv3.appendChild(br);
       
		btnDelete.onclick=(ev)=>{
			fetch(`https://localhost:5001/Furniture/DeleteProduct/${productid}`, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
			}).then((p) => {
				fetch("https://localhost:5001/Furniture/GetUser/"+username).then(p=>{
				p.json().then(info=>{
					alert("You have successfully deleted the product named: " + this.name);
					document.body.removeChild(this.container);
				    document.body.innerHTML="";
					let u=new User(info._id,info.username,info.password,info.firstName,info.lastName,info.contact,info.city,info.money);
					u.draw();
				})
			})
				
			});
		};
		
		};
	   }


	drawRightDiv(rightDiv3,user,username,productid) {
	  
		fetch("https://localhost:5001/Furniture/GetUserDetails/"+ user).then(p=>{
              p.json().then(info=>{
			    this.drawUserDiv(rightDiv3,info,user,username,productid);
			  })
			}
		)
	}
	drawUserDiv(rightDiv3,user1,sellerUser,username,productid)
	{
		const lab = document.createElement("h2");
		lab.innerHTML = "Seller info:";
		lab.style.marginTop = "50px";
		rightDiv3.appendChild(lab);

		const name = document.createElement("div");
		rightDiv3.appendChild(name);
		name.className = "fontSize";
		name.innerHTML = "Full name: " + user1[0]+ " " + user1[1];

		const city = document.createElement("div");
		rightDiv3.appendChild(city);
		city.className = "fontSize";
		city.innerHTML = "City: " + user1[2];

		const contact = document.createElement("div");
		rightDiv3.appendChild(contact);
		contact.className = "fontSize";
		contact.innerHTML = "Phone number: " + user1[3];

		
		if (username != sellerUser) {
				
				
			const offerDiv = document.createElement("div");
			offerDiv.className = "offerDiv2";
			offerDiv.style.alignSelf = "end";
			rightDiv3.appendChild(offerDiv);

			const labOffer = document.createElement("h2");
			labOffer.innerHTML = "Suggest price: ";
			offerDiv.appendChild(labOffer);

			const semanticOffer = document.createElement("div");
			semanticOffer.className = "ui right labeled input";
			offerDiv.appendChild(semanticOffer);

			const inpOffer= document.createElement("input");
			semanticOffer.appendChild(inpOffer);
			inpOffer.type = "number";

			const div = document.createElement("div");
			div.className = "ui basic label";
			div.innerHTML = "rsd";
			semanticOffer.appendChild(div);

			const buttOffer = document.createElement("button");
			buttOffer.className = "ui green button";
			buttOffer.innerHTML = "Send notification";
			offerDiv.appendChild(buttOffer);


			
			buttOffer.onclick = () => {
				let price = parseInt(inpOffer.value);
				fetch("https://localhost:5001/Furniture/GetUser/"+ username ).then(p=>{
					p.json().then(info=>{
						let u=new User(info._id,info.username,info.password,info.firstName,info.lastName,info.contact,info.city,info.money);
					    console.log(u);
					    fetch(
							"https://localhost:5001/Furniture/CheckNotification/" +
								sellerUser +
								"&" +
								username +
								"&" +
								productid
						).then((q) => {
							if (q.status == 400) {
								alert("Your offer is already sent !");
							} else if (q.status == 200) {
								fetch(
									`https://localhost:5001/Furniture/CreateNotification/` +
									 sellerUser,
									{
										method: "POST",
										headers: { "Content-Type": "application/json" },
										body: JSON.stringify({
											username: u.username,
											firstName: u.firstName,
											lastName:  u.lastName,
											productName: this.name,
											productId: productid,
											price: price,
											offer: true,
										}),
									}
								).then((p) => {
									if (p.ok) alert("Your offer has been sent ");
									else if (p.status == 400) {
										alert("You don't have enough money ");
									} else console.log("Error");
								});
							}
						});
					})
				})
				
				
			};
		}


	}
}

