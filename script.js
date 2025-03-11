// creare element p pentru data
var data = document.createElement("p");
var currentDate = new Date();

//formatare data
var options = { 
  weekday: 'long', 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
};
var formattedDate = new Intl.DateTimeFormat('en-US', options).format(currentDate);
data.textContent = "Last update: " + formattedDate;
data.style.textAlign = "center";
document.body.appendChild(data);

//div final
var divNou=document.createElement("div");
divNou.textContent="Don't forget to check our new additions!";
divNou.style.textAlign="center";
divNou.style.fontSize="x-large";
divNou.style.marginTop="100px";
divNou.style.marginBottom="100px";
divNou.style.color="#eb4248";
divNou.style.cursor="pointer";
divNou.classList.add("moving-div");
divNou.addEventListener("click",function(){
    var adresaID="new_additions";
    window.location.href="project.html#"+adresaID;
});
document.body.appendChild(divNou);
let position = 0;
let direction = 1;
function moveText() {
position += direction * 5;
if (position >= 20 || position <= 0) {
    direction *= -1;
}
divNou.style.marginTop = position + "px";
}
setInterval(moveText, 100);


//culoare copyright
const navbarContainer2 = document.querySelector(".navbar_container2");
document.getElementById("copyright").style.color = window.getComputedStyle(navbarContainer2).backgroundColor;

//modificare culoare New Aditions
var anim=document.getElementById("anim");
let colorIndex=0;
function changeColor(){
    const colors=["#ff7b7b","#ff5252","#ff0000","#a70000"];
    anim.style.color=colors[colorIndex];
    colorIndex=(colorIndex+1) % colors.length;//Array method
}
setInterval(changeColor,1000);


//scroll carti-favs
document.addEventListener('DOMContentLoaded', (event) => {
    const books = document.querySelectorAll('.fav_book');

    let currentBookIndex = 0;

    const navbarHeight = document.querySelector('.navbar').offsetHeight;

    function scrollToBook(index) {
        if (index >= 0 && index < books.length) {
            const book = books[index];
            const offset = book.getBoundingClientRect().top + window.scrollY - (window.innerHeight / 2) + (book.offsetHeight / 2) - navbarHeight;
            window.scrollTo({ top: offset, behavior: 'smooth' });
        }
    }


    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowUp') {
            currentBookIndex = Math.max(0, currentBookIndex - 1);//Math method
            scrollToBook(currentBookIndex);
        } else if (event.key === 'ArrowDown') {
            
            currentBookIndex = Math.min(books.length - 1, currentBookIndex + 1);
            scrollToBook(currentBookIndex);
        }
    });

});


//submit email
document.addEventListener("DOMContentLoaded", function() {
    const formContainer = document.querySelector(".searchbar_footer");
    const emailForm = document.getElementById("emailForm");

    //functie pentru a afisa formularul de abonare
    function showSubscriptionForm() {
        formContainer.innerHTML = "<form id='emailForm'><input type='text' placeholder='Your email' name='Your email'><button type='submit'>Submit</button></form>";
    }

    //functie pentru a afisa mesajul de bun venit
    function showWelcomeMessage() {
        formContainer.innerHTML = "<p id='welcomeMessage'>Welcome to our team!</p><p>(Click to unsubscribe)</p>";
    }

    //verifica daca utilizatorul este deja abonat
    const subscribedEmail = localStorage.getItem("subscribedEmail");
    if (subscribedEmail) {
        showWelcomeMessage(); //mesajul de bun venit
    }

    //evenimentul de clic pe mesajul de bun venit
    formContainer.addEventListener("click", function(event) {
        const welcomeMessage = document.getElementById("welcomeMessage");
        if (event.target === welcomeMessage) {
            localStorage.removeItem("subscribedEmail"); //sterge adresa de email din localStorage
            showSubscriptionForm();
        }
    });

    //evenimentul de trimitere a formularului
    emailForm.addEventListener("submit", function(event) {
        event.preventDefault(); //previne trimiterea implicita a formularului

        //emailul introdus de utilizator
        const userEmail = emailForm.querySelector("input[name='Your email']").value;

        //seteaza emailul utilizatorului ca si cheie in localStorage
        localStorage.setItem("subscribedEmail", userEmail);

        showWelcomeMessage();
    });

});

