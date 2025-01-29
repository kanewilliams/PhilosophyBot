import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const ArgumentGenerator = () => {
  const [ism, setIsm] = useState('');
  const [position, setPosition] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const philosophicalPerspectives = [
    { value: 'existentialism', label: 'Existentialism' },
    { value: 'utilitarianism', label: 'Utilitarianism' },
    { value: 'kantian-ethics', label: 'Kantian Ethics' },
    { value: 'virtue-ethics', label: 'Virtue Ethics' },
    { value: 'stoicism', label: 'Stoicism' },
    { value: 'nihilism', label: 'Nihilism' },
    { value: 'pragmatism', label: 'Pragmatism' },
    { value: 'moral-relativism', label: 'Moral Relativism' },
    { value: 'hedonism', label: 'Hedonism' },
    { value: 'determinism', label: 'Determinism' }
  ];

  const positions = [
    { value: 'abortion', label: 'Abortion Rights' },
    { value: 'euthanasia', label: 'Euthanasia' },
    { value: 'animal-rights', label: 'Animal Rights' },
    { value: 'death-penalty', label: 'Death Penalty' },
    { value: 'wealth-inequality', label: 'Wealth Inequality' },
    { value: 'free-will', label: 'Free Will' },
    { value: 'ai-rights', label: 'AI Rights' },
    { value: 'environmental-ethics', label: 'Environmental Ethics' },
    { value: 'social-justice', label: 'Social Justice' },
    { value: 'moral-education', label: 'Moral Education' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
        const response = await fetch('http://localhost:5000/api/generate-prompt', {
            method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ism, position }),
      });
      
      const data = await response.json();
      setGeneratedPrompt(data.prompt);
    } catch (error) {
        console.error('Error:', error);
        setGeneratedPrompt('Failed to generate prompt. Please try again.');
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">🧙‍♂️PhilosophyBot 🤖</CardTitle>
          <p className="text-center text-gray-600">Philosophical arguments from any perspective</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="ism">Perspective ('ism')</Label>
              <Select value={ism} onValueChange={setIsm}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a philosophical perspective" />
                </SelectTrigger>
                <SelectContent>
                  {philosophicalPerspectives.map((perspective) => (
                    <SelectItem 
                      key={perspective.value} 
                      value={perspective.value}
                    >
                      {perspective.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Select value={position} onValueChange={setPosition}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a position" />
                </SelectTrigger>
                <SelectContent>
                  {positions.map((pos) => (
                    <SelectItem 
                      key={pos.value} 
                      value={pos.value}
                    >
                      {pos.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Generating...' : 'Generate Argument'}
            </Button>
          </form>

          {generatedPrompt && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium mb-2">Generated Prompt:</h3>
              <p className="text-gray-700">{generatedPrompt}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ArgumentGenerator;