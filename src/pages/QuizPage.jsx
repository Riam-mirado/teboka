import { useState, useEffect } from 'react'
import { morseCodemap } from '../services/morseService'
import { ArrowLeft, Volume2, Heart, Award, RotateCcw } from 'lucide-react'

const QuizPage = ({ userProgress, setUserProgress, onPageChange }) => {
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [options, setOptions] = useState([])
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [questionType, setQuestionType] = useState('morse') // 'morse' ou 'alphabet'
  const [streak, setStreak] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [quizComplete, setQuizComplete] = useState(false)
  const [difficulty, setDifficulty] = useState('debutant') // debutant, intermediaire, expert

  // Générer une question aléatoire
  const generateQuestion = () => {
    let availableLetters = morseCodemap
    
    // Filtrer selon la difficulté
    if (difficulty === 'debutant') {
      availableLetters = morseCodemap.slice(0, 10) // A-J
    } else if (difficulty === 'intermediaire') {
      availableLetters = morseCodemap.slice(0, 20) // A-T
    }
    
    const randomIndex = Math.floor(Math.random() * availableLetters.length)
    const questionData = availableLetters[randomIndex]
    const type = Math.random() > 0.5 ? 'morse' : 'alphabet'
    
    setQuestionType(type)
    setCurrentQuestion(questionData)
    setSelectedAnswer(null)
    
    // Générer les options de réponse
    const correctAnswer = type === 'morse' ? questionData.alphabet : questionData.value
    const wrongAnswers = []
    
    while (wrongAnswers.length < 3) {
      const randomWrong = availableLetters[Math.floor(Math.random() * availableLetters.length)]
      const wrongAnswer = type === 'morse' ? randomWrong.alphabet : randomWrong.value
      
      if (wrongAnswer !== correctAnswer && !wrongAnswers.includes(wrongAnswer)) {
        wrongAnswers.push(wrongAnswer)
      }
    }
    
    const allOptions = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5)
    setOptions(allOptions)
  }

  // Jouer le son Morse
  const playMorseSound = (morseCode) => {
    if (!audioEnabled || isPlaying) return
    
    setIsPlaying(true)
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const dotDuration = difficulty === 'expert' ? 0.08 : 0.1
    
    let currentTime = 0
    
    morseCode.split('').forEach((symbol) => {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.value = 600
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

  // Vérifier la réponse
  const checkAnswer = (answer) => {
    if (selectedAnswer) return
    
    setSelectedAnswer(answer)
    const correctAnswer = questionType === 'morse' 
      ? currentQuestion.alphabet 
      : currentQuestion.value
    
    if (answer === correctAnswer) {
      // Bonne réponse
      const points = difficulty === 'expert' ? 30 : difficulty === 'intermediaire' ? 20 : 10
      setScore(score + points)
      setStreak(streak + 1)
      
      setUserProgress(prev => ({
        ...prev,
        xp: prev.xp + points
      }))
    } else {
      // Mauvaise réponse
      setLives(lives - 1)
      setStreak(0)
    }
  }

  // Question suivante
  const nextQuestion = () => {
    if (lives <= 0) {
      setQuizComplete(true)
      return
    }
    generateQuestion()
  }

  // Réinitialiser le quiz
  const resetQuiz = () => {
    setScore(0)
    setLives(3)
    setStreak(0)
    setQuizComplete(false)
    generateQuestion()
  }

  // Initialiser le quiz
  useEffect(() => {
    generateQuestion()
  }, [difficulty])

  // Sauvegarder le score final
  useEffect(() => {
    if (quizComplete && score > 0) {
      setUserProgress(prev => ({
        ...prev,
        xp: prev.xp + Math.floor(score / 2) // Bonus de fin
      }))
    }
  }, [quizComplete])

  if (quizComplete) {
    return (
      <div className="min-h-screen bg-base-100 py-8 px-4">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="card bg-base-200 shadow-xl p-8">
            <Award size={80} className="text-accent mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-primary mb-4">Quiz Terminé !</h1>
            <div className="text-6xl font-bold text-secondary mb-4">{score} pts</div>
            <p className="text-xl mb-6">Série maximale : {streak}</p>
            
            <div className="flex gap-4 justify-center">
              <button onClick={resetQuiz} className="btn btn-primary btn-lg gap-2">
                <RotateCcw size={20} /> Rejouer
              </button>
              <button onClick={() => onPageChange('home')} className="btn btn-outline btn-lg">
                <ArrowLeft size={20} /> Accueil
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base-100 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button 
            onClick={() => onPageChange('home')}
            className="btn btn-ghost btn-circle"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-3xl font-bold text-primary">Quiz Morse</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setAudioEnabled(!audioEnabled)}
              className={`btn btn-circle btn-sm ${audioEnabled ? 'btn-primary' : 'btn-outline'}`}
            >
              <Volume2 size={18} />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <div className="badge badge-secondary badge-lg gap-2 text-xl">
              <Award size={20} /> {score}
            </div>
            <div className="badge badge-accent badge-lg gap-2 text-xl">
              🔥 {streak}
            </div>
          </div>
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <Heart
                key={i}
                size={28}
                className={`transition-all ${
                  i < lives 
                    ? 'text-error fill-error' 
                    : 'text-base-300'
                }`}
                fill={i < lives ? 'currentColor' : 'none'}
              />
            ))}
          </div>
        </div>

        {/* Difficulty Selector */}
        <div className="flex justify-center gap-2">
          {['debutant', 'intermediaire', 'expert'].map((level) => (
            <button
              key={level}
              onClick={() => {
                setDifficulty(level)
                resetQuiz()
              }}
              className={`btn btn-sm ${
                difficulty === level ? 'btn-primary' : 'btn-outline'
              }`}
            >
              {level === 'debutant' ? 'Débutant' : level === 'intermediaire' ? 'Intermédiaire' : 'Expert'}
            </button>
          ))}
        </div>

        {/* Question Card */}
        <div className="card bg-base-200 shadow-xl p-8 text-center">
          {currentQuestion ? (
            questionType === 'morse' ? (
              <div className="space-y-4">
                <p className="text-lg text-base-content/70">Quel est ce code Morse ?</p>
                <div className="text-5xl font-mono tracking-widest py-8">
                  {currentQuestion.value}
                </div>
                <button
                  onClick={() => playMorseSound(currentQuestion.value)}
                  disabled={isPlaying}
                  className="btn btn-primary btn-circle btn-lg"
                >
                  <Volume2 size={32} />
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-lg text-base-content/70">Quel est le code Morse pour cette lettre ?</p>
                <div className="text-8xl font-bold text-primary py-8">
                  {currentQuestion.alphabet}
                </div>
              </div>
            )
          ) : (
            <span className="loading loading-spinner loading-lg text-primary"></span>
          )}
        </div>

        {/* Answer Options */}
        <div className="grid grid-cols-2 gap-4">
          {options.map((option, index) => {
            const isCorrect = option === (questionType === 'morse' 
              ? currentQuestion?.alphabet 
              : currentQuestion?.value)
            const isSelected = selectedAnswer === option
            
            return (
              <button
                key={index}
                onClick={() => checkAnswer(option)}
                disabled={!!selectedAnswer}
                className={`
                  btn btn-lg text-xl transition-all duration-300
                  ${!selectedAnswer 
                    ? 'btn-outline btn-primary hover:scale-105' 
                    : isCorrect && isSelected
                      ? 'btn-success scale-105'
                      : isSelected
                        ? 'btn-error scale-95'
                        : 'btn-disabled'
                  }
                `}
              >
                {option}
              </button>
            )
          })}
        </div>

        {/* Feedback & Next Button */}
        {selectedAnswer && (
          <div className="text-center">
            <div className={`alert mb-4 ${
              selectedAnswer === (questionType === 'morse' 
                ? currentQuestion.alphabet 
                : currentQuestion.value)
                ? 'alert-success' 
                : 'alert-error'
            }`}>
              <span className="text-lg font-bold">
                {selectedAnswer === (questionType === 'morse' 
                  ? currentQuestion.alphabet 
                  : currentQuestion.value)
                  ? '✓ Correct ! +' + (difficulty === 'expert' ? 30 : difficulty === 'intermediaire' ? 20 : 10) + ' XP'
                  : '✗ Incorrect ! La bonne réponse était : ' + (questionType === 'morse' 
                    ? currentQuestion.alphabet 
                    : currentQuestion.value)
                }
              </span>
            </div>
            <button onClick={nextQuestion} className="btn btn-primary btn-lg gap-2">
              Question suivante →
            </button>
          </div>
        )}

        {/* Tips */}
        <div className="alert alert-info">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>
            {difficulty === 'debutant' 
              ? 'Commence doucement, écoute bien le rythme des points et traits !' 
              : difficulty === 'intermediaire'
                ? 'Augmente la difficulté pour progresser plus vite !'
                : 'Mode expert : vitesse rapide, pour les vrais scouts !'
            }
          </span>
        </div>
      </div>
    </div>
  )
}

export default QuizPage
