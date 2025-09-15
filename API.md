# 🚀 Hướng dẫn viết API trong Project Jumpjoy

## 📋 Tổng quan
Project Jumpjoy sử dụng kiến trúc **MVC** với **TypeScript**, **Express.js**, và **Sequelize ORM**. Tài liệu này hướng dẫn từng bước để tạo một API mới.

## 🏗 Cấu trúc thư mục
```
src/
├── types/           # Định nghĩa interfaces và types
├── valadation/      # Schema validation với Joi
├── services/        # Business logic
├── controllers/     # Xử lý HTTP requests
├── routers/         # Định nghĩa routes
├── database/        # Models và migrations
├── middlewares/     # Middleware functions
└── utils/           # Utility functions
```

## 📝 Quy trình tạo API (6 bước)

### **Bước 1: Định nghĩa Types/Interfaces**
📁 **Vị trí:** `src/types/[module-name].ts`

**Ví dụ:** Tạo API `auth/forgot-password`

```typescript
// src/types/auth.ts
export interface IForgotPassword {
  userName: string;
  email: string;
}

// Response type (đã có sẵn)
export interface IDataResponse {
  status: EStatus;
  message: string;
  data?: any;
}
```

### **Bước 2: Tạo Validation Schema**
📁 **Vị trí:** `src/valadation/[module-name]Validation.ts`

```typescript
// src/valadation/authValidation.ts
import Joi from 'joi';
import { IForgotPassword } from '../types/auth';
import { EStatus, type IDataResponse } from '../types/response';

const forgotPasswordSchema = Joi.object({
  userName: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
});

function forgotPasswordValidation(
  data: IForgotPassword
): IDataResponse | undefined {
  const valid = forgotPasswordSchema.validate(data ?? {});
  
  if (valid.error) {
    return {
      status: EStatus.ERROR,
      message: valid.error?.details[0].message,
    };
  }
}

export { forgotPasswordValidation };
```

### **Bước 3: Viết Business Logic (Service)**
📁 **Vị trí:** `src/services/[module-name]-services.ts`

```typescript
// src/services/auth-services.ts
export const forgotPasswordService = async ({
  userName,
  email,
}: IForgotPassword): Promise<IDataResponse> => {
  try {
    // 1. Tìm user trong database
    const user = await User.findOne({ where: { userName } });
    
    // 2. Kiểm tra user và email
    if (!user || user.email !== email) {
      return {
        status: EStatus.ERROR,
        message: 'Tài khoản không tồn tại hoặc email không chính xác',
      };
    }

    // 3. Tạo mật khẩu mới
    const newPassword = 'abc123@';
    const hashedPassword = hashPassword(newPassword);

    // 4. Cập nhật database
    await User.update(
      { password: hashedPassword },
      { where: { userName } }
    );
    
    // 5. Gửi email (async)
    sendMailService({
      to: email,
      subject: 'Mật khẩu mới',
      content: `Mật khẩu mới của bạn là: ${newPassword}`,
    });

    return {
      status: EStatus.SUCCESS,
      message: 'Mật khẩu mới đã được gửi về email của bạn.',
    };
  } catch (error) {
    return {
      status: EStatus.ERROR,
      message: 'Có lỗi xảy ra, vui lòng thử lại sau.',
    };
  }
};
```

### **Bước 4: Tạo Controller**
📁 **Vị trí:** `src/controllers/[module-name]-controller.ts`

```typescript
// src/controllers/auth-controller.ts
import { Request, Response } from 'express';
import { IForgotPassword } from '../types/auth';
import { IDataResponse } from '../types/response';
import { forgotPasswordService } from '../services/auth-services';
import { forgotPasswordValidation } from '../valadation/authValidation';

const forgotPasswordController = async (
  req: Request<unknown, unknown, IForgotPassword>,
  res: Response<IDataResponse>,
) => {
  // 1. Validation (tùy chọn)
  const validationError = forgotPasswordValidation(req.body);
  if (validationError) {
    return res.status(400).json(validationError);
  }

  // 2. Gọi service
  const response = await forgotPasswordService(req.body);

  // 3. Trả về response
  const statusCode = response.status === EStatus.SUCCESS ? 200 : 400;
  return res.status(statusCode).json(response);
};

export { forgotPasswordController };
```

### **Bước 5: Định nghĩa Route**
📁 **Vị trí:** `src/routers/[module-name]Router.ts`

```typescript
// src/routers/authRouter.ts
import { Router } from 'express';
import { 
  loginController,
  registerController,
  forgotPasswordController 
} from '../controllers/auth-controller';

const authRouter = Router();

authRouter.post('/login', loginController);
authRouter.post('/register', registerController);
authRouter.post('/forgot-password', forgotPasswordController);

export default authRouter;
```

### **Bước 6: Đăng ký Router**
📁 **Vị trí:** `src/routers/index.ts`

```typescript
// src/routers/index.ts
import authRouter from './authRouter';

const routers = (app: Express): void => {
  app.use('/api/auth', authRouter);
  // ... other routes
};
```

## 🎯 Ví dụ thực tế: API User Profile

