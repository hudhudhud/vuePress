module.exports = {
    //...省略部分代码
    
    //下面涉及到的md文件和其他文件的路径下一步再详细解释
    themeConfig: {
        lastUpdated: 'Last Updated', // string | boolean 使用的时间戳来自 git commit
        logo: '/egg.png',  //网页顶端导航栏左上角的图标
        
        //顶部导航栏
        nav: [           
            //格式一：直接跳转，'/'为不添加路由，跳转至首页
            { text: '首页', link: '/pages/flowFormAPI.html' },    
            
            // //格式二：添加下拉菜单，link指向的文件路径
            // {
            //     text: '选择语言',  //默认显示        
            //     ariaLabel: '选择语言',   //用于识别的label
            //     items: [
            //         { text: '文章1', link: '/pages/folder1/test1.md' },  
            //         { text: '文章2', link: '/pages/folder2/test4.md' },  
            //     ]
            // },
            
            //格式三：跳转至外部网页，需http/https前缀
            { text: 'Github', link: 'https://hudhudhud.github.io' },
        ],
        
        //侧边导航栏：会根据当前的文件路径是否匹配侧边栏数据，自动显示/隐藏
        sidebar1: {
            '/pages/':[
               {title:'组件',collapsable:false, sidebarDepth: 1,
               children:[
                    ['detail.md','明细'],
                    ['deptSelect.md','部门选择（数据自定义）'],

                ]} 
            ],
            '/pages/folder1/':[         
                {
                    title: '测试菜单1',   // 一级菜单名称
                    collapsable: false, // false为默认展开菜单, 默认值true是折叠,
                    sidebarDepth: 1,    //  设置侧边导航自动提取markdown文件标题的层级，默认1为h2层级
                    children: [
                        ['test1.md', '子菜单11'],  //菜单名称为'子菜单1'，跳转至/pages/folder1/test1.md
                        ['test3.md', '子菜单13']
                    ]
                },
                {
                    title: '测试菜单2',
                    collapsable: false, 
                    children: [
                        ['test2.md', '子菜单12']
                    ]
                }
            ],
            '/pages/folder2/':[         
                {
                    title: '测试菜单3',
                    collapsable: false, 
                    sidebarDepth: 1,   
                    children: [
                        ['test4.md', '子菜单24'],  
                        ['test5.md', '子菜单25']
                    ]
                },
            ],
            //...可添加多个不同的侧边栏，不同页面会根据路径显示不同的侧边栏
        },
        sidebar:[
            {
                path:'/pages/flowFormAPI.md',title:'全局对象/方法',collapsable:false,sidebarDepth:2
            },
            {
                path:'/pages/deptSelect.md',title:'部门选择（数据自定义）',sidebarDepth:0
            },
            {
                path:'/pages/detail.md',title:'明细组件',collapsable:false,sidebarDepth:1
            }
        ]
    }
}