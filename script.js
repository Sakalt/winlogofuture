const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const generateButton = document.getElementById('generate');
const downloadButton = document.getElementById('download');
const startYearInput = document.getElementById('start-year');
const endYearInput = document.getElementById('end-year');
const initialSegmentsInput = document.getElementById('initial-segments');
const changeFrequencyInput = document.getElementById('change-frequency');

const colors = ['#FFFFFF', '#AAFFFF', '#44FFFF', '#00FFFF', '#00AAFF', '#0044FF', '#0000FF', '#00AAAA'];
const shapeTypes = [
  '4区切り', '8区切り', 'くりぬき', '枠のみ四角', '2角丸四角', '2角丸中図形',
  'グラデーション', 'なめらか四角', 'ひし形', '円形', '回転区切り', 'パソコン回転',
  '同心円', '三角形連なり', '六角形', '星形', '対角線模様', 'ノートパソコン', 'ノートパソコン枠',
  '八角形', '二重四角', '斜めストライプ', '縦ストライプ', '横ストライプ', '菱形パターン',
  '平行四辺形連なり', '回転多角形', 'ドーナツ形', '三重四角', '二重六角形', '太陽形', '波型四角',
  'Z字形', '弓形', 'サイクロン形', '電球形', 'カプセル形', 'ラダー形', 'メビウスの輪', '立方体'
];

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function drawShape(ctx, x, y, size, color, type) {
  ctx.fillStyle = color;
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;

  ctx.save();
  ctx.translate(x + size / 2, y + size / 2);
  ctx.rotate(Math.random() * Math.PI * 2);
  ctx.translate(-size / 2, -size / 2);

  switch (type) {
    case '4区切り':
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
          ctx.fillRect(i * size / 2, j * size / 2, size / 2, size / 2);
        }
      }
      ctx.clearRect(size / 4, size / 4, size / 2, size / 2);
      break;
    case '8区切り':
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          ctx.fillRect(i * size / 3, j * size / 3, size / 3, size / 3);
        }
      }
      ctx.clearRect(size / 6, size / 6, 2 * size / 3, 2 * size / 3);
      break;
    case 'くりぬき':
      ctx.fillRect(0, 0, size, size);
      ctx.clearRect(size / 4, size / 4, size / 2, size / 2);
      break;
    case '枠のみ四角':
      ctx.strokeRect(0, 0, size, size);
      ctx.fillRect(size / 4, size / 4, size / 2, size / 2);
      break;
    case '2角丸四角':
      ctx.beginPath();
      ctx.moveTo(0, size / 2);
      ctx.arcTo(0, 0, size / 2, 0, size / 4);
      ctx.lineTo(size, 0);
      ctx.arcTo(size, 0, size, size / 2, size / 4);
      ctx.lineTo(size, size);
      ctx.lineTo(0, size);
      ctx.closePath();
      ctx.fill();
      break;
    case '2角丸中図形':
      ctx.beginPath();
      ctx.moveTo(0, size / 2);
      ctx.arcTo(0, 0, size / 2, 0, size / 4);
      ctx.lineTo(size, 0);
      ctx.arcTo(size, 0, size, size / 2, size / 4);
      ctx.lineTo(size, size);
      ctx.lineTo(0, size);
      ctx.closePath();
      ctx.fill();
      ctx.clearRect(size / 4, size / 4, size / 2, size / 2);
      break;
    case 'グラデーション':
      const gradient = ctx.createLinearGradient(0, 0, size, size);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, getRandomElement(colors));
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);
      break;
    case 'なめらか四角':
      ctx.beginPath();
      ctx.moveTo(size / 4, 0);
      ctx.lineTo(3 * size / 4, 0);
      ctx.quadraticCurveTo(size, 0, size, size / 4);
      ctx.lineTo(size, 3 * size / 4);
      ctx.quadraticCurveTo(size, size, 3 * size / 4, size);
      ctx.lineTo(size / 4, size);
      ctx.quadraticCurveTo(0, size, 0, 3 * size / 4);
      ctx.lineTo(0, size / 4);
      ctx.quadraticCurveTo(0, 0, size / 4, 0);
      ctx.fill();
      break;
    case 'ひし形':
      ctx.save();
      ctx.translate(size / 2, size / 2);
      ctx.rotate(Math.PI / 4);
      ctx.fillRect(-size / 2, -size / 2, size, size);
      ctx.restore();
      break;
    case '円形':
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
      ctx.fill();
      break;
    case '回転区切り':
      for (let i = 0; i < 4; i++) {
        ctx.fillRect(size / 4, size / 4, size / 2, size / 2);
        ctx.rotate(Math.PI / 2);
      }
      break;
    case 'パソコン回転':
      ctx.beginPath();
      ctx.moveTo(-size / 2, -size / 4);
      ctx.lineTo(size / 2, -size / 4);
      ctx.lineTo(size / 4, size / 4);
      ctx.lineTo(-size / 4, size / 4);
      ctx.closePath();
      ctx.fill();
      break;
    case '同心円':
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2 - (i * size / 10), 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = (i % 2 === 0) ? getRandomElement(colors) : color;
      }
      break;
    case '三角形連なり':
      ctx.beginPath();
      ctx.moveTo(0, size);
      ctx.lineTo(size / 2, 0);
      ctx.lineTo(size, size);
      ctx.closePath();
      ctx.fill();
      ctx.translate(15, 15);
      ctx.fillStyle = getRandomElement(colors);
      ctx.beginPath();
      ctx.moveTo(0, size);
      ctx.lineTo(size / 2, 0);
      ctx.lineTo(size, size);
      ctx.closePath();
      ctx.fill();
      break;
    case '六角形':
      ctx.beginPath();
      ctx.moveTo(size / 4, 0);
      ctx.lineTo(3 * size / 4, 0);
      ctx.lineTo(size, size / 2);
      ctx.lineTo(3 * size / 4, size);
      ctx.lineTo(size / 4, size);
      ctx.lineTo(0, size / 2);
      ctx.closePath();
      ctx.fill();
      break;
    case '星形':
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        ctx.lineTo(
          size / 2 + size / 2 * Math.cos((18 + i * 72) * Math.PI / 180),
          size / 2 - size / 2 * Math.sin((18 + i * 72) * Math.PI / 180)
        );
        ctx.lineTo(
          size / 2 + size / 4 * Math.cos((54 + i * 72) * Math.PI / 180),
          size / 2 - size / 4 * Math.sin((54 + i * 72) * Math.PI / 180)
        );
      }
      ctx.closePath();
      ctx.fill();
      break;
    case '対角線模様':
      ctx.fillRect(0, 0, size, size);
      ctx.clearRect(0, 0, size, size / 2);
      ctx.clearRect(size / 2, size / 2, size / 2, size / 2);
      break;
    case 'ノートパソコン':
      ctx.fillRect(0, size / 2, size, size / 2);
      ctx.fillRect(size / 4, 0, size / 2, size / 2);
      break;
    case 'ノートパソコン枠':
      ctx.strokeRect(0, size / 2, size, size / 2);
      ctx.strokeRect(size / 4, 0, size / 2, size / 2);
      ctx.fillRect(size / 3, size / 3, size / 3, size / 3);
      break;
    case '八角形':
      ctx.beginPath();
      ctx.moveTo(size / 3, 0);
      ctx.lineTo(2 * size / 3, 0);
      ctx.lineTo(size, size / 3);
      ctx.lineTo(size, 2 * size / 3);
      ctx.lineTo(2 * size / 3, size);
      ctx.lineTo(size / 3, size);
      ctx.lineTo(0, 2 * size / 3);
      ctx.lineTo(0, size / 3);
      ctx.closePath();
      ctx.fill();
      break;
    case '二重四角':
      ctx.fillRect(0, 0, size, size);
      ctx.clearRect(size / 4, size / 4, size / 2, size / 2);
      ctx.fillRect(size / 3, size / 3, size / 3, size / 3);
      break;
    case '斜めストライプ':
      ctx.rotate(Math.PI / 4);
      for (let i = -size; i < size * 2; i += size / 3) {
        ctx.fillRect(i, -size, size / 3, size * 2);
      }
      break;
    case '縦ストライプ':
      for (let i = 0; i < size; i += size / 3) {
        ctx.fillRect(i, 0, size / 3, size);
      }
      break;
    case '横ストライプ':
      for (let i = 0; i < size; i += size / 3) {
        ctx.fillRect(0, i, size, size / 3);
      }
      break;
    case '菱形パターン':
      for (let i = 0; i < 4; i++) {
        ctx.rotate(Math.PI / 2);
        ctx.fillRect(size / 4, -size / 2, size / 2, size / 2);
      }
      break;
    case '平行四辺形連なり':
      ctx.beginPath();
      ctx.moveTo(0, size);
      ctx.lineTo(size / 2, 0);
      ctx.lineTo(size, size);
      ctx.lineTo(size / 2, 2 * size);
      ctx.closePath();
      ctx.fill();
      ctx.translate(15, 15);
      ctx.fillStyle = getRandomElement(colors);
      ctx.beginPath();
      ctx.moveTo(0, size);
      ctx.lineTo(size / 2, 0);
      ctx.lineTo(size, size);
      ctx.lineTo(size / 2, 2 * size);
      ctx.closePath();
      ctx.fill();
      break;
    case '回転多角形':
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        ctx.lineTo(size / 2 + size / 2 * Math.cos((Math.PI * 2 / 6) * i), size / 2 + size / 2 * Math.sin((Math.PI * 2 / 6) * i));
      }
      ctx.closePath();
      ctx.fill();
      break;
    case 'ドーナツ形':
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
      ctx.arc(size / 2, size / 2, size / 4, 0, 2 * Math.PI, true);
      ctx.fill();
      break;
    case '三重四角':
      ctx.fillRect(0, 0, size, size);
      ctx.clearRect(size / 4, size / 4, size / 2, size / 2);
      ctx.fillRect(size / 3, size / 3, size / 3, size / 3);
      ctx.clearRect(size / 2.5, size / 2.5, size / 5, size / 5);
      break;
    case '二重六角形':
      ctx.beginPath();
      ctx.moveTo(size / 4, 0);
      ctx.lineTo(3 * size / 4, 0);
      ctx.lineTo(size, size / 2);
      ctx.lineTo(3 * size / 4, size);
      ctx.lineTo(size / 4, size);
      ctx.lineTo(0, size / 2);
      ctx.closePath();
      ctx.fill();
      ctx.clearRect(size / 4, size / 4, size / 2, size / 2);
      ctx.beginPath();
      ctx.moveTo(size / 3, size / 4);
      ctx.lineTo(2 * size / 3, size / 4);
      ctx.lineTo(3 / 4 * size, size / 2);
      ctx.lineTo(2 * size / 3, 3 / 4 * size);
      ctx.lineTo(size / 3, 3 / 4 * size);
      ctx.lineTo(size / 4, size / 2);
      ctx.closePath();
      ctx.fill();
      break;
    case '太陽形':
      ctx.beginPath();
      for (let i = 0; i < 16; i++) {
        ctx.lineTo(size / 2 + size / 2 * Math.cos((Math.PI * 2 / 16) * i), size / 2 + size / 2 * Math.sin((Math.PI * 2 / 16) * i));
        if (i % 2 === 0) {
          ctx.lineTo(size / 2 + size / 4 * Math.cos((Math.PI * 2 / 16) * (i + 0.5)), size / 2 + size / 4 * Math.sin((Math.PI * 2 / 16) * (i + 0.5)));
        }
      }
      ctx.closePath();
      ctx.fill();
      break;
    case '波型四角':
      ctx.beginPath();
      ctx.moveTo(0, size / 2);
      ctx.quadraticCurveTo(size / 4, 0, size / 2, size / 2);
      ctx.quadraticCurveTo(3 * size / 4, size, size, size / 2);
      ctx.lineTo(size, size);
      ctx.lineTo(0, size);
      ctx.closePath();
      ctx.fill();
      break;
    case 'Z字形':
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(size, 0);
      ctx.lineTo(0, size);
      ctx.lineTo(size, size);
      ctx.closePath();
      ctx.fill();
      break;
    case '弓形':
      ctx.beginPath();
      ctx.moveTo(0, size);
      ctx.quadraticCurveTo(size / 2, 0, size, size);
      ctx.closePath();
      ctx.fill();
      break;
    case 'サイクロン形':
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        ctx.arc(size / 2, size / 2, (size / 2) * (i + 1) / 4, 0, Math.PI * 2);
      }
      ctx.closePath();
      ctx.fill();
      break;
    case '電球形':
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 3, 0, Math.PI * 2);
      ctx.moveTo(size / 2 - size / 6, size / 2);
      ctx.lineTo(size / 2 + size / 6, size / 2);
      ctx.lineTo(size / 2 + size / 6, size);
      ctx.lineTo(size / 2 - size / 6, size);
      ctx.closePath();
      ctx.fill();
      break;
    case 'カプセル形':
      ctx.beginPath();
      ctx.arc(size / 4, size / 2, size / 4, Math.PI / 2, -Math.PI / 2);
      ctx.lineTo(3 * size / 4, 0);
      ctx.arc(3 * size / 4, size / 2, size / 4, -Math.PI / 2, Math.PI / 2);
      ctx.closePath();
      ctx.fill();
      break;
    case 'ラダー形':
      ctx.beginPath();
      for (let i = 0; i < size; i += size / 5) {
        ctx.moveTo(0, i);
        ctx.lineTo(size, i);
      }
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(size / 4, 0);
      ctx.lineTo(size / 4, size);
      ctx.moveTo(3 * size / 4, 0);
      ctx.lineTo(3 * size / 4, size);
      ctx.stroke();
      break;
    case 'メビウスの輪':
      ctx.beginPath();
      for (let i = 0; i < 360; i++) {
        let rad = i * Math.PI / 180;
        let r = (size / 2) * (1 + Math.cos(2 * rad)) / 2;
        ctx.lineTo(size / 2 + r * Math.cos(rad), size / 2 + r * Math.sin(rad));
      }
      ctx.closePath();
      ctx.fill();
      break;
    case '立方体':
      ctx.beginPath();
      ctx.moveTo(size / 4, 0);
      ctx.lineTo(3 * size / 4, 0);
      ctx.lineTo(size, size / 2);
      ctx.lineTo(3 * size / 4, size);
      ctx.lineTo(size / 4, size);
      ctx.lineTo(0, size / 2);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(size / 4, 0);
      ctx.lineTo(0, size / 2);
      ctx.lineTo(size / 4, size);
      ctx.lineTo(3 * size / 4, size);
      ctx.lineTo(size, size / 2);
      ctx.lineTo(3 * size / 4, 0);
      ctx.closePath();
      ctx.stroke();
      break;
  }

  ctx.restore();
}

