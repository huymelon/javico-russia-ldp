import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, Home, Briefcase, Scale, Info, Phone, Globe, Menu, X, LogIn, LogOut, User, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/Button';
import { useFirebase } from '../lib/FirebaseProvider';
import { signInWithGoogle, logout } from '../lib/firebase';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user, userProfile, loading } = useFirebase();

  const navItems = [
    { name: 'Trang chủ', path: '/', icon: Home },
    { name: 'Nhóm việc', path: '/jobs', icon: Briefcase },
    { name: 'Quy trình', path: '/process', icon: Scale },
    { name: 'Về JAVICO', path: '/about', icon: Info },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafb] font-['Inter'] selection:bg-[#003a59]/10 selection:text-[#003a59]">
      <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl border-b border-[#003a59]/5 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img src="/images/logo-square.webp" alt="JAVICO" className="w-10 h-10 rounded-xl object-cover shadow-lg shadow-[#003a59]/20 transition-transform group-hover:rotate-6" />
            <div className="flex flex-col">
              <span className="text-xl font-black text-[#003a59] font-['Manrope'] tracking-tight leading-none">JAVICO</span>
              <span className="text-[10px] font-black text-[#7efba4] uppercase tracking-[0.2em] mt-1 bg-[#003a59] px-1.5 py-0.5 rounded">Thị trường Nga</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'text-sm font-black uppercase tracking-widest transition-all hover:text-[#003a59] relative group',
                  location.pathname === item.path ? 'text-[#003a59]' : 'text-[#737784]'
                )}
              >
                {item.name}
                <span
                  className={cn(
                    'absolute -bottom-2 left-0 h-0.5 bg-[#003a59] transition-all duration-300',
                    location.pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'
                  )}
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-3 px-4 py-2 bg-[#f8f9fa] rounded-full border border-[#003a59]/5">
              <ShieldCheck className="w-4 h-4 text-[#003a59]" />
              <span className="text-[10px] font-black tracking-widest uppercase text-[#003a59]">Giấy phép 793/GP</span>
            </div>

            {loading ? (
              <div className="w-10 h-10 rounded-full bg-gray-100 animate-pulse" />
            ) : user ? (
              <div className="flex items-center gap-4">
                <div className="hidden md:flex flex-col items-end">
                  <span className="text-xs font-black text-[#003a59]">{user.displayName}</span>
                  <span className="text-[9px] font-black uppercase text-[#7efba4] tracking-widest">{userProfile?.role}</span>
                </div>
                <div className="relative group">
                  <img
                    src={user.photoURL || ''}
                    alt={user.displayName || ''}
                    className="w-10 h-10 rounded-full border-2 border-[#003a59]/10 cursor-pointer"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-[#003a59]/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-2">
                    <Link
                      to="/profile"
                      className="w-full flex items-center gap-3 px-4 py-3 text-xs font-black uppercase tracking-widest text-[#003a59] hover:bg-[#003a59]/5 rounded-xl transition-colors"
                    >
                      <User className="w-4 h-4" />
                      Hồ sơ của tôi
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-xs font-black uppercase tracking-widest text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Đăng xuất
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Button
                size="sm"
                variant="outline"
                className="hidden md:flex items-center gap-2 rounded-full px-6 h-12 text-xs font-black uppercase tracking-widest border-[#003a59]/10 text-[#003a59]"
                onClick={signInWithGoogle}
              >
                <LogIn className="w-4 h-4" />
                Đăng nhập
              </Button>
            )}

            <button
              className="md:hidden p-3 bg-[#f8f9fa] rounded-xl text-[#003a59] border border-[#003a59]/5"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-white pt-20 px-6">
          <nav className="flex flex-col gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  'text-xl font-bold flex items-center gap-4',
                  location.pathname === item.path ? 'text-[#003a59]' : 'text-[#40484c]'
                )}
              >
                <item.icon className="w-6 h-6" />
                {item.name}
              </Link>
            ))}
            <a
              href="https://javico.vn/lao-dong-nga/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 h-12 rounded-xl bg-[#003a59] text-white text-xs font-black uppercase tracking-widest"
            >
              <FileText className="w-4 h-4" />
              Xem trang chính thức
            </a>
          </nav>
        </div>
      )}

      <main className="pt-16 pb-24 md:pb-0">{children}</main>

      <footer className="bg-[#003a59] text-white pt-24 pb-12 px-6 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#7efba4]/30 to-transparent" />
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-8">
                <img src="/images/logo-square.webp" alt="JAVICO" className="w-12 h-12 rounded-2xl object-cover bg-white/10 p-1" />
                <div className="flex flex-col">
                  <span className="text-2xl font-black font-['Manrope'] tracking-tight">JAVICO</span>
                  <span className="text-[10px] font-black text-[#7efba4] uppercase tracking-[0.2em]">Japan core | Russia growth</span>
                </div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed max-w-md mb-10">
                Công ty Cổ phần Nhân lực Việt Nam Nhật Bản. Trang này tập trung cung cấp thông tin thị trường lao động Nga theo hướng rõ quy trình, rõ hồ sơ và phù hợp với người lao động cùng gia đình.
              </p>
              <div className="flex gap-4">
                <a href="https://javico.vn/" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#7efba4] hover:text-[#003a59] transition-all group">
                  <Globe className="w-5 h-5 transition-transform group-hover:scale-110" />
                </a>
                <a href="https://javico.vn/lao-dong-nga/" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#7efba4] hover:text-[#003a59] transition-all group">
                  <FileText className="w-5 h-5 transition-transform group-hover:scale-110" />
                </a>
                <a href="#apply-form" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#7efba4] hover:text-[#003a59] transition-all group">
                  <Phone className="w-5 h-5 transition-transform group-hover:scale-110" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-12">
              <div>
                <h4 className="text-[#7efba4] font-black uppercase text-[10px] tracking-[0.3em] mb-8">Định vị nội dung</h4>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                      <Home className="w-4 h-4 text-white/40" />
                    </div>
                    <p className="text-sm text-white/70 leading-relaxed">
                      Nhật Bản là mảng dịch vụ cốt lõi. Nga là thị trường được JAVICO đẩy mạnh nội dung, SEO và tư vấn trong giai đoạn 2026.
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4 text-white/40" />
                    </div>
                    <p className="text-sm text-white/70">Thông tin trên trang ưu tiên sự rõ ràng về hồ sơ, quy trình, lưu ý trước và sau xuất cảnh.</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-[#7efba4] font-black uppercase text-[10px] tracking-[0.3em] mb-8">Liên kết hữu ích</h4>
                <div className="space-y-6">
                  <a href="https://javico.vn/" target="_blank" rel="noreferrer" className="flex gap-4 hover:text-[#7efba4] transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                      <Globe className="w-4 h-4 text-white/40" />
                    </div>
                    <p className="text-sm text-white/70 leading-relaxed">Website chính thức của JAVICO</p>
                  </a>
                  <a href="https://javico.vn/lao-dong-nga/" target="_blank" rel="noreferrer" className="flex gap-4 hover:text-[#7efba4] transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4 text-white/40" />
                    </div>
                    <p className="text-sm text-white/70 leading-relaxed">Trang thông tin thị trường lao động Nga</p>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] text-white/30 uppercase font-black tracking-[0.2em]">
              © 2026 JAVICO. Nội dung tham khảo cho người lao động và gia đình.
            </p>
            <div className="flex gap-8">
              <a href="https://javico.vn/" target="_blank" rel="noreferrer" className="text-[10px] text-white/30 uppercase font-black tracking-[0.2em] hover:text-[#7efba4] transition-colors">Website chính</a>
              <a href="https://javico.vn/lao-dong-nga/" target="_blank" rel="noreferrer" className="text-[10px] text-white/30 uppercase font-black tracking-[0.2em] hover:text-[#7efba4] transition-colors">Trang Nga</a>
            </div>
          </div>
        </div>
      </footer>

      <nav className="fixed bottom-0 left-0 w-full z-50 md:hidden bg-white/95 backdrop-blur-2xl border-t border-[#003a59]/5 px-6 pb-safe pt-3 flex justify-around items-center shadow-[0_-8px_32px_rgba(0,58,89,0.08)]">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              'flex flex-col items-center gap-1.5 py-2 px-4 rounded-2xl transition-all relative group',
              location.pathname === item.path ? 'text-[#003a59] bg-[#003a59]/5' : 'text-[#737784]'
            )}
          >
            <item.icon className={cn('w-5 h-5 transition-transform', location.pathname === item.path ? 'scale-110' : 'group-hover:scale-110')} />
            <span className="text-[9px] font-black uppercase tracking-widest">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
