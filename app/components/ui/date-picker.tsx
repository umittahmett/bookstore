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
import { useEffect, useState } from "react"

interface DatePickerProps {
  value?: any;
  onChange?: (date: Date | undefined) => void;
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  const dateValue = value && new Date(value)
  const [date, setDate] = useState<Date | undefined>(value)
  const [year, setYear] = useState(dateValue?.getFullYear() || new Date().getFullYear())
  const [month, setMonth] = useState(dateValue?.getMonth() || new Date().getMonth())

  const years = Array.from({ length: new Date().getFullYear() - 1900 + 1 }, (_, i) => new Date().getFullYear() - i)

  const handleYearChange = (increment: number) => {
    const newYear = year + increment
    setYear(newYear)
    updateDate(new Date(newYear, month, 1))
  }

  const updateDate = (newDate: Date | undefined) => {
    setDate(newDate);
    if (newDate) {
      setYear(newDate.getFullYear());
      setMonth(newDate.getMonth());
    }
    onChange?.(newDate);
  };

  useEffect(() => {
    if (dateValue) {
      setDate(dateValue)
      setYear(dateValue.getFullYear())
      setMonth(dateValue.getMonth())
    }
  }, [value])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative">
          <Input
            className={cn(
              "w-full justify-start text-left font-normal cursor-pointer hover:bg-zinc-50 duration-200 pl-12",
              !date && "text-muted-foreground"
            )}
            value={date ? format(date, "PPP") : "Pick a date"}
            readOnly
          />
          <CalendarDays className="absolute left-4 top-1/2 transform size-5 text-zinc-500 -translate-y-1/2" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto h-96 p-0">
        <div className="flex items-center justify-between p-2">
          <Button size="closeIcon" type="button" variant="outline" onClick={() => handleYearChange(-1)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Select value={year.toString()} onValueChange={(selectedYear) => {
            const newYear = parseInt(selectedYear, 10)
            setYear(newYear)
            updateDate(new Date(newYear, month, 1))
          }}>
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
          <Button size="closeIcon" type="button" variant="outline" onClick={() => handleYearChange(1)}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate: any) => updateDate(newDate || undefined)}
          month={new Date(year, month)}
          onMonthChange={(newMonth: any) => {
            setYear(newMonth.getFullYear())
            setMonth(newMonth.getMonth())
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}