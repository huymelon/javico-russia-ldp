# JAVICO Russia Landing Page

Landing page React/Vite cho thị trường `xuất khẩu lao động Nga 2026` của JAVICO.

## Mục tiêu
- Tạo landing page giàu nội dung để phục vụ SEO / AIO / GEO cho thị trường Nga.
- Giữ đúng định vị: `Nhật là core business`, `Nga là growth segment`.
- Viết nội dung theo hướng đứng về phía người lao động và gia đình, không dùng claim thiếu nguồn.

## Nội dung chính đã triển khai
- Hero section + CTA tư vấn.
- Khối trust: giấy phép, hồ sơ 2 đợt, đào tạo trước xuất cảnh, thủ tục sau nhập cảnh.
- Pillar SEO sections: điều kiện, hồ sơ, chi phí, thu nhập, cách chọn công ty uy tín, so sánh Nga và Nhật.
- Nhóm việc tham khảo để người dùng hình dung thị trường.
- Quy trình đi Nga theo khung 8 bước từ handbook.
- FAQ và form tư vấn.

## Lưu ý nội dung
- Không chốt cứng lương, chi phí, timeline nếu chưa có nguồn xác nhận theo từng đơn hàng.
- Không dùng claim như `100%`, `24/7`, `số 1`, `bao đậu`, `việc nhẹ lương cao`.
- Ưu tiên giải thích theo checklist, quy trình, hồ sơ và rủi ro người lao động quan tâm.

## Chạy local
### Yêu cầu
- Node.js

### Cài đặt
```bash
npm install
```

### Chạy dev
```bash
npm run dev
```

### Build production
```bash
npm run build
```

### Type check
```bash
npm run lint
```

## Trạng thái kiểm tra
Đã xác nhận tại local vào ngày 01/04/2026:
- `npm install`: pass
- `npm run build`: pass
- `npm run lint`: pass

## File quan trọng
- `src/pages/Home.tsx`: landing page chính
- `src/pages/Process.tsx`: trang quy trình đi Nga
- `src/pages/About.tsx`: định vị và trust
- `src/pages/Jobs.tsx`: nhóm việc tham khảo
- `src/pages/JobDetail.tsx`: chi tiết nhóm việc / CTA tư vấn
- `src/constants.ts`: FAQ + job seed data
- `COMPETITOR_PATTERNS.md`: pattern rút ra từ các trang top

## Hướng phát triển tiếp
- Bổ sung internal link tới blog Nga của JAVICO
- Tối ưu chunk size nếu muốn deploy production nhẹ hơn
- Chuẩn bị phiên bản WordPress-ready để dựng lại trên site chính
