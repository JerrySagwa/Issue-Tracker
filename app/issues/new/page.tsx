import 'easymde/dist/easymde.min.css';
import dynamic from 'next/dynamic'

const IssueForm = dynamic(() => import('../components/IssueForm'), {ssr: false});

const NewIssuePage = () => {
  return (
    <div className='max-w-xl'>
      <IssueForm />      
    </div>
  );
};

export default NewIssuePage;
