const CART_STORAGE_KEY = "travel-solution-carrinho";

const cartTotalElement = document.querySelector(".cart-total")
const buyButtons= document.querySelectorAll(".btn-buy");

let cartItems = loadCartItems();
updateCartTotal();

buyButtons.forEach((button)=>{
    button.addEventListener("click", ()=>{
        const productCard = button.closest(".products-card");
        
        if(!productCard) return;

        const name = productCard.querySelector("h3")?.textContent?.trim() || "Produto";
        const priceText = productCard.querySelector(".price")?.textContent ||"R$0,00";
        const priceValue = parsePrice(priceText);

        cartItems.push({ name, price: priceValue});
        persistCartItems();
        updateCartTotal();
        
    })
})

function parsePrice(priceText){
    return Number(
        priceText
        .replace("R$","")
        .replace(/\./g, "")
        .replace(",",".")
        .trim()
    )
}

function formatPrice(value){
    return value.toLocaleString("pt-BR",{
        style:"currency",
        currency: "BRL",
    })
}

function updateCartTotal(){
    const total = cartItems.reduce((sum, item)=> sum + item.price, 0);
    if(cartTotalElement){
        cartTotalElement.textContent = formatPrice(total)
    }
}

function loadCartItems(){
    try{
        const items = localStorage.getItem(CART_STORAGE_KEY);
        return items ? JSON.parse(items) : [];
    } catch{
        return [];
    }
}

function persistCartItems(){
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
}