# Employee Management Application

<p>Bu proje, şirket çalışanlarının bilgilerini yönetmek için React ve TypeScript kullanılarak geliştirilmiş modern bir web uygulamasıdır.</p>

## Özellikler

<ul>
  <li>Çalışan listesi görüntüleme</li>
  <li>Yeni çalışan ekleme</li>
  <li>Mevcut çalışan bilgilerini düzenleme</li>
  <li>Çalışan silme</li>
  <li>Form validasyonu</li>
  <li>Responsive tasarım</li>
</ul>

## Teknoloji Stack'i

<ul>
  <li><strong>React</strong> - UI kütüphanesi</li>
  <li><strong>TypeScript</strong> - Tip güvenliği için</li>
  <li><strong>Vite</strong> - Build ve development tool</li>
  <li><strong>TanStack Query</strong> - Server state management</li>
  <li><strong>React Hook Form</strong> - Form yönetimi</li>
  <li><strong>Zustand</strong> - Client state management</li>
  <li><strong>Tailwind CSS</strong> - Styling</li>
  <li><strong>Zod</strong> - Form validasyonu</li>
  <li><strong>React Hot Toast</strong> - Bildirimler</li>
</ul>

## Kurulum ve Çalıştırma

<h3>Gereksinimler</h3>
<ul>
  <li>Node.js (v14+)</li>
  <li>npm veya yarn</li>
</ul>

<h3>Adımlar</h3>

<ol>
  <li>
    <p>Depoyu klonlayın:</p>
    <pre><code>git clone https://github.com/your-username/employee-management.git
cd employee-management</code></pre>
  </li>
  <li>
    <p>Bağımlılıkları yükleyin:</p>
    <pre><code>npm install
# veya
yarn</code></pre>
  </li>
  <li>
    <p>Geliştirme sunucusunu başlatın:</p>
    <pre><code>npm run dev
# veya
yarn dev</code></pre>
  </li>
  <li>
    <p>API sunucusunu kurulumu ve çalıştırma:</p>
    <pre><code># API reposunu klonlayın
git clone https://github.com/mehmetasilkilic/employee-api.git
cd employee-api

# Bağımlılıkları yükleyin
npm install

# API sunucusunu başlatın
npm start</code></pre>
  </li>
</ol>

## Proje Yapısı

<pre><code>src/
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
└── main.tsx               # Entry point</code></pre>

## Özellikler ve Kullanım

<h3>Çalışan Listesi</h3>

<ul>
  <li>Çalışanlar listelenecektir</li>
  <li>Sayfalama yapısı mevcuttur (sayfa başına 5 kayıt)</li>
  <li>Her kayıt için Edit ve Delete butonları bulunur</li>
  <li>Mobil cihazlarda, tabloda sadece isim ve aksiyon butonları görünür</li>
</ul>

<h3>Çalışan Ekleme</h3>

<ol>
  <li>"Add New Employee" butonuna tıklayın</li>
  <li>Form alanlarını doldurun</li>
  <li>Tüm validasyonları geçtiğinden emin olun</li>
  <li>"Add Employee" butonuna tıklayın</li>
</ol>

<h3>Çalışan Düzenleme</h3>

<ol>
  <li>İlgili çalışanın "Edit" butonuna tıklayın</li>
  <li>Formda gerekli değişiklikleri yapın</li>
  <li>"Save Changes" butonuna tıklayın</li>
</ol>

<h3>Çalışan Silme</h3>

<ol>
  <li>İlgili çalışanın "Delete" butonuna tıklayın</li>
  <li>Onay dialogunda silme işlemini onaylayın</li>
</ol>

## Form Validasyonları

<ul>
  <li>İsim ve soyisim en az 2 karakter olmalı</li>
  <li>Email formatı doğru olmalı</li>
  <li>Telefon numarası formatı doğru olmalı</li>
  <li>İşe giriş tarihi gelecekte olamaz</li>
  <li>Departman ve pozisyon seçilmek zorunda</li>
</ul>

## API Entegrasyonu

<p>Uygulama, RESTful API ile iletişim kurar. API endpoint'leri:</p>

<ul>
  <li>GET <code>/employees</code> - Tüm çalışanları listeler</li>
  <li>GET <code>/employees/:id</code> - Belirli bir çalışanın detaylarını getirir</li>
  <li>POST <code>/employees</code> - Yeni çalışan ekler</li>
  <li>PUT <code>/employees/:id</code> - Çalışan bilgilerini günceller</li>
  <li>DELETE <code>/employees/:id</code> - Çalışanı siler</li>
</ul>

## Responsive Tasarım

<p>Uygulama, farklı ekran boyutlarına uyum sağlar:</p>

<ul>
  <li>Masaüstü: Tam tablo görünümü</li>
  <li>Tablet: Tam tablo görünümü</li>
  <li>Mobil: Sadeleştirilmiş görünüm (ad-soyad ve aksiyonlar)</li>
</ul>



