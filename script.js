const correctUsername = "admin";
const correctPassword = "password123";

if (document.getElementById("loginForm")) {
  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === correctUsername && password === correctPassword) {
      window.location.href = "directory.html";
    } else {
      document.getElementById("errorMessage").textContent =
        "Invalid username or password!";
    }
  });
}


function logout() {
  if (confirm("Are you sure you want to logout?")) {
    window.location.href = "index.html";
  }
}


const contactList = JSON.parse(localStorage.getItem("contacts")) || [];

function saveContacts() {
  localStorage.setItem("contacts", JSON.stringify(contactList));
}

const addForm = document.getElementById("addContactForm");
const contactListElement = document.getElementById("contactList");
const searchBox = document.getElementById("searchContact");
const searchButton = document.getElementById("searchButton");

if (addForm) {
  addForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("contactName").value.trim();
    const phone = document.getElementById("contactPhone").value.trim();

    if (!name || !phone) return alert("Please fill out both fields.");
    contactList.push({ name, phone });
    saveContacts();
    addForm.reset();
    displayContacts();
  });
}

function displayContacts(searchTerm = "") {
  if (!contactListElement) return;
  contactListElement.innerHTML = "";

  const filtered = contactList.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filtered.length === 0) {
    contactListElement.innerHTML = "<li>No contacts found.</li>";
    return;
  }

  filtered.forEach((contact, index) => {
    const li = document.createElement("li");
    li.textContent = `${contact.name}: ${contact.phone}`;

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = () => {
      contactList.splice(index, 1);
      saveContacts();
      displayContacts(searchTerm);
    };

    li.appendChild(delBtn);
    contactListElement.appendChild(li);
  });
}

if (searchButton) {
  searchButton.addEventListener("click", () => {
    const term = searchBox.value.trim();
    displayContacts(term);
  });
}

displayContacts();


const billForm = document.getElementById("billingForm");
const billDisplay = document.getElementById("generatedBill");

if (billForm) {
  billForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("billName").value.trim();
    const phone = document.getElementById("billPhone").value.trim();
    const rate = parseFloat(document.getElementById("callRate").value);
    const duration = parseFloat(document.getElementById("callTime").value);
    const isInternational = document.getElementById("isInternational").checked;

    if (isNaN(rate) || isNaN(duration) || duration <= 0) {
      alert("Please enter valid rate and duration!");
      return;
    }

    let total = rate * duration;
    if (isInternational) total *= 1.5; 
    const billHTML = `
      <h4>Customer: ${name}</h4>
      <p>Phone: ${phone}</p>
      <p>Rate: ₹${rate.toFixed(2)} / minute</p>
      <p>Duration: ${duration.toFixed(2)} minutes</p>
      <p>International Call: ${isInternational ? "Yes (50% extra)" : "No"}</p>
      <hr>
      <h3>Total Bill: ₹${total.toFixed(2)}</h3>
    `;

    billDisplay.innerHTML = billHTML;
  });
}

function printBill() {
  const bill = document.getElementById("generatedBill").innerHTML;
  const w = window.open("", "", "width=600,height=700");
  w.document.write("<html><head><title>Print Bill</title></head><body>");
  w.document.write(bill);
  w.document.write("</body></html>");
  w.document.close();
  w.print();
}
