import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SmartSelectProps<T> {
  value: T;
  onValueChange: (value: T) => void;
  options: Array<{
    label: string;
    value: T;
    disabled?: boolean;
  }>;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export function SmartSelect<T extends string>({
  value,
  onValueChange,
  options,
  placeholder = 'Select an option',
  label,
  disabled = false,
  className,
}: SmartSelectProps<T>) {
  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {label && <SelectLabel>{label}</SelectLabel>}
          {options.map(option => (
            <SelectItem key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
