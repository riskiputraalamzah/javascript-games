document.addEventListener("DOMContentLoaded", () => {
<<<<<<< HEAD
  // Mendapatkan elemen-elemen yang diperlukan
  const instructionButton = document.querySelector(".instruction");
  const modal = document.getElementById("instruction-modal");
  const closeButton = document.querySelector(".close-button");
  const boxGame = document.querySelector(".box-game");
  const gameArea = document.querySelector(".game-area");
  const playerNameElement = document.getElementById("player-name");
  const playerScoreElement = document.getElementById("player-score");
  const gameTimerElement = document.getElementById("game-timer");
  const leaderboardContent = document.getElementById("leaderboard-content");
  const sortScoreButton = document.getElementById("sort-score");

  // Welcome screen elements
=======
  const modal = document.getElementById("instruction-modal");
  const closeButton = document.querySelector(".close-button");
  const instructionButtons = document.querySelectorAll(".instruction");

>>>>>>> fatchur/main
  const welcomeScreen = document.getElementById("welcome-screen");
  const player1NameInput = document.getElementById("player1-name");
  const player2NameInput = document.getElementById("player2-name");
  const playWithBotCheckbox = document.getElementById("play-with-bot");
  const gameLevelSelect = document.getElementById("game-level");
  const playGameButton = document.getElementById("play-game");

<<<<<<< HEAD
  // Enable/disable Play Game button based on input
  function updatePlayButtonState() {
    const player1Name = player1NameInput.value.trim();
    const player2Name = player2NameInput.value.trim();
    const gameLevel = gameLevelSelect.value;
    const playWithBot = playWithBotCheckbox.checked;

    if (player1Name && gameLevel && (playWithBot || player2Name)) {
      playGameButton.disabled = false;
    } else {
      playGameButton.disabled = true;
    }
  }

  player1NameInput.addEventListener("input", updatePlayButtonState);
  player2NameInput.addEventListener("input", updatePlayButtonState);
  playWithBotCheckbox.addEventListener("change", () => {
    player2NameInput.disabled = playWithBotCheckbox.checked;
    updatePlayButtonState();
  });
  gameLevelSelect.addEventListener("change", updatePlayButtonState);

  // Menampilkan modal instruksi saat tombol instruksi diklik
  instructionButton.addEventListener("click", () => {
    modal.classList.add("show");
  });

  // Menutup modal instruksi saat tombol close diklik
  closeButton.addEventListener("click", () => {
    modal.classList.remove("show");
  });

  // Menutup modal instruksi saat area di luar modal diklik
  window.addEventListener("click", (event) => {
    if (event.target == modal) {
      modal.classList.remove("show");
    }
  });

  // Menambahkan event listener untuk tombol play game
  playGameButton.addEventListener("click", () => {
    const player1Name = player1NameInput.value.trim();
    const player2Name = playWithBotCheckbox.checked
      ? "Bot"
      : player2NameInput.value.trim();
    const gameLevel = gameLevelSelect.value;

    document.getElementById("player1-name-display").innerText = player1Name;
    document.getElementById("player2-name-display").innerText = player2Name;

    welcomeScreen.style.display = "none";
    document.querySelector(".hexaria-container").style.display = "flex";

    initializeGame(gameLevel, player1Name, player2Name);
  });

  // Fungsi untuk memulai permainan
  function initializeGame(level, player1Name, player2Name) {
    hexariaBoard.innerHTML = "";
    hexagons = [];
    let disabledHexagonCount;

    switch (level) {
      case "easy":
        disabledHexagonCount = 4;
        break;
      case "medium":
        disabledHexagonCount = 6;
        break;
      case "hard":
        disabledHexagonCount = 8;
        break;
    }

    for (let i = 0; i < 80; i++) {
      const hexagon = document.createElement("div");
      hexagon.className = "hexagon";
      hexagon.addEventListener("click", () => placeHexagon(i));
      hexagons.push(hexagon);
      hexariaBoard.appendChild(hexagon);
    }

    // Randomly disable hexagons
    for (let i = 0; i < disabledHexagonCount; i++) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * hexagons.length);
      } while (hexagons[randomIndex].classList.contains("disabled"));
      hexagons[randomIndex].classList.add("disabled");
    }

    updateCurrentHexagon();
    updateTurnIndicator();
    if (player2Name === "Bot") {
      setTimeout(botMove, 1000);
    }
  }

  function updateCurrentHexagon() {
    currentHexagonValue = Math.floor(Math.random() * 20) + 1;
    currentHexagonElement.innerText = `Current Hexagon: ${currentPlayer} ${currentHexagonValue}`;
  }

  function placeHexagon(index) {
    const hexagon = hexagons[index];
    if (
      !hexagon.classList.contains("red") &&
      !hexagon.classList.contains("blue") &&
      !hexagon.classList.contains("disabled")
    ) {
      hexagon.classList.add(currentPlayer);
      hexagon.innerText = currentHexagonValue;
      updateScore();
      switchPlayer();
      updateCurrentHexagon();
      updateTurnIndicator();
      if (document.getElementById("player2-name-display").innerText === "Bot") {
        setTimeout(botMove, 1000);
      }
      checkGameOver();
    }
  }

  function switchPlayer() {
    currentPlayer = currentPlayer === "red" ? "blue" : "red";
  }

  function updateScore() {
    player1Score = calculateScore("red");
    player2Score = calculateScore("blue");
    player1ScoreElement.innerText = `Player 1 Score: ${player1Score}`;
    player2ScoreElement.innerText = `Player 2 Score: ${player2Score}`;
  }

  function calculateScore(player) {
    return hexagons
      .filter((hexagon) => hexagon.classList.contains(player))
      .reduce((sum, hexagon) => sum + parseInt(hexagon.innerText), 0);
  }

  function botMove() {
    const emptyHexagons = hexagons.filter(
      (hexagon) =>
        !hexagon.classList.contains("red") &&
        !hexagon.classList.contains("blue") &&
        !hexagon.classList.contains("disabled")
    );
    if (emptyHexagons.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyHexagons.length);
      const hexagon = emptyHexagons[randomIndex];
      hexagon.classList.add(currentPlayer);
      hexagon.innerText = currentHexagonValue;
      updateScore();
      switchPlayer();
      updateCurrentHexagon();
      updateTurnIndicator();
      checkGameOver();
    }
  }

  function checkGameOver() {
    const allFilled = hexagons.every(
      (hexagon) =>
        hexagon.classList.contains("red") ||
        hexagon.classList.contains("blue") ||
        hexagon.classList.contains("disabled")
    );
    if (allFilled) {
      const winner = player1Score > player2Score ? "Player 1" : "Player 2";
      showGameOver(winner, player1Score, player2Score);
    }
  }

  function showGameOver(winner, player1Score, player2Score) {
    const gameOverElement = document.createElement("div");
    gameOverElement.className = "game-over";
    gameOverElement.innerHTML = `
      <h2>Game Over</h2>
      <p>Winner: ${winner}</p>
      <p>Player 1 Score: ${player1Score}</p>
      <p>Player 2 Score: ${player2Score}</p>
      <button class="restart-game">Restart Game</button>
    `;
    document.body.appendChild(gameOverElement);

    document.querySelector(".restart-game").addEventListener("click", () => {
      document.body.removeChild(gameOverElement);
      initializeGame();
    });

    saveScore(winner, winner === "Player 1" ? player1Score : player2Score);
  }

  // Fungsi untuk menampilkan countdown
  function showCountdown(seconds, callback) {
    const countdownElement = document.createElement("div");
    countdownElement.className = "countdown";
    document.body.appendChild(countdownElement);

    let remainingSeconds = seconds;
    countdownElement.innerText = remainingSeconds;

    const interval = setInterval(() => {
      remainingSeconds -= 1;
      countdownElement.innerText = remainingSeconds;

      if (remainingSeconds <= 0) {
        clearInterval(interval);
        document.body.removeChild(countdownElement);
        callback();
      }
    }, 1000);
  }

  // Fungsi untuk memulai permainan
  function startGame(level, username, gunImage, targetImage) {
    const canvas = document.getElementById("game-canvas");
    const ctx = canvas.getContext("2d"); // Mendapatkan context 2D dari canvas
    const gunImg = new Image();
    const targetImg = new Image();
    const boomImg = new Image();
    const crosshairImg = new Image();
    gunImg.src = gunImage;
    targetImg.src = targetImage;
    boomImg.src = "./assets/Sprites/boom.png";
    crosshairImg.src = "./assets/Sprites/pointer.png";

    let time;
    let targetSpeed;
    let targetCount;
    let targetSize;
    switch (level) {
      case "easy":
        time = 30;
        targetSpeed = 1;
        targetCount = 3;
        targetSize = 100;
        break;
      case "medium":
        time = 20;
        targetSpeed = 2;
        targetCount = 4;
        targetSize = 75;
        break;
      case "hard":
        time = 15;
        targetSpeed = 3;
        targetCount = 5;
        targetSize = 50;
        break;
    }

    // Inisialisasi state permainan
    let score = 0;
    let targets = [];
    let gunX = canvas.width / 2 - 50;
    let gunY = canvas.height - 100;
    let crosshairX = 0;
    let crosshairY = 0;
    let boomEffect = null;

    // Memulai timer permainan
    gameTimerElement.innerText = `Time: ${time}s`;
    const interval = setInterval(() => {
      time -= 1;
      gameTimerElement.innerText = `Time: ${time}s`;

      if (time <= 0) {
        clearInterval(interval);
        endGame(score, username);
      }
    }, 1000);

    // Menambahkan target awal
    for (let i = 0; i < targetCount; i++) {
      addTarget();
    }

    // Menambahkan target baru setiap interval waktu tertentu
    const targetInterval = setInterval(() => {
      if (targets.length < targetCount) {
        addTarget();
      }
    }, 2000);

    // Fungsi untuk menambahkan target
    function addTarget() {
      const targetX = Math.random() * (canvas.width - targetSize);
      const targetY = Math.random() * (canvas.height - targetSize);
      const speedX = (Math.random() - 0.5) * targetSpeed;
      const speedY = (Math.random() - 0.5) * targetSpeed;
      targets.push({ x: targetX, y: targetY, speedX, speedY });
    }

    // Fungsi untuk menggambar elemen permainan
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Membersihkan canvas
      ctx.drawImage(gunImg, gunX - 50, canvas.height - 100, 100, 100); // Menggambar gambar senjata di canvas
      ctx.drawImage(crosshairImg, crosshairX - 25, crosshairY - 25, 50, 50); // Menggambar crosshair di canvas
      targets.forEach((target, index) => {
        target.x += target.speedX;
        target.y += target.speedY;

        // Memantulkan target jika mencapai tepi canvas
        if (target.x <= 0 || target.x >= canvas.width - targetSize) {
          target.speedX *= -1;
        }
        if (target.y <= 0 || target.y >= canvas.height - targetSize) {
          target.speedY *= -1;
        }

        ctx.drawImage(targetImg, target.x, target.y, targetSize, targetSize); // Menggambar target di canvas
      });

      // Menggambar efek ledakan jika ada
      if (boomEffect) {
        ctx.drawImage(boomImg, boomEffect.x, boomEffect.y, 100, 100);
      }

      requestAnimationFrame(draw); // Memanggil fungsi draw lagi pada frame berikutnya
    }

    // Event listener untuk menggerakkan crosshair dan senjata
    canvas.addEventListener("mousemove", (event) => {
      const rect = canvas.getBoundingClientRect();
      crosshairX = event.clientX - rect.left;
      crosshairY = event.clientY - rect.top;
      gunX = crosshairX; // Menggerakkan senjata secara horizontal mengikuti pointer
    });

    // Event listener untuk menembak target
    canvas.addEventListener("click", (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      targets.forEach((target, index) => {
        if (
          x >= target.x &&
          x <= target.x + targetSize &&
          y >= target.y &&
          y <= target.y + targetSize
        ) {
          score += 1;
          playerScoreElement.innerText = `Score: ${score}`;
          targets.splice(index, 1);
          boomEffect = { x: target.x, y: target.y };
          setTimeout(() => {
            boomEffect = null;
          }, 500);
        }
      });
    });

    draw(); // Memulai proses menggambar

    // Fungsi untuk mengakhiri permainan
    function endGame(finalScore, username) {
      clearInterval(targetInterval);
      targets = [];

      // Menampilkan popup game over
      const gameOverElement = document.createElement("div");
      gameOverElement.className = "game-over";
      gameOverElement.innerHTML = `
        <h2>Game Over</h2>
        <p>Username: ${username}</p>
        <p>Score: ${finalScore}</p>
        <button class="save-score">Save Score</button>
        <button class="restart-game">Restart Game</button>
      `;
      document.body.appendChild(gameOverElement);

      // Event listener untuk menyimpan skor
      document.querySelector(".save-score").addEventListener("click", () => {
        saveScore(username, finalScore);
      });

      // Event listener untuk memulai ulang permainan
      document.querySelector(".restart-game").addEventListener("click", () => {
        document.body.removeChild(gameOverElement);
        boxGame.style.display = "flex";
        gameArea.style.display = "none";
        playGame();
      });
    }

    // Fungsi untuk menyimpan skor
    function saveScore(username, score) {
      const matchHistory =
        JSON.parse(localStorage.getItem("matchHistory")) || [];
      matchHistory.push({ username, score, date: new Date() });
      localStorage.setItem("matchHistory", JSON.stringify(matchHistory));
      updateLeaderboard();
    }

    // Fungsi untuk memperbarui leaderboard
    function updateLeaderboard() {
      const matchHistory =
        JSON.parse(localStorage.getItem("matchHistory")) || [];
      leaderboardContent.innerHTML = "";
      matchHistory.forEach((match) => {
        const item = document.createElement("div");
        item.className = "leaderboard-item";
        item.innerHTML = `
          <span>${match.username}: ${match.score}</span>
          <button onclick="showDetails('${match.username}', ${match.score})">Details</button>
        `;
        leaderboardContent.appendChild(item);
      });
    }

    // Event listener untuk mengurutkan skor
    sortScoreButton.addEventListener("click", () => {
      const matchHistory =
        JSON.parse(localStorage.getItem("matchHistory")) || [];
      matchHistory.sort((a, b) => b.score - a.score);
      localStorage.setItem("matchHistory", JSON.stringify(matchHistory));
      updateLeaderboard();
    });

    updateLeaderboard();
  }

  // Fungsi untuk menampilkan detail skor
  window.showDetails = (username, score) => {
    alert(`Username: ${username}\nScore: ${score}`);
  };

  // Hexaria game logic
  const hexariaContainer = document.querySelector(".hexaria-container");
  const hexariaBoard = document.querySelector(".hexaria-board");
