import React, { useState } from 'react';
import { FileText, Download, BookOpen, Search, Filter } from 'lucide-react';

const StudyPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // PDF materials data
  const pdfMaterials = [
    {
      id: 1,
      title: 'مراحل امتحان السوق العملي',
      description: 'دليل شامل لمراحل امتحان القيادة العملي لسيارات السياحية الخصوصي فئة B',
      category: 'السلامة المرورية',
      fileUrl: '/pdf/مراحل امتحان السوق العملي لسيارات السياحية الخصوصي فئة B 3.pdf',
      fileName: 'مراحل امتحان السوق العملي لسيارات السياحية الخصوصي فئة B 3.pdf'
    },
    {
      id: 2,
      title: 'أسئلة دلّني خبرني',
      description: 'مجموعة أسئلة مهمة للتدريب على اختبار القيادة النظري',
      category: 'القوانين',
      fileUrl: '/pdf/أسئلة+دلّني+خبرني.pdf',
      fileName: 'أسئلة+دلّني+خبرني.pdf'
    },
    {
      id: 3,
      title: 'الكتاب الدراسي للقيادة',
      description: 'الدليل الكامل للتعليمات والقوانين المرورية باللغة العربية',
      category: 'القوانين',
      fileUrl: '/pdf/Study Manual AR.pdf',
      fileName: 'Study Manual AR.pdf'
    },
    {
      id: 4,
      title: 'أساسيات الصيانة الوقائية',
      description: 'دليل صيانة السيارة الأساسية والفحوصات الدورية',
      category: 'الصيانة',
      fileUrl: '/pdf/مراحل امتحان السوق العملي لسيارات السياحية الخصوصي فئة B 3.pdf', // You can replace with actual maintenance PDF
      fileName: 'أساسيات الصيانة الوقائية.pdf'
    }
  ];

  const categories = ['all', 'السلامة المرورية', 'القوانين', 'الصيانة'];

  const filteredMaterials = pdfMaterials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         material.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                          material.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDownload = (fileUrl, fileName) => {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName || 'document.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleView = (fileUrl) => {
    // Open PDF in new tab for viewing
    window.open(fileUrl, '_blank', 'noopener,noreferrer');
  };

  const handleDirectDownload = (fileUrl, fileName) => {
    // Force download
    fetch(fileUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName || 'document.pdf';
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
      })
      .catch(error => {
        console.error('Download error:', error);
        // Fallback to simple download
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileName || 'document.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="w-full px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-12 h-12 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold">المادة الدراسية للقيادة</h1>
          </div>
          <p className="text-gray-600">
            اطلع على المواد التعليمية الشاملة لتعلم القيادة بشكل صحيح وآمن
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 bg-white rounded-xl shadow-lg p-6 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Search */}
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                <Search className="inline-block ml-1 w-4 h-4" />
                بحث في المواد
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="ابحث في المواد التعليمية..."
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 h-10 text-right"
                  dir="rtl"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>

            {/* Filter by Category */}
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                <Filter className="inline-block ml-1 w-4 h-4" />
                التصنيف
              </label>
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 h-10 appearance-none bg-white text-right"
                  dir="rtl"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'جميع التصنيفات' : category}
                    </option>
                  ))}
                </select>
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
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
                    <FileText className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full">
                      {material.category}
                    </span>
                    <h3 className="text-xl font-semibold mt-2">{material.title}</h3>
                  </div>
                </div>

                <p className="text-gray-600 mb-6">{material.description}</p>

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleDirectDownload(material.fileUrl, material.fileName)}
                    className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <Download className="ml-1" size={18} />
                    تحميل الملف
                  </button>
                  <button
                    onClick={() => handleView(material.fileUrl)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
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
      </div>
    </div>
  );
};

export default StudyPage;