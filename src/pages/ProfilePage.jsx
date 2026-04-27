import { ArrowLeft, Trophy, Award, Star, BookOpen } from 'lucide-react'

const ProfilePage = ({ userProgress, onPageChange }) => {
  const xpForNextLevel = userProgress.level * 100
  const progressPercent = (userProgress.xp / xpForNextLevel) * 100

  // Badges disponibles à débloquer
  const availableBadges = [
    { id: 1, name: 'Premiers Pas', description: 'Complete ta première leçon', icon: '🎯', requirement: 1 },
    { id: 2, name: 'Débutant', description: 'Atteins 100 XP', icon: '⭐', requirement: 100 },
    { id: 3, name: 'Intermédiaire', description: 'Atteins 500 XP', icon: '🌟', requirement: 500 },
    { id: 4, name: 'Expert', description: 'Atteins 1000 XP', icon: '✨', requirement: 1000 },
    { id: 5, name: 'Maître Morse', description: 'Atteins 2500 XP', icon: '🏆', requirement: 2500 },
    { id: 6, name: 'Légende', description: 'Atteins 5000 XP', icon: '👑', requirement: 5000 },
    { id: 7, name: 'Série de Feu', description: '7 jours de suite', icon: '🔥', requirement: 7, type: 'streak' },
    { id: 8, name: 'Persévérant', description: '15 jours de suite', icon: '💪', requirement: 15, type: 'streak' },
    { id: 9, name: 'Dédicé', description: '30 jours de suite', icon: '⚡', requirement: 30, type: 'streak' },
    { id: 10, name: 'Alphabet Complet', description: 'Termine toutes les leçons', icon: '📚', requirement: 6, type: 'lessons' },
  ]

  // Vérifier quels badges sont débloqués
  const unlockedBadges = availableBadges.filter(badge => {
    if (badge.type === 'streak') {
      return userProgress.streak >= badge.requirement
    } else if (badge.type === 'lessons') {
      return userProgress.completedLessons.length >= badge.requirement
    } else {
      return userProgress.xp >= badge.requirement
    }
  })

  const lockedBadges = availableBadges.filter(badge => !unlockedBadges.includes(badge))

  return (
    <div className="min-h-screen bg-base-100 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onPageChange('home')}
            className="btn btn-ghost btn-circle"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-3xl font-bold text-primary">Mon Profil</h1>
        </div>

        {/* Profile Card */}
        <div className="card bg-primary text-primary-content shadow-xl">
          <div className="card-body">
            <div className="flex items-center gap-6">
              <div className="avatar placeholder">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-24">
                  <span className="text-3xl">🏕️</span>
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold">Scout Morse</h2>
                <p className="opacity-75">Membre depuis aujourd'hui</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">Niveau {userProgress.level}</div>
                <div className="opacity-75">{userProgress.xp} XP</div>
              </div>
            </div>

            {/* XP Progress */}
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Progression vers le niveau {userProgress.level + 1}</span>
                <span>{xpForNextLevel - userProgress.xp} XP restants</span>
              </div>
              <progress 
                className="progress progress-accent w-full h-4" 
                value={progressPercent} 
                max="100"
              ></progress>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="stat bg-base-200 rounded-box p-4">
            <div className="stat-figure text-primary">
              <BookOpen size={32} />
            </div>
            <div className="stat-title">Leçons</div>
            <div className="stat-value text-primary">{userProgress.completedLessons.length}</div>
            <div className="stat-desc">complétées</div>
          </div>
          
          <div className="stat bg-base-200 rounded-box p-4">
            <div className="stat-figure text-secondary">
              <Trophy size={32} />
            </div>
            <div className="stat-title">XP Total</div>
            <div className="stat-value text-secondary">{userProgress.xp}</div>
            <div className="stat-desc">points</div>
          </div>
          
          <div className="stat bg-base-200 rounded-box p-4">
            <div className="stat-figure text-accent">
              <Award size={32} />
            </div>
            <div className="stat-title">Badges</div>
            <div className="stat-value text-accent">{unlockedBadges.length}</div>
            <div className="stat-desc">sur {availableBadges.length}</div>
          </div>
          
          <div className="stat bg-base-200 rounded-box p-4">
            <div className="stat-figure text-error">
              <span className="text-3xl">🔥</span>
            </div>
            <div className="stat-title">Série</div>
            <div className="stat-value text-error">{userProgress.streak}</div>
            <div className="stat-desc">jours consécutifs</div>
          </div>
        </div>

        {/* Badges Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Star className="fill-current" size={28} />
            Badges Débloqués ({unlockedBadges.length}/{availableBadges.length})
          </h2>
          
          {unlockedBadges.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {unlockedBadges.map((badge) => (
                <div 
                  key={badge.id}
                  className="card bg-success text-success-content shadow-lg"
                >
                  <div className="card-body items-center text-center p-4">
                    <div className="text-4xl mb-2">{badge.icon}</div>
                    <div className="font-bold text-sm">{badge.name}</div>
                    <div className="text-xs opacity-75">{badge.description}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="alert">
              <span>Continue à apprendre pour débloquer tes premiers badges ! 🎯</span>
            </div>
          )}
        </div>

        {/* Locked Badges Section */}
        {lockedBadges.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Award size={28} />
              Badges à Débloquer
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {lockedBadges.map((badge) => (
                <div 
                  key={badge.id}
                  className="card bg-base-200 opacity-60"
                >
                  <div className="card-body items-center text-center p-4">
                    <div className="text-4xl mb-2 grayscale">🔒</div>
                    <div className="font-bold text-sm">{badge.name}</div>
                    <div className="text-xs opacity-75">
                      {badge.type === 'streak' 
                        ? `${badge.requirement} jours de suite`
                        : badge.type === 'lessons'
                          ? `${badge.requirement} leçons`
                          : `${badge.requirement} XP`
                      }
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Motivational Message */}
        <div className="alert alert-info shadow-lg">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>
              {userProgress.streak > 0 
                ? `Super ! Tu es en série depuis ${userProgress.streak} jour(s). Continue comme ça !`
                : 'Reviens chaque jour pour maintenir ta série et gagner des badges !'
              }
            </span>
          </div>
        </div>

        {/* Reset Progress (for testing) */}
        <div className="text-center">
          <button 
            onClick={() => {
              if (confirm('Es-tu sûr de vouloir réinitialiser ta progression ?')) {
                localStorage.removeItem('morseProgress')
                window.location.reload()
              }
            }}
            className="btn btn-outline btn-error btn-sm"
          >
            Réinitialiser ma progression
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
