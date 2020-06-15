const getStock = async() => {
    let data;
    let input = [];

    data = await $.ajax({
        headers: { Accept: 'application.json' },
        type: 'GET',
        url: 'http://127.0.0.1:3000/data/stock',
        crossDomain: true,
    }).then((obj) => {
        return obj;
    });
    console.log(data);

    for (let i = 0; i < data.length; i++) {
        // input.push(data[i].stock);
    }

    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Chris Cask', 'Tom Tipple', 'Jacky Jump'],
            datasets: [{
                label: '# of cans in Stock',
                data: input,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
            }, ],
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                    },
                }, ],
            },
        },
    });
};

// // https://www.chartjs.org/docs/latest/developers/updates.html
// var ctx = document.getElementById('myChart').getContext('2d');
// var myChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: ['Chris Cask', 'Tom Tipple', 'Jacky Jump'],
//         datasets: [{
//             label: '# of cans in Stock',
//             data: [200, 170, 90],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//             ],
//             borderWidth: 1,
//         }, ],
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true,
//                 },
//             }, ],
//         },
//     },
// });

// var ctx = document.getElementById('myLineChart').getContext('2d');
// var myLineChart = new Chart(ctx, {
//     type: 'line',
//     data: {
//         labels: ['-2 days', 'yesterday', 'today'],
//         datasets: [{
//             label: '# of cans sold',
//             data: [40, 10, 50],
//             backgroundColor: ['rgba(1, 99, 135, 0.2)'],
//             borderColor: ['rgba(5, 9, 132, 1)'],
//             borderWidth: 1,
//         }, ],
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true,
//                 },
//             }, ],
//         },
//     },
// });

getStock();