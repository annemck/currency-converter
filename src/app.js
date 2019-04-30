import Vue from 'vue';

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: '#app',
    data: {
      date: null,
      allRates: null,
      checkAmount: null,
      oldCheckAmount: null,
      fromValue: 1.00,
      toValue: 1.00,
      newRate: 0.00
    },
    methods: {
      getRates: function(){
        fetch("https://api.exchangeratesapi.io/latest")
        .then(response => response.json())
        .then((data) => {
          // console.log(data.rates);
          this.date = data.date;
          this.allRates = data.rates;
        })
      },
      checkCurrency: function(){
        if (this.fromValue === 1.00){
          this.newRate = (this.checkAmount * this.toValue).toFixed(2);
        }
        else if (this.toValue === 1.00){
          this.newRate = (this.checkAmount/this.fromValue).toFixed(2);
        }
        else {
          this.newRate = ((this.checkAmount * this.fromValue) * this.toValue).toFixed(2);
        }
        this.checkAmount = null;
      }
    },
    mounted(){
      this.getRates();
    }
  });
});
