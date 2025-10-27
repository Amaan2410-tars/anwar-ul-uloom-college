# API Documentation - Anwar-ul-Uloom College

## Base URL
```
http://localhost:5000/api
```

## Authentication

All protected routes require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123",
  "role": "student",
  "studentId": "S001"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "refreshToken": "refresh_token_here",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Password123"
}
```

### Refresh Token
```http
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "refresh_token_here"
}
```

### Logout
```http
POST /api/auth/logout
Authorization: Bearer <token>
```

### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

---

## Payment Endpoints (Razorpay)

### Create Payment Order
```http
POST /api/payments/create-order
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 50000,
  "currency": "INR",
  "paymentType": "semester",
  "description": "Semester Fee Payment"
}
```

**Response:**
```json
{
  "success": true,
  "order": {
    "id": "order_xxx",
    "amount": 5000000,
    "currency": "INR",
    "status": "created"
  },
  "paymentId": "..."
}
```

### Verify Payment
```http
POST /api/payments/verify
Authorization: Bearer <token>
Content-Type: application/json

{
  "razorpayOrderId": "order_xxx",
  "razorpayPaymentId": "pay_xxx",
  "razorpaySignature": "signature_here"
}
```

### Razorpay Webhook
```http
POST /api/payments/webhook
X-Razorpay-Signature: signature_here
Content-Type: application/json

{
  "event": "payment.captured",
  "payload": { ... }
}
```

### Get User Payments
```http
GET /api/payments/my-payments
Authorization: Bearer <token>
```

---

## Certificate Endpoints

### Generate Certificate (Admin Only)
```http
POST /api/certificates/generate
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "studentId": "student_id_here",
  "certificateType": "degree",
  "courseId": "course_id",
  "departmentId": "dept_id"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Certificate generated successfully",
  "certificate": {
    "id": "...",
    "certificateNumber": "CERT-123456",
    "pdfUrl": "/uploads/certificates/..."
  },
  "downloadUrl": "/api/certificates/xxx/download"
}
```

### Download Certificate
```http
GET /api/certificates/:id/download
Authorization: Bearer <token>
```

---

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "message": "Error message here",
  "errors": []  // Optional validation errors
}
```

### Common Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## Rate Limiting

- General API: 100 requests per 15 minutes per IP
- Authentication endpoints: 5 requests per 15 minutes per IP

---

## Webhook Signature Verification

Razorpay webhooks include a signature header that must be verified:

```javascript
const crypto = require('crypto')
const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET)
hmac.update(JSON.stringify(req.body))
const generatedSignature = hmac.digest('hex')

// Compare with X-Razorpay-Signature header
```

---

## Testing

Use Postman or any HTTP client to test the API. Make sure to:
1. Include `Content-Type: application/json` header
2. Add JWT token to Authorization header for protected routes
3. Use valid Razorpay test keys for payment testing

---

## Support

For API issues, contact: api@anwarululoom.edu
