// popupからメッセージを受け取ったら処理開始
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {

  if (request.url !== undefined) {
    // // バックグラウンドに処理をするように指示
    // const url = request.url;
    // chrome.runtime.sendMessage( {url: url}, function (response) {
    //   console.log("OK");
    // } );
    // ファイル出力用にJOSN形式でまとめる
    const mvFormat = [
    `AUTHOR: ${getAuthor()}\n`,
    `TITLE: ${getTitle()}\n`,
    `STATUS: ${getStatus()}\n`,
    `ALLOW COMMENTS: 0\n`,
    `DATE: ${getPostDate()}\n`,
    `-----\n`,
    `BODY:\n${union()}`,
    `-----\n`,
    `--------\n`
    ];
    // テキストファイルを作る
    const blob = new Blob(mvFormat, {type: "application/octet-stream"});
    const dlURL = URL.createObjectURL(blob);
    chrome.runtime.sendMessage( {url: dlURL}, function(response) {
      console.log("Downloading...");
    } );
    sendResponse();
    return true;
  }

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
    const publicType = document.getElementsByClassName("ActivityDetailTabLayout__Header__PublicType")[0];
    if (publicType === undefined) {
      return 'Public';
    }
    return 'Draft';
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

  // 活動記録を整形する
  function formatBody() {
    const arrayBody = splitByNewline(getBody());
    return htmlBody(arrayBody);
  }

  // 活動記録本文をhtmlに変換
  function htmlBody(array) {
    let tmp = [];
    for(let i=0; i<array.length; ++i) {
      const str = format([array[i]]);
      tmp.push(str);
    }
    return tmp.join('');
  }

  // 活動記録を改行コードで区切って配列化
  function splitByNewline(str) {
    return str.split('\n');
  }

  // 活動記録本文をhtmlタグに整形する
  function format(str) {
    if (str.length === 0) {
      return '</br>\n';
    }
    return `<p>${str}</p>\n`;
  }

  // 活動記録写真部分を取得
  function getImageBody() {
    const result = document.getElementsByClassName("ImagesGalleryList")[0].getElementsByTagName('img');
    // altとsrcを抜き出す処理が必要
    // imgタグをpタグで囲みその下にaltをテキストとして入れる処理を書く
    return result;
  }

  // 写真をhtmlに変換して出力
  function formatImages() {
    const arrayImg = getImageBody();
    return htmlImages(arrayImg);
  }

  // 写真配列をイメタグhtmlに変換
  function htmlImages(array) {
    let tmp = [];
    for(let i=0; i<array.length; ++i) {
      const str = remakeImg(array[i]);
      tmp.push(str);
    }
    return tmp.join('');
  }

  // 活動記録写真のタグを再構築する
  function remakeImg(tag) {
    const src = tag.getAttribute('data-src');
    const alt = tag.getAttribute('alt');
    const result = `<img src=${src} itemprop="image"><p>${alt}</p>\n`;
    return result;
  }

  // 本文と写真部分を結語する
  function union() {
    const body = formatBody();
    const images = formatImages();
    return `${body}\n\n</br></br></br>\n\n${images}\n`;
  }
});
