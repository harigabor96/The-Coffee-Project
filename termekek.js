
var UIController = (function(){

    //Egy kártya objektum formában
    var Card = function(sorszam) {
        this.Figure = document.getElementById('fig-'+sorszam);
        this.DecButton = document.getElementById('dec-'+sorszam);
        this.IncButton = document.getElementById('inc-'+sorszam);
        this.TextBox = document.getElementById('txt-'+sorszam);
        this.Calories = document.getElementById('span-'+sorszam);
    };

    Card.prototype.Increment = function() {
        if (parseInt(this.TextBox.value) === 0) {
            this.Figure.classList.add('activeproduct');
        }
        this.TextBox.value = parseInt(this.TextBox.value) + 1;
    };

    Card.prototype.Decrement = function() {
        if (parseInt(this.TextBox.value) === 1) {
            this.Figure.classList.remove('activeproduct');
        }
        if(this.TextBox.value > 0)
        {
            this.TextBox.value = parseInt(this.TextBox.value) - 1;
        }
    };

    Card.prototype.calcCalories = function() {
        return this.Calories.textContent * this.TextBox.value;
    };

    //Kártya objektumok gyújteménye
    var cardCollection = [];

    return {
        getCardObjects: function(){
            return cardCollection;
        },

        //Kártyák leképezése objektumgyűjteménnyé
        createCardObjects: function(){
            var i = 1;
            var curCard = new Card(1);
            while (curCard.Figure !== null) {
                cardCollection.push(curCard);
                curCard = new Card(++i);
            }
        },

        displayTotalCalories: function(){
            var total = 0;
            for (i = 0; i < cardCollection.length; i++) {
                total += cardCollection[i].calcCalories();
            }
            document.querySelector('.kcaltext').value = total;
        },

        resetAll: function(){
            cardCollection.forEach(calCard => {
                calCard.TextBox.value = 0;
                calCard.Figure.classList.remove('activeproduct');
            });
        }
    }
})();


var controller = (function(UICtrl) {
    //Setting up listeners for input
    var setupEventListeners = function(cardColl) {
        for (let i = 0; i < cardColl.length; i++) {
            cardColl[i].IncButton.addEventListener('click', function() {
                cardColl[i].Increment();
                UICtrl.displayTotalCalories();
            });
            cardColl[i].DecButton.addEventListener('click', function() {
                cardColl[i].Decrement();
                UICtrl.displayTotalCalories();
            });
        }
        document.querySelector('.resetgomb').addEventListener('click', function() {
            UICtrl.resetAll();
            UICtrl.displayTotalCalories();
        });
    };
  
    return {
        init: function() {
            UICtrl.createCardObjects();
            setupEventListeners(UICtrl.getCardObjects());
        }
    };
  })(UIController);
  
  controller.init();