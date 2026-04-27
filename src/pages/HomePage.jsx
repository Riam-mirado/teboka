import { BookOpen, Trophy, User, Play } from 'lucide-react'

const HomePage = ({ userProgress, onPageChange }) => {
  const xpForNextLevel = userProgress.level * 100
  const progressPercent = (userProgress.xp / xpForNextLevel) * 100

  return (
    <div className="min-h-screen bg-base-100 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-primary flex items-center justify-center gap-3">
            <BookOpen size={48} />
            Code Scout Morse
          </h1>
          <p className="text-xl text-base-content/80">
            Apprends le code Morse comme un vrai scout ! 🏕️
          </p>
        </div>

        {/* XP & Level Card */}
        <div className="card bg-primary text-primary-content shadow-xl">
          <div className="card-body">
            <div className="flex justify-between items-center mb-2">
              <span className="text-2xl font-bold">Niveau {userProgress.level}</span>
              <span className="text-lg">{userProgress.xp} / {xpForNextLevel} XP</span>
            </div>
            <progress 
              className="progress progress-accent w-full h-4" 
              value={progressPercent} 
              max="100"
            ></progress>
            <div className="mt-4 flex justify-between items-center">
              <div className="flex gap-2">
                <div className="badge badge-secondary badge-lg gap-2">
                  <Trophy size={20} /> {userProgress.badges.length} Badges
                </div>
                <div className="badge badge-accent badge-lg gap-2">
                  🔥 {userProgress.streak} jours
                </div>
              </div>
              <button 
                onClick={() => onPageChange('profile')}
                className="btn btn-ghost btn-sm"
              >
                <User size={20} /> Profil
              </button>
            </div>
          </div>
        </div>

        {/* Main Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Learn Card */}
          <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer"
               onClick={() => onPageChange('learn')}>
            <figure className="px-4 pt-4">
              <BookOpen size={80} className="text-primary" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title text-2xl">Apprendre</h2>
              <p>Découvre les lettres et leurs codes Morse</p>
              <div className="card-actions">
                <button className="btn btn-primary btn-wide">
                  <BookOpen size={20} /> Commencer
                </button>
              </div>
            </div>
          </div>

          {/* Quiz Card */}
          <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer"
               onClick={() => onPageChange('quiz')}>
            <figure className="px-4 pt-4">
              <Play size={80} className="text-secondary" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title text-2xl">S'entraîner</h2>
              <p>Teste tes connaissances avec des quiz</p>
              <div className="card-actions">
                <button className="btn btn-secondary btn-wide">
                  <Play size={20} /> Jouer
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="stats stats-vertical lg:stats-horizontal shadow w-full bg-base-200">
          <div className="stat">
            <div className="stat-figure text-primary">
              <Trophy size={32} />
            </div>
            <div className="stat-title">Leçons complétées</div>
            <div className="stat-value text-primary">{userProgress.completedLessons.length}</div>
            <div className="stat-desc">Continue comme ça !</div>
          </div>
          <div className="stat">
            <div className="stat-figure text-secondary">
              <span className="text-3xl">🔥</span>
            </div>
            <div className="stat-title">Série actuelle</div>
            <div className="stat-value text-secondary">{userProgress.streak} jours</div>
            <div className="stat-desc">Meilleure série : --</div>
          </div>
          <div className="stat">
            <div className="stat-figure text-accent">
              <BookOpen size={32} />
            </div>
            <div className="stat-title">XP total</div>
            <div className="stat-value text-accent">{userProgress.xp}</div>
            <div className="stat-desc">Niveau {userProgress.level}</div>
          </div>
        </div>

        {/* Motivational Message */}
        <div className="alert alert-info shadow-lg">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>Prêt à devenir un expert en Morse ? Pratique chaque jour pour progresser !</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
