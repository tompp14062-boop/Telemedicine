var SUPABASE_URL = 'https://iavmvhusigygilxieacu.supabase.co'
var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlhdm12aHVzaWd5Z2lseGllYWN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyODY4NDYsImV4cCI6MjA5NDg2Mjg0Nn0.oU1WaWXuoexz1WYLJUazV3C4MP530qsSEUbQl_0cVjo'
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
