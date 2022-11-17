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

wrapper.classList.add('wrapper');
container.classList.add('container');
bookGallery.classList.add('book-gallery');
shoppingCart.classList.add('shopping-cart');
shoppingCart.innerHTML = "<p>Total</p><button class=\"button-add-to-cart\">CONFIRM ORDER</button>";

header.append(headerBlock);
headerBlock.append(headerLogo);
fragment.append(main);
main.append(wrapper);
wrapper.append(container);
container.append(bookGallery, shoppingCart);


fetch('./books.json')
    .then(response => {
        return response.json();
    })
    .then(data => {
    let books = data;
    id = 0;

    books.map(book => {
        id++;
        const bookCard = document.createElement('div');
        const pic = document.createElement('img');
        const title = document.createElement('p');
        const author = document.createElement('p');
        const bookDetails = document.createElement('div');
        const price = document.createElement('p');

        bookCard.classList.add('book');
        title.classList.add('book-title');
        author.classList.add('book-author');
        bookDetails.classList.add('book-details');
        bookDetails.innerHTML = `<div class="more-label"><p>More...</p></div>
                                 <p class="price">${book.price}$</p>
                                 <button id="add-${id}" class="button-add-to-cart">BUY</button>`;


        title.innerHTML = book.title;
        author.innerHTML = book.author;
        pic.src = book.imageLink;

        bookCard.append(pic, title, author, bookDetails);
        bookGallery.append(bookCard);

    })
});

body.appendChild(fragment);

window.onload = function() {
    const addToCartBtn = document.getElementById('add-1');
    addToCartBtn.addEventListener('click', addToCart, false);
}


function addToCart(event){
    const myBook = event.target.closest('.book');
    let copiedBook = myBook.cloneNode(true);
    const more = copiedBook.lastChild;
    more.removeChild(more.firstChild);
    more.removeChild(more.lastChild);
    more.className = 'incart-book-details';
    // const copiedBookDetails = document.createElement('div');
    // copiedBookDetails.classList.add('copied-book-details');
    // copiedBookDetails.innerHTML = "<p></p>"

    const cart = document.querySelector('.shopping-cart');

    // console.log(cart);
    cart.append(copiedBook);
}




