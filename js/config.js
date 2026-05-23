const SUPABASE_URL = 'https://iavmvhusigygilxieacu.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_22k37yqbqRt5UjAo10NWCQ_YDo22OSR'
const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

async function getSession() {
  const { data } = await client.auth.getSession()
  return data?.session ?? null
}

async function getProfile(userId) {
  const { data } = await client.from('profiles').select('*').eq('id', userId).single()
  return data
}

async function requireAuth(redirectTo = 'login.html') {
  const session = await getSession()
  if (!session) { window.location.href = redirectTo; return null }
  return session
}
