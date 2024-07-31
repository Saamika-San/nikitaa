// Surprise Message with Confetti
function showMessage() {
    const message = document.getElementById('message');
    const confettiContainer = document.getElementById('confetti');

    message.style.display = 'block';

    for (let i = 0; i < 300; i++) {
        const confettiPiece = document.createElement('div');
        confettiPiece.className = 'confetti-piece';
        confettiPiece.style.left = `${Math.random() * 100}vw`;
        confettiPiece.style.top = `${Math.random() * 100}vh`;
        confettiPiece.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
        confettiPiece.style.opacity = 1;
        confettiContainer.appendChild(confettiPiece);
    }

    setTimeout(() => {
        confettiContainer.innerHTML = '';
    }, 7000);
}

// Love Quiz Functionality
function startQuiz() {
    const questions = [
        { question: "Who Proposed first😀?", answer: "Saniya" },
        { question: "Who fell first😌?", answer: "Nikita" },
        {question:"who fell harder😌?",answer:"Saniya"},
        { question:"Nikita ka pehla baccha kon😝?", answer: "Saniya" },
        { question:"Who is Nakita Jago🧐😝?",answer:"Nikitaa"}, 
        {question:"I LOVE YOU NIKITA🥰",answer:"i love you too"} ,
        {question:"Do you think there's more questions🧐? yes/no",answer:"NULL"},
        {question:"HAHAHAHAH you were wrong , bye no more silly questions😁 just type ok!",answer:"ok"}    

    ];

    let score = 0;

    questions.forEach(q => {
        const userAnswer = prompt(q.question);
        if (userAnswer.toLowerCase() === q.answer.toLowerCase()) {
            score++;
        }
    });

    alert(`You got ${score} out of ${questions.length} questions right!`);
}

// Jigsaw Puzzle Functionality
function startPuzzle() {
    const puzzleContainer = document.getElementById('puzzleContainer');
    const puzzleMessage = document.getElementById('puzzleMessage');
    puzzleContainer.innerHTML = '';
    puzzleMessage.style.display = 'none';

    const imgSrc = 'puzzle.jpeg';
    const pieceSize = 100;
    const numRows = 3;
    const numCols = 3;

    let pieces = [];
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            pieces.push({ row, col });
        }
    }

    // Shuffle pieces
    pieces.sort(() => Math.random() - 0.5);

    pieces.forEach((piece, index) => {
        const puzzlePiece = document.createElement('div');
        puzzlePiece.className = 'puzzlePiece';
        puzzlePiece.draggable = true;
        puzzlePiece.style.backgroundImage = `url(${imgSrc})`;
        puzzlePiece.style.backgroundPosition = `-${piece.col * pieceSize}px -${piece.row * pieceSize}px`;
        puzzlePiece.dataset.position = index;
        puzzlePiece.dataset.row = piece.row;
        puzzlePiece.dataset.col = piece.col;
        puzzlePiece.style.gridColumnStart = (index % numCols) + 1;
        puzzlePiece.style.gridRowStart = Math.floor(index / numCols) + 1;

        puzzlePiece.addEventListener('dragstart', handleDragStart);
        puzzlePiece.addEventListener('dragover', handleDragOver);
        puzzlePiece.addEventListener('drop', handleDrop);
        puzzlePiece.addEventListener('dragend', handleDragEnd);

        puzzleContainer.appendChild(puzzlePiece);
    });

    function handleDragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.dataset.position);
        e.target.classList.add('dragging');
    }

    function handleDragOver(e) {
        e.preventDefault();
        if (e.target.classList.contains('puzzlePiece')) {
            e.target.classList.add('drag-over');
        }
    }

    function handleDrop(e) {
        e.preventDefault();
        if (e.target.classList.contains('puzzlePiece')) {
            const fromPosition = e.dataTransfer.getData('text/plain');
            const toPosition = e.target.dataset.position;

            const fromPiece = document.querySelector(`[data-position="${fromPosition}"]`);
            const toPiece = document.querySelector(`[data-position="${toPosition}"]`);

            const fromGridColumnStart = fromPiece.style.gridColumnStart;
            const fromGridRowStart = fromPiece.style.gridRowStart;
            fromPiece.style.gridColumnStart = toPiece.style.gridColumnStart;
            fromPiece.style.gridRowStart = toPiece.style.gridRowStart;
            toPiece.style.gridColumnStart = fromGridColumnStart;
            toPiece.style.gridRowStart = fromGridRowStart;

            const fromRow = fromPiece.dataset.row;
            const fromCol = fromPiece.dataset.col;
            const toRow = toPiece.dataset.row;
            const toCol = toPiece.dataset.col;

            fromPiece.dataset.row = toRow;
            fromPiece.dataset.col = toCol;
            toPiece.dataset.row = fromRow;
            toPiece.dataset.col = fromCol;

            fromPiece.dataset.position = toPosition;
            toPiece.dataset.position = fromPosition;

            checkCompletion();
        }
    }

    function handleDragEnd(e) {
        e.target.classList.remove('dragging');
        document.querySelectorAll('.puzzlePiece').forEach(piece => {
            piece.classList.remove('drag-over');
        });
    }

    function checkCompletion() {
        let completed = true;
        document.querySelectorAll('.puzzlePiece').forEach(piece => {
            const row = piece.dataset.row;
            const col = piece.dataset.col;
            const position = piece.dataset.position;

            if (parseInt(row) * numCols + parseInt(col) != position) {
                completed = false;
            }
        });

        if (completed) {
            puzzleMessage.style.display = 'block';
        } else {
            puzzleMessage.style.display = 'none';
        }
    }
}
document.getElementById('playPauseBtn').addEventListener('click', function() {
    var audio = document.getElementById('audio');
    if (audio.paused) {
        audio.play();
        this.textContent = 'Pause';
    } else {
        audio.pause();
        this.textContent = 'Play';
    }
});
function submitMessage() {
    const guestbook = document.getElementById('guestbook');
    const submittedMessages = document.getElementById('submittedMessages');
    const message = document.createElement('p');

    // Clear the guestbook value
    guestbook.value = '';

    // Set the message content to "te amo" and apply the CSS class
    message.textContent = 'Mere dil ke lifafe mein! Tera khat hain janiya!😊❤️';
    message.className = 'te-amo-style'; // Apply the CSS class

    // Append the "te amo" message to the submitted messages
    submittedMessages.appendChild(message);
}

