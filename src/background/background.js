const onClick = () => (_, tab) => chrome.tabs.sendMessage(tab.id, '');

chrome.contextMenus.create({
    title : '活動記録のエクスポート',
    type : 'normal',
    contexts : ['all'],
    id: 'parent_id',
    onclick : onClick()
});
