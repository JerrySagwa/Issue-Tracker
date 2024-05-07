import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';
import LoadingFormSkeleton from '../components/LoadingFormSkeleton'

const LoadingNewIssuePage = () => {
  return (
    <div className='max-w-xl'>
      <LoadingFormSkeleton/>
    </div>
  )
}

export default LoadingNewIssuePage
