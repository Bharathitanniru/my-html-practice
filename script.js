// begining data with wanted fields
const transactions = [
    { date: '2023-09-20', description: 'Initial Balance', debit: 0, credit: 1000 },
];

//creating table data
function displayTransactions() {
    const transactionTable = document.getElementById('transactionTable');
    let currentBalance = 0; // Starting balance

    transactions.forEach(transaction => {
        currentBalance -= transaction.debit;
        currentBalance += transaction.credit;
        
        
        //adding row
       const row = document.createElement('tr');
        row.innerHTML = `
            <td>${transaction.date}</td>
            <td>${transaction.description}</td>
            <td>$${transaction.debit}</td>
            <td>$${transaction.credit}</td>
            <td>$${currentBalance}</td>
        `;

        transactionTable.appendChild(row);
    });
}

// transaction
function performTransaction(amount, description) {

    const accountBalanceElement = document.getElementById('accountBalance');
    const currentBalance = parseFloat(accountBalanceElement.textContent);

    if (amount < 0) {
        // Debit transaction
        if (currentBalance < Math.abs(amount)) {
            alert("Insufficient funds!");
            return;
        }
    }

    // Create a new transaction
    const transaction = {
        date: new Date().toISOString().slice(0, 10),
        description: description,
        debit: amount < 0 ? Math.abs(amount) : 0,
        credit: amount > 0 ? amount : 0,
    };

    transactions.push(transaction);

    // showing balance
    displayTransactions();
    accountBalanceElement.textContent = (currentBalance + amount).toFixed(2);
}

// adding functionality to buttons
document.getElementById('debitButton').addEventListener('click', () => {
    const amount = parseFloat(prompt('Enter debit amount:'));
    if (!isNaN(amount)) {
        performTransaction(-amount, 'Debit');
    }
});

document.getElementById('creditButton').addEventListener('click', () => {
    const amount = parseFloat(prompt('Enter credit amount:'));
    if (!isNaN(amount)) {
        performTransaction(amount, 'Credit');
    }
});


