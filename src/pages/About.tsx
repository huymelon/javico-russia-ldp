import * as React from 'react';
import { motion } from 'motion/react';
import { Target, Users, Globe, Award, ShieldCheck, HeartHandshake, FileText, Compass } from 'lucide-react';
import { Card } from '../components/ui/Card';

export default function About() {
  return (
    <div className="bg-[#f8fafb] min-h-screen pb-32">
      <section className="bg-[#003a59] pt-32 pb-48 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://picsum.photos/seed/russia/1920/1080" alt="Background" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#003a59] via-[#003a59]/80 to-[#003a59]" />
        </div>
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-2 px-4 py-2 bg-[#7efba4]/10 border border-[#7efba4]/20 rounded-full text-[#7efba4] text-[10px] font-black uppercase tracking-[0.3em] mb-12 backdrop-blur-md">
            <Globe className="w-3 h-3" />
            Japan core | Russia growth
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-8xl font-black text-white mb-10 font-['Manrope'] leading-[0.9] tracking-tight">
            Về <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7efba4] to-[#00401e]">JAVICO</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-white/60 text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            Trang này giới thiệu định hướng nội dung của JAVICO cho thị trường Nga: đứng về phía người lao động và gia đình, ưu tiên quy trình rõ, hồ sơ rõ và thông tin có thể dùng được ngay.
          </motion.p>
        </div>
      </section>

      <section className="py-20 px-6 -mt-32 relative z-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <Card className="p-12 md:p-16 border-none shadow-2xl shadow-[#003a59]/10 bg-white rounded-[3rem] h-full relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#7efba4]/5 rounded-bl-full transition-transform duration-700 group-hover:scale-150" />
              <div className="w-20 h-20 bg-[#f0f9ff] rounded-3xl flex items-center justify-center mb-10 shadow-inner">
                <Target className="w-10 h-10 text-[#003a59]" />
              </div>
              <h2 className="text-3xl font-black text-[#003a59] mb-8 font-['Manrope'] tracking-tight">Sứ mệnh nội dung</h2>
              <p className="text-[#434653] text-lg leading-relaxed font-medium">
                Giúp người lao động và gia đình hiểu thị trường lao động Nga theo cách thực tế hơn: biết mình cần chuẩn bị gì, hỏi gì, lưu ý gì trước khi ra quyết định.
              </p>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <Card className="p-12 md:p-16 border-none shadow-2xl shadow-[#00401e]/20 bg-[#00401e] text-white rounded-[3rem] h-full relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full transition-transform duration-700 group-hover:scale-150" />
              <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mb-10 shadow-inner">
                <Compass className="w-10 h-10 text-[#7efba4]" />
              </div>
              <h2 className="text-3xl font-black text-white mb-8 font-['Manrope'] tracking-tight">Vai trò của thị trường Nga</h2>
              <p className="text-white/70 text-lg leading-relaxed font-medium">
                Với JAVICO, Nhật Bản vẫn là trục dịch vụ cốt lõi. Nga là thị trường được đẩy mạnh về nội dung, SEO và tư vấn để mở rộng độ phủ và khả năng tiếp cận đúng tệp khách hàng trong năm 2026.
              </p>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#00401e] mb-6">Nguyên tắc triển khai</h4>
            <h2 className="text-4xl md:text-6xl font-black text-[#003a59] mb-8 font-['Manrope'] tracking-tight">Giá Trị Cốt Lõi</h2>
            <div className="w-24 h-1 bg-[#7efba4] mx-auto rounded-full" />
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: Award, title: 'Rõ ràng', desc: 'Không chỉ nói cơ hội, mà phải nói cả hồ sơ, quy trình, thời điểm và các mốc người lao động cần chuẩn bị.' },
              { icon: ShieldCheck, title: 'Thận trọng', desc: 'Không dùng các cam kết tuyệt đối hoặc số liệu thiếu nguồn. Mọi thông tin quan trọng phải bám thực tế vận hành.' },
              { icon: HeartHandshake, title: 'Đứng về phía người lao động', desc: 'Nội dung được viết theo nỗi lo thật của ứng viên và gia đình, không theo kiểu brochure tuyển dụng một chiều.' },
            ].map((val, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="text-center group">
                <div className="w-24 h-24 bg-white rounded-[2rem] shadow-xl shadow-[#003a59]/5 flex items-center justify-center mx-auto mb-10 transition-all duration-500 group-hover:bg-[#003a59] group-hover:-translate-y-2">
                  <val.icon className="w-10 h-10 text-[#00401e] group-hover:text-[#7efba4] transition-colors" />
                </div>
                <h3 className="text-2xl font-black text-[#003a59] mb-6 font-['Manrope']">{val.title}</h3>
                <p className="text-[#737784] leading-relaxed font-medium px-4">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#003a59]" />
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#7efba4] rounded-full blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
          {[
            { label: 'Thị trường cốt lõi', value: 'Nhật' },
            { label: 'Hướng tăng trưởng', value: 'Nga' },
            { label: 'Cấu trúc hồ sơ', value: '2 đợt' },
            { label: 'Khung quy trình', value: '8 bước' },
          ].map((stat, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="text-center">
              <div className="text-4xl md:text-6xl font-black text-[#7efba4] mb-4 font-['Manrope'] tracking-tighter">{stat.value}</div>
              <div className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1">
              <h2 className="text-4xl font-black text-[#003a59] mb-8 font-['Manrope']">Trang này dành cho ai?</h2>
              <p className="text-[#434653] text-lg leading-relaxed mb-8">
                Nội dung thị trường Nga được xây để phục vụ 4 nhóm chính: công nhân trẻ muốn tăng thu nhập, gia đình hoặc vợ chồng đang cân nhắc tài chính, người từng đi nước ngoài muốn so sánh thị trường mới và lao động nữ cần biết rõ mức độ phù hợp trước khi đăng ký.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                  <Users className="w-6 h-6 text-[#00401e]" />
                  <span className="font-bold text-[#003a59]">Ưu tiên pain-point thật: chi phí, hồ sơ, an toàn, chỗ ở, thu nhập ròng</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                  <FileText className="w-6 h-6 text-[#00401e]" />
                  <span className="font-bold text-[#003a59]">Mỗi trang nên giúp người đọc mang về được checklist hoặc câu hỏi cụ thể</span>
                </div>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              <img src="https://picsum.photos/seed/team1/400/500" alt="Tư vấn hồ sơ" className="rounded-2xl w-full h-64 object-cover shadow-xl" />
              <img src="https://picsum.photos/seed/team2/400/500" alt="Hỗ trợ người lao động" className="rounded-2xl w-full h-64 object-cover shadow-xl mt-8" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
