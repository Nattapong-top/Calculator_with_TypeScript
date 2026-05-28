// src/server.ts
import { app, repo } from './app.js';

const PORT = 3000;

// 🚀 สั่งเปิดหน้าร้านพอร์ต 3000 ค้างไว้
const server = app.listen(PORT, () => {
    console.log(`\n🚀 [Paa API Server]: เซิร์ฟเวอร์เครื่องคิดเลขเปิดใช้งานแล้วครับป๋า!`);
    console.log(`📡 เปิดรับสัญญาณเน็ตเวิร์กอยู่ที่: http://localhost:${PORT}\n`);
});

// ท่าไม้ตายดักปิดท่อฐานข้อมูลอย่างปลอดภัยเวลาป๋ากด Ctrl + C
process.on('SIGINT', () => {
    console.log('\n🛑 กำลังปิดเซิร์ฟเวอร์อย่างปลอดภัย...');
    repo.close();
    server.close(() => {
        console.log('👋 ปิดระบบเรียบร้อย เจอกันใหม่ครับป๋า!');
        process.exit(0);
    });
});