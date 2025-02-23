'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

import { Button } from '../components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../components/ui/popover';
import { cn } from '../lib/utils';

export function ComboBox({
  name,
  setData,
  className,
  options,
  title,
  defaultValue = '',
}: {
  name: string;
  setData: (key: string, value: string | boolean) => void;
  className?: string;
  options: { label: string; value: string | undefined }[];
  title: string;
  defaultValue?: string | number;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(defaultValue);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(className, 'justify-between')}
        >
          {value
            ? options.find(
                (option) => option.value?.toString() === value.toString(),
              )?.label
            : `${title}...`}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn(className, 'p-0')}>
        <Command>
          <CommandInput placeholder={`Search ${title}...`} className="h-9" />
          <CommandList>
            <CommandEmpty>No {title} found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  defaultValue={option.value}
                  onSelect={(currentValue) => {
                    const selectedOption = options.find(
                      (opt) => opt.label.toString() === currentValue.toString(),
                    );

                    // alert(selectedOption?.value + ' ' + currentValue);
                    // setValue(currentValue === value ? '' : currentValue);
                    setValue(selectedOption?.value ?? '');
                    setOpen(false);
                    setData(name, selectedOption?.value ?? '');
                    // setData(name, selectedOption?.value ?? '');
                    // alert(currentValue);

                    // const selectedOption: SelectOption =
                    //   options.find(
                    //     (priority) => String(priority.label) === String(value),
                    //   ) || null;
                    // setSelectedStatus(selectedOption);

                    // setData(fieldName, selectedOption?.value ?? '');
                    // setOpen(false);
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      'ml-auto',
                      value === option.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
