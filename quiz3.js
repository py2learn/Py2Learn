(function() 
 {
  var allQuestions = [{
    question: "Qual é o resultado para if(m>4): print('é maior') else: print('é menor'), para um valor m = 3 (considerando que a identação se enocntra correta)?",
    options: ["é maior", "é menor", "dá erro de sintaxe", "dá erro de variável"],
    answer: 1
  }, {
    question: "O 'in' é utilizado para ...",
    options: ["para saber se é True", "para indicar que é valor", "indicar Falso", "saber se um valor se encontra numa coleção"],
    answer: 3
  }, {
    question: "O break dentro de um ciclo for ou no while...",
    options: ["faz uma pausa de 1 segundo", "pára a execução do código", "vai para o próximo bloco de código","bloqueia a função"],
    answer: 1
  },{
    question: "Para criar uma função em Python, utilizamos...",
    options: ["def()", "func()", "main()", "class()"],
    answer: 0
  }, {
    question: "O que faz a função funcao1()? - def funcao1(): for i in range(3): print('Olá Mundo!')",
    options: ["imprime 'Olá Mundo'", "imprime 'Olá Mundo 3 vezes'", "imprime 'Olá Mundo 3-1 vezes'", "imprime 'Olá Mundo se i pertencer a 3'"],
    answer: 1
  },{
    question: "Para utilizar uma função acima, precisamos de fazer ...",
    options: ["funcao1()", "funcao1(2)", "print(funcao1())", "print(funcao1(i))"],
    answer: 0
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