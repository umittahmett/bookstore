import { HeadingProps } from '~/types';

const Heading: React.FC<HeadingProps> = ({ title, description, type = 'h2' }) => {
  const HeadingTag = type;
  return (
    <div className='mb-8 text-start'>
      <HeadingTag className='text-3xl sm:text-5xl font-bold text-zinc-900'>{title}</HeadingTag>
      {description && <p className='text-lg text-zinc-600 mt-2'>{description}</p>}
    </div>
  )
}

export default Heading