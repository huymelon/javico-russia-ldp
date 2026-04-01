import * as React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search, Filter, ChevronRight, MapPin, Clock, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { JOBS } from '../constants';

export default function Jobs() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('Tất cả');

  const filteredJobs = JOBS.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tất cả' || job.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['Tất cả', ...new Set(JOBS.map((job) => job.category))];

  return (
    <div className="bg-[#f8fafb] min-h-screen">
      <section className="bg-[#003a59] pt-40 pb-48 px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src="https://picsum.photos/seed/russia-factory/1920/1080" alt="Background" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#003a59] via-[#003a59]/80 to-[#003a59]" />
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-2 px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-10 shadow-2xl shadow-black/20">
            <Briefcase className="w-4 h-4 text-[#7efba4]" />
            <span className="text-[10px] font-black text-[#7efba4] uppercase tracking-[0.3em]">Nhóm việc tham khảo</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-8xl font-black text-white mb-8 font-['Manrope'] tracking-tighter leading-[0.9]">
            Nhóm Việc <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7efba4] to-[#00401e]">Tại Nga</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-white/60 max-w-3xl mx-auto text-xl leading-relaxed font-medium">
            Đây là các nhóm việc đại diện để người lao động hình dung thị trường Nga. Điều kiện, nơi làm việc và thu nhập cụ thể cần được tư vấn theo từng đơn hàng đang tuyển.
          </motion.p>
        </div>
      </section>

      <section className="px-6 -mt-24 relative z-20">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-[3rem] p-6 md:p-10 shadow-[0_50px_100px_-20px_rgba(0,58,89,0.3)] border border-[#003a59]/5 flex flex-col lg:flex-row gap-8 items-center">
            <div className="flex-1 relative w-full">
              <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-6 h-6 text-[#003a59]/30" />
              <input
                type="text"
                placeholder="Tìm kiếm nhóm việc, ngành nghề..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#f8fafb] border-2 border-transparent rounded-[1.5rem] pl-20 pr-8 py-6 text-base font-black text-[#003a59] focus:border-[#003a59] focus:bg-white transition-all outline-none shadow-sm"
              />
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 lg:pb-0 no-scrollbar w-full lg:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    'px-8 py-6 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap transition-all border-2 h-16 flex items-center justify-center',
                    selectedCategory === cat
                      ? 'bg-[#003a59] text-white border-[#003a59] shadow-xl shadow-[#003a59]/20'
                      : 'bg-[#f8fafb] text-[#737784] border-transparent hover:border-[#003a59]/20'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#003a59]/5 px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-[#7efba4] rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-[#003a59] uppercase tracking-widest">Danh sách tham khảo</span>
            </div>
            <h2 className="text-5xl font-black text-[#003a59] font-['Manrope'] tracking-tight">
              Kết quả: <span className="text-[#00401e]">{filteredJobs.length}</span> nhóm việc
            </h2>
          </div>
          <div className="flex items-center gap-4 text-[#737784] text-xs font-black uppercase tracking-widest bg-white px-8 py-4 rounded-full shadow-sm border border-[#003a59]/5">
            <Filter className="w-4 h-4" />
            <span>Ưu tiên dễ hình dung</span>
          </div>
        </div>

        {filteredJobs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredJobs.map((job, idx) => (
              <motion.div key={job.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}>
                <Card className="group overflow-hidden rounded-[3rem] border-none shadow-2xl shadow-black/5 hover:shadow-black/10 transition-all duration-500 h-full flex flex-col">
                  <Link to={`/jobs/${job.id}`} className="block flex-1">
                    <div className="h-64 overflow-hidden relative">
                      <img src={job.imageUrl} alt={job.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" referrerPolicy="no-referrer" />
                      <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-xl">
                        <span className="text-[9px] font-black text-[#003a59] uppercase tracking-widest">{job.category}</span>
                      </div>
                      {job.isHot && (
                        <div className="absolute bottom-6 right-6 bg-[#00401e] text-white px-4 py-1.5 rounded-full shadow-xl">
                          <span className="text-[9px] font-black uppercase tracking-widest">Ưu tiên</span>
                        </div>
                      )}
                    </div>
                    <CardHeader className="p-8 pb-4">
                      <h3 className="text-2xl font-black text-[#003a59] mb-4 group-hover:text-[#00401e] transition-colors duration-300 font-['Manrope'] tracking-tight leading-tight">{job.title}</h3>
                      <div className="flex flex-wrap gap-4 mb-6">
                        <div className="flex items-center gap-2 text-[#737784] text-xs font-bold">
                          <MapPin className="w-4 h-4 text-[#7efba4]" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#737784] text-xs font-bold">
                          <Clock className="w-4 h-4 text-[#7efba4]" />
                          <span>{job.duration}</span>
                        </div>
                      </div>
                      <p className="text-[#434653]/70 text-sm leading-relaxed line-clamp-3 font-medium">{job.description}</p>
                    </CardHeader>
                    <div className="px-8 pb-8 mt-auto">
                      <div className="flex justify-between items-center pt-6 border-t border-[#003a59]/5">
                        <div>
                          <p className="text-[9px] uppercase font-black text-[#737784] tracking-widest mb-1">Thông tin thu nhập</p>
                          <span className="text-xl font-black text-[#00401e] tracking-tight">{job.salary}</span>
                        </div>
                        <div className="w-12 h-12 bg-[#f8fafb] rounded-2xl flex items-center justify-center group-hover:bg-[#003a59] group-hover:text-white transition-all duration-500 shadow-sm">
                          <ChevronRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-32 bg-white rounded-[3rem] shadow-2xl shadow-black/5 border border-[#003a59]/5">
            <div className="w-24 h-24 bg-[#f8fafb] rounded-[2rem] flex items-center justify-center mx-auto mb-8">
              <Search className="w-10 h-10 text-[#003a59]/20" />
            </div>
            <h3 className="text-3xl font-black text-[#003a59] mb-4 font-['Manrope'] tracking-tight">Không tìm thấy nhóm việc</h3>
            <p className="text-[#434653]/60 text-lg font-medium">Vui lòng thử lại với từ khóa khác hoặc thay đổi bộ lọc.</p>
            <Button variant="outline" className="mt-10 rounded-full px-10 h-14 font-black uppercase tracking-widest border-[#003a59]/10 text-[#003a59] hover:bg-[#003a59] hover:text-white transition-all duration-500" onClick={() => { setSearchTerm(''); setSelectedCategory('Tất cả'); }}>
              Xóa tất cả bộ lọc
            </Button>
          </motion.div>
        )}
      </section>

      <section className="pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#003a59] rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-0 left-0 w-96 h-96 bg-[#7efba4] rounded-full filter blur-[120px] animate-pulse" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full filter blur-[120px] animate-pulse delay-1000" />
            </div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-7xl font-black text-white mb-8 font-['Manrope'] tracking-tighter leading-[0.9]">
                Cần So Sánh <br />
                <span className="text-[#7efba4]">Nhóm Việc Phù Hợp?</span>
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto text-xl mb-12 font-medium leading-relaxed">
                Để lại thông tin để được tư vấn theo hồ sơ thực tế của bạn: độ tuổi, kinh nghiệm, tình trạng giấy tờ và mục tiêu thu nhập.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link to="/">
                  <Button variant="tertiary" size="lg" className="px-12 h-16 rounded-full text-sm font-black uppercase tracking-widest shadow-2xl shadow-[#7efba4]/20">
                    Đăng ký tư vấn
                  </Button>
                </Link>
                <a href="https://javico.vn/lao-dong-nga/" target="_blank" rel="noreferrer">
                  <Button variant="outline" size="lg" className="px-12 h-16 rounded-full text-sm font-black uppercase tracking-widest border-white/10 text-white hover:bg-white/10">
                    Xem trang chính thức
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