=======
  const hexariaContainer = document.querySelector(".hexaria-container");
  const leaderboardContent = document.getElementById("leaderboard-content");
  const sortScoreButton = document.getElementById("sort-score");
>>>>>>> fatchur/main
  const player1ScoreElement = document.getElementById("player1-score");
  const player2ScoreElement = document.getElementById("player2-score");
  const currentHexagonElement = document.getElementById("current-hexagon");
  const newGameButton = document.getElementById("new-game");
<<<<<<< HEAD
=======
  const canvas = document.getElementById("hexaria-board");
  const ctx = canvas.getContext("2d");
>>>>>>> fatchur/main

  let currentPlayer = "red";
  let currentHexagonValue = 1;
  let player1Score = 0;
  let player2Score = 0;
  let hexagons = [];
<<<<<<< HEAD

  const canvas = document.getElementById("hexaria-board");
  const ctx = canvas.getContext("2d");
  const hexRadius = 25;
  const hexHeight = Math.sqrt(3) * hexRadius;
  const hexWidth = 2 * hexRadius;
  let isPlayerTurn = true;
=======
  const hexRadius = 25;
  const hexHeight = Math.sqrt(3) * hexRadius;
  const hexWidth = 2 * hexRadius;

  let settings = {
    level: "easy",
    player1Name: "",
    player2Name: "",
  };

  function updatePlayButtonState() {
    const p1 = player1NameInput.value.trim();
    const p2 = player2NameInput.value.trim();
    const lvl = gameLevelSelect.value;
    const withBot = playWithBotCheckbox.checked;

    playGameButton.disabled = !(p1 && lvl && (withBot || p2));
  }

  player1NameInput.addEventListener("input", updatePlayButtonState);
  player2NameInput.addEventListener("input", updatePlayButtonState);
  gameLevelSelect.addEventListener("change", updatePlayButtonState);
  playWithBotCheckbox.addEventListener("change", () => {
    player2NameInput.disabled = playWithBotCheckbox.checked;
    updatePlayButtonState();
  });

  instructionButtons.forEach((btn) => {
    btn.addEventListener("click", () => modal.classList.add("show"));
  });
  closeButton.addEventListener("click", () => modal.classList.remove("show"));
  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("show");
  });

  playGameButton.addEventListener("click", () => {
    settings.player1Name = player1NameInput.value.trim();
    settings.player2Name = playWithBotCheckbox.checked
      ? "Bot"
      : player2NameInput.value.trim();
    settings.level = gameLevelSelect.value;

    document.getElementById("player1-name-display").innerText =
      settings.player1Name;
    document.getElementById("player2-name-display").innerText =
      settings.player2Name;

    welcomeScreen.style.display = "none";
    hexariaContainer.style.display = "flex";
    initializeGame(settings.level, settings.player1Name, settings.player2Name);
  });
