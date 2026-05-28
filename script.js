


if (document.getElementById('face-box')) {
    
    const skinColors = ['#C68642', '#FFDFC4', '#F0C27F', '#8D5524', '#4A2912'];
    const eyesList = ['◉ ◉', '◎ ◎', '○ ○', '▷ ◁', '◐ ◑', '◐ ◐', '◑ ◑'];
    const noseList = ['‿', 'ω', '∇', 'o', 'v', '>', '<'];
    const mouthList = ['⌣', '—', '⌢', '∪', 'ᵕ', 'ᗜ', 'м', 'w'];

  
    let skinIndex = 0;
    let eyesIndex = 0;
    let noseIndex = 0;
    let mouthIndex = 0;


 
    let history = []; 
    let historyIndex = -1; 


    const actionSounds = [
        'sounds/sound1.mp3',
        'sounds/sound2.mp3',
        'sounds/sound3.mp3',
        'sounds/sound4.mp3',
        'sounds/sound5.mp3'
    ];

    function playRandomSound() {
       
        const randomIndex = Math.floor(Math.random() * actionSounds.length);
       
        const audio = new Audio(actionSounds[randomIndex]);
        audio.play();
    }

    
    const faceBox = document.getElementById('face-box');
    const faceEyes = document.getElementById('face-eyes');
    const faceNose = document.getElementById('face-nose');
    const faceMouth = document.getElementById('face-mouth');


   
    function updateFace() {
        faceBox.style.backgroundColor = skinColors[skinIndex];
        faceEyes.textContent = eyesList[eyesIndex];
        faceNose.textContent = noseList[noseIndex];
        faceMouth.textContent = mouthList[mouthIndex];
    }

    //Undo/Redo історія
    function saveToHistory() {
        
        const state = { skinIndex, eyesIndex, noseIndex, mouthIndex };
        
        history = history.slice(0, historyIndex + 1);
            
        history.push(state);
        
        
        historyIndex++;
    }

  

   
    function setActiveTool(buttonId) {
   
        document.querySelectorAll('.column-left .retro-btn').forEach(btn => { btn.classList.remove('active'); });
        document.getElementById(buttonId).classList.add('active');
    }

  
    document.getElementById('btn-skin').addEventListener('click', function() {
        setActiveTool('btn-skin');
        skinIndex = (skinIndex + 1) % skinColors.length;
        updateFace();
        saveToHistory();
    });

 
    document.getElementById('btn-eyes').addEventListener('click', function() {
        setActiveTool('btn-eyes');
        eyesIndex = (eyesIndex + 1) % eyesList.length;
        updateFace();
        saveToHistory();
    });


    document.getElementById('btn-nose').addEventListener('click', function() {
        setActiveTool('btn-nose');
        noseIndex = (noseIndex + 1) % noseList.length;
        updateFace();
        saveToHistory();
    });

    document.getElementById('btn-mouth').addEventListener('click', function() {
        setActiveTool('btn-mouth');
        mouthIndex = (mouthIndex + 1) % mouthList.length;
        updateFace();
        saveToHistory();
    });



    //Undo
    document.getElementById('btn-undo').addEventListener('click', function() {
        if (historyIndex > 0) {
            playRandomSound();
            
            historyIndex--; 
            const state = history[historyIndex]; 
            
            skinIndex = state.skinIndex;
            eyesIndex = state.eyesIndex;
            noseIndex = state.noseIndex;
            mouthIndex = state.mouthIndex;
            
            updateFace(); 
        }
    });

    //Redo
    document.getElementById('btn-redo').addEventListener('click', function() {
        if (historyIndex < history.length - 1) {
            playRandomSound(); 

            historyIndex++; 
            const state = history[historyIndex];
            
            skinIndex = state.skinIndex;
            eyesIndex = state.eyesIndex;
            noseIndex = state.noseIndex;
            mouthIndex = state.mouthIndex;
            
            updateFace();
        }
    });
    //РАНДОМАЙЗЕР
    document.getElementById('btn-random').addEventListener('click', function() {
        
        skinIndex = Math.floor(Math.random() * skinColors.length);
        eyesIndex = Math.floor(Math.random() * eyesList.length);
        noseIndex = Math.floor(Math.random() * noseList.length);
        mouthIndex = Math.floor(Math.random() * mouthList.length);
        
        updateFace();
        saveToHistory();
    });

   
    document.getElementById('btn-save').addEventListener('click', function() {
        alert('💾 Колись функція збереження буде реалізована...');
    });

   document.getElementById('btn-help').addEventListener('click', function() {
        window.open('guide.html', '_blank');
    });

    
    //Дефолт, 0 елемент історії при завантаженні сторінки
    saveToHistory();
}

