import LatestIssues from './LatestIssues'
import Pagination from './components/Pagination'

export default function Home({searchParams: {page}}: {searchParams: {page: string | undefined}}) {

  return (
    <>
      <LatestIssues/>
    </>
  )
}
