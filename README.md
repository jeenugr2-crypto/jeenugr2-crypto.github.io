# Pragyan Academy demo bookings

The website is hosted on GitHub Pages. The demo section embeds a live Razorpay Payment Button for a ₹49, 30-minute demo. The merchant configured that button to redirect customers to a Zoom booking page after payment. The website explains that customers must complete the Zoom booking to reserve a time, and offers WhatsApp for help if the booking page or meeting link does not arrive.

The live button ID in `index.html` was supplied by the merchant. Its public checkout shows ₹49 without the Test Mode label. It collects name, email, phone, class, and board. It does not collect the preferred date or time; customers choose that on the Zoom booking page. The post-payment redirect is configured in the Razorpay dashboard for this specific live button, not in the website code. Its behavior has not been verified with a real payment.

The website does not verify Payment Button transactions. Check the payment's captured status in Razorpay when reconciling bookings. Payment alone does not reserve a calendar slot.

To preview locally, run `python3 -m http.server 8000` in this directory and open `http://localhost:8000`.