function drawLogo(ctx, x, y, size, year, color, type) {
  drawShape(ctx, x, y, size, color, type);
  ctx.fillStyle = 'black';
  ctx.font = '16px Arial';
  ctx.fillText(`${year}年`, x, y + size + 20);
}

function generateLogos() {
  const initialSegments = parseInt(initialSegmentsInput.value);
  const changeFrequency = parseInt(changeFrequencyInput.value);
  const startYear = parseInt(startYearInput.value);
  const endYear = parseInt(endYearInput.value);

  const intervals = 40;
  const years = Array.from({ length: intervals }, (_, i) => startYear + Math.floor((endYear - startYear) / intervals * i));

  const logoSize = 100;
  let x = 50;
  let y = 50;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const initialShapes = Array.from({ length: initialSegments }, () => '4区切り');
  const remainingShapes = shapeTypes.filter(shape => shape !== '4区切り');

  years.forEach((year, index) => {
    const color = getRandomElement(colors);
    let type;
    if (index < initialSegments) {
      type = '4区切り';
    } else if (index % changeFrequency === 0) {
      type = getRandomElement(remainingShapes);
    } else {
      type = initialShapes[index % initialShapes.length];
    }
    drawLogo(ctx, x, y, logoSize, year, color, type);
    x += logoSize + 50;
    if (x + logoSize > canvas.width) {
      x = 50;
      y += logoSize + 50;
    }
  });
}

function downloadImage() {
  const link = document.createElement('a');
  link.download = 'windows_logo_evolution.png';
  link.href = canvas.toDataURL();
  link.click();
}

generateButton.addEventListener('click', generateLogos);
downloadButton.addEventListener('click', downloadImage);
