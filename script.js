const searchProducts = () => //Fetching From API
{
    //fetch('https://api.escuelajs.co/api/v1/products')
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => showDetails(data))
}

const showDetails = (products) => { //Showing details of Product
    const details = document.getElementById('display-card');
    // console.log(products)

    for (let index = 0; index < 9; index++) { //Number of products to be showun
        const element = products[index];
        console.log(element)

        // products.forEach(element => {
        // console.log(element)
        // return ratings 
        const ratingStar = ratings(element.rating.rate);
        let p_count = 0;
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = `
         <div class="card ms-2 border-0 shadow h-100 product">
           <div class="p-1">
           <img src="${element.image}" class="card-img-top" alt="..."  height=180 >
           </div>
           <div class="card-body">
             <h5 class="card-title text-center">${element.title}</h5>
             <p class="card-text">
             </p>
             <h3 class="card-text text-center fw-bold">$<span class="sp fw-bold">${element.price}</span></h3>
             <h5 class="card-text text-center"><span class="sp fw-bold">${ratingStar}</span></h5>
             <h6 class="card-text text-center fw-bold">Total Items in Cart</h6>
             <h3 class="card-text text-center fw-bold p_count">${crr[element.id]}</h3>
           </div>
           <div class="footer mx-auto">
           <button class="btn btn-secondary" id ="create-button"onclick="addToCard(${element.id},${element.price})" >Add to Card</button>
           <button class="btn btn-secondary" onclick="removefromCard(${element.id},${element.price})" >Remove</button>
         </div>
       `
        details.appendChild(div);
    };
}

let arr = [];  //Array 4 add to cart traking
let brr = []; //Will use it later if need
let crr = new Array(1000).fill(0); //Array for remove from cart
let count = 0;
const addToCard = (id, price, newPrice) => { //Add to cart proccess
    count = count + 1;
    document.getElementById('total-products').innerHTML = count;
    arr.push(id);
    crr[id] += 1;
    // console.log(crr[(arr.length-1)]);
    // console.log(crr);
    document.getElementsByClassName('p_count')[id - 1].innerHTML = crr[id];
    console.log(crr);
    updatePrice(price * 107.00);  //Price update
    total();
}
// const o = () =>{
//      crr[(arr[id])]+=1;
//     // console.log(crr[(arr.length-1)]);
//     console.log(crr);
// }

const removefromCard = (id, price, newPrice) => {  //Remove from cart proccess
    for (let index = 0; index < arr.length; index++) {
        if (arr[index] == id) {
            crr[id] -= 1;
            // if(crr[index]<0)
            // {
            //     crr[index]==0;
            // }
            document.getElementsByClassName('p_count')[id - 1].innerHTML = crr[id];
            delete arr[index];
            console.log(crr);
            count = count - 1;
            document.getElementById('total-products').innerHTML = count;
            upPrice(price * 107.00);  //Decreasing price by update
            total();
            return;
        }
    }
}



const upPrice = (price) => {  //Function called in remove4mcard
    const oldPrice = document.getElementById('price').innerText;
    const oldPriceFloat = parseFloat(oldPrice);
    const newPrice = oldPriceFloat - price;;
    document.getElementById('price').innerText = newPrice.toFixed(2);
    DeliveryCharge(newPrice);
    ShippingCharge(newPrice);
}

const total = () => {  //Total price Calculation
    const price = parseFloat(document.getElementById('price').innerText);
    const deliver = parseFloat(document.getElementById('delivery-charge').innerText);
    const shipping = parseFloat(document.getElementById('shipping-charge').innerText);
    const total = price + deliver + shipping;
    document.getElementById('total').innerText = total.toFixed(2);
    tax(total);
}

const tax = (total) => {   // Tax Calculation
    const taxadd = (total * 0.10);
    // taxadd.toFixed(2);
    // total.toFixed(2)
    document.getElementById('tax').innerText = taxadd.toFixed(2);
    // console.log(taxadd);
    // console.log(total);
    const result = taxadd + total;
    document.getElementById('intotal').innerText = result.toFixed(2); //Total+Tax
    const intotal = document.getElementById('intotal').innerText;
    dis(intotal);  //For discount calculation
}

const dis = (intotal) => {  //Calculating discount
    const discount = (intotal * 0.06);
    document.getElementById('dis').innerText = discount.toFixed(2);
    const result = intotal - discount;
    document.getElementById('Fin_total').innerText = result.toFixed(2); //Final total price
}

const updatePrice = (price) => { //Function called in addtocard
    const oldPrice = document.getElementById('price').innerText;
    const oldPriceFloat = parseFloat(oldPrice);
    const newPrice = price + oldPriceFloat;
    document.getElementById('price').innerText = newPrice.toFixed(2);
    DeliveryCharge(newPrice);
    ShippingCharge(newPrice);
}

const DeliveryCharge = (newPrice) => {  //Calculating delivery_charge
    let DeliveryCharge;
    // if (newPrice <= 1000) {
    //     return document.getElementById('delivery-charge').innerText = 0;
    // }
    // // if (newPrice > 1000 && newPrice <= 5000) {
    // //     document.getElementById('delivery-charge').innerText = 100;
    // // }
    // // else if (newPrice > 5000 && newPrice <= 10000) {
    // //     document.getElementById('delivery-charge').innerText = 150;
    // // }
    // // else if (newPrice >= 10000) {
    // //     document.getElementById('delivery-charge').innerText = 200;
    // // }
    if (newPrice <= 5000 && newPrice!=0) {
        return document.getElementById('delivery-charge').innerText = 100;
    }
    if (newPrice > 5000) {
        document.getElementById('delivery-charge').innerText = 0;
    }
}

const ShippingCharge = (newPrice) => { //Calculating shipping Charge
    let ShippingCharge;
    if (newPrice <= 1000) {
        return document.getElementById('shipping-charge').innerText = 0;
    }
    if (newPrice > 1000 && newPrice <= 5000) {
        document.getElementById('shipping-charge').innerText = 100;
    }
    else if (newPrice > 5000 && newPrice <= 10000) {
        document.getElementById('shipping-charge').innerText = 150;
    }
    else if (newPrice >= 10000) {
        document.getElementById('shipping-charge').innerText = 200;
    }
}

const ratings = (rate) => {  //Showing star symbols
    if (rate >= 4) {
        return star = ` <h3><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i> <br> ${rate}</h3>`
    }
    else if (rate >= 3 && rate < 4) {
        return star = ` <h3><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i> <br> ${rate}</h3>`
    }
    else if (rate >= 2 && rate < 3) {
        return star = ` <h3><i class="fas fa-star"></i><i class="fas fa-star"></i> <br> ${rate}</h3>`
    }
    else {
        return star = ` <h3><i class="fas fa-star"></i> <br> ${rate}</h3>`
    }
}



const orderProducts = () => {   //Showing alert for final total price
    const final = document.getElementById('Fin_total').innerText;
    // final.toFixed(2);
    if (final > 0) {
        alert("Dear Sir/Ma'am," + "\n" + "You have to pay: " + final + "\n" + "Thank You!" + "\n");
    }
    else
        alert("Dear Sir/Ma'am," + "\n" + "You don't have anything in Cart " + "\n");
}

searchProducts();  //function calling for fetching data from API
