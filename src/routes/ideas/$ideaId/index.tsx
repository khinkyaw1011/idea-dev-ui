import { createFileRoute, Link,useNavigate } from '@tanstack/react-router'
import { queryOptions, useSuspenseQuery,useMutation } from '@tanstack/react-query'
import { fetchIdea,deleteIdea } from '../../../api/ideas';

const ideaQueryOptions = (ideaId: string) =>
  queryOptions({
    queryKey: ['idea', ideaId],
    queryFn: () => fetchIdea(ideaId),
  });

export const Route = createFileRoute('/ideas/$ideaId/')({
  component: IdeaPage,
  loader: async ({ context: { queryClient }, params }) => {
    return queryClient.ensureQueryData(ideaQueryOptions(params.ideaId));
  },
})

function IdeaPage() {
  const { ideaId } = Route.useParams()
  const { data: idea } = useSuspenseQuery(ideaQueryOptions(ideaId))
  const navigate = useNavigate(); 
  // Delete Mutation 
  const { mutateAsync: deleteMutate, isPending } = useMutation({
    mutationFn: () => deleteIdea(ideaId),
    onSuccess: () => {
      // ဖျက်ပြီးပါက Ideas Page ဆီ ပြန်ညွှန်းခြင်း
      navigate({ to: '/ideas' });
    },
  });

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this idea?'
    );

    if (confirmDelete) {
      try {
        await deleteMutate();
      } catch (error) {
        console.error(error);
        alert('Failed to delete idea');
      }
    }
  };
  return <div className="p-4 max-w-2xl mx-auto">
      <Link to="/ideas" className="text-blue-600 hover:underline mt-6 inline-block">&larr; Back to Ideas</Link>
      <h1 className="text-2xl font-bold mb-4">{idea.title}</h1>
      <p className="text-gray-600 mb-2">By {idea.user} &middot; {new Date(idea.createdAt).toLocaleDateString()}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {idea.tags.map((tag) => (
          <span key={tag} className="bg-blue-100 text-blue-700 text-sm px-2 py-1 rounded">{tag}</span>
        ))}
      </div>
      <p className="text-gray-700 mb-4">{idea.summary}</p>
      <div className="text-gray-800 whitespace-pre-wrap">{idea.description}</div>
          
          {/* Edit Link Button */}
  <Link
    to="/ideas/$ideaId/edit"
    params={{ ideaId }}
    className="inline-block text-sm bg-yellow-500 text-white px-4 py-2 rounded mr-3 hover:bg-yellow-600 transition"
  >
    Edit
  </Link>

       
      { /*delete button */ }
      <button
        onClick={handleDelete}
        disabled={isPending}
        className="text-sm bg-red-600 text-white mt-4 px-4 py-2 rounded transition hover:bg-red-700 disabled:opacity-50"
      >
        {isPending ? 'Deleting...' : 'Delete'}
      </button>
    </div>
}
