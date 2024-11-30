const input = document.querySelector<HTMLInputElement>('.todo-input-value');
const deleteBtn = document.querySelectorAll<HTMLButtonElement>('.todo-list-delete');
const editBtn = document.querySelectorAll<HTMLButtonElement>('.todo-list-edit');
const list = document.querySelector<HTMLUListElement>('.todo-list');

let arr: Todo[] = [];
if (localStorage.length > 0) {
    for (let index = 0; index < localStorage.length; index++) {
        let val = localStorage.getItem(localStorage.key(index)!);
        let obj: Todo = JSON.parse(val!);
        arr.push(obj);
        ListTodo();
        console.log(arr);

    }
}
class Todo {
    Id: number;
    Missions: string;
    IsCompleted: boolean;
    Date: Date;

    constructor(id: number, missions: string, isCompoleted: boolean, date: Date) {
        this.Id = id;
        this.Missions = missions;
        this.IsCompleted = isCompoleted;
        this.Date = date;
    }
    AddTodo(): number {
        return arr.push(new Todo(this.Id, this.Missions, this.IsCompleted, this.Date));
    }
    GetTodo(id: number): Todo {
        let obj: Todo = arr.find(x => x.Id == id)!;
        return obj
    }
    EditTodo(itemid: number): Todo {
        let val: Todo = this.GetTodo(itemid);
        return new Todo(val.Id, val.Missions, val.IsCompleted, val.Date);
    }
    DeleteTodo(int: number) {
        let del: Todo[] = arr.splice(arr.indexOf(this.GetTodo(int)), 1);
        return del
    }

}

function checkboxBtn(element: HTMLInputElement) {

    element.parentElement?.classList.toggle("line-through");
    element.nextElementSibling?.classList.toggle("line-through");
    let val = Number(element.parentElement?.getAttribute('data-id'));

    let obj = Todo.prototype.GetTodo(val)
    localStorage.removeItem(obj.Id.toString()!);
    obj.IsCompleted = true;
    localStorage.setItem(obj.Id.toString(), JSON.stringify(obj));
}

//#region Ekleme İşi Burda Yapılıyor.
document.querySelector('.todo-input-btn')?.addEventListener('click', function (e) {
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
function editBtnfunc(element: HTMLButtonElement): void {
    element.addEventListener('click', function (e) {
        e.preventDefault();
        let val = Number(element.parentElement?.getAttribute('data-id'));
        let obj: Todo = Todo.prototype.EditTodo(Number(val));
        input!.value = obj.Missions;

        Todo.prototype.DeleteTodo(obj.Id);
        localStorage.removeItem(obj.Id.toString());
        ListTodo();
    });
}
//#endregion

//#region Delete Btn
function deleteBtnfunc(element: HTMLButtonElement) {
    let id = Number(element.parentElement?.getAttribute('data-id'));
    Todo.prototype.DeleteTodo(id);
    localStorage.removeItem(id.toString());
    ListTodo();
}
//#endregion

function ListTodo() {
    list!.innerHTML = "";

    arr.forEach(element => {
        if (element.IsCompleted == false) {
            list!.innerHTML += `
            <li class="" data-id="${element.Id}" data-date="${element.Date}">
            <input type="checkbox" onchange="checkboxBtn(this)" class="form-check-input">
            <h6 class="text-visible">${element.Missions}</h6>
            <button class="todo-list-edit btn btn-warning" onclick="editBtnfunc(this)">Düzenle</button>
            <button class="todo-list-delete btn btn-danger" onclick="deleteBtnfunc(this)">Sil</button>
            </li>`;
        }
        else {
            list!.innerHTML += `
            <li class="line-through" data-id="${element.Id}" data-date="${element.Date}">
            <input type="checkbox" checked onchange="checkboxBtn(this)" class="form-check-input">
            <h6 class="line-through text-visible">${element.Missions}</h6>
            <button class="todo-list-edit btn btn-warning" onclick="editBtnfunc(this)">Düzenle</button>
            <button class="todo-list-delete btn btn-danger" onclick="deleteBtnfunc(this)">Sil</button>
            </li>`;
        }
    })

}

//#region Metodlar
function formatDate(date: Date) {
    const minutes = date.getMinutes().toString(); // Dakikayı 2 haneli yap
    const hours = date.getHours().toString(); // Saati 2 haneli yap
    const day = date.getDate().toString(); // Günü 2 haneli yap
    const month = (date.getMonth() + 1).toString(); // Ay sıfırdan başlar
    const year = date.getFullYear(); // Yıl

    return `${hours}:${minutes} ${day}/${month}/${year}`;
}

function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//#endregion