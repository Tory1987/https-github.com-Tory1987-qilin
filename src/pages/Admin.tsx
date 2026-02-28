import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, ShieldCheck, Users, Search, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAdminRole } from '@/hooks/useAdminRole';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';

interface AdminUser {
  id: string;
  email: string;
  created_at: string;
  profile: { display_name: string | null; avatar_url: string | null } | null;
  progress: { xp: number; level: number; streak: number; hearts: number; completed_lessons: string[] } | null;
  roles: string[];
}

export default function Admin() {
  const navigate = useNavigate();
  const { isAdmin, loading: roleLoading } = useAdminRole();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [toggling, setToggling] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const res = await supabase.functions.invoke('admin-users', {
      method: 'GET',
    });

    if (res.error) {
      toast.error('Không thể tải danh sách user');
    } else {
      setUsers(res.data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!roleLoading && !isAdmin) {
      navigate('/home');
      return;
    }
    if (!roleLoading && isAdmin) {
      fetchUsers();
    }
  }, [roleLoading, isAdmin, navigate]);

  const toggleAdmin = async (userId: string, makeAdmin: boolean) => {
    setToggling(userId);
    const res = await supabase.functions.invoke('admin-users', {
      method: 'POST',
      body: { action: 'toggle_admin', user_id: userId, make_admin: makeAdmin },
    });

    if (res.error || res.data?.error) {
      toast.error(res.data?.error || 'Lỗi khi thay đổi quyền');
    } else {
      toast.success(makeAdmin ? 'Đã gán quyền admin' : 'Đã xóa quyền admin');
      await fetchUsers();
    }
    setToggling(null);
  };

  const filtered = users.filter(u => {
    const q = search.toLowerCase();
    return (
      u.email?.toLowerCase().includes(q) ||
      u.profile?.display_name?.toLowerCase().includes(q)
    );
  });

  if (roleLoading || (!isAdmin && !roleLoading)) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 py-4 pb-24">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate('/home')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-xl font-extrabold flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Quản lý người dùng
          </h1>
          <p className="text-xs text-muted-foreground">{users.length} người dùng</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Tìm theo email hoặc tên..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 h-10 rounded-xl"
        />
      </div>

      {/* User list */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((u, i) => {
            const isUserAdmin = u.roles.includes('admin');
            return (
              <motion.div
                key={u.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="rounded-2xl border border-border bg-card p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-sm truncate">
                        {u.profile?.display_name || 'Chưa đặt tên'}
                      </p>
                      {isUserAdmin && (
                        <span className="text-[10px] font-bold bg-primary/10 text-primary px-1.5 py-0.5 rounded-full shrink-0">
                          ADMIN
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{u.email}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span>⚡ {u.progress?.xp || 0} XP</span>
                      <span>📊 Lv.{u.progress?.level || 1}</span>
                      <span>🔥 {u.progress?.streak || 0}</span>
                      <span>❤️ {u.progress?.hearts ?? 5}</span>
                      <span>📚 {u.progress?.completed_lessons?.length || 0} bài</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      Tham gia: {new Date(u.created_at).toLocaleDateString('vi-VN')}
                    </p>
                  </div>

                  <Button
                    variant={isUserAdmin ? 'destructive' : 'outline'}
                    size="sm"
                    className="shrink-0 rounded-xl text-xs"
                    disabled={toggling === u.id}
                    onClick={() => toggleAdmin(u.id, !isUserAdmin)}
                  >
                    {toggling === u.id ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : isUserAdmin ? (
                      <>
                        <ShieldCheck className="h-3 w-3 mr-1" />
                        Xóa Admin
                      </>
                    ) : (
                      <>
                        <Shield className="h-3 w-3 mr-1" />
                        Gán Admin
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            );
          })}

          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p className="font-bold">Không tìm thấy user nào</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
