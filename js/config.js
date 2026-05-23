var SUPABASE_URL = 'https://iavmvhusigygilxieacu.supabase.co'
var SUPABASE_ANON_KEY = 'sb_publishable_22k37yqbqRt5UjAo10NWCQ_YDo22OSR'
var client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

function getSession() {
  return client.auth.getSession().then(function(r){ return r.data.session || null })
}

function getProfile(userId) {
  return client.from('profiles').select('*').eq('id', userId).single().then(function(r){ return r.data })
}

function requireAuth(redirectTo) {
  redirectTo = redirectTo || 'login.html'
  return getSession().then(function(session){
    if (!session) { window.location.href = redirectTo; return null }
    return session
  })
}
