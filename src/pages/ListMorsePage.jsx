import { useState, useRef, useEffect } from 'react'
import { morseCodemap } from '../services/morseService'
import "../../src/index.css"
function ListMorsePage() {
  const [selectedLetter, setSelectedLetter] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalRef = useRef(null)

  // Extraire toutes les lettres de l'alphabet depuis morseCodemap
  const alphabets = [...new Set(morseCodemap.map(item => item.alphabet))]

  // Trouver l'entrée correspondant à la lettre sélectionnée
  const selectedData = selectedLetter
    ? morseCodemap.find(item => item.alphabet === selectedLetter)
    : null

  // Fermer la modale si on clique en dehors du contenu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="min-h-screen bg-base-100 py-10 px-4">
    <div className="max-w-3xl mx-auto space-y-6">
      {/* En-tête */}
      <div className="bg-primary text-primary-content rounded-xl p-6 shadow-md">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Zap size={24} /> Morse Trainer
          </h1>
          <div className="flex gap-2">
            <button className="btn btn-sm btn-circle" onClick={() => setAudioEnabled(!audioEnabled)}>
              {audioEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
            <button className="btn btn-sm btn-circle" onClick={() => setShowReferenceTable(!showReferenceTable)}>
              <Book size={18} />
            </button>
          </div>
        </div>

        {/* XP Bar */}
        <div>
          <div className="flex justify-between text-sm">
            <span>Niveau {level}</span>
            <span>{xp}/{level * 100} XP</span>
          </div>
          <progress className="progress progress-accent w-full mt-1" value={levelProgress} max="100"></progress>
        </div>
      </div>

      {/* Statistiques */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <div className="badge badge-secondary p-3 gap-2"><Award size={16} /> {score}</div>
          <div className="badge badge-accent p-3 gap-2"><span>🔥</span> {streak}</div>
        </div>
        <div className="flex gap-1">
          {[...Array(3)].map((_, i) => (
            <Heart
              key={i}
              size={24}
              className={clsx(
                'transition-all duration-300',
                i < lives ? 'text-error fill-error' : 'text-base-300 stroke-1'
              )}
              fill={i < lives ? 'currentColor' : 'none'}
            />
          ))}
        </div>
      </div>

      {/* Question */}
      <div className="card bg-base-200 shadow p-6 text-center">
        {currentQuestion ? (
          questionType === 'morse' ? (
            <div className="text-4xl font-mono tracking-widest relative">
              {currentQuestion.value}
              <button
                onClick={playMorseSound}
                disabled={!audioEnabled || isPlaying}
                className="btn btn-ghost btn-sm btn-circle absolute top-0 right-0"
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>
            </div>
          ) : (
            <div className="text-6xl font-bold text-primary">{currentQuestion.alphabet}</div>
          )
        ) : (
          <span className="loading loading-spinner text-primary"></span>
        )}
      </div>

      {/* Options de réponse */}
      <div className="grid grid-cols-2 gap-4">
        {options.map((option, i) => {
          const isCorrect = option === (questionType === 'morse' ? currentQuestion?.alphabet : currentQuestion?.value);
          const isSelected = selectedAnswer === option;

          return (
            <button
              key={i}
              className={clsx(
                'btn btn-lg transition-all duration-300 text-xl',
                selectedAnswer
                  ? isCorrect && isSelected
                    ? 'btn-success scale-105'
                    : isSelected
                    ? 'btn-error scale-95'
                    : 'btn-disabled'
                  : 'btn-outline btn-primary hover:scale-105'
              )}
              disabled={!!selectedAnswer || lives <= 0}
              onClick={() => checkAnswer(option)}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {feedback && (
        <div
          className={clsx(
            'alert shadow-md',
            feedback.includes('Correct') ? 'alert-success' : 'alert-error'
          )}
        >
          <span>{feedback}</span>
        </div>
      )}

      {/* Indice */}
      {!selectedAnswer && !showHint && lives > 0 && (
        <div className="text-center">
          <button onClick={() => setShowHint(true)} className="btn btn-link">Besoin d'un indice ?</button>
        </div>
      )}
      {showHint && !selectedAnswer && (
        <div className="alert alert-info flex items-center gap-2">
          <AlertCircle size={18} />
          <span>
            {questionType === 'morse'
              ? `Indice : Lettre "${currentQuestion?.alphabet}"`
              : `Indice : "${currentQuestion?.value}" en morse`}
          </span>
        </div>
      )}

      {/* Navigation */}
      {lives > 0 ? (
        selectedAnswer && (
          <div className="text-center">
            <button onClick={nextQuestion} className="btn btn-primary btn-wide">
              Question suivante <ChevronRight size={16} />
            </button>
          </div>
        )
      ) : (
        <div className="card bg-error text-error-content p-6 text-center">
          <h3 className="text-2xl font-bold mb-2">Session terminée</h3>
          <p className="mb-4">Score final : <strong>{score}</strong></p>
          <button onClick={resetQuiz} className="btn btn-outline">
            <RotateCcw size={16} /> Recommencer
          </button>
        </div>
      )}

      {/* Table de référence */}
      {showReferenceTable && (
        <div className="bg-base-200 p-4 border-t border-base-300 rounded-xl">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold">Table de référence</h3>
            <button onClick={() => setShowReferenceTable(false)} className="btn btn-ghost btn-sm btn-circle">✕</button>
          </div>
          <div className="grid grid-cols-6 gap-2 text-center text-sm">
            {morseCodemap.slice(0, 26).map((item) => (
              <div key={item.alphabet} className="badge badge-outline p-3 gap-2 w-full">
                <span className="font-bold">{item.alphabet}</span>
                <span className="font-mono">{item.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-5 gap-2 text-center text-sm">
            {morseCodemap.slice(26).map((item) => (
              <div key={item.alphabet} className="badge badge-outline p-3 gap-2 w-full">
                <span className="font-bold">{item.alphabet}</span>
                <span className="font-mono">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
  )
}

export default ListMorsePage