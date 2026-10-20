# Pragyan Academy demo bookings

The website is hosted on GitHub Pages. The demo section embeds a Razorpay Payment Button and directs parents to send their receipt and preferred time on WhatsApp. Confirm the slot manually before sending a Google Meet link.

The current button ID in `index.html` came from Razorpay while the dashboard showed **Test Mode** and the account was under review. Test payments do not collect real money. Before inviting parents to pay, wait for Razorpay live activation, create a **live** fixed-price ₹49 button, and replace the button ID in `index.html`. Remove the test-mode notice at the same time. Check that the Razorpay checkout shows ₹49 and collects the contact details you need.

The website does not verify Payment Button transactions. Check the payment's captured status in Razorpay before confirming a demo. A preferred time is a request, not an automatically reserved calendar slot.

To preview locally, run `python3 -m http.server 8000` in this directory and open `http://localhost:8000`.
