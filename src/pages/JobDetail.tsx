import * as React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, MapPin, Clock, DollarSign, CheckCircle, ShieldCheck, Phone, Loader2, LogIn } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { JOBS } from '../constants';
import { useFirebase } from '../lib/FirebaseProvider';
import { db, handleFirestoreError, OperationType, signInWithGoogle } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function JobDetail() {
  const { id } = useParams();
  const { user } = useFirebase();
  const job = JOBS.find((j) => j.id === id);

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [formData, setFormData] = React.useState({
    fullName: '',
    phone: '',
    city: '',
  });

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      signInWithGoogle();
      return;
    }
    if (!formData.fullName || !formData.phone) {
      alert('Vui lòng điền đầy đủ thông tin');
      return;
    }
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'applications'), {
        jobId: id,
        userId: user.uid,
        status: 'pending',
        fullName: formData.fullName,
        phone: formData.phone,
        email: user.email,
        city: formData.city,
        createdAt: serverTimestamp(),
      });
      setIsSuccess(true);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'applications');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!job) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-[#003a59]">Không tìm thấy nhóm việc</h2>
        <Link to="/jobs" className="text-[#003a59] underline mt-4 inline-block">
          Quay lại danh sách
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#f8fafb] min-h-screen pb-32">
      <section className="bg-[#003a59] pt-32 pb-48 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        </div>
        <div className="max-w-5xl mx-auto relative z-10">
          <Link to="/jobs" className="inline-flex items-center gap-2 text-[#7efba4] hover:text-white transition-colors mb-10 text-xs font-black uppercase tracking-[0.2em] group">
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Quay lại danh sách
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#7efba4] text-[#003a59] rounded-full text-[10px] font-black uppercase tracking-widest mb-6 shadow-lg shadow-[#7efba4]/20">
                {job.category}
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white mb-8 font-['Manrope'] leading-[1.1] tracking-tight">{job.title}</h1>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3 text-white/80">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-[#7efba4]" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-black tracking-widest opacity-50">Thu nhập</p>
                    <p className="text-lg font-black text-white">{job.salary}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#7efba4]" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-black tracking-widest opacity-50">Khu vực</p>
                    <p className="text-lg font-black text-white">{job.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-[#7efba4]" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-black tracking-widest opacity-50">Thời hạn</p>
                    <p className="text-lg font-black text-white">{job.duration}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="shrink-0">
              <Button size="lg" variant="tertiary" className="rounded-full px-12 h-16 text-sm font-black uppercase tracking-widest shadow-2xl shadow-[#7efba4]/20" onClick={() => { const el = document.getElementById('apply-form'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}>
                Đăng ký tư vấn
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 -mt-24 relative z-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-12">
            <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-[#003a59]/5 border border-[#003a59]/5">
              <div className="mb-16">
                <h2 className="text-2xl font-black text-[#003a59] mb-8 font-['Manrope'] flex items-center gap-4">
                  <div className="w-2 h-8 bg-[#7efba4] rounded-full" />
                  Nhóm công việc này dành cho ai?
                </h2>
                <p className="text-[#434653] leading-relaxed text-lg">{job.description}</p>
              </div>

              <div className="mb-16">
                <h2 className="text-2xl font-black text-[#003a59] mb-8 font-['Manrope'] flex items-center gap-4">
                  <div className="w-2 h-8 bg-[#7efba4] rounded-full" />
                  Điều kiện thường gặp
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {job.requirements.map((req, i) => (
                    <div key={i} className="flex items-start gap-4 p-6 bg-[#f8f9fa] rounded-3xl border border-[#003a59]/5">
                      <CheckCircle className="w-6 h-6 text-[#00401e] shrink-0" />
                      <span className="text-sm font-bold text-[#434653] leading-relaxed">{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-black text-[#003a59] mb-8 font-['Manrope'] flex items-center gap-4">
                  <div className="w-2 h-8 bg-[#7efba4] rounded-full" />
                  Nội dung tư vấn cần hỏi kỹ
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {job.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-4 p-6 bg-[#7efba4]/5 rounded-3xl border border-[#7efba4]/20">
                      <ShieldCheck className="w-6 h-6 text-[#00401e] shrink-0" />
                      <span className="text-sm font-bold text-[#434653] leading-relaxed">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div id="apply-form" className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-[#003a59]/5 border border-[#003a59]/5">
              {isSuccess ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-[#7efba4]/10 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle className="w-10 h-10 text-[#00401e]" />
                  </div>
                  <h3 className="text-3xl font-black text-[#003a59] mb-4 font-['Manrope']">Gửi yêu cầu thành công</h3>
                  <p className="text-[#434653]/60 text-lg mb-10">Cảm ơn bạn đã để lại thông tin. Bộ phận tư vấn sẽ liên hệ để trao đổi kỹ hơn về hồ sơ và nhóm việc phù hợp.</p>
                  <Button variant="primary" className="rounded-full px-12 h-16" onClick={() => setIsSuccess(false)}>Gửi yêu cầu khác</Button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-black text-[#003a59] mb-10 font-['Manrope'] flex items-center gap-4">
                    <div className="w-2 h-8 bg-[#7efba4] rounded-full" />
                    Đăng ký nhận tư vấn
                  </h2>
                  <form onSubmit={handleApply} className="space-y-8">
                    {!user && (
                      <div className="bg-[#003a59]/5 p-8 rounded-[2rem] border border-[#003a59]/10 mb-8">
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
                        <input required value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className="w-full bg-[#f8fafb] border-2 border-transparent rounded-[1.5rem] px-8 py-5 focus:border-[#003a59] focus:bg-white transition-all outline-none font-medium shadow-sm" placeholder="Nguyễn Văn A" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-[#737784] uppercase tracking-[0.2em] ml-2">Số điện thoại</label>
                        <input required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-[#f8fafb] border-2 border-transparent rounded-[1.5rem] px-8 py-5 focus:border-[#003a59] focus:bg-white transition-all outline-none font-medium shadow-sm" placeholder="09xx xxx xxx" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-[#737784] uppercase tracking-[0.2em] ml-2">Tỉnh/Thành phố hiện tại</label>
                      <input value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full bg-[#f8fafb] border-2 border-transparent rounded-[1.5rem] px-8 py-5 focus:border-[#003a59] focus:bg-white transition-all outline-none font-medium shadow-sm" placeholder="Ví dụ: Nghệ An" />
                    </div>
                    <Button type="submit" variant="tertiary" className="w-full h-20 rounded-[1.5rem] text-xl font-black uppercase tracking-widest shadow-2xl shadow-[#7efba4]/20" disabled={isSubmitting}>
                      {isSubmitting ? <span className="flex items-center gap-3"><Loader2 className="w-6 h-6 animate-spin" /> Đang xử lý...</span> : 'Gửi yêu cầu tư vấn'}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="bg-[#003a59] rounded-[3rem] p-10 text-white shadow-2xl shadow-[#003a59]/30 sticky top-32">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8">
                <ShieldCheck className="w-8 h-8 text-[#7efba4]" />
              </div>
              <h3 className="text-2xl font-black mb-4 font-['Manrope']">Khi tìm hiểu nhóm việc này</h3>
              <p className="text-white/60 text-sm mb-10 leading-relaxed">
                Bạn nên hỏi kỹ về hồ sơ, timeline, nơi tiếp nhận, thu nhập ròng, chỗ ở và các thủ tục sau nhập cảnh thay vì chỉ nhìn tiêu đề đơn hàng.
              </p>
              <div className="space-y-4">
                <Button variant="tertiary" className="w-full h-16 rounded-2xl font-black uppercase tracking-widest text-xs" onClick={() => { const el = document.getElementById('apply-form'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}>
                  Đăng ký tư vấn
                </Button>
                <a href="https://javico.vn/lao-dong-nga/" target="_blank" rel="noreferrer" className="block">
                  <Button variant="outline" className="w-full h-16 rounded-2xl border-white/10 text-white hover:bg-white/10 font-black uppercase tracking-widest text-xs">
                    <Phone className="w-4 h-4 mr-3" />
                    Xem trang chính thức
                  </Button>
                </a>
              </div>

              <div className="mt-12 pt-12 border-t border-white/10">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#7efba4] mb-6">Checklist hỏi tư vấn</h4>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4 text-[#7efba4]" />
                    </div>
                    <span className="text-xs font-bold text-white/80">Hồ sơ gồm những gì ở đợt 1 và đợt 2?</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4 text-[#7efba4]" />
                    </div>
                    <span className="text-xs font-bold text-white/80">Thu nhập và chi phí được tính theo đơn hàng nào?</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
