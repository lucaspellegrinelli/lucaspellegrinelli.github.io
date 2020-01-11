Array.prototype.sum = function(){
  return this.reduce((a, b) => a + b, 0);
}

Array.prototype.mean = function(){
  return this.sum() / this.length;
}

Array.prototype.std = function(){
  let mean = this.mean();
  let diff_sq = 0;
  this.forEach(function(item){
    diff_sq += Math.pow(item - mean, 2);
  });

  return Math.sqrt(diff_sq / this.length);
};

Array.prototype.shuffle = function() {
  var i = this.length, j, temp;
  if (i == 0) return this;
  while(--i) {
     j = Math.floor(Math.random() * (i + 1));
     temp = this[i];
     this[i] = this[j];
     this[j] = temp;
  }
  return this;
}