### 1. Types
```typescript
// src/types/user.ts
export interface IUpdateProfile {
  userId: number;
  fullName?: string;
  email?: string;
  avatar?: string;
}
```

### 2. Validation
```typescript
// src/valadation/userValidation.ts
const updateProfileSchema = Joi.object({
  userId: Joi.number().required(),
  fullName: Joi.string().min(2).max(50).optional(),
  email: Joi.string().email().optional(),
  avatar: Joi.string().uri().optional(),
});
```

### 3. Service
```typescript
// src/services/user-services.ts
export const updateProfileService = async (data: IUpdateProfile) => {
  const { userId, ...updateData } = data;
  
  const user = await User.findByPk(userId);
  if (!user) {
    return {
      status: EStatus.ERROR,
      message: 'Người dùng không tồn tại',
    };
  }

  await user.update(updateData);
  
  return {
    status: EStatus.SUCCESS,
    message: 'Cập nhật thông tin thành công',
    data: { ...user.dataValues, password: undefined },
  };
};
```

### 4. Controller
```typescript
// src/controllers/user-controller.ts
const updateProfileController = async (req, res) => {
  const response = await updateProfileService(req.body);
  const statusCode = response.status === EStatus.SUCCESS ? 200 : 400;
  return res.status(statusCode).json(response);
};
```

### 5. Router
```typescript
// src/routers/user-router.ts
userRouter.put('/profile', updateProfileController);
```

## 🛡 Middleware và Authentication

### Sử dụng Authentication Middleware
```typescript
// src/routers/user-router.ts
import { authMiddleware } from '../middlewares/auth';

userRouter.put('/profile', authMiddleware, updateProfileController);
```

### Middleware tùy chỉnh
```typescript
// src/middlewares/validation.ts
export const validateRequest = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: EStatus.ERROR,
        message: error.details[0].message,
      });
    }
    next();
  };
};
```

## 📊 Database Operations

### Sequelize Query Examples
```typescript
// Tìm một record
const user = await User.findOne({ where: { id: userId } });

// Tìm nhiều records với điều kiện
const users = await User.findAll({
  where: { isActive: true },
  include: [Profile],
  order: [['createdAt', 'DESC']],
  limit: 10,
});

// Tạo mới
const newUser = await User.create(userData);

// Cập nhật
await User.update(updateData, { where: { id: userId } });

// Xóa
await User.destroy({ where: { id: userId } });
```

## 🧪 Testing API

### Sử dụng cURL
```bash
# POST request
curl -X POST http://localhost:3000/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"userName": "testuser", "email": "test@example.com"}'

# GET request với authentication
curl -X GET http://localhost:3000/api/user/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Sử dụng Postman
1. Tạo collection mới
2. Thêm request với method và URL
3. Thêm headers nếu cần (Content-Type, Authorization)
4. Thêm body data cho POST/PUT requests

## 🔧 Commands hữu ích

```bash
# Development
npm run dev              # Chạy server với nodemon

# Code Quality
npm run lint            # Kiểm tra lỗi ESLint
npm run lint:fix        # Tự động sửa lỗi ESLint
npm run format          # Format code với Prettier

# Database
npm run migrate:up      # Chạy migrations
npm run migrate:undo    # Rollback migration cuối

# Production
npm start              # Build và chạy production
```

## ✅ Checklist khi tạo API mới

- [ ] Định nghĩa interface trong `types/`
- [ ] Tạo validation schema với Joi
- [ ] Viết service function với error handling
- [ ] Tạo controller xử lý HTTP request/response
- [ ] Định nghĩa route trong router
- [ ] Đăng ký router trong `routers/index.ts`
- [ ] Test API với Postman/cURL
- [ ] Chạy `npm run lint` và `npm run format`
- [ ] Kiểm tra database operations
- [ ] Thêm authentication middleware nếu cần

## 🚨 Best Practices

### 1. Error Handling
```typescript
try {
  // Database operations
} catch (error) {
  console.error('Error:', error);
  return {
    status: EStatus.ERROR,
    message: 'Có lỗi xảy ra, vui lòng thử lại sau.',
  };
}
```

### 2. Input Validation
- Luôn validate input với Joi
- Sanitize dữ liệu trước khi lưu database
- Kiểm tra quyền truy cập

### 3. Response Format
```typescript
// Success response
{
  status: "SUCCESS",
  message: "Thao tác thành công",
  data: { ... }
}

// Error response
{
  status: "ERROR",
  message: "Mô tả lỗi cụ thể"
}
```

### 4. Security
- Sử dụng HTTPS trong production
- Validate và sanitize input
- Implement rate limiting
- Sử dụng JWT cho authentication
- Hash passwords với bcrypt

## 📚 Tài liệu tham khảo

- [Express.js Documentation](https://expressjs.com/)
- [Sequelize Documentation](https://sequelize.org/)
- [Joi Validation](https://joi.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Lưu ý:** Tài liệu này được tạo dựa trên cấu trúc hiện tại của project Jumpjoy. Hãy tuân thủ các convention và patterns đã được thiết lập để đảm bảo tính nhất quán của codebase. 