const $siteList = $('.site-list')
const $lastLi = $siteList.find('li.last')
const mySites = localStorage.getItem('mySites')
const mySitesObject = JSON.parse(mySites)
const hashMap = mySitesObject || [
    { logo: "B", url: "https://www.bilibili.com" }
]
const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '') //删除 / 开头的内容
}
const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node) => {
        const $li = $(`
            <li class="link-a">
                <a href=${node.url}>
                    <div class="link-card">
                        <div class="link-img">
                            ${node.logo}
                        </div>
                        <div class="link-title">${simplifyUrl(node.url)}</div>
                        <div class="close">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-close"></use>
                            </svg>
                        </div>

                    </div>
                </a>
            </li>
        `).insertBefore($lastLi)
    })
}

//初始渲染
render()

// 添加网址
$('.add-card').on('click', () => {
    let url = window.prompt('Please enter the URL to be added')
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    hashMap.push({ logo: simplifyUrl(url)[0].toUpperCase(), url: url })
    render()

})

$('.link-a').on('click', '.close', (e) => {
    e.preventDefault()
    e.currentTarget.closest('li').remove()
})

// 按s聚焦搜索框
$(document).on('keyup', (e) => {
    // const key = e.key 变量名和属性名相同简写为
    const { key } = e
    key === 's' && $('.search-input').focus()
})

window.onbeforeunload = () => {
    const mySitesString = JSON.stringify(hashMap)
    localStorage.setItem('mySites', mySitesString)
}