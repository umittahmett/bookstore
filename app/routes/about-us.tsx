import AboutHero from '@components/sections/about-hero'
import Timeline from '@components/sections/timeline'
import JobOpenings from '@components/sections/job-openings'
import { OurPeople } from '@components/sections/our-people'

export default function AboutPage() {
  return (
    <div className="bg-white isolate">
      {/* Hero section */}
      <AboutHero />

      {/* Timeline section */}
      <Timeline />

      {/* Our People section */}
      <OurPeople />

      {/* Job Openings section */}
      <JobOpenings />
    </div>
  )
}
