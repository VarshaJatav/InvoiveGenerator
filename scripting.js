
const addRowBtn = document.getElementById("plus");
addRowBtn.addEventListener("click", () => document.getElementById("product-tbody").insertRow(-1).innerHTML = `<tr>
                    <td><input type="text" required name='pname[]' class="pname" placeholder="product description" id="num1"></td>
                    <td><input type="number" required name="qty[]" id="num2" class="qty"></td>
                    <td><input type="number" required name="price[]" id="num3" class="price"></td>
                    <td><input type="number" required name="discount[]" id="num4" class="discount"></td>
                    <td><input type="number" required name="gst[]" id="num5" class="gst"></td>
                    <td><input type="text"   required name="total[]" id="show" class="total" readonly></td>
                </tr>`);

            


const table = document.getElementById("product-tbody");
table.addEventListener('keyup', function(event) {
if (event.target.matches('.qty, .price, .discount, .gst, .ping')) {
calculate();
}
});
const ship=document.getElementById("ship").addEventListener('keyup',calculate);

function calculate(){
const rows = table.querySelectorAll('tr');
var t=0,g=0;
rows.forEach(function(row) {
const qty = Number(row.querySelector('.qty').value);
const price = Number(row.querySelector('.price').value);
const discount = Number(row.querySelector('.discount').value);
const gst = Number(row.querySelector('.gst').value);
const amount = row.querySelector('.total');
let a = (qty * price) - ((discount / 100) * (qty * price));
a = a + ((gst / 100) * a);
amount.value = a;
t=t+a;
g=g+gst;
});
const totall=document.getElementById("totall");
totall.value=t;
const gstt=document.getElementById("gstt");
gstt.value=g;
const ship=document.getElementById("ship");
const netamount=document.getElementById("netamount");
netamount.value=Number(t)+Number(ship.value);

}

document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
const dropZoneElement = inputElement.closest(".drop-zone");

dropZoneElement.addEventListener("click", (e) => {
inputElement.click();
});

inputElement.addEventListener("change", (e) => {
if (inputElement.files.length) {
    updateThumbnail(dropZoneElement, inputElement.files[0]);
}
});

dropZoneElement.addEventListener("dragover", (e) => {
e.preventDefault();
dropZoneElement.classList.add("drop-zone--over");
});

["dragleave", "dragend"].forEach((type) => {
dropZoneElement.addEventListener(type, (e) => {
    dropZoneElement.classList.remove("drop-zone--over");
});
});

dropZoneElement.addEventListener("drop", (e) => {
e.preventDefault();

if (e.dataTransfer.files.length) {
    inputElement.files = e.dataTransfer.files;
    updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
}

dropZoneElement.classList.remove("drop-zone--over");
});
});

function updateThumbnail(dropZoneElement, file) {
let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

if (dropZoneElement.querySelector(".drop-zone__prompt")) {
dropZoneElement.querySelector(".drop-zone__prompt").remove();
}

if (!thumbnailElement) {
thumbnailElement = document.createElement("div");
thumbnailElement.classList.add("drop-zone__thumb");
dropZoneElement.appendChild(thumbnailElement);
}

thumbnailElement.dataset.label = file.name;

if (file.type.startsWith("image/")) {
const reader = new FileReader();

reader.readAsDataURL(file);
reader.onload = () => {
    thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
};
} else {
thumbnailElement.style.backgroundImage = null;
}
}


window.onload = function () {
document.getElementById("download")
.addEventListener("click", () => {
    const invoice = this.document.getElementById("page");
    console.log(invoice);
    console.log(window);
    var opt = {
        margin: 1,
        filename: 'myfile.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 1 },
        jsPDF: { unit: 'mm', format: 'letter', orientation: 'landscape' }
    };
    html2pdf().from(invoice).set(opt).save();
})
}
