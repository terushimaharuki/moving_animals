window.onload = () => {
  // ページ本体(body)が存在しないページ（フレームページなど）では実行しない
  if (!document.body) {
    return;
  }

  // クジラの画像要素を作成
  const whale = document.createElement('img');

  // クジラのアニメーションフレームの順番を指定
  const imageSequence = [
    'images/wheel_1.png',
    'images/wheel_2.png',
    'images/wheel_3.png',
    'images/wheel_4.png',
    'images/wheel_5.png',
    'images/wheel_4.png',
    'images/wheel_3.png',
    'images/wheel_2.png'
  ];
  let frameIndex = 0;

  // 最初の画像を設定
  whale.src = chrome.runtime.getURL(imageSequence[0]);

  // クジラのスタイルを設定
  whale.style.position = 'fixed';
  whale.style.top = '5%'; // 画面の上から15%の位置
  whale.style.right = '-200px'; // 最初は画面の外（右側）に配置
  whale.style.zIndex = '9999'; // 他の要素より手前に表示
  whale.style.pointerEvents = 'none'; // クジラがクリックの邪魔をしないようにする
  whale.style.width = '100px'; // クジラのサイズ
  whale.style.height = 'auto';

  // ページにクジラを追加
  document.body.appendChild(whale);

  // 画像を切り替えてアニメーションさせる（パラパラ漫画）
  setInterval(() => {
    frameIndex = (frameIndex + 1) % imageSequence.length;
    whale.src = chrome.runtime.getURL(imageSequence[frameIndex]);
  }, 125); // 0.15秒ごとに画像を切り替え

  // クジラを右から左へ動かす
  function animateWhale() {
    let currentRight = parseFloat(whale.style.right);
    
    // 画面の幅を超えたら右端に戻す
    if (currentRight > window.innerWidth) {
      currentRight = -200; // 画像の幅分、画面外からスタート
    }

    // 少しずつ左に移動
    whale.style.right = (currentRight + 1) + 'px'; // この数字を大きくすると速くなる

    requestAnimationFrame(animateWhale);
  }

  // アニメーションを開始
  animateWhale();
};