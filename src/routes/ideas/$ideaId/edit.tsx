import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useMutation, useSuspenseQuery, queryOptions } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchIdea,updateIdea } from '../../../api/ideas';
// Query Options သတ်မှတ်ခြင်း
const ideaQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['idea', id],
    queryFn: () => fetchIdea(id),
  });

export const Route = createFileRoute('/ideas/$ideaId/edit')({
  loader: async ({ params, context: { queryClient } }) => {
    return queryClient.ensureQueryData(ideaQueryOptions(params.ideaId));
  },
  component: IdeaEditPage,
});

function IdeaEditPage() {
  const { ideaId } = Route.useParams();
  const navigate = useNavigate();

  // Data ရယူခြင်း
  const { data: idea } = useSuspenseQuery(ideaQueryOptions(ideaId));

  // Form State များတွင် လက်ရှိ Data များကို Default အဖြစ် ထည့်သွင်းခြင်း
  const [title, setTitle] = useState(idea.title);
  const [summary, setSummary] = useState(idea.summary);
  const [description, setDescription] = useState(idea.description);
  // Array အဖြစ် လာသော Tags များကို Comma ခံထားသည့် String သို့ ပြောင်းလဲခြင်း
  const [tagsInput, setTagsInput] = useState(idea.tags.join(', '));
  //update mutation
    const { mutateAsync, isPending } = useMutation({
    mutationFn: () =>
      updateIdea(ideaId, {
        title,
        summary,
        description,
        // String အဖြစ်ရှိသော Tags များကို Comma နဲ့ ခွဲပြီး Array ပြောင်းလဲခြင်း
        tags: tagsInput
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean), // Empty string များကို ဖယ်ထုတ်ခြင်း
      }),
    onSuccess: () => {
      // ပြင်ဆင်ပြီးပါက Details စာမျက်နှာဆီ ပြန်ညွှန်းခြင်း
      navigate({
        to: '/ideas/$ideaId',
        params: { ideaId },
      });
    },
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await mutateAsync();
    } catch (error) {
      console.error(error);
      alert('Failed to update idea');
    }
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Edit Idea</h1>
        <Link
          to="/ideas/$ideaId"
          params={{ ideaId }}
          className="text-sm text-blue-600 hover:underline"
        >
          ← Back to idea
        </Link>
      </div>

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
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
         {isPending ? 'Updating...' : 'Update Idea'}
        </button>
      </form>
    </div>
  );
}