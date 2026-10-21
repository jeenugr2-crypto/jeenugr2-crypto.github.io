# Pragyan Academy demo bookings

The website is hosted on GitHub Pages. The demo section embeds a live Razorpay Payment Button for a ₹49, 30-minute demo. `book-demo.html` embeds the merchant's Cal ID event `pragyan-academy/demo-1-1` for slot selection. The homepage uses booking-provider-neutral wording until the Razorpay redirect is updated from Zoom to `https://www.pragyan-academy.in/book-demo.html`. The site offers WhatsApp help if the booking page or meeting link does not arrive.

The live button ID in `index.html` was supplied by the merchant. Its public checkout shows ₹49 without the Test Mode label. It collects name, email, phone, class, and board. It does not collect the preferred date or time; customers choose that on the Cal ID booking page after the redirect is changed. The post-payment redirect is configured in the Razorpay dashboard for this specific live button, not in the website code. Its behavior has not been verified with a real payment.

The website does not verify Payment Button transactions. `book-demo.html` is a public static page, so the redirect does not enforce payment before booking. Check each payment's captured status in Razorpay when reconciling Cal ID bookings. Payment alone does not reserve a calendar slot. In Cal ID, configure the event's video location and ensure its default confirmation email is enabled; neither has been verified here.

To preview locally, run `python3 -m http.server 8000` in this directory and open `http://localhost:8000`.
