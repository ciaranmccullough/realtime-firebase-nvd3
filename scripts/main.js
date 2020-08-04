document.addEventListener('DOMContentLoaded', function () {
  let chelsea = null;
  let spurs = null;
  let arsenal = null;
  let qpr = null;

  // Initialize Firebase
  const firebaseConfig = {
    apiKey: 'AIzaSyCJSy1JNrOUgw1rp5yG9Bmm4dr_g042_RI',
    authDomain: 'new-graph.firebaseapp.com',
    databaseURL: 'https://new-graph.firebaseio.com',
    projectId: 'new-graph',
    storageBucket: 'new-graph.appspot.com',
    messagingSenderId: '710007196725',
    appId: '1:710007196725:web:d59c7309fb5c7e96c5357c',
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  function getData() {
    return [
      {
        label: 'Chelsea',
        value: chelsea,
      },
      {
        label: 'Spurs',
        value: spurs,
      },
      {
        label: 'Arsenal',
        value: arsenal,
      },
      {
        label: 'Qpr',
        value: qpr,
      },
    ];
  }

  function drawGraph() {
    var myColors = ['#0A4595', '#CEAA36', '#D90B1A', '#A8D2E0'];
    d3.scale.myColors = function () {
      return d3.scale.ordinal().range(myColors);
    };
    const data = getData();
    console.log('data', data);

    nv.addGraph(function () {
      const chart = nv.models
        .pieChart()
        .x(function (d) {
          return d.label;
        })
        .y(function (d) {
          return d.value;
        })
        .showLabels(true)
        .color(d3.scale.myColors().range());

      d3.select('#chart svg')
        .datum(data)
        .transition()
        .duration(350)
        .call(chart);

      return chart;
    });
  }

  const query = firebase.database().ref();

  query.on('value', (snapshot) => {
    const data = snapshot.val();
    console.log('new data', data);
    spurs = data.spurs;
    chelsea = data.chelsea;
    arsenal = data.arsenal;
    qpr = data.qpr;

    drawGraph();
  });

  // DOM ELEMENTS
  const spursButton = document.querySelector('#spurs');
  const chelseaButton = document.querySelector('#chelsea');
  const arsenalButton = document.querySelector('#arsenal');
  const qprButton = document.querySelector('#qpr');

  // Event Listeners
  spursButton.addEventListener('click', () => {
    console.log('Spurs!');
    query.child('spurs').set((spurs += 1));
  });
  chelseaButton.addEventListener('click', () => {
    console.log('Chelsea!');
    query.child('chelsea').set((chelsea += 1));
  });
  arsenalButton.addEventListener('click', () => {
    console.log('Arsenal!');
    query.child('arsenal').set((arsenal += 1));
  });
  qprButton.addEventListener('click', () => {
    console.log('Qpr!');
    query.child('qpr').set((qpr += 1));
  });
});
