import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { createIdea } from '../../../api/ideas';
import { useMutation } from '@tanstack/react-query';
export const Route = createFileRoute('/ideas/new/')({
  component: NewIdeaPage,
});

function NewIdeaPage() {
  const navigate = useNavigate();

  // Form State များ ဖန်တီးခြင်း
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  //create Mutation
  const { mutateAsync, isPending } = useMutation({
    mutationFn: createIdea,
    onSuccess: () => {   
      navigate({ to: '/ideas' });
    },
  });
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Field များ ပြည့်စုံမှု ရှိမရှိ စစ်ဆေးခြင်း (Validation)
    if (!title.trim() || !summary.trim() || !description.trim()) {
      alert('Please fill in all fields');
      return;
      
    }
    try {
      // Tags များကို Comma နဲ့ ခွဲထုတ်ပြီး Clean လုပ်ခြင်း
      const formattedTags = tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag !== '');

      await mutateAsync({
        title,
        summary,
        description,
        tags: formattedTags,
      });
    } catch (error) {
      console.error(error);
      alert('Something went wrong');
    }

  }
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-6">Create New Idea</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            required
          />
        </div>

        {/* Summary Input */}
        <div>
          <label htmlFor="summary" className="block text-sm font-medium text-gray-700">
            Summary
          </label>
          <input
            type="text"
            id="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            required
          />
        </div>

        {/* Description Textarea */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            required
          />
        </div>

        {/* Tags Input */}
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
            Tags (comma separated)
          </label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          {isPending ? 'Creating...' : 'Create Idea'}
        </button>
      </form>
    </div>
  );
}