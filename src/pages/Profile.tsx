import * as React from 'react';
import { useFirebase } from '../lib/FirebaseProvider';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { motion } from 'motion/react';
import { Briefcase, Calendar, Clock, MapPin, User, Mail, Phone, ChevronRight, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { JOBS } from '../constants';
import { Link, useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user, loading: authLoading } = useFirebase();
  const navigate = useNavigate();
  const [applications, setApplications] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate('/');
      return;
    }

    const fetchApplications = async () => {
      try {
        const q = query(
          collection(db, 'applications'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const apps = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setApplications(apps);
      } catch (error) {
        handleFirestoreError(error, OperationType.LIST, 'applications');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user, authLoading, navigate]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafb]">
        <Loader2 className="w-12 h-12 text-[#003a59] animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-[#f8fafb] min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Sidebar - User Info */}
          <div className="lg:col-span-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[3rem] p-10 shadow-2xl shadow-[#003a59]/5 border border-[#003a59]/5 sticky top-32"
            >
              <div className="flex flex-col items-center text-center mb-10">
                <div className="w-24 h-24 bg-[#003a59] rounded-full flex items-center justify-center mb-6 shadow-xl shadow-[#003a59]/20">
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || ''} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <User className="w-10 h-10 text-white" />
                  )}
                </div>
                <h2 className="text-2xl font-black text-[#003a59] font-['Manrope'] mb-2">{user?.displayName}</h2>
                <p className="text-[#434653]/60 font-medium">{user?.email}</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-[#f8fafb] rounded-2xl border border-[#003a59]/5">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <Mail className="w-5 h-5 text-[#003a59]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#737784]">Email</p>
                    <p className="text-sm font-bold text-[#003a59]">{user?.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-[#f8fafb] rounded-2xl border border-[#003a59]/5">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <Briefcase className="w-5 h-5 text-[#003a59]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#737784]">Đơn đã ứng tuyển</p>
                    <p className="text-sm font-bold text-[#003a59]">{applications.length} đơn hàng</p>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full mt-10 rounded-2xl h-14 font-black uppercase tracking-widest text-xs">
                Chỉnh sửa hồ sơ
              </Button>
            </motion.div>
          </div>

          {/* Main Content - Applications */}
          <div className="lg:col-span-8">
            <div className="mb-12">
              <h1 className="text-4xl font-black text-[#003a59] font-['Manrope'] mb-4 tracking-tight">Hồ Sơ Của Bạn</h1>
              <p className="text-[#434653]/60 text-lg font-medium">Theo dõi trạng thái các đơn hàng bạn đã ứng tuyển.</p>
            </div>

            {applications.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-[3rem] p-20 text-center border-2 border-dashed border-[#003a59]/10"
              >
                <div className="w-20 h-20 bg-[#f8fafb] rounded-full flex items-center justify-center mx-auto mb-8">
                  <Briefcase className="w-10 h-10 text-[#003a59]/20" />
                </div>
                <h3 className="text-2xl font-black text-[#003a59] mb-4">Chưa có đơn hàng nào</h3>
                <p className="text-[#434653]/60 mb-10 max-w-md mx-auto">Bạn chưa ứng tuyển đơn hàng nào. Hãy khám phá các cơ hội việc làm tại Nga ngay hôm nay!</p>
                <Link to="/jobs">
                  <Button variant="primary" className="rounded-full px-12 h-16 font-black uppercase tracking-widest">Khám phá việc làm</Button>
                </Link>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {applications.map((app, index) => {
                  const job = JOBS.find(j => j.id === app.jobId);
                  return (
                    <motion.div
                      key={app.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-[#003a59]/5 border border-[#003a59]/5 hover:border-[#7efba4]/50 transition-all group"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div className="flex items-center gap-6">
                          <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg shrink-0">
                            <img src={job?.imageUrl || '/images/worker-group.jpg'} alt={job?.title} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <span className="px-3 py-1 bg-[#7efba4]/10 text-[#00401e] rounded-full text-[10px] font-black uppercase tracking-widest">
                                {job?.category || 'Đơn hàng'}
                              </span>
                              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                app.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                                app.status === 'approved' ? 'bg-green-100 text-green-700' : 
                                'bg-red-100 text-red-700'
                              }`}>
                                {app.status === 'pending' ? 'Đang chờ' : 
                                 app.status === 'approved' ? 'Đã duyệt' : 'Từ chối'}
                              </span>
                            </div>
                            <h3 className="text-xl font-black text-[#003a59] mb-2 font-['Manrope'] group-hover:text-[#00401e] transition-colors">
                              {job?.title || 'Đơn hàng đã xóa'}
                            </h3>
                            <div className="flex flex-wrap gap-4 text-[#434653]/60 text-xs font-bold">
                              <div className="flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5" />
                                {job?.location}
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5" />
                                {app.createdAt?.toDate().toLocaleDateString('vi-VN')}
                              </div>
                            </div>
                          </div>
                        </div>
                        <Link to={`/jobs/${app.jobId}`}>
                          <Button variant="outline" className="rounded-2xl h-12 px-6 group-hover:bg-[#003a59] group-hover:text-white transition-all">
                            Chi tiết <ChevronRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
