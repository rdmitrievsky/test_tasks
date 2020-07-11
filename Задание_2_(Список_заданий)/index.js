'use strict'

class TaskUI {
    constructor() {
        this.$input = document.querySelector('#last_name');
        this.$submit = document.querySelector('#submit-btn');
        this.$ul = document.querySelector('ul');
        this.$deleteTask = document.querySelector('.delete-item');
        this.$clearTask = document.querySelector('.clear-list');
    }
}
class ShowItem extends TaskUI {
    constructor(options) {
        super()
        this.title = options.title
        this.liClass = options.liClass
        this.divText = options.divText
    }
    setTitle(title = this.title, liClass = this.liClass, divText = this.divText) {
        if (title) {
            const createLi = document.createElement('li');
            const newSpan = document.createElement('span');
            const newDiv = document.createElement('div');

            newSpan.className = liClass;
            newSpan.innerText = title;

            createLi.className = 'collection-item';

            newDiv.className = 'secondary-content';
            newDiv.innerHTML = divText;

            createLi.appendChild(newSpan);
            createLi.appendChild(newDiv);
            this.$ul.appendChild(createLi)

            this.addToLocalStore()
            this.clearInput()
        } else {
            alert('Нужно добавить задачу')
        }
    }

    loadItems() {
        let fromStorage = JSON.parse(localStorage.getItem('todos'))
        fromStorage != null && fromStorage.forEach(item => {
            this.setTitle(item.name, item.done ? 'task-item text-done' : 'task-item', `${ item.done ? '<i class="material-icons task-done task-done__true">check_box</i>' : '<i class="material-icons task-done">check_box_outline_blank</i>' } <i class="material-icons task-close">close</i>`)
        });
        this.clearButton()
    }

    addToLocalStore() {
        const lis = document.querySelectorAll('.collection-item');
        const newArr = []
        lis.forEach((li, index) => {
            newArr.push({ 'id': index + 1, 'name': li.firstChild.innerText, "done": li.lastChild.firstChild.classList.contains('task-done__true') ? true : false })
        })
        localStorage.setItem('todos', JSON.stringify(newArr))
    }

    clearTask(target) {
        const targetClass = target.target
        if (targetClass.matches('.task-done')) {
            targetClass.classList.toggle('task-done__true')
            if (targetClass.classList.contains('task-done__true')) {
                targetClass.innerText = 'check_box'
                targetClass.parentNode.previousSibling.classList.add('text-done')
            } else {
                targetClass.innerText = 'check_box_outline_blank'
                targetClass.parentNode.previousSibling.classList.remove('text-done')
            }
        }
        targetClass.classList.contains('task-close') ? targetClass.parentElement.parentElement.remove() : ''
        this.clearButton()
        this.addToLocalStore()
    }

    clearList() {
        while (this.$ul.firstChild) {
            this.$ul.removeChild(this.$ul.firstChild);
        }
        this.clearButton()
        localStorage.setItem('todos', JSON.stringify([]))
    }

    clearInput() {
        this.$input.value = ''
    }

    clearButton() {
        !this.$ul.firstChild ? this.$clearTask.classList.add('disabled') : this.$clearTask.classList.remove('disabled')
    }

    sortList(target) {
        const lis = document.querySelectorAll('.collection-item');
        lis.forEach(li => {
            let inputText = target.target.value
            let lisText = li.firstChild.innerText;
            lisText = lisText.slice(0);
            if (lisText.toLocaleLowerCase().indexOf(inputText.toLocaleLowerCase()) != -1) {
                li.style.display = "block";
            } else {
                li.style.display = "none";
            }
        })
    }
}
const zxc = new ShowItem({})
document.querySelector('form').addEventListener('submit', function(t) {
    const task = new ShowItem({
        title: document.querySelector('#last_name').value,
        liClass: 'task-item',
        divText: '<i class="material-icons task-done">check_box_outline_blank</i>  <i class="material-icons task-close">close</i>'
    })
    task.setTitle()
    task.clearButton()

    t.preventDefault()
})

document.querySelector('ul').addEventListener('mousedown', function(e) {
    zxc.clearTask(e)
})

document.addEventListener("DOMContentLoaded", function() {
    zxc.loadItems()
})

document.querySelector('#input-sort').addEventListener('keyup', e => {
    zxc.sortList(e)
})

document.querySelector('.clear-list').addEventListener('click', function() {
    zxc.clearList()
});