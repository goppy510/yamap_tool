window.addEventListener('DOMContentLoaded', function() {

  // 現在のタブのURLを取得して比較する
  chrome.tabs.getSelected( null, function(tab) {
    const tagExport = document.getElementsByClassName('export');
    const pattern = /https:\/\/yamap.com\/activities\/[0-9].+\/article/;
    if ( pattern.test(tab.url)) {
      // 活動日記のURLのとき
      createButton(tagExport);
      const exportBtn = document.getElementById('submit');

      // ボタンが押されたということをcontents_scriptsに送る
      exportBtn.onclick = () => {
        chrome.tabs.query( {active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage( tabs[0].id, {url: tabs[0].url}, function(item) {
            console.log("export button pushed");
          } );
        } );
      }
    } else {
      createErrorMessage(tagExport);
    }
  } );

  // エクスポートボタンを作成するメソッド
  function createButton(element) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.classList.add('export_inner');
    btn.setAttribute('id', 'submit');
    const MESSAGE = '活動日記をエクスポート';
    createMessageNode(btn, MESSAGE);
    // 親ノードを複数形(getElements)で取得しているのでindexが必要
    element[0].appendChild(btn);
  }

  // エラーメッセージ(表示用)作成
  function createErrorMessage(element) {
    let spantag = document.createElement('span');
    spantag.classList.add('export_inner');
    spantag.classList.add('error');
    const MESSAGE = 'このページでは使えません。';
    createMessageNode(spantag, MESSAGE);
    // 親ノードを複数形(getElements)で取得しているのでindexが必要
    element[0].appendChild(spantag);
  }

  // テキストノードを作成する
  function createMessageNode(element, message) {
    const textNode = document.createTextNode(message);
    element.appendChild(textNode);
  }
});
