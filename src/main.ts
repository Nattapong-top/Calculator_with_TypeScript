// src/main.ts
import { runCLI } from './cli.js';

const args = process.argv.slice(2);

// 💡 ส่งมาอย่างน้อย 1 ตัว (เช่น สมการก้อนเดียว) ก็ยอมให้รันแล้วครับ
if (args.length < 1) {
    console.log('\n❌ พิมพ์คำสั่งไม่ครบถ้วนครับ');
    console.log('💡 เวอร์ชัน 1: npm run calc -- <คำสั่ง> <เลข1> <เลข2> [ชื่อ]');
    console.log('💡 เวอร์ชัน 2: npm run calc -- "<สมการ>" [ชื่อ]');
    console.log('ตัวอย่าง: npm run calc -- "50 + 50" "Paa TopIT"\n');
    process.exit(1);
}

const output = runCLI(args);
console.log(`\n🚀 [CLI Output]: ${output}\n`);