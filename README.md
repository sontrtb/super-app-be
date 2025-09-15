# Jumpjoy

## 📦 Mô tả
Dự án này được xây dựng với:
- **Node.js v22**
- **TypeScript** để viết code hiện đại
- **Sequelize** làm ORM kết nối cơ sở dữ liệu
- **ESLint** để kiểm tra code chuẩn
- **Prettier** để định dạng code tự động

## 🛠 Cài đặt
1. **Cài đặt dependencies:**
   ```bash
   npm install
   ```
   (Optional) Sau khi cài đặt nên tắt trình code mở lại để nhận ESLint và Prettier

## 🚀 Chạy ứng dụng
1. **Phát triển (watch mode với nodemon):**
   ```bash
   npm run dev
   ```

2. **Build và chạy production:**
   ```bash
   npm start
   ```

## ✅ Kiểm tra và định dạng code
1. **Kiểm tra lỗi với ESLint:**
   ```bash
   npm run lint
   ```

2. **Tự động sửa lỗi ESLint:**
   ```bash
   npm run lint:fix
   ```

3. **Định dạng code với Prettier:**
   ```bash
   npm run format
   ```


## 📦 Scripts trong package.json
```json
{
  "scripts": {
    "dev": "nodemon",
    "start": "tsc && node dist/server.js",
    "migrate:up": "cd ./src/database && npx sequelize-cli db:migrate",
    "migrate:undo": "cd ./src/database && npx sequelize-cli db:migrate:undo",
    "lint": "eslint 'src/**/*.{ts,js}'",
    "lint:fix": "eslint 'src/**/*.{ts,js}' --fix",
    "format": "prettier --write 'src/**/*.{ts,js,json,md}'"
  }
}
```

## 🧱 Yêu cầu môi trường
- Node.js: v22.x.x
- npm: v9+ hoặc tương thích với Node.js v22# xskt_be
# super-app-be