//cautare carte
document.addEventListener("DOMContentLoaded", function() {
    const searchForm = document.querySelector('.searchbar');
    const books = document.querySelectorAll('.book');

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevenirea comportamentului implicit al formularului

        const searchTerm = this.querySelector('input').value.trim().toLowerCase();//String method
        //window.location.href="genres.html";
        books.forEach(book => {
            const title = book.querySelector('.bookTitle').textContent.trim().toLowerCase();
            const author = book.querySelector('.book_author').textContent.trim().toLowerCase();
            
            if (title.includes(searchTerm) || author.includes(searchTerm)) {
                // Scroll către cartea găsită
                
                book.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });
});

//my reading list
document.addEventListener("DOMContentLoaded", function() {
    function afisareText() {
        var stats = document.querySelector('.stats');
        var popup = document.querySelector('.popup');
        var isPopupOpen = false; // Flag pentru a verifica dacă popup-ul este deschis


        // Eveniment pentru a afișa popup-ul când se face clic pe textul cu clasa .stats
        stats.addEventListener('click', function(event) {
            popup.style.display = "block";
            isPopupOpen = true; 
            event.stopPropagation();

            setTimeout(function() {
                if (isPopupOpen) {
                    document.addEventListener('click', closePopupOnClickOutside);
                }
            }, 0);
        });

        popup.addEventListener('click', function(event) {
            event.stopPropagation();
        });

        function closePopupOnClickOutside(event) {
            if (isPopupOpen) {
                popup.style.display = "none";
                isPopupOpen = false; // Marcăm că popup-ul este închis
                // Eliminăm event listener-ul pentru a evita adăugarea multiplă
                document.removeEventListener('click', closePopupOnClickOutside);
            }
        }
    }
    afisareText();
});



//"Click to add it to your library"
document.addEventListener('DOMContentLoaded', function() {
    // Selectează toate elementele cu clasa 'book'
    const books = document.querySelectorAll('.book');
    const tooltip = document.getElementById('tooltip');
    var popupText = document.querySelector('.popup');

    books.forEach(book => {
        book.addEventListener('mouseover', function(event) {
            // Afișează mesajul din atributul data-tooltip

            
            const message = book.getAttribute('data-tooltip');
            tooltip.innerText = message;
            tooltip.style.display = 'block';

            // Calculează poziția relativă a cărții în containerul său
            const rect = book.getBoundingClientRect();
            const containerRect = book.offsetParent.getBoundingClientRect(); // Obținem dimensiunile containerului relativ
            const relativeX = rect.left - containerRect.left;
            const relativeY = rect.top - containerRect.top;

            // Poziționează tooltip-ul relativ la poziția cărții
            tooltip.style.left = `${relativeX + rect.width / 2}px`;
            tooltip.style.top = `${relativeY}px`; // Poziționează tooltip-ul la aceeași înălțime cu cărțile
        });

        book.addEventListener('mouseout', function() {
            // Ascunde tooltip-ul când cursorul părăsește elementul
            tooltip.style.display = 'none';
        });
    });
});



//Adaugare carti la click in my reading stats
//login logout
document.addEventListener('DOMContentLoaded', (event) => {
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const closeLogin = document.getElementById('closeLogin');
    const closeSignup = document.getElementById('closeSignup');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const logoutBtn = document.getElementById('logoutBtn');
    const clearBooksBtn = document.getElementById('clearBooksBtn');
    const usernameDisplay = document.getElementById('usernameDisplay');
    const userProfile = document.getElementById('userProfile');
    const signupStatus = document.getElementById('signupStatus');
    const loginStatus = document.getElementById('loginStatus');
    const accountName = document.getElementById('accountName');

    const token = localStorage.getItem('token');
    if (token) {
        const username = localStorage.getItem('username');
        showUserProfile(username);
        showBooks(); // Afișează lista de cărți la log in
    } else {
        showAuthButtons();
    }

    loginBtn.addEventListener('click', () => {
        loginModal.style.display = 'block';
    });

    signupBtn.addEventListener('click', () => {
        signupModal.style.display = 'block';
    });

    closeLogin.addEventListener('click', () => {
        loginModal.style.display = 'none';
    });

    closeSignup.addEventListener('click', () => {
        signupModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
        }
        if (event.target === signupModal) {
            signupModal.style.display = 'none';
        }
    });

    signupForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const username = document.getElementById('signupUsername').value;
        const password = document.getElementById('signupPassword').value;

        const response = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            signupStatus.innerText = 'Registered successfully. Please log in.';
            signupModal.style.display = 'none'; // Ascunde modalul
            showAuthButtons(); // Actualizează butoanele
        } else {
            const errorData = await response.json();
            signupStatus.innerText = `Error registering user: ${errorData.message}`;
        }
    });

    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', username);
            loginStatus.innerText = 'Logged in successfully';
            showUserProfile(username);
            showBooks(); // Afișează lista de cărți la log in
            loginModal.style.display = 'none'; // Ascunde modalul
        } else {
            const errorData = await response.json();
            loginStatus.innerText = `Invalid username or password: ${errorData.message}`;
        }
    });

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        loginStatus.innerText = 'Logged out successfully';
        showAuthButtons();
    });

    clearBooksBtn.addEventListener('click', () => {
        localStorage.removeItem('booksList'); // Șterge lista de cărți din localStorage
        showBooks(); // Actualizează afișarea cărților
        console.log('Books list cleared from localStorage');
    });

    function showUserProfile(username) {
        usernameDisplay.innerText = `Hello, ${username}`;
        signupBtn.style.display = 'none';
        loginBtn.style.display = 'none';
        userProfile.style.display = 'block';
        accountName.innerText = username; // Actualizează numele de cont
    }

    function showAuthButtons() {
        signupBtn.style.display = 'block';
        loginBtn.style.display = 'block';
        userProfile.style.display = 'none';
        accountName.innerText = 'Account name'; // Reset numele de cont
    }

    function showBooks() {
        const popup = document.querySelector('.popup');
        const booksList = JSON.parse(localStorage.getItem('booksList')) || [];
        if (booksList.length > 0) {
            const booksText = booksList.join('\n');
            popup.innerText = `Your books:\n${booksText}`;
        } else {
            popup.innerText = 'No books in your list.';
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const books = document.querySelectorAll('.book');

    books.forEach(book => {
        book.addEventListener('click', function(event) {
            const titleElement = book.querySelector('.bookTitle');

            if (titleElement) {
                const bookTitle = titleElement.innerText;

                // Preluăm lista de cărți din localStorage sau inițializăm una nouă
                let booksList = JSON.parse(localStorage.getItem('booksList')) || [];

                // Adăugăm noua carte la listă
                booksList.push(bookTitle);

                // Salvăm lista actualizată în localStorage
                localStorage.setItem('booksList', JSON.stringify(booksList));

                // Actualizează afișarea cărților
                showBooks();
            } else {
                console.log('Nu s-a găsit titlul cărții.');
            }
        });
    });
});
