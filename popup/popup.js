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
      return 'Public';
    }
    return 'Draft';
  }

  // コメント投稿の可否を取得しMV形式に合わせてreturnする
  function isCommentable() {
    // 別ページから取得できるのか？
    chrome.tabs.getSelected( null, function(tab) {
      if ( /https:\/\/yamap.com\/activities\/[0-9].+\/comments#post/.test(url) ) {
        const commentForm = document.getElementsByClassName("CommentForm Comments__CommentForm")[0];
        if (commentForm === undefined) {
          return 0;
        }
      }
      return 1;
    } );
  }

  // 投稿日時は情報がないので登山を開始した日を登山日とする
  function getPostDate() {
    const timestamp = document.getElementsByClassName("ActivityDetailTabLayout__Middle__Date")[0].innerText;
    const dt = new Date(timestamp);
    const yyyy = dt.getFullYear();
    const mm   = (dt.getMonth()+1).toString().padStart(2, '0');
    const dd   = dt.getDate();
    return `${[mm, dd, yyyy].join('/')} 00:00:00 AM`;
  }

  // 活動記録本文を取得
  function getBody() {
    const result = document.getElementsByClassName("Article__Description LinkableText")[0].innerText;
    return result;
  }

  // 活動記録写真部分を取得
  function getImageBody() {
    const result = document.getElementsByClassName("ImagesGalleryList")[0].getElementsByTagName('img');
    // altとsrcを抜き出す処理が必要
    // imgタグをpタグで囲みその下にaltをテキストとして入れる処理を書く
    return result;
  }
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
