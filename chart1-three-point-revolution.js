const threePtTrend = [
    { year: 1980, tpa: 2.0, tpm: 0.5 },
    { year: 1981, tpa: 2.3, tpm: 0.6 },
    { year: 1982, tpa: 2.3, tpm: 0.5 },
    { year: 1983, tpa: 2.4, tpm: 0.6 },
    { year: 1984, tpa: 3.1, tpm: 0.9 },
    { year: 1985, tpa: 3.3, tpm: 0.9 },
    { year: 1986, tpa: 4.7, tpm: 1.4 },
    { year: 1987, tpa: 5.0, tpm: 1.6 },
    { year: 1988, tpa: 6.6, tpm: 2.1 },
    { year: 1989, tpa: 6.6, tpm: 2.2 },
    { year: 1990, tpa: 7.1, tpm: 2.3 },
    { year: 1991, tpa: 7.6, tpm: 2.5 },
    { year: 1992, tpa: 9.0, tpm: 3.0 },
    { year: 1993, tpa: 9.9, tpm: 3.3 },
    { year: 1994, tpa: 15.3, tpm: 5.5 },
    { year: 1995, tpa: 16.0, tpm: 5.9 },
    { year: 1996, tpa: 16.8, tpm: 6.0 },
    { year: 1997, tpa: 12.7, tpm: 4.4 },
    { year: 1998, tpa: 13.2, tpm: 4.5 },
    { year: 1999, tpa: 13.7, tpm: 4.8 },
    { year: 2000, tpa: 13.7, tpm: 4.8 },
    { year: 2001, tpa: 14.7, tpm: 5.2 },
    { year: 2002, tpa: 14.7, tpm: 5.1 },
    { year: 2003, tpa: 14.9, tpm: 5.2 },
    { year: 2004, tpa: 15.8, tpm: 5.6 },
    { year: 2005, tpa: 16.0, tpm: 5.7 },
    { year: 2006, tpa: 16.9, tpm: 6.1 },
    { year: 2007, tpa: 18.1, tpm: 6.6 },
    { year: 2008, tpa: 18.1, tpm: 6.6 }
];

function initThreePointRevolutionChart(domId = 'lineChart') {
    const chart = echarts.init(document.getElementById(domId));

    chart.setOption({
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(15, 20, 35, 0.95)',
            borderColor: 'rgba(251,146,60,0.3)',
            borderWidth: 1,
            textStyle: { color: '#e0e6f0', fontFamily: 'Inter, Noto Sans SC' },
            formatter: function (params) {
                const year = params[0].axisValue;
                let html = `<div style="font-weight:700;font-size:15px;margin-bottom:8px;">${year} 赛季</div>`;
                params.forEach(p => {
                    html += `<div style="display:flex;align-items:center;gap:6px;margin:4px 0;">
                    <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${p.color}"></span>
                    <span style="color:#9ca3af;">${p.seriesName}：</span>
                    <strong>${p.value}</strong>
                </div>`;
                });
                const tpa = params.find(p => p.seriesName === '场均三分出手');
                const tpm = params.find(p => p.seriesName === '场均三分命中');
                if (tpa && tpm) {
                    const pct = (tpm.value / tpa.value * 100).toFixed(1);
                    html += `<div style="margin-top:6px;padding-top:6px;border-top:1px solid rgba(255,255,255,0.1);color:#fbbf24;font-weight:600;">命中率：${pct}%</div>`;
                }
                return html;
            }
        },
        legend: {
            data: ['场均三分出手', '场均三分命中'],
            top: 10,
            textStyle: { color: '#9ca3af', fontFamily: 'Inter, Noto Sans SC', fontSize: 13 },
            itemWidth: 20,
            itemHeight: 10,
            itemGap: 30
        },
        grid: {
            top: 60, left: 60, right: 40, bottom: 60
        },
        xAxis: {
            type: 'category',
            data: threePtTrend.map(d => d.year),
            axisLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } },
            axisLabel: { color: '#6b7280', fontSize: 11, interval: 2 },
            axisTick: { show: false }
        },
        yAxis: {
            type: 'value',
            name: '场均次数',
            nameTextStyle: { color: '#6b7280', fontSize: 12, padding: [0, 40, 0, 0] },
            axisLine: { show: false },
            axisLabel: { color: '#6b7280', fontSize: 11 },
            splitLine: { lineStyle: { color: 'rgba(255,255,255,0.04)' } }
        },
        series: [
            {
                name: '场均三分出手',
                type: 'line',
                data: threePtTrend.map(d => d.tpa),
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                lineStyle: { width: 3, color: '#fb923c' },
                itemStyle: { color: '#fb923c' },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(251,146,60,0.3)' },
                        { offset: 1, color: 'rgba(251,146,60,0.02)' }
                    ])
                },
                markArea: {
                    silent: true,
                    data: [[
                        { xAxis: '1994', itemStyle: { color: 'rgba(239,68,68,0.06)' }, label: { show: true, position: 'insideTop', formatter: '三分线缩短期', color: '#f87171', fontSize: 11, fontWeight: 600, fontFamily: 'Noto Sans SC' } },
                        { xAxis: '1997' }
                    ]]
                },
                markLine: {
                    silent: true,
                    symbol: 'none',
                    data: [{ xAxis: '1994', lineStyle: { color: '#f87171', type: 'dashed', width: 1.5 }, label: { formatter: '1994\n缩短三分线', color: '#f87171', fontSize: 10, fontFamily: 'Noto Sans SC' } }]
                }
            },
            {
                name: '场均三分命中',
                type: 'line',
                data: threePtTrend.map(d => d.tpm),
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                lineStyle: { width: 3, color: '#60a5fa' },
                itemStyle: { color: '#60a5fa' },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(96,165,250,0.2)' },
                        { offset: 1, color: 'rgba(96,165,250,0.01)' }
                    ])
                }
            }
        ],
        animationDuration: 2000,
        animationEasing: 'cubicInOut'
    });

    return chart;
}