//ПРОФІЛЬ

if (document.getElementById('btn-tab-login')) {

    const btnLogin = document.getElementById('btn-tab-login');
    const btnRegister = document.getElementById('btn-tab-register');
    const formLogin = document.getElementById('form-login');
    const formRegister = document.getElementById('form-register');
    const authBox = document.querySelector('.auth-container');
    const dashboard = document.getElementById('user-dashboard');
    const welcomeName = document.getElementById('welcome-name');
    const logoutBtn = document.getElementById('btn-logout');

    const savedName = localStorage.getItem('userName');
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn === 'true') {
        authBox.style.display = 'none';
        dashboard.style.display = 'block';
        if (savedName) welcomeName.textContent = `Вітаємо, ${savedName}!`; //шаблонний рядок
    }

    formLogin.addEventListener('submit', function(e) {
        e.preventDefault();
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', 'Користувач'); 
        welcomeName.textContent = `Вітаємо, Користувач!`;
        authBox.style.display = 'none';
        dashboard.style.display = 'block';
    });

    formRegister.addEventListener('submit', function(e) {
        e.preventDefault();
        const userName = document.querySelector('input[placeholder="Ваше ім\'я"]').value;
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', userName);
        welcomeName.textContent = `Вітаємо, ${userName}!`;
        authBox.style.display = 'none';
        dashboard.style.display = 'block';
    });

    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userName');
        dashboard.style.display = 'none';
        authBox.style.display = 'block';
    });

    btnRegister.addEventListener('click', function() {
        formLogin.style.display = 'none';
        formRegister.style.display = 'block';
        btnLogin.classList.remove('active');
        btnRegister.classList.add('active');
    });

    btnLogin.addEventListener('click', function() {
        formRegister.style.display = 'none';
        formLogin.style.display = 'block';
        btnRegister.classList.remove('active');
        btnLogin.classList.add('active');
    });

    const toggleButtons = document.querySelectorAll('.toggle-password');
    toggleButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const targetId = button.getAttribute('data-target');
            const passwordInput = document.getElementById(targetId);
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                button.textContent = '🙈';
            } else {
                passwordInput.type = 'password';
                button.textContent = '👁️';
            }
        });
    });

    const bioInput = document.getElementById('user-bio');
    const counterText = document.getElementById('char-counter');
    const maxLength = 100;
    bioInput.addEventListener('input', function() {
        const currentLength = bioInput.value.length;
        counterText.textContent = `${currentLength} / ${maxLength} символів`;
        if (currentLength >= 90) counterText.classList.add('text-danger');
        else counterText.classList.remove('text-danger');
    });
}


const siteLogo = document.querySelector('.header_nav img');
if (siteLogo) {
    let clickCount = 0;
    let clickTimer;
    siteLogo.style.cursor = 'pointer';
    siteLogo.addEventListener('click', function() {
        clickCount++;
        clearTimeout(clickTimer);
        clickTimer = setTimeout(() => clickCount = 0, 2000);
        if (clickCount === 5) {
            siteLogo.style.transition = 'transform 1s ease-in-out';
            siteLogo.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                alert('✨ Пасхалка ✨');
                siteLogo.style.transform = 'rotate(0deg)';
                clickCount = 0;
            }, 1000);
        }
    });
}


//ПАРАЛАКС

const parallaxArea = document.querySelector('.parallax-container');
const parallaxItems = document.querySelectorAll('.parallax-item');


if (parallaxArea) {
    
    parallaxArea.addEventListener('mousemove', function(event) {
        
       
        parallaxItems.forEach(function(item) {
            const speed = item.getAttribute('data-speed');
            
            const x = (window.innerWidth - event.pageX * speed) / 100;
            const y = (window.innerHeight - event.pageY * speed) / 100;

            item.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    });
}

