import * as React from "react"
import { format } from "date-fns"
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@lib/utils"
import { Button } from "@components/ui/button"
import { Calendar } from "@components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select"
import { Input } from "@components/ui/input"

export function DatePicker() {
  const [date, setDate] = React.useState<Date>()
  const [year, setYear] = React.useState(new Date().getFullYear())
  const [month, setMonth] = React.useState(new Date().getMonth())

  const years = Array.from({ length: new Date().getFullYear() - 1900 + 1 }, (_, i) => new Date().getFullYear() - i)

  const handleYearChange = (selectedYear: string) => {
    setYear(parseInt(selectedYear, 10))
  }

  const handleMonthChange = (increment: number) => {
    const newDate = new Date(year, month + increment, 1)
    setYear(newDate.getFullYear())
    setMonth(newDate.getMonth())
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative">
          <Input
            className={cn(
              "w-full justify-start text-left font-normal cursor-pointer hover:bg-zinc-50 duration-200 pl-12",
              !date && "text-muted-foreground"
            )}
            value={date ? format(date, "PPP") : 'Pick a date'}
          />
          <CalendarDays className="absolute left-4 top-1/2 transform size-5 text-zinc-500 -translate-y-1/2" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="flex items-center justify-between p-2">
          <Button variant="outline" size="closeIcon" onClick={() => handleMonthChange(-1)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Select value={year.toString()} onValueChange={handleYearChange}>
            <SelectTrigger className="w-[100px] h-8">
              <SelectValue>{year}</SelectValue>
            </SelectTrigger>
            <SelectContent className="max-h-56">
              {years.map((y) => (
                <SelectItem key={y} value={y.toString()}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="closeIcon" onClick={() => handleMonthChange(1)}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          month={new Date(year, month)}
          onMonthChange={(newMonth) => {
            setYear(newMonth.getFullYear())
            setMonth(newMonth.getMonth())
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}