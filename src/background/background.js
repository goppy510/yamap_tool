chrome.runtime.onMessage.addListener( function(message, sender, sendResponse) {
    const url = message.url;
    if (url !== undefined) {
        const commentURL = url.replace('/article', '');
        chrome.tabs.create( {
            url: `${commentURL}/comments#post`
        } );
        sendResponse();
        return true;
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
} );
