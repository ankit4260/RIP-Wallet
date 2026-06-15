const BASE_URL = "https://your-backend.onrender.com";

const ICONS = {
  // Expense categories
  Food:          '<svg class="td-icon td-food" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 2v20M11 2v9a4 4 0 0 1-4 4M17 2c-1.5 0-2.5 1-2.5 3v8c0 1 .5 1.5 1.5 1.5h2V2zM17 12.5V22"/></svg>',
  Transport:     '<svg class="td-icon td-travel" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
  Shopping:      '<svg class="td-icon td-shop" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
  Entertainment: '<svg class="td-icon td-entertainment" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>',
  Bills:         '<svg class="td-icon td-bill" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>',
  Education:     '<svg class="td-icon td-education" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>',
  other:         '<svg class="td-icon td-other" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>',

  // Income categories
  Salary:        '<svg class="td-icon td-income" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
  Freelance:     '<svg class="td-icon td-freelance" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
  Investment:    '<svg class="td-icon td-investment" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>',
  Gift:          '<svg class="td-icon td-gift" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><path d="M12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>',
  Bonus:         '<svg class="td-icon td-bonus" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>',
};

// ---------date function 
const date=(d)=>{
    return new Date(d).toLocaleDateString('en-US',{
      month:"short",
      day:"numeric",
      year:"numeric"
    })
}

const formatDateInput=(d)=>{
    return new Date(d).toLocaleDateString('en-CA');
}

// ---------showTable 
function showTable(data){
    document.querySelector("tbody").innerHTML = "";

    let totalIncome=0, totalExpense=0, incomeCount=0, expenseCount=0;

    if(data.length==0){
        document.querySelector("tbody").innerHTML=`<tr class="no-trans"><td colspan="6" >No Transactions Yet!</td></tr>`;
        document.querySelector(".card-totalIn").innerHTML="₹0";
        document.querySelector(".card-totalOut").innerHTML="₹0";
        document.querySelector(".card-totalNet").innerHTML="₹0";
        document.querySelector("#card-transIn").innerHTML="0";
        document.querySelector("#card-transOut").innerHTML="0";
        return;
    }

    data.forEach(u=>{
        if(u.type=="Income"){totalIncome+=u.amount; incomeCount++;}
        if(u.type=="Expense"){totalExpense+=u.amount; expenseCount++;}

        document.querySelector(".card-totalIn").innerHTML="₹"+totalIncome;
        document.querySelector(".card-totalOut").innerHTML="₹"+totalExpense;
        const net=totalIncome-totalExpense;
        document.querySelector(".card-totalNet").innerHTML= net>=0 ? "₹"+net : "-₹"+(-net);
        document.querySelector(".card-totalNet").style.color= net>=0 ? "#d4ff3a" : "#ff6b8a";
        document.querySelector("#card-transIn").innerHTML=incomeCount;
        document.querySelector("#card-transOut").innerHTML=expenseCount;

        const tr=document.createElement("tr");
        const icon=ICONS[u.category]||ICONS.other;
        tr.innerHTML=`
            <td><div class="td-div">${icon}<span>${u.category}</span></div></td>
            <td><span class="td-note">${u.note}</span></td>
            <td><span class="td-type-${u.type}">${u.type}</span></td>
            <td><span class="td-date">${date(u.date)}</span></td>
            <td><span class="td-amount-${u.type}">${"₹"+u.amount}</span></td>
            <td>
                <button data-id="${u._id}" class="editBtn"><i class="fa-solid fa-pen-to-square"></i></button>
                <button data-id="${u._id}" class="deleteBtn"><i class="fa-solid fa-trash"></i></button>
            </td>`;
        document.querySelector("tbody").appendChild(tr);
    });
}

let tableData=[];

