export default function ProjectCardSkeleton() {
  return (
    <div className="w-full border border-slate-200 bg-white flex flex-col justify-between rounded-3xl p-5 animate-pulse">
      <div>
        <div className="h-40 w-full rounded-xl bg-slate-200" />

        <div className="mt-5">
          <div className="h-6 w-3/4 bg-slate-200 rounded-md" />
          <div className="mt-2 h-4 w-full bg-slate-200 rounded-md" />
          <div className="mt-2 h-4 w-5/6 bg-slate-200 rounded-md" />
        </div>
      </div>

      <div className="flex flex-wrap gap-3 items-center justify-between mt-5">
        <div className="h-8 w-1/3 bg-slate-200 rounded-md" />
        <div className="h-10 w-full bg-slate-200 rounded-md" />
      </div>
    </div>
  );
}
