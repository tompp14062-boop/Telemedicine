// =============================================
// TELEMED CONFIG — แก้ค่านี้ให้ตรงกับ Supabase ของคุณ
// =============================================

const SUPABASE_URL = 'https://iavmvhusigygilxieacu.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_22k37yqbqRt5UjAo10NWCQ_YDo22OSR';

const { createClient } = supabase;
const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// =============================================
// GLOBAL HELPERS
// =============================================

async function getSession() {
  const { data } = await client.auth.getSession();
  return data?.session ?? null;
}

async function getProfile(userId) {
  const { data } = await client
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return data;
}

async function requireAuth(redirectTo = 'login.html') {
  const session = await getSession();
  if (!session) {
    window.location.href = redirectTo;
    return null;
  }
  return session;
}
