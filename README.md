Lab8_6730611033

วิธีติดตั้งและรันโปรเจกต์
- ตั้งค่าฐานข้อมูล เปิดโปรแกรม XAMPP แล้ว Start ตัว Apache กับ MySQL
- เข้าไปที่ http://localhost/phpmyadmin
- นำไฟล์ supermarket_db.sql ที่แนบไว้ในโฟลเดอร์ไป Import เข้าไปได้เลย ระบบจะสร้างตารางให้เอง

การรันโปรเจกต์
- เปิดโฟลเดอร์ใน VS CODE
- เปิดหน้าต่าง Terminal แล้วพิมพ์คำสั่งเพื่อติดตั้งไลบรารีทั้งหมดที่จำเป็น ดังนี้ npm install express ejs mysql2 multer body-parser
- เมื่อติดตั้งเสร็จ ให้พิมพ์คำสั่ง npm run start (หรือ nodemon app.js) เพื่อรันเซิร์ฟเวอร์
- เปิดเว็บเบราว์เซอร์แล้วพิมพ์ URL: http://localhost:3000 เพื่อเข้าใช้งานระบบได้เลยครับ
