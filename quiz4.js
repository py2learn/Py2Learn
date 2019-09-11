(function() 
 {
  var allQuestions = [{
    question: "Para criar uma classe em Python recorremos a",
    options: ["main 'nomeClasse'", "def 'nomeClasse()'", "class 'nomeClasse'", "class 'nomeClasse'()"],
    answer: 2
  }, {
    question: "O __init__ é um método essencial?",
    options: ["Sim, para quando a classe for instanciada", "Não, não é obrigatório tê-lo", "Sim, desde que seja chamada", "Não"],
    answer: 3
  }, {
    question: "Todos os métodos de uma classe incluindo o __init__ têm de ter o parâmetro 'self'",
    options: ["Sim, todos", "Não, não precisa ser exatamente com esse nome", "Sim, mas só alguns","Sim, mas o nome pode ser outro"],
    answer: (1 ||3)
  },{
    question: "Pode-se alterar um atributo de um objeto fazendo...",
    options: ["obj.atributo = 'novoAtributo'", "self.atributo = 'novoAtributo'", "obj.atributo = self.'novoAtributo'", "Nenhum dos anteriores"],
    answer: 0
  }, {
    question: "Para que uma classe herde de outra classe a classe-pai tem de ser referenciada da seguinte forma...",
    options: ["class C2 extends C1:", "class C2(C1):", "class C2 and C1:", "class C2 implements C1:"],
    answer: 1
  },{
    question: "Para que todos os métodos da classe-pai sejam herdados pela classe-filho, utiliza-se...",
    options: ["super()", "parent()", "self()", "main()"],
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