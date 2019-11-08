Page({
    data: {
        list: [
            {
                id: 'form',
                name: '表单',
                open: false,
                pages: ['cell', 'slideview', 'form', 'uploader']
            },
            {
                id: 'widget',
                name: '基础组件',
                open: false,
                pages: ['article', 'icons', 'badge', 'flex', 'footer', 'gallery', 'grid', 'loadmore', 'loading', 'panel', 'preview']
            },
            {
                id: 'feedback',
                name: '操作反馈',
                open: false,
                pages: ['dialog', 'msg', 'half-screen-dialog','actionsheet']
            },
            {
                id: 'nav',
                name: '导航相关',
                open: false,
                pages: ['navigation', 'tabbar']
            },
            {
                id: 'search',
                name: '搜索相关',
                open: false,
                pages: ['searchbar']
            }
        ]
    },
    kindToggle: function (e) {
        var id = e.currentTarget.id, list = this.data.list;
        for (var i = 0, len = list.length; i < len; ++i) {
            if (list[i].id == id) {
                list[i].open = !list[i].open
            } else {
                list[i].open = false
            }
        }
        this.setData({
            list: list
        });
    }
});
