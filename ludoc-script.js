// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Application form submission
    const applicationForm = document.getElementById('applicationForm');
    if (applicationForm) {
        applicationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const applicationData = {
                full_name: formData.get('full_name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                program: formData.get('program'),
                message: formData.get('message')
            };
            
            // Simulate form submission
            alert('Thank you for your application! We will contact you within 2 business days.');
            this.reset();
            
            // In a real application, you would send this data to your server
            console.log('Application submitted:', applicationData);
        });
    }
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(34, 197, 94, 0.95)';
        } else {
            navbar.style.background = '#22c55e';
        }
    });
    
    // Animate stats on scroll
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stats = entry.target.querySelectorAll('.stat h3');
                stats.forEach(stat => {
                    const finalValue = stat.textContent;
                    const numericValue = parseInt(finalValue);
                    
                    if (!isNaN(numericValue)) {
                        animateCounter(stat, 0, numericValue, finalValue);
                    }
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        observer.observe(heroStats);
    }
    
    function animateCounter(element, start, end, suffix) {
        const duration = 2000;
        const increment = end / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                element.textContent = suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (suffix.includes('%') ? '%' : '+');
            }
        }, 16);
    }
    
    // Scroll animations for sections
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.program-card, .feature-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        animateOnScroll.observe(el);
    });
    
    // Back to top button
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed; bottom: 20px; right: 20px; width: 50px; height: 50px;
        border: none; border-radius: 50%; background: #22c55e; color: white;
        font-size: 20px; cursor: pointer; opacity: 0; transition: opacity 0.3s;
        z-index: 1000; box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', () => {
        backToTop.style.opacity = window.scrollY > 300 ? '1' : '0';
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Form validation
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    if (applicationForm) {
        const inputs = applicationForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                const value = this.value.trim();
                let isValid = true;
                
                if (this.hasAttribute('required') && !value) isValid = false;
                if (this.type === 'email' && value && !validateEmail(value)) isValid = false;
                
                this.style.borderColor = isValid ? '#ddd' : '#e74c3c';
            });
        });
    }
    
    // Apply button functionality
    const applyButtons = document.querySelectorAll('.btn-apply, .btn-secondary');
    applyButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector('#admissions').scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
                const firstInput = document.querySelector('.admission-form input');
                if (firstInput) firstInput.focus();
            }, 800);
        });
    });
    
    // Program data
    const programData = {
        'automotive-technology': {
            title: 'Automotive Technology',
            overview: 'Comprehensive training in automotive repair, maintenance, and diagnostics. Students learn to work with modern vehicles, hybrid systems, and advanced automotive technologies.',
            curriculum: ['Engine Systems & Diagnostics', 'Transmission Repair', 'Brake Systems', 'Electrical Systems', 'Hybrid Technology', 'Auto Body Repair', 'Computer Diagnostics', 'Preventive Maintenance'],
            careers: ['Automotive Technician', 'Service Advisor', 'Parts Specialist', 'Shop Supervisor', 'Independent Mechanic', 'Dealership Technician'],
            requirements: 'High school diploma or equivalent. Basic math skills recommended. Physical ability to lift and work with tools.'
        },
        'carpentry-cabinet': {
            title: 'Carpentry & Cabinet Making',
            overview: 'Learn traditional and modern woodworking techniques, cabinet construction, and furniture making. Develop skills in precision measurement, joinery, and finishing.',
            curriculum: ['Wood Selection & Properties', 'Hand Tool Techniques', 'Power Tool Operation', 'Cabinet Construction', 'Furniture Design', 'Finishing Techniques', 'Blueprint Reading', 'Safety Procedures'],
            careers: ['Cabinet Maker', 'Furniture Builder', 'Trim Carpenter', 'Custom Woodworker', 'Shop Foreman', 'Self-Employed Craftsman'],
            requirements: 'High school diploma. Good hand-eye coordination. Ability to stand for extended periods and lift materials.'
        },
        'catering': {
            title: 'Catering',
            overview: 'Professional food service training covering menu planning, food preparation, presentation, and event management for various occasions.',
            curriculum: ['Food Safety & Sanitation', 'Menu Planning', 'Quantity Cooking', 'Food Presentation', 'Event Planning', 'Cost Control', 'Customer Service', 'Kitchen Management'],
            careers: ['Catering Manager', 'Event Coordinator', 'Chef', 'Food Service Supervisor', 'Banquet Manager', 'Restaurant Owner'],
            requirements: 'High school diploma. Food handler\'s permit (can be obtained during program). Physical stamina for kitchen work.'
        },
        'computer-applications': {
            title: 'Computer Applications',
            overview: 'Essential computer skills for modern workplace including Microsoft Office suite, data management, and basic programming concepts.',
            curriculum: ['Microsoft Word', 'Microsoft Excel', 'Microsoft PowerPoint', 'Database Management', 'Internet & Email', 'Basic Programming', 'Digital Communication', 'Computer Troubleshooting'],
            careers: ['Administrative Assistant', 'Data Entry Clerk', 'Office Coordinator', 'Customer Service Rep', 'Receptionist', 'Bookkeeper'],
            requirements: 'Basic literacy and numeracy skills. No prior computer experience required.'
        },
        'driving': {
            title: 'Driving',
            overview: 'Comprehensive driver education program covering road safety, traffic laws, and practical driving skills for license preparation.',
            curriculum: ['Traffic Laws & Regulations', 'Road Signs & Signals', 'Defensive Driving', 'Vehicle Operation', 'Parking Techniques', 'Highway Driving', 'Emergency Procedures', 'License Test Prep'],
            careers: ['Personal Driver', 'Delivery Driver', 'Taxi/Rideshare Driver', 'Truck Driver (with additional training)', 'Driving Instructor'],
            requirements: 'Minimum age 16. Valid learner\'s permit. Good vision (correctable). Clean driving record preferred.'
        },
        'electronics-installation': {
            title: 'Electronics Installation',
            overview: 'Training in electrical wiring, circuit installation, and electronic system setup for residential and commercial applications.',
            curriculum: ['Electrical Theory', 'Wiring Methods', 'Circuit Installation', 'Safety Codes', 'Troubleshooting', 'System Testing', 'Blueprint Reading', 'Tool Usage'],
            careers: ['Electronics Installer', 'Wiring Technician', 'Maintenance Electrician', 'Security System Installer', 'Audio/Video Technician'],
            requirements: 'High school diploma with math and science background. Good manual dexterity. Color vision required.'
        },
        'electronics': {
            title: 'Electronics',
            overview: 'Advanced electronics training covering circuit design, component testing, repair techniques, and digital systems.',
            curriculum: ['Electronic Components', 'Circuit Analysis', 'Digital Electronics', 'Microprocessors', 'PCB Design', 'Testing Equipment', 'Repair Techniques', 'Quality Control'],
            careers: ['Electronics Technician', 'Repair Specialist', 'Quality Control Inspector', 'Field Service Tech', 'Electronics Engineer Assistant'],
            requirements: 'High school diploma with strong math and science background. Analytical thinking skills.'
        },
        'food-beverage': {
            title: 'Food & Beverage Production',
            overview: 'Industrial food processing and beverage production training including quality control, packaging, and safety standards.',
            curriculum: ['Food Processing Methods', 'Quality Assurance', 'Packaging Systems', 'Hygiene Standards', 'Production Planning', 'Equipment Operation', 'Safety Protocols', 'Inventory Management'],
            careers: ['Production Supervisor', 'Quality Control Inspector', 'Food Technologist', 'Plant Operator', 'Packaging Specialist'],
            requirements: 'High school diploma. Food safety certification (provided). Physical ability for production environment.'
        },
        'beauty-cosmetology': {
            title: 'Hair, Beauty, Barbering & Cosmetology',
            overview: 'Comprehensive beauty training covering hair styling, makeup application, skin care, and salon business management.',
            curriculum: ['Hair Cutting & Styling', 'Color Theory', 'Chemical Services', 'Makeup Application', 'Skin Care', 'Nail Technology', 'Salon Management', 'Customer Relations'],
            careers: ['Hair Stylist', 'Makeup Artist', 'Barber', 'Salon Owner', 'Beauty Consultant', 'Wedding Specialist'],
            requirements: 'High school diploma. Creativity and people skills. State cosmetology license upon completion.'
        },
        'holiday-kids': {
            title: 'Holiday Training for Kids',
            overview: 'Fun and educational holiday program for children featuring creative activities, basic computer skills, and life skills development.',
            curriculum: ['Creative Arts & Crafts', 'Basic Computer Skills', 'Life Skills', 'Team Activities', 'Educational Games', 'Safety Awareness', 'Communication Skills', 'Fun Projects'],
            careers: ['Enhanced school performance', 'Improved creativity', 'Basic tech skills', 'Social development', 'Confidence building'],
            requirements: 'Ages 6-16. Parental consent required. No prior experience needed.'
        },
        'ict': {
            title: 'Information Communication & Technology',
            overview: 'Comprehensive IT training covering network administration, system support, database management, and cybersecurity fundamentals.',
            curriculum: ['Network Fundamentals', 'System Administration', 'Database Management', 'IT Security', 'Help Desk Support', 'Cloud Computing', 'Programming Basics', 'Project Management'],
            careers: ['IT Support Specialist', 'Network Administrator', 'Database Administrator', 'Systems Analyst', 'IT Consultant', 'Cybersecurity Analyst'],
            requirements: 'High school diploma with math background. Logical thinking skills. Basic computer knowledge helpful.'
        },
        'plumbing-metal': {
            title: 'Plumbing & Metal Work',
            overview: 'Dual training in plumbing systems and metal fabrication, covering installation, repair, welding, and metalworking techniques.',
            curriculum: ['Pipe Installation', 'Plumbing Systems', 'Welding Techniques', 'Metal Fabrication', 'Blueprint Reading', 'Safety Procedures', 'Tool Operation', 'Repair Methods'],
            careers: ['Plumber', 'Welder', 'Metal Fabricator', 'Maintenance Technician', 'Pipefitter', 'Self-Employed Contractor'],
            requirements: 'High school diploma. Physical strength and stamina. Good hand-eye coordination. Safety-conscious mindset.'
        },
        'web-developer': {
            title: 'Web Developer',
            overview: 'Modern web development training covering front-end and back-end technologies, responsive design, and portfolio development.',
            curriculum: ['HTML/CSS/JavaScript', 'Responsive Design', 'Database Integration', 'Version Control', 'Web Frameworks', 'UI/UX Design', 'Testing & Debugging', 'Portfolio Development'],
            careers: ['Web Developer', 'Front-End Developer', 'UI/UX Designer', 'Freelance Developer', 'Web Designer', 'Full-Stack Developer'],
            requirements: 'High school diploma. Logical thinking and creativity. Basic computer skills. Portfolio development included.'
        }
    };

    // Modal functionality
    const modal = document.getElementById('programModal');
    const modalClose = document.querySelector('.modal-close');

    // Program buttons functionality
    document.querySelectorAll('.program-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const program = this.dataset.program;
            const data = programData[program];
            
            if (data) {
                document.getElementById('modalTitle').textContent = data.title;
                document.getElementById('modalOverview').textContent = data.overview;
                document.getElementById('modalRequirements').textContent = data.requirements;
                
                const curriculumList = document.getElementById('modalCurriculum');
                curriculumList.innerHTML = '';
                data.curriculum.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item;
                    curriculumList.appendChild(li);
                });
                
                const careersList = document.getElementById('modalCareers');
                careersList.innerHTML = '';
                data.careers.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item;
                    careersList.appendChild(li);
                });
                
                modal.style.display = 'block';
            }
        });
    });

    // Close modal
    modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});