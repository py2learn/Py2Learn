(function() 
 {
  var allQuestions = [{
    question: "Se criares a lista 'menu' que tenha os items 'entrada','salada','prato', 'sobremesa' nesta mesma ordem, qual o resultado de imprimires menu[2] ?",
    options: ["salada", "prato", "prato", "entrada"],
    answer: 2
  }, {
    question: "Que tipo de variável é esta? - val = 2.",
    options: ["String", "Int", "Boolean", "Float"],
    answer: 3
  }, {
    question: "Na lista anterior, como fazes para imprimir os 2 primeiros items?",
    options: ["print(menu[1:2])", "print(menu[:2])", "print(menu[-2])","print(menu[2])"],
    answer: 1
  },{
    question: "Para adicionar items à lista usas...?",
    options: ["append('item')", "+'item'", "pop('item')", "insert('item')"],
    answer: 0
  }, {
    question: "Caso a lista acima fosse um conjunto, seria possível fazer menu[3]?",
    options: ["Não", "Sim", "Talvez"],
    answer: 1
  },{
    question: "Se utilizar 'update()' num conjunto posso...",
    options: ["adicionar valores", "remover valores", "juntar conjuntos", "apagar conjunto"],
    answer: 0
  },{
    question: "Tendo o dicionário 'dictionaryM = {'film':'Home', 'year':'2015','char1':'Oh', 'char2':'Tip'}', se eu fizer 'popitem()', fico sem os elementos... ",
    options: ["'year':'2015'", "'char2':'Tip'", "'film':'Home'", "'char2':'Tip'"],
    answer: 3
  },{
    question: "Para criar um tuplo com 1 só elemento, devo fazer...",
    options: ["tuplo = ['koala']", "tuplo = {'koala'}", "tuplo = ('koala',)", "tuplo = ('koala')"],
    answer: 2
  },{
    question: "Para afetar um valor x da seguinte forma -> valor x = x % 2, utiliza-se ...",
    options: ["x %=2", "x/=2", "x %=% 2", "x//=2"],
    answer: 0
  },{
    question: "Qual dos seguintes operadores não funcionam com Booleanos?",
    options: ["and", "&=", "in", "or"],
    answer: 1
  }];
  
  var quesCounter = 0;
  var selectOptions = [];
  var quizSpace = $('#quiz');
    
  nextQuestion();
    
  $('#next').click(function () 
    {
        chooseOption();
        if (isNaN(selectOptions[quesCounter])) 
        {
            alert('Please select an option !');
        } 
        else 
        {
          quesCounter++;
          nextQuestion();
        }
    });
  
  $('#prev').click(function () 
    {
        chooseOption();
        quesCounter--;
        nextQuestion();
    });
  
  
  function createElement(index) 
    {
        var element = $('<div>',{id: 'question'});
        var header = $('<h2>Pergunta Num. ' + (index + 1) + ' :</h2>');
        element.append(header);

        var question = $('<p>').append(allQuestions[index].question);
        element.append(question);

        var radio = radioButtons(index);
        element.append(radio);

        return element;
    }
  
  function radioButtons(index) 
    {
        var radioItems = $('<ul class="ula">');
        var item;
        var input = '';
        for (var i = 0; i < allQuestions[index].options.length; i++) {
          item = $('<li class="ml">');
          input = '<input type="radio" name="answer" class = "rad" value=' + i + ' />';
          input += allQuestions[index].options[i];
          item.append(input);
          radioItems.append(item);
        }
        return radioItems;
  }
  
  function chooseOption() 
    {
        selectOptions[quesCounter] = +$('input[name="answer"]:checked').val();
    }
   
  function nextQuestion() 
    {
        quizSpace.fadeOut(function() 
            {
              $('#question').remove();
              if(quesCounter < allQuestions.length)
                {
                    var nextQuestion = createElement(quesCounter);
                    quizSpace.append(nextQuestion).fadeIn();
                    if (!(isNaN(selectOptions[quesCounter]))) 
                    {
                      $('input[value='+selectOptions[quesCounter]+']').prop('checked', true);
                    }
                    if(quesCounter === 1)
                    {
                      $('#prev').show();
                      $('#home').hide();
                    } 
                    else if(quesCounter === 0)
                    {
                      $('#prev').hide();
                      $('#next').show();
                      $('#home').hide();
                    }
                }
              else 
                {
                    var scoreRslt = displayResult();
                    quizSpace.append(scoreRslt).fadeIn();
                    $('#next').hide();
                    $('#prev').hide();
                    $('#home').show();
                }
        });
    }
  
  function displayResult() 
    {
        var score = $('<p>',{id: 'question'});
        var correct = 0;
        for (var i = 0; i < selectOptions.length; i++) 
        {
          if (selectOptions[i] === allQuestions[i].answer) 
          {
            correct++;
          }
        }
        score.append('Acertaste ' + correct + ' de ' +allQuestions.length+ ' perguntas!');
        return score;
  }
})();