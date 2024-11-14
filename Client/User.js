import {Start} from "./start.js"
import { ProductView } from "./ProductView.js";
import { Product } from "./Product.js";
import { Profile } from "./Profile.js";
import { Notification } from "./Notification.js";

export class User {
	constructor(
		id,
		username,
		password,
		firstName,
		lastName,
		contact,
		city,
		money
	) {
		this.id = id;
		this.username = username;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.contact = contact;
		this.city = city;
		this.money = money;
	}
	draw()
	{
		
			this.container = document.createElement("div");
			this.container.className = "mainDiv2";
			document.body.appendChild(this.container);
			console.log(this.username);
	
			const botDiv2 = document.createElement("div");
			botDiv2.className = "botDiv2";
			this.container.appendChild(botDiv2);

	
			const backButton2 = document.createElement("button");
			backButton2.innerHTML = "BACK";
			backButton2.style.margin = "5px";
			backButton2.className = "ui yellow button tiny";
			backButton2.onclick = () => {
				
				this.container.innerHTML="";
				let start=new Start();
				start.draw(document.body);
			};
			botDiv2.appendChild(backButton2);

			const btnProfile=document.createElement("button");
			btnProfile.className="ui blue button tiny";
			btnProfile.innerHTML="Profile";
			botDiv2.appendChild(btnProfile);
			btnProfile.onclick=(ev)=>
			{
				this.container.innerHTML="";
				let profile=new Profile();
				profile.draw(document.body,this);
			}

			const btnNotification=document.createElement("button");
			btnNotification.className="ui purple button tiny";
			btnNotification.innerHTML="Notification";
			botDiv2.appendChild(btnNotification);

			btnNotification.onclick=(ev)=>{
				this.container.innerHTML="";
				let not=new Notification();
				not.draw(document.body,this);
			}
	
			const topDiv2 = document.createElement("div");
			topDiv2.className = "topDiv2";
			this.container.appendChild(topDiv2);
			
			const mainDivLR=document.createElement("div");
			mainDivLR.className="mainDivLR";
			topDiv2.appendChild(mainDivLR);
	
			const leftDiv2 = document.createElement("div");
			leftDiv2.className = "leftDiv2 ";
			mainDivLR.appendChild(leftDiv2);
	
			const searchDiv2 = document.createElement("div");
			searchDiv2.className = "searchDiv2 ui search";
			leftDiv2.appendChild(searchDiv2);
	
			const iconInput2 = document.createElement("select");
			iconInput2.className = "select1";
			iconInput2.id="select1";
			searchDiv2.appendChild(iconInput2);
			
			fetch("https://localhost:5001/Furniture/GetStates").then(
				p=>{
					p.json().then((typeK)=>{
						typeK.forEach(k=>{
							let op= document.createElement("option");
							op.innerHTML=k.states;
							op.value=k.states;
							iconInput2.appendChild(op);
							
						})
					})
				}
			)
			
			var br=document.createElement('br');
			searchDiv2.appendChild(br);
			const iconInput3 = document.createElement("select");
			iconInput3.className = "select2";
			iconInput3.id="select2";
			searchDiv2.appendChild(iconInput3);
			
			fetch("https://localhost:5001/Furniture/GetTags").then(
				p=>{
					p.json().then((typeK)=>{
						typeK.forEach(k=>{
							let op= document.createElement("option");
							op.innerHTML=k.tag;
							op.value=k.tag;
							iconInput3.appendChild(op);
							
						})
					})
				}
			)
		   
		var br=document.createElement('br');
		searchDiv2.appendChild(br);
		const minDiv = document.createElement("div");
        minDiv.className = "move2";
        const minInput = document.createElement("input");
        minInput.placeholder = "Enter min price..";
        minInput.type = "number";
        minDiv.appendChild(minInput);
        searchDiv2.appendChild(minDiv);

        var br=document.createElement('br');
		searchDiv2.appendChild(br);

        const maxDiv = document.createElement("div");
        maxDiv.className = " move2";
        const maxInput = document.createElement("input");
        maxInput.placeholder = "Enter max price..";
        maxInput.type = "number";
        maxDiv.appendChild(maxInput);
        searchDiv2.appendChild(maxDiv);

        var br=document.createElement('br');
		searchDiv2.appendChild(br);

		const buttonSearch2 = document.createElement("button");
		buttonSearch2.innerHTML = "Search";
		buttonSearch2.className = "ui button green tiny";
		searchDiv2.appendChild(buttonSearch2);

		const lbl=document.createElement("h2");
		lbl.innerHTML="Buy products";
		searchDiv2.appendChild(lbl);
	
		const results = document.createElement("div");
		results.className = "results2";
		leftDiv2.appendChild(results);
	
	
		buttonSearch2.onclick = () => {
				let state= document.getElementById('select1').value;
				console.log(state);
	
				let tags= document.getElementById('select2').value;
				console.log(tags);

				let min=minInput.value;
				console.log(min);

				let max=maxInput.value;
				console.log(max);

				if (min == "") min = "0";

	        	if (max == "") max= "99999999";

				
				fetch("https://localhost:5001/Furniture/GetSearchResults/" + tags+"/"+ state+"/"+min+"/"+max).then(
					(p) => {
						p.json().then((bus) => {
							results.innerHTML = "";
							bus.forEach((b) => {
								const product = new ProductView(b._id,b.name,b.price,b.username,b.states,b.tag,b.product,b.imgUrl);
								let productCardDiv2 = document.createElement("div");
								productCardDiv2.className = "productCardDiv3";
								results.appendChild(productCardDiv2);
								product.draw(productCardDiv2);
	
								productCardDiv2.onclick = () => {
									document.body.removeChild(this.container);
									fetch(
										"https://localhost:5001/Furniture/GetProductDetails/"+ product.product).then((p) => {
										p.json().then((b) => {
											let u = new Product(b._id,b.imgUrl,b.price,b.description,b.name,b.custom);
									        u.draw(product.user,this.username,product.product);
										});
									});
									
								};
							});
						});
					}
				);
			};
	
	
			const middleDiv2 = document.createElement("div");
			middleDiv2.className = "middleDiv2 ";
			mainDivLR.appendChild(middleDiv2);
			
			const h3Div=document.createElement("div");
			h3Div.className="h3Div";
			middleDiv2.appendChild(h3Div);
	
			const myProductDiv2 = document.createElement("h3");
			myProductDiv2.innerHTML = "My products";
			myProductDiv2.className = "myProductDiv2";
			h3Div.appendChild(myProductDiv2);
		   
			const divProduct=document.createElement("div");
			divProduct.className="divProduct";
			middleDiv2.appendChild(divProduct);

			fetch(
				"https://localhost:5001/Furniture/GetMyProducts/" + this.username
			).then((p) => {
				p.json().then((bus) => {
					bus.forEach((b) => {
						const product=new ProductView(b._id,b.name,b.price,b.username,b.states,b.tag,b.product,b.imgUrl);
						let productCardDiv2 = document.createElement("div");
						productCardDiv2.className = "productCardDiv2";
						divProduct.appendChild(productCardDiv2);
						product.draw(productCardDiv2);
	
						productCardDiv2.onclick = () => {
							document.body.removeChild(this.container);
							fetch("https://localhost:5001/Furniture/GetProductDetails/"+ product.product).then((p) => {
								p.json().then((b) => {
									let u = new Product(b._id,b.imgUrl,b.price,b.description,b.name,b.custom);
									u.draw(product.user,this.username,product.product);
							
								});
							});
						};
					});
				});
			});

			const buttonAdd=document.createElement("button");
			buttonAdd.innerHTML="Add new product";
            buttonAdd.className="ui green button tiny";
			middleDiv2.appendChild(buttonAdd);

			buttonAdd.onclick=(ev)=>{
				middleDiv2.removeChild(buttonAdd);
				this.addProduct(this.container,topDiv2);
			}

		}
		addProduct(mainDiv2,host)
		{
			mainDiv2.removeChild(host);

			const divName=document.createElement("div");
			divName.className="ui inputDiv form";
			mainDiv2.appendChild(divName);

			const lblName=document.createElement("label");
			lblName.innerHTML="Name: ";
			divName.appendChild(lblName);

			const inputName=document.createElement("input");
			inputName.type="text";
			inputName.id="inName";
			divName.appendChild(inputName);


			const divPrice=document.createElement("div");
			divPrice.className="ui inputDiv form";
			mainDiv2.appendChild(divPrice);

			const lblPrice=document.createElement("label");
			lblPrice.innerHTML="Price: ";
			divPrice.appendChild(lblPrice);

			const inputPrice=document.createElement("input");
			inputPrice.type="number";
			inputPrice.id="inPrice";
			divPrice.appendChild(inputPrice);

			const diPic=document.createElement("div");
			diPic.className="ui inputDiv form";
			mainDiv2.appendChild(diPic);

			const lblPic=document.createElement("label");
			lblPic.innerHTML="ImgUrl: ";
			diPic.appendChild(lblPic);

			const inputPic=document.createElement("input");
			inputPic.type="text";
			inputPic.id="inPic";
			diPic.appendChild(inputPic);


			const divDec=document.createElement("div");
			divDec.className="ui inputDiv form";
			mainDiv2.appendChild(divDec);

			const lblDec=document.createElement("label");
			lblDec.innerHTML="Description: ";
			divDec.appendChild(lblDec);

			const inputDec=document.createElement("input");
			inputDec.type="text";
			inputDec.id="inDec";
			divDec.appendChild(inputDec);

			const divTag=document.createElement("div");
			divTag.className="ui inputDiv form";
			mainDiv2.appendChild(divTag);

			const lblTag=document.createElement("label");
			lblTag.innerHTML="Tags: ";
			divTag.appendChild(lblTag);

			const iconInput1 = document.createElement("select");
			iconInput1.className = "select3";
			iconInput1.id="select1";
			divTag.appendChild(iconInput1);
			
			fetch("https://localhost:5001/Furniture/GetTags").then(
				p=>{
					p.json().then((typeK)=>{
						typeK.forEach(k=>{
							let op= document.createElement("option");
							op.innerHTML=k.tag;
							op.value=k.tag;
							iconInput1.appendChild(op);
							
						})
					})
				}
			)

			
			const br=document.createElement("br");
			mainDiv2.appendChild(br);
           
			const divSelect=document.createElement("div");
			divSelect.className="ui inputDiv form";
			mainDiv2.appendChild(divSelect);

			const lblselect=document.createElement("label");
			lblselect.innerHTML="State: ";
			divSelect.appendChild(lblselect);

			const iconInput2 = document.createElement("select");
			iconInput2.className = "select3";
			iconInput2.id="select3";
			divSelect.appendChild(iconInput2);
			
			fetch("https://localhost:5001/Furniture/GetStates").then(
				p=>{
					p.json().then((typeK)=>{
						typeK.forEach(k=>{
							let op= document.createElement("option");
							op.innerHTML=k.states;
							op.value=k.states;
							iconInput2.appendChild(op);
							
						})
					})
				}
			)
			
            
		   const br1=document.createElement("br");
		   mainDiv2.appendChild(br1);

            const btnAdd=document.createElement("button");
			btnAdd.className="ui green button tiny btnAdd";
			btnAdd.innerText="ADD";
			mainDiv2.appendChild(btnAdd);

			btnAdd.onclick=(ev)=>this.Add(this.username,iconInput2.value,iconInput1.value,mainDiv2);

		}
		Add(username,state,tags,host)
		{ 
			var name=document.getElementById('inName').value;
			var price=document.getElementById('inPrice').value;
			var pic=document.getElementById('inPic').value;
			var des=document.getElementById('inDec').value;
		   
			fetch("https://localhost:5001/Furniture/CreateProduct/"+ username + "/" +state+"/"+tags,{
				method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({
								imgUrl: pic,
								price: price,
								description: des,
								name: name,
							}),
			}).then(p=>{
				p.json().then(info=>{
					let product=new Product(info._id,info.imgUrl,info.price,info.description,info.name,info.custom);
					host.innerHTML="";
				   this.draw();
				})
			})
		}
	
}
