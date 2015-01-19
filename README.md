#SpotOn
============
Resources:
* User
* Business
* Appointment

Endpoints (/api):
* GET /business
* POST /business (for a specific user)
* GET /appointment (for a specific user and/or business)
* POST /appointment (for a specific user and business)

Routes:
- Unprotected
  * /
  * /login
  * /signup
- Protected
  * /dashboard
  * /business
