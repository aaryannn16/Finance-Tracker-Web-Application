document.addEventListener("DOMContentLoaded", function () {
    const transactionForm = document.getElementById("transaction-form");
    const transactionList = document.getElementById("transaction-list");
    const balanceDisplay = document.getElementById("balance");

    let balance = 0;

    transactionForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get form values
        const amount = parseFloat(document.getElementById("amount").value);
        const category = document.getElementById("category").value;
        const description = document.getElementById("description").value || "No Description";

        if (isNaN(amount) || amount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

        // Create list item
        const listItem = document.createElement("li");
        listItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

        // Transaction text
        listItem.innerHTML = `
            <span>${category.toUpperCase()}: ₹${amount} - ${description}</span>
            <button class="btn btn-danger btn-sm delete-btn">X</button>
        `;

        transactionList.appendChild(listItem);

        // Update balance
        balance = category === "income" ? balance + amount : balance - amount;
        balanceDisplay.textContent = balance.toFixed(2);

        // Clear form
        transactionForm.reset();

        // Delete Transaction
        listItem.querySelector(".delete-btn").addEventListener("click", function () {
            transactionList.removeChild(listItem);
            balance = category === "income" ? balance - amount : balance + amount;
            balanceDisplay.textContent = balance.toFixed(2);
        });
    });
});
