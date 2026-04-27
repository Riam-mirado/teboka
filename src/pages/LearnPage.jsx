import { useState, useEffect } from 'react'
import { morseCodemap } from '../services/morseService'
import { ArrowLeft, Volume2, CheckCircle, Star } from 'lucide-react'

const LearnPage = ({ userProgress, setUserProgress, onPageChange }) => {
  const [currentLesson, setCurrentLesson] = useState(0)
  const [learnedLetters, setLearnedLetters] = useState([])
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)

  // Diviser l'alphabet en leçons progressives (5 lettres par niveau)
  const lessons = []
  for (let i = 0; i < morseCodemap.length; i += 5) {
    lessons.push(morseCodemap.slice(i, i + 5))
  }

  const currentLessonData = lessons[currentLesson] || []
  const isLessonComplete = learnedLetters.length === currentLessonData.length

  // Synthèse vocale pour le Morse
  const playMorseSound = (morseCode) => {
    if (!audioEnabled || isPlaying) return
    
    setIsPlaying(true)
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const dotDuration = 0.1 // secondes
    
    let currentTime = 0
    
    morseCode.split('').forEach((symbol, index) => {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.value = 600 // Hz
      oscillator.type = 'sine'
      
      const duration = symbol === '.' ? dotDuration : dotDuration * 3
      const gap = dotDuration
      
      oscillator.start(currentTime)
      gainNode.gain.setValueAtTime(1, currentTime)
      gainNode.gain.setValueAtTime(0, currentTime + duration)
      oscillator.stop(currentTime + duration)
      
      currentTime += duration + gap
    })
    
    setTimeout(() => setIsPlaying(false), currentTime * 1000)
  }

  const markLetterAsLearned = (letter) => {
    if (!learnedLetters.includes(letter)) {
      setLearnedLetters([...learnedLetters, letter])
      // Ajouter de l'XP
      setUserProgress(prev => ({
        ...prev,
        xp: prev.xp + 10
      }))
    }
  }

  const completeLesson = () => {
    if (!isLessonComplete) return
    
    const lessonKey = `lesson-${currentLesson}`
    if (!userProgress.completedLessons.includes(lessonKey)) {
      setUserProgress(prev => ({
        ...prev,
        xp: prev.xp + 50,
        completedLessons: [...prev.completedLessons, lessonKey]
      }))
    }
    
    // Passer à la leçon suivante si disponible
    if (currentLesson < lessons.length - 1) {
      setCurrentLesson(currentLesson + 1)
      setLearnedLetters([])
    }
  }

  return (
    <div className="min-h-screen bg-base-100 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onPageChange('home')}
            className="btn btn-ghost btn-circle"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-primary">Leçon {currentLesson + 1}</h1>
            <p className="text-base-content/70">
              {isLessonComplete ? 'Leçon terminée ! 🎉' : 'Apprends ces lettres'}
            </p>
          </div>
          <div className="badge badge-primary badge-lg">
            {learnedLetters.length}/{currentLessonData.length} apprises
          </div>
        </div>

        {/* Progress Bar */}
        <progress 
          className="progress progress-accent w-full" 
          value={(learnedLetters.length / currentLessonData.length) * 100} 
          max="100"
        ></progress>

        {/* Lesson Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentLessonData.map((item) => {
            const isLearned = learnedLetters.includes(item.alphabet)
            
            return (
              <div 
                key={item.alphabet}
                className={`card ${isLearned ? 'bg-success text-success-content' : 'bg-base-200'} shadow-lg transition-all hover:scale-105`}
              >
                <div className="card-body items-center text-center p-6">
                  <div className="text-6xl font-bold mb-2">{item.alphabet}</div>
                  <div className="text-3xl font-mono tracking-widest mb-4">
                    {item.value}
                  </div>
                  <div className="text-sm opacity-75 mb-4">
                    {item.correspondance}
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => playMorseSound(item.value)}
                      disabled={isPlaying}
                      className="btn btn-circle btn-sm"
                    >
                      <Volume2 size={20} />
                    </button>
                    {!isLearned && (
                      <button
                        onClick={() => markLetterAsLearned(item.alphabet)}
                        className="btn btn-success btn-sm gap-2"
                      >
                        <CheckCircle size={16} /> J'ai appris
                      </button>
                    )}
                    {isLearned && (
                      <div className="badge badge-success gap-2">
                        <Star size={16} className="fill-current" /> Appris
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Complete Lesson Button */}
        {isLessonComplete && (
          <div className="text-center">
            <button
              onClick={completeLesson}
              className="btn btn-primary btn-lg gap-2"
            >
              <CheckCircle size={24} />
              {currentLesson < lessons.length - 1 ? 'Leçon suivante' : 'Terminer !'}
            </button>
          </div>
        )}

        {/* Tips */}
        <div className="alert alert-info">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>
            Astuce : Écoute le son et répète le code à voix haute pour mieux mémoriser !
          </span>
        </div>

        {/* Navigation entre leçons */}
        <div className="flex justify-between">
          <button
            onClick={() => {
              if (currentLesson > 0) {
                setCurrentLesson(currentLesson - 1)
                setLearnedLetters([])
              }
            }}
            disabled={currentLesson === 0}
            className="btn btn-outline"
          >
            ← Leçon précédente
          </button>
          <span className="text-base-content/70 self-center">
            Leçon {currentLesson + 1} sur {lessons.length}
          </span>
          <button
            onClick={() => {
              if (currentLesson < lessons.length - 1) {
                setCurrentLesson(currentLesson + 1)
                setLearnedLetters([])
              }
            }}
            disabled={currentLesson === lessons.length - 1}
            className="btn btn-outline"
          >
            Leçon suivante →
          </button>
        </div>
      </div>
    </div>
  )
}

export default LearnPage
