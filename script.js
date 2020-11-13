const balance=document.getElementById("balance")
const money_plus=document.getElementById("money-plus")
const money_minus=document.getElementById("money-minus")
const list=document.getElementById("list")
const form=document.getElementById("form")
const text=document.getElementById("text")
const amount=document.getElementById("amount")


const dummyTransactions=[]
let transactions =dummyTransactions


// eventlis
form.addEventListener("submit",addTransaction)






// adding transaction
function addTransaction(e)
{
e.preventDefault()
if(text.value.trim()==="" || amount.value.trim()==="" )
{
alert("please fill all the details")
}
else
{
const transaction={
  id:generateID(),
  text:text.value,
  amount:+amount.value
}
transactions.push(transaction)

// pushing transaction 
addTransactionDOM(transaction);
updateValues()
text.value=""
amount.value=""
}

}
// generate random id
function generateID()
{
  return Math.floor(Math.random()*10000)
}





// update trans in Dom
function addTransactionDOM(transaction) {
  // Get sign
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');

  // Add class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">x</button>
  `;

  list.appendChild(item);
}

// remove
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);



  init();
}








// update  income and expenses and balances


function updateValues()
{
  // moneys
  const amounts=transactions.map(i=>i.amount)
  // money left
  const total=amounts.reduce((acc,item)=>(acc=acc+item),0).toFixed(2)
  balance.innerText=`₹${total}`
// income
  const income=amounts
    .filter(item=>item>0)
    .reduce((acc,item)=>(acc=acc+item),0)
    .toFixed(2)
    money_plus.innerText=`₹${income}`
  // expenses
  const expenses=amounts
  .filter(item=>item<0)
  .reduce((acc,item)=>(acc=acc+item),0)
  .toFixed(2)
  
 
  money_minus.innerText=`₹${expenses}`

}

// to delete
function init() {
  list.innerHTML = '';

  transactions.forEach(addTransactionDOM);
  updateValues();
}





