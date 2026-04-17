const teamScatter2005 = [
    { name: 'Atlanta Hawks', oppg: 96.2, dppg: 100.8, winpct: 31.7 },
    { name: 'Boston Celtics', oppg: 92.2, dppg: 99.5, winpct: 40.2 },
    { name: 'Chicago Bulls', oppg: 93.4, dppg: 98.0, winpct: 57.3 },
    { name: 'Cleveland Cavaliers', oppg: 96.3, dppg: 94.1, winpct: 61.0 },
    { name: 'Dallas Mavericks', oppg: 99.1, dppg: 95.4, winpct: 73.2 },
    { name: 'Denver Nuggets', oppg: 97.9, dppg: 99.7, winpct: 53.7 },
    { name: 'Detroit Pistons', oppg: 96.8, dppg: 90.3, winpct: 78.0 },
    { name: 'Golden State Warriors', oppg: 105.4, dppg: 106.6, winpct: 41.5 },
    { name: 'Houston Rockets', oppg: 96.1, dppg: 94.5, winpct: 41.5 },
    { name: 'Indiana Pacers', oppg: 95.2, dppg: 96.3, winpct: 51.2 },
    { name: 'Los Angeles Clippers', oppg: 93.3, dppg: 92.2, winpct: 43.9 },
    { name: 'Los Angeles Lakers', oppg: 101.0, dppg: 98.3, winpct: 54.9 },
    { name: 'Memphis Grizzlies', oppg: 92.7, dppg: 93.1, winpct: 56.1 },
    { name: 'Miami Heat', oppg: 101.5, dppg: 97.1, winpct: 72.0 },
    { name: 'Milwaukee Bucks', oppg: 92.7, dppg: 95.3, winpct: 48.8 },
    { name: 'Minnesota Timberwolves', oppg: 99.0, dppg: 101.7, winpct: 40.2 },
    { name: 'New Jersey Nets', oppg: 96.6, dppg: 94.5, winpct: 59.8 },
    { name: 'New Orleans Hornets', oppg: 91.1, dppg: 93.1, winpct: 46.3 },
    { name: 'New York Knicks', oppg: 92.3, dppg: 94.4, winpct: 28.0 },
    { name: 'Orlando Magic', oppg: 93.0, dppg: 97.5, winpct: 43.9 },
    { name: 'Philadelphia 76ers', oppg: 97.5, dppg: 98.1, winpct: 46.3 },
    { name: 'Phoenix Suns', oppg: 110.4, dppg: 103.2, winpct: 65.9 },
    { name: 'Portland Trail Blazers', oppg: 92.1, dppg: 98.0, winpct: 25.6 },
    { name: 'Sacramento Kings', oppg: 99.0, dppg: 99.9, winpct: 53.7 },
    { name: 'San Antonio Spurs', oppg: 95.6, dppg: 88.4, winpct: 76.8 },
    { name: 'Seattle Supersonics', oppg: 98.9, dppg: 96.4, winpct: 63.4 },
    { name: 'Toronto Raptors', oppg: 93.9, dppg: 98.3, winpct: 33.0 },
    { name: 'Utah Jazz', oppg: 96.6, dppg: 93.3, winpct: 50.0 },
    { name: 'Washington Wizards', oppg: 97.1, dppg: 96.8, winpct: 54.9 }
];

