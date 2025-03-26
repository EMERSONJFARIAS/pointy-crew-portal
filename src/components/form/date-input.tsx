
import { useState } from "react";
import { format, parse, isValid } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";

interface DateInputProps {
  form: UseFormReturn<any>;
  name: string;
  label: string;
}

export function DateInput({ form, name, label }: DateInputProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [dateInputValue, setDateInputValue] = useState("");

  // Handle manual date input
  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
    const value = e.target.value;
    setDateInputValue(value);
    
    // Try to parse the date in DD/MM/YYYY format
    if (value.length === 10) {
      const parsedDate = parse(value, "dd/MM/yyyy", new Date());
      
      if (isValid(parsedDate)) {
        field.onChange(parsedDate);
      }
    }
  };

  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="DD/MM/AAAA"
                    value={dateInputValue || (field.value ? format(field.value, "dd/MM/yyyy") : "")}
                    onChange={(e) => handleDateInputChange(e, field)}
                    className="pl-3 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2"
                    onClick={() => setIsCalendarOpen(true)}
                  >
                    <CalendarIcon className="h-4 w-4 opacity-50" />
                    <span className="sr-only">Abrir calendário</span>
                  </Button>
                </div>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={(date) => {
                  field.onChange(date);
                  if (date) {
                    setDateInputValue(format(date, "dd/MM/yyyy"));
                  }
                  setIsCalendarOpen(false);
                }}
                disabled={(date) =>
                  date > new Date() || date < new Date("1920-01-01")
                }
                initialFocus
                locale={ptBR}
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
