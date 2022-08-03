<br />
<p align="center">

  <h3 align="center">Blanja Rest API</h3>
  <p align="center">
    <image align="center" width="200" src='./images/blanjarest.jpg' />
  </p>

  <p align="center">
    <br />
    <a href="https://github.com/muhislah/blanjarest"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://blanja-restapi.herokuapp.com/">View Demo</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Related Project](#related-project)
* [Contact](#contact)



<!-- ABOUT THE PROJECT -->
## About The Project


Blanja Rest API is server api that used in [`Blanja`](https://blanja-frontend-app.vercel.app/) . This server manage all function and endpoint in Blaja app such as create, add , update and delete product in seller and add cart purchase in customer.  Authentication about login, register and getting profile info also edit profile as well.


### Built With

* [Node JS](https://nodejs.org/en/docs/)
* [Express JS](https://expressjs.com/)
* [Node Mailer](https://nodemailer.com/)
* [Cloudinary](https://cloudinary.com/)


<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

* [nodejs](https://nodejs.org/en/download/)

### Installation

1. Clone the repo
```sh
git clone https://github.com/muhislah/blanjarest
```
2. Install NPM packages
```sh
npm install
```
3. Add .env file at root folder project, and add following
```sh
PORT = 5000
MAIL_USER = 'api.muhislah@gmail.com'
MAIL_PASSWORD = your_google_app_password
SIGNATURE_KEY = naf093u09u4099u10j51n
SECRET_KEY = 'campers tnoucca' // or use your own
CLOUDINARY_CLOUD_NAME = 'muhislah' // or use your own
CLOUDINARY_API_KEY = '137181345732934' // or use your own
CLOUDINARY_API_SECRET =  'dDB5rNTIKweyjRCTaALU89XQ-eY' // or use your own
CLOUDINARY_URL = cloudinary://137181345732934:dDB5rNTIKweyjRCTaALU89XQ-eY@muhislah // or use your own

```
4. Getting stuck, read the POSTMAN Collection
* [Blanja Postman Documentation](https://documenter.getpostman.com/view/20688868/UzkY1FHE)


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b your/branch`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/yourbranch`)
5. Open a Pull Request



<!-- RELATED PROJECT -->
## Related Project
* [`Blanja Demo`](https://blanja-frontend-app.vercel.app/)
* [`Blanja Rest API`](https://blanja-restapi.herokuapp.com/)
* [`Blanja Repository`](https://github.com/muhislah/blanja-react-redux.git)


<!-- CONTACT -->
## Contact

Contributors names and contact info

* Author
  * Muhamad Islahuddin [@muhislah](https://github.com/muhislah)
