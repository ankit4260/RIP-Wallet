

const chart = document.querySelector(".chart-left-chart").getContext("2d");
let cashFlowChart = null;
let donutChart = null;
let dIncomeLabels = [], dExpenseLabels = [], dIncomeData = [], dExpenseData = [];

function comingSoon(msg) {
    const popup = document.querySelector(".coming-soon");
    document.querySelector(".coming-soon-msg").innerHTML = msg;
    popup.classList.remove("coming-soon-hide");

    setTimeout(() => {
        popup.classList.add("coming-soon-hide")
    }, 2500);

}

document.querySelectorAll(".coming-soon-el").forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        comingSoon(e.target.dataset.msg)
    })
})

async function profile() {
    const data = await fetch("/auth/me", {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const u = await data.json();
    const h1 = document.querySelector(".topbar-h1");
    document.querySelector(".addBtn").innerHTML = u.username.charAt(0).toUpperCase()
    h1.innerHTML = `${greet()} <span>${u.username.charAt(0).toUpperCase() + u.username.slice(1)}</span>`
}
profile()
function greet() {
    const time = new Date().getHours();
    if (time < 12) return "Good morning, "
    else if (time >= 12 && time < 17) return "Good afternoon,"
    else return "Good evening,"
}


function mY() {
    return new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    })
}
document.querySelector("#tophead-mY").innerHTML = mY();

let prChartFilter = document.querySelector(".chartFilter");
document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
        prChartFilter.classList.remove("chartFilter");
        prChartFilter = e.target;
        e.target.classList.add("chartFilter");
        let days = 0;
        const interval = e.target.innerHTML;
        if (interval.slice(-1) == "Y") days = 365;
        else days = parseInt(interval);
        renderData(days)
    })
})

// show data in dashboard----
async function renderData(days = 30) {
    const resp = await fetch("/expense/getData", {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const usersData = await resp.json();

    // ----logic for donut chart---
    const cartExpense = {
        Food: 0,
        Transport: 0,
        Shopping: 0,
        Entertainment: 0,
        Bills: 0,
        Education: 0,
        other: 0
    };
    const cartIncome = {
        Salary: 0,
        Freelance: 0,
        Investment: 0,
        Gift: 0,
        Bonus: 0,
        other: 0,
    };





    //------bar chart data------
    const last30 = {};
    for (let n = days - 1; n >= 0; n--) {
        const d = new Date()
        d.setDate(d.getDate() - n);
        const key = d.toLocaleDateString("en-CA");
        const label = d.getDate().toString();
        last30[key] = { income: 0, expense: 0, label }
    }
    let totalIncome = 0, totalExpense = 0;

    // ----for each data ---
    usersData.forEach(u => {

        if (u.type == "Income") {
            if (u.category == "Salary") cartIncome.Salary += u.amount;
            if (u.category == "Bonus") cartIncome.Bonus += u.amount;
            if (u.category == "Freelance") cartIncome.Freelance += u.amount;
            if (u.category == "Gift") cartIncome.Gift += u.amount;
            if (u.category == "Investment") cartIncome.Investment += u.amount;
            if (u.category == "other") cartIncome.other += u.amount;
        }
        if (u.type == "Expense") {
            if (u.category == "Food") cartExpense.Food += u.amount;
            else if (u.category == "Bills") cartExpense.Bills += u.amount;
            else if (u.category == "Education") cartExpense.Education += u.amount;
            else if (u.category == "Entertainment") cartExpense.Entertainment += u.amount;
            else if (u.category == "Shopping") cartExpense.Shopping += u.amount;
            else if (u.category == "other") cartExpense.other += u.amount;
            else if (u.category == "Transport") cartExpense.Transport += u.amount;
        }
        if (u.type == "Expense") { totalExpense += u.amount; }

        if (u.type == "Income") { totalIncome += u.amount; }
        if (u.type == "Expense") { totalExpense += u.amount; }

        const key = new Date(u.date).toLocaleDateString("en-CA");
        if (last30[key]) {
            if (u.type == "Income") last30[key].income += u.amount;
            if (u.type == "Expense") last30[key].expense += u.amount;
        }
    })
    
    //  ----update amount in cards
    document.querySelector(".card-totalIn").innerHTML = "₹" + totalIncome;
    document.querySelector(".card-totalOut").innerHTML = "₹" + totalExpense;
    const net = totalIncome - totalExpense;
    document.querySelector(".card-totalBal").innerHTML = net >= 0 ? "₹" + net : "-₹" + (-net);
    document.querySelector(".card-totalBal").style.color = net >= 0 ? "#d4ff3a" : "#ff6b8a";

    const cLabels = Object.values(last30).map(v => v.label);
    const cIncome = Object.values(last30).map(v => v.income);
    const cExpense = Object.values(last30).map(v => v.expense);

     dIncomeLabels = Object.keys(cartIncome);
     dExpenseLabels = Object.keys(cartExpense);
     dIncomeData = Object.values(cartIncome);
     dExpenseData = Object.values(cartExpense);
    

    data = {
        labels: cLabels,
        datasets: [
            {
                label: "Income",
                data: cIncome,
                fill: true,
                backgroundColor: "rgba(212, 255, 58, 0.12)",
                borderColor: "#d4ff3a",
                tension: 0.6,
                pointRadius: 0
            },
            {
                label: "Expense",
                data: cExpense,
                fill: true,
                backgroundColor: "rgba(255, 107, 138, 0.08)",
                borderColor: "#ff6b8a",
                tension: 0.6,
                pointRadius: 0
            }
        ]
    }
    if (cashFlowChart) cashFlowChart.destroy();
    cashFlowChart = new Chart(chart, {
        type: "line",
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            },
        }
    })
    donutLoad("Expense");
}
renderData()

// ------donut chart load
function donutLoad(string) {
    if (string == "Expense") { label = dExpenseLabels; data = dExpenseData; }
    if (string == "Income") { label = dIncomeLabels; data = dIncomeData; }
    const chartRight = document.querySelector(".chart-right-chart").getContext("2d");
    if (donutChart) donutChart.destroy();
    donutChart = new Chart(chartRight, {
        type: "doughnut",
        data: {
            labels: label,
            datasets: [{
                data: data,
                backgroundColor: [
                    "rgba(212,255,58,0.8)",
                    "rgba(255,107,138,0.8)",
                    "rgba(100,180,255,0.8)",
                    "rgba(180,130,255,0.8)"
                ],
                borderColor: "#111",
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            cutout: "70%",          
            plugins: {
                legend: {
                    position: "bottom",
                    labels: { color: "#888", padding: 16, font: { size: 12 } }
                }
            }
        }
    })
}
document.querySelector(".incomeBtn").addEventListener("click", (e) =>{
    donutLoad("Income");
    e.target.classList.add("donutH");
    document.querySelector(".expenseBtn").classList.remove("donutH");
    });
document.querySelector(".expenseBtn").addEventListener("click", (e) => {
    donutLoad("Expense");
    document.querySelector(".incomeBtn").classList.remove("donutH");
    e.target.classList.add("donutH");
});


