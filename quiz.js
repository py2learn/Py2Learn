(function() 
 {
  var allQuestions = [{
    question: "Para adicionar um comentário em Python utilizamos:",
    options: ["//", "#", "!", "**/**"],
    answer: 1
  }, {
    question: "Que tipo de variável é esta? - val = 2.",
    options: ["String", "Int", "Boolean", "Float"],
    answer: 3
  }, {
    question: "O que falta na seguinte expressão, para que possa ser impressa na consola? - ...(val)",
    options: ["press", "print", "pop","log"],
    answer: 1
  },{
    question: "Qual o método que a classe String usa para colocar as letras todas em maiúsculo?",
    options: ["upper()", "up()", "down()", "lower()"],
    answer: 0
  }, {
    question: "Qual o resultado de type('true') ?",
    options: ["Char", "Str", "Word", "Boolean"],
    answer: 1
  },{
    question: "Se criares uma variável de come 'num' com o valor 6, como fica?",
    options: ["num=6", "var num = 6", "num = [6]", "num == 6"],
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
            alert('Por favor escolhe uma opção !');
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