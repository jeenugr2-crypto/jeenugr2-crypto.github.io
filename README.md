# Pragyan Academy demo bookings

The website is hosted on GitHub Pages. The demo section links to `book-demo.html`, which embeds the merchant's Cal ID event `pragyan-academy/demo-1-1`. The merchant configured Razorpay payment collection in that Cal ID event. Parents choose a slot, enter their details, and pay ₹49 through Cal ID's Razorpay integration to confirm a 30-minute demo. The site offers WhatsApp help if the booking or meeting link does not arrive.

The old standalone Razorpay Payment Button has been removed from the website to avoid charging parents twice. Its old Zoom redirect is no longer used by the website. Pricing, payment success requirements, booking questions, video location, and email notifications are configured in Cal ID, not in this repository.

The Cal ID page is public, but its event payment setting should prevent unpaid bookings. This was configured by the merchant and could not be independently verified from this environment because Cal ID blocks automated access to the public event. Before accepting bookings, verify that the event displays **Pay to Book** for ₹49 in a normal browser, that payment confirms the booking, and that the attendee receives the meeting link by email. Keep the Cal ID event's video location configured and its default confirmation email enabled.

To preview locally, run `python3 -m http.server 8000` in this directory and open `http://localhost:8000`.
