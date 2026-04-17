const allstarKings = [
    { name: 'Kareem Abdul-Jabbar', count: 19, pts: 251, reb: 53, ast: 42, min: 547 },
    { name: 'Julius Erving', count: 16, pts: 321, reb: 95, ast: 76, min: 452 },
    { name: "Shaquille O'Neal", count: 15, pts: 202, reb: 101, ast: 34, min: 572 },
    { name: 'Michael Jordan', count: 14, pts: 262, reb: 66, ast: 55, min: 481 },
    { name: 'Wilt Chamberlain', count: 13, pts: 191, reb: 94, ast: 47, min: 388 },
    { name: 'Karl Malone', count: 13, pts: 145, reb: 48, ast: 31, min: 343 },
    { name: 'John Havlicek', count: 13, pts: 179, reb: 41, ast: 31, min: 303 },
    { name: 'Jerry West', count: 13, pts: 160, reb: 50, ast: 36, min: 440 },
    { name: 'Bob Cousy', count: 13, pts: 147, reb: 51, ast: 43, min: 368 },
    { name: 'Tim Duncan', count: 12, pts: 134, reb: 121, ast: 27, min: 276 },
    { name: 'Rick Barry', count: 12, pts: 172, reb: 48, ast: 33, min: 376 },
    { name: 'Oscar Robertson', count: 12, pts: 236, reb: 98, ast: 70, min: 380 },
    { name: 'Moses Malone', count: 12, pts: 134, reb: 82, ast: 38, min: 291 },
    { name: 'Magic Johnson', count: 12, pts: 176, reb: 39, ast: 39, min: 430 },
    { name: 'Larry Bird', count: 12, pts: 134, reb: 36, ast: 27, min: 485 }
];

const roseColors = [
    '#fb923c', '#f97316', '#ea580c', '#c2410c',
    '#60a5fa', '#3b82f6', '#2563eb', '#1d4ed8',
    '#a78bfa', '#8b5cf6', '#7c3aed', '#6d28d9',
    '#4ade80', '#22c55e', '#fbbf24'
];

function initAllstarRoseChart(domId = 'roseChart') {
    const chart = echarts.init(document.getElementById(domId));

    chart.setOption({
        backgroundColor: 'transparent',
        tooltip: {
            backgroundColor: 'rgba(15, 20, 35, 0.95)',
            borderColor: 'rgba(168,85,247,0.3)',
            borderWidth: 1,
            textStyle: { color: '#e0e6f0', fontFamily: 'Inter, Noto Sans SC' },
            formatter: function (params) {
                const d = allstarKings.find(k => k.name === params.name);
                if (!d) return '';
                return `<div style="font-weight:700;font-size:15px;margin-bottom:6px;">${d.name}</div>
                <div style="color:#c084fc;font-size:14px;margin-bottom:8px;">全明星入选 <strong>${d.count}</strong> 次</div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px 16px;font-size:13px;">
                    <div>累计得分：<strong style="color:#fb923c">${d.pts}</strong></div>
                    <div>累计篮板：<strong style="color:#60a5fa">${d.reb}</strong></div>
                    <div>累计助攻：<strong style="color:#4ade80">${d.ast}</strong></div>
                    <div>总上场分钟：<strong style="color:#9ca3af">${d.min}</strong></div>
                </div>`;
            }
        },
        legend: {
            orient: 'vertical',
            right: 20,
            top: 'center',
            textStyle: { color: '#9ca3af', fontSize: 12, fontFamily: 'Inter, Noto Sans SC' },
            itemWidth: 12,
            itemHeight: 12,
            itemGap: 10
        },
        series: [{
            type: 'pie',
            roseType: 'area',
            radius: ['18%', '65%'],
            center: ['40%', '50%'],
            label: {
                show: true,
                formatter: '{b}\n{c}次',
                color: '#c8ccd4',
                fontSize: 11,
                fontWeight: 500,
                fontFamily: 'Inter, Noto Sans SC',
                lineHeight: 16
            },
            labelLine: {
                lineStyle: { color: 'rgba(255,255,255,0.15)', width: 1 },
                length: 15,
                length2: 20
            },
            itemStyle: {
                borderRadius: 6,
                borderColor: '#0a0e1a',
                borderWidth: 2
            },
            emphasis: {
                itemStyle: {
                    shadowBlur: 30,
                    shadowColor: 'rgba(168,85,247,0.3)'
                },
                label: { fontSize: 14, fontWeight: 700 }
            },
            data: allstarKings.map((d, i) => ({
                name: d.name,
                value: d.count,
                itemStyle: { color: roseColors[i % roseColors.length] }
            })),
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDuration: 2000,
            animationDelay: function (idx) { return idx * 100; }
        }]
    });

    return chart;
}
