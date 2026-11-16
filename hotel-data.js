
class Room {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }

    matchesName(query) {
        return this.name.toLowerCase().includes(query);
    }

    matchesPrice(maxPrice) {
        return maxPrice === "all" || this.price <= Number(maxPrice);
    }
}

const rooms = [
    new Room("Standard Room", 35000),
    new Room("Twin Room", 40000),
    new Room("Deluxe Room", 60000),
    new Room("Family Room", 70000),
    new Room("Junior Suite", 85000),
    new Room("Executive Suite", 120000),
    new Room("Accessible Room", 45000),
    new Room("Penthouse Suite", 180000)
];
