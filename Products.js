class Products{
    id = this.generateID()
    name
    description
    image
    price
    constructor(name, description, image, price) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.price = price;
    }
    generateID() {
        let str = '';
        for (let i = 0; i < 3; i++){
            let rand = Math.floor(Math.random() * 8)
            str = str+rand
        }
        let num = Number(str)
        return num
    }
}
module.exports = Products