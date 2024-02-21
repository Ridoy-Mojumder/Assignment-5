let totalPrice = 0; 


function handleSeatSelection(seatNumber) {
    const seatButton = document.getElementById(seatNumber);
    const selectSitCount = document.getElementById('select-sit');
    const numberOfSitCount = document.getElementById('number-of-sit');
    const totalPriceElement = document.getElementById('total-price');
    const selectedSeatsTable = document.getElementById('selected-seats-table');
    console.log(seatButton.innerText);

    console.log(numberOfSitCount.innerText);

    if (!seatButton.classList.contains('selected') && parseInt(selectSitCount.innerText) < 4) {
            
        seatButton.classList.add('selected');
        
        selectSitCount.innerText = parseInt(selectSitCount.innerText) + 1;
        
        numberOfSitCount.innerText = parseInt(numberOfSitCount.innerText) - 1;
        
        var newRow = selectedSeatsTable.insertRow();
        var cellSeatNumber = newRow.insertCell(0);
        var cellEconomy = newRow.insertCell(1);
        var cellTicketPrice = newRow.insertCell(2);
        cellSeatNumber.innerText = seatNumber;
        cellEconomy.innerText = "Economy";  
        cellTicketPrice.innerText = "550tk";
        
        totalPrice = parseInt(totalPriceElement.innerText) + 550;
        totalPriceElement.innerText = totalPrice;
    }else if (seatButton.classList.contains('selected')) {
        alert('Seat already selected.');
    } else {
        alert('You cannot select more than 4 seats.');
    }

    if (parseInt(selectSitCount.innerText) === 4) {
        checkCoupon();
    }
}

    



    

function checkCoupon() {
    const couponInput = document.getElementById('couponInput');
    const applyButton = document.getElementById('applyButton');
    const selectSitCount = document.getElementById('select-sit');

    
    const validCouponCodes = ["NEW15", "COUPLE20"];

    if (parseInt(selectSitCount.innerText) === 4 && validCouponCodes.includes(couponInput.value.toUpperCase())) {
        applyButton.disabled = false;
    } else {
        applyButton.disabled = true;
    }
}


function applyCoupon() {
    const grandTotalElement = document.getElementById('grandTotal');
    const couponInput = document.getElementById('couponInput').value.toUpperCase();
    const applyButton = document.getElementById('applyButton');

    const discountParagraph = document.getElementById('discountParagraph');
    
    let grandTotal = totalPrice;
    let forDiscount = totalPrice;
    let discount = 0;

    
    if (couponInput === "NEW15") {
        grandTotal *= 0.85; 
        discount = forDiscount - grandTotal;
    } else if (couponInput === "COUPLE20") {
        grandTotal *= 0.80;
        discount = forDiscount - grandTotal; 
    }

    grandTotalElement.textContent = `Grand Total: $${grandTotal.toFixed(2)}`;


    discountParagraph.textContent = `${discount.toFixed(2)} Discount Applied`;

    applyButton.style.display = 'none';
    couponInput.style.display = 'none';

}




 
function enableNextButton() {
    const nameInput = document.querySelector('#passenger-name');
    const phoneNumberInput = document.querySelector('#phone-number');
    const emailInput = document.querySelector('#email-id');
    const nextButton = document.getElementById('nextButton');
    const selectSitCount = parseInt(document.getElementById('select-sit').innerText);

    if (selectSitCount > 0 && (nameInput.value || phoneNumberInput.value || emailInput.value)) {
        nextButton.removeAttribute('disabled');
    } 
}

 
function handleNextButtonClick() {
    document.getElementById('successMessage').classList.remove('hidden');

    document.getElementById('body').classList.add('hidden')
}

 
function continueBooking() {
    document.getElementById('body').classList.remove('hidden')
    resetPage();
    
}


function resetPage() {   
    document.getElementById('select-sit').innerText = '0';
    document.getElementById('number-of-sit').innerText = '40';
    document.getElementById('selected-seats-table').innerText = '';

     
    totalPrice = 0;
    document.getElementById('total-price').innerText = '0';

     
    document.getElementById('couponInput').value = '';;
    document.getElementById('applyButton').disabled = true;

     
    document.getElementById('successMessage').classList.add('hidden');

     
    document.getElementById('nextButton').setAttribute('disabled', 'disabled');
}








