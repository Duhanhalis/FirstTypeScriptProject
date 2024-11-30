"use strict";
var _a;
const input = document.querySelector('.todo-input-value');
const deleteBtn = document.querySelectorAll('.todo-list-delete');
const editBtn = document.querySelectorAll('.todo-list-edit');
const list = document.querySelector('.todo-list');
let arr = [];
if (localStorage.length > 0) {
    for (let index = 0; index < localStorage.length; index++) {
        let val = localStorage.getItem(localStorage.key(index));
        let obj = JSON.parse(val);
        arr.push(obj);
        ListTodo();
        console.log(arr);
    }
}
class Todo {
    constructor(id, missions, isCompoleted, date) {
        this.Id = id;
        this.Missions = missions;
        this.IsCompleted = isCompoleted;
        this.Date = date;
    }
    AddTodo() {
        return arr.push(new Todo(this.Id, this.Missions, this.IsCompleted, this.Date));
    }
    GetTodo(id) {
        let obj = arr.find(x => x.Id == id);
        return obj;
    }
    EditTodo(itemid) {
        let val = this.GetTodo(itemid);
        return new Todo(val.Id, val.Missions, val.IsCompleted, val.Date);
    }
    DeleteTodo(int) {
        let del = arr.splice(arr.indexOf(this.GetTodo(int)), 1);
        return del;
    }
}
function checkboxBtn(element) {
    var _a, _b, _c;
    (_a = element.parentElement) === null || _a === void 0 ? void 0 : _a.classList.toggle("line-through");
    (_b = element.nextElementSibling) === null || _b === void 0 ? void 0 : _b.classList.toggle("line-through");
    let val = Number((_c = element.parentElement) === null || _c === void 0 ? void 0 : _c.getAttribute('data-id'));
    let obj = Todo.prototype.GetTodo(val);
    localStorage.removeItem(obj.Id.toString());
    obj.IsCompleted = true;
    localStorage.setItem(obj.Id.toString(), JSON.stringify(obj));
}
//#region Ekleme İşi Burda Yapılıyor.
(_a = document.querySelector('.todo-input-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function (e) {
    e.preventDefault();
    if (input instanceof HTMLInputElement) {
        let val = new Todo(getRandomInt(1000000, 9999999), input.value, false, new Date);
        val.AddTodo();
        localStorage.setItem(val.Id.toString(), JSON.stringify(val));
        input.value = "";
        ListTodo();
    }
});
//#endregion
//#region Edit Btn
function editBtnfunc(element) {
    element.addEventListener('click', function (e) {
        var _a;
        e.preventDefault();
        let val = Number((_a = element.parentElement) === null || _a === void 0 ? void 0 : _a.getAttribute('data-id'));
        let obj = Todo.prototype.EditTodo(Number(val));
        input.value = obj.Missions;
        Todo.prototype.DeleteTodo(obj.Id);
        localStorage.removeItem(obj.Id.toString());
        ListTodo();
    });
}
//#endregion
//#region Delete Btn
function deleteBtnfunc(element) {
    var _a;
    let id = Number((_a = element.parentElement) === null || _a === void 0 ? void 0 : _a.getAttribute('data-id'));
    Todo.prototype.DeleteTodo(id);
    localStorage.removeItem(id.toString());
    ListTodo();
}
//#endregion
function ListTodo() {
    list.innerHTML = "";
    arr.forEach(element => {
        if (element.IsCompleted == false) {
            list.innerHTML += `
            <li class="" data-id="${element.Id}" data-date="${element.Date}">
            <input type="checkbox" onchange="checkboxBtn(this)" class="form-check-input">
            <h6 class="text-visible">${element.Missions}</h6>
            <button class="todo-list-edit btn btn-warning" onclick="editBtnfunc(this)">Düzenle</button>
            <button class="todo-list-delete btn btn-danger" onclick="deleteBtnfunc(this)">Sil</button>
            </li>`;
        }
        else {
            list.innerHTML += `
            <li class="line-through" data-id="${element.Id}" data-date="${element.Date}">
            <input type="checkbox" checked onchange="checkboxBtn(this)" class="form-check-input">
            <h6 class="line-through text-visible">${element.Missions}</h6>
            <button class="todo-list-edit btn btn-warning" onclick="editBtnfunc(this)">Düzenle</button>
            <button class="todo-list-delete btn btn-danger" onclick="deleteBtnfunc(this)">Sil</button>
            </li>`;
        }
    });
}
//#region Metodlar
function formatDate(date) {
    const minutes = date.getMinutes().toString(); // Dakikayı 2 haneli yap
    const hours = date.getHours().toString(); // Saati 2 haneli yap
    const day = date.getDate().toString(); // Günü 2 haneli yap
    const month = (date.getMonth() + 1).toString(); // Ay sıfırdan başlar
    const year = date.getFullYear(); // Yıl
    return `${hours}:${minutes} ${day}/${month}/${year}`;
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//#endregion
