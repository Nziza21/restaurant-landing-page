document.addEventListener('DOMContentLoaded', function () {
    const reserveButton = document.getElementById('reserve-button');
    const reservationForm = document.getElementById('reservation-form');
    const contactForm = document.getElementById('contact-form');
    const contactEmail = document.getElementById('contact-email');
    const contactMessage = document.getElementById('contact-message');

    // Toggle reservation form visibility
    reserveButton.addEventListener('click', function () {
        if (reservationForm.style.display === 'none' || reservationForm.style.display === '') {
            reservationForm.style.display = 'block';
            reservationForm.style.height = 'auto';
        } else {
            reservationForm.style.height = '0';
            setTimeout(function () {
                reservationForm.style.display = 'none';
            }, 300);
        }
    });

    // Handle contact form submission
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(contactEmail.value)) {
            alert('Please enter a valid email address.');
            return;
        }

        const contactData = {
            email: contactEmail.value,
            message: contactMessage.value,
        };

        let contactMessages = JSON.parse(localStorage.getItem('contactMessages')) || [];
        contactMessages.push(contactData);
        localStorage.setItem('contactMessages', JSON.stringify(contactMessages));

        alert('Your message has been sent!');
        contactForm.reset();
    });

    // Handle reservation form submission
    const reservationFormElement = document.getElementById('reservationForm');
    reservationFormElement.addEventListener('submit', async function (event) {
        event.preventDefault();

        const name = reservationFormElement.querySelector('[name="name"]').value;
        const email = reservationFormElement.querySelector('[name="email"]').value;
        const date = reservationFormElement.querySelector('[name="date"]').value;
        const time = reservationFormElement.querySelector('[name="time"]').value;
        const guests = reservationFormElement.querySelector('[name="people"]').value;

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        const reservationData = { name, email, date, time, guests };
        let reservations = JSON.parse(localStorage.getItem('reservations')) || [];
        reservations.push(reservationData);
        localStorage.setItem('reservations', JSON.stringify(reservations));

        alert(`Reservation confirmed for ${name}. We look forward to hosting you on ${date} at ${time} for ${guests} people.`);

        reservationFormElement.reset();
    });

    // View Contact Messages
    const viewMessagesButton = document.getElementById('view-messages');
    const messagesList = document.getElementById('messages-list');
    const messages = document.getElementById('messages');

    viewMessagesButton.addEventListener('click', function () {
        const contactMessages = JSON.parse(localStorage.getItem('contactMessages')) || [];

        // Clear the list before adding messages
        messages.innerHTML = '';

        if (contactMessages.length === 0) {
            messages.innerHTML = '<li>No messages available.</li>';
        } else {
            contactMessages.forEach((message, index) => {
                const messageItem = document.createElement('li');
                messageItem.textContent = `Message ${index + 1}: Email - ${message.email}, Message - ${message.message}`;
                messages.appendChild(messageItem);
            });
        }

        messagesList.style.display = 'block';
    });
});