// script.js - 引用后台 parser.js 解析功能
document.getElementById('groupBtn').onclick = function() {
    const rawValue = document.getElementById('playerInput').value;
    
    // 调用后台清洗专家获取干净名单
    const players = NameParser.parse(rawValue);
    
    if (players.length < 2) {
        alert("有效名字太少啦，多粘贴点群名单吧！");
        return;
    }

    // 经典洗牌算法 (Fisher-Yates)
    const shuffled = [...players];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // 分切对阵战队
    const midPoint = Math.ceil(shuffled.length / 2);
    const blueTeam = shuffled.slice(0, midPoint);
    const redTeam = shuffled.slice(midPoint);

    const resultDiv = document.getElementById('resultOutput');
    // 渲染精致的显示卡片
    resultDiv.innerHTML = `
        <div class="result-card">
            <div class="team-item blue">
                <span class="label">🔹 BLUE · 蓝方对阵</span>
                <p>${blueTeam.join('  、 ')}</p>
            </div>
            <div style="border-top: 1px dashed rgba(255,255,255,0.05);"></div>
            <div class="team-item red">
                <span class="label">🔸 RED · 红方对阵</span>
                <p>${redTeam.join('  、 ')}</p>
            </div>
        </div>
    `;
    
    // 动态滚动
    resultDiv.scrollIntoView({ behavior: 'smooth' });
};

// 页面加载完毕后优雅呈现主界面
window.addEventListener('load', function() {
    setTimeout(function() {
        document.querySelector('.app-main').classList.remove('hidden');
    }, 150);
});