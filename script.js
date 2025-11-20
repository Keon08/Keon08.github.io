document.addEventListener("DOMContentLoaded", function() {
    // Initialize Lucide Icons
    lucide.createIcons();

    // --- Interactive Background Spotlight ---
    const body = document.body;
    
    body.addEventListener('mousemove', (e) => {
        body.style.setProperty('--x', e.clientX + 'px');
        body.style.setProperty('--y', e.clientY + 'px');
    });
    
    body.addEventListener('mouseleave', () => {
        body.style.setProperty('--x', '50%');
        body.style.setProperty('--y', '50%');
    });

    // --- Tab Switching Logic ---
    const allNavLinks = document.querySelectorAll('.nav-link, .tab-link');
    const tabContents = document.querySelectorAll('.tab-content');
    const scrollContainer = document.querySelector('.content-scrollbar'); 

    allNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); 
            
            const tab = link.dataset.tab;
            if (!tab) return;

            // 1. Deactivate all links
            allNavLinks.forEach(navLink => {
                navLink.classList.remove('nav-active', 'tab-active');
            });
            
            // 2. Activate the clicked link (and its counterpart in the other menu)
            document.querySelectorAll(`.nav-link[data-tab="${tab}"], .tab-link[data-tab="${tab}"]`).forEach(activeLink => {
                if (activeLink.classList.contains('nav-link')) {
                    activeLink.classList.add('nav-active');
                }
                if (activeLink.classList.contains('tab-link')) {
                    activeLink.classList.add('tab-active');
                }
            });

            // 3. Hide all content sections
            tabContents.forEach(content => {
                content.classList.add('hidden');
            });

            // 4. Show the specific content section
            const activeContent = document.getElementById(tab + '-content');
            if (activeContent) {
                activeContent.classList.remove('hidden');
            }
            
            // 5. Reset scroll position
            if (scrollContainer) {
                scrollContainer.scrollTop = 0;
            }
        });
    });
});