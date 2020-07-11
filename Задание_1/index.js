'use strict';

const hText = document.getElementById('headline-text')
const ul = document.querySelector('ul')

const getLi = document.getElementById('getLi')
const submit = document.getElementById('sub-btn')


!sessionStorage.texts && sessionStorage.setItem('texts', JSON.stringify([]))

let texts = JSON.parse(sessionStorage.getItem('texts'))
let showOnly = texts.filter(s => s.display === 'show')

function createLi(liText, liClass) {
    let newLi = document.createElement('li');
    newLi.className = liClass;
    newLi.innerText = liText;
    ul.append(newLi);
}

texts.forEach(text => {
    if (text.display === "show") {
        createLi(text.cont, 'show')
    } else if (text.display === 'hide') {
        createLi(text.cont, '')
    }
})

submit.addEventListener('submit', function(j) {
    if (getLi.value) {
        let newItem = { id: texts.length + 1, cont: getLi.value, display: 'show' }
        texts.push(newItem)
        sessionStorage.setItem('texts', JSON.stringify(texts))
        createLi(getLi.value, 'show')
        getLi.value = ''
        location.reload()
    }

    j.preventDefault()
})

document.addEventListener('mousedown', function(t) {
    const closestLi = t.target.closest('li')
    const allLis = document.querySelectorAll('li')
    const liTargetIndex = Array.prototype.indexOf.call(allLis, closestLi)
    if (closestLi && closestLi.classList.contains('show')) {
        closestLi.classList.toggle('show')
        texts[liTargetIndex].display = 'hide'
        location.reload()
    } else if (closestLi) {
        closestLi.classList.toggle('show')
        texts[liTargetIndex].display = 'show'
        location.reload()
    } else {
        false
    }
    sessionStorage.setItem('texts', JSON.stringify(texts))
})

function Counter() {
    let count = 0;

    return function() {
        return count < showOnly.length - 1 ? count += 1 : count = 0
    }
}
const cnt = Counter()


hText.children[0].innerText = showOnly.length ? showOnly[0].cont : 'добавьте пункты'

if (showOnly.length > 1) {
    hText.children[0].classList.add('animated')
    setInterval(() => {
        let localCounter = cnt()
        hText.children[0].innerText = showOnly.length ? showOnly[localCounter].cont : false
    }, 2500)
} else {
    hText.children[0].classList.remove('animated')
}