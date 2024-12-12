document.addEventListener('DOMContentLoaded', function () {
    const reserveButton = document.getElementById('reserve-button');
    const reservationForm = document.getElementById('reservation-form');
    const contactForm = document.getElementById('contact-form');
    const contactEmail = document.getElementById('contact-email');
    const contactNumber = document.getElementById('contact-number');
    const comment = document.getElementById('comment');
    const reservationFormElement = document.getElementById('reservationForm');

    // Toggle reservation form visibility
    reserveButton.addEventListener('click', function () {
        if (reservationForm.style.display === 'none' || reservationForm.style.display === '') {
            reservationForm.style.display = 'block';  // Show form
            reservationForm.style.height = 'auto';   // Allow expansion
        } else {
            reservationForm.style.height = '0';      // Collapse form
            setTimeout(function () {
                reservationForm.style.display = 'none';  // Hide after collapse
            }, 300); // Delay to allow smooth transition
        }
    });

    // Handle contact form submission
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Validate email format
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(contactEmail.value)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Validate phone number (basic check for digits only)
        const phonePattern = /^\d+$/;
        if (!phonePattern.test(contactNumber.value)) {
            alert('Please enter a valid phone number.');
            return;
        }

        // Save contact data to localStorage
        const contactData = {
            email: contactEmail.value,
            number: contactNumber.value,
            comment: comment.value,
        };

        let contactMessages = JSON.parse(localStorage.getItem('contactMessages')) || [];
        contactMessages.push(contactData);
        localStorage.setItem('contactMessages', JSON.stringify(contactMessages));

        alert('Your message has been sent!');
        contactForm.reset(); // Clear the form
    });

    // Handle reservation form submission
    reservationFormElement.addEventListener('submit', async function (event) {
        event.preventDefault();  // Prevent page reload

        // Gather form data
        const name = reservationFormElement.querySelector('[name="name"]').value;
        const email = reservationFormElement.querySelector('[name="email"]').value;
        const date = reservationFormElement.querySelector('[name="date"]').value;
        const time = reservationFormElement.querySelector('[name="time"]').value;
        const guests = reservationFormElement.querySelector('[name="people"]').value;

        // Validate email format
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Save reservation data to localStorage
        const reservationData = { name, email, date, time, guests };
        let reservations = JSON.parse(localStorage.getItem('reservations')) || [];
        reservations.push(reservationData);
        localStorage.setItem('reservations', JSON.stringify(reservations));

        // Show confirmation message instead of sending an email
        alert(`Reservation confirmed for ${name}. We look forward to hosting you on ${date} at ${time} for ${guests} people.`);

        reservationFormElement.reset();  // Reset form fields
    });
});
