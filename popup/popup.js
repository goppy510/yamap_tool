window.onload = ()  => {
  const fontColorEl = document.getElementById('fontcolor');
  const messageEl = document.getElementById('message');
  const submitBtnEl = document.getElementById('submit');

  // すでに保存されている情報があればそれを設定する処理
  chrome.storage.sync.get('selected_fontcolor', items => {
    fontColorEl.value = items.selected_fontcolor;
  });

  // ポップアップ画面でエクスポートされたときの処理
  submitBtnEl.onclick = () => {
    chrome.storage.sync.set({
      selected_fontcolor: fontColorEl.value,
    }, () => {
      messageEl.textContent = 'Saved';
      setTimeout(() => messageEl.textContent = '', 750);
    });
  }
};
