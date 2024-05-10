import Pagination from './components/Pagination'

export default function Home({searchParams: {page}}: {searchParams: {page: string | undefined}}) {

  return (
    <Pagination itemCount={100} pageSize={15} currentPage={parseInt(typeof page === 'undefined' ? '1' : page)}/>
  )
}
