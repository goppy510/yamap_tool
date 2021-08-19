// chrome.runtime.onMessage.addListener( function(message, sender, sendResponse) {
//     const url = message.url;
//     if (url !== undefined) {
//         const commentURL = url.replace('/article', '');
//         chrome.tabs.create( {
//             url: `${commentURL}/comments#post`,
//             active: false
//         } );
//         const commentable = isCommentable();
//         console.log(commentable);
//         sendResponse();
//         return true;
//     }

//     // コメント投稿の可否を取得しMV形式に合わせてreturnする
//     function isCommentable() {
//       // 別ページから取得できるのか？
//       const commentForm = document.getElementsByClassName("Comments__CommentForm")[0];
//       return commentForm === undefined ? 0 : 1;
//     }
// } );
