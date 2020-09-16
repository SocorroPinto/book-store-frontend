
class NewCart {
	constructor() {
		this.carts = {
			UserId: null,
			Status: 'New',
			Total: null,
			DeliveryDate: this.date(),
		};
    }
    
    init = (pUserId, pTotal) => {
        this.carts.UserId = pUserId;
        this.carts.Total = pTotal
    }

	date() {
		let date = new Date();
		let days = Math.floor(Math.random() * 10) + 1;

		Date.prototype.addDays = (days) => {
            var date = new Date();
			date.setDate(date.getDate() + days);
			return date;
		}

		return date.addDays(days);
	}
}

export default new NewCart();
