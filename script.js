function wrapLabels(label) {
    const maxLength = 16;
    if (typeof label !== 'string' || label.length <= maxLength) {
        return label;
    }
    const words = label.split(' ');
    const lines = [];
    let currentLine = '';
    words.forEach(word => {
        if ((currentLine + ' ' + word).trim().length > maxLength) {
            lines.push(currentLine.trim());
            currentLine = word;
        } else {
            currentLine = (currentLine + ' ' + word).trim();
        }
    });
    if (currentLine) {
        lines.push(currentLine.trim());
    }
    return lines;
}

const defaultTooltip = {
    plugins: {
        tooltip: {
            callbacks: {
                title: function(tooltipItems) {
                    const item = tooltipItems[0];
                    let label = item.chart.data.labels[item.dataIndex];
                    if (Array.isArray(label)) {
                      return label.join(' ');
                    }
                    return label;
                }
            }
        }
    }
};

const colors = {
    energeticRed: '#FF6B6B',
    energeticTeal: '#4ECDC4',
    energeticBlue: '#45B7D1',
    energeticYellow: '#F7B801',
    darkTeal: '#1A535C',
    lightGray: '#F8F9FA'
};

document.addEventListener('DOMContentLoaded', () => {

    if (document.getElementById('petHumanizationChart')) {
        new Chart(document.getElementById('petHumanizationChart'), {
            type: 'doughnut',
            data: {
                labels: ['Viewed as Family or Children', 'Other'],
                datasets: [{
                    label: 'Pet Owner Perception',
                    data: [73, 27],
                    backgroundColor: [colors.energeticRed, '#e9ecef'],
                    borderColor: [colors.energeticRed, '#e9ecef'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    tooltip: defaultTooltip.plugins.tooltip
                },
                cutout: '70%',
            }
        });
    }
    
    if (document.getElementById('marketProjectionChart')) {
        const projectionLabels = ['2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033'];
        const projectionData = [788, 961, 1173, 1431, 1746, 2130, 2598, 3170, 3867, 4718];
        new Chart(document.getElementById('marketProjectionChart'), {
            type: 'line',
            data: {
                labels: projectionLabels,
                datasets: [{
                    label: 'Market Value (in Crore INR)',
                    data: projectionData,
                    borderColor: colors.energeticRed,
                    backgroundColor: 'rgba(255, 107, 107, 0.2)',
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: colors.energeticRed,
                    pointBorderColor: '#fff',
                    pointHoverRadius: 7,
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: colors.energeticRed
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Value (Crore INR)'
                        }
                    },
                    x: {
                       title: {
                            display: true,
                            text: 'Year'
                        }
                    }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: defaultTooltip.plugins.tooltip
                }
            }
        });
    }

    if (document.getElementById('stateComparisonChart')) {
        const stateLabels = ['Karnataka', 'Delhi (UT)', 'Maharashtra', 'Telangana', 'Tamil Nadu'];
        const stateData = [9.5, 8.65, 9.0, 8.15, 7.5].sort((a,b) => b-a);
        const sortedLabels = ['Karnataka', 'Maharashtra', 'Delhi (UT)', 'Telangana', 'Tamil Nadu'];

        new Chart(document.getElementById('stateComparisonChart'), {
            type: 'bar',
            data: {
                labels: sortedLabels.map(wrapLabels),
                datasets: [{
                    label: 'Attractiveness Score',
                    data: stateData,
                    backgroundColor: [
                        colors.energeticRed, 
                        colors.energeticTeal, 
                        colors.energeticBlue, 
                        colors.energeticYellow, 
                        '#a9a9a9'
                    ],
                    borderRadius: 5,
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 10,
                        title: {
                            display: true,
                            text: 'Score (out of 10)'
                        }
                    }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: defaultTooltip.plugins.tooltip
                }
            }
        });
    }
    
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = e.currentTarget.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});