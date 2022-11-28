
/*================== Element-Selection ===============================================================*/

const urlInput = document.getElementById("url-input");
const typeSelect = document.getElementById("type-select");
const addButton = document.getElementById("add-btn");
const filterDiv = document.getElementById("filter-div");
const productsDiv = document.getElementById("products-div");
const errorMsg = document.getElementById("error");


let productsArray = [];
productsArray = JSON.parse(localStorage.getItem("products"));
displayProducts(productsArray);



/*================== Adding New Product Elements in an Array ===============================================================*/


addButton.addEventListener("click",(event)=> {
    event.preventDefault();
})

addButton.addEventListener("click", () => {
    if (urlInput.value === ""){
        errorMsg.innerText = "Please Enter URL";
        setTimeout(()=>{
            errorMsg.innerText = "";
        },2000);
        return;
    }

    const url = urlInput.value;
    const type = typeSelect.value;
    console.log('url,type');
    productsArray.push({
        url,
        type,
        id: Date.now()
    })

    localStorage.setItem("products",JSON.stringify(productsArray));
    displayProducts(productsArray);

    urlInput.value = "";
})


/*================== function to Display Products ========================================================================================================*/


function displayProducts(items){
    productsDiv.innerHTML = "";

    items.map((item) => {
        productsDiv.innerHTML += `<div class="item-div" id="${item.id}"> <img src="${item.url}"> <button id="delete-btn">Delete</button> </div>`
    })
}


/*========================================== To Filter Items =============================================================================*/


filterDiv.addEventListener("click",(event) => {
    let filteredArray;
    if (event.target.id == "Headphones"){
        filteredArray = productsArray.filter((item) => item.type == "Headphones");
    }
    if (event.target.id == "Laptops"){
        filteredArray = productsArray.filter((item) => item.type == "Laptops");
    }
    if (event.target.id == "Mobiles"){
        filteredArray = productsArray.filter((item) => item.type == "Mobiles");
    }
    if (event.target.id == "All"){
        filteredArray = productsArray;
    }

    displayProducts(filteredArray);
})




/*========================================= To Delete an Item ===============================================================================*/



productsDiv.addEventListener("click",(event) => {
    if (event.target.id == "delete-btn"){
        let item = event.target.parentElement;
        productsArray.forEach((product) => {
            if (product.id == item.id){
                let index = productsArray.indexOf(product);
                productsArray.splice(index,1);
            }
        })
    }
    localStorage.setItem("products",JSON.stringify(productsArray));
    displayProducts(productsArray);
})
