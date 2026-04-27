import { useState, useEffect } from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import LearnPage from './pages/LearnPage'
import QuizPage from './pages/QuizPage'
import ProfilePage from './pages/ProfilePage'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [userProgress, setUserProgress] = useState(() => {
    const saved = localStorage.getItem('morseProgress')
    return saved ? JSON.parse(saved) : {
      xp: 0,
      level: 1,
      badges: [],
      completedLessons: [],
      streak: 0,
      lastPracticeDate: null
    }
  })

  useEffect(() => {
    localStorage.setItem('morseProgress', JSON.stringify(userProgress))
  }, [userProgress])

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <HomePage 
          userProgress={userProgress} 
          onPageChange={setCurrentPage} 
        />
      case 'learn':
        return <LearnPage 
          userProgress={userProgress} 
          setUserProgress={setUserProgress}
          onPageChange={setCurrentPage} 
        />
      case 'quiz':
        return <QuizPage 
          userProgress={userProgress} 
          setUserProgress={setUserProgress}
          onPageChange={setCurrentPage} 
        />
      case 'profile':
        return <ProfilePage 
          userProgress={userProgress} 
          onPageChange={setCurrentPage} 
        />
      default:
        return <HomePage userProgress={userProgress} onPageChange={setCurrentPage} />
    }
  }

  return (
    <div className="min-h-screen bg-base-100">
      {renderPage()}
    </div>
  )
}

export default App