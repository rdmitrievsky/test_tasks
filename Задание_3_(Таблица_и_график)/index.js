'use strict'

const chartNames = []
const chartData = []
const tableBody = document.querySelector('tbody')

function App(rowIndex = 0) {
    Highcharts.chart('container', {

        title: {
            text: `FakeData Таблица + График`
        },

        // subtitle: {
        //     text: 'Source: thesolarfoundation.com'
        // },

        yAxis: {
            title: {
                text: 'Доход'
            }
        },

        xAxis: {
            categories: ["4 Недели Назад", "3 Недели Назад", "2 Недели Назад", "Неделю Назад", "Сегодня"]
        },

        legend: {
            enabled: false
        },

        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                }
            }
        },

        series: [{
            name: chartNames[rowIndex],
            data: chartData[rowIndex]
        }],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        enabled: false
                    }
                }
            }]
        }
    });
}

document.addEventListener('DOMContentLoaded', async function() {
    const response = await fetch('./data.json')
    const data = await response.json()
    data.forEach(j => {
        chartNames.push(j['name'])
        chartData.push(j['data'])

        const newTR = document.createElement('tr')
        const newTH = document.createElement('th')
        newTH.innerText = `${j['name']}`
        newTR.appendChild(newTH)
        tableBody.appendChild(newTR)
        j['data'].forEach(d => {
            const newTD = document.createElement('td')
            newTD.innerText = d ? `${d}` : 'нет данных'
            newTR.appendChild(newTD)
        })
        const tableData = j['data']
    })
    App()
})

document.querySelector('tbody').addEventListener('click', function(t) {
    const target = t.target
    const label = target.parentElement.firstElementChild.innerText
    const dataIndex = chartNames.findIndex(i => i == label)
    App(dataIndex)
})