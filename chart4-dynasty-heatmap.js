const dynastyData = [
    ['Los Angeles Lakers', '1980s', 72.4],
    ['Los Angeles Lakers', '1990s', 62.1],
    ['Los Angeles Lakers', '2000s', 63.4],
    ['Los Angeles Lakers', '2010s', 66.2],
    ['San Antonio Spurs', '1980s', 49.0],
    ['San Antonio Spurs', '1990s', 62.6],
    ['San Antonio Spurs', '2000s', 69.9],
    ['San Antonio Spurs', '2010s', 75.0],
    ['Phoenix Suns', '1980s', 53.4],
    ['Phoenix Suns', '1990s', 63.7],
    ['Phoenix Suns', '2000s', 60.0],
    ['Phoenix Suns', '2010s', 49.3],
    ['Utah Jazz', '1980s', 49.8],
    ['Utah Jazz', '1990s', 68.8],
    ['Utah Jazz', '2000s', 56.0],
    ['Utah Jazz', '2010s', 50.7],
    ['Boston Celtics', '1980s', 71.1],
    ['Boston Celtics', '1990s', 45.7],
    ['Boston Celtics', '2000s', 54.3],
    ['Boston Celtics', '2010s', 64.2],
    ['Portland Trail Blazers', '1980s', 56.5],
    ['Portland Trail Blazers', '1990s', 62.8],
    ['Portland Trail Blazers', '2000s', 50.6],
    ['Portland Trail Blazers', '2010s', 51.4],
    ['Detroit Pistons', '1980s', 56.8],
    ['Detroit Pistons', '1990s', 50.0],
    ['Detroit Pistons', '2000s', 58.8],
    ['Detroit Pistons', '2010s', 37.2],
    ['Houston Rockets', '1980s', 49.0],
    ['Houston Rockets', '1990s', 59.0],
    ['Houston Rockets', '2000s', 54.6],
    ['Houston Rockets', '2010s', 52.0],
    ['Chicago Bulls', '1980s', 48.0],
    ['Chicago Bulls', '1990s', 66.0],
    ['Chicago Bulls', '2000s', 41.6],
    ['Chicago Bulls', '2010s', 75.7],
    ['Philadelphia 76ers', '1980s', 64.5],
    ['Philadelphia 76ers', '1990s', 38.3],
    ['Philadelphia 76ers', '2000s', 49.3],
    ['Philadelphia 76ers', '2010s', 51.4],
    ['Dallas Mavericks', '1980s', 49.4],
    ['Dallas Mavericks', '1990s', 30.3],
    ['Dallas Mavericks', '2000s', 68.7],
    ['Dallas Mavericks', '2010s', 62.8],
    ['Milwaukee Bucks', '1980s', 63.0],
    ['Milwaukee Bucks', '1990s', 41.2],
    ['Milwaukee Bucks', '2000s', 46.3],
    ['Milwaukee Bucks', '2010s', 44.6]
];

const heatTeams = [
    'Los Angeles Lakers', 'San Antonio Spurs', 'Chicago Bulls', 'Dallas Mavericks',
    'Boston Celtics', 'Utah Jazz', 'Philadelphia 76ers', 'Phoenix Suns',
    'Milwaukee Bucks', 'Portland Trail Blazers', 'Houston Rockets', 'Detroit Pistons'
];
const heatDecades = ['1980s', '1990s', '2000s', '2010s'];

function initDynastyHeatmapChart(domId = 'heatmapChart') {
    const chart = echarts.init(document.getElementById(domId));
    const heatmapDataArr = [];

    dynastyData.forEach(d => {
        const xi = heatDecades.indexOf(d[1]);
        const yi = heatTeams.indexOf(d[0]);
        if (xi >= 0 && yi >= 0) {
            heatmapDataArr.push([xi, yi, d[2]]);
        }
    });

    chart.setOption({
        backgroundColor: 'transparent',
        tooltip: {
            backgroundColor: 'rgba(15, 20, 35, 0.95)',
            borderColor: 'rgba(34,197,94,0.3)',
            borderWidth: 1,
            textStyle: { color: '#e0e6f0', fontFamily: 'Inter, Noto Sans SC' },
            formatter: function (params) {
                const team = heatTeams[params.data[1]];
                const decade = heatDecades[params.data[0]];
                const val = params.data[2];
                const evalText = val >= 65 ? '🏆 统治级' : val >= 55 ? '⭐ 强队' : val >= 45 ? '🔄 普通' : '📉 低迷';
                const valColor = val >= 65 ? '#4ade80' : val >= 55 ? '#60a5fa' : val >= 45 ? '#fbbf24' : '#f87171';
                return `<div style="font-weight:700;font-size:15px;margin-bottom:6px;">${team}</div>
                <div style="color:#8892a8;font-size:12px;margin-bottom:8px;">${decade}</div>
                <div style="font-size:14px;">胜率：<strong style="color:${valColor}">${val.toFixed(1)}%</strong></div>
                <div style="font-size:12px;color:#9ca3af;margin-top:4px;">${evalText}</div>`;
            }
        },
        grid: {
            top: 30, left: 180, right: 50, bottom: 60
        },
        xAxis: {
            type: 'category',
            data: heatDecades,
            position: 'bottom',
            axisLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } },
            axisLabel: { color: '#9ca3af', fontSize: 14, fontWeight: 600, fontFamily: 'Inter' },
            axisTick: { show: false },
            splitArea: { show: false }
        },
        yAxis: {
            type: 'category',
            data: heatTeams,
            axisLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } },
            axisLabel: { color: '#c8ccd4', fontSize: 12, fontWeight: 500, fontFamily: 'Inter' },
            axisTick: { show: false },
            splitArea: { show: false }
        },
        visualMap: {
            min: 28,
            max: 78,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: 0,
            inRange: {
                color: ['#1e1b4b', '#312e81', '#4338ca', '#6366f1', '#818cf8', '#60a5fa', '#34d399', '#4ade80', '#22c55e']
            },
            textStyle: { color: '#9ca3af', fontSize: 11 },
            itemWidth: 12,
            itemHeight: 250,
            text: ['高胜率', '低胜率']
        },
        series: [{
            type: 'heatmap',
            data: heatmapDataArr,
            label: {
                show: true,
                formatter: function (params) {
                    return params.data[2].toFixed(1) + '%';
                },
                color: '#ffffff',
                fontSize: 13,
                fontWeight: 700,
                fontFamily: 'Inter',
                textShadowColor: 'rgba(0,0,0,0.5)',
                textShadowBlur: 4
            },
            itemStyle: {
                borderRadius: 6,
                borderColor: '#0a0e1a',
                borderWidth: 3
            },
            emphasis: {
                itemStyle: {
                    shadowBlur: 20,
                    shadowColor: 'rgba(99,102,241,0.5)',
                    borderColor: '#fff',
                    borderWidth: 2
                }
            },
            animationDuration: 1500,
            animationEasing: 'cubicOut',
            animationDelay: function (idx) { return idx * 30; }
        }]
    });

    return chart;
}
