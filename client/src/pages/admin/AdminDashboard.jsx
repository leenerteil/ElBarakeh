import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Users, Calendar, FileText, BarChart, Settings, Home } from 'lucide-react';

const AdminDashboard = () => {
  const sidebarItems = [
    { icon: <Home size={20} />, label: 'لوحة التحكم', path: '' },
    { icon: <Users size={20} />, label: 'إدارة المستخدمين', path: 'users' },
    { icon: <Calendar size={20} />, label: 'إدارة الجدول', path: 'schedule' },
    { icon: <FileText size={20} />, label: 'الحجوزات', path: 'appointments' },
    { icon: <BarChart size={20} />, label: 'التقارير', path: 'reports' },
    { icon: <Settings size={20} />, label: 'الإعدادات', path: 'settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-primary-blue">إدارة البركة</h2>
            <p className="text-sm text-gray-500 mt-1">لوحة تحكم المشرف</p>
          </div>
          
          <nav className="p-4">
            <ul className="space-y-2">
              {sidebarItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={`/admin/${item.path}`}
                    className="flex items-center space-x-3 space-x-reverse p-3 rounded-lg hover:bg-blue-50 hover:text-primary-blue transition-colors"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<AdminHome />} />
            <Route path="/users" element={<ManageUsers />} />
            <Route path="/schedule" element={<ManageSchedule />} />
            <Route path="/appointments" element={<ManageAppointments />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

// Dashboard Home Component
const AdminHome = () => {
  const stats = [
    { label: 'إجمالي المستخدمين', value: '1,234', change: '+12%' },
    { label: 'الحجوزات اليوم', value: '45', change: '+5%' },
    { label: 'الاختبارات المكتملة', value: '892', change: '+8%' },
    { label: 'الإيرادات الشهرية', value: '54,320 ر.س', change: '+15%' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">مرحباً بك في لوحة التحكم</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500 text-sm mb-2">{stat.label}</h3>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-bold">{stat.value}</p>
              <span className="text-green-600 text-sm">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">النشاط الأخير</h2>
        <div className="space-y-4">
          {[
            { user: 'أحمد محمد', action: 'حجز موعد جديد', time: 'منذ 10 دقائق' },
            { user: 'سارة عبدالله', action: 'أكمل اختبار القيادة', time: 'منذ 30 دقيقة' },
            { user: 'خالد أحمد', action: 'سجل في المنصة', time: 'منذ ساعة' },
            { user: 'فاطمة علي', action: 'حمّل مادة دراسية', time: 'منذ ساعتين' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded">
              <div>
                <p className="font-medium">{activity.user}</p>
                <p className="text-gray-500 text-sm">{activity.action}</p>
              </div>
              <span className="text-gray-400 text-sm">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Manage Users Component
const ManageUsers = () => (
  <div>
    <h1 className="text-3xl font-bold mb-8">إدارة المستخدمين</h1>
    <div className="bg-white rounded-xl shadow p-6">
      <p>قائمة المستخدمين وإدارتهم ستظهر هنا</p>
    </div>
  </div>
);

// Manage Schedule Component
const ManageSchedule = () => (
  <div>
    <h1 className="text-3xl font-bold mb-8">إدارة الجدول</h1>
    <div className="bg-white rounded-xl shadow p-6">
      <p>إدارة مواعيد الدروس والمدربين ستظهر هنا</p>
    </div>
  </div>
);

// Manage Appointments Component
const ManageAppointments = () => (
  <div>
    <h1 className="text-3xl font-bold mb-8">إدارة الحجوزات</h1>
    <div className="bg-white rounded-xl shadow p-6">
      <p>عرض وتعديل وإدارة جميع الحجوزات ستظهر هنا</p>
    </div>
  </div>
);

// Reports Component
const Reports = () => (
  <div>
    <h1 className="text-3xl font-bold mb-8">التقارير والإحصائيات</h1>
    <div className="bg-white rounded-xl shadow p-6">
      <p>التقارير والرسوم البيانية ستظهر هنا</p>
    </div>
  </div>
);

// Settings Component
const SettingsPage = () => (
  <div>
    <h1 className="text-3xl font-bold mb-8">الإعدادات</h1>
    <div className="bg-white rounded-xl shadow p-6">
      <p>إعدادات النظام والتطبيق ستظهر هنا</p>
    </div>
  </div>
);

export default AdminDashboard;