function initOffenseDefenseScatterChart(domId = 'scatterChart') {
    const chart = echarts.init(document.getElementById(domId));

    const scatterData = teamScatter2005.map(d => {
        return {
            value: [d.oppg, d.dppg, d.winpct],
            name: d.name,
            symbolSize: Math.max(12, d.winpct * 0.6),
            itemStyle: {
                color: d.winpct >= 65 ? '#4ade80' :
                    d.winpct >= 50 ? '#60a5fa' :
                        d.winpct >= 40 ? '#fbbf24' : '#f87171',
                opacity: 0.85
            }
        };
    });

    chart.setOption({
        backgroundColor: 'transparent',
        tooltip: {
            backgroundColor: 'rgba(15, 20, 35, 0.95)',
            borderColor: 'rgba(59,130,246,0.3)',
            borderWidth: 1,
            textStyle: { color: '#e0e6f0', fontFamily: 'Inter, Noto Sans SC' },
            formatter: function (params) {
                const d = params.data;
                const winColor = d.value[2] >= 65 ? '#4ade80' : d.value[2] >= 50 ? '#60a5fa' : d.value[2] >= 40 ? '#fbbf24' : '#f87171';
                return `<div style="font-weight:700;font-size:15px;margin-bottom:6px;">${d.name}</div>
                <div style="font-size:13px;">
                    <div>场均得分：<strong style="color:#fb923c">${d.value[0]}</strong></div>
                    <div>场均失分：<strong style="color:#60a5fa">${d.value[1]}</strong></div>
                    <div>胜率：<strong style="color:${winColor}">${d.value[2].toFixed(1)}%</strong></div>
                </div>`;
            }
        },
        grid: {
            top: 60, left: 70, right: 40, bottom: 70
        },
        xAxis: {
            type: 'value',
            name: '场均得分 (Pts/G)',
            nameLocation: 'center',
            nameGap: 40,
            nameTextStyle: { color: '#9ca3af', fontSize: 13, fontFamily: 'Inter' },
            min: 86,
            max: 114,
            axisLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } },
            axisLabel: { color: '#6b7280', fontSize: 11 },
            splitLine: { lineStyle: { color: 'rgba(255,255,255,0.04)' } }
        },
        yAxis: {
            type: 'value',
            name: '场均失分 (Opp Pts/G)',
            nameLocation: 'center',
            nameGap: 45,
            nameTextStyle: { color: '#9ca3af', fontSize: 13, fontFamily: 'Inter' },
            min: 85,
            max: 108,
            axisLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } },
            axisLabel: { color: '#6b7280', fontSize: 11 },
            splitLine: { lineStyle: { color: 'rgba(255,255,255,0.04)' } },
            inverse: true
        },
        visualMap: {
            show: true,
            type: 'piecewise',
            pieces: [
                { gte: 65, label: '强队 (≥65%)', color: '#4ade80' },
                { gte: 50, lt: 65, label: '竞争力 (50-65%)', color: '#60a5fa' },
                { gte: 40, lt: 50, label: '挣扎 (40-50%)', color: '#fbbf24' },
                { lt: 40, label: '弱队 (<40%)', color: '#f87171' }
            ],
            dimension: 2,
            orient: 'horizontal',
            top: 5,
            left: 'center',
            textStyle: { color: '#9ca3af', fontSize: 11 },
            itemWidth: 14,
            itemHeight: 14,
            itemGap: 20
        },
        series: [{
            type: 'scatter',
            data: scatterData,
            label: {
                show: true,
                formatter: function (params) {
                    const name = params.data.name;
                    const abbr = {
                        'Atlanta Hawks': 'ATL', 'Boston Celtics': 'BOS', 'Chicago Bulls': 'CHI',
                        'Cleveland Cavaliers': 'CLE', 'Dallas Mavericks': 'DAL', 'Denver Nuggets': 'DEN',
                        'Detroit Pistons': 'DET', 'Golden State Warriors': 'GSW', 'Houston Rockets': 'HOU',
                        'Indiana Pacers': 'IND', 'Los Angeles Clippers': 'LAC', 'Los Angeles Lakers': 'LAL',
                        'Memphis Grizzlies': 'MEM', 'Miami Heat': 'MIA', 'Milwaukee Bucks': 'MIL',
                        'Minnesota Timberwolves': 'MIN', 'New Jersey Nets': 'NJN', 'New Orleans Hornets': 'NOH',
                        'New York Knicks': 'NYK', 'Orlando Magic': 'ORL', 'Philadelphia 76ers': 'PHI',
                        'Phoenix Suns': 'PHX', 'Portland Trail Blazers': 'POR', 'Sacramento Kings': 'SAC',
                        'San Antonio Spurs': 'SAS', 'Seattle Supersonics': 'SEA', 'Toronto Raptors': 'TOR',
                        'Utah Jazz': 'UTA', 'Washington Wizards': 'WAS'
                    };
                    return abbr[name] || name.substring(0, 3).toUpperCase();
                },
                position: 'top',
                color: '#9ca3af',
                fontSize: 10,
                fontWeight: 600,
                fontFamily: 'Inter'
            },
            markArea: {
                silent: true,
                data: [[
                    { xAxis: 95, yAxis: 85, itemStyle: { color: 'rgba(74,222,128,0.04)' } },
                    { xAxis: 114, yAxis: 95 }
                ]]
            },
            markLine: {
                silent: true,
                symbol: 'none',
                lineStyle: { color: 'rgba(255,255,255,0.08)', type: 'dashed', width: 1 },
                data: [
                    { xAxis: 96.2, label: { formatter: '联盟场均得分', color: '#6b7280', fontSize: 10 } },
                    { yAxis: 96.2, label: { formatter: '联盟场均失分', color: '#6b7280', fontSize: 10 } }
                ]
            },
            animationDuration: 1500,
            animationEasing: 'cubicOut'
        }]
    });

    return chart;
}
