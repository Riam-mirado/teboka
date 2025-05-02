import React, { useState } from 'react';
import { BookOpen, PlayCircle } from 'lucide-react';

const MorseQuiz = () => {
  const [started, setStarted] = useState(false);

  return (
    <div className="min-h-screen bg-base-100 py-12 px-6">
      {!started ? (
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-primary inline-flex items-center gap-2">
              <BookOpen size={32} /> Entraîneur Morse
            </h1>
            <p className="text-base-content text-lg">
              Améliore ta reconnaissance du code Morse avec ce quiz interactif. Choisis un niveau, teste-toi, et progresse !
            </p>
          </div>

          <div>
            <button
              onClick={() => setStarted(true)}
              className="btn btn-primary btn-lg gap-2 shadow-md hover:scale-105 transition-transform"
            >
              <PlayCircle size={20} /> Commencer le Quiz
            </button>
          </div>

          <div className="pt-12">
            <p className="text-sm text-base-content/70">
              Basé sur l'alphabet international Morse. Fonctionne hors-ligne. Développé avec ❤️ par [TonNom].
            </p>
          </div>
        </div>
      ) : (
        <h1>hello</h1>
      )}
    </div>
  );
};

export default MorseQuiz;
