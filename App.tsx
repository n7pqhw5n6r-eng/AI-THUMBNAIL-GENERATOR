import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import InputForm from './components/InputForm';
import ThumbnailDisplay from './components/ThumbnailDisplay';
import { generateThumbnail } from './services/geminiService';

const App: React.FC = () => {
  const [topic, setTopic] = useState<string>('React Tutorial for Beginners');
  const [context, setContext] = useState<string>('A modern, clean design showing code snippets and the React logo.');
  const [title, setTitle] = useState<string>('MASTER REACT IN 2024');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic || !context || !title) {
      setError("Please fill in all fields.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const imageUrl = await generateThumbnail(topic, context, title);
      setGeneratedImage(imageUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [topic, context, title]);

  return (
    <div className="min-h-screen bg-zinc-900 text-white font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          <div className="md:w-2/5 lg:w-1/3 flex-shrink-0">
            <InputForm
              topic={topic}
              setTopic={setTopic}
              context={context}
              setContext={setContext}
              title={title}
              setTitle={setTitle}
              onSubmit={handleGenerate}
              isLoading={isLoading}
            />
          </div>
          <div className="md:w-3/5 lg:w-2/3">
            <ThumbnailDisplay
              image={generatedImage}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
