import React, { useState } from 'react';
import { FileText, Download, BookOpen, Search, Filter } from 'lucide-react';
import { pdfMaterials } from '../../data/quizData';

const StudyPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'السلامة المرورية', 'القوانين', 'الصيانة'];

  const filteredMaterials = pdfMaterials.filter(material => {
    const matchesSearch = material.title.includes(searchTerm) || 
                         material.description.includes(searchTerm);
    const matchesCategory = selectedCategory === 'all' || 
                          material.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDownload = (fileUrl) => {
    // In a real app, this would trigger a download
    window.open(fileUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="flex items-center justify-center mb-4">
              <BookOpen className="w-12 h-12 text-primary-blue-600 mr-3" />
              <h1 className="text-3xl font-bold">المادة الدراسية للقيادة</h1>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              اطلع على المواد التعليمية الشاملة لتعلم القيادة بشكل صحيح وآمن
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 bg-white rounded-xl shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Search className="inline-block ml-1" size={16} />
                  بحث في المواد
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="ابحث في المواد التعليمية..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-blue-600 focus:border-primary-blue-600"
                />
              </div>

              {/* Filter by Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Filter className="inline-block ml-1" size={16} />
                  التصنيف
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-blue-600 focus:border-primary-blue-600"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'جميع التصنيفات' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Study Materials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMaterials.map((material) => (
              <div
                key={material.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start mb-4">
                    <div className="bg-blue-100 p-3 rounded-lg ml-3">
                      <FileText className="w-8 h-8 text-primary-blue-600" />
                    </div>
                    <div>
                      <span className="inline-block px-3 py-1 bg-blue-50 text-primary-blue-600 text-xs font-semibold rounded-full">
                        {material.category}
                      </span>
                      <h3 className="text-xl font-semibold mt-2">{material.title}</h3>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6">{material.description}</p>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleDownload(material.fileUrl)}
                      className="flex items-center text-primary-blue-600 hover:text-blue-700"
                    >
                      <Download className="ml-1" size={18} />
                      تحميل الملف
                    </button>
                    <button
                      onClick={() => window.open(material.fileUrl, '_blank')}
                      className="px-4 py-2 bg-primary-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      عرض الملف
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* If no results */}
          {filteredMaterials.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                لا توجد مواد مطابقة للبحث
              </h3>
              <p className="text-gray-500">
                حاول البحث بكلمات أخرى أو اختر تصنيفاً مختلفاً
              </p>
            </div>
          )}

          {/* Study Tips */}
          <div className="mt-12 bg-primary-blue-600 text-white rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">نصائح للدراسة الفعالة</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h4 className="font-semibold mb-2">اقرأ بتركيز</h4>
                <p className="text-blue-100">اقرأ كل مادة بعناية وفهم المفاهيم الأساسية</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h4 className="font-semibold mb-2">تدرب على الاختبارات</h4>
                <p className="text-blue-100">اختبر معلوماتك بعد كل مادة للتأكد من الفهم</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h4 className="font-semibold mb-2">كرر المراجعة</h4>
                <p className="text-blue-100">ارجع للمواد السابقة بين الحين والآخر</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyPage;