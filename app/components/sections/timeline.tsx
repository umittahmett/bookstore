import { timeline } from '@data/index'

const Timeline = () => {
  return (
    <div className="-mt-8 default-container">
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4">
        {timeline.map((item) => (
          <div key={item.name}>
            <time
              dateTime={item.dateTime}
              className="flex items-center text-sm font-semibold leading-6 text-amber-500"
            >
              <svg viewBox="0 0 4 4" aria-hidden="true" className="mr-4 h-1 w-1 flex-none">
                <circle r={2} cx={2} cy={2} fill="currentColor" />
              </svg>
              {item.date}
              <div
                aria-hidden="true"
                className="absolute -ml-2 h-px w-screen -translate-x-full bg-zinc-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0"
              />
            </time>
            <p className="mt-6 text-lg font-semibold leading-8 tracking-tight text-zinc-900">{item.name}</p>
            <p className="mt-1 text-base leading-7 text-zinc-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Timeline