>>>>>>> fatchur/main

  function drawHexagon(x, y, color, value) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
<<<<<<< HEAD
      ctx.lineTo(
        x + hexRadius * Math.cos((Math.PI / 3) * i),
        y + hexRadius * Math.sin((Math.PI / 3) * i)
      );
=======
      const angle = (Math.PI / 3) * i;
      ctx.lineTo(x + hexRadius * Math.cos(angle), y + hexRadius * Math.sin(angle));
>>>>>>> fatchur/main
    }
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
<<<<<<< HEAD
    ctx.stroke();
    if (value) {
      ctx.fillStyle = "#000";
      ctx.fillText(value, x - 5, y + 5);
=======
    ctx.strokeStyle = "#e5e7eb";
    ctx.stroke();

    if (value != null) {
      ctx.fillStyle = "#111827";
      ctx.font = "bold 12px Inter, sans-serif";
      const text = String(value);
      const metrics = ctx.measureText(text);
      ctx.fillText(text, x - metrics.width / 2, y + 4);
>>>>>>> fatchur/main
    }
  }

  function initializeGame(level, player1Name, player2Name) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hexagons.length = 0;
<<<<<<< HEAD
    let disabledHexagonCount;

    switch (level) {
      case "easy":
        disabledHexagonCount = 4;
        break;
      case "medium":
        disabledHexagonCount = 6;
        break;
      case "hard":
        disabledHexagonCount = 8;
        break;
    }

    const offsetX =
      (canvas.width - (10 * hexWidth * 0.75 + hexRadius * 0.25)) / 2;
    const offsetY = (canvas.height - 8 * hexHeight) / 2;

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 10; col++) {
        const x = col * hexWidth * 0.75 + hexRadius + offsetX;
        const y =
          row * hexHeight + (col % 2 === 0 ? hexHeight / 2 : 0) + offsetY;
        const hexagon = { x, y, color: "#ccc", value: null, disabled: false };
        hexagons.push(hexagon);
        drawHexagon(x, y, hexagon.color);
=======
    player1Score = 0;
    player2Score = 0;
    currentPlayer = "red";
    updateScore();
    updateTurnIndicator();

    let disabledHexagonCount = 4;
    if (level === "medium") disabledHexagonCount = 6;
    if (level === "hard") disabledHexagonCount = 8;

    const rows = 8;
    const cols = 10;
    const offsetX = (canvas.width - (cols * hexWidth * 0.75 + hexRadius * 0.25)) / 2;
    const offsetY = (canvas.height - rows * hexHeight) / 2;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * hexWidth * 0.75 + hexRadius + offsetX;
        const y = row * hexHeight + (col % 2 === 0 ? hexHeight / 2 : 0) + offsetY;
        const hex = { x, y, color: "#e5e7eb", value: null, disabled: false };
        hexagons.push(hex);
        drawHexagon(x, y, hex.color, null);
>>>>>>> fatchur/main
      }
    }

    for (let i = 0; i < disabledHexagonCount; i++) {
<<<<<<< HEAD
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * hexagons.length);
      } while (hexagons[randomIndex].disabled);
      hexagons[randomIndex].disabled = true;
      drawHexagon(hexagons[randomIndex].x, hexagons[randomIndex].y, "gray");
    }

    updateCurrentHexagon();
    updateTurnIndicator();
    if (player2Name === "Bot") {
      setTimeout(botMove, 1000);
=======
      let idx;
      do {
        idx = Math.floor(Math.random() * hexagons.length);
      } while (hexagons[idx].disabled);
      hexagons[idx].disabled = true;
      drawHexagon(hexagons[idx].x, hexagons[idx].y, "#d1d5db", null);
    }

    updateCurrentHexagon();
    if (player2Name === "Bot" && currentPlayer === "blue") {
      setTimeout(botMove, 600);
>>>>>>> fatchur/main
    }
  }

  function updateCurrentHexagon() {
    currentHexagonValue = Math.floor(Math.random() * 20) + 1;
<<<<<<< HEAD
    currentHexagonElement.innerText = `Current Hexagon: ${currentPlayer} ${currentHexagonValue}`;
  }

  function placeHexagon(index) {
    if (!isPlayerTurn) return;

    const hexagon = hexagons[index];
    if (
      !hexagon.color.includes("red") &&
      !hexagon.color.includes("blue") &&
      !hexagon.disabled
    ) {
      hexagon.color = currentPlayer;
      hexagon.value = currentHexagonValue;
      drawHexagon(hexagon.x, hexagon.y, hexagon.color, hexagon.value);
      updateScore();
      switchPlayer();
      updateCurrentHexagon();
      updateTurnIndicator();
      isPlayerTurn = false;
      if (document.getElementById("player2-name-display").innerText === "Bot") {
        setTimeout(botMove, 1000);
      }
      checkGameOver();
    }
=======
    currentHexagonElement.innerText = `Hexagon Sekarang: ${currentPlayer === 'red' ? 'merah' : 'biru'} ${currentHexagonValue}`;
  }

  function updateTurnIndicator() {
    const el = document.getElementById("current-turn");
    el.innerText = currentPlayer === "red" ? "Giliran Player 1" : "Giliran Player 2";
>>>>>>> fatchur/main
  }

  function switchPlayer() {
    currentPlayer = currentPlayer === "red" ? "blue" : "red";
<<<<<<< HEAD
    isPlayerTurn = true;
=======
    updateTurnIndicator();
  }

  function calculateScore(player) {
    return hexagons
      .filter((h) => h.color === player)
      .reduce((sum, h) => sum + (h.value || 0), 0);
>>>>>>> fatchur/main
  }

  function updateScore() {
    player1Score = calculateScore("red");
    player2Score = calculateScore("blue");
<<<<<<< HEAD
    player1ScoreElement.innerText = `Player 1 Score: ${player1Score}`;
    player2ScoreElement.innerText = `Player 2 Score: ${player2Score}`;
  }

  function calculateScore(player) {
    return hexagons
      .filter((hexagon) => hexagon.color === player)
      .reduce((sum, hexagon) => sum + hexagon.value, 0);
  }

  function botMove() {
    const emptyHexagons = hexagons.filter(
      (hexagon) =>
        !hexagon.color.includes("red") &&
        !hexagon.color.includes("blue") &&
        !hexagon.disabled
    );
    if (emptyHexagons.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyHexagons.length);
      const hexagon = emptyHexagons[randomIndex];
      hexagon.color = currentPlayer;
      hexagon.value = currentHexagonValue;
      drawHexagon(hexagon.x, hexagon.y, hexagon.color, hexagon.value);
      updateScore();
      switchPlayer();
      updateCurrentHexagon();
      updateTurnIndicator();
      checkGameOver();
    }
  }

  function updateTurnIndicator() {
    const currentTurnElement = document.getElementById("current-turn");
    if (currentPlayer === "red") {
      currentTurnElement.innerText = "Player 1";
    } else if (currentPlayer === "blue") {
      currentTurnElement.innerText = "Player 2";
    } else {
      currentTurnElement.innerText = "Bot";
    }
=======
    player1ScoreElement.innerText = `Skor Player 1: ${player1Score}`;
    player2ScoreElement.innerText = `Skor Player 2: ${player2Score}`;
  }

  function placeHexagon(index) {
    const h = hexagons[index];
    if (h.disabled || h.color === "red" || h.color === "blue") return;

    h.color = currentPlayer;
    h.value = currentHexagonValue;
    drawHexagon(h.x, h.y, h.color, h.value);
    updateScore();

    switchPlayer();
    updateCurrentHexagon();

    if (settings.player2Name === "Bot" && currentPlayer === "blue") {
      setTimeout(botMove, 600);
    }

    checkGameOver();
  }

  function botMove() {
    const empty = hexagons.filter(
      (h) => !h.disabled && h.color !== "red" && h.color !== "blue"
    );
    if (!empty.length) return;

    const i = Math.floor(Math.random() * empty.length);
    const hex = empty[i];

    hex.color = currentPlayer;
    hex.value = currentHexagonValue;
    drawHexagon(hex.x, hex.y, hex.color, hex.value);

    updateScore();
    switchPlayer();
    updateCurrentHexagon();
    checkGameOver();
>>>>>>> fatchur/main
  }

  function checkGameOver() {
    const allFilled = hexagons.every(
<<<<<<< HEAD
      (hexagon) =>
        hexagon.color.includes("red") ||
        hexagon.color.includes("blue") ||
        hexagon.disabled
    );
    if (allFilled) {
      const winner = player1Score > player2Score ? "Player 1" : "Player 2";
      showGameOver(winner, player1Score, player2Score);
    }
  }

  function showGameOver(winner, player1Score, player2Score) {
    const gameOverElement = document.createElement("div");
    gameOverElement.className = "game-over";
    gameOverElement.innerHTML = `
      <h2>Game Over</h2>
      <p>Winner: ${winner}</p>
      <p>Player 1 Score: ${player1Score}</p>
      <p>Player 2 Score: ${player2Score}</p>
      <button class="restart-game">Restart Game</button>
    `;
    document.body.appendChild(gameOverElement);

    document.querySelector(".restart-game").addEventListener("click", () => {
      document.body.removeChild(gameOverElement);
      initializeGame();
    });

    saveScore(winner, winner === "Player 1" ? player1Score : player2Score);
  }

  function saveScore(username, score) {
    const matchHistory = JSON.parse(localStorage.getItem("matchHistory")) || [];
    matchHistory.push({ username, score, date: new Date() });
    localStorage.setItem("matchHistory", JSON.stringify(matchHistory));
=======
      (h) => h.disabled || h.color === "red" || h.color === "blue"
    );
    if (!allFilled) return;

    let result = "Draw";
    if (player1Score > player2Score) result = "Player 1";
    if (player2Score > player1Score) result = "Player 2";
    showGameOver(result, player1Score, player2Score);
  }

  function showGameOver(winner, p1, p2) {
    const wrap = document.createElement("div");
    wrap.className = "game-over";
    wrap.style.position = "fixed";
    wrap.style.left = "50%";
    wrap.style.top = "50%";
    wrap.style.transform = "translate(-50%,-50%)";
    wrap.style.background = "#fff";
    wrap.style.padding = "20px";
    wrap.style.borderRadius = "12px";
    wrap.style.border = "1px solid #e5e7eb";
    wrap.style.boxShadow = "0 8px 30px rgba(2,6,23,.12)";
    wrap.style.zIndex = "1001";
    wrap.style.textAlign = "center";
    wrap.innerHTML = `
      <h2 style="margin-bottom:10px;color:#2563eb">Game Selesai!</h2>
      <p>Pemenang: ${winner === 'Player 1' ? 'Player 1' : winner === 'Player 2' ? 'Player 2' : 'Seri nih!'}</p>
      <p>Skor Player 1: ${p1}</p>
      <p>Skor Player 2: ${p2}</p>
      <div style="margin-top:12px;display:flex;gap:8px;justify-content:center">
        <button id="restart-game" style="padding:8px 12px;border-radius:10px;background:#2563eb;color:#fff;border:none">Main Lagi</button>
        <button id="save-score" style="padding:8px 12px;border-radius:10px;background:#fff;color:#2563eb;border:1px solid #2563eb">Simpan Skor</button>
      </div>
    `;
    document.body.appendChild(wrap);

    document.getElementById("restart-game").addEventListener("click", () => {
      document.body.removeChild(wrap);
      initializeGame(settings.level, settings.player1Name, settings.player2Name);
    });
    document.getElementById("save-score").addEventListener("click", () => {
      const scoreToSave =
        winner === "Player 1" ? p1 : winner === "Player 2" ? p2 : Math.max(p1, p2);
      const nameToSave =
        winner === "Player 1"
          ? settings.player1Name
          : winner === "Player 2"
          ? settings.player2Name
          : "Draw";
      saveScore(nameToSave, scoreToSave);
      document.body.removeChild(wrap);
    });
  }

  function saveScore(username, score) {
    const list = JSON.parse(localStorage.getItem("matchHistory")) || [];
    list.push({ username, score, date: new Date().toISOString() });
    localStorage.setItem("matchHistory", JSON.stringify(list));
>>>>>>> fatchur/main
    updateLeaderboard();
  }

  function updateLeaderboard() {
<<<<<<< HEAD
    const matchHistory = JSON.parse(localStorage.getItem("matchHistory")) || [];
    leaderboardContent.innerHTML = "";
    matchHistory.forEach((match) => {
      const item = document.createElement("div");
      item.className = "leaderboard-item";
      item.innerHTML = `
        <span>${match.username}: ${match.score}</span>
        <button onclick="showDetails('${match.username}', ${match.score})">Details</button>
      `;
=======
    const list = JSON.parse(localStorage.getItem("matchHistory")) || [];
    leaderboardContent.innerHTML = "";
    list.forEach((m) => {
      const item = document.createElement("div");
      item.className = "leaderboard-item";
      item.style.display = "flex";
      item.style.justifyContent = "space-between";
      item.style.gap = "8px";
      item.innerHTML = `
        <span>${m.username}: ${m.score}</span>
        <button class="detail-btn" style="padding:6px 10px;border-radius:8px;border:1px solid #e5e7eb;background:#fff;color:#1f2937;cursor:pointer">Details</button>
      `;
      item.querySelector(".detail-btn").addEventListener("click", () => {
        alert(`Nama: ${m.username}\nSkor: ${m.score}\nTanggal Main: ${new Date(m.date).toLocaleString()}`);
      });
>>>>>>> fatchur/main
      leaderboardContent.appendChild(item);
    });
  }

  sortScoreButton.addEventListener("click", () => {
<<<<<<< HEAD
    const matchHistory = JSON.parse(localStorage.getItem("matchHistory")) || [];
    matchHistory.sort((a, b) => b.score - a.score);
    localStorage.setItem("matchHistory", JSON.stringify(matchHistory));
    updateLeaderboard();
  });

  window.showDetails = (username, score) => {
    alert(`Username: ${username}\nScore: ${score}`);
  };

  canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    hexagons.forEach((hexagon, index) => {
      if (
        Math.sqrt((x - hexagon.x) ** 2 + (y - hexagon.y) ** 2) < hexRadius &&
        !hexagon.disabled
      ) {
        placeHexagon(index);
      }
    });
  });

  newGameButton.addEventListener("click", initializeGame);

  initializeGame();
=======
    const list = JSON.parse(localStorage.getItem("matchHistory")) || [];
    list.sort((a, b) => b.score - a.score);
    localStorage.setItem("matchHistory", JSON.stringify(list));
    updateLeaderboard();
  });

  canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

      for (let i = 0; i < hexagons.length; i++) {
      const h = hexagons[i];
      const dist = Math.hypot(x - h.x, y - h.y);
      if (dist <= hexRadius) {
        placeHexagon(i);
        break;
      }
    }
  });

  newGameButton.addEventListener("click", () => {
    initializeGame(settings.level, settings.player1Name, settings.player2Name);
  });

  updateLeaderboard();
>>>>>>> fatchur/main
});
