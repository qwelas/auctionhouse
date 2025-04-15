# Implementation Overview

The goal of this implementation was to create a page that can be easily integrated into a website. It is not intended to represent a full website.

## Requirements:
- Install Node.js: [https://nodejs.org/](https://nodejs.org/)

## Setup Instructions:

1. Run the following command to install the necessary dependencies:
   ```bash
   npm install
   ```

2. Start the backend from the `src` folder:
   ```bash
   node server.cjs
   ```

3. Start the frontend from the project root folder:
   ```bash
   npm run dev
   ```

4. Access the site at:
   [http://localhost:5173/](http://localhost:5173/)

## Things I would like to improve, add, or change:

- **Optimize the Time Remaining calculation:** The current method is not very performance-efficient.
- **Add a responsive design framework:** Implement Bootstrap or another mobile-responsive library to make the page fully responsive.
- **Improve backend interaction:** Currently, the frontend loads without receiving data from the backend at the start. The backend should handle everything, and the frontend should fetch data accordingly.
- **Add testing:** Introduce testing for both frontend and backend to ensure stability and functionality.