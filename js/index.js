let totalPrice = 0; // Declare totalPrice as a global variable

// JavaScript function to handle seat selection
function handleSeatSelection(seatNumber) {
    const seatButton = document.getElementById(seatNumber);
    const selectSitCount = document.getElementById('select-sit');
    const numberOfSitCount = document.getElementById('number-of-sit');
    const totalPriceElement = document.getElementById('total-price');
    const selectedSeatsTable = document.getElementById('selected-seats-table');

    // Check if the seat is already selected
    if (seatButton.classList.contains('selected')) {
        // Deselect the seat
        seatButton.classList.remove('selected');
        // Decrease the count of selected seats
        selectSitCount.innerText = parseInt(selectSitCount.innerText) - 1;
        // Increase the count of available seats
        numberOfSitCount.innerText = parseInt(numberOfSitCount.innerText) + 1;

        // Remove the selected seat from the table
        for (var i = 0; i < selectedSeatsTable.rows.length; i++) {
            if (selectedSeatsTable.rows[i].cells[0].innerHTML === seatNumber) {
                selectedSeatsTable.deleteRow(i);
                break;
            }
        }

        // Decrease the total price
        totalPrice = parseInt(totalPriceElement.innerText) - 550;
        totalPriceElement.innerText = totalPrice;
    } else {
        // Check if there are less than 4 selected seats
        if (parseInt(selectSitCount.innerText) < 4) {
            // Select the seat
            seatButton.classList.add('selected');
            // Increase the count of selected seats
            selectSitCount.innerText = parseInt(selectSitCount.innerText) + 1;
            // Decrease the count of available seats
            numberOfSitCount.innerText = parseInt(numberOfSitCount.innerText) - 1;

            // Add the selected seat to the table
            var newRow = selectedSeatsTable.insertRow();
            var cellSeatNumber = newRow.insertCell(0);
            var cellEconomy = newRow.insertCell(1);
            var cellTicketPrice = newRow.insertCell(2);

            cellSeatNumber.innerHTML = seatNumber;
            cellEconomy.innerHTML = "Economy";  // Placeholder value for Economy
            cellTicketPrice.innerHTML = "550tk"; // Placeholder value for Ticket Price

            newRow.classList.add('first-class');

            // Increase the total price
            totalPrice = parseInt(totalPriceElement.innerText) + 550;
            totalPriceElement.innerText = totalPrice;
        } else {
            alert('You cannot select more than 4 seats.');
        }
    }

    if (parseInt(selectSitCount.innerText) === 4) {
        checkCoupon();
    }
}



// Add this function to your existing JavaScript code
function enableNextButton() {
    const nameInput = document.querySelector('#passenger-name');
    const phoneNumberInput = document.querySelector('#phone-number');
    const emailInput = document.querySelector('#email-id');
    const nextButton = document.getElementById('nextButton');

    if (nameInput.value || phoneNumberInput.value || emailInput.value) {
        nextButton.removeAttribute('disabled');
    } else {
        nextButton.setAttribute('disabled', 'disabled');
    }
}

// Show the success message when "Next" button is clicked
function handleNextButtonClick() {
    const successMessage = document.getElementById('successMessage');
    successMessage.classList.remove('hidden');

    const fullBody=document.getElementById('body');
    fullBody.classList.add('hidden')
}

// Additional function for "Continue" button in the success message
function continueBooking() {
    const fullBody=document.getElementById('body');
    fullBody.classList.remove('hidden')
    resetPage();
    
}


function resetPage() {
    // Clear seat selections
    const selectedSeats = document.querySelectorAll('.selected');
    selectedSeats.forEach(seat => seat.classList.remove('selected'));

    // Reset counts and tables
    document.getElementById('select-sit').innerText = '0';
    document.getElementById('number-of-sit').innerText = '4';
    document.getElementById('selected-seats-table').innerHTML = '';

    // Reset total price
    totalPrice = 0;
    document.getElementById('total-price').innerText = '0';

    // Reset coupon input and disable apply button
    const couponInput = document.getElementById('couponInput');
    const applyButton = document.getElementById('applyButton');
    couponInput.value = '';
    applyButton.disabled = true;

    // Hide success message
    const successMessage = document.getElementById('successMessage');
    successMessage.classList.add('hidden');

    // Disable "Next" button
    const nextButton = document.getElementById('nextButton');
    nextButton.setAttribute('disabled', 'disabled');
}




function checkCoupon() {
    const couponInput = document.getElementById('couponInput');
    const applyButton = document.getElementById('applyButton');
    const selectSitCount = document.getElementById('select-sit');

    // Assume valid coupon codes are "NEW15" and "Couple20"
    const validCouponCodes = ["NEW15", "COUPLE20"];

    if (parseInt(selectSitCount.innerText) === 4 && validCouponCodes.includes(couponInput.value.toUpperCase())) {
        applyButton.disabled = false;
    } else {
        applyButton.disabled = true;
    }
}

// Function to apply coupon
function applyCoupon() {
    const grandTotalElement = document.getElementById('grandTotal');
    const couponInput = document.getElementById('couponInput').value.toUpperCase();

    // Assume the original price per ticket is $10
    let grandTotal = totalPrice;

    // Apply discounts based on coupon codes
    if (couponInput === "NEW15") {
        grandTotal *= 0.85; // 15% discount
    } else if (couponInput === "COUPLE20") {
        grandTotal *= 0.80; // 20% discount
    }

    grandTotalElement.textContent = `Grand Total: $${grandTotal.toFixed(2)}`;
}




