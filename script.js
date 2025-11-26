// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Filter functionality for cars
const filterBtns = document.querySelectorAll('.filter-btn');
const carCards = document.querySelectorAll('.car-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        carCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Modal functionality for View Details
const modal = document.createElement('div');
modal.className = 'modal';
modal.innerHTML = `
    <div class="modal-content">
        <span class="close">&times;</span>
        <div class="modal-body">
            <img id="modal-image" src="" alt="">
            <div class="modal-details">
                <h2 id="modal-title"></h2>
                <p id="modal-price"></p>
                <div id="modal-specs"></div>
                <div class="modal-description">
                    <h3>Description</h3>
                    <p id="modal-desc"></p>
                </div>
                <div class="modal-contact">
                    <h3>Contact Information</h3>
                    <p><i class="fas fa-phone"></i> +1 (555) 123-4567</p>
                    <p><i class="fas fa-envelope"></i> info@premierproperties.com</p>
                    <button class="btn btn-primary" onclick="openContactForm()">Contact Seller</button>
                </div>
            </div>
        </div>
    </div>
`;
document.body.appendChild(modal);

// Sample data for cars, plots, and lands
const itemData = {
    'Mercedes-Benz S-Class': {
        type: 'car',
        price: '$85,000',
        image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=600',
        specs: ['2022', '15,000 km', 'Petrol', 'Automatic', 'V8 Engine', 'Leather Interior'],
        description: 'Luxury sedan with premium features, advanced safety systems, and exceptional comfort. Perfect for executive transportation.'
    },
    'BMW X5': {
        type: 'car',
        price: '$65,000',
        image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600',
        specs: ['2021', '25,000 km', 'Diesel', 'Automatic', 'Turbo Engine', 'All-Wheel Drive'],
        description: 'Premium SUV with excellent performance, spacious interior, and advanced technology features.'
    },
    'Porsche 911': {
        type: 'car',
        price: '$120,000',
        image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600',
        specs: ['2023', '8,000 km', 'Petrol', 'Manual', 'Flat-6 Engine', 'Sport Package'],
        description: 'Iconic sports car with exceptional performance, precision handling, and timeless design.'
    },
    'Audi A6': {
        type: 'car',
        price: '$55,000',
        image: 'https://images.unsplash.com/photo-1628519592419-bf288f08cef5?w=600',
        specs: ['2022', '18,000 km', 'Hybrid', 'Automatic', 'Quattro AWD', 'Premium Interior'],
        description: 'Executive sedan combining efficiency with luxury, featuring hybrid technology and premium amenities.'
    },
    'Residential Plot - Downtown': {
        type: 'plot',
        price: '$150,000',
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600',
        specs: ['2,500 sq ft', 'Prime Location', 'Clear Title', 'Ready to Build', 'All Utilities Available'],
        description: 'Prime residential plot in downtown area with excellent connectivity and all modern amenities nearby.'
    },
    'Commercial Plot - Business District': {
        type: 'plot',
        price: '$300,000',
        image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600',
        specs: ['5,000 sq ft', 'High Traffic', 'Ready to Build', 'Commercial Zone', 'Corner Plot'],
        description: 'Excellent commercial plot in prime business district with high visibility and foot traffic.'
    },
    'Luxury Plot - Hillside': {
        type: 'plot',
        price: '$250,000',
        image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600',
        specs: ['4,000 sq ft', 'Scenic View', 'Premium Location', 'Gated Community', 'Mountain View'],
        description: 'Luxury residential plot with breathtaking views and premium location in exclusive hillside community.'
    },
    'Agricultural Land - Fertile Valley': {
        type: 'land',
        price: '$50,000/acre',
        image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600',
        specs: ['10 acres', 'Water Access', 'Fertile Soil', 'Irrigation System', 'Road Access'],
        description: 'Highly productive agricultural land with excellent soil quality and reliable water supply.'
    },
    'Forest Land - Investment Opportunity': {
        type: 'land',
        price: '$25,000/acre',
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600',
        specs: ['50 acres', 'Mature Trees', 'High ROI', 'Timber Value', 'Wildlife Habitat'],
        description: 'Excellent investment opportunity with mature timber and potential for sustainable forestry operations.'
    },
    'Development Land - Future City': {
        type: 'land',
        price: '$75,000/acre',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600',
        specs: ['25 acres', 'Road Access', 'Development Ready', 'Zoning Approved', 'Utilities Nearby'],
        description: 'Prime development land with approved zoning and excellent potential for residential or commercial development.'
    }
};

// View Details functionality
document.addEventListener('click', (e) => {
    if (e.target.textContent === 'View Details') {
        const card = e.target.closest('.car-card, .property-card');
        const title = card.querySelector('h3').textContent;
        const data = itemData[title];
        
        if (data) {
            document.getElementById('modal-image').src = data.image;
            document.getElementById('modal-title').textContent = title;
            document.getElementById('modal-price').textContent = data.price;
            document.getElementById('modal-desc').textContent = data.description;
            
            // Create specs HTML
            const specsHTML = data.specs.map(spec => `<span class="spec-item"><i class="fas fa-check"></i> ${spec}</span>`).join('');
            document.getElementById('modal-specs').innerHTML = `<h3>Specifications</h3><div class="specs-grid">${specsHTML}</div>`;
            
            modal.style.display = 'block';
        }
    }
});

// Close modal
document.querySelector('.close').addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Contact form functionality
function openContactForm() {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    modal.style.display = 'none';
}

// Contact form submission
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will contact you soon.');
    e.target.reset();
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