//  ------show the transactions----
async function render(){

    const MY=()=>{
        return new Date().toLocaleDateString("en-US",{ month:"long", year:"numeric" });
    }
    document.querySelector(".table-head-left-month").innerHTML=MY();
    const mY=()=>{
        return new Date().toLocaleDateString("en-US",{ month:"short", year:"numeric" });
    }
    document.querySelector("#tophead-mY").innerHTML=mY();

    try{
        const jsonResp=await fetch(`${BASE_URL}/expense/getData`,{
            method:"GET",
            credentials:"include",
            headers:{
                "Content-Type":"application/json",
                
            }
        })
        tableData=await jsonResp.json();  

        document.querySelector("#tophead-record").innerHTML=`${tableData.length}`;

        // logic for per day avg last 30 days
        function avgPerDay(){
            const thirtyDaysago=new Date();
            thirtyDaysago.setDate(thirtyDaysago.getDate()-30);
            const last30date=tableData.filter(u=>new Date(u.date)>=thirtyDaysago);
            let totalamountlast30=0;
            for(let u of last30date){ totalamountlast30+=u.amount; }
            return totalamountlast30/30;
        }
        document.querySelector(".card-totalAvg").innerHTML="₹"+avgPerDay().toFixed(2);

        showTable(tableData);
    }
    catch(err){
        console.log(err);
    }
}

//------------add transaction-----------

function clearForm(){
    document.querySelector("#type").value="Expense";
    document.querySelector(".income-option").value="Salary";
    document.querySelector(".expense-option").value="Food";
    document.querySelector("#note").value="";
    document.querySelector("#amount").value="";
    document.querySelector("#date").value="";
    document.querySelector(".income-option").classList.add("income-option-hide");
    document.querySelector(".expense-option").classList.remove("expense-option-hide");
}

document.querySelector("#type").addEventListener("change",(e)=>{
    if(e.target.value=="Income"){
        document.querySelector(".income-option").classList.remove("income-option-hide");
        document.querySelector(".expense-option").classList.add("expense-option-hide");
    }
    else{
        document.querySelector(".income-option").classList.add("income-option-hide");
        document.querySelector(".expense-option").classList.remove("expense-option-hide");
    }
})

document.querySelector(".x-btn").addEventListener("click",(e)=>{
    e.preventDefault();
    document.querySelector(".overlay").classList.add("overlay-hide");
})

document.querySelector(".cancel-btn").addEventListener("click",(e)=>{
    e.preventDefault();
    document.querySelector(".overlay").classList.add("overlay-hide");
})

const addTransectionBtn=document.querySelector(".addBtn");
addTransectionBtn.addEventListener("click",()=>{
    const popupForm=document.querySelector(".overlay");
    const h2Edit=document.querySelector(".form-h2");
    const saveBtn=document.querySelector(".save-btn");

    h2Edit.innerHTML="Add Transaction";
    clearForm();
    saveBtn.innerHTML="Save Transaction";
    saveBtn.disabled=false;
    popupForm.classList.remove("overlay-hide");

    document.querySelector(".form-container form").onsubmit=async(e)=>{
        e.preventDefault();
        saveBtn.innerHTML="Saving...";
        saveBtn.disabled=true;
        try{
            const type=document.querySelector("#type").value;
            const category= type=="Income"
                ? document.querySelector(".income-option").value
                : document.querySelector(".expense-option").value;
            const note=document.querySelector("#note").value;
            const amount=document.querySelector("#amount").value;
            const date=document.querySelector("#date").value;

            const addResponse=await fetch(`${BASE_URL}/expense/add`,{
                method:"POST",
                credentials:"include",
                headers:{
                    "Content-Type":"application/json",
                    
                },
                body:JSON.stringify({ type, category, note, amount, date })
            })
            const jAddResponse=await addResponse.json();
            if(jAddResponse.msg=="success"){
                render();
                popupForm.classList.add("overlay-hide");
            }
        }
        catch(err){ console.log(err); }
        finally{ saveBtn.disabled=false; }
    }
})


