import { Metadata } from 'next'
import IssueSummary from './IssueSummary'
import LatestIssues from './LatestIssues'
import Pagination from './components/Pagination'

export default function Home({searchParams: {page}}: {searchParams: {page: string | undefined}}) {

  return (
    <>
      <IssueSummary/>
      <LatestIssues/>
    </>
  )
}

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "Overview of all the issue"
}
