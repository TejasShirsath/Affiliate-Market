# Affiliate-Market

Affiliate-Market is a web-based platform designed to enhance the affiliate marketing experience. It features a user-friendly interface with advanced UI functionalities to create an engaging and seamless user experience.

## Features

- **Base64-encoded ASCII String Encryption**: Provides a layer of security by encoding sensitive information.
- **Skeleton Screen**: Improves perceived load time by displaying a placeholder preview while content loads.
- **Optimized Website**: Ensures fast load times and smooth performance across all devices.
- **Video Autoplay on Hover**: Enhances user engagement by playing product videos automatically when the user hovers over a product.
- **Modern UI/UX**: Developed with the latest web technologies for a sleek and intuitive interface.
- **Stunning Sliders**: Interactive and visually appealing sliders for showcasing products and promotions.
- **Responsive Design**: Ensures the platform looks great on all devices, from desktops to mobile phones.
- **Dynamic Content**: Utilizes JavaScript to create interactive and dynamic content on the web pages.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Python
- **Database**: MySQL

## Getting Started

### Prerequisites

- [Python](https://www.python.org/downloads/)
- [XAMPP](https://www.apachefriends.org) (for MySQL database)
- A modern web browser (Chrome, Firefox, Safari, etc.)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/TejasShirsath/Affiliate-Market.git
    cd affiliate-market
    ```
2. Set up the backend environment:

    ```bash
    pip install -r requirements.txt
    ```
3. Set up XAMPP for MySQL database:

    - Download and install [XAMPP](https://www.apachefriends.org/index.html).
    - Start the XAMPP control panel and start the Apache and MySQL modules.
    - Import database.sql in phpMyAdmin (accessible via `http://localhost/phpmyadmin`).

4. Configure the database settings in your project:

    - Update the database configuration in data.py

5. Run the development server:

    ```bash
    python data.py
    ```

4. Open the HTML file directly in your web browser:

## Usage

- Navigate through the product listings.
- Hover over a product to see the video autoplay feature in action.
- Interact with various UI elements to explore the full functionality of the platform.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
