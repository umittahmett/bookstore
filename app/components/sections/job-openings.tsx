import { jobOpenings } from '@data/index'

const JobOpenings = () => {
  return (
    <div className="default-container py-36">
      <div className="mx-auto flex max-w-2xl flex-col items-end justify-between gap-16 lg:mx-0 lg:max-w-none lg:flex-row">
        <div className="w-full lg:max-w-lg lg:flex-auto">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            We’re always looking for awesome people to join us
          </h2>
          <p className="mt-6 text-xl leading-8 text-zinc-600">
            Diam nunc lacus lacus aliquam turpis enim. Eget hac velit est euismod lacus. Est non placerat nam arcu.
            Cras purus nibh cursus sit eu in id.
          </p>
          <img
            alt=""
            src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1344&h=1104&q=80"
            className="mt-16 aspect-[6/5] w-full rounded-2xl bg-zinc-50 object-cover lg:aspect-auto lg:h-[34.5rem]"
          />
        </div>
        <div className="w-full lg:max-w-xl lg:flex-auto">
          <h3 className="sr-only">Job openings</h3>
          <ul className="-my-8 divide-y divide-zinc-100">
            {jobOpenings.map((opening, index) => (
              <li key={index} className="py-8">
                <dl className="relative flex flex-wrap gap-x-3">
                  <dt className="sr-only">Role</dt>
                  <dd className="w-full flex-none text-lg font-semibold tracking-tight text-zinc-900">
                    <a href={opening.href}>
                      {opening.role}
                      <span aria-hidden="true" className="absolute inset-0" />
                    </a>
                  </dd>
                  <dt className="sr-only">Description</dt>
                  <dd className="mt-2 w-full flex-none text-base leading-7 text-zinc-600">{opening.description}</dd>
                  <dt className="sr-only">Salary</dt>
                  <dd className="mt-4 text-base font-semibold leading-7 text-zinc-900">{opening.salary}</dd>
                  <dt className="sr-only">Location</dt>
                  <dd className="mt-4 flex items-center gap-x-3 text-base leading-7 text-zinc-500">
                    <svg viewBox="0 0 2 2" aria-hidden="true" className="h-0.5 w-0.5 flex-none fill-zinc-300">
                      <circle r={1} cx={1} cy={1} />
                    </svg>
                    {opening.location}
                  </dd>
                </dl>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex border-t border-zinc-100 pt-8">
            <a href="#" className="text-sm font-semibold leading-6 text-amber-600 hover:text-amber-500">
              View all openings <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobOpenings