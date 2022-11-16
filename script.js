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

    books.map(book => {
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
                                 <button class="button-add-to-cart">BUY</button>`;
        //price.classList.add('price');
        //bookDetails.after(price);
        //bookDetails.innerHTML += "<button class=\"button-add-to-cart\">BUY</button>"

        title.innerHTML = book.title;
        author.innerHTML = book.author;
        pic.src = book.imageLink;

        bookCard.append(pic, title, author, bookDetails);
        bookGallery.append(bookCard);

    })
});

body.appendChild(fragment);