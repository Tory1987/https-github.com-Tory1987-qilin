

# Tích hợp Local Notifications làm nhắc học trên Native

## Tổng quan

Dự án đã có sẵn hàm `scheduleStudyReminder(hour, minute)` và `cancelStudyReminder()` trong `src/hooks/useNative.ts`. Kế hoạch là thêm UI chọn giờ nhắc học vào trang Profile, dùng Local Notifications cho thiết bị native (Android/iOS) song song với hệ thống Push Notifications hiện tại (cho web).

## Thay đổi

### 1. Thêm mục "Nhắc học hàng ngày" vào Profile (src/pages/Profile.tsx)

- Thêm một card mới ngay dưới phần Push Notification toggle (hoặc thay thế nếu đang trên native)
- Hiển thị khi `Capacitor.isNativePlatform() === true`
- Gồm:
  - Switch bật/tắt nhắc học local
  - Hai dropdown (Select) chọn giờ và phút (ví dụ: 08:00, 19:30...)
  - Lưu cài đặt vào localStorage (`study-reminder-hour`, `study-reminder-minute`, `study-reminder-enabled`)
- Khi bật: gọi `scheduleStudyReminder(hour, minute)`
- Khi tắt: gọi `cancelStudyReminder()`
- Khi thay đổi giờ/phút: tự động cập nhật lịch nhắc

### 2. Không thay đổi useNative.ts

Hàm `scheduleStudyReminder` và `cancelStudyReminder` đã đầy đủ, không cần sửa.

### 3. Logic hoạt động

- Local Notifications chỉ hoạt động trên native (Capacitor) -- không ảnh hưởng web
- Push Notifications (web) vẫn giữ nguyên cho người dùng trên trình duyệt
- Hai hệ thống hoạt động độc lập, không xung đột

## Chi tiết kỹ thuật

- Import `scheduleStudyReminder`, `cancelStudyReminder` từ `@/hooks/useNative`
- Import `Capacitor` từ `@capacitor/core` (đã có trong Profile)
- Dùng `Select` component (Radix) cho picker giờ/phút
- State khởi tạo từ localStorage, persist khi thay đổi
- Giờ mặc định: 20:00 (tối)

