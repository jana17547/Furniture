import { Product } from "./Product.js";


export class ProductView {

	constructor(id, name, price, user, states, tags,product, img) {

		this.id = id;
		this.name = name;
		this.price = price;
		this.user = user;
		this.states=states;
		this.product = product;
		this.tags = tags;
		this.img = img;
		this.container=null;
	}

	draw(host)
	{ 
		const leftPart2 = document.createElement("div");
		leftPart2.className = "leftPart2";
		host.appendChild(leftPart2);

		const nameDiv2 = document.createElement("div");
		nameDiv2.innerHTML = "Name: "+this.name;
		nameDiv2.className = "nameDiv2";
		leftPart2.appendChild(nameDiv2);


		const ratingDiv2 = document.createElement("div");
		ratingDiv2.innerHTML ="Tags: " +this.tags;
		ratingDiv2.className = "ratingDiv2";
		leftPart2.appendChild(ratingDiv2);

		const rightPart2 = document.createElement("div");
		rightPart2.className = "rightPart2";
		host.appendChild(rightPart2);

		const img3 = document.createElement("img");
		img3.className = "img3";
		img3.src = this.img;
		rightPart2.appendChild(img3);

		const addressDiv2 = document.createElement("div");
		addressDiv2.innerHTML = "Price: " +this.price +" rsd";
		addressDiv2.className = "addressDiv2";
		rightPart2.appendChild(addressDiv2);

	}

}


