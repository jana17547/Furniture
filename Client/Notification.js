import { User } from "./User.js";

export class Notification {
	constructor(
		id,
		username,
		firstname,
		lastname,
		productname,
		productid,
		price,
		offer
	) {
		this.id = id;
		this.username = username;
		this.firstName = firstname;
		this.lastName = lastname;
		this.productName = productname;
		this.productId = productid;
		this.price = price;
		this.offer = offer;
	}

	draw(host,user) {

		const backButton2 = document.createElement("button");
		backButton2.innerHTML = "BACK";
		backButton2.style.margin = "5px";
		backButton2.className = "ui yellow button tiny";
		backButton2.onclick = () => {
	        fetch("https://localhost:5001/Furniture/GetUser/"+user.username).then(p=>{
				p.json().then(info=>{
					host.innerHTML="";
					let u=new User(info._id,info.username,info.password,info.firstName,info.lastName,info.contact,info.city,info.money);
					u.draw();
				
				})
			})
		};
		host.appendChild(backButton2);
		const mainDiv1 = document.createElement("div");
		mainDiv1.className = "mainDiv1";
		host.appendChild(mainDiv1);

		const notifList = document.createElement("div");
		notifList.className = "notifDiv1";
		mainDiv1.appendChild(notifList);

		fetch(
			"https://localhost:5001/Furniture/GetNotifications/" + user.username
		).then((p) => {
			p.json().then((products) => {
				let a = false;
				for (const item in products) {
					a = true;
					const notif = document.createElement("div");
					notif.className = "notif1 ui raised segment";
					notif.style.width = "75%";
					notifList.appendChild(notif);
					const notification = new Notification(
						item,
						products[item].username,
						products[item].firstName,
						products[item].lastName,
						products[item].productName,
						products[item].productId,
						products[item].price,
						products[item].offer
					);

					const notificationContent = document.createElement("div");
					notificationContent.className = "notificationContent1";
					notif.appendChild(notificationContent);

					if (notification.offer) {
						notificationContent.innerHTML = `User ${notification.firstName}  ${notification.lastName} is offering to buy your ${notification.productName} for ${notification.price}rsd. Do you accept?`;
						const buttons = document.createElement("div");
						buttons.className = "notificationsButtons1";
						notif.appendChild(buttons);

						const button1 = document.createElement("button");
						button1.className = "ui button green";
						button1.innerHTML = "Accept";
						buttons.appendChild(button1);
						button1.onclick = () => {
							fetch(
								`https://localhost:5001/Furniture/OfferAnswer/${
									notification.id
								}&${true}&${user.username}`,
								{
									method: "PUT",
									headers: {
										"Content-Length": 0,
									},
									body: {},
								}
							).then((p) => {
								host.innerHTML="";
								this.draw(host,user);
							});
						};

						const button2 = document.createElement("button");
						button2.className = "ui button red";
						button2.innerHTML = "Reject";
						buttons.appendChild(button2);
						button2.onclick = () => {
							fetch(
								`https://localhost:5001/Furniture/OfferAnswer/${
									notification.id
								}&${false}&${user.username}`,
								{
									method: "PUT",
									headers: {
										"Content-Length": 0,
									},
									body: {},
								}
							).then((p) => {
								host.innerHTML="";
								this.draw(host,user);
							});
						};
					} else {
						if (notification.username == "Accepted")
							notificationContent.innerHTML = `User ${notification.firstName}  ${notification.lastName} has accpeted your offer to buy ${notification.productName} for ${notification.price}rsd.`;
						else
							notificationContent.innerHTML = `User ${notification.firstName}  ${notification.lastName} has declined your offer to buy ${notification.productName} for ${notification.price}rsd.`;
					}
				}

				if (!a) {
					const notif = document.createElement("div");
					notif.className = "notif1 ui raised segment";
					notif.style.width = "75%";
					notifList.appendChild(notif);

					const notificationContent = document.createElement("div");
					notificationContent.className = "notificationContent1";
					notif.appendChild(notificationContent);

					notificationContent.innerHTML = "No more notifications.";
				}
			});
		});
	}
}


