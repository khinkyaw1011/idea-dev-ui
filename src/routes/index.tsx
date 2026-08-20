
import { createFileRoute ,Link} from '@tanstack/react-router'
import { Lightbulb } from 'lucide-react'
import { queryOptions,useSuspenseQuery } from '@tanstack/react-query'
import IdeaCard from '../components/IdeaCard'
import { fetchIdeas } from '../api/ideas'

export const Route = createFileRoute('/')({
  component: IdeaPage,
  loader:({context})=>context.queryClient.ensureQueryData(ideaQueryOptions)
})
const ideaQueryOptions=queryOptions({
  queryKey:['ideas',{limit:3}],
  queryFn:()=>fetchIdeas(3)
})
function IdeaPage() {
  const {data:ideas}=useSuspenseQuery
  (ideaQueryOptions);
  
  return <div
  className="flex flex-col md:flex-row items-start justify-between gap-10 p-6 text-blue-600"
>
  <div className='flex flex-col items-start gap-4'>
    <Lightbulb className="w-16 h-16 text-yellow-400" />
    <h1 className="text-4xl font-bold text-gray-800">Welcome to IdeaDrop</h1>
    <p className="text-gray-600 max-w-xs">
      Share, explore, and build on the best startup ideas and side hustles.
    </p>
  </div>

  <section className="flex-1">
    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Latest Ideas</h2>
    <div className="grid grid-cols-2 sm:grid-cols-1 gap-6">
        {ideas.map((idea) => (
        <IdeaCard idea={idea} key={idea._id} button={false} />
        ))}
      <Link to='/ideas' className="bg-blue-600 text-center text-white px-4 py-2 rounded hover:bg-blue-700 transition">View All Idea</Link>
      </div>
  </section>
</div>

}





