chrome.runtime.onMessage.addListener( function(message, sender, sendResponse) {
    chrome.downloads.download( {
        url: message.url,
        filename: `yamap_report_${currentDate()}.txt`
    });
    sendResponse();
    return true;
});

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

// 現在日をyyyymmdd形式で取得する
function currentDate() {
    const dt = new Date();
    const yyyy = dt.getFullYear();
    const mm   = (dt.getMonth()+1).toString().padStart(2, '0');
    const dd   = dt.getDate();
    const hh   = (dt.getHours()).toString().padStart(2, '0');
    const mi   = (dt.getMinutes()).toString().padStart(2, '0');
    const ss   = (dt.getSeconds()).toString().padStart(2, '0');
    return [yyyy, mm, dd, hh, mi, ss].join('');
}
