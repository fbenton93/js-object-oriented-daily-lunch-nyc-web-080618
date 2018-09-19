// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let mId = 0;
let nId = 0;
let cId = 0;
let dId = 0;
// meal
  //has many customers



// customer
  // has many deliveries
  // has many meals thru deliveries
  // belongs to neighborhood



// deliveries
  // belongs to meal
  // belongs to customer
  // belongs to neighborhood



// neighborhood
  // has many deliveries
  // has many customers thru deliveries
  // has many meals through deliveries

class Delivery {
  constructor(mId,nId,cId) {
    this.mealId = mId;
    this.customerId = cId;
    this.neighborhoodId = nId
    this.id = ++dId;
    store.deliveries.push(this)
  }
  meal() {
    return store.meals.find( function(meal){
      return meal.id == this.mealId
    }.bind(this))
  }
  customer() {
    return store.customers.find( function (cust){
      return cust.id == this.customerId
    }.bind(this))
  }
  neighborhood() {
    return store.neighborhoods.find( function (neigh){
      return neigh.id == this.neighborhoodId
    }.bind(this))
  }
}

class Meal {
  constructor(title,price) {
    this.title = title;
    this.price = price;
    this.id = ++mId;
    store.meals.push(this)
  }
  deliveries() {
    return store.deliveries.filter( function (delivery) {
      return delivery.mealId == this.id
    }.bind(this))
  }
  customers() {
    const customers = this.deliveries().map( function (delivery) {
      return delivery.customer()
    }.bind(this))
    return Array.from(new Set(customers))
  }
  static byPrice() {
    return store.meals.sort( function (a,b){
      return a.price < b.price
    })
  }
}

class Neighborhood {
  constructor(name) {
    this.name = name;
    this.id = ++nId;
    store.neighborhoods.push(this);
  }
  deliveries() {
    return store.deliveries.filter( function (delivery) {
      return delivery.neighborhoodId === this.id
    }.bind(this))
  }
  customers() {
    return store.customers.filter( function (cust){
      return cust.neighborhoodId == this.id;
    }.bind(this))
  }
  meals() {
    let returnArray = [];
    this.customers().forEach( function (cust) {
      return returnArray.push(...cust.meals())
      console.log(returnArray)
    })
    return Array.from(new Set(returnArray))
  }

}

class Customer {
  constructor(name,nId) {
    this.name = name;
    this.neighborhoodId = nId;
    this.id = ++cId
    store.customers.push(this)
  }
  deliveries() {
    return store.deliveries.filter(function (delivery){
      return delivery.customerId == this.id
    }.bind(this))
  }
  meals() {
    const meals = this.deliveries().map( function (delivery) {
      return delivery.meal()
    }.bind(this))
    return Array.from(new Set(meals))
  }
  totalSpent() {
    const meals = this.deliveries().map( function (delivery) {
      return delivery.meal()
    }.bind(this))
    return meals.reduce( function(acc,meal) {
      return acc + meal.price
    },0)
  }


}
