const body = document.querySelector('body');
const fragment = document.createDocumentFragment();

// header
const header = document.createElement('header');
const headerBlock = document.createElement('div');
const headerLogo = document.createElement('div');


header.classList.add('wrapper');
headerBlock.classList.add('header-block');
headerLogo.classList.add('header-logo');
headerLogo.innerHTML = "<h1>Welcome to Black Books. We are closed!</h1>";

fragment.append(header);

//main
const main = document.createElement('main');
const wrapper = document.createElement('div');
const container = document.createElement('div');
const bookGallery = document.createElement('section');
const shoppingCart = document.createElement('section');
const confirmOrder = document.createElement('button');

wrapper.classList.add('wrapper');
container.classList.add('container');
bookGallery.classList.add('book-gallery');
shoppingCart.classList.add('shopping-cart');

shoppingCart.innerHTML = '<p id="total_price"></p>';
confirmOrder.classList.add('button-add-to-cart');
confirmOrder.innerHTML = "CONFIRM ORDER";
confirmOrder.addEventListener("click", function() {
    if (confirm("confirm order: total price = " + totalPrice)) {
        console.log("you should empty cart and reset total price");
        flushCart();
      } else {
        console.log("do nothing");
      }
  });

shoppingCart.append(confirmOrder);

header.append(headerBlock);
headerBlock.append(headerLogo);
fragment.append(main);
main.append(wrapper);
wrapper.append(container);
container.append(bookGallery, shoppingCart);

let totalPrice = 0;

fetch('./books.json')
    .then(response => {
        return response.json();
    })
    .then(data => {
    let books = data;
    let id = 0;

    books.map(book => {

        id++;

        const bookCard = document.createElement('div');
        bookCard.id = id;
        const pic = document.createElement('img');
        const title = document.createElement('p');
        const author = document.createElement('p');
        const bookDetails = document.createElement('div');
        const price = document.createElement('p');

        const addButton = document.createElement('BUTTON');
        const moreButton = document.createElement('BUTTON');

        const modal = document.createElement('div');
        const modalContent = document.createElement('div');
        const span = document.createElement('span');
        const pModal = document.createElement('p');

        modal.id = 'myModal';
        modal.classList.add('modal');
        modalContent.classList.add('modal-content');
        span.classList.add('close');
        span.innerHTML = '&times;';
        pModal.innerHTML = book.description;
        modalContent.append(span, pModal);
        modal.append(modalContent);

        bookCard.classList.add('book');
        title.classList.add('book-title');
        author.classList.add('book-author');
        bookDetails.classList.add('book-details');

        moreButton.classList.add("button-add-to-cart");
        moreButton.innerHTML = "Info";

        addButton.classList.add("button-add-to-cart");
        addButton.innerHTML = "BUY";
        addButton.id = id;

        title.innerHTML = book.title;
        author.innerHTML = book.author;
        pic.src = book.imageLink;
        price.innerHTML = book.price;

        bookDetails.append(price, moreButton, addButton, modal);
        bookCard.append(pic, title, author, bookDetails);
        bookGallery.append(bookCard);

        addButton.addEventListener("click",function() {
            //create dto (data transfer object - its name for those typres of objects, logically6 btcause they transfer ours data=) )
            var bookDTO = new Object();
            bookDTO.id = this.id;
            bookDTO.price = book.price;
            // and put it to our function
            addToCart(bookDTO);
          });

        moreButton.addEventListener("click",function() {
            modal.style.display = "block";
          });

          span.addEventListener("click", function() {
            modal.style.display = "none";
          });

    })
});

body.appendChild(fragment);

function addToCart(bookDTO){
    var myBook = document.getElementById(String(bookDTO.id));
    let price = parseInt(bookDTO.price);
    let copiedBook = myBook.cloneNode(true);

    // remove buttons
    let buttonsList = copiedBook.getElementsByClassName('button-add-to-cart');
    console.log(buttonsList.length);

    while (buttonsList.length > 0) {
        buttonsList[0].parentNode.removeChild(buttonsList[0]);
    }

    //add button to delete from cart
    const deleteButton = document.createElement('BUTTON');
    deleteButton.classList.add("button-add-to-cart");
    deleteButton.innerHTML = "Delete";
    deleteButton.onclick = () => {
        copiedBook.remove();
        subPrice(price);
    }
    const more = copiedBook.lastChild;
    more.append(deleteButton);

    const cart = document.querySelector('.shopping-cart');

    cart.append(copiedBook);

    addPrice(price);
}

function showPrice(price){
    console.log("total price = " + parseInt(price));
    document.getElementById("total_price").innerHTML = "Total Price: $ " + price;
}

function addPrice(price){
    totalPrice  += parseInt(price);
    showPrice(totalPrice);
}

function subPrice(price){
    totalPrice = (totalPrice - price) < 0 ? 0 : (totalPrice - price);
    showPrice(totalPrice);
}





