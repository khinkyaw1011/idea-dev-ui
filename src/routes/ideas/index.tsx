import { createFileRoute ,Link} from '@tanstack/react-router'
import { Lightbulb } from 'lucide-react'
import { queryOptions,useSuspenseQuery } from '@tanstack/react-query'
import IdeaCard from '../../components/IdeaCard'
import { fetchIdeas } from '../../api/ideas'
export const Route = createFileRoute('/ideas/')({
  component: HomePage,
  loader:({context})=>context.queryClient.ensureQueryData(ideaQueryOptions)
})
const ideaQueryOptions=queryOptions({
  queryKey:['ideas'],
  queryFn:fetchIdeas
})
function HomePage() {
  const {data:ideas}=useSuspenseQuery
  (ideaQueryOptions)
  const latestIdea=ideas.slice(0,3)
  return <div
  className="flex flex-col md:flex-row items-start justify-between gap-10 p-6 text-blue-600"
>
  <div className="flex flex-col items-start gap-4">
    <Lightbulb className="w-16 h-16 text-yellow-400" />
    <h1 className="text-4xl font-bold text-gray-800">Welcome to IdeaDrop</h1>
    <p className="text-gray-600 max-w-xs">
      Share, explore, and build on the best startup ideas and side hustles.
    </p>
  </div>

  <section className="flex-1">
    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Latest Ideas</h2>
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {ideas.map((idea) => (
          <li
            key={idea.id}
            className="border border-gray-300 p-4 rounded shadow bg-white flex flex-col justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold">{idea.title}</h2>
              <p className="text-gray-700 mt-2">{idea.summary}</p>
            </div>
            <Link
              to="/ideas/$ideaId"
              params={{ ideaId: idea.id.toString() }}
              className="text-center mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              View Idea
            </Link>
          </li>
        ))}
      </ul>
  </section>
</div>

}
