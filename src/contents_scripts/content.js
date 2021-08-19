// popupからメッセージを受け取ったら処理開始
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {

  if (request.pushed === true) {
    console.log(getAuthor());
    console.log(getTitle());
    console.log(getStatus());
    // console.log(isCommentable());
    console.log(getPostDate());
    console.log(getBody());
    console.log(getImageBody());
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
});
