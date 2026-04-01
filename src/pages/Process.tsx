import * as React from 'react';
import { motion } from 'motion/react';
import { CheckCircle, Clock, FileText, Plane, UserCheck, Briefcase, ShieldCheck, GraduationCap, BadgeCheck } from 'lucide-react';
import { Card } from '../components/ui/Card';

const STEPS = [
  {
    title: 'Đăng ký và tiếp nhận nhu cầu',
    desc: 'Người lao động để lại thông tin, được tư vấn ban đầu về nhóm việc quan tâm và cách hiểu đúng về thị trường Nga.',
    icon: FileText,
  },
  {
    title: 'Xét điều kiện hồ sơ ban đầu',
    desc: 'Bộ phận tư vấn rà độ tuổi, sức khỏe, kinh nghiệm, giấy tờ cá nhân và mức độ phù hợp với từng đơn hàng.',
    icon: UserCheck,
  },
  {
    title: 'Phỏng vấn hoặc đánh giá tuyển chọn',
    desc: 'Ứng viên tham gia phỏng vấn trực tiếp hoặc online theo lịch của đơn hàng.',
    icon: Briefcase,
  },
  {
    title: 'Thông báo trúng tuyển',
    desc: 'Sau khi đạt yêu cầu, ứng viên được hướng dẫn các bước tiếp theo để bắt đầu hoàn thiện hồ sơ và tài chính.',
    icon: BadgeCheck,
  },
  {
    title: 'Nộp hồ sơ đợt 1',
    desc: 'Thường gồm hộ chiếu, CCCD, khám sức khỏe, ảnh, cam kết và các giấy tờ nền tảng theo hướng dẫn của công ty.',
    icon: FileText,
  },
  {
    title: 'Đào tạo định hướng và tiếng Nga cơ bản',
    desc: 'Ứng viên được chuẩn bị về tác phong, lưu ý làm việc, cách sinh hoạt và các câu giao tiếp cơ bản trước khi xuất cảnh.',
    icon: GraduationCap,
  },
  {
    title: 'Hoàn thiện hồ sơ đợt 2',
    desc: 'Bổ sung lý lịch tư pháp số 2, sơ yếu lý lịch xác nhận, bằng cấp công chứng và các giấy tờ theo yêu cầu từng hồ sơ.',
    icon: ShieldCheck,
  },
  {
    title: 'Xuất cảnh và làm thủ tục đầu vào',
    desc: 'Người lao động được hướng dẫn họp trước bay, lưu trú trung chuyển và các thủ tục đầu vào như khám sức khỏe, thẻ, giấy phép lao động, ngân hàng, sim.',
    icon: Plane,
  },
];

export default function Process() {
  return (
    <div className="bg-[#f8fafb] min-h-screen pb-32">
      <section className="bg-[#003a59] pt-32 pb-48 px-6 relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-2 px-4 py-2 bg-[#7efba4]/10 border border-[#7efba4]/20 rounded-full text-[#7efba4] text-[10px] font-black uppercase tracking-[0.3em] mb-12 backdrop-blur-md">
            <Clock className="w-3 h-3" />
            Khung quy trình theo handbook Nga
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-8xl font-black text-white mb-10 font-['Manrope'] leading-[0.9] tracking-tight">
            Quy Trình <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7efba4] to-[#00401e]">Đi Nga</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-white/60 text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            Mục tiêu của trang này là giúp ứng viên và gia đình hình dung đúng hành trình đi lao động Nga, thay vì chỉ nhìn vào một lời mời tuyển dụng ngắn gọn.
          </motion.p>
        </div>
      </section>

      <section className="py-20 px-6 -mt-32 relative z-20">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-12 relative before:absolute before:left-12 md:before:left-1/2 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-[#7efba4] before:via-[#003a59]/20 before:to-transparent">
            {STEPS.map((step, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.06 }} className={`relative flex flex-col md:flex-row items-start md:items-center gap-12 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="absolute left-0 md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 w-24 h-24 rounded-[2rem] bg-white shadow-2xl shadow-[#003a59]/10 flex items-center justify-center z-20 border border-[#003a59]/5">
                  <step.icon className="w-10 h-10 text-[#003a59]" />
                </div>
                <div className="w-full md:w-1/2 pl-24 md:pl-0">
                  <Card className={`p-10 md:p-12 border-none shadow-2xl shadow-[#003a59]/5 bg-white rounded-[3rem] transition-all duration-500 ${idx % 2 !== 0 ? 'md:mr-16' : 'md:ml-16'}`}>
                    <div className="flex items-center gap-6 mb-8">
                      <span className="text-5xl font-black text-[#003a59]/5 tracking-tight">0{idx + 1}</span>
                      <h3 className="text-2xl font-black text-[#003a59] font-['Manrope'] tracking-tight">{step.title}</h3>
                    </div>
                    <p className="text-[#434653] leading-relaxed font-medium text-lg">{step.desc}</p>
                  </Card>
                </div>
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#00401e] mb-6">Điểm cần nhớ</h4>
            <h2 className="text-4xl md:text-6xl font-black text-[#003a59] mb-8 font-['Manrope'] tracking-tight">JAVICO Nên Hỗ Trợ Gì?</h2>
            <div className="w-24 h-1 bg-[#7efba4] mx-auto rounded-full" />
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: ShieldCheck, title: 'Rõ hồ sơ', desc: 'Ứng viên cần được biết hồ sơ chia làm mấy đợt, mỗi đợt gồm gì và thiếu giấy tờ nào thì sẽ ảnh hưởng ra sao.' },
              { icon: FileText, title: 'Rõ timeline', desc: 'Thay vì hứa thời gian cứng, cần giải thích timeline phụ thuộc vào đơn hàng, xét duyệt hồ sơ, đào tạo và lịch tiếp nhận.' },
              { icon: CheckCircle, title: 'Rõ sau nhập cảnh', desc: 'Gia đình thường yên tâm hơn khi biết người lao động sẽ qua giai đoạn trung chuyển, khám sức khỏe, thẻ, giấy phép và ngân hàng như thế nào.' },
            ].map((item, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="bg-white p-12 rounded-[3rem] shadow-xl shadow-[#003a59]/5 border border-[#003a59]/5 text-center group">
                <div className="w-20 h-20 bg-[#f8fafb] rounded-[1.5rem] flex items-center justify-center mx-auto mb-10">
                  <item.icon className="w-10 h-10 text-[#003a59]" />
                </div>
                <h3 className="text-2xl font-black text-[#003a59] mb-6 font-['Manrope']">{item.title}</h3>
                <p className="text-[#737784] leading-relaxed font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
