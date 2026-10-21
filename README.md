# Pragyan Academy demo bookings

The website is hosted on GitHub Pages. The demo section embeds a live Razorpay Payment Button for a ₹49, 30-minute demo. It directs parents to send their payment ID or receipt and preferred time on WhatsApp. Check the payment and confirm the slot manually before sending a Google Meet link.

The live button ID in `index.html` was supplied by the merchant. Its public checkout shows ₹49 without the Test Mode label. It collects name, email, phone, class, and board. It does not collect the preferred date or time, so parents must send those on WhatsApp after paying.

The website does not verify Payment Button transactions. Check the payment's captured status in Razorpay before confirming a demo. A preferred time is a request, not an automatically reserved calendar slot.

To preview locally, run `python3 -m http.server 8000` in this directory and open `http://localhost:8000`.
