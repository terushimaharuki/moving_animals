window.onload = () => {
  // ページ本体(body)が存在しないページでは実行しない
  if (!document.body) {
    return;
  }

  // ============== 🐋 クジラの設定 ==============
  const whale = document.createElement('img');
  const whaleImageSequence = [
    'images/whale/whale_1.png', 'images/whale/whale_2.png', 'images/whale/whale_3.png',
    'images/whale/whale_4.png', 'images/whale/whale_5.png', 'images/whale/whale_4.png',
    'images/whale/whale_3.png', 'images/whale/whale_2.png'
  ];
  let whaleFrameIndex = 0;
  const whaleSpeed = 0.6;
  let whaleDirection = Math.random() > 0.5 ? 'right' : 'left';

  // クジラの基本スタイルを設定
  whale.style.position = 'fixed';
  whale.style.zIndex = '9998'; // 女の子より少し後ろに
  whale.style.pointerEvents = 'none';
  whale.style.width = '100px';
  whale.style.height = 'auto';
  whale.src = chrome.runtime.getURL(whaleImageSequence[0]);

  function setupWhale(direction) {
    whale.style.top = Math.random() * 30 + '%'; // 高さをランダムに
    if (direction === 'right') {
      whale.style.transform = 'scaleX(-1)';
      whale.style.left = '-200px';
      whale.style.right = '';
    } else {
      whale.style.transform = 'scaleX(1)';
      whale.style.right = '-200px';
      whale.style.left = '';
    }
  }

  function animateWhale() {
    if (whaleDirection === 'right') {
      let currentLeft = parseFloat(whale.style.left);
      whale.style.left = (currentLeft + whaleSpeed) + 'px';
      if (currentLeft > window.innerWidth) {
        whaleDirection = Math.random() - 0.25 > 0.5 ? 'right' : 'left';
        setupWhale(whaleDirection);
      }
    } else {
      let currentRight = parseFloat(whale.style.right);
      whale.style.right = (currentRight + whaleSpeed) + 'px';
      if (currentRight > window.innerWidth) {
        whaleDirection = Math.random() + 0.25 > 0.5 ? 'right' : 'left';
        setupWhale(whaleDirection);
      }
    }
    requestAnimationFrame(animateWhale);
  }

  // クジラのアニメーション開始
  setupWhale(whaleDirection);
  document.body.appendChild(whale);
  setInterval(() => {
    whaleFrameIndex = (whaleFrameIndex + 1) % whaleImageSequence.length;
    whale.src = chrome.runtime.getURL(whaleImageSequence[whaleFrameIndex]);
  }, 125);
  animateWhale();


  // ============== 👧 女の子の設定 ==============
  const girl = document.createElement('img');
  const girlImageSequence = [
    'images/girl/girl_1.png', 'images/girl/girl_2.png', 'images/girl/girl_3.png',
    'images/girl/girl_4.png', 'images/girl/girl_5.png', 'images/girl/girl_4.png',
    'images/girl/girl_3.png', 'images/girl/girl_2.png'
  ];
  let girlFrameIndex = 0;
  const girlSpeed = 0.9;
  let girlDirection = Math.random() > 0.5 ? 'right' : 'left';

  // 女の子の基本スタイルを設定
  girl.style.position = 'fixed';
  girl.style.zIndex = '9999';
  girl.style.pointerEvents = 'none';
  girl.style.width = '80px';
  girl.style.height = 'auto';
  girl.src = chrome.runtime.getURL(girlImageSequence[0]);
  girl.style.bottom = '20px'; 

  function setupGirl(direction) {
    if (direction === 'right') {
      girl.style.transform = 'scaleX(-1)';
      girl.style.left = '-200px';
      girl.style.right = '';
    } else {
      girl.style.transform = 'scaleX(1)';
      girl.style.right = '-200px';
      girl.style.left = '';
    }
  }

  function animateGirl() {
    if (girlDirection === 'right') {
      let currentLeft = parseFloat(girl.style.left);
      girl.style.left = (currentLeft + girlSpeed) + 'px';
      if (currentLeft > window.innerWidth) {
        girlDirection = Math.random() - 0.25 > 0.5 ? 'right' : 'left';
        setupGirl(girlDirection);
      }
    } else {
      let currentRight = parseFloat(girl.style.right);
      girl.style.right = (currentRight + girlSpeed) + 'px';
      if (currentRight > window.innerWidth) {
        girlDirection = Math.random() + 0.25 > 0.5 ? 'right' : 'left';
        setupGirl(girlDirection);
      }
    }
    requestAnimationFrame(animateGirl);
  }

  // 女の子のアニメーションを開始
  setupGirl(girlDirection);
  document.body.appendChild(girl);
  setInterval(() => {
    girlFrameIndex = (girlFrameIndex + 1) % girlImageSequence.length;
    girl.src = chrome.runtime.getURL(girlImageSequence[girlFrameIndex]);
  }, 125);
  animateGirl();
};