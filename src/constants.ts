import { Job } from './types';

export const JOBS: Job[] = [
  {
    id: '1',
    title: 'Nhóm việc cơ khí và hàn tại Nga',
    salary: 'Thu nhập tùy đơn hàng',
    location: 'Theo khu vực tiếp nhận',
    category: 'Cơ khí',
    duration: 'Theo hợp đồng tiếp nhận',
    benefits: [
      'Được tư vấn rõ về điều kiện làm việc trước khi đăng ký',
      'Hỗ trợ chuẩn bị hồ sơ và đào tạo trước xuất cảnh',
    ],
    requirements: [
      'Độ tuổi và sức khỏe phù hợp với từng đơn hàng',
      'Có tinh thần làm việc và sẵn sàng tham gia phỏng vấn',
      'Hồ sơ cá nhân rõ ràng theo hướng dẫn của công ty',
    ],
    description:
      'Phù hợp với ứng viên muốn tìm hiểu nhóm việc cơ khí, hàn, lắp ráp hoặc vận hành tại Nga. Điều kiện và thu nhập sẽ được tư vấn theo từng đơn hàng cụ thể.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCqeNcXfBaeQlbdWZWwiDEUonVfyXwWoxGydl_VmGJCTfCJ3DMGwhgUXzse4XVhEMmKY4O7RVc8qwphEot7JKMvgJcLaw3QGIp39js2pdiZc3pxaSBo9Nm4FWW7B924HpB1abHSAsYP9EwKesGJHvSXXJE53i6hm81aEqRVnZZZdPE13PVUTMpRx4jOTBtlzxHuBK5SLVTjCvBEEPj73RRHAwNfD0wrJ96K9uTL3kBqJJUi8LU3gBBmgMHIAY1Lgoc8TJ9bEHFb8WXj',
    isHot: true,
  },
  {
    id: '2',
    title: 'Nhóm việc may mặc và hoàn thiện sản phẩm',
    salary: 'Thu nhập theo vị trí tiếp nhận',
    location: 'Theo nhà máy tiếp nhận',
    category: 'May mặc',
    duration: 'Theo hợp đồng tiếp nhận',
    benefits: [
      'Có đào tạo định hướng trước khi đi',
      'Phù hợp với ứng viên muốn làm việc theo dây chuyền hoặc khoán sản lượng',
    ],
    requirements: [
      'Nam hoặc nữ theo điều kiện của từng đơn hàng',
      'Cẩn thận, chịu được môi trường làm việc công nghiệp',
      'Sẵn sàng hoàn thiện hồ sơ hai đợt theo hướng dẫn',
    ],
    description:
      'Nhóm việc dành cho ứng viên quan tâm xưởng may, đóng gói, hoàn thiện sản phẩm hoặc các công đoạn tỉ mỉ trong nhà máy.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBcAZJZO1Seiz1-dDE4u8pN8oKNGrwsMeOzfAIseuXzHWN6Ic5juLnyTxXpOQR-cRYsVs0RXiMFZvntUjj1n0PqLXnuJsjoCFo7MIMVfc5DixIEOOVaFBEyIhIiF3ixJF913hAATRGQAA7gtkU3Kw5_SXQYSyubSAYGGrgiHK0LS2If9G7SA7lAC57MInmfYS5wmCfDc6CbuFgfvGtH8NzvvT1dFER0SYwfGaY7R-2IEe68d9mHjrselgMEp2M62l1xWmTX1A1U9vwG',
  },
  {
    id: '3',
    title: 'Nhóm việc nhà máy và đóng gói',
    salary: 'Tư vấn theo đơn hàng thực tế',
    location: 'Theo nơi tiếp nhận',
    category: 'Nhà máy',
    duration: 'Theo hợp đồng tiếp nhận',
    benefits: [
      'Được giải thích rõ quy trình nhập cảnh và thủ tục đầu vào',
      'Có hướng dẫn chuẩn bị hành lý và sinh hoạt ban đầu',
    ],
    requirements: [
      'Sức khỏe phù hợp với công việc',
      'Chấp hành đào tạo định hướng và tiếng Nga cơ bản',
      'Hợp tác đầy đủ trong quá trình làm hồ sơ',
    ],
    description:
      'Nhóm việc phù hợp với người muốn tìm hiểu môi trường nhà máy, đóng gói hoặc các công việc sản xuất phổ thông tại Nga.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBu22x4DpqhetUc_cTcvV2GTuPytHgWx-WeKKB2RG8kZrYjOSJ8PDeZGIyyp_npY4fdT9lJu_jUvJf1NpYpv3xSJaYIHHhIxZxTJYpgYAKEb0cZTkNEckMZPbitaohbAJTa4gdxCVvWDPJrWfSBivMSLr2qMgeSVuqDLSPDZXyyB2SCGFT-i2Md_rYR4yHZZy5c1gkQKKYISEnPx-IhCh8M9KOSA-ipwpNg2ZdcHUrdA6Q32c81hFm8zPSh73MwLq6YZdyppMv4c3tr',
  },
];

export const FAQS = [
  {
    question: 'Đi Nga có cần biết tiếng Nga trước không?',
    answer:
      'Người lao động thường được đào tạo tiếng Nga cơ bản và nội dung định hướng trước khi xuất cảnh. Mức độ yêu cầu sẽ phụ thuộc vào từng đơn hàng và môi trường làm việc.',
  },
  {
    question: 'Chi phí đi lao động Nga được tính như thế nào?',
    answer:
      'Chi phí cần được hỏi rõ theo từng giai đoạn hồ sơ và theo từng đơn hàng. Khi tư vấn, JAVICO nên giải thích rõ khoản nào cố định, khoản nào phát sinh và thời điểm cần hoàn thiện.',
  },
  {
    question: 'Sau khi sang Nga, người lao động sẽ làm gì đầu tiên?',
    answer:
      'Thông thường người lao động sẽ lưu trú trung chuyển, hoàn tất khám sức khỏe, làm thủ tục đầu vào như lăn tay, thẻ, giấy phép lao động, ngân hàng và sim trước khi ổn định nơi làm việc.',
  },
  {
    question: 'Lao động nữ có thể đi Nga không?',
    answer:
      'Tùy từng nhóm việc và đơn hàng tiếp nhận. Những nội dung về công việc phù hợp, chỗ ở, môi trường và an toàn nên được tư vấn kỹ theo từng hồ sơ cụ thể.',
  },
];
