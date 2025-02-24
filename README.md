Employee Management Application
Bu proje, şirket çalışanlarının bilgilerini yönetmek için React ve TypeScript kullanılarak geliştirilmiş modern bir web uygulamasıdır.

Özellikler

Çalışan listesi görüntüleme
Yeni çalışan ekleme
Mevcut çalışan bilgilerini düzenleme
Çalışan silme
Form validasyonu
Responsive tasarım

Teknoloji Stack'i

React - UI kütüphanesi
TypeScript - Tip güvenliği için
Vite - Build ve development tool
TanStack Query - Server state management
React Hook Form - Form yönetimi
Zustand - Client state management
Tailwind CSS - Styling
Zod - Form validasyonu
React Hot Toast - Bildirimler

Kurulum ve Çalıştırma
Gereksinimler

Node.js (v14+)
npm veya yarn

Adımlar

1- Depoyu klonlayın:
git clone https://github.com/semanurgokirmak/Sirius-AI-Employee-Management-.git
cd employee-management

2- Bağımlılıkları yükleyin:
npm install
# veya
yarn

3- Geliştirme sunucusunu başlatın:
npm run dev
# veya
yarn dev

4- API sunucusunu kurulumu ve çalıştırma:
# API reposunu klonlayın
git clone https://github.com/mehmetasilkilic/employee-api.git
cd employee-api

# Bağımlılıkları yükleyin
npm install

# API sunucusunu başlatın
npm start

Proje Yapısı:
src/
├── api/
│   └── employeeApi.ts     # API çağrıları
├── components/
│   └── employees/
│       ├── DeleteConfirmation.tsx  # Silme onay dialogu
│       ├── EmployeeForm.tsx        # Çalışan ekleme/düzenleme formu
│       └── EmployeeList.tsx        # Çalışan listesi
├── store/
│   └── employeeStore.ts   # Zustand store
├── types/
│   └── employee.ts        # Tip tanımları
├── utils/
│   └── validation.ts      # Zod validasyon şemaları
├── App.tsx                # Ana uygulama bileşeni
└── main.tsx               # Entry point

Özellikler ve Kullanım
Çalışan Listesi
• Çalışanlar listelenecektir
• Sayfalama yapısı mevcuttur (sayfa başına 5 kayıt)
• Her kayıt için Edit ve Delete butonları bulunur
• Mobil cihazlarda, tabloda sadece isim ve aksiyon butonları görünür

Çalışan Ekleme
• "Add New Employee" butonuna tıklayın
• Form alanlarını doldurun
• Tüm validasyonları geçtiğinden emin olun
• "Add Employee" butonuna tıklayın

Çalışan Düzenleme
• İlgili çalışanın "Edit" butonuna tıklayın
• Formda gerekli değişiklikleri yapın
• "Save Changes" butonuna tıklayın

Çalışan Silme
• İlgili çalışanın "Delete" butonuna tıklayın
• Onay dialogunda silme işlemini onaylayın

Form Validasyonları
• İsim ve soyisim en az 2 karakter olmalı
• Email formatı doğru olmalı
• Telefon numarası formatı doğru olmalı
• İşe giriş tarihi gelecekte olamaz
• Departman ve pozisyon seçilmek zorunda

API Entegrasyonu
Uygulama, RESTful API ile iletişim kurar. API endpoint'leri:

• GET /employees - Tüm çalışanları listeler
• GET /employees/:id - Belirli bir çalışanın detaylarını getirir
• POST /employees - Yeni çalışan ekler
• PUT /employees/:id - Çalışan bilgilerini günceller
• DELETE /employees/:id - Çalışanı siler

Responsive Tasarım
Uygulama, farklı ekran boyutlarına uyum sağlar:

• Masaüstü: Tam tablo görünümü
• Tablet: Tam tablo görünümü
• Mobil: Sadeleştirilmiş görünüm (ad-soyad ve aksiyonlar)

Gelecek Geliştirmeler

• Arama ve filtreleme
• Çalışanları Excel'e aktarma
• Kullanıcı yetkilendirme
• Daha gelişmiş filtreler
• Çalışan profil sayfaları