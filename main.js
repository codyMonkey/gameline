const playBtn = document.getElementById('playFlappy');
const backBtn = document.getElementById('backBtn');
const flappyContainer = document.getElementById('flappyContainer');
const heading = document.querySelector('header h1');

playBtn.addEventListener('click', () => {
  flappyContainer.style.display = 'block';
  backBtn.style.display = 'inline-block';
  playBtn.style.display = 'none';
  heading.textContent = 'Flappy Bird';
});

backBtn.addEventListener('click', () => {
  flappyContainer.style.display = 'none';
  backBtn.style.display = 'none';
  playBtn.style.display = 'inline-block';
  heading.textContent = 'Welcome to Aomikage Games';
  
  // Reset iframe by reloading it
  const iframe = document.getElementById('flappyIframe');
  iframe.src = iframe.src;
});
