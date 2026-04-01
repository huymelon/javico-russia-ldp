import * as React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  CheckCircle,
  Info,
  ChevronRight,
  ShieldCheck,
  PlaneTakeoff,
  FileText,
  GraduationCap,
  Users,
  Verified,
  MessageSquare,
  Send,
  Loader2,
  Briefcase,
  Clock,
  X,
  LogIn,
  CreditCard,
  BadgeCheck,
  ClipboardCheck,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardHeader } from '../components/ui/Card';
import { JOBS, FAQS } from '../constants';
import { cn } from '../lib/utils';
import { useFirebase } from '../lib/FirebaseProvider';
import { db, handleFirestoreError, OperationType, signInWithGoogle } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Home() {
  const { user } = useFirebase();
  const [chatOpen, setChatOpen] = React.useState(false);
  const [leadForm, setLeadForm] = React.useState({
    name: '',
    phone: '',
    year: '',
    city: '',
    note: '',
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      signInWithGoogle();
      return;
    }
    if (!leadForm.name || !leadForm.phone) {
      alert('Vui lòng điền đầy đủ Họ tên và Số điện thoại');
      return;
    }
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'applications'), {
        jobId: 'general_consultation',
        userId: user.uid,
        status: 'pending',
        fullName: leadForm.name,
        phone: leadForm.phone,
        email: user.email,
        interest: leadForm.note,
        city: leadForm.city,
        createdAt: serverTimestamp(),
      });
      setIsSuccess(true);
      setLeadForm({ name: '', phone: '', year: '', city: '', note: '' });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'applications');
    } finally {
      setIsSubmitting(false);
    }
  };

  const [chatInput, setChatInput] = React.useState('');
  const [chatMessages, setChatMessages] = React.useState<{ role: 'user' | 'model'; text: string }[]>([]);
  const [isChatLoading, setIsChatLoading] = React.useState(false);
  const chatEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isChatLoading]);

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;

    const userMessage = chatInput;
    setChatMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const { GoogleGenAI } = await import('@google/genai');
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite-preview',
        contents: [...chatMessages, { role: 'user', text: userMessage }].map((m) => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }],
        })),
        config: {
          systemInstruction:
            'Bạn là trợ lý tư vấn lao động Nga của JAVICO. Hãy trả lời ngắn gọn, rõ ràng, không bịa số liệu. Ưu tiên giải thích quy trình, hồ sơ, điều kiện, lưu ý trước và sau xuất cảnh. Khi câu hỏi cần chi phí, lương, đơn hàng cụ thể, hãy nói rằng cần tư vấn theo từng hồ sơ và đơn hàng thực tế. Nếu người dùng muốn đăng ký, hãy hướng dẫn họ điền form tư vấn trên trang web.',
        },
      });

      setChatMessages((prev) => [...prev, { role: 'model', text: response.text || 'Xin lỗi, tôi không thể trả lời lúc này.' }]);
    } catch (error) {
      console.error('Chat error:', error);
      setChatMessages((prev) => [...prev, { role: 'model', text: 'Có lỗi xảy ra, vui lòng thử lại sau.' }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const quickReplies = ['Hồ sơ gồm gì?', 'Quy trình mấy bước?', 'Đi Nga cần chuẩn bị gì?', 'Nữ đi Nga được không?'];

  return (
    <div className="flex flex-col bg-[#f8fafb]">
      <section className="relative bg-[#003a59] overflow-hidden pt-32 pb-48 px-6">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            alt="Russia industrial skyline"
            className="w-full h-full object-cover grayscale"
            src="/images/russia-hero.jpg"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#003a59] via-[#003a59]/80 to-[#003a59]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="text-center lg:text-left">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-2 bg-[#7efba4]/10 backdrop-blur-md border border-[#7efba4]/20 px-4 py-2 rounded-full mb-10 shadow-xl shadow-[#7efba4]/5">
              <Verified className="w-4 h-4 text-[#7efba4]" />
              <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Giấy phép 793/GP-LDTBXH</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-8xl font-black text-white leading-[0.9] mb-10 tracking-tight font-['Manrope']">
              Đi Nga Làm Việc <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7efba4] to-[#9eeab3]">Cần Chuẩn Bị Gì?</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-white/60 text-xl mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Trang này dành cho người đang tính đi Nga và cho cả gia đình. Bạn sẽ thấy rõ: có hợp đi không, hồ sơ gồm gì, chi phí hỏi thế nào, và sang bên đó những ngày đầu sẽ làm gì.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <Button variant="tertiary" size="lg" className="px-12 h-16 rounded-full text-sm font-black uppercase tracking-widest shadow-2xl shadow-[#7efba4]/20" onClick={() => { const el = document.getElementById('apply-form'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}>
                Đăng ký tư vấn
              </Button>
              <a href="https://javico.vn/lao-dong-nga/" target="_blank" rel="noreferrer">
                <Button variant="outline" size="lg" className="px-12 h-16 rounded-full text-sm font-black uppercase tracking-widest border-white/10 text-white hover:bg-white/10">
                  Xem trang chính thức
                </Button>
              </a>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="hidden lg:block relative">
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white/5 aspect-[4/3]">
              <img src="/images/worker-group.jpg" alt="Người lao động JAVICO chuẩn bị hồ sơ đi Nga" className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#003a59]/60 to-transparent" />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-white p-10 rounded-[2.5rem] shadow-2xl z-20 border border-[#003a59]/5">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-[#00401e] rounded-2xl flex items-center justify-center shadow-lg shadow-[#00401e]/20">
                  <ClipboardCheck className="text-white w-8 h-8" />
                </div>
                <div>
                  <p className="text-4xl font-black text-[#003a59] tracking-tighter">8 bước</p>
                  <p className="text-[10px] uppercase font-black text-[#737784] tracking-[0.2em]">Từ đăng ký đến xuất cảnh</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 -mt-24 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FileText className="w-10 h-10 text-[#7efba4]" />,
                title: 'Hồ sơ 2 đợt',
                desc: 'Biết đợt 1 nộp gì, đợt 2 bổ sung gì để không bị rối giấy tờ.',
                color: 'bg-[#003a59]',
              },
              {
                icon: <GraduationCap className="w-10 h-10 text-[#7efba4]" />,
                title: 'Có đào tạo trước đi',
                desc: 'Có phần định hướng và tiếng Nga cơ bản để đỡ bỡ ngỡ trước ngày bay.',
                color: 'bg-[#00401e]',
              },
              {
                icon: <PlaneTakeoff className="w-10 h-10 text-[#7efba4]" />,
                title: 'Rõ sau nhập cảnh',
                desc: 'Biết trước giai đoạn trung chuyển, khám sức khỏe, làm giấy tờ, sim và ngân hàng.',
                color: 'bg-[#195175]',
              },
            ].map((stat, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className={`${stat.color} p-12 rounded-[3rem] shadow-2xl border border-white/5 text-white group hover:-translate-y-2 transition-all duration-500`}>
                <div className="mb-8 transition-transform duration-500 group-hover:scale-110">{stat.icon}</div>
                <h3 className="text-2xl font-black mb-4 tracking-tight font-['Manrope']">{stat.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed font-medium">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 bg-[#003a59]/5 px-4 py-2 rounded-full mb-8">
              <span className="w-2 h-2 bg-[#7efba4] rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-[#003a59] uppercase tracking-widest">Vì sao nhiều người tìm kiếm đi Nga làm việc?</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-[#003a59] mb-8 font-['Manrope'] leading-[0.9] tracking-tighter">
              Đi Nga Làm Việc <br />
              <span className="text-[#00401e]">Cần Hiểu Gì Trước?</span>
            </h2>
            <p className="text-[#434653]/70 mb-12 leading-relaxed text-xl max-w-xl font-medium">
              Người lao động thường quan tâm 4 việc trước tiên: mình có hợp đi Nga không, hồ sơ cần những gì, chi phí có những khoản nào và sang bên đó phải làm gì trong những ngày đầu.
            </p>
            <div className="grid gap-10">
              {[
                {
                  icon: <CreditCard className="w-8 h-8 text-[#003a59]" />,
                  title: 'Chi phí bao nhiêu là thật?',
                  desc: 'Không nên nghe một con số chung. Cần hỏi rõ từng khoản, từng giai đoạn và khi nào phải đóng.',
                },
                {
                  icon: <ShieldCheck className="w-8 h-8 text-[#003a59]" />,
                  title: 'Đi có an toàn không?',
                  desc: 'Phải nhìn vào doanh nghiệp có giấy phép, quy trình rõ ràng, giấy tờ minh bạch và cách hướng dẫn trước khi bay.',
                },
                {
                  icon: <Users className="w-8 h-8 text-[#003a59]" />,
                  title: 'Gia đình cần biết gì?',
                  desc: 'Không chỉ người đi đọc. Bố mẹ, vợ chồng cũng cần hiểu hồ sơ, chi phí, lịch trình và rủi ro thực tế.',
                },
              ].map((item, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="flex gap-8 items-start group">
                  <div className="bg-[#f8fafb] p-6 rounded-3xl shadow-sm group-hover:bg-[#003a59] group-hover:shadow-xl group-hover:shadow-[#003a59]/20 transition-all duration-500">
                    <div className="group-hover:text-white group-hover:scale-110 transition-all duration-500">{item.icon}</div>
                  </div>
                  <div>
                    <h3 className="font-black text-[#003a59] text-2xl mb-2 tracking-tight font-['Manrope']">{item.title}</h3>
                    <p className="text-[#434653]/60 text-sm leading-relaxed max-w-md font-medium">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.8, rotate: 5 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ duration: 1, type: 'spring' }} className="relative">
            <div className="rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,58,89,0.3)] aspect-[4/5] relative z-10 border-[12px] border-white">
              <img src="/images/russia-city.png" alt="Hình ảnh thị trường và đời sống tại Nga" className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#003a59] via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-12 left-12 right-12 text-white">
                <p className="text-6xl font-black mb-4 tracking-tighter">Nga</p>
                <p className="text-xs font-black uppercase tracking-[0.3em] opacity-80">Việc gì, hồ sơ gì, chuẩn bị gì</p>
              </div>
            </div>
            <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#7efba4] rounded-full mix-blend-multiply filter blur-[80px] opacity-20 animate-pulse" />
            <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#003a59] rounded-full mix-blend-multiply filter blur-[100px] opacity-10 animate-pulse delay-700" />
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white border-y border-[#003a59]/5">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#f8fafb] rounded-[3rem] p-10 md:p-14 border border-[#003a59]/5 shadow-xl shadow-[#003a59]/5">
            <div className="flex items-center gap-3 mb-8">
              <Info className="w-5 h-5 text-[#003a59]" />
              <h2 className="text-3xl font-black text-[#003a59] font-['Manrope'] tracking-tight">4 câu người đi Nga hay hỏi nhất</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm font-bold text-[#003a59]">
              {[
                'Tôi có hợp đi Nga không?',
                'Hồ sơ đi Nga gồm những giấy tờ nào?',
                'Chi phí đi Nga hỏi thế nào cho đúng?',
                'Sang Nga rồi những ngày đầu làm gì?',
                'Nữ đi Nga được không?',
                'Có nên vay tiền để đi không?',
              ].map((item) => (
                <div key={item} className="bg-white rounded-2xl px-5 py-4 border border-[#003a59]/5">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="dieukien" className="py-32 px-6 bg-[#f8fafb]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-[#003a59]/5 px-4 py-2 rounded-full mb-6">
              <ClipboardCheck className="w-4 h-4 text-[#003a59]" />
              <span className="text-[10px] font-black text-[#003a59] uppercase tracking-widest">Điều kiện đi lao động Nga</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-[#003a59] font-['Manrope'] tracking-tight">Điều Kiện Đi Lao Động Nga Và <span className="text-[#00401e]">Hồ Sơ Cần Chuẩn Bị</span></h2>
            <p className="text-[#434653]/60 text-xl font-medium max-w-3xl mx-auto mt-6">Nếu bạn đang tìm hiểu đi Nga, đây là phần cần đọc kỹ nhất: điều kiện cơ bản ra sao, hồ sơ chia mấy đợt và gia đình cần chuẩn bị những giấy tờ gì trước khi nộp.</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-10">
            <Card className="rounded-[3rem] border-none shadow-2xl shadow-[#003a59]/5 p-10 md:p-14">
              <h3 className="text-3xl font-black text-[#003a59] mb-8 font-['Manrope'] tracking-tight">Điều kiện đi Nga cơ bản</h3>
              <div className="space-y-5 text-[#434653] leading-relaxed font-medium">
                <p>Độ tuổi, giới tính và yêu cầu tay nghề sẽ thay đổi theo từng đơn hàng tiếp nhận, nên không phải ai cũng giống ai.</p>
                <p>Người lao động cần đảm bảo sức khỏe, giấy tờ cá nhân rõ ràng và sẵn sàng tham gia phỏng vấn theo hướng dẫn.</p>
                <p>Nếu chưa biết tiếng Nga, nhiều hồ sơ vẫn có thể bắt đầu từ đào tạo định hướng và tiếng Nga cơ bản trước khi xuất cảnh.</p>
              </div>
            </Card>
            <Card className="rounded-[3rem] border-none shadow-2xl shadow-[#003a59]/5 p-10 md:p-14">
              <h3 className="text-3xl font-black text-[#003a59] mb-8 font-['Manrope'] tracking-tight">Hồ sơ đi Nga chia 2 đợt</h3>
              <div className="space-y-5 text-[#434653] leading-relaxed font-medium">
                <p>Đợt 1 thường là hộ chiếu, CCCD, khám sức khỏe, ảnh và các giấy tờ nền tảng cần nộp sớm sau khi trúng tuyển.</p>
                <p>Đợt 2 thường bổ sung lý lịch tư pháp số 2, sơ yếu lý lịch xác nhận, bằng cấp công chứng và các giấy tờ liên quan.</p>
                <p>Tách hồ sơ làm 2 đợt giúp người lao động đỡ áp lực và gia đình dễ theo dõi tiến độ hơn.</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section id="chiphi" className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-[#003a59]/5 px-4 py-2 rounded-full mb-6">
              <CreditCard className="w-4 h-4 text-[#003a59]" />
              <span className="text-[10px] font-black text-[#003a59] uppercase tracking-widest">Chi phí và thu nhập</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-[#003a59] font-['Manrope'] tracking-tight">Chi Phí Đi Lao Động Nga Và <span className="text-[#00401e]">Thu Nhập Thực Tế</span></h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              { title: 'Đừng hỏi một con số cho tất cả', desc: 'Mỗi đơn hàng và từng giai đoạn hồ sơ có thể có mức chi phí khác nhau. Hỏi rõ từng khoản thì mới đỡ bị mù mờ.' },
              { title: 'Đừng chỉ nhìn mức lương', desc: 'Cần hỏi thêm giờ làm, tăng ca, chỗ ở, sinh hoạt và số tiền thật sự có thể gửi về hoặc để dành.' },
              { title: 'Đi vay để đi thì phải tính trước', desc: 'Gia đình nên tính thời gian hoàn vốn, số nợ phải chịu và tình huống công việc không đúng như mình tưởng.' },
            ].map((item) => (
              <Card key={item.title} className="rounded-[3rem] border-none shadow-2xl shadow-[#003a59]/5 p-10">
                <h3 className="text-2xl font-black text-[#003a59] mb-5 font-['Manrope'] tracking-tight">{item.title}</h3>
                <p className="text-[#434653]/70 text-base leading-relaxed font-medium">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-[#f2f4f5]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-[#003a59]/5 px-4 py-2 rounded-full mb-6">
              <ShieldCheck className="w-4 h-4 text-[#003a59]" />
              <span className="text-[10px] font-black text-[#003a59] uppercase tracking-widest">Cách chọn công ty uy tín</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-[#003a59] font-['Manrope'] tracking-tight">Cách Chọn Công Ty XKLĐ Nga <span className="text-[#00401e]">Uy Tín</span></h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <Card className="rounded-[3rem] border-none shadow-2xl shadow-[#003a59]/5 p-10 md:p-14">
              <h3 className="text-3xl font-black text-[#003a59] mb-8 font-['Manrope'] tracking-tight">4 điều nên kiểm tra trước khi nộp hồ sơ</h3>
              <div className="space-y-5 text-[#434653] leading-relaxed font-medium">
                <p>Có giấy phép hoạt động và địa chỉ, thông tin pháp lý rõ ràng.</p>
                <p>Hợp đồng, quy trình, chi phí và trách nhiệm hai bên được nói rõ ngay từ đầu.</p>
                <p>Không thúc ép đóng tiền khi bạn chưa hiểu đơn hàng hoặc chưa nắm lộ trình hồ sơ.</p>
                <p>Có website chính thức, thông tin liên hệ rõ và nội dung tư vấn nhất quán.</p>
              </div>
            </Card>
            <Card className="rounded-[3rem] border-none shadow-2xl shadow-[#003a59]/5 p-10 md:p-14 bg-[#003a59] text-white">
              <h3 className="text-3xl font-black mb-8 font-['Manrope'] tracking-tight">Dấu hiệu để người lao động dễ tin hơn</h3>
              <div className="space-y-5 text-white/70 leading-relaxed font-medium">
                <p>Giấy phép hoạt động được nhắc rõ ngay trên trang.</p>
                <p>Nội dung nói theo góc nhìn người lao động và gia đình, không nói kiểu quảng cáo một chiều.</p>
                <p>Có đường dẫn rõ sang trang chính thức, quy trình, bài viết chi tiết và phần hỏi đáp.</p>
                <p>Thông tin cụ thể, dễ kiểm tra và không hứa quá mức.</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-[#003a59]/5 px-4 py-2 rounded-full mb-6">
              <Clock className="w-4 h-4 text-[#003a59]" />
              <span className="text-[10px] font-black text-[#003a59] uppercase tracking-widest">So sánh để dễ quyết định</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-[#003a59] font-['Manrope'] tracking-tight">Đi Nga Hay Đi Nhật: <span className="text-[#00401e]">Nên So Gì Trước?</span></h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="rounded-[3rem] border-none shadow-2xl shadow-[#003a59]/5 p-10">
              <h3 className="text-3xl font-black text-[#003a59] mb-6 font-['Manrope'] tracking-tight">Nhật Bản</h3>
              <p className="text-[#434653]/70 leading-relaxed font-medium">Phù hợp với người muốn đi theo thị trường quen thuộc hơn, lộ trình đào tạo rõ và hệ sinh thái tư vấn ổn định hơn.</p>
            </Card>
            <Card className="rounded-[3rem] border-none shadow-2xl shadow-[#003a59]/5 p-10">
              <h3 className="text-3xl font-black text-[#003a59] mb-6 font-['Manrope'] tracking-tight">Nga</h3>
              <p className="text-[#434653]/70 leading-relaxed font-medium">Phù hợp với người đang cân nhắc một hướng đi thực dụng hơn, muốn hiểu rõ hồ sơ, nhóm việc, chi phí và khả năng thích nghi sau nhập cảnh.</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-[#f8fafb] border-y border-[#003a59]/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-[#003a59]/5 px-4 py-2 rounded-full mb-6">
              <ShieldCheck className="w-4 h-4 text-[#003a59]" />
              <span className="text-[10px] font-black text-[#003a59] uppercase tracking-widest">Những nỗi lo hay gặp</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-[#003a59] font-['Manrope'] tracking-tight">
              Đi Nga Có <span className="text-[#00401e]">An Toàn Không</span> Và Ai Phù Hợp?
            </h2>
            <p className="text-[#434653]/60 text-xl font-medium max-w-3xl mx-auto mt-6">
              Khi tìm hiểu đi Nga, người lao động không chỉ hỏi lương. Họ thường hỏi rất thật: có an toàn không, nữ đi được không và trước ngày bay phải chuẩn bị những gì.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Đi Nga có an toàn không?',
                desc: 'An toàn không chỉ là chuyện ở bên đó. Phải đi đúng doanh nghiệp có giấy phép, hiểu rõ hồ sơ, giữ giấy tờ cẩn thận và làm đúng hướng dẫn ở sân bay, trung chuyển.',
              },
              {
                title: 'Lao động nữ đi Nga được không?',
                desc: 'Có thể phù hợp với một số nhóm việc như may mặc, hoàn thiện sản phẩm, đóng gói hoặc việc cần sự cẩn thận. Quan trọng là phải hỏi kỹ môi trường làm việc, chỗ ở và ca làm.',
              },
              {
                title: 'Đi Nga cần chuẩn bị gì trước ngày bay?',
                desc: 'Ngoài hồ sơ, người lao động nên chuẩn bị hành lý đúng định mức, đồ giữ ấm, vật dụng cá nhân cần thiết và nắm trước những lưu ý ở sân bay Việt Nam cũng như khi nhập cảnh.',
              },
            ].map((item) => (
              <Card key={item.title} className="rounded-[3rem] border-none shadow-2xl shadow-[#003a59]/5 p-10 md:p-12">
                <h3 className="text-2xl font-black text-[#003a59] mb-5 font-['Manrope'] tracking-tight">{item.title}</h3>
                <p className="text-[#434653]/70 text-base leading-relaxed font-medium">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="rounded-[3rem] overflow-hidden shadow-2xl shadow-[#003a59]/10 border border-[#003a59]/5">
            <img src="/images/worker-female.jpg" alt="Lao động nữ và nhóm việc nhà máy, đóng gói tại Nga" className="w-full h-full object-cover min-h-[520px]" />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 bg-[#003a59]/5 px-4 py-2 rounded-full mb-6">
              <Briefcase className="w-4 h-4 text-[#003a59]" />
              <span className="text-[10px] font-black text-[#003a59] uppercase tracking-widest">Nhóm việc nhiều người hỏi</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-[#003a59] font-['Manrope'] tracking-tight leading-[0.95]">
              Đi Nga Làm <span className="text-[#00401e]">Nhà Máy</span>: Phù Hợp Với Ai?
            </h2>
            <div className="space-y-6 mt-8 text-[#434653]/75 text-lg leading-relaxed font-medium">
              <p>
                Đây là một trong những nhóm việc dễ hình dung nhất với người đang tìm hiểu lao động Nga. Công việc thường gắn với đóng gói, sản xuất phổ thông, hoàn thiện sản phẩm hoặc làm theo dây chuyền.
              </p>
              <p>
                Nhóm quan tâm nhiều nhất là công nhân trẻ, lao động phổ thông cần tăng thu nhập, người từng làm nhà máy trong nước hoặc lao động nữ muốn một công việc dễ hình dung hơn.
              </p>
              <p>
                Trước khi đăng ký, bạn nên hỏi rõ ca kíp, môi trường xưởng, chỗ ở, phần việc chính và yêu cầu sức khỏe. Hỏi càng cụ thể thì càng đỡ bị mơ hồ.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-[#f2f4f5] px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#003a59]/5 px-4 py-2 rounded-full mb-6">
                <Briefcase className="w-4 h-4 text-[#003a59]" />
                <span className="text-[10px] font-black text-[#003a59] uppercase tracking-widest">Một số nhóm việc dễ hiểu</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-[#003a59] font-['Manrope'] tracking-tight">Đi Nga Làm <span className="text-[#00401e]">Những Việc Gì?</span></h2>
            </div>
            <Link to="/jobs">
              <Button variant="outline" className="rounded-full px-10 h-14 font-black uppercase tracking-widest border-[#003a59]/10 text-[#003a59] hover:bg-[#003a59] hover:text-white transition-all duration-500">
                Xem tất cả <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            {JOBS.slice(0, 2).map((job, idx) => (
              <motion.div key={job.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.2 }}>
                <Card className="group overflow-hidden rounded-[3rem] border-none shadow-2xl shadow-black/5 hover:shadow-black/10 transition-all duration-500">
                  <Link to={`/jobs/${job.id}`} className="block">
                    <div className="h-80 overflow-hidden relative">
                      <img src={job.imageUrl} alt={job.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" referrerPolicy="no-referrer" />
                      <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md px-6 py-2 rounded-full shadow-xl">
                        <span className="text-[10px] font-black text-[#003a59] uppercase tracking-widest">{job.category}</span>
                      </div>
                    </div>
                    <CardHeader className="p-10 pb-4">
                      <h3 className="text-3xl font-black text-[#003a59] mb-4 group-hover:text-[#00401e] transition-colors duration-300 font-['Manrope'] tracking-tight">{job.title}</h3>
                      <p className="text-[#434653]/70 text-base leading-relaxed line-clamp-2 font-medium">{job.description}</p>
                    </CardHeader>
                    <div className="px-10 pb-10 flex justify-between items-center pt-6">
                      <div>
                        <p className="text-[10px] uppercase font-black text-[#737784] tracking-widest mb-1">Mức thu nhập</p>
                        <span className="text-2xl font-black text-[#00401e] tracking-tight">{job.salary}</span>
                      </div>
                      <div className="w-14 h-14 bg-[#f8fafb] rounded-2xl flex items-center justify-center group-hover:bg-[#003a59] group-hover:text-white transition-all duration-500 shadow-sm">
                        <ChevronRight className="w-6 h-6" />
                      </div>
                    </div>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-2 bg-[#003a59]/5 px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-[#7efba4] rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-[#003a59] uppercase tracking-widest">Quy trình đi Nga</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-[#003a59] mb-8 font-['Manrope'] tracking-tighter leading-[0.9]">Quy Trình Đi Nga <span className="text-[#00401e]">Theo 8 Bước</span></h2>
            <p className="text-[#434653]/60 max-w-2xl mx-auto text-xl font-medium">
              Từ lúc đăng ký đến lúc sang Nga làm thủ tục đầu vào, người lao động nên hiểu khung quy trình trước để đỡ bị mù mờ.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 relative">
            {[
              { step: '01', title: 'Đăng ký', desc: 'Gửi nhu cầu, xét điều kiện hồ sơ ban đầu và chọn hướng phù hợp.', icon: <FileText className="w-8 h-8" /> },
              { step: '02', title: 'Phỏng vấn', desc: 'Tham gia phỏng vấn, đánh giá và nhận thông báo trúng tuyển.', icon: <Users className="w-8 h-8" /> },
              { step: '03', title: 'Hồ sơ và đào tạo', desc: 'Hoàn thiện hồ sơ đợt 1, học định hướng và tiếng Nga cơ bản trước khi đi.', icon: <GraduationCap className="w-8 h-8" /> },
              { step: '04', title: 'Xuất cảnh', desc: 'Bổ sung hồ sơ đợt 2, họp trước bay, trung chuyển và làm thủ tục đầu vào.', icon: <PlaneTakeoff className="w-8 h-8" /> },
            ].map((item, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.15 }} className="relative z-10 bg-white p-12 rounded-[3rem] border border-[#003a59]/5 shadow-2xl shadow-black/5 hover:shadow-black/10 transition-all duration-500 group">
                <div className="w-20 h-20 bg-[#f8fafb] rounded-[1.5rem] flex items-center justify-center mb-8 text-[#003a59] group-hover:bg-[#003a59] group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-sm">{item.icon}</div>
                <div className="text-6xl font-black text-[#003a59]/5 mb-6 group-hover:text-[#003a59]/10 transition-colors duration-500 tracking-tighter">{item.step}</div>
                <h3 className="text-2xl font-black text-[#003a59] mb-4 font-['Manrope'] tracking-tight">{item.title}</h3>
                <p className="text-[#434653]/60 text-sm leading-relaxed font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-20 text-center">
            <Link to="/process">
              <Button variant="outline" className="rounded-full px-12 h-16 font-black uppercase tracking-widest border-[#003a59]/10 text-[#003a59] hover:bg-[#003a59] hover:text-white transition-all duration-500">
                Xem chi tiết quy trình <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section id="apply-form" className="py-32 px-6 bg-[#003a59] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#7efba4] rounded-full filter blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full filter blur-[120px] animate-pulse delay-1000" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="bg-white rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] grid lg:grid-cols-2">
            <div className="p-12 md:p-20">
              {isSuccess ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 bg-[#7efba4]/10 rounded-full flex items-center justify-center mb-8 shadow-xl shadow-[#7efba4]/5">
                    <CheckCircle className="w-12 h-12 text-[#00401e]" />
                  </div>
                  <h2 className="text-4xl font-black text-[#003a59] mb-6 font-['Manrope'] tracking-tight">Đã ghi nhận yêu cầu</h2>
                  <p className="text-[#434653]/70 mb-10 text-lg leading-relaxed font-medium">Cảm ơn bạn đã để lại thông tin. Bộ phận tư vấn sẽ liên hệ để trao đổi kỹ hơn về hồ sơ, nhóm việc và lộ trình phù hợp.</p>
                  <Button variant="primary" className="rounded-full px-12 h-16 font-black uppercase tracking-widest shadow-xl" onClick={() => setIsSuccess(false)}>Gửi yêu cầu khác</Button>
                </motion.div>
              ) : (
                <>
                  <h2 className="text-5xl font-black text-[#003a59] mb-6 font-['Manrope'] tracking-tight leading-[0.9]">Nhận Tư Vấn <br /><span className="text-[#00401e]">Theo Hồ Sơ Thật</span></h2>
                  <p className="text-[#434653]/60 mb-12 text-xl font-medium">Điền thông tin để được tư vấn hồ sơ, nhóm việc, chi phí theo từng giai đoạn và các lưu ý trước khi đi Nga.</p>
                  <form className="space-y-8" onSubmit={handleLeadSubmit}>
                    {!user && (
                      <div className="bg-[#003a59]/5 p-6 rounded-[1.5rem] border border-[#003a59]/10 mb-8">
                        <p className="text-sm font-black text-[#003a59] mb-4 flex items-center gap-2">
                          <LogIn className="w-4 h-4" /> Đăng nhập để gửi yêu cầu nhanh hơn
                        </p>
                        <Button type="button" variant="outline" className="w-full rounded-xl" onClick={signInWithGoogle}>
                          Đăng nhập bằng Google
                        </Button>
                      </div>
                    )}
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-[#737784] uppercase tracking-[0.2em] ml-2">Họ và tên</label>
                        <input required value={leadForm.name} onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })} className="w-full bg-[#f8fafb] border-2 border-transparent rounded-[1.5rem] px-8 py-5 focus:border-[#003a59] focus:bg-white transition-all outline-none font-medium shadow-sm" placeholder="Nguyễn Văn A" type="text" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-[#737784] uppercase tracking-[0.2em] ml-2">Số điện thoại</label>
                        <input required value={leadForm.phone} onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })} className="w-full bg-[#f8fafb] border-2 border-transparent rounded-[1.5rem] px-8 py-5 focus:border-[#003a59] focus:bg-white transition-all outline-none font-medium shadow-sm" placeholder="09xx xxx xxx" type="tel" />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-[#737784] uppercase tracking-[0.2em] ml-2">Năm sinh</label>
                        <input value={leadForm.year} onChange={(e) => setLeadForm({ ...leadForm, year: e.target.value })} className="w-full bg-[#f8fafb] border-2 border-transparent rounded-[1.5rem] px-8 py-5 focus:border-[#003a59] focus:bg-white transition-all outline-none font-medium shadow-sm" placeholder="19xx" type="number" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-[#737784] uppercase tracking-[0.2em] ml-2">Tỉnh thành</label>
                        <input value={leadForm.city} onChange={(e) => setLeadForm({ ...leadForm, city: e.target.value })} className="w-full bg-[#f8fafb] border-2 border-transparent rounded-[1.5rem] px-8 py-5 focus:border-[#003a59] focus:bg-white transition-all outline-none font-medium shadow-sm" placeholder="Ví dụ: Nghệ An" type="text" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-[#737784] uppercase tracking-[0.2em] ml-2">Bạn đang quan tâm điều gì nhất?</label>
                      <div className="relative">
                        <select value={leadForm.note} onChange={(e) => setLeadForm({ ...leadForm, note: e.target.value })} className="w-full bg-[#f8fafb] border-2 border-transparent rounded-[1.5rem] px-8 py-5 focus:border-[#003a59] focus:bg-white transition-all outline-none appearance-none font-medium shadow-sm">
                          <option value="">Chọn nội dung cần tư vấn</option>
                          <option value="Quy trình">Quy trình đi Nga</option>
                          <option value="Hồ sơ">Hồ sơ đợt 1 và đợt 2</option>
                          <option value="Nhóm việc">Nhóm việc phù hợp</option>
                          <option value="Lao động nữ">Nữ đi Nga được không</option>
                          <option value="Tư vấn chung">Tư vấn chung</option>
                        </select>
                        <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#737784] rotate-90 pointer-events-none" />
                      </div>
                    </div>
                    <Button type="submit" variant="tertiary" className="w-full h-20 rounded-[1.5rem] text-xl font-black uppercase tracking-widest shadow-2xl shadow-[#7efba4]/20 hover:-translate-y-1 transition-all duration-300" disabled={isSubmitting}>
                      {isSubmitting ? <span className="flex items-center gap-3"><Loader2 className="w-6 h-6 animate-spin" /> Đang gửi yêu cầu...</span> : 'Gửi yêu cầu tư vấn'}
                    </Button>
                    <p className="text-[10px] text-[#737784]/60 text-center uppercase tracking-[0.2em] font-black">Bằng việc gửi thông tin, bạn đồng ý để JAVICO liên hệ tư vấn.</p>
                  </form>
                </>
              )}
            </div>
            <div className="hidden lg:block relative bg-[#00401e]">
              <img src="/images/worker-training.jpg" alt="Tư vấn hồ sơ và đào tạo trước khi đi Nga" className="w-full h-full object-cover opacity-40 grayscale" />
              <div className="absolute inset-0 flex flex-col justify-end p-20 text-white">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white/10 backdrop-blur-xl p-10 rounded-[3rem] border border-white/10 shadow-2xl">
                  <p className="text-3xl font-black mb-8 leading-tight font-['Manrope'] tracking-tight">“Đi xa không đáng sợ bằng đi mà không hiểu mình phải chuẩn bị những gì.”</p>
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#7efba4] to-[#00401e] rounded-2xl shadow-lg shadow-[#7efba4]/20" />
                    <div>
                      <p className="text-xl font-black tracking-tight">JAVICO</p>
                      <p className="text-xs font-black uppercase tracking-[0.2em] opacity-60">Thị trường Nga 2026</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-[#f8fafb]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-2 bg-[#003a59]/5 px-4 py-2 rounded-full mb-6">
              <Info className="w-4 h-4 text-[#003a59]" />
              <span className="text-[10px] font-black text-[#003a59] uppercase tracking-widest">Câu hỏi thường gặp</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-[#003a59] mb-8 font-['Manrope'] tracking-tight">Câu Hỏi <span className="text-[#00401e]">Người Đi Nga Hay Hỏi</span></h2>
            <p className="text-[#434653]/60 text-xl font-medium">Đây là những câu hỏi thực tế mà người lao động và gia đình thường hỏi trước khi quyết định đi Nga làm việc.</p>
          </div>
          <div className="space-y-6">
            {FAQS.map((faq, idx) => (
              <motion.details key={idx} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }} className="group bg-white rounded-[2rem] shadow-xl shadow-black/5 border border-[#003a59]/5 overflow-hidden transition-all duration-500">
                <summary className="flex items-center justify-between p-10 cursor-pointer list-none font-black text-xl text-[#003a59] hover:bg-[#f8fafb] transition-all duration-500 font-['Manrope'] tracking-tight">
                  <span className="pr-8">{faq.question}</span>
                  <div className="w-10 h-10 rounded-full bg-[#f8fafb] flex items-center justify-center group-open:rotate-90 transition-transform duration-500">
                    <ChevronRight className="w-5 h-5 text-[#737784]" />
                  </div>
                </summary>
                <div className="px-10 pb-10 text-[#434653]/70 leading-relaxed text-base font-medium border-t border-[#f8fafb] pt-8">{faq.answer}</div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      <div className="fixed bottom-10 right-10 z-50">
        <button onClick={() => setChatOpen(!chatOpen)} className="w-20 h-20 bg-[#003a59] text-white rounded-[2rem] shadow-[0_20px_50px_-10px_rgba(0,58,89,0.5)] flex items-center justify-center hover:scale-110 transition-all duration-500 active:scale-95 group relative">
          {chatOpen ? <X className="w-10 h-10" /> : <MessageSquare className="w-10 h-10" />}
          {!chatOpen && <span className="absolute -top-3 -right-3 bg-[#7efba4] text-[#003a59] text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg shadow-[#7efba4]/20 animate-bounce">AI</span>}
        </button>
      </div>

      {chatOpen && (
        <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="fixed bottom-36 right-10 z-50 w-[450px] max-w-[calc(100vw-5rem)] bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border border-[#003a59]/5 overflow-hidden flex flex-col h-[700px]">
          <div className="bg-[#003a59] p-10 text-white flex items-center justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#7efba4] rounded-full filter blur-[80px] opacity-20" />
            <div className="flex items-center gap-6 relative z-10">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-xl">
                <BadgeCheck className="w-8 h-8 text-[#7efba4]" />
              </div>
              <div>
                <p className="font-black text-2xl tracking-tight font-['Manrope']">JAVICO AI</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#7efba4] rounded-full animate-pulse" />
                  <p className="text-[10px] uppercase font-black tracking-[0.2em] opacity-60">Hỏi nhanh về đi Nga</p>
                </div>
              </div>
            </div>
            <button onClick={() => setChatOpen(false)} className="p-3 hover:bg-white/10 rounded-full transition-all duration-500 relative z-10">
              <X className="w-8 h-8" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-10 space-y-8 bg-[#f8fafb]">
            {chatMessages.length === 0 && (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-[#003a59]/5 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
                  <MessageSquare className="w-12 h-12 text-[#003a59]/20" />
                </div>
                <p className="text-[#003a59] text-2xl font-black mb-4 font-['Manrope'] tracking-tight">Xin chào</p>
                <p className="text-base text-[#434653]/60 px-10 font-medium leading-relaxed">Tôi có thể giúp bạn hiểu nhanh về hồ sơ, quy trình, chuẩn bị trước khi đi Nga và các câu hỏi gia đình thường quan tâm.</p>
              </div>
            )}
            {chatMessages.map((m, i) => (
              <div key={i} className={cn('flex flex-col', m.role === 'user' ? 'items-end' : 'items-start')}>
                <div className={cn('max-w-[85%] p-6 rounded-[2rem] text-sm leading-relaxed shadow-xl shadow-black/5 font-medium', m.role === 'user' ? 'bg-[#003a59] text-white rounded-tr-none' : 'bg-white border border-[#003a59]/5 text-[#191c1d] rounded-tl-none')}>
                  {m.text}
                </div>
                <span className="text-[9px] uppercase font-black text-[#737784] mt-3 px-2 tracking-widest opacity-60">{m.role === 'user' ? 'Bạn' : 'JAVICO AI'}</span>
              </div>
            ))}
            {isChatLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-[#003a59]/5 p-6 rounded-[2rem] rounded-tl-none shadow-xl shadow-black/5">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 bg-[#003a59]/20 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-[#003a59]/20 rounded-full animate-bounce delay-150" />
                    <div className="w-2 h-2 bg-[#003a59]/20 rounded-full animate-bounce delay-300" />
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="px-6 py-4 bg-white border-t border-[#003a59]/5 flex gap-3 overflow-x-auto no-scrollbar">
            {quickReplies.map((reply) => (
              <button key={reply} onClick={() => setChatInput(reply)} className="whitespace-nowrap px-4 py-2 bg-[#f8f9fa] text-[#003a59] text-[11px] font-black rounded-full border border-[#003a59]/5 hover:bg-[#003a59] hover:text-white transition-all active:scale-95">
                {reply}
              </button>
            ))}
          </div>

          <form onSubmit={handleChatSubmit} className="p-6 bg-white border-t border-[#003a59]/5 flex gap-3">
            <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Hỏi JAVICO AI..." className="flex-1 bg-[#f8f9fa] border-2 border-transparent rounded-2xl px-6 py-4 text-sm focus:border-[#003a59] focus:bg-white transition-all outline-none" />
            <button type="submit" className="w-14 h-14 bg-[#003a59] text-white rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#003a59]/20">
              <Send className="w-6 h-6" />
            </button>
          </form>
        </motion.div>
      )}
    </div>
  );
}
