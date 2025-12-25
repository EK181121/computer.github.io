document.addEventListener('DOMContentLoaded', () => {
    const components = document.querySelectorAll('.hardware-component');
    const previewPanel = document.getElementById('preview-panel');
    const previewTitle = document.getElementById('preview-title');
    const previewDesc = document.getElementById('preview-desc');

    // Component Descriptions for hover preview
    const componentData = {
        'cpu.html': { title: '中央處理器 (CPU)', desc: '負責處理指令與運算，是電腦的大腦。' },
        'gpu.html': { title: '顯示卡 (GPU)', desc: '專門處理圖形渲染，決定遊戲與繪圖效能。' },
        'ram.html': { title: '記憶體 (RAM)', desc: '臨時儲存正在執行的程式與資料。' },
        'motherboard.html': { title: '主機板 (MB)', desc: '連接所有硬體元件的平台。' },
        'psu.html': { title: '電源供應器 (PSU)', desc: '將電力轉換並分配給各個組件。' },
        'storage.html': { title: '硬碟 (Storage)', desc: '永久儲存資料、系統與檔案。' },
        'cooling.html': { title: '散熱系統', desc: '幫助電腦元件降溫，維持穩定運作。' }
    };

    components.forEach(comp => {
        // Click interaction
        comp.addEventListener('click', () => {
            const target = comp.getAttribute('data-target');
            if (target) {
                window.location.href = target;
            }
        });

        // Hover interaction
        comp.addEventListener('mouseenter', (e) => {
            const target = comp.getAttribute('data-target');
            if (target && componentData[target]) {
                previewTitle.textContent = componentData[target].title;
                previewDesc.textContent = componentData[target].desc;

                // Show preview panel near the mouse or fixed position
                previewPanel.style.display = 'block';
                previewPanel.style.opacity = '1';
            }
        });

        comp.addEventListener('mouseleave', () => {
            previewPanel.style.display = 'none';
            previewPanel.style.opacity = '0';
        });

        // Mouse move to follow cursor (optional, maybe too distracting, keeping it fixed for now)
        // If we wanted it to follow cursor:
        /*
        comp.addEventListener('mousemove', (e) => {
            previewPanel.style.top = `${e.offsetY + 20}px`;
            previewPanel.style.left = `${e.offsetX + 20}px`;
        });
        */
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            // Toggle icon between bars and times (X)
            const icon = menuToggle.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (nav && nav.classList.contains('active') && !nav.contains(e.target) && !menuToggle.contains(e.target)) {
            nav.classList.remove('active');
            if (menuToggle) {
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });

    // Close menu when clicking a link
    if (nav) {
        const links = nav.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                if (menuToggle) {
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }
});
