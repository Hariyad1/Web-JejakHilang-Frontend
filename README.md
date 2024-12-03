# Web JejakHilang

Website "JejakHilang" dirancang untuk membantu masyarakat dalam mencari dan melaporkan barang hilang secara online. Platform ini bertujuan untuk memudahkan pengguna dalam menemukan barang yang hilang serta meningkatkan kesadaran akan pentingnya pelaporan, baik itu pelaporan penemuan barang maupun pelaporan barang hilang. Dengan fitur-fitur yang dirancang untuk kenyamanan pengguna, "JejakHilang" diharapkan dapat menjadi solusi efektif dalam pencarian barang hilang.

## About Team

**ID Team : DB3-PS009**
- B243068C - [@Hariyadi](https://github.com/hariyad1)
- B243064C - [@Keivin Immanuel Akta Purba](https://github.com/hariyad1)

## Latar Belakang

Kehilangan barang, baik itu barang pribadi atau dokumen penting, sering menimbulkan keresahan. Setiap hari, laporan barang hilang muncul di berbagai tempat seperti transportasi umum, kampus, dan pusat perbelanjaan. Sayangnya, tidak ada platform terpusat yang efektif untuk melaporkan dan mencari barang hilang, sehingga banyak barang tidak kembali ke pemiliknya.
Proyek "JejakHilang" bertujuan untuk mengatasi masalah ini dengan menciptakan solusi digital yang menghubungkan orang yang kehilangan barang dengan mereka yang menemukannya. Kami ingin menyediakan platform yang memfasilitasi pengembalian barang hilang secara efisien.

Saat ini, pelaporan barang hilang tidak terorganisir, sering kali mengandalkan media sosial atau pengumuman fisik. Dengan teknologi digital, ada peluang untuk menciptakan platform yang lebih terstruktur dan mudah diakses.

Kami memilih proyek ini berdasarkan pengalaman pribadi kehilangan barang dan kesulitan dalam mencarinya. Tujuan kami adalah memudahkan pelaporan dan pencarian barang hilang, menyediakan fitur pencarian yang efisien, serta menjamin keamanan dan privasi data pengguna. Kami berharap proyek ini dapat mengurangi jumlah barang hilang yang tidak kembali dan memberikan solusi yang lebih baik bagi masyarakat.

## Screenshots
**Destkop**

Halaman Home
![App Screenshot](https://ik.imagekit.io/jejakhilang/Untitled%20design123.png?updatedAt=1733230034071)

Halaman User
![App Screenshot](https://ik.imagekit.io/jejakhilang/profile.png?updatedAt=1733221569278)

![App Screenshot](https://ik.imagekit.io/jejakhilang/create.jpg?updatedAt=1733221569256)

![App Screenshot](https://ik.imagekit.io/jejakhilang/laporan%20saya.png?updatedAt=1733221569275)

![App Screenshot](https://ik.imagekit.io/jejakhilang/daftar%20laporan1.png?updatedAt=1733221569490)

![App Screenshot](https://ik.imagekit.io/jejakhilang/detail%20laporan.png?updatedAt=1733221569585)

Halaman Admin
![App Screenshot](https://ik.imagekit.io/jejakhilang/admin%20post%20management.png?updatedAt=1733221569208)

![App Screenshot](https://ik.imagekit.io/jejakhilang/admin%20user%20management.png?updatedAt=1733221569492)

**Handphone**

![App Screenshot](https://ik.imagekit.io/jejakhilang/halaman%20responsif%20mobile1.png?updatedAt=1733231427498)

![App Screenshot](https://ik.imagekit.io/jejakhilang/responsif%20mobile2.png?updatedAt=1733232469308)

## Features

- Login untuk User dan Admin: Memungkinkan pengguna dan admin untuk masuk ke sistem dengan kredensial masing-masing.
- Registrasi Pengguna Baru: Pengguna dapat mendaftar untuk membuat akun baru.
- Logout: Pengguna dan admin dapat keluar dari akun mereka dengan aman.
- Pengelolaan Laporan oleh Pengguna: Pengguna dapat membuat, mengedit, dan melihat daftar laporan pribadi.
- Pengelolaan Komentar: Pengguna dapat menambahkan dan menghapus komentar pada laporan.
- Pengelolaan Pengguna oleh Admin: Admin dapat melihat dan menghapus pengguna.
- Pengelolaan Laporan oleh Admin: Admin dapat melihat dan menghapus semua laporan.
- Tema Terang dan Gelap: Pengguna dapat mengubah tema tampilan antara mode terang dan gelap.
- Responsivitas: Aplikasi mendukung tampilan yang responsif untuk perangkat mobile dan desktop.

## Tech Stack

**Client:** 
- React: Library JavaScript untuk membangun antarmuka pengguna.
- Ant Design: Library komponen UI untuk React.
- Tailwind CSS: Framework CSS untuk styling yang responsif dan cepat.
- Axios: Library untuk melakukan HTTP requests.
- Framer Motion: Library untuk animasi di React.
- Vite: Build tool yang cepat untuk pengembangan frontend.
- SweetAlert2: Library untuk menampilkan alert yang cantik dan responsif.

**Server:**
- [Web-JejakHilang-Backend](https://github.com/Hariyad1/Web-JejakHilang-Backend.git)

## Run Locally

Clone the project

```bash
git clone https://github.com/Hariyad1/Web-JejakHilang-Frontend.git
```

Make sure to be in Frontend-main directory

```bash
cd Web-JejakHilang-Frontend
```

Install dependencies

```bash
npm install or npm i
```
Build project

```bash
npm run Build
```

Start the server (server will run in Localhost:5173)

```bash
npm run dev
```

For Logging in Make sure the server side or backend side is running

## URL Configuration

In the JejakHilang web application, there are two important URLs used to connect the frontend with backend services and third-party services. Below is an explanation of each URL:

1. **Backend URL**

   ```javascript
   export const URL = "http://localhost:5000";
   ```

   This URL connects the frontend application with the backend server, directing all API requests made by the frontend to this address. It is utilized throughout the application for operations such as user authentication, data management, and database interaction. To ensure proper functionality, make sure your backend server is running at the specified address and port. If the server configuration changes, update this URL to match the new server address.

2. **ImageKit URL**

   ```javascript
   export const IF = "https://ik.imagekit.io/your_imagekit_url";
   ```

   This URL accesses the ImageKit service, which provides storage and management for images uploaded by users. It is used to display images within the application, such as photos of lost or found items. To use this service effectively, ensure you have an active ImageKit account and that the URL endpoint is configured correctly. If you are using a different endpoint, update this URL to reflect your configuration. By understanding and configuring these URLs correctly, you can ensure that the JejakHilang web application functions properly and connects to the necessary services.
   To obtain your ImageKit URL, first, create an account on [ImageKit.io](https://imagekit.io/) if you haven't already. Once logged in, navigate to the ImageKit dashboard. From there, go to Settings and select URL Endpoints. Here, you will find your ImageKit URL, which will look something like https://ik.imagekit.io/your_imagekit_id. Copy this URL for use in your application configuration.

Demo Access

[Web-JejakHilang](https://)

[Dokumen Penggunaan Aplikasi](https://youtu.be/)

```bash
Username : admin@gmail.com
Password : admin123
```