// --------edit / delete btn of form----------
document.querySelector("tbody").addEventListener("click",async(e)=>{

    // --------edit btn----------
    try{
    const editBtn=e.target.closest(".editBtn");
    if(editBtn){
        const expenseId=editBtn.dataset.id;
        const tr=editBtn.closest("tr");

        const h2Edit=document.querySelector(".form-h2");
        h2Edit.innerHTML="Edit Transaction";

        const saveBtn=document.querySelector(".save-btn");
        saveBtn.innerHTML="Save Changes";
        saveBtn.disabled=false;

        const typVal=tr.children[2].querySelector("span").textContent;
        document.querySelector("#type").value=typVal;

        const catVal=tr.children[0].querySelector("span").textContent;
        if(typVal=="Income"){
            document.querySelector(".income-option").value=catVal;
            document.querySelector(".income-option").classList.remove("income-option-hide");
            document.querySelector(".expense-option").classList.add("expense-option-hide");
        }
        else{
            document.querySelector(".expense-option").value=catVal;
            document.querySelector(".income-option").classList.add("income-option-hide");
            document.querySelector(".expense-option").classList.remove("expense-option-hide");
        }

        document.querySelector("#note").value=tr.children[1].querySelector("span").textContent;
        document.querySelector("#amount").value=tr.children[4].querySelector("span").textContent.replace("₹","");
        document.querySelector("#date").value=formatDateInput(tr.children[3].querySelector("span").textContent);

        const popupForm=document.querySelector(".overlay");
        popupForm.classList.remove("overlay-hide");

        document.querySelector(".form-container form").onsubmit=async(e)=>{
            e.preventDefault();
            saveBtn.innerHTML="Saving...";
            saveBtn.disabled=true;
            try{
                const type=document.querySelector("#type").value;
                const category= type=="Income"
                    ? document.querySelector(".income-option").value
                    : document.querySelector(".expense-option").value;
                const note=document.querySelector("#note").value;
                const amount=document.querySelector("#amount").value;
                const date=document.querySelector("#date").value;

                const editResponse=await fetch(`${BASE_URL}/expense/edit`,{
                    method:"PUT",
                    credentials:"include",
                    headers:{
                        "Content-Type":"application/json",
                        
                    },
                    body:JSON.stringify({ type, category, note, amount, date, expenseId })
                })
                const jEditResponse=await editResponse.json();
                if(jEditResponse.msg=="success"){
                    render();
                    popupForm.classList.add("overlay-hide");
                }
            }
            catch(err){ console.log(err); }
            finally{ saveBtn.disabled=false; }
        }
    }}
    catch(err){ console.log(err); }

    // --------delete btn----------
    try{
    const deleteBtn=e.target.closest(".deleteBtn");
    if(deleteBtn){
        const expenseId=deleteBtn.dataset.id;
        document.querySelector(".confirmContainer").classList.remove("confirmContainer-hide");

        document.querySelector(".confirmDelete").onclick=async(e)=>{

            // ---------confirm-deleteBtn----------
            if(e.target.classList.contains("confirm-deleteBtn")){
                e.preventDefault();
                const confirmResponse=await fetch(`${BASE_URL}/expense/delete`,{
                    method:"DELETE",
                    credentials:"include",
                    headers:{
                        "Content-Type":"application/json",
                        
                    },
                    body:JSON.stringify({ expenseId })
                })
                const jConfirmResponse=await confirmResponse.json();
                if(jConfirmResponse.msg=="success"){
                    render();
                    document.querySelector(".confirmContainer").classList.add("confirmContainer-hide");
                    return;
                }
            }

            // ----------confirm-cancelBtn----------
            if(e.target.classList.contains("confirm-cnacelBtn")){
                e.preventDefault();
                document.querySelector(".confirmContainer").classList.add("confirmContainer-hide");
                return;
            }
        }
    }}
    catch(err){ console.log(err); }
})

// ------logic for filtering
let prevBtn = document.querySelector(".filterCard");
document.querySelectorAll(".filterCard").forEach(btn=>{
    btn.addEventListener("click",(e)=>{
        prevBtn.classList.remove("filterCard-click")  
        prevBtn = e.target                            
         
        e.target.classList.add("filterCard-click")
        const filterType=e.target.textContent.trim();
        if(filterType=="All"){
            showTable(tableData);
        }
        else{
            const filtered=tableData.filter(u=>{
                return u.type==filterType || u.category==filterType;
            })
            showTable(filtered);
        }
    })
})

function comingSoon(msg){
   const popup = document.querySelector(".coming-soon");
   document.querySelector(".coming-soon-msg").innerHTML=msg;
   popup.classList.remove("coming-soon-hide");

   setTimeout(() => {
    popup.classList.add("coming-soon-hide")
   }, 2500);

}

document.querySelectorAll(".coming-soon-el").forEach(btn=>{
    btn.addEventListener("click",(e)=>{
        e.preventDefault();
        comingSoon(e.target.dataset.msg)
    })
})



render();