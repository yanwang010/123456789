let options;
let submitButton;
let result = "";
let table; // 用於存放 CSV 資料
let currentQuestion = 0; // 當前題目索引
let correctCount = 0; // 答對的題數
let incorrectCount = 0; // 答錯的題數

function preload() {
  // 載入 CSV 檔案
  table = loadTable('questions.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight); // 使用視窗的寬和高

  // 設定選項 (radio 按鈕)
  options = createRadio();
  options.style('font-size', '35px');
  options.style('color', '#f4a261');

  // 設定送出按鈕
  submitButton = createButton('送出');
  submitButton.style('font-size', '20px');
  submitButton.mousePressed(nextQuestion);

  // 顯示第一題
  displayQuestion();
}

function draw() {
  background('#f7e1d7'); // 設定背景顏色為 #f7e1d7

  // 設定填充顏色為 #ffc8dd
  fill('#ffc8dd');
  noStroke();

  // 計算矩形的位置和大小
  let rectWidth = width / 2;
  let rectHeight = height / 2;
  let rectX = (width - rectWidth) / 2;
  let rectY = (height - rectHeight) / 2;

  // 繪製矩形
  rect(rectX, rectY, rectWidth, rectHeight);

  // 顯示題目
  fill(0); // 黑色文字
  textSize(35);
  textAlign(CENTER, CENTER);

  if (currentQuestion < table.getRowCount()) {
    const question = table.getString(currentQuestion, 'question');
    text(question, width / 2, height / 2 - 50);
  } else {
    // 顯示測驗結果
    text(`測驗結束！`, width / 2, height / 2 - 100);
    text(`答對題數：${correctCount}`, width / 2, height / 2 - 50);
    text(`答錯題數：${incorrectCount}`, width / 2, height / 2);
  }

  // 顯示結果
  textSize(25);
  text(result, width / 2, height / 2 + 200);
}

// 當視窗大小改變時，調整畫布大小
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  options.position((windowWidth - 200) / 2, (windowHeight / 2) + 50);
  submitButton.position((windowWidth - 100) / 2, (windowHeight / 2) + 150);
}

function displayQuestion() {
  if (currentQuestion < table.getRowCount()) {
    // 清空選項
    options.remove();
    options = createRadio();
    options.style('font-size', '35px');
    options.style('color', '#f4a261');

    // 取得當前題目的選項
    const option1 = table.getString(currentQuestion, 'option1');
    const option2 = table.getString(currentQuestion, 'option2');
    const option3 = table.getString(currentQuestion, 'option3');
    const option4 = table.getString(currentQuestion, 'option4');

    // 設定選項
    options.option(option1, option1);
    options.option(option2, option2);
    options.option(option3, option3);
    options.option(option4, option4);

    // 設定選項位置
    options.position((windowWidth - 200) / 2, (windowHeight / 2) + 50);
    submitButton.position((windowWidth - 100) / 2, (windowHeight / 2) + 150);
  } else {
    // 測驗結束，按鈕顯示「再試一次」
    submitButton.html('再試一次');
    submitButton.mousePressed(restartQuiz);
  }
}

function nextQuestion() {
  if (currentQuestion < table.getRowCount()) {
    const answer = options.value(); // 獲取選中的選項值
    const correctAnswer = table.getString(currentQuestion, 'answer'); // 取得正確答案

    // 判斷答案是否正確
    if (answer === correctAnswer) {
      result = "答對";
      correctCount++;
    } else {
      result = "答錯了";
      incorrectCount++;
    }

    // 前往下一題
    currentQuestion++;
    displayQuestion();
  }
}

function restartQuiz() {
  // 重置測驗狀態
  currentQuestion = 0;
  correctCount = 0;
  incorrectCount = 0;
  result = "";
  submitButton.html('送出');
  submitButton.mousePressed(nextQuestion);
  displayQuestion();
}
