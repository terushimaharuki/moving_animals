window.onload = () => {
  // ページ本体(body)が存在しないページでは実行しない
  if (!document.body) {
    return;
  }

  const whale = document.createElement('img');
  const imageSequence = [
    'images/whale_1.png', 'images/whale_2.png', 'images/whale_3.png',
    'images/whale_4.png', 'images/whale_5.png', 'images/whale_4.png',
    'images/whale_3.png', 'images/whale_2.png'
  ];
  let frameIndex = 0;
  const speed = 0.9; // クジラの速さ

  // クジラの基本スタイルを設定
  whale.style.position = 'fixed';
  whale.style.zIndex = '9999';
  whale.style.pointerEvents = 'none';
  whale.style.width = '100px';
  whale.style.height = 'auto';
  whale.src = chrome.runtime.getURL(imageSequence[0]);

  // クジラの向きと位置をセットアップする関数
  function setupWhale(direction) {
    // 高さをランダムに設定
    whale.style.top = Math.random() * 30 + '%';

    if (direction === 'right') { // 左から右へ動く場合
      whale.style.transform = 'scaleX(-1)'; // 画像を反転
      whale.style.right = ''; // 反対側のプロパティをクリア
      whale.style.left = '-200px'; // 画面左の外に配置
    } else { // 右から左へ動く場合
      whale.style.transform = 'scaleX(1)'; // 画像を通常向きに
      whale.style.left = ''; // 反対側のプロパティをクリア
      whale.style.right = '-200px'; // 画面右の外に配置
    }
  }

  // ★1. クジラの初期方向をランダムに決定
  let direction = Math.random() > 0.5 ? 'right' : 'left';
  setupWhale(direction); // 最初のセットアップ

  // ページにクジラを追加
  document.body.appendChild(whale);

  // 画像の切り替え（パラパラ漫画）
  setInterval(() => {
    frameIndex = (frameIndex + 1) % imageSequence.length;
    whale.src = chrome.runtime.getURL(imageSequence[frameIndex]);
  }, 125);

  // クジラを動かすメインの関数
  function animateWhale() {
    if (direction === 'right') { // 右へ動く処理
      let currentLeft = parseFloat(whale.style.left);
      whale.style.left = (currentLeft + speed) + 'px';

      // 画面の右端に消えたら…
      if (currentLeft > window.innerWidth) {
        // ★2. 次の方向をランダムに再決定
        direction = Math.random()-0.25 > 0.5 ? 'right' : 'left';
        setupWhale(direction); // 新しい方向で再セットアップ
      }
    } else { // 左へ動く処理
      let currentRight = parseFloat(whale.style.right);
      whale.style.right = (currentRight + speed) + 'px';

      // 画面の左端に消えたら…
      if (currentRight > window.innerWidth) {
        // ★2. 次の方向をランダムに再決定
        direction = Math.random()+0.25 > 0.5 ? 'right' : 'left';
        setupWhale(direction); // 新しい方向で再セットアップ
      }
    }
    requestAnimationFrame(animateWhale);
  }

  // アニメーションを開始
  animateWhale();
};