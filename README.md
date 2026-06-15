# Dating Web App ❤️

Sadə, romantik və şirin mini dating app — bir nəfərə romantik formada sual verir, cavabı Supabase-ə yazır.

## Texnologiyalar

- **Frontend:** React + Vite
- **Styling:** CSS
- **Backend/Database:** Supabase

## Layihə strukturu

```
src/
├── App.jsx
├── main.jsx
├── lib/
│   └── supabaseClient.js
├── components/
│   ├── QuestionScreen.jsx
│   ├── ElusiveNoButton.jsx
│   ├── DateForm.jsx
│   └── SuccessScreen.jsx
└── styles/
    └── App.css
```

## Supabase setup

### 1. Yeni Supabase layihəsi yaradın

1. [supabase.com](https://supabase.com) saytına daxil olun
2. **New Project** ilə yeni layihə yaradın
3. Layihə hazır olanda **Settings → API** bölməsindən aşağıdakıları götürün:
   - **Project URL**
   - **anon public** key

### 2. Cədvəl yaradın

Supabase Dashboard-da **SQL Editor**-ə keçin və bu SQL-i işlədin:

```sql
-- date_requests cədvəli
CREATE TABLE date_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  selected_date date NOT NULL,
  date_type text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- RLS aktivləşdir
ALTER TABLE date_requests ENABLE ROW LEVEL SECURITY;

-- Anonim insert icazəsi (frontend form göndərməsi üçün)
CREATE POLICY "Allow anonymous inserts on date_requests"
  ON date_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);
```

### 3. Environment variables

Layihə kökündə `.env` faylı yaradın (`.env.example`-dan kopyalaya bilərsiniz):

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

> **Qeyd:** `service_role` açarını heç vaxt frontend-ə əlavə etməyin. Yalnız `anon` key istifadə edin.

## Quraşdırma və işə salma

```bash
# Asılılıqları quraşdır
npm install

# Development server
npm run dev

# Production build
npm run build

# Build-i preview etmək
npm run preview
```

`npm run dev` işlədikdən sonra brauzerdə göstərilən URL-ə keçin (adətən `http://localhost:5173`).

## App flow

1. **İlk ekran:** "Mənimlə date etmək istəyərsənmi?" sualı
2. **Düymələr:**
   - **Hə ❤️** — növbəti formaya keçir
   - **Yox 😅** — mouse/touch ilə qaçır, klik olmur
3. **Form:**
   - Tarix seçimi (keçmiş tarix seçilə bilməz)
   - Date tipi (select)
   - Ürək sözləri (textarea)
4. **Göndər** — validation + Supabase insert
5. **Uğur ekranı** — ürək animasiyası və təsdiq mesajı

## Cədvəl strukturu

| Sütun         | Tip        | Qeyd                        |
|---------------|------------|-----------------------------|
| id            | uuid       | PK, `gen_random_uuid()`     |
| selected_date | date       | NOT NULL                    |
| date_type     | text       | NOT NULL                    |
| message       | text       | NOT NULL                    |
| created_at    | timestamptz| DEFAULT `now()`             |

## Troubleshooting

- **Insert xətası:** RLS policy-nin düzgün yaradıldığını yoxlayın
- **Env xətası:** `.env` faylının mövcud olduğunu və `VITE_` prefiksi ilə yazıldığını yoxlayın
- **Server restart:** `.env` dəyişdikdən sonra `npm run dev`-i yenidən başladın

---

Sevgi ilə hazırlanıb ❤️
