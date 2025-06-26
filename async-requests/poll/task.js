document.addEventListener('DOMContentLoaded', async () => {
  const pollTitle = document.getElementById('poll__title');
  const pollAnswers = document.getElementById('poll__answers');
  let pollId;

  // 1. Загрузка опроса
  async function loadPoll() {
    try {
      const response = await fetch('https://students.netoservices.ru/nestjs-backend/poll');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      pollId = data.id;
      renderPoll(data.data);
    } catch (error) {
      console.error('Ошибка при загрузке опроса:', error);
      pollTitle.textContent = 'Не удалось загрузить опрос. Пожалуйста, попробуйте позже.';
    }
  }

  // 2. Отображение опроса
  function renderPoll(data) {
    pollTitle.textContent = data.title;
    pollAnswers.innerHTML = '';

    data.answers.forEach((answer, index) => {
      const button = document.createElement('button');
      button.className = 'poll__answer';
      button.textContent = answer;
      button.addEventListener('click', () => vote(index));
      pollAnswers.appendChild(button);
    });
  }

  // 3. Отправка голоса
  async function vote(answerIndex) {
    try {
      const response = await fetch('https://students.netoservices.ru/nestjs-backend/poll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `vote=${pollId}&answer=${answerIndex}`
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      alert('Спасибо, ваш голос засчитан!');
      showResults(result.stat);
    } catch (error) {
      console.error('Ошибка при голосовании:', error);
      alert('Произошла ошибка при отправке голоса. Пожалуйста, попробуйте ещё раз.');
    }
  }

  // 4. Показ результатов
  function showResults(stat) {
    pollAnswers.innerHTML = '';
    
    const totalVotes = stat.reduce((sum, item) => sum + item.votes, 0);
    
    stat.forEach(item => {
      const percentage = totalVotes > 0 
        ? ((item.votes / totalVotes) * 100).toFixed(2) 
        : 0;
      
      const result = document.createElement('div');
      result.style.margin = '10px 0';
      result.innerHTML = `<strong>${item.answer}</strong>: ${percentage}% (${item.votes} голосов)`;
      pollAnswers.appendChild(result);
    });
    
    // Кнопка для нового опроса
    const newPollBtn = document.createElement('button');
    newPollBtn.className = 'poll__answer';
    newPollBtn.textContent = 'Пройти опрос ещё раз';
    newPollBtn.addEventListener('click', loadPoll);
    pollAnswers.appendChild(newPollBtn);
  }

  // Инициализация
  loadPoll();
});