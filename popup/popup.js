window.onload = () => {

  // 現在のタブのURLを取得して比較する
  chrome.tabs.getSelected( null, function(tab) {
    const tagExport = document.getElementsByClassName('export');
    if ( /https:\/\/yamap.com\/activities\/[0-9].+\/article/.test(tab.url)) {
      // 活動日記のURLのとき
      createButton(tagExport);
    } else {
      createErrorMessage(tagExport);
    }
  } );

  // // エクスポートボタンが押されたらhtmlを取得する
  // const exportButton = document.getElementById('submit');
  // exportButton.onclick = () => {
  //   // 
  //   chrome.storage.local.set( {
  //     selected_html: 
  //   })
  // }

  // 著者取得
  function getAuthor() {
    const author = document.getElementsByClassName('ActivityDetailTabLayout__UserName')[0].innerText;
    return author;
  }
  // タイトルを取得
  function getTitle() {
    const title = document.getElementsByClassName('ActivityDetailTabLayout__Title')[0].innerText;
    return title;
  }

  // 公開ならMV形式に合わせてPUBLICを、非公開ならDRAFTを返す
  function getStatus() {
    const publicType = document.getElementsByClassName("ActivityDetailTabLayout__Header__PublicType");
    if (publicType === undefined) {
      return 'PUBLIC';
    }
    return 'DRAFT';
  }

  // 

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
}
