function GraphMaker(dom_id, raw_data){
  this.dom_id = dom_id;
  this.dom_ctx = document.getElementById(dom_id).getContext('2d');
  this.options = build_options();

  function build_options(){
    let hist = get_hist_data();

    console.log(hist);

    return {
      type: 'line',
      data: {
        labels: hist[0],
        datasets: [
          {
            data: hist[2],
            label: 'Guarda de baixo',
            borderWidth: 2,
            backgroundColor: 'rgba(231, 76, 60,0.1)',
            borderColor: 'rgba(231, 76, 60,1)'
          },
          {
            data: hist[1],
            label: 'Guarda de cima',
            borderWidth: 5,
            backgroundColor: 'rgba(52, 152, 219, 0.1)',
            borderColor: 'rgba(52, 152, 219, 1)'
          }
        ]
      },
      options: {
        legend: {
          display: true
        },
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Probabilidade'
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Sucessos'
            },
            ticks: {
              autoSkip: true,
              maxTicksLimit: 7,
              maxRotation: 0,
              minRotation: 0
            }
          }]
        }
      }
    };
  }

  function get_hist_data(){
    let low_histogram = [];
    let high_histogram = [];
    let histogram_labels = [];

    for (let key in raw_data["low"]) {
      histogram_labels.push(key);
    }

    for (let key in raw_data["high"]) {
      if (!histogram_labels.includes(key)) histogram_labels.push(key);
    }
  
    histogram_labels.sort((a, b) => parseFloat(a) - parseFloat(b));

    histogram_labels.forEach(label => {
      if (label in raw_data["low"]){
        low_histogram.push(raw_data["low"][label] / raw_data["count"]);
      }else{
        low_histogram.push(0);
      }

      if (label in raw_data["high"]) {
        high_histogram.push(raw_data["high"][label] / raw_data["count"]);
      } else {
        high_histogram.push(0);
      }
    });

    return [histogram_labels, low_histogram, high_histogram];
  }
}

GraphMaker.prototype.reset_context = function(id){
  $('#' + id).remove();

  let graph_height = window.innerHeight > window.innerWidth ? 200 : 100;
  $('#graph-container').append('<canvas id="cumulative" height="' + graph_height + '"></canvas>');
  return document.querySelector('#' + id).getContext('2d');
}

GraphMaker.prototype.build_graph = function(){
  let a = new Chart(this.reset_context(this.dom_id), this.options);
}
