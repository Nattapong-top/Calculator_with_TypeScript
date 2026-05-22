// src/main.ts
import { runCLI } from './cli.js'; // 💡 อย่าลืมเติม .js ตามกฎของ NodeNext นะครับป๋า

// process.argv คืออาร์เรย์ที่เก็บคำที่ป๋าพิมพ์ใน Terminal
// เราจะตัด 2 ตัวแรกทิ้ง (เพราะตัวแรกคือ path ของ node, ตัวที่สองคือ path ของไฟล์เรา)
// ให้เหลือเฉพาะคำสั่งคำนวณจริง ๆ เช่น ['add', '10', '20', 'Paa_TopIT']
const args = process.argv.slice(2);

// ดักไว้หน่อยเผื่อป๋าลืมพิมพ์พารามิเตอร์ ระบบจะได้ช่วยเตือนวิธีใช้ให้ครับ
if (args.length < 3) {
    console.log('\n❌ ป๋าครับ พิมพ์คำสั่งไม่ครบถ้วนนะ');
    console.log('💡 วิธีใช้: npm run calc <วิธีคำนวณ> <เลขที่ 1> <เลขที่ 2> [ชื่อของป๋า]');
    console.log('ตัวอย่างเช่น: npm run calc add 50 30 "Paa TopIT"\n');
    process.exit(1);
}

// ส่งอาร์เรย์คำสั่งเข้าไปรันในระบบคิดเลขและบันทึกฐานข้อมูล
const output = runCLI(args);

// พ่นผลลัพธ์ออกหน้าจอคอมมานด์ไลน์ให้ป๋าชื่นใจ
console.log(`\n🚀 [CLI Output]: ${output}\n`);